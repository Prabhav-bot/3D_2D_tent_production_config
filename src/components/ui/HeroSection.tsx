import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import {
  Award,
  ShieldCheck,
  Wind,
  Droplets,
  Clock,
  ArrowRight,
  FileText,
  Star,
  CheckCircle2,
} from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
const heroBgImage = `${baseUrl}hero-tent-bg.jpg`;

export const HeroSection: React.FC = () => {
  const setPdfModalOpen = useConfiguratorStore((state) => state.setPdfModalOpen);
  const pricing = useConfiguratorStore((state) => state.pricing);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Background Product Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="Apex Commercial Custom Canopy Tent in Outdoor Festival"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multi-stage gradient overlay for high contrast text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-14 sm:py-20 lg:py-28">
        <div className="max-w-3xl space-y-6">
          {/* Breadcrumb & Social Proof Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-slate-300 text-xs font-medium">
              <span className="flex text-amber-400">
                {'★'.repeat(5)}
              </span>
              <span className="font-bold text-white">4.9 / 5.0</span>
              <span className="text-slate-400">|</span>
              <span>1,240+ Commercial Clients</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <Award className="w-3.5 h-3.5" />
              <span>2026 Pro Series Edition</span>
            </div>
          </div>

          {/* Primary High-Impact Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Commercial Custom{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-400">
                Canopy Tents
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed">
              Engineered for extreme weather, high-traffic trade shows, and brand dominance. Configure your tent in real-time 3D with true dye-sublimation color fidelity and instant production prepress proofs.
            </p>
          </div>

          {/* Feature Highlights Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <Droplets className="w-4 h-4 text-sky-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">600D Oxford</p>
                <p className="text-[10px] text-slate-400">100% Waterproof</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">CPAI-84 Certified</p>
                <p className="text-[10px] text-slate-400">Flame Retardant</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <Wind className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">35 MPH Rated</p>
                <p className="text-[10px] text-slate-400">Hex Aluminum Legs</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">60-Sec Setup</p>
                <p className="text-[10px] text-slate-400">No Tools Required</p>
              </div>
            </div>
          </div>

          {/* Action CTAs and Pricing Teaser */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <a
              href="#customizer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Customize in 3D Below</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setPdfModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/90 backdrop-blur-md font-bold text-sm shadow-md transition-all"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Download Production Spec PDF</span>
            </button>

            <div className="hidden lg:flex flex-col pl-4 border-l border-slate-800">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Configured Price</span>
              <span className="text-2xl font-black text-white font-mono">
                ${pricing.totalPrice.toFixed(2)}{' '}
                <span className="text-xs font-normal text-slate-400 font-sans">USD</span>
              </span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free 3D digital proof before printing
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 5-Year aluminum frame warranty
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Ships within 4-7 business days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
