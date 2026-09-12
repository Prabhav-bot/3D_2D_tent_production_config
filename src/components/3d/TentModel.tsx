import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { TextureSyncEngine } from './TextureSyncEngine';

interface TentModelProps {
  textureEngine: TextureSyncEngine;
}

const MODEL_PATHS: Record<string, string> = {
  '5x5': '/models/Tent_5_5.glb',
  '6.5x6.5': '/models/Tent 6.5_6.5.glb',
  '8x8': '/models/Tent_8_8.glb',
};

export const TentModel: React.FC<TentModelProps> = ({ textureEngine }) => {
  const config = useConfiguratorStore((state) => state.config);
  const modelPath = MODEL_PATHS[config.variantSize] || MODEL_PATHS['6.5x6.5'];
  
  const { scene } = useGLTF(modelPath);
  const sceneRef = useRef<THREE.Group>(null);

  // Sync texture atlas and materials
  useEffect(() => {
    let isSubscribed = true;

    const syncMaterials = async () => {
      // Render offscreen canvas texture atlas
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

  return (
    <group ref={sceneRef} dispose={null} position={[0, -1.2, 0]} scale={[0.85, 0.85, 0.85]}>
      <primitive object={scene} />
    </group>
  );
};

// Preload models for instant seamless switching
useGLTF.preload('/models/Tent_5_5.glb');
useGLTF.preload('/models/Tent 6.5_6.5.glb');
useGLTF.preload('/models/Tent_8_8.glb');
