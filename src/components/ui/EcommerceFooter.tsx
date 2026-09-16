import React, { useState } from 'react';
import {
  Tent,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  Check,
} from 'lucide-react';

export const EcommerceFooter: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Newsletter / Promo Offer Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border-b border-slate-800 py-10 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center lg:justify-start gap-2">
              <span>Get $50 Off Your First Custom Tent Order</span>
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                PROMO
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Subscribe for exclusive trade show design guides, production rush slots, and volume pricing specials.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-md">
            {isSubscribed ? (
              <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Welcome! Check your inbox for your $50 coupon code.
              </div>
            ) : (
              <>
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your business email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
                >
                  <span>Claim $50</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links & Information Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-sky-500 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Tent className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                APEX <span className="text-amber-400">CANOPY PRO</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We manufacture commercial-grade custom canopy tents, trade show displays, and outdoor event branding. Built with aircraft-grade aluminum, 600D Oxford waterproof fabric, and lifetime color fidelity.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white font-medium">1-800-555-TENT (8368)</span>
                <span className="text-slate-500">• Mon-Fri 8am-8pm EST</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>support@apexcanopypro.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Commercial Headquarters: Denver, CO & Manufacturing Hub, CA</span>
              </div>
            </div>
          </div>

          {/* Column 2: Products & Customizers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Custom Canopies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">
                  10x10 Trade Show Tent
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">
                  8x8 Commercial Event Tent
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">
                  6.5x6.5 Pop-Up Canopy
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">
                  5x5 Compact Artisan Booth
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">
                  Custom Printed Full Sidewalls
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">
                  Replacement Printed Tops
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hardware & Accessories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Hardware & Gear
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  40mm Hex Aluminum Frames
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Heavy-Duty Wheeled Roller Bag
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Commercial Sandbag Ballasts
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-white transition-colors">
                  Steel Ground Anchor Stakes
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  CPAI-84 Fire Certifications
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-white transition-colors">
                  Wind Load Guidelines (35 MPH)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Artwork & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Artwork & Service
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">
                  Free 24-Hour 3D Prepress Proof
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-white transition-colors">
                  Download Template Vector Files
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  5-Year Hardware Warranty
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Free Freight Shipping Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  B2B Corporate Account Quotes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Customer FAQ & Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Security Trust Badges */}
        <div className="pt-12 mt-12 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted Checkout
            </span>
            <span className="text-slate-600">|</span>
            <span>Accepted Payment Methods:</span>
            <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
              <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded font-bold">VISA</span>
              <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded font-bold">MC</span>
              <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded font-bold">AMEX</span>
              <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded font-bold">APPLE PAY</span>
              <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded font-bold">PAYPAL</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span>© 2026 Apex Canopy Pro Inc. All rights reserved.</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
