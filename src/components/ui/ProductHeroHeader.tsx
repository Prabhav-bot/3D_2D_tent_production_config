import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Star, ShieldCheck, Flame, Droplets, Truck, Award, CheckCircle2 } from 'lucide-react';

export const ProductHeroHeader: React.FC = () => {
  const config = useConfiguratorStore((state) => state.config);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
      {/* Top Breadcrumb & Rating */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-sky-400 uppercase tracking-wider text-[11px]">
          <span>Commercial Event Canopies</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">Custom Printed Tents</span>
        </div>

        {/* Star Rating Badge */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <span className="font-extrabold text-slate-100 text-[11px]">4.9</span>
          <span className="text-slate-400 text-[10px]">(140+ Verified Reviews)</span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight flex flex-wrap items-center gap-2">
          {config.variantSize} ft Custom Commercial Canopy Tent
          <span className="bg-sky-500/20 text-sky-400 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border border-sky-500/30">
            DYE-SUBLIMATED PRINT
          </span>
        </h2>
        <p className="text-xs text-slate-300 font-medium mt-1">
          Heavy-duty anodized aluminum frame with 500D waterproof polyester. Full 360° interactive 3D studio preview.
        </p>
      </div>

      {/* Commercial Specs Trust Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
          <Droplets className="w-4 h-4 text-sky-400 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-slate-200 block">500D Polyester</span>
            <span className="text-slate-400 text-[10px]">100% Waterproof</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
          <Flame className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-slate-200 block">CPAI-84 Certified</span>
            <span className="text-slate-400 text-[10px]">Flame Resistant</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
          <Award className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-slate-200 block">Lifetime Frame</span>
            <span className="text-slate-400 text-[10px]">Commercial Warranty</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
          <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-slate-200 block">Free Digital Proof</span>
            <span className="text-slate-400 text-[10px]">Ships in 3-5 Days</span>
          </div>
        </div>
      </div>
    </div>
  );
};
