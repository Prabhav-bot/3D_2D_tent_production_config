import React from 'react';
import {
  Shield,
  Layers,
  Palette,
  Wind,
  PackageCheck,
  CheckCircle,
  Flame,
  Sun,
  Award,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Hexagonal 40mm Aircraft Aluminum',
      subtitle: 'Commercial Frame Architecture',
      description:
        'Hex-shaped 1.5mm gauge anodized aluminum truss bars and uprights resist flex and wind shear up to 35 mph, outperforming conventional square steel frames while saving 30% weight.',
      highlights: ['40mm Hexagonal Uprights', 'Anodized Anti-Corrosion', 'Smooth Push-Button Locks'],
      badge: 'Heavy-Duty Hardware',
      color: 'amber',
    },
    {
      icon: Palette,
      title: 'Full-Bleed Dye Sublimation',
      subtitle: 'Photographic Print Precision',
      description:
        'Our heat-transfer dye sublimation bonds inks directly into fabric fibers. No peeling, cracking, or fading even under relentless direct UV sunlight.',
      highlights: ['Ultra-Vivid Color Match', 'Edge-to-Edge Full Bleed', 'Scratch & Smudge Resistant'],
      badge: 'Prepress Certified',
      color: 'sky',
    },
    {
      icon: Flame,
      title: '600D Oxford CPAI-84 Certified',
      subtitle: 'Fire, Water & UV Protection',
      description:
        'Certified to stringent CPAI-84 Section 6 and NFPA-701 standards required by major convention centers and public festival permits nationwide.',
      highlights: ['CPAI-84 / NFPA-701 Fire Proof', 'PU Coated 100% Waterproof', 'UPF 50+ Solar Blockade'],
      badge: 'Event Permit Compliant',
      color: 'emerald',
    },
    {
      icon: PackageCheck,
      title: 'Complete Commercial Transit Kit',
      subtitle: 'Everything Included in the Box',
      description:
        'Every tent ships with our reinforced 1680D nylon roller transit bag with dual bearings, plus ground stake kit and 4x commercial sandbag weight ballast bags.',
      highlights: ['Wheeled 1680D Roller Case', '4x Heavy Sandbag Ballasts', 'Reinforced Heavy Tie-Downs'],
      badge: 'Zero Add-On Fees',
      color: 'purple',
    },
  ];

  return (
    <section id="features" className="w-full py-20 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Commercial Engineering Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Built to Outlast Any Competitor Tent
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Standard consumer tents buckle in 15 mph wind and fade after one summer. Apex Pro canopies are built with commercial event organizers, high-profile brands, and all-season outdoor festivals in mind.
          </p>
        </div>

        {/* Features 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider">
                      {item.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-2">
                  {item.highlights.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
