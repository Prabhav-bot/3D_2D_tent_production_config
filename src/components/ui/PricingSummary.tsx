import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { DollarSign, ChevronRight, Info, ShieldCheck, Loader2 } from 'lucide-react';

export const PricingSummary: React.FC = () => {
  const pricing = useConfiguratorStore((state) => state.pricing);
  const isCalculatingPrice = useConfiguratorStore((state) => state.isCalculatingPrice);
  const config = useConfiguratorStore((state) => state.config);
  const addToCart = useConfiguratorStore((state) => state.addToCart);

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-sm">Dynamic Cost Calculation</h3>
        </div>
        {isCalculatingPrice ? (
          <span className="flex items-center gap-1 text-[11px] font-mono text-sky-400">
            <Loader2 className="w-3 h-3 animate-spin" /> Recalculating...
          </span>
        ) : (
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30">
            API REAL-TIME SYNC
          </span>
        )}
      </div>

      {/* Itemized Cost Breakdown Table */}
      <div className="space-y-2 text-xs">
        {pricing.breakdownItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400 font-medium">{item.label}</span>
            <span className="font-mono text-slate-100 font-semibold">
              {item.amount === 0 ? 'Included' : `+$${item.amount.toFixed(2)}`}
            </span>
          </div>
        ))}

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-400">
          <span>Est. Sales Tax (8%)</span>
          <span className="font-mono text-slate-300">${pricing.taxEstimate.toFixed(2)}</span>
        </div>
      </div>

      {/* Grand Total Footer */}
      <div className="pt-3 border-t border-slate-800 bg-slate-950/60 p-3.5 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Total Product Price</span>
          <span className="text-xl font-extrabold text-white font-mono">${pricing.totalPrice.toFixed(2)} USD</span>
        </div>

        <button
          onClick={() => addToCart()}
          className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
        >
          <span>Add to Order</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span>Includes Commercial Frame Warranty & High-Resolution Vector Print Guarantee</span>
      </div>
    </div>
  );
};
