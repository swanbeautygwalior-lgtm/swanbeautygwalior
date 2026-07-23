export interface ServiceItem {
  id: string;
  name: string;
  category: 'Waxing' | 'Facials' | 'Cleanup' | 'Mani-Pedi' | 'Bleach-Detan' | 'Scrub-Polishing' | 'Face-Threading';
  subcategory?: string;
  price: number;
  originalPrice?: number;
  durationMinutes: number;
  description: string;
  isPopular?: boolean;
  isBestSeller?: boolean;
  brandUsed?: string;
  benefits?: string[];
}

export interface CartItem {
  service: ServiceItem;
  quantity: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  badge?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  servicesUsed: string[];
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking' | 'Hygiene & Safety' | 'Services & Products';
}

export interface BookingFormData {
  name: string;
  phone: string;
  locality: string;
  address: string;
  preferredDate?: string;
  preferredTime: string;
  notes: string;
}

export interface PackageDeal {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  savings: number;
  servicesIncluded: string[];
  tag: string;
  popular?: boolean;
}
