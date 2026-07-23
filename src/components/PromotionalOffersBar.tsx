import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Gift, Zap, ShieldCheck } from 'lucide-react';

interface OfferCoupon {
  id: string;
  code: string;
  title: string;
  discount: string;
  minOrder?: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  tag: string;
}

const OFFERS: OfferCoupon[] = [
  {
    id: 'off-1',
    code: 'WELCOME100',
    title: 'Flat ₹100 OFF First Order',
    discount: '₹100 OFF',
    minOrder: 'Min booking ₹499',
    bgGradient: 'from-sky-500 to-sky-600',
    borderColor: 'border-sky-300',
    textColor: 'text-[#1E3A5F]',
    tag: 'NEW USER'
  },
  {
    id: 'off-2',
    code: 'HYDRA150',
    title: 'Extra ₹150 OFF Korean Hydra Facial',
    discount: '₹150 OFF',
    minOrder: 'Valid on Hydra Glow',
    bgGradient: 'from-blue-600 to-indigo-600',
    borderColor: 'border-blue-300',
    textColor: 'text-[#1E3A5F]',
    tag: 'LIMITED TIME'
  },
  {
    id: 'off-3',
    code: 'RICA200',
    title: 'Rica Full Body Waxing Combo Discount',
    discount: '₹200 OFF',
    minOrder: 'Full Body Packs',
    bgGradient: 'from-cyan-600 to-sky-700',
    borderColor: 'border-cyan-300',
    textColor: 'text-[#1E3A5F]',
    tag: 'POPULAR'
  },
  {
    id: 'off-4',
    code: 'COMBO15',
    title: 'Custom Package Builder Discount',
    discount: '15% CASHBACK',
    minOrder: '3+ Services',
    bgGradient: 'from-[#0284C7] to-sky-800',
    borderColor: 'border-sky-400',
    textColor: 'text-[#1E3A5F]',
    tag: 'SAVE BIG'
  }
];

interface PromotionalOffersBarProps {
  onApplyCoupon?: (code: string) => void;
}

export const PromotionalOffersBar: React.FC<PromotionalOffersBarProps> = ({ onApplyCoupon }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    if (onApplyCoupon) onApplyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-6 bg-gradient-to-r from-sky-100 via-sky-50 to-white border-y border-sky-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0284C7] text-white">
              <Zap className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-extrabold text-[#1E3A5F] uppercase tracking-wider">
                Exclusive Home Salon Deals & Coupons
              </h3>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Tap code to copy & apply extra cashback at appointment checkout
              </p>
            </div>
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0284C7] bg-white px-2.5 py-1 rounded-full border border-sky-200 shrink-0">
            Swipe Coupons ➔
          </span>
        </div>

        {/* Compact Horizontal Slider */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x snap-mandatory">
          {OFFERS.map((offer) => {
            const isCopied = copiedCode === offer.code;
            return (
              <div
                key={offer.id}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl p-3.5 border border-sky-200 shadow-sm hover:shadow-md hover:border-[#0284C7] transition-all flex items-center justify-between gap-3 relative overflow-hidden group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-100 text-[#0284C7]">
                      {offer.tag}
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-600">
                      {offer.discount}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-[#1E3A5F] truncate">
                    {offer.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {offer.minOrder}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(offer.code)}
                  className={`shrink-0 px-3 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0284C7] text-white hover:bg-[#0369A1]'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{offer.code}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
