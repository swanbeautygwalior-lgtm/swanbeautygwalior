import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Check, MessageCircle, Clock, Tag, ShoppingBag, Filter } from 'lucide-react';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '../data/services';
import { ServiceItem, CartItem } from '../types';

interface ServicesMenuProps {
  onAddToCart: (service: ServiceItem) => void;
  cart: CartItem[];
  selectedCategoryFilter?: string;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({
  onAddToCart,
  cart,
  selectedCategoryFilter
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('All');
  const [priceSort, setPriceSort] = useState<'default' | 'low-high' | 'high-low'>('default');

  // React to prop filter changes
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
      setActiveSubcategory('All');
    }
  }, [selectedCategoryFilter]);

  // Extract unique subcategories for current category
  const availableSubcategories = useMemo(() => {
    let list = SERVICES_DATA;
    if (activeCategory !== 'All') {
      list = list.filter(item => item.category === activeCategory);
    }
    const subcats = Array.from(new Set(list.map(i => i.subcategory).filter(Boolean))) as string[];
    return ['All', ...subcats];
  }, [activeCategory]);

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      // Category match
      const categoryMatch = activeCategory === 'All' || service.category === activeCategory;
      // Subcategory match
      const subcategoryMatch = activeSubcategory === 'All' || service.subcategory === activeSubcategory;
      // Search query match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        (service.brandUsed && service.brandUsed.toLowerCase().includes(query)) ||
        (service.subcategory && service.subcategory.toLowerCase().includes(query));

      return categoryMatch && subcategoryMatch && searchMatch;
    }).sort((a, b) => {
      if (priceSort === 'low-high') return a.price - b.price;
      if (priceSort === 'high-low') return b.price - a.price;
      return 0;
    });
  }, [activeCategory, activeSubcategory, searchQuery, priceSort]);

  const isInCart = (id: string) => cart.some(item => item.service.id === id);

  return (
    <section id="services" className="py-20 bg-[#050505] relative min-h-screen">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">
            Complete Price Catalog
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our Beauty & Spa <span className="text-gold-gradient italic font-serif-accent">Menu</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light">
            Transparent pricing with zero hidden charges. Select services to build your customized home salon package.
          </p>
        </div>

        {/* Controls Bar: Search & Sort */}
        <div className="glass-card rounded-2xl p-4 mb-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Rica, Korean, O3+ Facial, Pedicure..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs uppercase tracking-wider text-gray-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#D4AF37]" /> Sort Price:
            </span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="default">Popular / Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            onClick={() => {
              setActiveCategory('All');
              setActiveSubcategory('All');
            }}
            className={`px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold whitespace-nowrap transition-all ${
              activeCategory === 'All'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:border-[#D4AF37]/30'
            }`}
          >
            All Services ({SERVICES_DATA.length})
          </button>

          {SERVICE_CATEGORIES.map((cat) => {
            const count = SERVICES_DATA.filter(s => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveSubcategory('All');
                }}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-[#D4AF37] text-black font-extrabold shadow-md'
                    : 'bg-white/5 text-gray-300 border border-white/10 hover:border-[#D4AF37]/30'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Subcategory Filter Pills (If any) */}
        {availableSubcategories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <span className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-widest shrink-0 mr-1">
              Filter By Type:
            </span>
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                  activeSubcategory === sub
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 space-y-3 glass-card rounded-2xl p-8 border border-white/10">
            <p className="text-[#D4AF37] font-serif-luxury text-xl">No services found matching your search.</p>
            <p className="text-xs text-gray-400">Try searching for "Waxing", "Facial", "Cleanup" or "O3+"</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setActiveSubcategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-xs uppercase tracking-widest font-bold mt-2 hover:bg-[#D4AF37] hover:text-black"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const added = isInCart(service.id);
              return (
                <div
                  key={service.id}
                  className="glass-card glass-card-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between relative group"
                >
                  {/* Popular / Bestseller Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {service.subcategory ? (
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/10 font-medium">
                        {service.subcategory}
                      </span>
                    ) : (
                      <span />
                    )}

                    {service.isBestSeller ? (
                      <span className="text-[10px] px-2.5 py-0.5 bg-[#D4AF37] text-black font-extrabold uppercase tracking-widest shadow-sm">
                        ⭐ BESTSELLER
                      </span>
                    ) : service.isPopular ? (
                      <span className="text-[10px] px-2.5 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-bold uppercase tracking-widest">
                        POPULAR
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-2 mb-4">
                    <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider">
                      {service.name}
                    </h3>

                    {service.brandUsed && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 border border-[#D4AF37]/30">
                        <Tag className="w-3 h-3 text-[#D4AF37]" />
                        <span>Brand: {service.brandUsed}</span>
                      </div>
                    )}

                    <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-2">
                      {service.description}
                    </p>

                    {/* Benefits tags if available */}
                    {service.benefits && service.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {service.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 bg-white/5 text-emerald-300 border border-emerald-500/20"
                          >
                            ✓ {benefit}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif-luxury text-xl font-extrabold text-[#D4AF37]">
                          ₹{service.price}
                        </span>
                        {service.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            ₹{service.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5 uppercase tracking-wider">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span>~{service.durationMinutes} Mins</span>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddToCart(service)}
                        className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                          added
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-white/5 border border-white/20 text-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                        }`}
                        title={added ? 'Added to Appointment Cart' : 'Add to Appointment Cart'}
                      >
                        {added ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/919179586845?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(service.name)}%20(Price%3A%20%E2%82%B9${service.price}).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#D4AF37] text-black hover:bg-white transition-all shadow-md"
                        title="Instant Book via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-black" />
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
