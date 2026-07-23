import React from 'react';
import { ShieldCheck, Sparkles, Clock, Award, CheckCircle2, HeartHandshake, Calendar, Sparkle, UserCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: '100% Female Staff',
      description: 'Background-verified, certified female beauticians only.'
    },
    {
      icon: Sparkles,
      title: 'Sealed Mono-Dose Kits',
      description: 'Fresh disposable bedsheets, spatulas & sealed packs.'
    },
    {
      icon: Award,
      title: 'Genuine Rica & O3+',
      description: 'Authentic Rica Italy, O3+ & Korean formulations.'
    },
    {
      icon: Clock,
      title: 'Prompt On-Time Service',
      description: 'Zero queue waiting; beautician arrives at chosen slot.'
    },
    {
      icon: CheckCircle2,
      title: 'Transparent Pricing',
      description: 'Zero hidden travel charges or unexpected taxes.'
    },
    {
      icon: HeartHandshake,
      title: 'Hassle-Free Cleanup',
      description: 'We bring portable equipment and leave no mess.'
    }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Select Services & Slot',
      desc: 'Pick your preferred beauty treatments & convenient time in Gwalior.'
    },
    {
      step: '02',
      title: 'Female Beautician Arrives',
      desc: 'Sanitized professional arrives with sealed disposable kits & tools.'
    },
    {
      step: '03',
      title: 'Relax & Pay Post-Service',
      desc: 'Enjoy 5-star salon pampering at home & pay via UPI/Cash afterwards.'
    }
  ];

  return (
    <section id="why-us" className="py-8 sm:py-10 bg-gradient-to-b from-white via-sky-50/40 to-white relative overflow-hidden border-t border-sky-100">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="inline-block px-3 py-0.5 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.25em]">
            The Swan Beauty Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1E3A5F]">
            Why Choose Us & <span className="text-[#0284C7] italic font-normal">How It Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Why Choose Us Compact Grid (6 items in 2x3) */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-1.5 border-b border-sky-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
              <span>Why Gwalior Prefers Swan Beauty</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {reasons.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm hover:border-[#0284C7] transition-all space-y-1.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284C7]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-extrabold text-xs text-[#1E3A5F]">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-normal leading-snug">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3-Step How It Works Stack */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-1.5 border-b border-sky-100 pb-2">
              <Calendar className="w-4 h-4 text-[#0284C7]" />
              <span>3 Simple Booking Steps</span>
            </h3>

            <div className="space-y-2.5">
              {howItWorksSteps.map((s) => (
                <div
                  key={s.step}
                  className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm flex items-start gap-3 hover:border-[#0284C7] transition-all"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#0284C7] text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-xs text-[#1E3A5F]">
                      {s.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-normal leading-snug mt-0.5">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Compact Guarantee Banner */}
            <div className="p-3 rounded-xl bg-sky-100/70 border border-sky-200 flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span className="text-[10px] font-extrabold uppercase text-[#1E3A5F] tracking-wider">
                  100% Sealed Single-Use Hygiene Guarantee
                </span>
              </div>
              <a
                href="#booking"
                className="px-3 py-1.5 bg-[#0284C7] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-lg hover:bg-[#0369A1] shrink-0"
              >
                Book Now
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


