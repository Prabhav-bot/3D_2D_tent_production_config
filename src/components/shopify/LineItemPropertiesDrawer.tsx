import React, { useState } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Lock,
  ArrowRight,
  Truck,
  ShieldCheck,
  Flame,
  Clock,
  Tag,
  Check,
  Code,
  Package,
  ChevronDown,
} from 'lucide-react';
import { buildShopifyProperties } from '../../services/shopifyService';
import { ShopifyCartItem } from '../../types/configurator';

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
const defaultTentThumbnail = `${baseUrl}hero-tent-bg.jpg`;

// Curated Commercial Add-On Upsells
const ACCESSORIES_UPSELLS = [
  {
    id: 'acc-sandbags-4pk',
    title: '4x Commercial Sandbag Ballast Kit',
    price: 49.0,
    desc: 'Heavy-duty 1680D nylon ballasts for 35 mph wind hold',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'acc-roller-bag',
    title: '1680D Wheeled Roller Travel Case',
    price: 79.0,
    desc: 'Dual urethane bearing wheels with reinforced base plate',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'acc-led-lighting',
    title: 'Ultra-Bright LED Truss Lighting Kit',
    price: 55.0,
    desc: 'Clamp-on rechargeable lights for evening expos & booths',
    image: 'https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=150&q=80',
  },
];

export const LineItemPropertiesDrawer: React.FC = () => {
  const isCartOpen = useConfiguratorStore((state) => state.isCartOpen);
  const setCartOpen = useConfiguratorStore((state) => state.setCartOpen);
  const cartItems = useConfiguratorStore((state) => state.cartItems);
  const removeFromCart = useConfiguratorStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useConfiguratorStore((state) => state.updateCartItemQuantity);
  const addAccessoryToCart = useConfiguratorStore((state) => state.addAccessoryToCart);
  const config = useConfiguratorStore((state) => state.config);
  const pricing = useConfiguratorStore((state) => state.pricing);

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [showRawPayload, setShowRawPayload] = useState(false);

  if (!isCartOpen) return null;

  // Calculate Cart Subtotal
  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount);

  // Free shipping threshold = $500
  const freeShippingThreshold = 500;
  const isFreeShippingUnlocked = rawSubtotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const progressPercent = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

  const shippingCost = isFreeShippingUnlocked || rawSubtotal === 0 ? 0 : 45.0;
  const taxEstimate = +(subtotalAfterDiscount * 0.08).toFixed(2);
  const totalCartPrice = +(subtotalAfterDiscount + shippingCost + taxEstimate).toFixed(2);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'APEX50' || code === 'SAVE50') {
      setAppliedPromo({ code, discount: 50.0 });
      setPromoCodeInput('');
    } else if (code === 'FREESHIP') {
      setAppliedPromo({ code, discount: 45.0 });
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid coupon code. Try APEX50 for $50 off!');
    }
  };

  const handleAddAccessory = (acc: (typeof ACCESSORIES_UPSELLS)[0]) => {
    const accessoryItem: ShopifyCartItem = {
      id: `${acc.id}-${Date.now()}`,
      title: acc.title,
      price: acc.price,
      quantity: 1,
      imageThumbnail: acc.image,
      properties: {
        '_config_id': `ACC-${Date.now()}`,
        'Size': 'Standard Universal',
        'Frame Finish': 'N/A',
        'Wall Addon': 'Commercial Accessory',
        'Base Color': 'Standard Commercial Black',
        'Print Technique': 'Hardware Gear',
        'Total Custom Layers': '0',
        'Custom Summary': acc.desc,
        '_production_pdf_metadata': 'Accessory SKU',
      },
    };
    addAccessoryToCart(accessoryItem);
  };

  const currentProperties = buildShopifyProperties(config, pricing);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end transition-opacity animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setCartOpen(false)}
        aria-label="Close cart overlay"
      />

      <div className="relative w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        {/* 1. Drawer Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base tracking-tight flex items-center gap-2">
                Your Shopping Cart
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                  {cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Commercial prepress proofs & direct freight</p>
            </div>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Cart Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Free Freight Progress Meter */}
        <div className="bg-slate-950/60 border-b border-slate-800/80 px-5 py-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Truck className={`w-3.5 h-3.5 ${isFreeShippingUnlocked ? 'text-emerald-400' : 'text-amber-400'}`} />
              {isFreeShippingUnlocked ? (
                <span className="text-emerald-400 font-bold">
                  🎉 Free Commercial Freight Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-amber-400">${amountNeededForFreeShipping.toFixed(2)}</strong> for{' '}
                  <strong className="text-white">FREE Freight</strong>
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-slate-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShippingUnlocked
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 3. Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {/* Cart Items List */}
          {cartItems.length > 0 ? (
            <div className="space-y-3.5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-slate-950/80 p-4 rounded-2xl border border-slate-800/90 hover:border-slate-700 transition-all shadow-md space-y-3"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <img
                        src={item.imageThumbnail || defaultTentThumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Title & Price */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-extrabold text-white leading-snug truncate">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-sm font-black text-amber-400 font-mono">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            (${item.price.toFixed(2)} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Configuration Pills & Specs */}
                  {item.properties && (
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                      <div className="flex flex-wrap gap-1.5">
                        {item.properties['Size'] && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                            {item.properties['Size']}
                          </span>
                        )}
                        {item.properties['Frame Finish'] && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                            {item.properties['Frame Finish']}
                          </span>
                        )}
                        {item.properties['Wall Addon'] && item.properties['Wall Addon'] !== 'NONE' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {item.properties['Wall Addon']}
                          </span>
                        )}
                      </div>

                      {item.properties['Base Color'] && (
                        <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400">
                          <span>Base Color:</span>
                          <span
                            className="w-3 h-3 rounded-full border border-white/20 inline-block"
                            style={{ backgroundColor: item.properties['Base Color'] }}
                          />
                          <span className="font-mono text-slate-300 text-[10px]">
                            {item.properties['Base Color']}
                          </span>
                        </div>
                      )}

                      {item.properties['Custom Summary'] && (
                        <div className="text-[10px] text-slate-400 pt-0.5 truncate">
                          <span className="text-sky-400 font-semibold">Art:</span>{' '}
                          {item.properties['Custom Summary']}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quantity Stepper & Proof Status */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                      <button
                        onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) - 1)}
                        className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-2 text-white">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) + 1)}
                        className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <Check className="w-3 h-3" /> Prepress Ready
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-10 px-4 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center text-slate-600 shadow-inner">
                <ShoppingBag className="w-8 h-8 text-slate-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-white">Your Cart Is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Customize your canopy in real-time 3D or apply one of our popular commercial presets below.
                </p>
              </div>
              <button
                onClick={() => {
                  setCartOpen(false);
                  const el = document.getElementById('customizer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20"
              >
                <span>Customize In 3D Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 4. One-Click Add-on Accessories Upsell Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Recommended Commercial Gear
              </h4>
              <span className="text-[10px] text-slate-500">1-Click Add</span>
            </div>

            <div className="space-y-2">
              {ACCESSORIES_UPSELLS.map((acc) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                    <img src={acc.image} alt={acc.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h5 className="text-xs font-bold text-white truncate">{acc.title}</h5>
                    <p className="text-[10px] text-slate-400 truncate">{acc.desc}</p>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      ${acc.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddAccessory(acc)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all border border-slate-700 shrink-0 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Promotional Coupon Code */}
          <div className="pt-2 border-t border-slate-800/80">
            {appliedPromo ? (
              <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-xs text-emerald-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Tag className="w-3.5 h-3.5" /> Code "{appliedPromo.code}" Applied (-${appliedPromo.discount.toFixed(2)})
                </span>
                <button
                  onClick={() => setAppliedPromo(null)}
                  className="text-slate-400 hover:text-white text-[11px] underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Promo Code (Try APEX50)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {promoError && (
              <p className="text-[11px] text-rose-400 mt-1 pl-1">{promoError}</p>
            )}
          </div>

          {/* 6. Technical Developer Payload Accordion */}
          <div className="pt-2">
            <details className="group border border-slate-800 rounded-xl bg-slate-950/40 p-2.5 text-xs">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-slate-400 hover:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-sky-400" />
                  Inspect Shopify Line-Item Properties JSON
                </span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <pre className="mt-2.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 overflow-x-auto max-h-48">
                {JSON.stringify(
                  {
                    items: cartItems.map((item) => ({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      quantity: item.quantity,
                      properties: item.properties,
                    })),
                  },
                  null,
                  2
                )}
              </pre>
            </details>
          </div>
        </div>

        {/* 7. Drawer Footer Order Summary & Checkout */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/95 space-y-3">
          {/* Cost Breakdown */}
          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-slate-200">${rawSubtotal.toFixed(2)}</span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount ({appliedPromo.code})</span>
                <span className="font-mono">-${appliedPromo.discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Commercial Freight Shipping</span>
              <span className={`font-mono ${isFreeShippingUnlocked ? 'text-emerald-400 font-bold' : 'text-slate-200'}`}>
                {isFreeShippingUnlocked ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-mono text-slate-200">${taxEstimate.toFixed(2)}</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-black text-white">Estimated Total</span>
              <div className="text-right">
                <span className="text-lg font-black text-white font-mono">
                  ${totalCartPrice.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-slate-400 font-sans">USD</span>
                </span>
              </div>
            </div>
          </div>

          {/* Primary Checkout Button */}
          <button
            onClick={() => {
              if (cartItems.length === 0) {
                alert('Your cart is empty! Please add a custom canopy or accessory first.');
                return;
              }
              alert(`Connecting to Shopify Headless Checkout for $${totalCartPrice.toFixed(2)} USD!`);
            }}
            disabled={cartItems.length === 0}
            className="w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <Lock className="w-4 h-4 text-slate-950" />
            <span>Proceed to Secure Checkout</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          {/* Express Checkout Options */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => alert('Launching Shop Pay Instant Checkout')}
              className="flex-1 py-2 rounded-lg bg-[#5A31F4] hover:bg-[#4822d6] text-white font-bold text-[11px] transition-colors"
            >
              Shop Pay
            </button>
            <button
              onClick={() => alert('Launching PayPal Checkout')}
              className="flex-1 py-2 rounded-lg bg-[#FFC439] hover:bg-[#e0ad2f] text-slate-900 font-bold text-[11px] transition-colors"
            >
              PayPal
            </button>
            <button
              onClick={() => alert('Launching Apple Pay')}
              className="flex-1 py-2 rounded-lg bg-black hover:bg-neutral-900 text-white font-bold text-[11px] border border-neutral-700 transition-colors"
            >
              Apple Pay
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> 5-Yr Warranty
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-sky-400" /> Free Shipping $500+
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> 24-Hr Proof
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
