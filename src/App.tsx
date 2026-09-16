import React, { useState, useRef, useMemo } from 'react';
import { EcommerceHeader } from './components/ui/EcommerceHeader';
import { HeroSection } from './components/ui/HeroSection';
import { PresetsShowcase } from './components/ui/PresetsShowcase';
import { FeaturesSection } from './components/ui/FeaturesSection';
import { ReviewsSection } from './components/ui/ReviewsSection';
import { FaqSection } from './components/ui/FaqSection';
import { EcommerceFooter } from './components/ui/EcommerceFooter';

import { ProductSpecificationsCard } from './components/ui/ProductSpecificationsCard';
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
import { useConfiguratorStore } from './store/useConfiguratorStore';

import {
  Sliders,
  Palette,
  Layout,
  Layers,
  Monitor,
  Eye,
  Box,
  RotateCcw,
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'split' | '3d' | '2d'>('split');
  const [controlTab, setControlTab] = useState<'product' | 'graphics' | 'color' | 'layers'>('product');

  const canvas3dRef = useRef<HTMLCanvasElement | null>(null);

  // Single shared instance of TextureSyncEngine
  const textureEngine = useMemo(() => new TextureSyncEngine(), []);

  const config = useConfiguratorStore((state) => state.config);
  const autoRotate3d = useConfiguratorStore((state) => state.autoRotate3d);
  const toggleAutoRotate3d = useConfiguratorStore((state) => state.toggleAutoRotate3d);
  const setCameraPreset = useConfiguratorStore((state) => state.setCameraPreset);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 scroll-smooth">
      {/* 1. Global E-Commerce Header with Free Freight Banner & Cart Badge */}
      <EcommerceHeader />

      {/* 2. Hero Section with Background Product Image & Value Propositions */}
      <HeroSection />

      {/* 3. Main Product Detail Page (PDP) Configurator Studio */}
      <section id="customizer" className="w-full py-12 lg:py-16 bg-slate-950/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
          {/* Section Heading & Studio Subhead */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
                <Box className="w-3.5 h-3.5" />
                <span>Interactive 3D Configurator Studio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Customize Your {config.variantSize} ft Commercial Canopy
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Configure frame dimensions, canopy & valance colors, upload vector logos, and preview in real-time 3D prepress resolution.
              </p>
            </div>

            {/* Quick 3D Viewport Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAutoRotate3d}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  autoRotate3d
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
                title="Toggle 360 Turntable Auto-Rotation"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${autoRotate3d ? 'animate-spin' : ''}`} />
                <span>{autoRotate3d ? 'Rotating 360°' : '360° Rotate'}</span>
              </button>

              <button
                onClick={() => setCameraPreset('front')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-300 border border-slate-800 hover:text-white transition-all"
                title="Reset Camera to Front View"
              >
                Reset Angle
              </button>
            </div>
          </div>

          {/* 2-Column Product Configurator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Interactive 3D / 2D Viewport Display (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col space-y-3 min-h-[550px] lg:min-h-0 order-1 lg:order-1">
              {/* Viewport Display Switcher */}
              <div className="flex items-center justify-between bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shadow-md">
                <div className="flex items-center gap-2 px-2">
                  <Monitor className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Visualizer Mode
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('split')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'split'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    Split View (3D + 2D)
                  </button>
                  <button
                    onClick={() => setActiveTab('3d')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === '3d'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    3D Stage Only
                  </button>
                  <button
                    onClick={() => setActiveTab('2d')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === '2d'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    2D Print Editor
                  </button>
                </div>
              </div>

              {/* Viewport Canvas Render Container */}
              <div className="flex-1 flex flex-col gap-4">
                {activeTab === 'split' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 h-full min-h-[520px]">
                    <div className="h-full min-h-[380px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
                      <TentViewer3D
                        textureEngine={textureEngine}
                        onCanvasRefReady={(el) => (canvas3dRef.current = el)}
                      />
                    </div>
                    <div className="h-full min-h-[380px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
                      <Canvas2DEditor />
                    </div>
                  </div>
                )}

                {activeTab === '3d' && (
                  <div className="flex-1 h-full min-h-[520px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
                    <TentViewer3D
                      textureEngine={textureEngine}
                      onCanvasRefReady={(el) => (canvas3dRef.current = el)}
                    />
                  </div>
                )}

                {activeTab === '2d' && (
                  <div className="flex-1 h-full min-h-[520px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
                    <Canvas2DEditor />
                  </div>
                )}
              </div>

              {/* Quick Instructions Hint */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-3 py-1.5 bg-slate-900/60 rounded-xl border border-slate-850">
                <span>💡 Click & drag 3D stage to rotate • Scroll to zoom • Right-click to pan</span>
                <span className="font-mono text-amber-400 font-semibold">Active: {config.variantSize} ft</span>
              </div>
            </div>

            {/* Right Column: E-Commerce Customization Steps (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col space-y-4 max-h-[calc(100vh-120px)] lg:sticky lg:top-24 overflow-y-auto pr-1 order-2 lg:order-2">
              {/* Step Navigation Tabs */}
              <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-lg">
                <button
                  onClick={() => setControlTab('product')}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    controlTab === 'product'
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" /> 1. Specs
                </button>
                <button
                  onClick={() => setControlTab('color')}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    controlTab === 'color'
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" /> 2. Color
                </button>
                <button
                  onClick={() => setControlTab('graphics')}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    controlTab === 'graphics'
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" /> 3. Graphics
                </button>
                <button
                  onClick={() => setControlTab('layers')}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    controlTab === 'layers'
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> 4. Layers
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

                {/* Real-Time Pricing & Add-to-Cart Card */}
                <PricingSummary />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Configurations / Presets Gallery */}
      <PresetsShowcase />

      {/* 5. Features & Engineering Durability */}
      <FeaturesSection />

      {/* 6. Technical Specifications Section */}
      <section id="specs" className="w-full py-16 bg-slate-950/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Detailed Engineering Documentation
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight">
                Technical Specifications & Compliance
              </h2>
              <p className="text-slate-400 text-sm">
                Complete dimension tables, fabric weight, truss thickness, and wind safety ratings.
              </p>
            </div>

            <ProductSpecificationsCard />
          </div>
        </div>
      </section>

      {/* 7. Social Proof & Verified Customer Reviews */}
      <ReviewsSection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Comprehensive E-Commerce Footer */}
      <EcommerceFooter />

      {/* 10. Slide-Out Shopify Cart Drawer */}
      <LineItemPropertiesDrawer />

      {/* 11. Production PDF Spec Sheet Modal */}
      <SpecSheetModal
        canvas3dElement={canvas3dRef.current}
        flat2dCanvasElement={textureEngine.getCanvasElement()}
      />
    </div>
  );
}

export default App;
