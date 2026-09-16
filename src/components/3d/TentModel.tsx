import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { TextureSyncEngine } from './TextureSyncEngine';

interface TentModelProps {
  textureEngine: TextureSyncEngine;
}

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const MODEL_PATHS: Record<string, string> = {
  '5x5': `${baseUrl}models/Tent_5_5.glb`,
  '6.5x6.5': `${baseUrl}models/Tent 6.5_6.5.glb`,
  '8x8': `${baseUrl}models/Tent_8_8.glb`,
};

// Calibrated physical dimensions for the tent models (in Three.js units)
const TENT_DIMENSIONS: Record<string, { width: number; depth: number; height: number }> = {
  '5x5': { width: 1.50, depth: 1.50, height: 0.945 },
  '6.5x6.5': { width: 1.50, depth: 1.50, height: 0.88 },
  '8x8': { width: 2.42, depth: 2.42, height: 1.20 },
};

export const TentModel: React.FC<TentModelProps> = ({ textureEngine }) => {
  const config = useConfiguratorStore((state) => state.config);
  const modelPath = MODEL_PATHS[config.variantSize] || MODEL_PATHS['6.5x6.5'];
  
  const { scene } = useGLTF(modelPath);
  const sceneRef = useRef<THREE.Group>(null);

  // Compute tent dimensions dynamically from GLB scene
  const dims = useMemo(() => {
    const fallback = TENT_DIMENSIONS[config.variantSize] || TENT_DIMENSIONS['6.5x6.5'];
    if (!scene) return fallback;

    const box = new THREE.Box3().setFromObject(scene);
    const w = box.max.x - box.min.x;
    const d = box.max.z - box.min.z;
    let h = fallback.height;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child.name.includes('fabric') || child.name === 'Mesh.003')) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry.boundingBox) {
          h = Math.max(0.7, mesh.geometry.boundingBox.min.y - box.min.y);
        }
      }
    });

    return {
      width: w > 0 ? w : fallback.width,
      depth: d > 0 ? d : fallback.depth,
      height: h,
    };
  }, [scene, config.variantSize]);

  // Sync texture atlas and materials
  useEffect(() => {
    let isSubscribed = true;

    const syncMaterials = async () => {
      // Render offscreen canvas texture atlas & wall texture
      await textureEngine.renderTextureAtlas(config);
      const dynamicTexture = textureEngine.getTexture();

      if (!sceneRef.current || !isSubscribed) return;

      sceneRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          
          // Handle Materials array or single material
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

          materials.forEach((mat) => {
            if (!mat) return;

            // Canopy fabric material
            if (mat.name === 'fabric_Mat' || mat.name === 'Inner_fabric' || mat.name.includes('fabric')) {
              const stdMat = mat as THREE.MeshStandardMaterial;
              stdMat.map = dynamicTexture;
              stdMat.color.set('#FFFFFF');
              stdMat.needsUpdate = true;
            }

            // Frame metallic material
            if (mat.name === 'Metal_mat' || mat.name.includes('Metal')) {
              const pbr = mat as THREE.MeshStandardMaterial;
              if (config.frameFinish === 'aluminum') {
                pbr.color.set('#D1D5DB');
                pbr.metalness = 0.85;
                pbr.roughness = 0.3;
              } else if (config.frameFinish === 'black_anodized') {
                pbr.color.set('#111827');
                pbr.metalness = 0.75;
                pbr.roughness = 0.4;
              } else if (config.frameFinish === 'heavy_steel') {
                pbr.color.set('#374151');
                pbr.metalness = 0.95;
                pbr.roughness = 0.2;
              }
              pbr.needsUpdate = true;
            }
          });
        }
      });
    };

    syncMaterials();

    return () => {
      isSubscribed = false;
    };
  }, [config, scene, textureEngine]);

  const wallTexture = textureEngine.getWallTexture();
  const sideColor = config.globalCanopyColor || '#1E293B';

  const showBackWall = config.wallOption === 'back_wall' || config.wallOption === 'full_enclosure';
  const showFullEnclosure = config.wallOption === 'full_enclosure';

  return (
    <group ref={sceneRef} dispose={null} position={[0, -1.2, 0]} scale={[0.85, 0.85, 0.85]}>
      {/* 3D GLB Tent Frame & Canopy */}
      <primitive object={scene} />

      {/* 3D Wall Enclosure Meshes */}
      {showBackWall && (
        <group name="BackWallPanel">
          {/* Main Back Wall Panel (with custom graphics / text layers from 2D editor) */}
          <mesh position={[0, dims.height / 2, -dims.depth / 2 + 0.01]} castShadow receiveShadow>
            <planeGeometry args={[dims.width, dims.height]} />
            <meshStandardMaterial
              map={wallTexture}
              side={THREE.DoubleSide}
              roughness={0.7}
              metalness={0.05}
              envMapIntensity={0.6}
            />
          </mesh>

          {/* Top Velcro Attachment Trim Bar */}
          <mesh position={[0, dims.height, -dims.depth / 2 + 0.015]}>
            <boxGeometry args={[dims.width * 1.01, 0.03, 0.02]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        </group>
      )}

      {showFullEnclosure && (
        <group name="EnclosureSideWalls">
          {/* Left Wall Panel */}
          <mesh
            position={[-dims.width / 2 + 0.01, dims.height / 2, 0]}
            rotation={[0, Math.PI / 2, 0]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[dims.depth, dims.height]} />
            <meshStandardMaterial
              color={sideColor}
              side={THREE.DoubleSide}
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>

          {/* Right Wall Panel */}
          <mesh
            position={[dims.width / 2 - 0.01, dims.height / 2, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[dims.depth, dims.height]} />
            <meshStandardMaterial
              color={sideColor}
              side={THREE.DoubleSide}
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>

          {/* Front Wall Panel with Roll-Up Zipper Doorway (Commercial Style) */}
          {/* Left Front Half Panel */}
          <mesh
            position={[-dims.width * 0.3, dims.height / 2, dims.depth / 2 - 0.01]}
            rotation={[0, Math.PI, 0]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[dims.width * 0.4, dims.height]} />
            <meshStandardMaterial
              color={sideColor}
              side={THREE.DoubleSide}
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>

          {/* Right Front Half Panel */}
          <mesh
            position={[dims.width * 0.3, dims.height / 2, dims.depth / 2 - 0.01]}
            rotation={[0, Math.PI, 0]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[dims.width * 0.4, dims.height]} />
            <meshStandardMaterial
              color={sideColor}
              side={THREE.DoubleSide}
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>

          {/* Center Zipper Seam Visual Accent */}
          <mesh position={[0, dims.height / 2, dims.depth / 2 - 0.015]}>
            <boxGeometry args={[0.015, dims.height, 0.01]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// Preload models for instant seamless switching
useGLTF.preload(`${baseUrl}models/Tent_5_5.glb`);
useGLTF.preload(`${baseUrl}models/Tent 6.5_6.5.glb`);
useGLTF.preload(`${baseUrl}models/Tent_8_8.glb`);
