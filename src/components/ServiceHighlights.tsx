import React from 'react';
import { Sparkles, ArrowRight, Check, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { FEATURED_PACKAGES } from '../data/services';
import { ServiceItem, CartItem } from '../types';

interface ServiceHighlightsProps {
  onAddToCart: (service: ServiceItem) => void;
  onSelectCategory: (categoryId: string) => void;
  cart: CartItem[];
}

export const ServiceHighlights: React.FC<ServiceHighlightsProps> = ({
  onAddToCart,
  onSelectCategory,
  cart
}) => {
  const isInCart = (id: string) => cart.some(item => item.service.id === id);

  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Featured Luxury Services</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Gwalior's Most Loved <br />
            <span className="text-gold-gradient italic font-serif-accent">Beauty & Spa Care</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light">
            Indulge in our signature salon therapies designed exclusively for women, delivered right to your doorstep.
          </p>
        </div>

        {/* Categories Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Hydra Glow & Facials */}
          <div 
            onClick={() => {
              onSelectCategory('Facials');
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer transition-all duration-300 shadow-xl"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src="/src/assets/images/hydra_facial_glow_1784788202361.jpg"
                alt="Hydra Glow Facials Gwalior"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D4AF37] text-black font-extrabold text-[10px] uppercase tracking-widest shadow-lg">
                Most Booked
              </span>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider">
                Hydra Glow & Facials
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                7-in-1 Korean Hydra machine, Casmara Purifying & O3+ Bridal Glow treatments for radiant glass skin.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#D4AF37] font-bold text-sm">Starting at ₹751</span>
                <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Rica & Korean Waxing */}
          <div 
            onClick={() => {
              onSelectCategory('Waxing');
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer transition-all duration-300 shadow-xl"
          >
            <div className="relative h-56 overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-[#0a0a0a] to-[#050505]" />
              <div className="relative z-10 space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold border border-[#D4AF37]/30">
                  Painless Italian Wax
                </span>
                <h4 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
                  Rica & Korean Waxing
                </h4>
                <p className="text-xs text-gray-300">
                  Full Body, Combos, Cartridge Roll-On & Peel-Off Intimate Waxing
                </p>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider">
                Full Body & Intimate Waxing
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                100% painless Italian Rica & Korean gentle wax with post-wax skin soothing lotion.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#D4AF37] font-bold text-sm">Full Body from ₹1250</span>
                <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Mani Pedi & Body Polishing */}
          <div 
            onClick={() => {
              onSelectCategory('Mani-Pedi');
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer transition-all duration-300 shadow-xl"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src="/src/assets/images/manicure_pedicure_spa_1784788214740.jpg"
                alt="Manicure & Pedicure Gwalior"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider">
                Manicure, Pedicure & Polishing
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Ice Cream Mani-Pedi, O3+ Whitening, Korean spa soak & 3-step full body polishing.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#D4AF37] font-bold text-sm">Mani-Pedi Combo ₹750</span>
                <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Featured Special Combo Packages Section */}
        <div id="packages" className="pt-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
              Popular <span className="text-gold-gradient">Gwalior Value Packages</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Save big with our pre-curated home salon combos. All-inclusive, no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {FEATURED_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 relative flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-xl"
              >
                {pkg.popular && (
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    {pkg.tag}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                      Save ₹{pkg.savings} OFF
                    </span>
                    <h4 className="font-serif-luxury text-xl font-bold text-white mt-1 uppercase tracking-wider">
                      {pkg.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">{pkg.subtitle}</p>
                  </div>

                  <div className="space-y-2 py-2 border-y border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Services Included:</p>
                    <ul className="space-y-2">
                      {pkg.servicesIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-luxury text-2xl font-bold text-[#D4AF37]">
                        ₹{pkg.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        ₹{pkg.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                      Instant ₹{pkg.savings} Discount
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/919179586845?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(pkg.title)}%20(Price%3A%20%E2%82%B9${pkg.price}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5 hover:bg-white transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book Package</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
