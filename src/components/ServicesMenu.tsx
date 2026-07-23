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
    <section id="services" className="py-20 bg-gradient-to-b from-[#F0F9FF] via-white to-sky-50/50 relative min-h-screen border-t border-sky-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.3em]">
            Complete Price Catalog
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A5F]">
            Our Beauty & Spa <span className="text-[#0284C7] italic font-normal">Menu</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal">
            Transparent pricing with zero hidden charges. Select services to build your customized home salon package.
          </p>
        </div>

        {/* Controls Bar: Search & Sort */}
        <div className="bg-white rounded-[20px] p-4 mb-8 border border-sky-100 shadow-[0_10px_30px_rgba(2,132,199,0.06)] flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#0284C7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Rica, Korean, O3+ Facial, Pedicure..."
              className="w-full bg-sky-50/50 border border-sky-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E3A5F] placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-[#1E3A5F] font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs uppercase tracking-wider text-slate-600 font-extrabold flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#0284C7]" /> Sort Price:
            </span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-xs text-[#1E3A5F] font-bold focus:outline-none focus:border-[#0284C7]"
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
            className={`px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-extrabold whitespace-nowrap transition-all ${
              activeCategory === 'All'
                ? 'bg-[#0284C7] text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-slate-700 border border-sky-200 hover:border-[#0284C7] hover:text-[#0284C7]'
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
                className={`px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-[#0284C7] text-white shadow-md shadow-sky-500/20'
                    : 'bg-white text-slate-700 border border-sky-200 hover:border-[#0284C7] hover:text-[#0284C7]'
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
            <span className="text-[11px] text-slate-500 font-extrabold uppercase tracking-widest shrink-0 mr-1">
              Type:
            </span>
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-extrabold whitespace-nowrap transition-all ${
                  activeSubcategory === sub
                    ? 'bg-[#0284C7] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-sky-200 hover:text-[#0284C7]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-[22px] p-8 border border-sky-100 shadow-sm">
            <p className="text-[#1E3A5F] font-serif text-xl font-bold">No services found matching your search.</p>
            <p className="text-xs text-slate-500">Try searching for "Waxing", "Facial", "Cleanup" or "O3+"</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setActiveSubcategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#0284C7] text-white text-xs uppercase tracking-widest font-extrabold mt-2 rounded-xl hover:bg-[#0369A1] transition-colors shadow-md"
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
                  className="bg-white rounded-[20px] p-6 border border-sky-100 shadow-[0_10px_25px_rgba(2,132,199,0.05)] hover:shadow-[0_20px_40px_rgba(2,132,199,0.12)] hover:border-[#0284C7] transition-all duration-300 flex flex-col justify-between relative group"
                >
                  {/* Popular / Bestseller Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {service.subcategory ? (
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-sky-50 text-slate-600 border border-sky-200 font-bold">
                        {service.subcategory}
                      </span>
                    ) : (
                      <span />
                    )}

                    {service.isBestSeller ? (
                      <span className="text-[10px] px-2.5 py-0.5 bg-[#0284C7] text-white font-extrabold uppercase tracking-widest rounded-full shadow-sm">
                        ⭐ BESTSELLER
                      </span>
                    ) : service.isPopular ? (
                      <span className="text-[10px] px-2.5 py-0.5 bg-sky-100 text-[#0284C7] border border-sky-300 font-extrabold uppercase tracking-widest rounded-full">
                        POPULAR
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-2 mb-4">
                    <h3 className="font-serif text-lg font-extrabold text-[#1E3A5F] group-hover:text-[#0284C7] transition-colors uppercase tracking-wider">
                      {service.name}
                    </h3>

                    {service.brandUsed && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                        <Tag className="w-3 h-3 text-[#0284C7]" />
                        <span>Brand: {service.brandUsed}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2">
                      {service.description}
                    </p>

                    {/* Benefits tags if available */}
                    {service.benefits && service.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {service.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200 font-medium"
                          >
                            ✓ {benefit}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-sky-100 flex items-center justify-between gap-3">
                    
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xl font-extrabold text-[#1E3A5F]">
                          ₹{service.price}
                        </span>
                        {service.originalPrice && (
                          <span className="text-xs text-slate-400 line-through font-medium">
                            ₹{service.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5 uppercase tracking-wider">
                        <Clock className="w-3 h-3 text-[#0284C7]" />
                        <span>~{service.durationMinutes} Mins</span>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddToCart(service)}
                        className={`px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm ${
                          added
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-[#0284C7] text-white hover:bg-[#0369A1]'
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
                        href={`https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(service.name)}%20(Price%3A%20%E2%82%B9${service.price}).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-md"
                        title="Instant Book via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
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
