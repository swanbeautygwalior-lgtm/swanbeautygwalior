import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  Lock,
  Sparkles,
  Sun,
  Sunset,
  Moon,
  Grid,
  ListFilter,
  Info
} from 'lucide-react';

export interface TimeSlot {
  id: string;
  label: string;
  startTime: number; // 24-hr integer
  category: 'morning' | 'afternoon' | 'evening';
}

export const ALL_TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-10-11', label: '10:00 AM – 11:00 AM', startTime: 10, category: 'morning' },
  { id: 'slot-11-12', label: '11:00 AM – 12:00 PM', startTime: 11, category: 'morning' },
  { id: 'slot-12-01', label: '12:00 PM – 01:00 PM', startTime: 12, category: 'afternoon' },
  { id: 'slot-01-02', label: '01:00 PM – 02:00 PM', startTime: 13, category: 'afternoon' },
  { id: 'slot-02-03', label: '02:00 PM – 03:00 PM', startTime: 14, category: 'afternoon' },
  { id: 'slot-03-04', label: '03:00 PM – 04:00 PM', startTime: 15, category: 'evening' },
  { id: 'slot-04-05', label: '04:00 PM – 05:00 PM', startTime: 16, category: 'evening' },
];

interface BookingCalendarWidgetProps {
  selectedDateStr: string;
  onSelectDate: (dateStr: string) => void;
  selectedTimeSlot: TimeSlot | null;
  onSelectTimeSlot: (slot: TimeSlot | null) => void;
  bookedSlotsMap: Record<string, string[]>;
  isSlotInPast: (slot: TimeSlot, dateStr: string) => boolean;
  isSlotBooked: (slotId: string, dateStr: string) => boolean;
}

export const BookingCalendarWidget: React.FC<BookingCalendarWidgetProps> = ({
  selectedDateStr,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  bookedSlotsMap,
  isSlotInPast,
  isSlotBooked,
}) => {
  // Calendar View Mode: 'calendar' (Monthly Grid) or 'strip' (Horizontal Quick Strip)
  const [viewMode, setViewMode] = useState<'calendar' | 'strip'>('calendar');

  // Time Category Filter: 'all' | 'morning' | 'afternoon' | 'evening'
  const [slotCategoryFilter, setSlotCategoryFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');

  // Month & Year state for calendar navigation
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(() => {
    if (selectedDateStr) {
      const parts = selectedDateStr.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
      }
    }
    return new Date();
  });

  const todayObj = new Date();
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(
    todayObj.getDate()
  ).padStart(2, '0')}`;

  // Month navigation handlers
  const handlePrevMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleJumpToToday = () => {
    const today = new Date();
    setCurrentMonthDate(new Date(today.getFullYear(), today.getMonth(), 1));
    onSelectDate(todayStr);
  };

  // Calendar Calculations
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth(); // 0-indexed

  const monthName = currentMonthDate.toLocaleDateString('en-US', { month: 'long' });

  // First day of current month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Number of days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Days array for rendering grid
  const daysGrid = [];
  // Empty slots for padding before the 1st of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    daysGrid.push(null);
  }
  // Days 1..daysInMonth
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    daysGrid.push({ dayNum: day, dateStr });
  }

  // Calculate available slot count for a specific date
  const getDaySlotAvailability = (dateStr: string) => {
    let availableCount = 0;
    ALL_TIME_SLOTS.forEach((s) => {
      const inPast = isSlotInPast(s, dateStr);
      const booked = isSlotBooked(s.id, dateStr);
      if (!inPast && !booked) {
        availableCount++;
      }
    });
    return availableCount;
  };

  // Filter slots according to category tab
  const filteredSlots = ALL_TIME_SLOTS.filter((slot) => {
    if (slotCategoryFilter === 'all') return true;
    return slot.category === slotCategoryFilter;
  });

  // Calculate current date's total available slots
  const selectedDateAvailableSlots = selectedDateStr ? getDaySlotAvailability(selectedDateStr) : 0;

  // Format selected date nicely
  const formattedSelectedDateDisplay = () => {
    if (!selectedDateStr) return 'Select a date';
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      
      {/* CALENDAR HEADER & TOGGLE BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-sky-100">
        
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-br from-[#4FC3F7] to-[#0284C7] text-white rounded-2xl shadow-md shadow-sky-400/20">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-2">
              <span>Interactive Booking Calendar</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full uppercase">
                Real-Time Slots
              </span>
            </h3>
            <p className="text-xs text-slate-500">Pick date & time slot for certified beautician doorstep visit</p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 bg-sky-50 p-1.5 rounded-2xl border border-sky-200 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              viewMode === 'calendar'
                ? 'bg-white text-[#0284C7] shadow-sm border border-sky-200'
                : 'text-slate-600 hover:text-[#1E3A5F]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Monthly Calendar</span>
          </button>
          
          <button
            onClick={() => setViewMode('strip')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              viewMode === 'strip'
                ? 'bg-white text-[#0284C7] shadow-sm border border-sky-200'
                : 'text-slate-600 hover:text-[#1E3A5F]'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Quick 21-Day Strip</span>
          </button>
        </div>

      </div>

      {/* MODE 1: MONTHLY CALENDAR GRID VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-3xl border border-sky-100 p-5 shadow-sm space-y-4">
          
          {/* Month & Year Navigation Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h4 className="font-serif text-xl font-extrabold text-[#1E3A5F] uppercase tracking-wider">
                {monthName} <span className="text-[#0284C7]">{year}</span>
              </h4>

              <button
                onClick={handleJumpToToday}
                className="text-[10px] bg-sky-100 text-[#0284C7] hover:bg-[#0284C7] hover:text-white transition-all font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-sky-300"
              >
                Today
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#1E3A5F] hover:text-[#0284C7] transition-all"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-[#1E3A5F] hover:text-[#0284C7] transition-all"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center border-b border-sky-100 pb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <span key={day} className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                {day}
              </span>
            ))}
          </div>

          {/* Monthly Calendar Day Cells Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {daysGrid.map((item, index) => {
              if (!item) {
                return <div key={`empty-${index}`} className="h-14 sm:h-16 bg-transparent" />;
              }

              const { dayNum, dateStr } = item;
              const isSelected = selectedDateStr === dateStr;
              const isToday = dateStr === todayStr;

              // Date objects comparison for past days
              const [cellY, cellM, cellD] = dateStr.split('-').map(Number);
              const cellDate = new Date(cellY, cellM - 1, cellD);
              const todayDateOnly = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());
              const isPastDate = cellDate < todayDateOnly;

              const availCount = getDaySlotAvailability(dateStr);
              const isFullyBooked = availCount === 0 && !isPastDate;

              return (
                <button
                  key={dateStr}
                  disabled={isPastDate}
                  onClick={() => {
                    onSelectDate(dateStr);
                    // Reset time slot if invalid
                    if (selectedTimeSlot) {
                      if (isSlotInPast(selectedTimeSlot, dateStr) || isSlotBooked(selectedTimeSlot.id, dateStr)) {
                        onSelectTimeSlot(null);
                      }
                    }
                  }}
                  className={`h-14 sm:h-16 rounded-2xl p-1.5 flex flex-col justify-between items-center transition-all duration-200 relative border ${
                    isSelected
                      ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-lg shadow-sky-500/30 scale-105 z-10 font-bold'
                      : isPastDate
                      ? 'bg-gray-50/60 border-gray-100 text-gray-300 cursor-not-allowed opacity-50'
                      : isToday
                      ? 'bg-sky-50 border-sky-300 text-[#0284C7] hover:border-[#0284C7]'
                      : 'bg-white border-sky-100 text-[#1E3A5F] hover:border-sky-300 hover:bg-sky-50/50'
                  }`}
                >
                  {/* Top Day Number */}
                  <div className="w-full flex items-center justify-between px-1">
                    <span className={`text-xs sm:text-sm font-extrabold ${isSelected ? 'text-white' : ''}`}>
                      {dayNum}
                    </span>
                    {isToday && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" title="Today" />
                    )}
                  </div>

                  {/* Availability Badge */}
                  {!isPastDate && (
                    <div className="w-full text-center">
                      {isFullyBooked ? (
                        <span className="text-[8px] font-bold text-rose-600 bg-rose-50 px-1 py-0.5 rounded-full block border border-rose-200">
                          Booked
                        </span>
                      ) : (
                        <span
                          className={`text-[8px] sm:text-[9px] font-extrabold block truncate ${
                            isSelected
                              ? 'text-sky-100'
                              : availCount <= 3
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }`}
                        >
                          {availCount} slots
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend Footer */}
          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-sky-100 text-[10px] text-slate-500 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0284C7]" /> Selected Date
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Open Slots
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Fully Booked
              </span>
            </div>
            <span className="font-medium text-[#0284C7]">Doorstep Service in Gwalior</span>
          </div>

        </div>
      )}

      {/* MODE 2: QUICK HORIZONTAL STRIP VIEW */}
      {viewMode === 'strip' && (
        <div className="bg-white rounded-3xl border border-sky-100 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#1E3A5F] uppercase tracking-wider">
              Upcoming 21 Days Quick Picker
            </span>
            <span className="text-[10px] text-[#0284C7] font-extrabold uppercase">Scroll Horizontally →</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x">
            {Array.from({ length: 21 }).map((_, i) => {
              const d = new Date();
              d.setDate(todayObj.getDate() + i);

              const yyyy = d.getFullYear();
              const mm = String(d.getMonth() + 1).padStart(2, '0');
              const dd = String(d.getDate()).padStart(2, '0');
              const dateStr = `${yyyy}-${mm}-${dd}`;

              const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNum = d.getDate();
              const monthName = d.toLocaleDateString('en-US', { month: 'short' });
              const isSelected = selectedDateStr === dateStr;
              const availCount = getDaySlotAvailability(dateStr);

              return (
                <button
                  key={dateStr}
                  onClick={() => {
                    onSelectDate(dateStr);
                    if (selectedTimeSlot) {
                      if (isSlotInPast(selectedTimeSlot, dateStr) || isSlotBooked(selectedTimeSlot.id, dateStr)) {
                        onSelectTimeSlot(null);
                      }
                    }
                  }}
                  className={`shrink-0 snap-start w-20 py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all ${
                    isSelected
                      ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-lg shadow-sky-500/20 scale-105 font-bold'
                      : 'bg-sky-50/50 border-sky-200 text-[#1E3A5F] hover:bg-sky-100'
                  }`}
                >
                  <span className={`text-[9px] uppercase font-bold ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                    {dayName}
                  </span>
                  <span className="font-serif text-2xl font-extrabold">{dayNum}</span>
                  <span className={`text-[9px] uppercase font-bold ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                    {monthName}
                  </span>
                  <span
                    className={`text-[8px] font-bold mt-1 px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-sky-100 text-[#0284C7]'
                    }`}
                  >
                    {availCount} slots
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TIME SLOT SELECTION PANEL */}
      <div className="bg-white rounded-3xl border border-sky-100 p-5 shadow-sm space-y-4">
        
        {/* Header with Selected Date & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sky-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-100 text-[#0284C7] rounded-xl border border-sky-200">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-2">
                <span>Time Slots for {formattedSelectedDateDisplay()}</span>
              </h4>
              <p className="text-[11px] text-slate-500">
                {selectedDateAvailableSlots} of {ALL_TIME_SLOTS.length} slots available
              </p>
            </div>
          </div>

          {/* Slot Category Filter Tabs */}
          <div className="flex items-center gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200 self-start sm:self-auto">
            <button
              onClick={() => setSlotCategoryFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                slotCategoryFilter === 'all'
                  ? 'bg-white text-[#0284C7] shadow-sm'
                  : 'text-slate-600 hover:text-[#1E3A5F]'
              }`}
            >
              All Slots
            </button>
            <button
              onClick={() => setSlotCategoryFilter('morning')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 transition-all ${
                slotCategoryFilter === 'morning'
                  ? 'bg-white text-[#0284C7] shadow-sm'
                  : 'text-slate-600 hover:text-[#1E3A5F]'
              }`}
            >
              <Sun className="w-3 h-3 text-amber-500" /> Morning
            </button>
            <button
              onClick={() => setSlotCategoryFilter('afternoon')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 transition-all ${
                slotCategoryFilter === 'afternoon'
                  ? 'bg-white text-[#0284C7] shadow-sm'
                  : 'text-slate-600 hover:text-[#1E3A5F]'
              }`}
            >
              <Sunset className="w-3 h-3 text-orange-500" /> Afternoon
            </button>
            <button
              onClick={() => setSlotCategoryFilter('evening')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 transition-all ${
                slotCategoryFilter === 'evening'
                  ? 'bg-white text-[#0284C7] shadow-sm'
                  : 'text-slate-600 hover:text-[#1E3A5F]'
              }`}
            >
              <Moon className="w-3 h-3 text-indigo-500" /> Evening
            </button>
          </div>
        </div>

        {/* TIME SLOTS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredSlots.map((slot) => {
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
                    onSelectTimeSlot(null);
                  } else {
                    onSelectTimeSlot(slot);
                  }
                }}
                className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[90px] relative shadow-sm ${
                  isSelected
                    ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-lg shadow-sky-500/30 font-extrabold scale-[1.02] z-10'
                    : isDisabled
                    ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                    : 'bg-white border-sky-200 text-[#1E3A5F] hover:border-[#0284C7] hover:text-[#0284C7] hover:bg-sky-50/50 cursor-pointer'
                }`}
              >
                {/* Time Slot Label */}
                <span className={`text-xs font-bold ${isSelected ? 'text-white' : isDisabled ? 'line-through text-gray-400' : 'text-[#1E3A5F]'}`}>
                  {slot.label}
                </span>

                {/* Status Indicator */}
                <div className="mt-2">
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-white bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30">
                      <Check className="w-3 h-3 stroke-[3]" /> Selected
                    </span>
                  ) : booked ? (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      <Lock className="w-2.5 h-2.5" /> Booked
                    </span>
                  ) : inPast ? (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      Passed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Available
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedTimeSlot && (
          <div className="p-3 rounded-2xl bg-[#EAF8FF] border border-sky-200 flex items-center justify-between text-xs text-[#1E3A5F]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0284C7]" />
              <span>
                Selected Slot: <strong className="text-[#0284C7]">{selectedTimeSlot.label}</strong> on{' '}
                <strong>{formattedSelectedDateDisplay()}</strong>
              </span>
            </div>
            <button
              onClick={() => onSelectTimeSlot(null)}
              className="text-[10px] text-rose-600 font-extrabold uppercase hover:underline"
            >
              Clear Slot
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
