import React from 'react';
import { MessageCircle, Phone, Sparkles, ShieldCheck, Star, MapPin, Clock } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_salon_1784788185867.jpg"
          alt="Swan Beauty Home Salon Services Gwalior"
          className="w-full h-full object-cover opacity-20 scale-105 filter contrast-125"
          referrerPolicy="no-referrer"
        />
        {/* Dark Luxury Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
      </div>

      {/* Subtle Gold Particle Ambient Lights */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Women-Only Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Women-Only Home Salon Services</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
              Luxury Beauty Services <br className="hidden sm:inline" />
              <span className="text-gold-gradient italic font-serif-accent">
                at Your Doorstep
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-lg text-gray-300 max-w-2xl font-light leading-relaxed">
              Experience salon-grade indulgence in the safety & comfort of your home in Gwalior. Premium Rica Waxing, O3+ Facials, Korean Hydra Glow, Mani-Pedi & Body Polishing by certified female beauticians.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5 pt-2">
              <a
                href="#booking"
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-white transition-all flex items-center justify-center gap-2.5 group"
              >
                <Clock className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                <span>Select Date & Time Slot</span>
              </a>

              <a
                href="https://wa.me/919179586845?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20a%20luxury%20home%20salon%20service%20in%20Gwalior."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-white/5 border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 backdrop-blur-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Quick Location & Hours info */}
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-gray-400 border-t border-white/10 uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Serving All Areas in Gwalior, MP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>Open 7 Days • 9:00 AM - 8:00 PM</span>
              </div>
            </div>

          </div>

          {/* Hero Feature Glass Card / Highlight Box */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10 relative overflow-hidden shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-serif-luxury text-lg font-bold text-white uppercase tracking-wider">Why Gwalior Loves Us</span>
                </div>
                <div className="flex items-center gap-1 text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37]/30">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </div>

              {/* Grid Features */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">100% Female Beauticians</h4>
                    <p className="text-xs text-gray-400">Verified & background-checked experts for complete safety at home.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Sealed Disposable Kits</h4>
                    <p className="text-xs text-gray-400">Single-use bedsheets, spatulas, and mono-dose packs opened in front of you.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Genuine Rica & O3+ Products</h4>
                    <p className="text-xs text-gray-400">100% authentic skin-friendly luxury brands for guaranteed radiant skin.</p>
                  </div>
                </div>
              </div>

              {/* Direct Booking Badge */}
              <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-center space-y-1">
                <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                  ✨ Special Gwalior Offer
                </p>
                <p className="text-xs text-gray-200">
                  Get <span className="text-[#D4AF37] font-bold">10% OFF</span> on booking 3+ services together!
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
