import React from 'react';
import { Store, ShieldCheck } from 'lucide-react';

export const EmbeddedHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border-b border-sky-800/40 px-4 py-2 flex items-center justify-between text-xs text-sky-200">
      <div className="flex items-center gap-2">
        <Store className="w-4 h-4 text-sky-400" />
        <span className="font-semibold text-slate-100">Shopify Product Template Iframe Embed Ready</span>
        <span className="hidden sm:inline-block text-slate-400">| Headless Storefront Integration Active</span>
      </div>
      <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
        <ShieldCheck className="w-4 h-4" /> 2D/3D Synchronized Checkout Protocol
      </div>
    </div>
  );
};
