import React from 'react';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface StickyMobileBookingBarProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const StickyMobileBookingBar: React.FC<StickyMobileBookingBarProps> = ({
  cart,
  onOpenCart
}) => {
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.service.price * i.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-sky-200 p-3 shadow-[0_-10px_25px_rgba(2,132,199,0.15)]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        
        {totalItems > 0 ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-[#0284C7] relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#0284C7] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">Appointment Total</p>
              <p className="font-serif text-lg font-black text-[#1E3A5F]">₹{totalPrice}</p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#0284C7] font-extrabold">Gwalior Doorstep Salon</p>
            <p className="font-serif text-xs font-black text-[#1E3A5F]">Free Home Visit • Starting ₹199</p>
          </div>
        )}

        <button
          onClick={() => {
            if (totalItems > 0) {
              onOpenCart();
            } else {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="px-5 py-2.5 bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/25 flex items-center gap-2 active:scale-95 transition-all"
        >
          {totalItems > 0 ? (
            <>
              <span>Checkout Booking</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>Select Services</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};
