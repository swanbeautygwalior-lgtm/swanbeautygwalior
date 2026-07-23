import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, Clock, Navigation } from 'lucide-react';
import { GWALIOR_LOCALITIES } from '../data/localities';

export const AreaChecker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocality, setSelectedLocality] = useState(GWALIOR_LOCALITIES[0]);

  const filteredLocalities = GWALIOR_LOCALITIES.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.pincode.includes(searchTerm) ||
      loc.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="areas" className="py-20 bg-[#050505] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">
            Service Coverage
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider">
            Serving All Localities Across <span className="text-gold-gradient italic font-serif-accent">Gwalior</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light">
            Check availability in your area or colony in Gwalior, MP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Locality Search & List */}
          <div className="md:col-span-7 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type your area e.g. City Centre, Morar, Thatipur, 474011..."
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1">
              {filteredLocalities.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => setSelectedLocality(loc)}
                  className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between space-y-1 ${
                    selectedLocality.name === loc.name
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-bold'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                    <span className="truncate uppercase tracking-wider font-semibold">{loc.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-normal">Pincode: {loc.pincode}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Area Status Card */}
          <div className="md:col-span-5">
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-5 relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                  <Navigation className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Service Available Now
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-white uppercase tracking-wider">
                    {selectedLocality.name}
                  </h3>
                  <p className="text-xs text-gray-400">{selectedLocality.zone} • Pincode {selectedLocality.pincode}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center gap-1.5 text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Avg Arrival Time:
                  </span>
                  <span className="font-bold text-[#D4AF37]">{selectedLocality.estimatedArrival}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400 uppercase tracking-wider text-[10px] font-bold">Home Visit Charges:</span>
                  <span className="font-bold text-emerald-400">FREE Home Delivery</span>
                </div>
              </div>

              <a
                href={`https://wa.me/919179586845?text=Hello%20Swan%20Beauty%2C%20I%20am%20located%20in%20${encodeURIComponent(selectedLocality.name)}%20(Gwalior)%20and%20would%20like%20to%20book%20a%20home%20salon%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-white transition-all"
              >
                <span>Book Service in {selectedLocality.name}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
