import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, Wrench, Layers, Truck, FileCheck, CheckCircle2 } from 'lucide-react';

export const ProductSpecificationsCard: React.FC = () => {
  const [openSection, setOpenSection] = useState<'frame' | 'fabric' | 'shipping' | null>('frame');

  const toggleSection = (section: 'frame' | 'fabric' | 'shipping') => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
        <ShieldCheck className="w-5 h-5 text-sky-400" />
        <h3 className="font-bold text-slate-100 text-sm">Product Specifications & Guarantee</h3>
      </div>

      {/* Accordion List */}
      <div className="space-y-2 text-xs">
        {/* Frame Accordion */}
        <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/50">
          <button
            onClick={() => toggleSection('frame')}
            className="w-full flex items-center justify-between p-3 text-left font-bold text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-sky-400" /> Frame & Hardware Construction
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'frame' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'frame' && (
            <div className="p-3 pt-0 text-slate-300 space-y-1.5 border-t border-slate-800/50 text-[11px]">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Heavy-Duty 40mm / 50mm Hexagonal Anodized Aluminum Legs</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Nylon Composite Truss Connectors & Pinch-Free Locking Levers</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Commercial Grade Reinforced Steel Footplates for Ground Anchoring</span>
              </div>
            </div>
          )}
        </div>

        {/* Fabric Accordion */}
        <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/50">
          <button
            onClick={() => toggleSection('fabric')}
            className="w-full flex items-center justify-between p-3 text-left font-bold text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" /> Premium Fabric & Print Tech
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'fabric' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'fabric' && (
            <div className="p-3 pt-0 text-slate-300 space-y-1.5 border-t border-slate-800/50 text-[11px]">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>500D Oxford Polyester with Water-Proof Polyurethane Coating</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Full-Color Dye-Sublimation Printing (Scratch & Fade Resistant)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>CPAI-84 & NFPA-701 Fire Retardant Certification Compliant</span>
              </div>
            </div>
          )}
        </div>

        {/* Shipping & Prepress Accordion */}
        <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/50">
          <button
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between p-3 text-left font-bold text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" /> Prepress Proofing & Turnaround
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'shipping' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'shipping' && (
            <div className="p-3 pt-0 text-slate-300 space-y-1.5 border-t border-slate-800/50 text-[11px]">
              <div className="flex items-start gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Instant Vector Production PDF Spec Sheet download upon checkout</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Standard Production Time: 3 to 5 Business Days after design confirmation</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Free Ground Shipping across Continental US</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
