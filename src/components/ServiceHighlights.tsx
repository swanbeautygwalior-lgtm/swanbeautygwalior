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
    <section className="py-20 bg-gradient-to-b from-white via-sky-50/40 to-white relative overflow-hidden border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Featured Luxury Services</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A5F]">
            Gwalior's Most Loved <br />
            <span className="text-[#0284C7] italic font-normal">Beauty & Spa Care</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal">
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
            className="group bg-white rounded-[20px] overflow-hidden border border-sky-100 hover:border-[#0284C7] hover:shadow-[0_20px_40px_rgba(2,132,199,0.15)] cursor-pointer transition-all duration-300 shadow-[0_10px_30px_rgba(2,132,199,0.06)]"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src="/src/assets/images/hydra_facial_glow_1784788202361.jpg"
                alt="Hydra Glow Facials Gwalior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/70 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0284C7] text-white font-extrabold text-[10px] uppercase tracking-widest shadow-md">
                Most Booked
              </span>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-serif text-xl font-extrabold text-[#1E3A5F] group-hover:text-[#0284C7] transition-colors uppercase tracking-wider">
                Hydra Glow & Facials
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                7-in-1 Korean Hydra machine, Casmara Purifying & O3+ Bridal Glow treatments for radiant glass skin.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#0284C7] font-extrabold text-sm">Starting at ₹751</span>
                <span className="text-xs text-[#1E3A5F] font-extrabold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5 text-[#0284C7]" />
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
            className="group bg-gradient-to-b from-sky-50 to-white rounded-[20px] overflow-hidden border border-sky-200 hover:border-[#0284C7] hover:shadow-[0_20px_40px_rgba(2,132,199,0.15)] cursor-pointer transition-all duration-300 shadow-[0_10px_30px_rgba(2,132,199,0.06)]"
          >
            <div className="relative h-56 overflow-hidden bg-[#1E3A5F] flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0284C7]/30 via-[#1E3A5F] to-slate-900" />
              <div className="relative z-10 space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-400/20 text-sky-200 text-[10px] uppercase tracking-widest font-extrabold border border-sky-300/40">
                  Painless Italian Wax
                </span>
                <h4 className="font-serif text-2xl font-bold text-white">
                  Rica & Korean Waxing
                </h4>
                <p className="text-xs text-sky-100">
                  Full Body, Combos, Cartridge Roll-On & Peel-Off Intimate Waxing
                </p>
              </div>
            </div>
            <div className="p-6 space-y-3 bg-white">
              <h3 className="font-serif text-xl font-extrabold text-[#1E3A5F] group-hover:text-[#0284C7] transition-colors uppercase tracking-wider">
                Full Body & Intimate Waxing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% painless Italian Rica & Korean gentle wax with post-wax skin soothing lotion.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#0284C7] font-extrabold text-sm">Full Body from ₹1250</span>
                <span className="text-xs text-[#1E3A5F] font-extrabold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5 text-[#0284C7]" />
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
            className="group bg-white rounded-[20px] overflow-hidden border border-sky-100 hover:border-[#0284C7] hover:shadow-[0_20px_40px_rgba(2,132,199,0.15)] cursor-pointer transition-all duration-300 shadow-[0_10px_30px_rgba(2,132,199,0.06)]"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src="/src/assets/images/manicure_pedicure_spa_1784788214740.jpg"
                alt="Manicure & Pedicure Gwalior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/70 via-transparent to-transparent" />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="font-serif text-xl font-extrabold text-[#1E3A5F] group-hover:text-[#0284C7] transition-colors uppercase tracking-wider">
                Manicure, Pedicure & Polishing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ice Cream Mani-Pedi, O3+ Whitening, Korean spa soak & 3-step full body polishing.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#0284C7] font-extrabold text-sm">Mani-Pedi Combo ₹750</span>
                <span className="text-xs text-[#1E3A5F] font-extrabold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5 text-[#0284C7]" />
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Featured Special Combo Packages Section */}
        <div id="packages" className="pt-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1E3A5F] uppercase tracking-wider">
              Popular <span className="text-[#0284C7] italic font-normal">Gwalior Value Packages</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Save big with our pre-curated home salon combos. All-inclusive, no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {FEATURED_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-[20px] p-6 sm:p-7 border border-sky-100 shadow-[0_10px_30px_rgba(2,132,199,0.06)] relative flex flex-col justify-between hover:border-[#0284C7] hover:shadow-[0_20px_40px_rgba(2,132,199,0.12)] transition-all"
              >
                {pkg.popular && (
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-[#0284C7] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-md">
                    {pkg.tag}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#0284C7] uppercase tracking-widest">
                      Save ₹{pkg.savings} OFF
                    </span>
                    <h4 className="font-serif text-xl font-extrabold text-[#1E3A5F] mt-1 uppercase tracking-wider">
                      {pkg.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{pkg.subtitle}</p>
                  </div>

                  <div className="space-y-2 py-3 border-y border-sky-100">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#1E3A5F]">Services Included:</p>
                    <ul className="space-y-2">
                      {pkg.servicesIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-sky-100 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#1E3A5F]">
                        ₹{pkg.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{pkg.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                      Instant ₹{pkg.savings} Discount
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(pkg.title)}%20(Price%3A%20%E2%82%B9${pkg.price}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 hover:bg-[#0369A1] transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 text-sky-200" />
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

