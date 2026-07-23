import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Check,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  ShieldCheck,
  Sparkles,
  Lock,
  MessageCircle,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';
import { CartItem } from '../types';
import { BookingCalendarWidget, TimeSlot } from './BookingCalendarWidget';

interface AppointmentBookingSectionProps {
  cart?: CartItem[];
  onOpenCart?: () => void;
  onBookingConfirmed?: (bookingDetails: { date: string; timeSlot: string; name: string; phone: string; address: string }) => void;
}

export const AppointmentBookingSection: React.FC<AppointmentBookingSectionProps> = ({
  cart = [],
  onOpenCart,
  onBookingConfirmed,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Selection state
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  // Client Details Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientLocality, setClientLocality] = useState('City Centre, Gwalior');
  const [clientAddress, setClientAddress] = useState('');
  const [customServices, setCustomServices] = useState('');

  // Booking confirmation modal/feedback state
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<any>(null);

  // Mock Booked Slots per date (stored in state or localStorage so users can see booked slots)
  const [bookedSlotsMap, setBookedSlotsMap] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('swan_beauty_booked_slots');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default pre-booked slots for realistic experience
    const today = new Date().toISOString().split('T')[0];
    const tomorrowObj = new Date();
    tomorrowObj.setDate(tomorrowObj.getDate() + 1);
    const tomorrow = tomorrowObj.toISOString().split('T')[0];

    return {
      [today]: ['slot-01-02'], // 1 PM slot booked today
      [tomorrow]: ['slot-11-12', 'slot-03-04'], // 11 AM and 3 PM booked tomorrow
    };
  });

  // Save Booked slots to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('swan_beauty_booked_slots', JSON.stringify(bookedSlotsMap));
    } catch (e) {
      console.error(e);
    }
  }, [bookedSlotsMap]);

  // Check if a time slot is in the past for today's date
  const isSlotInPast = (slot: TimeSlot, dateStr: string): boolean => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (dateStr !== todayStr) return false;

    const currentHour = new Date().getHours();
    // If slot start hour is less than or equal to current hour, it's passed
    return slot.startTime <= currentHour;
  };

  // Check if a time slot is already booked for selected date
  const isSlotBooked = (slotId: string, dateStr: string): boolean => {
    const bookedForDate = bookedSlotsMap[dateStr] || [];
    return bookedForDate.includes(slotId);
  };

  // Format selected date nicely
  const getFormattedSelectedDate = (): string => {
    if (!selectedDateStr) return '';
    const parts = selectedDateStr.split('-').map(Number);
    if (parts.length !== 3) return selectedDateStr;
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);

    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Confirm Booking Action
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDateStr || !selectedTimeSlot) {
      return;
    }

    // Save as booked slot locally
    const existingBooked = bookedSlotsMap[selectedDateStr] || [];
    const updatedBooked = [...existingBooked, selectedTimeSlot.id];
    setBookedSlotsMap((prev) => ({
      ...prev,
      [selectedDateStr]: updatedBooked,
    }));

    // Services string
    const cartServicesList = cart.length > 0
      ? cart.map((i) => `${i.service.name} (x${i.quantity})`).join(', ')
      : customServices || 'General Home Salon Consultation';

    const formattedDate = getFormattedSelectedDate();

    const bookingPayload = {
      date: formattedDate,
      timeSlot: selectedTimeSlot.label,
      name: clientName || 'Guest Client',
      phone: clientPhone || 'Provided via WhatsApp',
      locality: clientLocality,
      address: clientAddress || 'Address will be confirmed on WhatsApp',
      services: cartServicesList,
    };

    setConfirmedBookingData(bookingPayload);
    setIsConfirmedModalOpen(true);

    if (onBookingConfirmed) {
      onBookingConfirmed({
        date: formattedDate,
        timeSlot: selectedTimeSlot.label,
        name: clientName,
        phone: clientPhone,
        address: clientAddress,
      });
    }

    // Prepare WhatsApp Message
    const whatsappMsg = `*HABARI BEAUTY APPOINTMENT BOOKING* 👑\n-----------------------------------\n📅 *Date:* ${formattedDate}\n⏰ *Time Slot:* ${selectedTimeSlot.label}\n👤 *Client Name:* ${clientName || 'Gwalior Client'}\n📞 *Phone:* ${clientPhone || 'N/A'}\n📍 *Gwalior Area:* ${clientLocality}\n🏠 *Address:* ${clientAddress || 'At Home'}\n💅 *Services Requested:* ${cartServicesList}\n\n*BILLING BREAKDOWN*:\n• Service Total: ₹${cartSubtotal}\n• Professional Transportation Cost: ₹50 (100% to beautician)\n• Platform Fee & Taxes: ₹99\n*Final Amount Payable:* ₹${totalAppointmentPayable}\n-----------------------------------\n_Please confirm my home salon slot reservation!_`;

    const encodedMsg = encodeURIComponent(whatsappMsg);
    const whatsappUrl = `https://wa.me/918349729518?text=${encodedMsg}`;

    // Open WhatsApp after brief delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  // Calculate cart subtotal & mandatory charges
  const cartSubtotal = cart.reduce((sum, item) => sum + item.service.price * item.quantity, 0);
  const transportCost = 50;
  const platformFeeAndTaxes = 99;
  const totalAppointmentPayable = cartSubtotal + transportCost + platformFeeAndTaxes;

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-[#E0F2FE]/60 via-[#F0F9FF] to-white relative border-t border-sky-100">
      
      {/* Background Decorative Sky Blue Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Luxury Reservation</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1E3A5F] uppercase tracking-wider">
            Select Your <span className="text-[#0284C7] italic font-normal">Appointment Slot</span>
          </h2>
          
          <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-xl mx-auto">
            Choose your preferred date & 1-hour home visit time slot. Certified female beauticians arrive with sanitized single-use kits.
          </p>
        </div>

        {/* Main Interactive Booking Grid / Card Container */}
        <div className="rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-[0_20px_50px_rgba(2,132,199,0.08)] bg-white/95 backdrop-blur-2xl space-y-8">
          
          {/* CALENDAR VIEW WIDGET FOR DATE & TIME SLOT SELECTION */}
          <BookingCalendarWidget
            selectedDateStr={selectedDateStr}
            onSelectDate={(dateStr) => setSelectedDateStr(dateStr)}
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={(slot) => setSelectedTimeSlot(slot)}
            bookedSlotsMap={bookedSlotsMap}
            isSlotInPast={isSlotInPast}
            isSlotBooked={isSlotBooked}
          />

          <div className="w-full h-px bg-sky-100" />

          {/* STEP 3: SUMMARY & CONFIRMATION DETAILS FORM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Client Details Form */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-100 border border-sky-300 text-[#0284C7]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-extrabold text-[#1E3A5F] uppercase tracking-wider">
                    3. Contact & Location Details
                  </h3>
                  <p className="text-[11px] text-slate-500">Doorstep appointment address in Gwalior</p>
                </div>
              </div>

              <form id="appointment-confirm-form" onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1E3A5F] font-bold mb-1 uppercase tracking-wider text-[10px]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Radhika Tomar"
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3.5 py-2.5 text-[#1E3A5F] placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1E3A5F] font-bold mb-1 uppercase tracking-wider text-[10px]">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 83497 29518"
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3.5 py-2.5 text-[#1E3A5F] placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1E3A5F] font-bold mb-1 uppercase tracking-wider text-[10px]">
                      Locality in Gwalior *
                    </label>
                    <select
                      value={clientLocality}
                      onChange={(e) => setClientLocality(e.target.value)}
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3.5 py-2.5 text-[#1E3A5F] focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all"
                    >
                      <option value="City Centre, Gwalior">City Centre</option>
                      <option value="Lashkar, Gwalior">Lashkar</option>
                      <option value="Morar, Gwalior">Morar</option>
                      <option value="Thatipur, Gwalior">Thatipur</option>
                      <option value="University Road, Gwalior">University Road</option>
                      <option value="Govindpuri, Gwalior">Govindpuri</option>
                      <option value="Patel Nagar, Gwalior">Patel Nagar</option>
                      <option value="DD Nagar, Gwalior">DD Nagar</option>
                      <option value="Vinay Nagar, Gwalior">Vinay Nagar</option>
                      <option value="Other Area in Gwalior">Other Area in Gwalior</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1E3A5F] font-bold mb-1 uppercase tracking-wider text-[10px]">
                      House / Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="e.g. House No. 42, Block B"
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3.5 py-2.5 text-[#1E3A5F] placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Services list indicator */}
                {cart.length === 0 && (
                  <div>
                    <label className="block text-[#1E3A5F] font-bold mb-1 uppercase tracking-wider text-[10px]">
                      Services Requested (Optional if cart is empty)
                    </label>
                    <input
                      type="text"
                      value={customServices}
                      onChange={(e) => setCustomServices(e.target.value)}
                      placeholder="e.g. Rica Waxing, O3+ Facial, Hydra Glow"
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3.5 py-2.5 text-[#1E3A5F] placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all"
                    />
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: Selected Summary Box & Confirm CTA */}
            <div className="lg:col-span-5 bg-gradient-to-b from-sky-50/80 to-sky-100/50 rounded-2xl p-6 border border-sky-200 space-y-5 shadow-xl relative overflow-hidden">
              
              <div className="pb-3 border-b border-sky-200 flex items-center justify-between">
                <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
                  <span>Reservation Summary</span>
                </h4>
                <span className="text-[10px] text-[#0284C7] font-extrabold uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full border border-sky-200">
                  Swan Beauty Hub
                </span>
              </div>

              {/* Live Selection Summary */}
              <div className="space-y-3 text-xs">
                
                {/* Date Summary */}
                <div className="p-3 rounded-xl bg-white border border-sky-200 flex items-center justify-between shadow-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-[#0284C7]" /> Date
                  </span>
                  <span className="font-extrabold text-[#1E3A5F] text-right">
                    {selectedDateStr ? getFormattedSelectedDate() : <span className="text-rose-500 italic">Not Selected</span>}
                  </span>
                </div>

                {/* Time Slot Summary */}
                <div className="p-3 rounded-xl bg-white border border-sky-200 flex items-center justify-between shadow-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#0284C7]" /> Time Slot
                  </span>
                  <span className="font-extrabold text-[#0284C7] text-right">
                    {selectedTimeSlot ? selectedTimeSlot.label : <span className="text-rose-500 italic">Not Selected</span>}
                  </span>
                </div>

                {/* Location Summary */}
                <div className="p-3 rounded-xl bg-white border border-sky-200 flex items-center justify-between shadow-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#0284C7]" /> Location
                  </span>
                  <span className="font-extrabold text-[#1E3A5F] text-right truncate max-w-[180px]">
                    {clientLocality}
                  </span>
                </div>

                {/* Cart Services Summary & Mandatory Charges Breakdown */}
                <div className="p-3.5 rounded-xl bg-white border border-sky-200 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-[#0284C7]" /> Pricing Breakdown
                    </span>
                    {cart.length > 0 && (
                      <button
                        type="button"
                        onClick={onOpenCart}
                        className="text-[10px] text-[#0284C7] hover:underline uppercase font-extrabold"
                      >
                        View Cart ({cart.length})
                      </button>
                    )}
                  </div>

                  {cart.length > 0 ? (
                    <div className="space-y-1.5 pt-1 text-xs">
                      {cart.map((item) => (
                        <div key={item.service.id} className="flex justify-between text-slate-700 font-normal text-[11px]">
                          <span className="truncate max-w-[170px]">• {item.service.name} (x{item.quantity})</span>
                          <span className="font-bold text-[#1E3A5F]">₹{item.service.price * item.quantity}</span>
                        </div>
                      ))}

                      <div className="pt-2 border-t border-sky-100 space-y-1 text-[11px]">
                        <div className="flex justify-between text-slate-600 font-medium">
                          <span>Service Total</span>
                          <span className="font-bold text-[#1E3A5F]">₹{cartSubtotal}</span>
                        </div>

                        <div className="flex justify-between text-slate-600 font-medium">
                          <span className="text-slate-700">Professional Transportation Cost</span>
                          <span className="font-bold text-[#0284C7]">₹{transportCost}</span>
                        </div>

                        <div className="flex justify-between text-slate-600 font-medium">
                          <span className="text-slate-700">Platform Fee & Taxes</span>
                          <span className="font-bold text-[#0284C7]">₹{platformFeeAndTaxes}</span>
                        </div>

                        <div className="pt-2 border-t border-sky-200 flex justify-between font-extrabold text-[#1E3A5F] text-xs">
                          <span>Final Amount Payable</span>
                          <span className="text-[#0284C7] text-sm font-black">₹{totalAppointmentPayable}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5 pt-1 text-[11px]">
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>Professional Transportation Cost</span>
                        <span className="font-bold text-[#0284C7]">₹{transportCost}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>Platform Fee & Taxes</span>
                        <span className="font-bold text-[#0284C7]">₹{platformFeeAndTaxes}</span>
                      </div>
                      <p className="text-slate-500 text-[10px] leading-tight pt-1">
                        Mandatory charges are automatically added to all home salon appointments in Gwalior.
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Validation Warning / Confirmation State */}
              {(!selectedDateStr || !selectedTimeSlot) && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Please select both a date and time slot above to enable confirmation.</span>
                </div>
              )}

              {/* CONFIRM BOOKING BUTTON */}
              <button
                type="submit"
                form="appointment-confirm-form"
                disabled={!selectedDateStr || !selectedTimeSlot}
                className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 shadow-lg transition-all duration-300 ${
                  selectedDateStr && selectedTimeSlot
                    ? 'bg-[#0284C7] text-white hover:bg-[#0369A1] cursor-pointer hover:scale-[1.01] shadow-sky-500/30'
                    : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-60'
                }`}
              >
                <MessageCircle className="w-4 h-4 fill-current text-sky-200" />
                <span>Confirm Appointment Slot</span>
              </button>

              <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
                ⚡ Direct instant confirmation with Swan Beauty support on WhatsApp
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CONFIRMED BOOKING MODAL */}
      {isConfirmedModalOpen && confirmedBookingData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white border border-sky-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 text-center shadow-2xl relative">
            
            <div className="w-16 h-16 rounded-full bg-sky-100 border-2 border-[#0284C7] mx-auto flex items-center justify-center text-[#0284C7]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#0284C7]">
                Appointment Slot Reserved
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1E3A5F] uppercase tracking-wider">
                Booking Details Submitted!
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Opening WhatsApp to finish confirmation with our Gwalior salon manager.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-sky-200 pb-1.5">
                <span className="text-slate-500 uppercase tracking-wider font-bold">Date:</span>
                <span className="font-extrabold text-[#1E3A5F]">{confirmedBookingData.date}</span>
              </div>
              <div className="flex justify-between border-b border-sky-200 pb-1.5">
                <span className="text-slate-500 uppercase tracking-wider font-bold">Slot:</span>
                <span className="font-extrabold text-[#0284C7]">{confirmedBookingData.timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-sky-200 pb-1.5">
                <span className="text-slate-500 uppercase tracking-wider font-bold">Client:</span>
                <span className="font-extrabold text-[#1E3A5F]">{confirmedBookingData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 uppercase tracking-wider font-bold">Location:</span>
                <span className="font-extrabold text-[#1E3A5F]">{confirmedBookingData.locality}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/918349729518?text=${encodeURIComponent(
                  `Hello Swan Beauty, confirming my slot for ${confirmedBookingData.date} at ${confirmedBookingData.timeSlot}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0369A1] transition-all rounded-xl shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current text-sky-200" />
                <span>Open WhatsApp Chat</span>
              </a>

              <button
                onClick={() => setIsConfirmedModalOpen(false)}
                className="w-full py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
