import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, Instagram, Facebook } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLocality, setFormLocality] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = `Hello%20Swan%20Beauty%20Gwalior%2C%0A%0AName%3A%20${encodeURIComponent(
      formName
    )}%0APhone%3A%20${encodeURIComponent(formPhone)}%0ALocality%3A%20${encodeURIComponent(
      formLocality
    )}%0AInquiry%3A%20${encodeURIComponent(formMessage)}`;

    window.open(`https://wa.me/918349729518?text=${messageText}`, '_blank');
  };

  return (
    <section id="contact" className="py-8 sm:py-10 bg-gradient-to-b from-white via-sky-50/50 to-white relative border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-6">
          <span className="inline-block px-3 py-0.5 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.25em]">
            Contact & Support
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1E3A5F]">
            Get In Touch With <span className="text-[#0284C7] italic font-normal">Swan Beauty</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100 space-y-4 shadow-sm">
              <h3 className="font-serif text-base font-extrabold text-[#1E3A5F] uppercase tracking-wider pb-2 border-b border-sky-100">
                Gwalior Service Hub
              </h3>

              <div className="space-y-3 text-xs">
                
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-sky-100 border border-sky-200 text-[#0284C7] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1E3A5F] uppercase tracking-wider text-[11px]">Address / Hub</h4>
                    <p className="text-slate-600 text-[11px] font-normal mt-0.5">
                      City Centre & Lashkar Zone, Gwalior, MP - 474011
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-sky-100 border border-sky-200 text-[#0284C7] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1E3A5F] uppercase tracking-wider text-[11px]">Phone & Call Booking</h4>
                    <p className="text-slate-600 text-[11px] font-normal mt-0.5">
                      <a href="tel:+918349729518" className="hover:text-[#0284C7] transition-colors font-extrabold text-[#1E3A5F]">
                        +91 83497 29518
                      </a>
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-sky-100 border border-sky-200 text-[#0284C7] shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1E3A5F] uppercase tracking-wider text-[11px]">WhatsApp Instant Booking</h4>
                    <p className="text-slate-600 text-[11px] font-normal mt-0.5">
                      <a
                        href="https://wa.me/918349729518"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline font-extrabold"
                      >
                        +91 83497 29518 (Chat Now)
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-sky-100 border border-sky-200 text-[#0284C7] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#1E3A5F] uppercase tracking-wider text-[11px]">Operating Hours</h4>
                    <p className="text-slate-600 text-[11px] font-normal mt-0.5">
                      Monday - Sunday: 9:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>

              </div>

              {/* Social Media Links */}
              <div className="pt-3 border-t border-sky-100">
                <p className="text-[10px] font-extrabold text-[#1E3A5F] uppercase tracking-wider mb-1.5">Social Media:</p>
                <div className="flex items-center gap-2">
                  <a
                    href="https://facebook.com/swanbeautygwalior"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-sky-50/50 border border-sky-200 text-slate-700 hover:text-[#0284C7] hover:border-[#0284C7] transition-all flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-extrabold rounded-xl"
                  >
                    <Facebook className="w-3.5 h-3.5 text-blue-600" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://instagram.com/swanbeauty.gwalior"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-sky-50/50 border border-sky-200 text-slate-700 hover:text-[#0284C7] hover:border-[#0284C7] transition-all flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-extrabold rounded-xl"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form & Google Map Column */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Quick Inquiry Form */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100 space-y-3 shadow-sm">
              <h3 className="font-serif text-base font-extrabold text-[#1E3A5F] uppercase tracking-wider">
                Send Quick Booking Request
              </h3>

              <form onSubmit={handleSubmitInquiry} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[9px]">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#0284C7] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[9px]">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+91 83497 29518"
                      className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#0284C7] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[9px]">Locality in Gwalior *</label>
                  <input
                    type="text"
                    required
                    value={formLocality}
                    onChange={(e) => setFormLocality(e.target.value)}
                    placeholder="e.g. City Centre, Morar, Thatipur, Lashkar"
                    className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#0284C7] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[9px]">Message or Preferred Services *</label>
                  <textarea
                    required
                    rows={2}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us what beauty services you want and your preferred date/time..."
                    className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#0284C7] font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs hover:bg-[#0369A1] transition-all rounded-xl"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry Via WhatsApp</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
