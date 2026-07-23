import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Check, MessageCircle, Clock, Tag, ShoppingBag, Filter, X } from 'lucide-react';
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
  const [showAllServices, setShowAllServices] = useState<boolean>(false);

  // React to prop filter changes
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
      setActiveSubcategory('All');
      setShowAllServices(true);
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
    const query = searchQuery.toLowerCase().trim();
    return SERVICES_DATA.filter((service) => {
      // Search query match across all attributes
      const searchMatch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        (service.brandUsed && service.brandUsed.toLowerCase().includes(query)) ||
        (service.subcategory && service.subcategory.toLowerCase().includes(query));

      // Category match: if user is typing a search query, search across all categories for max flexibility
      const categoryMatch = !query || activeCategory === 'All' || service.category === activeCategory;
      const subcategoryMatch = !query || activeSubcategory === 'All' || service.subcategory === activeSubcategory;

      return categoryMatch && subcategoryMatch && searchMatch;
    }).sort((a, b) => {
      if (priceSort === 'low-high') return a.price - b.price;
      if (priceSort === 'high-low') return b.price - a.price;
      return 0;
    });
  }, [activeCategory, activeSubcategory, searchQuery, priceSort]);

  // Services to actually display
  const displayedServices = useMemo(() => {
    // If searching or filtering or showAllServices is true, show all filtered
    if (showAllServices || searchQuery || activeCategory !== 'All' || activeSubcategory !== 'All' || priceSort !== 'default') {
      return filteredServices;
    }
    // Default homepage view: top 8 popular/bestseller services
    return filteredServices.slice(0, 8);
  }, [filteredServices, showAllServices, searchQuery, activeCategory, activeSubcategory, priceSort]);

  const isInCart = (id: string) => cart.some(item => item.service.id === id);

  return (
    <section id="services" className="py-8 sm:py-10 bg-gradient-to-b from-[#F0F9FF] via-white to-sky-50/50 relative border-t border-sky-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-6">
          <span className="inline-block px-3 py-0.5 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.25em]">
            Popular Home Services
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1E3A5F]">
            Beauty & Spa <span className="text-[#0284C7] italic font-normal">Catalog</span>
          </h2>
          <p className="text-slate-500 text-xs font-normal">
            Transparent price list with zero travel charges. Pick services to build your appointment.
          </p>
        </div>

        {/* Smart Service Search Bar (Above Categories) */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 mb-6 border border-sky-200 shadow-sm transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search Input Box */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search for a service..."
                className="w-full bg-sky-50/40 border border-sky-200 rounded-xl pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-[#1E3A5F] placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-sky-200/50 focus:bg-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end shrink-0">
              <span className="text-xs uppercase tracking-wider text-slate-600 font-extrabold flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-[#0284C7]" /> Sort:
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
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          <button
            onClick={() => {
              setActiveCategory('All');
              setActiveSubcategory('All');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-extrabold whitespace-nowrap transition-all ${
              activeCategory === 'All'
                ? 'bg-[#0284C7] text-white shadow-sm'
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
                  setShowAllServices(true);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-[#0284C7] text-white shadow-sm'
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
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest shrink-0 mr-1">
              Filter:
            </span>
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setActiveSubcategory(sub);
                  setShowAllServices(true);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider font-extrabold whitespace-nowrap transition-all ${
                  activeSubcategory === sub
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-sky-200 hover:text-[#0284C7]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Services Cards Grid */}
        {displayedServices.length === 0 ? (
          <div className="text-center py-12 space-y-2 bg-white rounded-2xl p-6 border border-sky-100 shadow-sm">
            <p className="text-[#1E3A5F] font-serif text-base sm:text-lg font-bold">
              No matching service found. Please try another keyword.
            </p>
            <p className="text-xs text-slate-500">Try searching for "Waxing", "Facial", "Cleanup", "Threading", "Bleach", "Manicure", "Pedicure", or "Hair"</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setActiveSubcategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#0284C7] text-white text-xs uppercase tracking-widest font-extrabold mt-2 rounded-xl hover:bg-[#0369A1] transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {displayedServices.map((service) => {
                const added = isInCart(service.id);
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs hover:shadow-md hover:border-[#0284C7] transition-all duration-300 flex flex-col justify-between relative group"
                  >
                    <div>
                      {/* Popular / Bestseller Badges */}
                      <div className="flex items-center justify-between gap-1.5 mb-2">
                        {service.subcategory ? (
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-50 text-slate-600 border border-sky-200 font-extrabold">
                            {service.subcategory}
                          </span>
                        ) : (
                          <span />
                        )}

                        {service.isBestSeller ? (
                          <span className="text-[9px] px-2 py-0.5 bg-[#0284C7] text-white font-extrabold uppercase tracking-widest rounded-full shadow-xs">
                            ⭐ BESTSELLER
                          </span>
                        ) : service.isPopular ? (
                          <span className="text-[9px] px-2 py-0.5 bg-sky-100 text-[#0284C7] border border-sky-300 font-extrabold uppercase tracking-widest rounded-full">
                            POPULAR
                          </span>
                        ) : null}
                      </div>

                      <div className="space-y-1.5 mb-3">
                        <h3 className="font-serif text-base font-extrabold text-[#1E3A5F] group-hover:text-[#0284C7] transition-colors leading-snug">
                          {service.name}
                        </h3>

                        {service.brandUsed && (
                          <div className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                            <Tag className="w-2.5 h-2.5 text-[#0284C7]" />
                            <span>{service.brandUsed}</span>
                          </div>
                        )}

                        <p className="text-[11px] text-slate-500 leading-snug font-normal line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-3 border-t border-sky-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-lg font-extrabold text-[#1E3A5F]">
                            ₹{service.price}
                          </span>
                          {service.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through font-medium">
                              ₹{service.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-slate-500 font-medium flex items-center gap-1 uppercase tracking-wider">
                          <Clock className="w-2.5 h-2.5 text-[#0284C7]" />
                          <span>~{service.durationMinutes}m</span>
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onAddToCart(service)}
                          className={`px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1 shadow-xs ${
                            added
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-[#0284C7] text-white hover:bg-[#0369A1]'
                          }`}
                        >
                          {added ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(service.name)}%20(Price%3A%20%E2%82%B9${service.price}).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-xs"
                          title="Instant Book via WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        </a>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Services Button Toggle */}
            {!showAllServices && !searchQuery && activeCategory === 'All' && filteredServices.length > 8 && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllServices(true)}
                  className="px-8 py-3 bg-white border border-sky-300 text-[#0284C7] hover:bg-[#0284C7] hover:text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm inline-flex items-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-[#0284C7] group-hover:text-white transition-colors" />
                  <span>View All {filteredServices.length} Beauty Services Menu</span>
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};
