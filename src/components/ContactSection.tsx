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

    window.open(`https://wa.me/919179586845?text=${messageText}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-[#050505] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">
            Contact & Support
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider">
            Get In Touch With <span className="text-gold-gradient italic font-serif-accent">Swan Beauty</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light">
            We are here to assist you with home appointments, package recommendations & bridal bookings in Gwalior.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-xl">
              <h3 className="font-serif-luxury text-xl font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10">
                Gwalior Service Hub
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">Address / Hub</h4>
                    <p className="text-gray-400 text-xs font-light mt-0.5">
                      Main Hub: City Centre & Lashkar Zone, Gwalior, Madhya Pradesh - 474011
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">Phone & Call Booking</h4>
                    <p className="text-gray-400 text-xs font-light mt-0.5">
                      <a href="tel:+919179586845" className="hover:text-[#D4AF37] transition-colors font-semibold">
                        +91 91795 86845
                      </a>{' '}
                      /
                      <a href="tel:+919301122898" className="hover:text-[#D4AF37] transition-colors font-semibold">
                        +91 93011 22898
                      </a>
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">WhatsApp Instant Booking</h4>
                    <p className="text-gray-400 text-xs font-light mt-0.5">
                      <a
                        href="https://wa.me/919179586845"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline font-semibold"
                      >
                        +91 91795 86845 (Chat Now)
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">Email Address</h4>
                    <p className="text-gray-400 text-xs font-light mt-0.5">
                      <a href="mailto:swanbeautygwalior@gmail.com" className="hover:text-[#D4AF37] transition-colors">
                        swanbeautygwalior@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">Operating Hours</h4>
                    <p className="text-gray-400 text-xs font-light mt-0.5">
                      Monday - Sunday: 9:00 AM - 8:00 PM (Open All 7 Days)
                    </p>
                  </div>
                </div>

              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Connect With Us On Social Media:</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com/swanbeautygwalior"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"
                  >
                    <Facebook className="w-4 h-4 text-blue-400" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://instagram.com/swanbeauty.gwalior"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"
                  >
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form & Google Map Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Inquiry Form */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
              <h3 className="font-serif-luxury text-xl font-bold text-white uppercase tracking-wider">
                Send Quick Booking Request
              </h3>

              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Locality in Gwalior *</label>
                  <input
                    type="text"
                    required
                    value={formLocality}
                    onChange={(e) => setFormLocality(e.target.value)}
                    placeholder="e.g. City Centre, Morar, Thatipur, Lashkar"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Message or Preferred Services *</label>
                  <textarea
                    required
                    rows={3}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us what beauty services you want and your preferred date/time..."
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-white transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry Via WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Google Map Section */}
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs px-2">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" /> Gwalior Coverage Map
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Live Service Region</span>
              </div>
              <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  title="Gwalior Swan Beauty Home Salon Service Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114532.72382431777!2d78.11308316109968!3d26.212400661273397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c5d1792d35e1%3A0xd9a103c8ff0e3b90!2sGwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
