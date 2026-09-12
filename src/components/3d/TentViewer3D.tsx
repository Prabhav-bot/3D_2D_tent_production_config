import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import {
  RotateCcw,
  Eye,
  Maximize2,
  MousePointerClick,
  Play,
  Pause,
  Box,
} from 'lucide-react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { TentModel } from './TentModel';
import { TextureSyncEngine } from './TextureSyncEngine';

interface CameraRigProps {
  preset: 'front' | 'back' | 'left' | 'right' | 'top' | 'iso';
}

const CAMERA_POSITIONS: Record<string, [number, number, number]> = {
  front: [0, 0.2, 4.2],
  back: [0, 0.2, -4.2],
  left: [-4.2, 0.2, 0],
  right: [4.2, 0.2, 0],
  top: [0, 5.2, 0.1],
  iso: [3.2, 2.2, 3.2],
};

const CameraRig: React.FC<CameraRigProps> = ({ preset }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    const targetPos = CAMERA_POSITIONS[preset] || CAMERA_POSITIONS.front;
    camera.position.set(...targetPos);
    camera.lookAt(0, 0, 0);
  }, [preset, camera]);

  return null;
};

interface TentViewer3DProps {
  onCanvasRefReady?: (canvas: HTMLCanvasElement) => void;
  textureEngine: TextureSyncEngine;
}

export const TentViewer3D: React.FC<TentViewer3DProps> = ({
  onCanvasRefReady,
  textureEngine,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraPreset = useConfiguratorStore((state) => state.cameraPreset);
  const setCameraPreset = useConfiguratorStore((state) => state.setCameraPreset);
  const autoRotate3d = useConfiguratorStore((state) => state.autoRotate3d);
  const toggleAutoRotate3d = useConfiguratorStore((state) => state.toggleAutoRotate3d);
  const config = useConfiguratorStore((state) => state.config);

  const resetCamera = () => {
    setCameraPreset('iso');
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[420px] bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0b0f19] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      {/* Top 3D Viewport Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg pointer-events-auto">
          <Box className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            3D Real-Time Stage ({config.variantSize} ft)
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
        </div>

        {/* View Angle Presets */}
        <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60 shadow-lg pointer-events-auto">
          {(['front', 'iso', 'right', 'back', 'top'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setCameraPreset(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                cameraPreset === p
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
          <div className="w-px h-4 bg-slate-700 mx-1" />
          <button
            onClick={toggleAutoRotate3d}
            title={autoRotate3d ? 'Pause Auto-Rotate' : 'Start Auto-Rotate'}
            className={`p-1.5 rounded-lg transition-all ${
              autoRotate3d
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {autoRotate3d ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={resetCamera}
            title="Reset View"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* R3F Canvas */}
      <div className="w-full h-full flex-1">
        <Canvas
          shadows
          camera={{ position: [3.2, 2.2, 3.2], fov: 45 }}
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            if (onCanvasRefReady) {
              onCanvasRefReady(gl.domElement);
            }
          }}
        >
          <CameraRig preset={cameraPreset} />
          
          {/* Lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#e2e8f0" />
          <directionalLight position={[0, -5, 0]} intensity={0.2} />

          {/* Environment Studio Reflection */}
          <Environment preset="city" />

          {/* Main 3D Model */}
          <React.Suspense fallback={null}>
            <TentModel textureEngine={textureEngine} />
          </React.Suspense>

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.65}
            scale={10}
            blur={2.4}
            far={4}
          />

          {/* Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate3d}
            autoRotateSpeed={1.5}
            minDistance={2}
            maxDistance={9}
            maxPolarAngle={Math.PI / 2 + 0.05} // don't go below ground
          />
        </Canvas>
      </div>

      {/* Bottom Information overlay badge */}
      <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
          <MousePointerClick className="w-3 h-3 text-sky-400" /> Click & drag to rotate 3D view | Scroll to zoom
        </span>
        <span className="hidden sm:inline-block bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
          Fabric Material: <strong className="text-slate-200">Heavy Duty 600D Polyester</strong>
        </span>
      </div>
    </div>
  );
};
