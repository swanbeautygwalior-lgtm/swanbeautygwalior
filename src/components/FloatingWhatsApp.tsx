import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      
      {/* Tooltip Hover Label */}
      <div className="hidden sm:block px-3 py-1.5 rounded-xl bg-[#0a0a0a]/90 border border-white/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat With Gwalior Home Salon Specialist
      </div>

      <a
        href="https://wa.me/919179586845?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20a%20home%20salon%20appointment%20in%20Gwalior."
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all group duration-300"
        title="Instant WhatsApp Booking"
        aria-label="WhatsApp Booking"
      >
        <MessageCircle className="w-7 h-7 fill-black stroke-none" />
        {/* Notification Ping Badge */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] rounded-full border-2 border-[#050505] animate-ping" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] rounded-full border-2 border-[#050505]" />
      </a>
    </div>
  );
};
