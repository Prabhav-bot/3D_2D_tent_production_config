import React, { useState } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ShoppingBag, X, Code, CheckCircle, ArrowRight, Trash2 } from 'lucide-react';
import { buildShopifyProperties } from '../../services/shopifyService';

export const LineItemPropertiesDrawer: React.FC = () => {
  const isCartOpen = useConfiguratorStore((state) => state.isCartOpen);
  const setCartOpen = useConfiguratorStore((state) => state.setCartOpen);
  const cartItems = useConfiguratorStore((state) => state.cartItems);
  const config = useConfiguratorStore((state) => state.config);
  const pricing = useConfiguratorStore((state) => state.pricing);

  const [showRawPayload, setShowRawPayload] = useState(false);

  if (!isCartOpen) return null;

  const currentProperties = buildShopifyProperties(config, pricing);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-slate-100 text-base">Shopify Cart & Order Properties</h3>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Active Cart Line Items */}
          {cartItems.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cart Items</h4>
              {cartItems.map((item) => (
                <div key={item.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center p-1">
                      <img src={item.imageThumbnail} alt={item.title} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-slate-100">{item.title}</h5>
                      <span className="text-xs font-semibold text-sky-400">${item.price.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {/* Serialized Shopify Line Item Properties */}
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                      Shopify Line Item Properties:
                    </span>
                    {Object.entries(item.properties).map(([key, val]) => {
                      if (key.startsWith('_')) return null; // hide private metadata keys in drawer view
                      return (
                        <div key={key} className="flex justify-between text-[11px] leading-tight">
                          <span className="text-slate-400 font-medium">{key}:</span>
                          <span className="text-slate-200 font-mono text-right max-w-[200px] truncate">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-sm">
              Your Shopify Cart is currently empty. Click "Add to Cart" to serialize your custom tent configuration.
            </div>
          )}

          {/* Shopify Payload Inspector Box */}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => setShowRawPayload(!showRawPayload)}
              className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold mb-2"
            >
              <Code className="w-4 h-4" /> {showRawPayload ? 'Hide' : 'Inspect'} Raw Shopify AJAX Payload JSON
            </button>

            {showRawPayload && (
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56">
                {JSON.stringify(
                  {
                    items: [
                      {
                        id: config.productId,
                        quantity: 1,
                        properties: currentProperties,
                      },
                    ],
                  },
                  null,
                  2
                )}
              </pre>
            )}
          </div>
        </div>

        {/* Drawer Footer Checkout Button */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 space-y-2">
          <button
            onClick={() => alert('Proceeding to Simulated Shopify Headless Checkout Stream!')}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>Checkout Now (${pricing.totalPrice.toFixed(2)})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-slate-500 text-center block">
            Line item properties attached to Shopify checkout payload session.
          </span>
        </div>
      </div>
    </div>
  );
};
