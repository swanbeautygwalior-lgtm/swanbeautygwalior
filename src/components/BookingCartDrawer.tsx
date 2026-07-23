import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle, Calendar, MapPin, Clock, User, ShieldCheck } from 'lucide-react';
import { CartItem, BookingFormData } from '../types';

interface BookingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const BookingCartDrawer: React.FC<BookingCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    locality: 'City Centre, Gwalior',
    address: '',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    preferredTime: '10:00 AM - 01:00 PM',
    notes: '',
  });

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.service.price * item.quantity, 0);

  // Auto combo discount logic
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  let discountPct = 0;
  if (totalItemsCount >= 5) discountPct = 15;
  else if (totalItemsCount >= 3) discountPct = 10;

  const discountVal = Math.round((rawSubtotal * discountPct) / 100);
  const finalTotal = rawSubtotal - discountVal;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please complete your name, phone number, and address in Gwalior.');
      return;
    }

    const itemsText = cart
      .map(
        (i) => `• ${i.service.name} (x${i.quantity}) - ₹${i.service.price * i.quantity}`
      )
      .join('%0A');

    const waText = `Hello%20Swan%20Beauty%2C%20I%20would%20like%20to%20confirm%20my%20Home%20Salon%20Appointment%20in%20Gwalior%3A%0A%0A*SELECTED%20SERVICES*%3A%0A${itemsText}%0A%0A*BILLING%20SUMMARY*%3A%0ASubtotal%3A%20%E2%82%B9${rawSubtotal}%0ACombo%20Discount%20(${discountPct}\%20OFF)%3A%20-%E2%82%B9${discountVal}%0A*Final%20Total*%3A%20%E2%82%B9${finalTotal}%0A%0A*APPOINTMENT%20DETAILS*%3A%0AName%3A%20${encodeURIComponent(
      formData.name
    )}%0APhone%3A%20${encodeURIComponent(
      formData.phone
    )}%0ALocality%3A%20${encodeURIComponent(
      formData.locality
    )}%0AFull%20Address%3A%20${encodeURIComponent(
      formData.address
    )}%0APreferred%20Date%3A%20${encodeURIComponent(
      formData.preferredDate
    )}%0APreferred%20Time%3A%20${encodeURIComponent(
      formData.preferredTime
    )}%0ANotes%3A%20${encodeURIComponent(
      formData.notes || 'None'
    )}%0A%0APlease%20confirm%20the%20beautician%20visit.`;

    window.open(`https://wa.me/919179586845?text=${waText}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-lg bg-[#050505] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif-luxury text-lg font-bold text-white uppercase tracking-wider">
              Appointment Cart ({totalItemsCount})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[10px] text-rose-400 hover:underline uppercase tracking-wider font-semibold px-2 py-1"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <ShoppingBag className="w-16 h-16 text-gray-700 mx-auto" />
              <p className="text-xs text-white uppercase tracking-wider font-semibold">Your Appointment Cart is empty</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our menu and add Rica Waxing, O3+ Facials, Hydra Glow, or Mani-Pedi services!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-white transition-all"
              >
                Browse Services
              </button>
            </div>
          ) : step === 'cart' ? (
            /* STEP 1: CART LIST */
            <div className="space-y-4">
              
              {/* Discount Banner */}
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#D4AF37] flex items-center justify-between uppercase tracking-wider font-semibold">
                <span>
                  {discountPct > 0 ? `🎉 ${discountPct}% Combo Savings Applied!` : '💡 Select 3+ services for 10% OFF'}
                </span>
                <span className="font-bold text-[#D4AF37]">
                  {discountPct > 0 ? `-₹${discountVal}` : ''}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.service.id}
                    className="p-3.5 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">
                        {item.service.name}
                      </h4>
                      <p className="text-[11px] text-[#D4AF37] font-semibold">
                        ₹{item.service.price} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-[#050505] p-1 border border-white/10">
                      <button
                        onClick={() => onUpdateQuantity(item.service.id, -1)}
                        className="w-6 h-6 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center text-[#D4AF37]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.service.id, 1)}
                        className="w-6 h-6 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.service.id)}
                      className="text-gray-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Guarantees */}
              <div className="p-3 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-1.5 text-[11px] text-gray-400">
                <p className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Female Beauticians Guaranteed
                </p>
                <p>• Free home visit delivery in Gwalior</p>
                <p>• Single-use sanitized disposable kits opened at home</p>
              </div>

            </div>
          ) : (
            /* STEP 2: CHECKOUT ADDRESS FORM */
            <form id="checkout-form" onSubmit={handleSendWhatsAppOrder} className="space-y-4 text-xs">
              
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-bold text-white uppercase tracking-wider">Gwalior Address Details</span>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-[#D4AF37] text-[10px] uppercase tracking-wider font-semibold hover:underline"
                >
                  ← Edit Cart
                </button>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anjali Tomar"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Phone Number (For Visit Confirmation) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 91795 XXXXX"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Gwalior Area
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="City Centre, Gwalior">City Centre</option>
                    <option value="Lashkar, Gwalior">Lashkar</option>
                    <option value="Morar, Gwalior">Morar</option>
                    <option value="Thatipur, Gwalior">Thatipur</option>
                    <option value="University Road, Gwalior">University Road</option>
                    <option value="Patel Nagar, Gwalior">Patel Nagar</option>
                    <option value="DD Nagar, Gwalior">DD Nagar</option>
                    <option value="Other Gwalior Area">Other Area</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferred Time Slot (1-Hour)
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="10:00 AM – 11:00 AM">10:00 AM – 11:00 AM</option>
                  <option value="11:00 AM – 12:00 PM">11:00 AM – 12:00 PM</option>
                  <option value="12:00 PM – 01:00 PM">12:00 PM – 01:00 PM</option>
                  <option value="01:00 PM – 02:00 PM">01:00 PM – 02:00 PM</option>
                  <option value="02:00 PM – 03:00 PM">02:00 PM – 03:00 PM</option>
                  <option value="03:00 PM – 04:00 PM">03:00 PM – 04:00 PM</option>
                  <option value="04:00 PM – 05:00 PM">04:00 PM – 05:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">House No. / Street Address *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Flat 302, Royal Palms, City Centre, Gwalior"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Special Instructions (Optional)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Please bring extra Rica wax for sensitive skin"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

            </form>
          )}

        </div>

        {/* Drawer Footer with Totals & Action */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#0a0a0a] border-t border-white/10 space-y-3">
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-gray-400 uppercase tracking-wider">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span>₹{rawSubtotal}</span>
              </div>
              {discountVal > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold uppercase tracking-wider">
                  <span>Combo Savings ({discountPct}% OFF)</span>
                  <span>-₹{discountVal}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-white/10">
                <span className="uppercase tracking-wider">Estimated Total</span>
                <span className="text-gold-gradient text-xl font-serif-luxury">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-white transition-all"
              >
                <span>Proceed to Address & Schedule</span>
              </button>
            ) : (
              <button
                form="checkout-form"
                type="submit"
                className="w-full py-3.5 bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-emerald-400 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Confirm & Send Booking on WhatsApp</span>
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
