import React, { useState, useRef, useMemo } from 'react';
import { Header } from './components/ui/Header';
import { EmbeddedHeader } from './components/shopify/EmbeddedHeader';
import { TentViewer3D } from './components/3d/TentViewer3D';
import { Canvas2DEditor } from './components/2d/Canvas2DEditor';
import { SectionSelector } from './components/controls/SectionSelector';
import { VariantSelector } from './components/controls/VariantSelector';
import { ColorPickerPanel } from './components/controls/ColorPickerPanel';
import { TextLayerTool } from './components/controls/TextLayerTool';
import { ImageLayerTool } from './components/controls/ImageLayerTool';
import { LayerManagerList } from './components/controls/LayerManagerList';
import { PricingSummary } from './components/ui/PricingSummary';
import { LineItemPropertiesDrawer } from './components/shopify/LineItemPropertiesDrawer';
import { SpecSheetModal } from './components/pdf/SpecSheetModal';
import { TextureSyncEngine } from './components/3d/TextureSyncEngine';

import { Box, Eye, Layers, Palette, Sliders, Layout, Monitor } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'split' | '3d' | '2d'>('split');
  const [controlTab, setControlTab] = useState<'product' | 'graphics' | 'color' | 'layers'>('product');

  const canvas3dRef = useRef<HTMLCanvasElement | null>(null);

  // Single shared instance of TextureSyncEngine
  const textureEngine = useMemo(() => new TextureSyncEngine(), []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Banner */}
      <EmbeddedHeader />

      {/* Navigation Header */}
      <Header />

      {/* Main Studio Workspace Body */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto p-3 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Control Toolkit & Product Customizer (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
          {/* Toolkit Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-lg">
            <button
              onClick={() => setControlTab('product')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                controlTab === 'product'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Product Specs
            </button>
            <button
              onClick={() => setControlTab('color')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                controlTab === 'color'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Colors
            </button>
            <button
              onClick={() => setControlTab('graphics')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                controlTab === 'graphics'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layout className="w-3.5 h-3.5" /> Graphics
            </button>
            <button
              onClick={() => setControlTab('layers')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                controlTab === 'layers'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Layers
            </button>
          </div>

          {/* Active Tab Panel Content */}
          <div className="space-y-4">
            {controlTab === 'product' && (
              <>
                <VariantSelector />
                <ColorPickerPanel />
              </>
            )}

            {controlTab === 'color' && <ColorPickerPanel />}

            {controlTab === 'graphics' && (
              <>
                <SectionSelector />
                <TextLayerTool />
                <ImageLayerTool />
              </>
            )}

            {controlTab === 'layers' && (
              <>
                <SectionSelector />
                <LayerManagerList />
              </>
            )}

            {/* Always visible Real-Time Pricing Card */}
            <PricingSummary />
          </div>
        </div>

        {/* Right Column: Interactive 3D Stage & 2D Canvas Workspace (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col space-y-3 min-h-[550px] lg:min-h-0">
          {/* View Mode Selector Tabs (Split View / 3D Only / 2D Only) */}
          <div className="flex items-center justify-between bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center gap-2 px-3">
              <Monitor className="w-4 h-4 text-sky-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Viewport Display Mode</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('split')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'split'
                    ? 'bg-sky-500 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                Split View (2D + 3D)
              </button>
              <button
                onClick={() => setActiveTab('3d')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === '3d'
                    ? 'bg-sky-500 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                3D Stage Only
              </button>
              <button
                onClick={() => setActiveTab('2d')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === '2d'
                    ? 'bg-sky-500 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                2D Editor Only
              </button>
            </div>
          </div>

          {/* Canvas Views Container */}
          <div className="flex-1 flex flex-col gap-4">
            {activeTab === 'split' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 h-full min-h-[500px]">
                <div className="h-full min-h-[350px]">
                  <TentViewer3D
                    textureEngine={textureEngine}
                    onCanvasRefReady={(el) => (canvas3dRef.current = el)}
                  />
                </div>
                <div className="h-full min-h-[350px]">
                  <Canvas2DEditor />
                </div>
              </div>
            )}

            {activeTab === '3d' && (
              <div className="flex-1 h-full min-h-[500px]">
                <TentViewer3D
                  textureEngine={textureEngine}
                  onCanvasRefReady={(el) => (canvas3dRef.current = el)}
                />
              </div>
            )}

            {activeTab === '2d' && (
              <div className="flex-1 h-full min-h-[500px]">
                <Canvas2DEditor />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Shopify Cart Drawer */}
      <LineItemPropertiesDrawer />

      {/* Production PDF Spec Sheet Modal */}
      <SpecSheetModal
        canvas3dElement={canvas3dRef.current}
        flat2dCanvasElement={textureEngine.getCanvasElement()}
      />
    </div>
  );
}

export default App;
