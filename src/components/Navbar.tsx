import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ShoppingBag, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onOpenCart, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Book Slot', href: '#booking' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Service Areas', href: '#areas' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#050505]/95 via-[#050505]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-[#D4AF37] rounded-full flex items-center justify-center bg-[#050505] group-hover:scale-105 transition-transform duration-300">
              <span className="text-[#D4AF37] font-serif-luxury font-bold text-xl">S</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-widest text-white uppercase group-hover:text-[#D4AF37] transition-colors">
                  SWAN BEAUTY
                </span>
              </div>
              <p className="text-[9px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                Women-Only Home Salon • Gwalior
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-[#D4AF37] font-medium transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Women Only Badge - Desktop */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Gwalior</span>
            </div>

            {/* Cart Trigger */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className="relative p-2 sm:px-3.5 sm:py-2 rounded-full bg-white/5 border border-white/20 text-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center gap-2"
              title="View Appointment Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline text-xs uppercase tracking-widest font-semibold">Cart</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-extrabold text-[11px] flex items-center justify-center animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Quick Call Button */}
            <a
              href="tel:+919179586845"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] text-xs uppercase tracking-widest font-semibold transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call</span>
            </a>

            {/* Book WhatsApp CTA */}
            <a
              href="https://wa.me/919179586845?text=Hello%20Swan%20Beauty%2C%20I%20would%20like%20to%20book%20a%20home%20salon%20appointment%20in%20Gwalior."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] text-black hover:bg-white font-bold text-xs uppercase tracking-widest shadow-lg transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black" />
              <span className="hidden xs:inline">Book Now</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-[#D4AF37]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050505]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl space-y-4 animate-in slide-in-from-top-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Women-Only Home Salon</span>
            </div>
            <a href="tel:+919179586845" className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> +91 91795 86845
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs uppercase tracking-widest font-semibold text-gray-200 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/20 text-[#D4AF37] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>Cart ({totalCartCount})</span>
            </button>
            <a
              href="https://wa.me/919179586845?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
