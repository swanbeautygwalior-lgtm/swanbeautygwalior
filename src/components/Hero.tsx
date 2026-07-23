import React from 'react';
import { MessageCircle, Phone, Sparkles, ShieldCheck, Star, MapPin, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-8 pb-8 sm:pt-12 sm:pb-10 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#E0F2FE]/70 via-[#F0F9FF] to-white">
      
      {/* Soft Ambient Background Sky Glows */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#38BDF8]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-sky-200/30 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Main Hero Left Content */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            
            {/* Women-Only Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-300 text-[#0284C7] text-[11px] font-extrabold uppercase tracking-[0.18em] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Women-Only Doorstep Salon • Gwalior</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold leading-[1.12] text-[#1E3A5F] tracking-tight">
              Luxury Beauty Care <br className="hidden sm:block" />
              <span className="text-[#0284C7] italic font-normal">at Your Doorstep</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              5-Star home salon services in Gwalior. Rica Waxing, O3+ Facials, Korean Hydra Glow & Mani-Pedi by background-verified female beauticians with 100% single-use disposable kits.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#services"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#0284C7] text-white hover:bg-[#0369A1] font-extrabold text-xs uppercase tracking-[0.18em] rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-sky-200 group-hover:text-white transition-colors" />
                <span>Explore Services</span>
              </a>

              <a
                href="https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20a%20luxury%20home%20salon%20service%20in%20Gwalior."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-sky-200 text-[#1E3A5F] hover:border-[#0284C7] hover:bg-sky-50 font-bold text-xs uppercase tracking-[0.18em] rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp Booking</span>
              </a>
            </div>

            {/* Badges / Guarantees */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[11px] text-slate-600 font-extrabold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Zero Travel Fee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Sealed Mono-Dose Packs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>100% Female Staff</span>
              </div>
            </div>

          </div>

          {/* Right Column Image Frame Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[20px] overflow-hidden bg-white p-2.5 border border-sky-100 shadow-[0_15px_35px_rgba(2,132,199,0.12)]">
              
              <div className="relative h-[260px] sm:h-[300px] rounded-[16px] overflow-hidden">
                <img
                  src="/src/assets/images/hero_luxury_salon_1784788185867.jpg"
                  alt="Swan Beauty Home Salon Services Gwalior"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/80 via-[#1E3A5F]/20 to-transparent" />

                {/* Floating Rating Card Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-sky-100 shadow-lg flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#0284C7] fill-[#0284C7]" />
                  <div>
                    <p className="text-[11px] font-extrabold text-[#1E3A5F]">4.9 / 5.0</p>
                    <p className="text-[8px] text-sky-800 uppercase tracking-widest font-extrabold">1200+ Happy Women</p>
                  </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-sky-100 shadow-xl space-y-0.5 text-[#1E3A5F]">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#0284C7]">
                      Gwalior Home Salon
                    </span>
                    <span className="text-[9px] font-extrabold bg-sky-100 text-sky-900 px-2 py-0.5 rounded-full">
                      Verified Safe
                    </span>
                  </div>
                  <h4 className="font-serif text-xs font-extrabold text-[#1E3A5F]">
                    Sealed Single-Use Sanitation Kits
                  </h4>
                  <p className="text-[10px] text-slate-500 font-normal">
                    Fresh towels, bedsheets, and sterile tools opened right in front of you.
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

