import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import {
  Boxes,
  Undo2,
  Redo2,
  FileText,
  ShoppingBag,
  Code,
  CheckCircle2,
} from 'lucide-react';

export const Header: React.FC = () => {
  const config = useConfiguratorStore((state) => state.config);
  const pricing = useConfiguratorStore((state) => state.pricing);
  const canUndo = useConfiguratorStore((state) => state.canUndo);
  const canRedo = useConfiguratorStore((state) => state.canRedo);
  const undo = useConfiguratorStore((state) => state.undo);
  const redo = useConfiguratorStore((state) => state.redo);

  const cartItems = useConfiguratorStore((state) => state.cartItems);
  const setCartOpen = useConfiguratorStore((state) => state.setCartOpen);
  const setPdfModalOpen = useConfiguratorStore((state) => state.setPdfModalOpen);
  const addToCart = useConfiguratorStore((state) => state.addToCart);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Boxes className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-slate-100 text-base tracking-tight leading-none flex items-center gap-2">
            PRO CANOPY TENT <span className="bg-sky-500/20 text-sky-400 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-sky-500/30">3D CONFIGURATOR</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-medium">Interactive 2D/3D Product Studio & Shopify Engine</p>
        </div>
      </div>

      {/* Center Actions: Undo / Redo */}
      <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
          title="Undo Action"
        >
          <Undo2 className="w-3.5 h-3.5" /> Undo
        </button>
        <div className="w-px h-4 bg-slate-800" />
        <button
          onClick={redo}
          disabled={!canRedo}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
          title="Redo Action"
        >
          <Redo2 className="w-3.5 h-3.5" /> Redo
        </button>
      </div>

      {/* Right Actions: PDF Spec Sheet & Shopify Cart */}
      <div className="flex items-center gap-2.5">
        {/* Spec PDF Download */}
        <button
          onClick={() => setPdfModalOpen(true)}
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-bold px-3.5 py-2 rounded-xl shadow-md transition-all"
        >
          <FileText className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">Production Spec PDF</span>
        </button>

        {/* Add To Cart Button */}
        <button
          onClick={() => addToCart()}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-lg shadow-sky-500/25 transition-all transform active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart (${pricing.totalPrice.toFixed(2)})</span>
        </button>

        {/* Shopify Cart Drawer Trigger */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Open Shopify Cart Drawer"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
