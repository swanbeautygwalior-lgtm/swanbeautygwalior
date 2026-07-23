import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, ShieldCheck } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';

export const FAQSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');
  const [faqSearch, setFaqSearch] = useState<string>('');

  const filteredFaqs = FAQS_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-[#050505] relative border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">
            Got Questions?
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider">
            Frequently Asked <span className="text-gold-gradient italic font-serif-accent">Questions</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light">
            Everything you need to know about booking our women-only home salon services in Gwalior.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder="Search FAQs (e.g. hygiene, payment, areas)..."
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs uppercase tracking-wider text-white hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-gray-300 leading-relaxed font-light border-t border-white/10 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Safety Note */}
        <div className="mt-10 p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-center text-xs text-[#D4AF37] font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>Still have questions? Our Gwalior support team is available on WhatsApp 24/7!</span>
        </div>

      </div>
    </section>
  );
};
