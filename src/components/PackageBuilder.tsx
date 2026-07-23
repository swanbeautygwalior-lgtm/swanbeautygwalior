import React, { useState } from 'react';
import { Sparkles, Calculator, Check, MessageCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { ServiceItem, CartItem } from '../types';

interface PackageBuilderProps {
  onAddMultipleToCart: (services: ServiceItem[]) => void;
}

export const PackageBuilder: React.FC<PackageBuilderProps> = ({ onAddMultipleToCart }) => {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    'wax-rica-combo1', // Rica Wax Trio
    'facial-classic-vitc', // Vit-C Facial
    'thread-eyebrow' // Eyebrow Threading
  ]);

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedServices = SERVICES_DATA.filter((s) => selectedServiceIds.includes(s.id));

  const rawTotal = selectedServices.reduce((sum, item) => sum + item.price, 0);

  // Automatic Combo Discount logic
  // 3+ items = 10% off
  // 5+ items = 15% off
  let discountPercentage = 0;
  if (selectedServices.length >= 5) {
    discountPercentage = 15;
  } else if (selectedServices.length >= 3) {
    discountPercentage = 10;
  }

  const discountAmount = Math.round((rawTotal * discountPercentage) / 100);
  const finalComboTotal = rawTotal - discountAmount;

  const popularSelections = SERVICES_DATA.slice(0, 15);

  const handleBookPackage = () => {
    if (selectedServices.length === 0) return;
    onAddMultipleToCart(selectedServices);

    const serviceListText = selectedServices.map((s) => `• ${s.name} (₹${s.price})`).join('%0A');
    const waText = `Hello%20Swan%20Beauty%2C%20I%20built%20a%20custom%20home%20salon%20package%20on%20your%20website%3A%0A%0A${serviceListText}%0A%0AOriginal%20Total%3A%20%E2%82%B9${rawTotal}%0ACombo%20Discount%20(${discountPercentage}\%20OFF)%3A%20-%E2%82%B9${discountAmount}%0AFinal%20Estimated%20Total%3A%20%E2%82%B9${finalComboTotal}%0A%0APlease%20confirm%20my%20Gwalior%20home%20appointment.`;

    window.open(`https://wa.me/919179586845?text=${waText}`, '_blank');
  };

  return (
    <section className="py-20 bg-[#050505] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">
            Interactive Calculator
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider">
            Build Your Own <span className="text-gold-gradient italic font-serif-accent">Custom Package</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light">
            Select 3 or more services to unlock <span className="text-[#D4AF37] font-bold">10% to 15% instant combo discounts</span>!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Service Selector Grid */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-widest flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#D4AF37]" /> Choose Services
              </h3>
              <button
                onClick={() => setSelectedServiceIds([])}
                className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                <RefreshCw className="w-3 h-3" /> Clear Selections
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {SERVICES_DATA.map((service) => {
                const isSelected = selectedServiceIds.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37]'
                        : 'bg-[#0a0a0a] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-white uppercase tracking-wider">{service.name}</p>
                      <p className="text-[11px] text-[#D4AF37] font-semibold">₹{service.price}</p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#D4AF37] text-black font-bold'
                          : 'border border-white/20 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Calculation Summary Box */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 border border-white/10 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-serif-luxury text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Package Summary
              </h3>
              <span className="text-xs font-bold bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-1 rounded-full border border-[#D4AF37]/40 uppercase tracking-widest">
                {selectedServices.length} Selected
              </span>
            </div>

            {/* Itemized List */}
            <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
              {selectedServices.length === 0 ? (
                <p className="text-xs text-gray-500 italic text-center py-4">
                  No services selected. Click on services on the left to add them!
                </p>
              ) : (
                selectedServices.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs text-gray-300">
                    <span className="truncate max-w-[200px]">{item.name}</span>
                    <span className="font-semibold text-white shrink-0">₹{item.price}</span>
                  </div>
                ))
              )}
            </div>

            {/* Discount Meter */}
            <div className="p-3.5 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-1">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#D4AF37]">Combo Discount</span>
                <span className="text-[#D4AF37]">
                  {discountPercentage > 0 ? `${discountPercentage}% OFF` : 'Select 3+ Services'}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                {selectedServices.length < 3
                  ? `Add ${3 - selectedServices.length} more service(s) to get 10% OFF!`
                  : selectedServices.length < 5
                  ? `Add ${5 - selectedServices.length} more service(s) to unlock 15% OFF!`
                  : '✨ Maximum 15% Combo Discount Unlocked!'}
              </p>
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex justify-between text-xs text-gray-400 uppercase tracking-wider">
                <span>Subtotal</span>
                <span>₹{rawTotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  <span>Combo Discount ({discountPercentage}%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span className="uppercase tracking-wider">Final Estimated Price</span>
                <span className="text-gold-gradient text-xl font-serif-luxury">
                  ₹{finalComboTotal}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleBookPackage}
                disabled={selectedServices.length === 0}
                className="w-full py-3.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 hover:bg-white transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Book Package via WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onAddMultipleToCart(selectedServices);
                  const btn = document.getElementById('cart-trigger-btn');
                  btn?.click();
                }}
                disabled={selectedServices.length === 0}
                className="w-full py-2.5 bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-50"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Add All To Cart</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
