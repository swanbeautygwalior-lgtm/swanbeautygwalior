import React from 'react';
import { ShieldCheck, Sparkles, Clock, Award, CheckCircle2, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: '100% Certified Female Staff',
      description: 'Your safety is paramount. Every beautician is background-verified, trained, and courteous.'
    },
    {
      icon: Sparkles,
      title: 'Sealed Mono-Dose Kits',
      description: 'Zero contamination. We use single-use disposable bedsheets, spatulas, and fresh sealed kits.'
    },
    {
      icon: Award,
      title: 'Genuine Rica & O3+ Products',
      description: 'Only authentic premium brands like Rica Italy, O3+, Casmara, and Korean formulations.'
    },
    {
      icon: Clock,
      title: 'Prompt On-Time Service',
      description: 'No waiting in parlor queues! Our beauticians reach your Gwalior home at your chosen time slot.'
    },
    {
      icon: CheckCircle2,
      title: 'Transparent Pricing Menu',
      description: 'Exact price list as displayed on website. No surprise add-ons, travel fees, or taxes.'
    },
    {
      icon: HeartHandshake,
      title: 'Hassle-Free Home Setup',
      description: 'We bring our portable massage tables, wax heaters, and clean up completely afterwards.'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white relative overflow-hidden border-t border-gray-100">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">
            The Swan Beauty Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
            Why Choose Our <br />
            <span className="text-[#D4AF37] italic font-normal">Women-Only Home Salon</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm font-normal">
            We bring the luxury, hygiene, and expertise of a 5-star salon directly into your living room.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-[20px] p-7 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:border-[#D4AF37] hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)] transition-all duration-300 hover:-translate-y-1 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-black group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Hygiene Guarantee Banner */}
        <div className="mt-16 rounded-[22px] p-8 bg-[#FAF8F5] border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Safety & Hygiene Guarantee</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-black uppercase tracking-wider">
              Cleanliness You Can Trust At Home
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm max-w-2xl font-light">
              All tools are sanitized with hospital-grade disinfectant. Disposable aprons, bedsheets, headbands & gloves ensure 100% infection-free care.
            </p>
          </div>

          <a
            href="https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20have%20a%20question%20about%20your%20home%20salon%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-black text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shrink-0 shadow-md hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
          >
            Chat On WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};

