import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  User,
  ShieldCheck,
  Flame,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Tag,
  Wallet,
  Gift,
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Navigation,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { CartItem, BookingFormData } from '../types';
import { AddressLocationPickerModal, AddressDetails } from './AddressLocationPickerModal';

interface BookingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenReferral?: () => void;
}

const HOLD_DURATION_SECONDS = 15 * 60; // 15 Minutes Hold

// Locality distance matrix from Gwalior City Centre Hub
const LOCALITY_DATA: Record<string, { distanceKm: number; etaMins: string; transportFee: number }> = {
  'City Centre, Gwalior': { distanceKm: 1.2, etaMins: '25-35 mins', transportFee: 0 },
  'Lashkar, Gwalior': { distanceKm: 2.8, etaMins: '30-40 mins', transportFee: 0 },
  'Morar, Gwalior': { distanceKm: 3.5, etaMins: '30-45 mins', transportFee: 0 },
  'Thatipur, Gwalior': { distanceKm: 2.1, etaMins: '25-35 mins', transportFee: 0 },
  'University Road, Gwalior': { distanceKm: 1.8, etaMins: '25-35 mins', transportFee: 0 },
  'Govindpuri, Gwalior': { distanceKm: 2.4, etaMins: '25-35 mins', transportFee: 0 },
  'Patel Nagar, Gwalior': { distanceKm: 3.2, etaMins: '30-40 mins', transportFee: 0 },
  'DD Nagar, Gwalior': { distanceKm: 4.8, etaMins: '35-45 mins', transportFee: 0 },
  'Vinay Nagar, Gwalior': { distanceKm: 5.1, etaMins: '40-50 mins', transportFee: 0 },
  'Other Gwalior Area': { distanceKm: 6.0, etaMins: '45-55 mins', transportFee: 0 },
};

// Preset Coupons
const PRESET_COUPONS = [
  { code: 'FRIEND150', discount: 150, minOrder: 500, desc: '₹150 OFF Referral Voucher Code' },
  { code: 'SWAN100', discount: 100, minOrder: 500, desc: '₹100 OFF on orders above ₹500' },
  { code: 'GLOW15', percent: 15, minOrder: 799, desc: '15% OFF on orders above ₹799' },
  { code: 'FIRSTBOOK', discount: 150, minOrder: 600, desc: '₹150 OFF for First-time client' },
  { code: 'GWALIOR50', discount: 50, minOrder: 300, desc: 'Flat ₹50 Instant Discount' },
];

export const BookingCartDrawer: React.FC<BookingCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenReferral,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'checkout'>('summary');
  const [timeLeft, setTimeLeft] = useState<number>(HOLD_DURATION_SECONDS);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>({
    code: 'SWAN100',
    discountAmount: 100,
  });
  const [couponError, setCouponError] = useState<string | null>(null);

  // Wallet state
  const USER_WALLET_BALANCE = 150;
  const [useWallet, setUseWallet] = useState<boolean>(true);

  // Client Address & Booking State
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    locality: 'City Centre, Gwalior',
    address: '',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    preferredTime: '10:00 AM – 11:00 AM',
    notes: '',
  });

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_visit' | 'upi_online'>('cash_on_visit');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);

  const currentLocalityInfo = LOCALITY_DATA[formData.locality] || LOCALITY_DATA['City Centre, Gwalior'];

  const handleSaveGpsAddress = (addressDetails: AddressDetails) => {
    const fullAddr = `${addressDetails.houseNumber}, ${addressDetails.street}, ${addressDetails.areaLocality}${addressDetails.landmark ? `, Landmark: ${addressDetails.landmark}` : ''}, ${addressDetails.city}, ${addressDetails.state} - ${addressDetails.pincode}`;
    
    // Find matching locality in LOCALITY_DATA or keep locality
    const matchedLocality = Object.keys(LOCALITY_DATA).find((loc) =>
      loc.toLowerCase().includes(addressDetails.areaLocality.toLowerCase())
    ) || 'City Centre, Gwalior';

    setFormData((prev) => ({
      ...prev,
      address: fullAddr,
      locality: matchedLocality,
    }));
  };

  // Real-time slot hold countdown timer
  useEffect(() => {
    if (cart.length === 0) {
      setTimeLeft(HOLD_DURATION_SECONDS);
      setIsExpired(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cart.length]);

  const handleExtendHold = () => {
    setTimeLeft(HOLD_DURATION_SECONDS);
    setIsExpired(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  // --- FINANCIAL CALCULATIONS ---
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 1. Service Total (actual prices)
  const rawSubtotal = cart.reduce((sum, item) => sum + item.service.price * item.quantity, 0);

  // Original total before catalog discounts (if originalPrice exists)
  const originalSubtotal = cart.reduce((sum, item) => {
    const orig = item.service.originalPrice || item.service.price;
    return sum + orig * item.quantity;
  }, 0);

  // Service Catalog Savings
  const catalogSavings = Math.max(0, originalSubtotal - rawSubtotal);

  // 2. Combo Discount (10% for 3+ items, 15% for 5+ items)
  let comboDiscountPct = 0;
  if (totalItemsCount >= 5) comboDiscountPct = 15;
  else if (totalItemsCount >= 3) comboDiscountPct = 10;
  const comboDiscountVal = Math.round((rawSubtotal * comboDiscountPct) / 100);

  // Price after Combo Discount
  const priceAfterCombo = Math.max(0, rawSubtotal - comboDiscountVal);

  // Mandatory Charges
  const transportCharge = 50; // Professional Transportation Cost
  const platformFeeAndTaxes = 99; // Platform Fee & Taxes (fixed)

  // Combined Amount before wallet / coupons
  const amountBeforeDiscounts = priceAfterCombo + transportCharge + platformFeeAndTaxes;

  // 3. Wallet Cash deduction
  let walletDeducted = 0;
  if (useWallet) {
    walletDeducted = Math.min(USER_WALLET_BALANCE, amountBeforeDiscounts);
  }

  const amountAfterWallet = Math.max(0, amountBeforeDiscounts - walletDeducted);

  // 4. Coupon Discount calculation
  let couponDiscountVal = 0;
  if (appliedCoupon) {
    couponDiscountVal = appliedCoupon.discountAmount;
    if (couponDiscountVal > amountAfterWallet) {
      couponDiscountVal = amountAfterWallet;
    }
  }

  // 5. Final Amount Payable
  const finalPayable = Math.max(0, amountAfterWallet - couponDiscountVal);

  // 6. Total Savings Calculation
  const totalSavings = catalogSavings + comboDiscountVal + couponDiscountVal + walletDeducted;

  // 7. Habari Rewards Points Earned (10% cashback on payable)
  const rewardPointsEarned = Math.round(finalPayable * 0.1);

  // Apply Coupon Logic
  const handleApplyCoupon = (codeToApply: string) => {
    setCouponError(null);
    const cleanCode = codeToApply.trim().toUpperCase();
    if (!cleanCode) return;

    const found = PRESET_COUPONS.find((c) => c.code === cleanCode);
    if (!found) {
      setCouponError('Invalid coupon code. Try SWAN100 or GWALIOR50');
      return;
    }

    if (rawSubtotal < found.minOrder) {
      setCouponError(`Minimum order value ₹${found.minOrder} required for ${found.code}`);
      return;
    }

    let discount = 0;
    if (found.discount) {
      discount = found.discount;
    } else if (found.percent) {
      discount = Math.round((priceAfterCombo * found.percent) / 100);
    }

    setAppliedCoupon({
      code: found.code,
      discountAmount: discount,
    });
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // WhatsApp Checkout Submission
  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in your name, phone number, and address in Gwalior.');
      return;
    }

    const itemsText = cart
      .map(
        (i) => `• ${i.service.name} (x${i.quantity}) - ₹${i.service.price * i.quantity}`
      )
      .join('%0A');

    const waText = `Hello%20Swan%20Beauty%2C%20I%20want%20to%20confirm%20my%20Home%20Salon%20Booking%20in%20Gwalior%3A%0A%0A*ORDER%20SUMMARY*%3A%0A${itemsText}%0A%0A*BILLING%20BREAKDOWN*%3A%0AService%20Total%3A%20%E2%82%B9${rawSubtotal}%0A${
      comboDiscountVal > 0 ? `Combo%20Discount%20(${comboDiscountPct}\%20OFF)%3A%20-%E2%82%B9${comboDiscountVal}%0A` : ''
    }Professional%20Transportation%20Cost%3A%20%E2%82%B950%0APlatform%20Fee%20%26%20Taxes%3A%20%E2%82%B999%0A${
      walletDeducted > 0 ? `Wallet%20Discount%3A%20-%E2%82%B9${walletDeducted}%0A` : ''
    }${
      appliedCoupon ? `Coupon%20Discount%20(${appliedCoupon.code})%3A%20-%E2%82%B9${couponDiscountVal}%0A` : ''
    }*Final%20Amount%20Payable*%3A%20%E2%82%B9${finalPayable}%0A*Total%20Savings*%3A%20%E2%82%B9${totalSavings}%0A*Habari%20Rewards%20Earned*%3A%20%E2%82%B9${rewardPointsEarned}%0A%0A*APPOINTMENT%20DETAILS*%3A%0AName%3A%20${encodeURIComponent(
      formData.name
    )}%0APhone%3A%20${encodeURIComponent(
      formData.phone
    )}%0ALocality%3A%20${encodeURIComponent(
      formData.locality
    )}%0AAddress%3A%20${encodeURIComponent(
      formData.address
    )}%0ATime%20Slot%3A%20${encodeURIComponent(
      formData.preferredTime
    )}%0APayment%20Method%3A%20${paymentMethod === 'cash_on_visit' ? 'Pay%20After%20Service%20(Cash/UPI)' : 'Online%20UPI'}%0ANotes%3A%20${encodeURIComponent(
      formData.notes || 'None'
    )}%0A%0APlease%20confirm%20beautician%20arrival.`;

    setIsOrderPlaced(true);
    setTimeout(() => {
      window.open(`https://wa.me/918349729518?text=${waText}`, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* SLEEK BOTTOM SHEET MODAL CONTAINER */}
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white rounded-t-[28px] shadow-[0_-12px_48px_rgba(2,132,199,0.2)] overflow-hidden max-h-[92vh] flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-full border-t border-sky-100">
        
        {/* Top Handle Bar for Touch Swipe Feel */}
        <div className="w-full bg-white pt-3 pb-1 flex flex-col items-center justify-center shrink-0 border-b border-sky-50">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-sky-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#4FC3F7] text-white rounded-2xl shadow-md shadow-sky-400/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-extrabold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                <span>Booking Summary</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-[#0284C7]">
                  {totalItemsCount} {totalItemsCount === 1 ? 'Service' : 'Services'}
                </span>
              </h3>
              <p className="text-[10px] text-[#0284C7] uppercase tracking-widest font-extrabold">
                Swan Beauty Doorstep Salon • Gwalior
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[10px] text-rose-600 hover:bg-rose-50 rounded-lg px-2 py-1 uppercase tracking-wider font-extrabold transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 hover:bg-sky-100 text-slate-600 hover:text-[#0284C7] rounded-full transition-colors"
              title="Close modal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Step Tabs */}
        {cart.length > 0 && (
          <div className="flex border-b border-sky-100 bg-sky-50/50 p-1.5 gap-2 shrink-0 px-5">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === 'summary'
                  ? 'bg-white text-[#0284C7] shadow-sm border border-sky-200'
                  : 'text-slate-600 hover:text-[#222222]'
              }`}
            >
              <span>1. Items & Discounts</span>
            </button>
            <button
              onClick={() => setActiveTab('checkout')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === 'checkout'
                  ? 'bg-[#4FC3F7] text-white shadow-md shadow-sky-400/30'
                  : 'text-slate-600 hover:text-[#222222]'
              }`}
            >
              <span>2. Doorstep Address</span>
            </button>
          </div>
        )}

        {/* TOP SUCCESS SAVINGS BANNER (#EAF8FF) */}
        {cart.length > 0 && (
          <div className="bg-[#EAF8FF] border-b border-sky-200 px-5 py-3 flex items-center justify-between shrink-0 shadow-inner">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🎉</span>
              <div>
                <p className="text-xs font-extrabold text-[#1E3A5F]">
                  You Saved <span className="text-[#0284C7] text-sm font-black">₹{totalSavings}</span> on this booking!
                </p>
                <p className="text-[10px] text-slate-600 font-medium">
                  Includes combo savings, coupons & catalog discounts
                </p>
              </div>
            </div>

            {/* Countdown Hold Badge */}
            <div className="bg-white px-2.5 py-1 rounded-xl border border-sky-200 text-right shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Slot Reserved</span>
              <span className="font-mono text-xs font-black text-[#0284C7]">{formatTime(timeLeft)}</span>
            </div>
          </div>
        )}

        {/* SCROLLABLE MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-white">
          
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-sky-50 border border-sky-200 rounded-full flex items-center justify-center mx-auto text-[#0284C7] shadow-inner">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base text-[#222222] uppercase tracking-wider font-extrabold">Your Appointment Cart is empty</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto font-normal">
                Explore our menu and add Rica Waxing, O3+ Facials, Hydra Glow, or Mani-Pedi services to view summary!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#4FC3F7] text-white font-extrabold text-xs uppercase tracking-widest rounded-[18px] hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-400/30"
              >
                Explore Services Menu
              </button>
            </div>
          ) : activeTab === 'summary' ? (
            /* TAB 1: SUMMARY & ITEMIZED BREAKDOWN */
            <div className="space-y-5">
              
              {/* Estimated Arrival & Distance Card */}
              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white text-[#0284C7] rounded-xl border border-sky-200 shadow-sm shrink-0">
                    <Navigation className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-[#1E3A5F] uppercase tracking-wider">Estimated Arrival</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-full uppercase">Fast Visit</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      ⚡ Technician arrives in <span className="font-bold text-[#0284C7]">{currentLocalityInfo.etaMins}</span> at {formData.locality}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-bold text-[#0284C7] bg-white px-3 py-1.5 rounded-xl border border-sky-200 shrink-0 text-center sm:text-right shadow-sm">
                  📍 {currentLocalityInfo.distanceKm} km from City Centre Hub
                </div>
              </div>

              {/* ITEMIZED SERVICES CARD */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-3 p-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h4 className="text-xs font-extrabold text-[#222222] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" /> Selected Services
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">Itemized Prices</span>
                </div>

                <div className="divide-y divide-gray-100 space-y-2">
                  {cart.map((item) => {
                    const origPrice = item.service.originalPrice || Math.round(item.service.price * 1.25);
                    const hasDiscount = origPrice > item.service.price;

                    return (
                      <div
                        key={item.service.id}
                        className="pt-2 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <h5 className="font-extrabold text-[#222222] truncate">{item.service.name}</h5>
                          <p className="text-[10px] text-slate-500">{item.service.category} • {item.service.durationMinutes} mins</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.service.id, -1)}
                            className="w-5 h-5 bg-white rounded-lg flex items-center justify-center text-slate-700 hover:text-[#0284C7] shadow-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-extrabold w-4 text-center text-[#222222]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.service.id, 1)}
                            className="w-5 h-5 bg-white rounded-lg flex items-center justify-center text-slate-700 hover:text-[#0284C7] shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price Column with Strikethrough */}
                        <div className="text-right shrink-0 min-w-[70px]">
                          {hasDiscount && (
                            <span className="line-through text-slate-400 text-[10px] mr-1">
                              ₹{origPrice * item.quantity}
                            </span>
                          )}
                          <span className="font-extrabold text-[#0284C7] text-xs">
                            ₹{item.service.price * item.quantity}
                          </span>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.service.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COUPON CODE SUPPORT CARD */}
              <div className="bg-white rounded-2xl border border-sky-100 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#222222] uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#0284C7]" /> Apply Promo Coupon
                  </span>
                  {appliedCoupon && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full uppercase">
                      Code Applied
                    </span>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-extrabold text-emerald-900">
                          Coupon '{appliedCoupon.code}' Applied!
                        </p>
                        <p className="text-[10px] text-emerald-700">Extra ₹{appliedCoupon.discountAmount} saved</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-[10px] text-rose-600 font-extrabold hover:underline uppercase tracking-wider"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter coupon code (e.g. SWAN100)"
                        className="flex-1 bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#0284C7] font-semibold uppercase placeholder:capitalize"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon(couponInput)}
                        className="px-4 py-2 bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0369A1] transition-all"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[10px] text-rose-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {couponError}
                      </p>
                    )}

                    {/* Quick Preset Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {PRESET_COUPONS.map((cp) => (
                        <button
                          key={cp.code}
                          type="button"
                          onClick={() => handleApplyCoupon(cp.code)}
                          className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[#0284C7] hover:bg-[#0284C7] hover:text-white transition-all"
                        >
                          🏷️ {cp.code} ({cp.discount ? `₹${cp.discount} OFF` : `${cp.percent}% OFF`})
                        </button>
                      ))}
                    </div>

                    {onOpenReferral && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenReferral();
                          }}
                          className="w-full p-2.5 rounded-xl bg-gradient-to-r from-sky-100 via-sky-50 to-white border border-sky-300 text-[#0284C7] hover:border-[#0284C7] font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-between transition-all shadow-sm"
                        >
                          <span className="flex items-center gap-1.5">
                            <Gift className="w-4 h-4 text-[#0284C7]" /> Want ₹150 OFF? Refer a Friend
                          </span>
                          <span className="text-[10px] text-sky-700 bg-white px-2 py-0.5 rounded-md border border-sky-200">
                            Get Link →
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* HABARI / SWAN WALLET CASH OPTION */}
              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white rounded-xl border border-sky-200 text-[#0284C7] shadow-sm">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#222222]">
                      Use Habari Wallet Balance
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Available Balance: <span className="font-bold text-[#0284C7]">₹{USER_WALLET_BALANCE}</span>
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useWallet}
                    onChange={(e) => setUseWallet(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0284C7]"></div>
                </label>
              </div>

              {/* BOOKING SUMMARY COST BREAKDOWN CARD */}
              <div className="bg-white rounded-2xl border border-sky-200 p-4 space-y-3 text-xs shadow-sm">
                <h4 className="font-extrabold text-[#1E3A5F] uppercase tracking-wider border-b border-sky-100 pb-2 flex items-center justify-between">
                  <span>Checkout Summary</span>
                  <span className="text-[10px] text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-full font-bold border border-sky-200">
                    Mandatory Charges Included
                  </span>
                </h4>

                {/* 1. Service Total */}
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>Service Total ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-bold text-[#1E3A5F]">₹{rawSubtotal}</span>
                </div>

                {/* 2. Combo / Catalog Discount (if applicable) */}
                {comboDiscountVal > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({comboDiscountPct}% Combo OFF)</span>
                    <span>-₹{comboDiscountVal}</span>
                  </div>
                )}

                {/* 3. Professional Transportation Cost – ₹50 */}
                <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-200 flex justify-between items-center text-[#1E3A5F] font-extrabold">
                  <span className="flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#0284C7]" />
                    Professional Transportation Cost
                  </span>
                  <span className="text-[#0284C7] text-sm">₹50</span>
                </div>

                {/* 4. Platform Fee & Taxes – ₹99 */}
                <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-200 space-y-1">
                  <div className="flex justify-between items-center text-[#1E3A5F] font-extrabold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                      Platform Fee & Taxes
                    </span>
                    <span className="text-[#0284C7] text-sm">₹99</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight">
                    (Supports platform operations, training, customer support, and secure booking.)
                  </p>
                </div>

                {/* 5. Wallet Discount (if used) */}
                {useWallet && walletDeducted > 0 && (
                  <div className="flex justify-between text-sky-700 font-bold">
                    <span>Wallet Discount (Habari Cash)</span>
                    <span>-₹{walletDeducted}</span>
                  </div>
                )}

                {/* 6. Coupon Discount (if applied) */}
                {appliedCoupon && couponDiscountVal > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span>-₹{couponDiscountVal}</span>
                  </div>
                )}

                {/* LUXURY BLUE GRADIENT DIVIDER ABOVE TOTAL */}
                <div className="h-1 bg-gradient-to-r from-sky-300 via-[#4FC3F7] to-[#0284C7] rounded-full my-3" />

                {/* HIGHLIGHT TOTAL */}
                <div className="flex justify-between items-center pt-1">
                  <div>
                    <span className="text-sm font-serif font-extrabold text-[#1E3A5F] uppercase tracking-wider block">
                      Final Amount Payable
                    </span>
                    <span className="text-[10px] text-slate-500">Includes doorstep visit + certified service</span>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-serif font-black text-[#0284C7]">
                      ₹{finalPayable}
                    </span>
                  </div>
                </div>
              </div>

              {/* REWARDS CASHBACK CARD BELOW TOTAL */}
              <div className="bg-[#EAF8FF] border border-sky-200 rounded-2xl p-3.5 flex items-center justify-between text-xs shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white rounded-xl text-[#0284C7] border border-sky-200 shadow-sm shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#1E3A5F]">
                      Earn <span className="text-[#0284C7]">₹{rewardPointsEarned} Habari Rewards</span> on this booking
                    </p>
                    <p className="text-[10px] text-slate-600">Points credited immediately after service completion</p>
                  </div>
                </div>

                <span className="text-xs">✨</span>
              </div>

            </div>
          ) : (
            /* TAB 2: SCHEDULE & ADDRESS FORM */
            <form id="checkout-address-form" onSubmit={handleSendWhatsAppOrder} className="space-y-4 text-xs">
              
              <div className="flex items-center justify-between pb-2 border-b border-sky-100">
                <span className="font-extrabold text-[#222222] uppercase tracking-wider">Appointment & Doorstep Details</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('summary')}
                  className="text-[#0284C7] text-[10px] uppercase tracking-wider font-extrabold hover:underline"
                >
                  ← Edit Summary
                </button>
              </div>

              <div>
                <label className="block text-[#222222] font-extrabold mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#0284C7]" /> Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2.5 text-[#222222] focus:outline-none focus:border-[#0284C7] font-semibold"
                />
              </div>

              <div>
                <label className="block text-[#222222] font-extrabold mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#0284C7]" /> Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 83497 29518"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2.5 text-[#222222] focus:outline-none focus:border-[#0284C7] font-semibold"
                />
              </div>

              <div>
                <label className="block text-[#222222] font-extrabold mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0284C7]" /> Locality in Gwalior *
                </label>
                <select
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2.5 text-[#222222] focus:outline-none focus:border-[#0284C7] font-semibold"
                >
                  {Object.keys(LOCALITY_DATA).map((loc) => (
                    <option key={loc} value={loc}>
                      {loc.replace(', Gwalior', '')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#222222] font-extrabold mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0284C7]" /> Preferred Visit Time Slot
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2.5 text-[#222222] focus:outline-none focus:border-[#0284C7] font-semibold"
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

              {/* GPS Auto-fill Location Action Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-100 via-sky-50 to-white border border-sky-300 flex items-center justify-between gap-3 shadow-sm">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0284C7] bg-white px-2 py-0.5 rounded-full border border-sky-200 inline-block mb-1">
                    Auto-Fill Doorstep Pin
                  </span>
                  <p className="font-extrabold text-[#1E3A5F] text-xs">Precise GPS Satellite Location</p>
                  <p className="text-[10px] text-slate-500">Detect live position & fine-tune on map pin</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGpsModalOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-sky-400/20 transition-all shrink-0 active:scale-95"
                >
                  <Navigation className="w-4 h-4 fill-current text-sky-200 animate-pulse" />
                  <span>Use GPS</span>
                </button>
              </div>

              <div>
                <label className="block text-[#222222] font-extrabold mb-1 uppercase tracking-wider text-[10px]">Doorstep House / Street Address *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Flat 302, Royal Palms, City Centre, Gwalior"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2.5 text-[#222222] focus:outline-none focus:border-[#0284C7] font-semibold"
                />
              </div>

              {/* Payment Option */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-[#222222] font-extrabold uppercase tracking-wider text-[10px]">Payment Method Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_visit')}
                    className={`p-3 rounded-xl border text-left font-bold text-xs flex items-center gap-2 transition-all ${
                      paymentMethod === 'cash_on_visit'
                        ? 'bg-[#EAF8FF] border-[#0284C7] text-[#0284C7]'
                        : 'bg-white border-gray-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${paymentMethod === 'cash_on_visit' ? 'text-[#0284C7]' : 'text-slate-300'}`} />
                    <span>Pay After Service (Cash/UPI)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi_online')}
                    className={`p-3 rounded-xl border text-left font-bold text-xs flex items-center gap-2 transition-all ${
                      paymentMethod === 'upi_online'
                        ? 'bg-[#EAF8FF] border-[#0284C7] text-[#0284C7]'
                        : 'bg-white border-gray-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${paymentMethod === 'upi_online' ? 'text-[#0284C7]' : 'text-slate-300'}`} />
                    <span>Instant UPI / QR Code</span>
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

        {/* STICKY BOTTOM FOOTER WITH LARGE #4FC3F7 ROUNDED-18PX BUTTON */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-sky-100 space-y-2.5 shrink-0 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
            
            <div className="flex justify-between items-center px-1 text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider">
                Total Amount ({totalItemsCount} items)
              </span>
              <span className="text-[#0284C7] text-lg font-serif font-black">
                ₹{finalPayable}
              </span>
            </div>

            {activeTab === 'summary' ? (
              <button
                onClick={() => setActiveTab('checkout')}
                className="w-full py-4 bg-[#4FC3F7] hover:bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-[0.2em] rounded-[18px] flex items-center justify-center gap-2 shadow-lg shadow-sky-400/30 transition-all duration-300 hover:scale-[1.01]"
              >
                <span>Proceed to Schedule & Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                form="checkout-address-form"
                type="submit"
                className="w-full py-4 bg-[#4FC3F7] hover:bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-[0.2em] rounded-[18px] flex items-center justify-center gap-2 shadow-lg shadow-sky-400/30 transition-all duration-300 hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4 fill-current text-white" />
                <span>Confirm & Send Booking on WhatsApp</span>
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Female Certified Beauticians • Doorstep Visit in Gwalior</span>
            </div>

          </div>
        )}

      </div>

      {/* GPS Location Picker Modal */}
      <AddressLocationPickerModal
        isOpen={isGpsModalOpen}
        onClose={() => setIsGpsModalOpen(false)}
        onSaveAddress={handleSaveGpsAddress}
      />

    </div>
  );
};
