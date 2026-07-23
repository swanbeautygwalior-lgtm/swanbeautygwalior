import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LocationSelector } from './components/LocationSelector';
import { Hero } from './components/Hero';
import { PromotionalOffersBar } from './components/PromotionalOffersBar';
import { CategoryCardsSection } from './components/CategoryCardsSection';
import { ServiceHighlights } from './components/ServiceHighlights';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesMenu } from './components/ServicesMenu';
import { PackageBuilder } from './components/PackageBuilder';
import { AreaChecker } from './components/AreaChecker';
import { Reviews } from './components/Reviews';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { BookingCartDrawer } from './components/BookingCartDrawer';
import { ReferAFriendModal } from './components/ReferAFriendModal';
import { PolicyModal } from './components/PolicyModal';
import { StickyMobileBookingBar } from './components/StickyMobileBookingBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { Footer } from './components/Footer';

import { ServiceItem, CartItem } from './types';
import { Sparkles, Check } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('swan_beauty_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'terms' | 'privacy' | 'refund' | 'hygiene' | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('swan_beauty_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (service: ServiceItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.service.id === service.id);
      if (existing) {
        return prevCart.map((item) =>
          item.service.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { service, quantity: 1 }];
    });
    showToast(`Added "${service.name}" to appointment cart`);
  };

  const handleAddMultipleToCart = (services: ServiceItem[]) => {
    setCart((prevCart) => {
      let updated = [...prevCart];
      services.forEach((srv) => {
        const idx = updated.findIndex((item) => item.service.id === srv.id);
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        } else {
          updated.push({ service: srv, quantity: 1 });
        }
      });
      return updated;
    });
    showToast(`Added ${services.length} services to appointment cart!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.service.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.service.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    if (categoryId === 'PackageBuilder') {
      document.getElementById('package-builder')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1E3A5F] font-sans selection:bg-sky-200 selection:text-[#0284C7] relative pb-16 sm:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#1E3A5F] text-white rounded-xl px-4 py-3 border border-sky-300 text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-2xl animate-in slide-in-from-right-5 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PWA Install Banner */}
      <PWAInstallPrompt />

      {/* Sticky Header Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReferral={() => setIsReferralOpen(true)}
        activeSection="home"
      />

      {/* Location Bar Widget */}
      <LocationSelector />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner */}
        <Hero />

        {/* Promotional Offers & Coupons Horizontal Slider */}
        <PromotionalOffersBar onApplyCoupon={() => setIsCartOpen(true)} />

        {/* Categories Visual Cards Section */}
        <CategoryCardsSection onSelectCategory={handleCategorySelect} />

        {/* Service Highlights & Featured Combos */}
        <ServiceHighlights
          onAddToCart={handleAddToCart}
          onSelectCategory={(catId) => setSelectedCategoryFilter(catId)}
          cart={cart}
        />

        {/* Why Choose Us & How It Works Compact Merged Section */}
        <WhyChooseUs />

        {/* Category-Wise Services Price Menu */}
        <ServicesMenu
          onAddToCart={handleAddToCart}
          cart={cart}
          selectedCategoryFilter={selectedCategoryFilter}
        />

        {/* Custom Luxury Package Builder */}
        <PackageBuilder onAddMultipleToCart={handleAddMultipleToCart} />

        {/* Gwalior Service Area Checker */}
        <AreaChecker />

        {/* Client Reviews */}
        <Reviews />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenReferral={() => setIsReferralOpen(true)}
        onOpenPolicy={(type) => setPolicyType(type)}
      />

      {/* Sticky Bottom Booking Bar for Mobile Conversion */}
      <StickyMobileBookingBar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Appointment Cart Drawer */}
      <BookingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenReferral={() => setIsReferralOpen(true)}
      />

      {/* Refer-a-Friend Modal */}
      <ReferAFriendModal
        isOpen={isReferralOpen}
        onClose={() => setIsReferralOpen(false)}
        onApplyCouponCode={(code) => {
          showToast(`Coupon code "${code}" ready for checkout!`);
          setIsCartOpen(true);
        }}
      />

      {/* Policy Terms & Privacy Modal */}
      {policyType && (
        <PolicyModal
          type={policyType}
          onClose={() => setPolicyType(null)}
        />
      )}

      {/* Floating Action Buttons */}
      <FloatingWhatsApp />
      <BackToTop />

    </div>
  );
}

