import React, { useState } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import {
  Tent,
  ShoppingBag,
  PhoneCall,
  Search,
  ChevronDown,
  Clock,
  ShieldCheck,
  Truck,
  Menu,
  X,
  FileText,
} from 'lucide-react';

export const EcommerceHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useConfiguratorStore((state) => state.cartItems);
  const setCartOpen = useConfiguratorStore((state) => state.setCartOpen);
  const setPdfModalOpen = useConfiguratorStore((state) => state.setPdfModalOpen);
  const pricing = useConfiguratorStore((state) => state.pricing);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top E-Commerce Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-sky-600 to-indigo-600 text-white text-xs font-semibold py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" /> FREE Commercial Freight on Orders $500+
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-amber-200">
              <ShieldCheck className="w-3.5 h-3.5" /> 5-Year Hardware Warranty
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-sky-200">
              <Clock className="w-3.5 h-3.5" /> Free 24-Hour Artwork Proofing
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="tel:18005558368" className="hover:underline flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> 1-800-555-TENT
            </a>
            <span className="text-white/40">|</span>
            <span className="font-mono">USD ($)</span>
          </div>
        </div>
      </div>

      {/* Main E-Commerce Navigation Bar */}
      <nav className="bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Tent className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  APEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-sky-400">CANOPY</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
                  Commercial 3D Studio
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#customizer"
              className="text-white font-semibold hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              3D Customizer
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                LIVE
              </span>
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features & Durability
            </a>
            <a href="#presets" className="hover:text-white transition-colors">
              Popular Presets
            </a>
            <a href="#specs" className="hover:text-white transition-colors">
              Tech Specs
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews (4.9★)
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">
            {/* Quick Spec PDF Generator */}
            <button
              onClick={() => setPdfModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-all shadow-sm"
              title="Download Commercial Spec Sheet PDF"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Spec PDF</span>
            </button>

            {/* Customizer CTA anchor */}
            <a
              href="#customizer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
            >
              <span>Build In 3D</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white transition-all shadow-md group"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-xs font-bold font-mono">
                ${pricing.totalPrice.toFixed(2)}
              </span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-sky-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800/80 flex flex-col space-y-2 px-2 pb-2">
            <a
              href="#customizer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm font-semibold text-white bg-slate-900"
            >
              3D Customizer
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Features & Durability
            </a>
            <a
              href="#presets"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Popular Presets
            </a>
            <a
              href="#specs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Technical Specifications
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Customer Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              FAQ
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};
