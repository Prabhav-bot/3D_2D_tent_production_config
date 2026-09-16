import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What artwork formats can I upload for my custom canopy?',
      a: 'We accept high-resolution PNG, SVG, AI, EPS, and PDF files. For the sharpest print output, vector SVG or EPS is recommended. Our 3D Studio allows you to position and scale your graphics in real time, and our prepress team inspects every file for print sharpness before printing.',
    },
    {
      q: 'How fast will my custom canopy tent be produced and delivered?',
      a: 'Standard production is 4 to 7 business days following digital prepress proof sign-off. Express priority rush production (2 to 3 days) is also available. Free commercial freight shipping applies on all orders over $500.',
    },
    {
      q: 'Do I get to approve a final prepress proof before printing begins?',
      a: 'Yes! Even after you customize your tent in our 3D configurator and submit your order, our master prepress technicians generate an official PDF proof packet within 24 hours. Production only starts once your team gives written approval.',
    },
    {
      q: 'Is the fabric fire-retardant for indoor convention centers and trade shows?',
      a: 'Yes. All Apex Pro canopy tops are certified to CPAI-84 Section 6 and NFPA-701 fire retardant safety standards. Every tent top comes with permanent certification tags sewn into the valance to satisfy city fire marshals.',
    },
    {
      q: 'Can I purchase replacement canopy tops without buying another frame?',
      a: 'Absolutely. If you rebrand, launch a new campaign, or need another seasonal design, you can easily purchase replacement printed tops that mount directly onto your existing Apex hex frame.',
    },
    {
      q: 'What is covered under the 5-Year Commercial Warranty?',
      a: 'Our 5-Year Hardware Warranty covers all structural aircraft-aluminum trusses, hexagonal legs, push-pin locks, and bracket joints against manufacturer defects and structural failure under standard commercial usage.',
    },
  ];

  return (
    <section id="faq" className="w-full py-20 bg-slate-900/30 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about custom artwork guidelines, turnaround times, and event compliance.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 text-white font-bold text-sm sm:text-base hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
