import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { TentSizeVariant, FrameFinish, WallAttachmentOption, PrintingTechnique } from '../../types/configurator';
import { PRESET_FRAME_FINISHES } from '../../schema/tentProductSchema';
import { Shield, Layers, Printer, Maximize } from 'lucide-react';

export const VariantSelector: React.FC = () => {
  const config = useConfiguratorStore((state) => state.config);
  const setVariantSize = useConfiguratorStore((state) => state.setVariantSize);
  const setFrameFinish = useConfiguratorStore((state) => state.setFrameFinish);
  const setWallOption = useConfiguratorStore((state) => state.setWallOption);
  const setPrintingTechnique = useConfiguratorStore((state) => state.setPrintingTechnique);

  const sizes: Array<{ id: TentSizeVariant; label: string; desc: string; price: string }> = [
    { id: '5x5', label: '5x5 FT Compact', desc: 'Ideal for trade shows & booths', price: '$299' },
    { id: '6.5x6.5', label: '6.5x6.5 FT Standard', desc: 'Most popular commercial size', price: '$399' },
    { id: '8x8', label: '8x8 FT Large Pro', desc: 'Maximum shade & event presence', price: '$499' },
  ];

  const walls: Array<{ id: WallAttachmentOption; label: string; price: string }> = [
    { id: 'none', label: 'No Walls (Open Canopy)', price: '+$0' },
    { id: 'back_wall', label: 'Single Back Wall', price: '+$75' },
    { id: 'full_enclosure', label: 'Full 3-Wall Enclosure', price: '+$180' },
  ];

  const techniques: Array<{ id: PrintingTechnique; label: string; desc: string; price: string }> = [
    { id: 'dye_sublimation', label: 'Dye Sublimation', desc: 'Full-bleed vibrant photo print', price: '+$40' },
    { id: 'uv_coating', label: 'Heavy UV Protected Coating', desc: 'Maximum outdoor sun resistance', price: '+$65' },
    { id: 'screen_print', label: 'Vector Screen Print', desc: 'Crisp bold vector logos', price: '+$20' },
  ];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-lg space-y-5">
      {/* 1. Tent Canopy Size Variant */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
          <Maximize className="w-4 h-4 text-sky-400" /> 1. Canopy Tent Size Model
        </label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((s) => (
            <button
              key={s.id}
              onClick={() => setVariantSize(s.id)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                config.variantSize === s.id
                  ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{s.label}</span>
                <span className="text-[11px] font-semibold text-sky-400">{s.price}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block leading-tight">{s.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Commercial Frame Finish */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4 text-sky-400" /> 2. Heavy Duty Frame Finish
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PRESET_FRAME_FINISHES.map((f) => (
            <button
              key={f.id}
              onClick={() => setFrameFinish(f.id as FrameFinish)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                config.frameFinish === f.id
                  ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{f.label}</span>
                <span className="text-[11px] text-sky-400 font-medium">
                  {f.surcharge === 0 ? 'Included' : `+$${f.surcharge}`}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block leading-tight">{f.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Wall Enclosure Options */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4 text-sky-400" /> 3. Wall Addon Option
        </label>
        <div className="grid grid-cols-3 gap-2">
          {walls.map((w) => (
            <button
              key={w.id}
              onClick={() => setWallOption(w.id)}
              className={`p-2 rounded-xl border text-left transition-all ${
                config.wallOption === w.id
                  ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="text-xs font-semibold block">{w.label}</span>
              <span className="text-[11px] text-sky-400 font-medium">{w.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Printing Technique */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
          <Printer className="w-4 h-4 text-sky-400" /> 4. Print Technology & Finish
        </label>
        <div className="grid grid-cols-3 gap-2">
          {techniques.map((t) => (
            <button
              key={t.id}
              onClick={() => setPrintingTechnique(t.id)}
              className={`p-2 rounded-xl border text-left transition-all ${
                config.printingTechnique === t.id
                  ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{t.label}</span>
                <span className="text-[11px] text-sky-400 font-medium">{t.price}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block leading-tight">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
