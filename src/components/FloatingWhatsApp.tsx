import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Trigger periodic bounce every 10 seconds to increase engagement
    const interval = setInterval(() => {
      setIsBouncing(true);
      const timer = setTimeout(() => {
        setIsBouncing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down past threshold (100px), show when scrolling up or near top
      if (currentScrollY > 100 && currentScrollY > lastScrollY + 5) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 100) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 group transition-all duration-500 ease-in-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-10 pointer-events-none scale-95'
      }`}
    >
      {/* Tooltip Hover Label */}
      <div className="hidden sm:block px-3 py-1.5 rounded-xl bg-[#1E3A5F] text-white text-xs font-bold uppercase tracking-wider shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat With Gwalior Home Salon Specialist
      </div>

      <a
        href="https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20a%20home%20salon%20appointment%20in%20Gwalior."
        target="_blank"
        rel="noopener noreferrer"
        className={`relative w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all group duration-300 ${
          isBouncing ? 'animate-bounce' : ''
        }`}
        title="Instant WhatsApp Booking"
        aria-label="WhatsApp Booking"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
        {/* Notification Ping Badge */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-[#0284C7] rounded-full border-2 border-white animate-ping" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-[#0284C7] rounded-full border-2 border-white" />
      </a>
    </div>
  );
};
