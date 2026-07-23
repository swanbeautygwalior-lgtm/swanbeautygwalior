import React from 'react';
import { MessageCircle, Phone, Sparkles, ShieldCheck, Star, MapPin, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[85vh] pt-20 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#E0F2FE]/70 via-[#F0F9FF] to-white">
      
      {/* Soft Ambient Background Sky Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-200/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Women-Only Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-300 text-[#0284C7] text-xs font-extrabold uppercase tracking-[0.2em] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
              <span>Women-Only Home Salon • Gwalior</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold leading-[1.15] text-[#1E3A5F] tracking-tight">
              Luxury Beauty Care <br />
              <span className="text-[#0284C7] italic font-normal">at Your Doorstep</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transform your home into a 5-star beauty retreat in Gwalior. Premium Rica Waxing, O3+ Facials, Korean Hydra Glow, Mani-Pedi & Body Polishing delivered by background-verified female beauticians with 100% single-use disposable kits.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#booking"
                className="w-full sm:w-auto px-8 py-4 bg-[#0284C7] text-white hover:bg-[#0369A1] font-extrabold text-xs uppercase tracking-[0.2em] rounded-[18px] shadow-lg shadow-sky-500/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 group"
              >
                <Calendar className="w-4 h-4 text-sky-200 group-hover:text-white transition-colors" />
                <span>Book Appointment Slot</span>
              </a>

              <a
                href="https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20a%20luxury%20home%20salon%20service%20in%20Gwalior."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 bg-white border border-sky-200 text-[#1E3A5F] hover:border-[#0284C7] hover:bg-sky-50 font-bold text-xs uppercase tracking-[0.2em] rounded-[18px] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp Booking</span>
              </a>
            </div>

            {/* Badges / Guarantees */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Zero Travel Cost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Sealed Mono-Dose Packs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>100% Female Staff</span>
              </div>
            </div>

          </div>

          {/* Right Column Image Frame Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[22px] overflow-hidden bg-white p-3 border border-sky-100 shadow-[0_20px_50px_rgba(2,132,199,0.12)]">
              
              <div className="relative h-[380px] sm:h-[420px] rounded-[18px] overflow-hidden">
                <img
                  src="/src/assets/images/hero_luxury_salon_1784788185867.jpg"
                  alt="Swan Beauty Home Salon Services Gwalior"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/80 via-[#1E3A5F]/20 to-transparent" />

                {/* Floating Rating Card Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-sky-100 shadow-xl flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#0284C7] fill-[#0284C7]" />
                  <div>
                    <p className="text-xs font-extrabold text-[#1E3A5F]">4.9 / 5.0</p>
                    <p className="text-[9px] text-sky-800 uppercase tracking-widest font-bold">1200+ Happy Women</p>
                  </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-sky-100 shadow-2xl space-y-1 text-[#1E3A5F]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">
                      Gwalior Home Salon Guarantee
                    </span>
                    <span className="text-[10px] font-bold bg-sky-100 text-sky-900 px-2 py-0.5 rounded-full">
                      Verified Safe
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F]">
                    Sealed Single-Use Sanitation Kits
                  </h4>
                  <p className="text-[11px] text-slate-500 font-light">
                    Every towel, bedsheet, and beauty tool is opened fresh right in front of you.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

