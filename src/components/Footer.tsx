import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Sparkles, ShieldCheck, Heart, Instagram, Facebook, Gift } from 'lucide-react';

interface FooterProps {
  onOpenReferral?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReferral }) => {
  return (
    <footer className="bg-gradient-to-b from-sky-50 via-[#EAF8FF] to-sky-100 border-t border-sky-200 text-[#1E3A5F] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0284C7] to-sky-300 p-0.5 shadow-md shadow-sky-500/20">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#0284C7]" />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl font-extrabold text-[#1E3A5F] uppercase tracking-widest">
                  SWAN BEAUTY
                </span>
                <p className="text-[10px] tracking-[0.3em] text-[#0284C7] uppercase font-extrabold">
                  Home Salon Services • Gwalior
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Gwalior's premier women-only home salon service. Delivering luxury Rica Waxing, O3+ Facials, Korean Hydra Glow, Mani-Pedi & Body Polishing in the safety and comfort of your home.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-sky-200 text-[#0284C7] text-[10px] uppercase tracking-wider font-extrabold rounded-md shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>100% Female Beauticians & Disposable Kits</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com/swanbeautygwalior"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-sky-200 text-slate-700 hover:text-[#0284C7] hover:border-[#0284C7] flex items-center justify-center transition-all rounded-lg shadow-sm"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
              </a>

              <a
                href="https://instagram.com/swanbeauty.gwalior"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-sky-200 text-slate-700 hover:text-[#0284C7] hover:border-[#0284C7] flex items-center justify-center transition-all rounded-lg shadow-sm"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-extrabold text-[#1E3A5F] uppercase tracking-[0.2em]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <li><a href="#home" className="hover:text-[#0284C7] transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-[#0284C7] transition-colors">Services Menu</a></li>
              <li><a href="#packages" className="hover:text-[#0284C7] transition-colors">Value Packages</a></li>
              {onOpenReferral && (
                <li>
                  <button
                    onClick={onOpenReferral}
                    className="hover:text-[#0284C7] text-[#0284C7] transition-colors flex items-center gap-1 font-extrabold uppercase"
                  >
                    <Gift className="w-3.5 h-3.5" /> Refer & Earn (₹150)
                  </button>
                </li>
              )}
              <li><a href="#why-us" className="hover:text-[#0284C7] transition-colors">Why Choose Us</a></li>
              <li><a href="#reviews" className="hover:text-[#0284C7] transition-colors">Customer Reviews</a></li>
              <li><a href="#faq" className="hover:text-[#0284C7] transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-[#0284C7] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services Offered */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-xs font-extrabold text-[#1E3A5F] uppercase tracking-[0.2em]">
              Popular Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-normal">
              <li>Rica Tin & Korean Full Body Waxing</li>
              <li>O3+ Shine & Bridal Glow Facials</li>
              <li>7-in-1 Korean Hydra Glow Treatment</li>
              <li>Casmara Purifying Luxury Facial</li>
              <li>Ice Cream & O3+ Manicure Pedicure</li>
              <li>Full Body Detan & Bleach</li>
              <li>Full Body Polishing & Scrub</li>
              <li>Eyebrow Threading & Face Waxing</li>
            </ul>
          </div>

          {/* Service Areas in Gwalior */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-xs font-extrabold text-[#1E3A5F] uppercase tracking-[0.2em]">
              Gwalior Coverage Areas
            </h4>
            <p className="text-xs text-slate-600 font-normal">
              City Centre, Lashkar, Morar, Thatipur, University Road, Govindpuri, Patel Nagar, DD Nagar, Vinay Nagar, Alkapuri, Windsor Hills, Dabra Road & surrounding colonies in Gwalior, MP.
            </p>

            <div className="pt-2 space-y-1 text-xs">
              <p className="flex items-center gap-1.5 text-[#0284C7] font-extrabold uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5" /> +91 83497 29518
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Open 7 Days • 9:00 AM to 8:00 PM</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 uppercase font-semibold tracking-wider">
          <p>© {new Date().getFullYear()} Swan Beauty Home Salon Services. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Women in Gwalior, Madhya Pradesh</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
