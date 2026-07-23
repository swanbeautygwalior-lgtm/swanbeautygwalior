import React from 'react';
import { Sparkles, ArrowRight, Star, Clock, Gift, Sliders, HeartHandshake } from 'lucide-react';

interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeType?: 'trending' | 'gold' | 'coming-soon' | 'discount';
  image: string;
  href: string;
  description: string;
  isComingSoon?: boolean;
}

interface CategoryCardsSectionProps {
  onSelectCategory?: (categoryName: string) => void;
  onOpenCustomPackageBuilder?: () => void;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: 'packages',
    title: 'Packages',
    subtitle: 'Curated Combos & Savings',
    badge: 'Save Up to 30%',
    badgeType: 'discount',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    href: '#packages',
    description: 'Complete beauty care bundles including Waxing, Facials, Mani-Pedi & Cleanup.',
  },
  {
    id: 'salon-at-home',
    title: 'Salon At Home',
    subtitle: 'Doorstep Waxing & Facials',
    badge: 'Trending',
    badgeType: 'trending',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    href: '#services',
    description: 'Rica Waxing, O3+ Korean Hydra Facials & Threading by certified female beauticians.',
  },
  {
    id: 'makeup',
    title: 'Makeup',
    subtitle: 'Bridal & Party Look',
    badge: 'HD & Airbrush',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    href: '#services',
    description: 'Glamorous party makeup, pre-wedding glow, and bridal makeover services.',
  },
  {
    id: 'hair-care',
    title: 'Hair Care',
    subtitle: 'Hair Spa & Treatments',
    badge: 'L\'Oréal & Matrix',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    href: '#services',
    description: 'Deep nourishing Hair Spa, Root Touchup, Smoothening, and Keratin care.',
  },
  {
    id: 'make-your-own-package',
    title: 'Make Your Own Package',
    subtitle: 'Custom Discount Builder',
    badge: 'Extra 15% OFF',
    badgeType: 'discount',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    href: '#custom-package',
    description: 'Pick any 3+ services to create your tailored package with instant discount.',
  },
  {
    id: 'spa',
    title: 'Spa',
    subtitle: 'Body Polish & Therapy',
    badge: 'Coming Soon',
    badgeType: 'coming-soon',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    href: '#',
    description: 'Relaxing aromatherapy body massages and body polishing spa treatments.',
    isComingSoon: true,
  },
];

export const CategoryCardsSection: React.FC<CategoryCardsSectionProps> = ({
  onSelectCategory,
  onOpenCustomPackageBuilder,
}) => {
  const handleCardClick = (cat: CategoryCard, e: React.MouseEvent) => {
    if (cat.isComingSoon) {
      e.preventDefault();
      return;
    }

    if (cat.id === 'make-your-own-package' && onOpenCustomPackageBuilder) {
      onOpenCustomPackageBuilder();
      return;
    }

    if (onSelectCategory) {
      if (cat.id === 'salon-at-home') onSelectCategory('Waxing');
      else if (cat.id === 'makeup') onSelectCategory('Facial');
      else if (cat.id === 'hair-care') onSelectCategory('Hair');
      else if (cat.id === 'packages') onSelectCategory('Packages');
    }
  };

  return (
    <section className="py-8 sm:py-10 bg-white relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Luxury Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6 pb-4 border-b border-sky-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3 text-[#0284C7]" />
              <span>Explore Categories</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1E3A5F] tracking-tight">
              Salon Services <span className="italic font-normal text-[#0284C7]">at Doorstep</span>
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <span className="text-[#1E3A5F]">100% Hygienic & Sealed Mono-Dose Packs</span>
          </div>
        </div>

        {/* Categories Grid (2 cols mobile, 3 cols desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {CATEGORIES.map((cat) => {
            return (
              <a
                key={cat.id}
                href={cat.href}
                onClick={(e) => handleCardClick(cat, e)}
                className={`group relative rounded-2xl bg-white border border-sky-100 overflow-hidden shadow-sm hover:shadow-md hover:border-[#0284C7]/50 transition-all duration-300 flex flex-col justify-between ${
                  cat.isComingSoon ? 'opacity-90 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'
                }`}
              >
                {/* Image Container */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-sky-50">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Soft Light Overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/85 via-[#1E3A5F]/20 to-transparent" />

                  {/* Badge Label */}
                  {cat.badge && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span
                        className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 ${
                          cat.badgeType === 'trending'
                            ? 'bg-rose-500 text-white'
                            : cat.badgeType === 'coming-soon'
                            ? 'bg-slate-800 text-slate-300 border border-slate-700'
                            : cat.badgeType === 'discount'
                            ? 'bg-[#0284C7] text-white font-extrabold'
                            : 'bg-white/90 backdrop-blur-md text-[#1E3A5F] border border-sky-200'
                        }`}
                      >
                        {cat.badgeType === 'trending' && <span className="w-1 h-1 rounded-full bg-white animate-pulse" />}
                        {cat.badge}
                      </span>
                    </div>
                  )}

                  {/* Title overlay inside photo */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-white">
                    <span className="text-[9px] uppercase tracking-[0.15em] font-extrabold text-sky-200 block truncate">
                      {cat.subtitle}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-extrabold text-white group-hover:text-sky-200 transition-colors truncate">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-3 bg-white flex-1 flex flex-col justify-between space-y-2">
                  <p className="text-[11px] text-slate-500 font-normal leading-snug line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="pt-2 border-t border-sky-100 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1E3A5F] group-hover:text-[#0284C7] transition-colors flex items-center gap-1">
                      {cat.isComingSoon ? (
                        <span className="text-slate-400">Soon</span>
                      ) : (
                        <>
                          <span>Browse</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#0284C7]" />
                        </>
                      )}
                    </span>

                    <div className="w-6 h-6 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white group-hover:border-[#0284C7] transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

              </a>
            );
          })}
        </div>

      </div>

    </section>
  );
};
