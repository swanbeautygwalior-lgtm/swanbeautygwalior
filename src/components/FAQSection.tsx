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
    <section id="faq" className="py-20 bg-gradient-to-b from-white via-sky-50/60 to-white relative border-t border-sky-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.3em]">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] uppercase tracking-wider">
            Frequently Asked <span className="text-[#0284C7] italic font-normal">Questions</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal">
            Everything you need to know about booking our women-only home salon services in Gwalior.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#0284C7] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder="Search FAQs (e.g. hygiene, payment, areas)..."
            className="w-full bg-white border border-sky-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1E3A5F] placeholder-slate-400 focus:outline-none focus:border-[#0284C7] transition-all font-medium shadow-sm"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-extrabold text-xs uppercase tracking-wider text-[#1E3A5F] hover:text-[#0284C7] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#0284C7] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-normal border-t border-sky-100 animate-in fade-in duration-200 bg-sky-50/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Safety Note */}
        <div className="mt-10 p-4 rounded-xl bg-sky-50 border border-sky-200 text-center text-xs text-[#0284C7] font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0" />
          <span>Still have questions? Our Gwalior support team is available on WhatsApp 24/7!</span>
        </div>

      </div>
    </section>
  );
};
