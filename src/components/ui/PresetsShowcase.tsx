import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Palette, Check, ArrowRight } from 'lucide-react';
import { TentSizeVariant } from '../../types/configurator';

interface PresetItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  canopyColor: string;
  size: TentSizeVariant;
  badge: string;
  description: string;
  tags: string[];
}

const PRESETS: PresetItem[] = [
  {
    id: 'festival-orange',
    name: 'Festival & Food Pop-Up',
    subtitle: 'High-Visibility Outdoor Setup',
    category: 'Food & Outdoor Events',
    canopyColor: '#f97316',
    size: '8x8',
    badge: 'Bestseller',
    description: 'Vibrant sunset orange peak with high contrast contrast borders. Optimized for outdoor festivals and street markets.',
    tags: ['High Contrast', '8x8 Compact', 'Waterproof'],
  },
  {
    id: 'corporate-navy',
    name: 'Trade Show Executive',
    subtitle: 'Premium Corporate Exhibition',
    category: 'Commercial B2B',
    canopyColor: '#1e3a8a',
    size: '6.5x6.5',
    badge: 'Enterprise Choice',
    description: 'Deep navy blue peak with clean corporate aesthetic. Engineered for indoor expo halls and international conventions.',
    tags: ['Subtle Matte', 'Fire-Rated', 'Hex Frame'],
  },
  {
    id: 'athletic-crimson',
    name: 'Athletics & Racing Team',
    subtitle: 'High-Performance Race Paddock',
    category: 'Sports & Motorsport',
    canopyColor: '#dc2626',
    size: '8x8',
    badge: 'Popular',
    description: 'Intense crimson racing red canopy engineered for maximum trackside presence and extreme all-weather resilience.',
    tags: ['UV 50+ Shield', 'Heavy Duty', 'Wind Stiffened'],
  },
  {
    id: 'minimal-slate',
    name: 'Artisan & Craft Studio',
    subtitle: 'Modern Minimalist Aesthetic',
    category: 'Retail & Boutiques',
    canopyColor: '#0f172a',
    size: '5x5',
    badge: 'Modern',
    description: 'Monochrome midnight slate finish tailored for artisan pop-up stores, gallery displays, and boutique retail stalls.',
    tags: ['Sleek Black', 'Lightweight', 'Fast Assembly'],
  },
];

export const PresetsShowcase: React.FC = () => {
  const config = useConfiguratorStore((state) => state.config);
  const setGlobalCanopyColor = useConfiguratorStore((state) => state.setGlobalCanopyColor);
  const setVariantSize = useConfiguratorStore((state) => state.setVariantSize);

  const applyPreset = (preset: PresetItem) => {
    setGlobalCanopyColor(preset.canopyColor);
    setVariantSize(preset.size);

    // Smooth scroll back to customizer
    const customizerEl = document.getElementById('customizer');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="presets" className="w-full py-16 bg-slate-950/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-3">
              <Palette className="w-3.5 h-3.5" />
              <span>Curated Inspiration Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Popular Commercial Presets
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Jumpstart your branding. Select a curated industry look to immediately apply matching colors and sizing to the live 3D visualizer.
            </p>
          </div>

          <a
            href="#customizer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Open Customizer Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRESETS.map((preset) => {
            const isCurrentColor =
              config.globalCanopyColor.toLowerCase() === preset.canopyColor.toLowerCase();

            return (
              <div
                key={preset.id}
                className={`group relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  isCurrentColor
                    ? 'bg-slate-900 border-sky-500 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  {/* Color Swatch & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-xl shadow-inner border border-white/20 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: preset.canopyColor }}
                      />
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">
                        {preset.canopyColor}
                      </span>
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {preset.badge}
                    </span>
                  </div>

                  {/* Preset Title & Category */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                      {preset.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {preset.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {preset.description}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {preset.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-750"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-6">
                  <button
                    onClick={() => applyPreset(preset)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isCurrentColor
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                    }`}
                  >
                    {isCurrentColor ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Active on 3D Model
                      </>
                    ) : (
                      <>
                        <span>Apply to 3D Model</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
