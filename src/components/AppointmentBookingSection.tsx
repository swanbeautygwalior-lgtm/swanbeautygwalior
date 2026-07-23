import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Lock,
  MessageCircle,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';
import { CartItem } from '../types';

interface AppointmentBookingSectionProps {
  cart?: CartItem[];
  onOpenCart?: () => void;
  onBookingConfirmed?: (bookingDetails: { date: string; timeSlot: string; name: string; phone: string; address: string }) => void;
}

interface TimeSlot {
  id: string;
  label: string;
  startTime: number; // 24-hour start hour integer (e.g., 10 for 10:00 AM, 13 for 01:00 PM)
}

const TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-10-11', label: '10:00 AM – 11:00 AM', startTime: 10 },
  { id: 'slot-11-12', label: '11:00 AM – 12:00 PM', startTime: 11 },
  { id: 'slot-12-01', label: '12:00 PM – 01:00 PM', startTime: 12 },
  { id: 'slot-01-02', label: '01:00 PM – 02:00 PM', startTime: 13 },
  { id: 'slot-02-03', label: '02:00 PM – 03:00 PM', startTime: 14 },
  { id: 'slot-03-04', label: '03:00 PM – 04:00 PM', startTime: 15 },
  { id: 'slot-04-05', label: '04:00 PM – 05:00 PM', startTime: 16 },
];

export const AppointmentBookingSection: React.FC<AppointmentBookingSectionProps> = ({
  cart = [],
  onOpenCart,
  onBookingConfirmed,
}) => {
  // Generate next 21 days starting from today
  const [availableDates, setAvailableDates] = useState<
    { dateObj: Date; dateStr: string; dayName: string; dayNum: number; monthName: string; isToday: boolean }[]
  >([]);

  // Selection state
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');
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

  const datesScrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate Date Cards on Load
  useEffect(() => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 21; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const isToday = i === 0;

      dates.push({
        dateObj: d,
        dateStr,
        dayName,
        dayNum,
        monthName,
        isToday,
      });
    }

    setAvailableDates(dates);
    // Auto-select today by default
    if (dates.length > 0) {
      setSelectedDateStr(dates[0].dateStr);
    }
  }, []);

  // Save Booked slots to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('swan_beauty_booked_slots', JSON.stringify(bookedSlotsMap));
    } catch (e) {
      console.error(e);
    }
  }, [bookedSlotsMap]);

  // Scroll Horizontal Date Picker Strip
  const scrollDates = (direction: 'left' | 'right') => {
    if (datesScrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      datesScrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
    const dateItem = availableDates.find((d) => d.dateStr === selectedDateStr);
    if (!dateItem) return selectedDateStr;

    return dateItem.dateObj.toLocaleDateString('en-US', {
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
    const whatsappMsg = `*SWAN BEAUTY APPOINTMENT BOOKING* 👑\n-----------------------------------\n📅 *Date:* ${formattedDate}\n⏰ *Time Slot:* ${selectedTimeSlot.label}\n👤 *Client Name:* ${clientName || 'Gwalior Client'}\n📞 *Phone:* ${clientPhone || 'N/A'}\n📍 *Gwalior Area:* ${clientLocality}\n🏠 *Address:* ${clientAddress || 'At Home'}\n💅 *Services Requested:* ${cartServicesList}\n-----------------------------------\n_Please confirm my home salon slot reservation!_`;

    const encodedMsg = encodeURIComponent(whatsappMsg);
    const whatsappUrl = `https://wa.me/919179586845?text=${encodedMsg}`;

    // Open WhatsApp after brief delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  // Calculate cart subtotal
  const cartSubtotal = cart.reduce((sum, item) => sum + item.service.price * item.quantity, 0);

  return (
    <section id="booking" className="py-20 bg-[#050505] relative border-t border-white/10">
      
      {/* Background Decorative Gold Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Luxury Reservation</span>
          </div>
          
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
            Select Your <span className="text-gold-gradient italic font-serif-accent">Appointment Slot</span>
          </h2>
          
          <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
            Choose your preferred date & 1-hour home visit time slot. Certified female beauticians arrive with sanitized single-use kits.
          </p>
        </div>

        {/* Main Interactive Booking Grid / Card Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl bg-[#0a0a0a]/90 backdrop-blur-2xl space-y-10">
          
          {/* STEP 1: DATE SELECTION STRIP */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    1. Choose Date
                  </h3>
                  <p className="text-[11px] text-gray-400">Available 7 days a week in Gwalior</p>
                </div>
              </div>

              {/* Scroll Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollDates('left')}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all active:scale-95"
                  title="Scroll Left"
                  aria-label="Scroll dates left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollDates('right')}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all active:scale-95"
                  title="Scroll Right"
                  aria-label="Scroll dates right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Date Cards Strip */}
            <div
              ref={datesScrollContainerRef}
              className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
            >
              {availableDates.map((item) => {
                const isSelected = selectedDateStr === item.dateStr;

                return (
                  <button
                    key={item.dateStr}
                    onClick={() => {
                      setSelectedDateStr(item.dateStr);
                      // Reset time slot if previous time slot is in past or booked for new date
                      if (selectedTimeSlot) {
                        if (isSlotInPast(selectedTimeSlot, item.dateStr) || isSlotBooked(selectedTimeSlot.id, item.dateStr)) {
                          setSelectedTimeSlot(null);
                        }
                      }
                    }}
                    className={`shrink-0 snap-start w-24 sm:w-28 py-4 px-3 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#D4AF37] to-[#B38F24] text-black border-2 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/25 scale-105 font-bold'
                        : 'bg-[#050505] border-white/10 text-gray-300 hover:border-[#D4AF37]/50 hover:bg-white/5'
                    }`}
                  >
                    {/* Today Badge */}
                    {item.isToday && (
                      <span
                        className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1 ${
                          isSelected ? 'bg-black text-[#D4AF37]' : 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                        }`}
                      >
                        Today
                      </span>
                    )}

                    <span
                      className={`text-[10px] uppercase tracking-widest font-semibold ${
                        isSelected ? 'text-black/80' : 'text-gray-400 group-hover:text-[#D4AF37]'
                      }`}
                    >
                      {item.dayName}
                    </span>

                    <span
                      className={`font-serif-luxury text-2xl sm:text-3xl font-extrabold ${
                        isSelected ? 'text-black' : 'text-white'
                      }`}
                    >
                      {item.dayNum}
                    </span>

                    <span
                      className={`text-[10px] uppercase tracking-widest font-semibold ${
                        isSelected ? 'text-black/80' : 'text-gray-400'
                      }`}
                    >
                      {item.monthName}
                    </span>

                    {/* Active Selected Indicator Check */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-black" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* STEP 2: TIME SLOT SELECTION GRID */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    2. Select Time Slot (1-Hour Duration)
                  </h3>
                  <p className="text-[11px] text-gray-400">Working Hours: 10:00 AM to 05:00 PM</p>
                </div>
              </div>

              {/* Selected Slot Legend */}
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-gray-400 self-start sm:self-auto">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" /> Selected
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-700" /> Booked/Passed
                </span>
              </div>
            </div>

            {/* Time Slots Responsive Grid (2-3 cols mobile, 4-7 cols desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {TIME_SLOTS.map((slot) => {
                const inPast = isSlotInPast(slot, selectedDateStr);
                const booked = isSlotBooked(slot.id, selectedDateStr);
                const isDisabled = inPast || booked;
                const isSelected = selectedTimeSlot?.id === slot.id;

                return (
                  <button
                    key={slot.id}
                    disabled={isDisabled}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTimeSlot(null); // toggle deselect
                      } else {
                        setSelectedTimeSlot(slot);
                      }
                    }}
                    className={`relative p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[85px] shadow-sm ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/30 font-extrabold scale-[1.03] z-10'
                        : isDisabled
                        ? 'bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-60'
                        : 'bg-[#050505] border-white/10 text-gray-200 hover:border-[#D4AF37]/70 hover:text-[#D4AF37] hover:bg-white/5 cursor-pointer'
                    }`}
                  >
                    {/* Time Label */}
                    <span
                      className={`text-xs font-bold leading-tight ${
                        isSelected ? 'text-black' : isDisabled ? 'text-gray-500 line-through' : 'text-white'
                      }`}
                    >
                      {slot.label.split(' – ')[0]}
                    </span>
                    <span
                      className={`text-[10px] font-medium mt-0.5 ${
                        isSelected ? 'text-black/80' : isDisabled ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      to {slot.label.split(' – ')[1]}
                    </span>

                    {/* Status Badge */}
                    <div className="mt-2">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-extrabold text-black bg-black/10 px-2 py-0.5 rounded-full border border-black/20">
                          <Check className="w-3 h-3 stroke-[3]" /> Selected
                        </span>
                      ) : booked ? (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-500/30">
                          <Lock className="w-2.5 h-2.5" /> Booked
                        </span>
                      ) : inPast ? (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold text-gray-500 bg-gray-900 px-2 py-0.5 rounded-full border border-gray-800">
                          Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold text-emerald-400 group-hover:text-[#D4AF37]">
                          Available
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* STEP 3: SUMMARY & CONFIRMATION DETAILS FORM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Client Details Form */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    3. Contact & Location Details
                  </h3>
                  <p className="text-[11px] text-gray-400">Doorstep appointment address in Gwalior</p>
                </div>
              </div>

              <form id="appointment-confirm-form" onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Radhika Tomar"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 91795 XXXXX"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Locality in Gwalior *
                    </label>
                    <select
                      value={clientLocality}
                      onChange={(e) => setClientLocality(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
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
                    <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      House / Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="e.g. House No. 42, Block B"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                {/* Services list indicator */}
                {cart.length === 0 && (
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Services Requested (Optional if cart is empty)
                    </label>
                    <input
                      type="text"
                      value={customServices}
                      onChange={(e) => setCustomServices(e.target.value)}
                      placeholder="e.g. Rica Waxing, O3+ Facial, Hydra Glow"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: Selected Summary Box & Confirm CTA */}
            <div className="lg:col-span-5 bg-[#050505] rounded-2xl p-6 border border-white/10 space-y-5 shadow-xl relative overflow-hidden">
              
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Reservation Summary</span>
                </h4>
                <span className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                  Swan Beauty Hub
                </span>
              </div>

              {/* Live Selection Summary */}
              <div className="space-y-3 text-xs">
                
                {/* Date Summary */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-[#D4AF37]" /> Date
                  </span>
                  <span className="font-bold text-white text-right">
                    {selectedDateStr ? getFormattedSelectedDate() : <span className="text-rose-400 italic">Not Selected</span>}
                  </span>
                </div>

                {/* Time Slot Summary */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#D4AF37]" /> Time Slot
                  </span>
                  <span className="font-bold text-[#D4AF37] text-right">
                    {selectedTimeSlot ? selectedTimeSlot.label : <span className="text-rose-400 italic">Not Selected</span>}
                  </span>
                </div>

                {/* Location Summary */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" /> Location
                  </span>
                  <span className="font-semibold text-gray-200 text-right truncate max-w-[180px]">
                    {clientLocality}
                  </span>
                </div>

                {/* Cart Services Summary */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-gray-400 font-medium uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" /> Cart Services
                    </span>
                    {cart.length > 0 && (
                      <button
                        type="button"
                        onClick={onOpenCart}
                        className="text-[10px] text-[#D4AF37] hover:underline uppercase font-bold"
                      >
                        View ({cart.length})
                      </button>
                    )}
                  </div>

                  {cart.length > 0 ? (
                    <div className="space-y-1 pt-1">
                      {cart.map((item) => (
                        <div key={item.service.id} className="flex justify-between text-gray-300 font-light text-[11px]">
                          <span className="truncate max-w-[170px]">• {item.service.name}</span>
                          <span className="font-semibold text-[#D4AF37]">₹{item.service.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-xs">
                        <span>Cart Total</span>
                        <span className="text-[#D4AF37]">₹{cartSubtotal}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-[11px] font-light pt-0.5">
                      No cart services selected. You can add services or specify them in WhatsApp.
                    </p>
                  )}
                </div>

              </div>

              {/* Validation Warning / Confirmation State */}
              {(!selectedDateStr || !selectedTimeSlot) && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Please select both a date and time slot above to enable confirmation.</span>
                </div>
              )}

              {/* CONFIRM BOOKING BUTTON */}
              <button
                type="submit"
                form="appointment-confirm-form"
                disabled={!selectedDateStr || !selectedTimeSlot}
                className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 shadow-2xl transition-all duration-300 ${
                  selectedDateStr && selectedTimeSlot
                    ? 'bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] text-black hover:bg-white cursor-pointer hover:scale-[1.01] shadow-[#D4AF37]/30'
                    : 'bg-white/10 text-gray-500 border border-white/10 cursor-not-allowed opacity-60'
                }`}
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Confirm Appointment Slot</span>
              </button>

              <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest font-light">
                ⚡ Direct instant confirmation with Swan Beauty support on WhatsApp
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CONFIRMED BOOKING MODAL */}
      {isConfirmedModalOpen && confirmedBookingData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0a0a0a] border border-[#D4AF37] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 text-center shadow-2xl relative">
            
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                Appointment Slot Reserved
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white uppercase tracking-wider">
                Booking Details Submitted!
              </h3>
              <p className="text-xs text-gray-400 font-light">
                Opening WhatsApp to finish confirmation with our Gwalior salon manager.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#050505] border border-white/10 text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-gray-400 uppercase tracking-wider">Date:</span>
                <span className="font-bold text-white">{confirmedBookingData.date}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-gray-400 uppercase tracking-wider">Slot:</span>
                <span className="font-bold text-[#D4AF37]">{confirmedBookingData.timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-gray-400 uppercase tracking-wider">Client:</span>
                <span className="font-bold text-white">{confirmedBookingData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 uppercase tracking-wider">Location:</span>
                <span className="font-bold text-gray-200">{confirmedBookingData.locality}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/919179586845?text=${encodeURIComponent(
                  `Hello Swan Beauty, confirming my slot for ${confirmedBookingData.date} at ${confirmedBookingData.timeSlot}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all rounded-xl"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Open WhatsApp Chat</span>
              </a>

              <button
                onClick={() => setIsConfirmedModalOpen(false)}
                className="w-full py-2.5 bg-white/5 border border-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest rounded-xl hover:text-white"
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
