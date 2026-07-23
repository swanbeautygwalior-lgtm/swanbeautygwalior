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
    <section id="areas" className="py-20 bg-gradient-to-b from-white via-sky-50/50 to-white relative border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.3em]">
            Service Coverage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] uppercase tracking-wider">
            Serving All Localities Across <span className="text-[#0284C7] italic font-normal">Gwalior</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal">
            Check availability in your area or colony in Gwalior, MP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Locality Search & List */}
          <div className="md:col-span-7 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#0284C7] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type your area e.g. City Centre, Morar, Thatipur, 474011..."
                className="w-full bg-sky-50/50 border border-sky-200 rounded-xl pl-10 pr-4 py-3 text-xs text-[#1E3A5F] placeholder-slate-400 focus:outline-none focus:border-[#0284C7] transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1">
              {filteredLocalities.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => setSelectedLocality(loc)}
                  className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between space-y-1 ${
                    selectedLocality.name === loc.name
                      ? 'bg-sky-100 border-[#0284C7] text-[#0284C7] font-extrabold shadow-sm'
                      : 'bg-white border-sky-100 text-slate-700 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#0284C7] shrink-0" />
                    <span className="truncate uppercase tracking-wider font-extrabold">{loc.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Pincode: {loc.pincode}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Area Status Card */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-2xl p-6 border border-sky-200 space-y-5 relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100 text-[#0284C7] border border-sky-200">
                  <Navigation className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Service Available Now
                  </span>
                  <h3 className="font-serif text-xl font-extrabold text-[#1E3A5F] uppercase tracking-wider">
                    {selectedLocality.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedLocality.zone} • Pincode {selectedLocality.pincode}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="flex items-center gap-1.5 text-slate-500 uppercase tracking-wider text-[10px] font-extrabold">
                    <Clock className="w-3.5 h-3.5 text-[#0284C7]" /> Avg Arrival Time:
                  </span>
                  <span className="font-extrabold text-[#0284C7]">{selectedLocality.estimatedArrival}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-extrabold">Home Visit Charges:</span>
                  <span className="font-extrabold text-emerald-600">FREE Home Delivery</span>
                </div>
              </div>

              <a
                href={`https://wa.me/918349729518?text=Hello%20Swan%20Beauty%2C%20I%20am%20located%20in%20${encodeURIComponent(selectedLocality.name)}%20(Gwalior)%20and%20would%20like%20to%20book%20a%20home%20salon%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:bg-[#0369A1] transition-all rounded-xl"
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
