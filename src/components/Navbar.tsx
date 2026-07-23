import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ShoppingBag, Menu, X, ShieldCheck, Sparkles, Gift } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenReferral?: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onOpenCart, onOpenReferral, activeSection }) => {
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
    { label: 'Categories', href: '#categories' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-sky-100 py-3 shadow-md'
          : 'bg-white border-b border-sky-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-[#0284C7] rounded-full flex items-center justify-center bg-sky-50 group-hover:bg-[#0284C7] transition-all duration-300 shadow-sm">
              <span className="text-[#0284C7] group-hover:text-white font-serif font-extrabold text-xl transition-colors">S</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-wider text-[#1E3A5F] uppercase group-hover:text-[#0284C7] transition-colors">
                  SWAN BEAUTY
                </span>
              </div>
              <p className="text-[9px] tracking-[0.25em] text-[#0284C7] uppercase font-extrabold">
                Home Salon Services • Gwalior
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.18em] text-[#1E3A5F] hover:text-[#0284C7] font-extrabold transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#0284C7] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Refer & Earn CTA */}
            {onOpenReferral && (
              <button
                onClick={onOpenReferral}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-sky-100 to-sky-50 border border-sky-300 text-[#0284C7] hover:bg-[#0284C7] hover:text-white transition-all text-xs font-extrabold uppercase tracking-wider shadow-sm group"
                title="Refer a Friend & Earn ₹150"
              >
                <Gift className="w-3.5 h-3.5 text-[#0284C7] group-hover:text-white transition-colors" />
                <span>Refer & Earn</span>
              </button>
            )}

            {/* Cart Trigger */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className="relative p-2 sm:px-3.5 sm:py-2 rounded-full bg-sky-50 border border-sky-200 text-[#1E3A5F] hover:border-[#0284C7] hover:bg-sky-100/60 transition-all flex items-center gap-2 shadow-sm"
              title="View Appointment Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#0284C7]" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold text-[#1E3A5F]">Cart</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white font-extrabold text-[11px] flex items-center justify-center animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Quick Call Button */}
            <a
              href="tel:+918349729518"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 border border-sky-200 hover:border-[#0284C7] text-[#1E3A5F] hover:text-[#0284C7] text-xs uppercase tracking-widest font-bold rounded-full transition-all bg-white shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Call</span>
            </a>

            {/* Book WhatsApp CTA */}
            <a
              href="https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20would%20like%20to%20book%20a%20home%20salon%20appointment%20in%20Gwalior."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0284C7] text-white hover:bg-[#0369A1] font-extrabold text-xs uppercase tracking-wider rounded-full shadow-md transition-all duration-300"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current text-sky-200" />
              <span className="hidden xs:inline">Book Now</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-sky-50 border border-sky-200 text-[#1E3A5F] hover:text-[#0284C7]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-sky-100 px-6 py-6 shadow-2xl space-y-4 animate-in slide-in-from-top-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-sky-100">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-[#0369A1] text-[10px] uppercase tracking-widest font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Women-Only Home Salon</span>
            </div>
            <a href="tel:+918349729518" className="text-xs text-[#1E3A5F] font-extrabold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#0284C7]" /> +91 83497 29518
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl bg-sky-50/70 border border-sky-100 text-xs uppercase tracking-wider font-extrabold text-[#1E3A5F] hover:text-[#0284C7] hover:border-[#0284C7]/40 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {onOpenReferral && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReferral();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#1E3A5F] to-[#0284C7] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <Gift className="w-4 h-4 text-sky-200" />
              <span>Refer a Friend & Get ₹150 OFF</span>
            </button>
          )}

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="flex-1 py-3 rounded-xl bg-sky-100/70 border border-sky-200 text-[#1E3A5F] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#0284C7]" />
              <span>Cart ({totalCartCount})</span>
            </button>
            <a
              href="https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:bg-[#0369A1]"
            >
              <MessageCircle className="w-4 h-4 text-sky-200" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

