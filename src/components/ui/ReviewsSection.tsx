import React from 'react';
import { Star, ShieldCheck, ThumbsUp, Building2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      author: 'Marcus Vance',
      role: 'Director of Brand Marketing',
      company: 'Elevation Outdoor Collective',
      rating: 5,
      date: '2 weeks ago',
      title: 'Survived 40 mph mountain gusts without a flinch',
      content:
        'We ordered four 8x8 custom tents for our winter ski expo tour. The 3D customizer preview matched the physical printed canopy with 100% color accuracy. The heavy-duty hex aluminum legs handled severe mountain gusts while other standard vendor booths collapsed.',
      verified: true,
      sizeOrdered: '8x8 Commercial Hex Frame',
    },
    {
      author: 'Samantha Lin',
      role: 'Event Producer & Founder',
      company: 'Artisan Food & Wine Festival',
      rating: 5,
      date: '1 month ago',
      title: 'The dye-sublimation print clarity is jaw-dropping',
      content:
        'Being able to position our custom vector graphics in 3D and get an instant production PDF saved our team days of back-and-forth with graphic prepress. The fabric is thick 600D Oxford and completely rainproof. We are ordering 10 more for summer.',
      verified: true,
      sizeOrdered: '6.5x6.5 Custom Full Bleed',
    },
    {
      author: 'David Kowalski',
      role: 'Head of Sponsorship Operations',
      company: 'Apex Racing & Motorsport',
      rating: 5,
      date: '3 weeks ago',
      title: 'Fastest 60-second setup in our paddock',
      content:
        'Paddock setup time is critical for us. The push-button leg locks are buttery smooth, and the included roller bag with heavy-duty urethane wheels makes transport through gravel and asphalt effortless. Outstanding product.',
      verified: true,
      sizeOrdered: '8x8 Anodized Black Finish',
    },
  ];

  return (
    <section id="reviews" className="w-full py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Rating Overview Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-14 pb-10 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl font-black text-white">4.9</span>
              <div className="flex text-amber-400 text-xl">
                {'★'.repeat(5)}
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Backed by Over 1,240+ Verified Brands
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              98% of customers recommend Apex Commercial Canopies for indoor & outdoor commercial events.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
              <span className="block text-2xl font-black text-white">100%</span>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Waterproof</span>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
              <span className="block text-2xl font-black text-white">5-Yr</span>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Frame Warranty</span>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
              <span className="block text-2xl font-black text-white">24-Hr</span>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Prepress Proof</span>
            </div>
          </div>
        </div>

        {/* Customer Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm">
                    {'★'.repeat(rev.rating)}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" /> Verified Buyer
                    </span>
                  )}
                </div>

                {/* Review Title & Content */}
                <h3 className="font-bold text-white text-base mb-2">
                  "{rev.title}"
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              {/* Author & Order Info */}
              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.author}</h4>
                    <p className="text-[11px] text-slate-400">{rev.role}</p>
                    <p className="text-[11px] text-amber-400/90 font-medium">{rev.company}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded">
                    {rev.sizeOrdered}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
