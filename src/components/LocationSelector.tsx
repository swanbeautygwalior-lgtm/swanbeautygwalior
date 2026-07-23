import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, Check, X, Loader2, Sparkles, ChevronDown } from 'lucide-react';

interface LocationSelectorProps {
  onLocationChange?: (locationName: string) => void;
}

const POPULAR_GWALIOR_AREAS = [
  'City Centre, Gwalior',
  'Lashkar, Gwalior',
  'Morar, Gwalior',
  'Thatipur, Gwalior',
  'Govindpuri, Gwalior',
  'University Road, Gwalior',
  'DD Nagar, Gwalior',
  'Patel Nagar, Gwalior',
  'Vinay Nagar, Gwalior',
  'Anand Nagar, Gwalior',
  'Hazira, Gwalior',
  'Maharaj Bada, Gwalior',
  'Phoolbagh, Gwalior',
];

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationChange }) => {
  const [currentLocation, setCurrentLocation] = useState<string>('City Centre, Gwalior');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationStatusMessage, setLocationStatusMessage] = useState<string>('');

  // Load location from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('swan_beauty_customer_location');
      if (saved) {
        setCurrentLocation(saved);
        if (onLocationChange) onLocationChange(saved);
      } else {
        // Automatically attempt location detection on first visit
        autoDetectLocationQuietly();
      }
    } catch (e) {
      console.error('Error reading saved location:', e);
    }
  }, []);

  const autoDetectLocationQuietly = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await reverseGeocode(latitude, longitude);
        },
        () => {
          // Quiet fallback to default if user denies permission
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    }
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    setLocationStatusMessage('Requesting GPS location...');

    if (!('geolocation' in navigator)) {
      setLocationStatusMessage('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationStatusMessage('Converting coordinates into address...');
        await reverseGeocode(latitude, longitude);
        setIsLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatusMessage('Location permission was denied. Please select your area manually below.');
        } else {
          setLocationStatusMessage('Could not detect exact GPS position. Please select your area below.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );

      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};

        const suburb = address.suburb || address.neighbourhood || address.residential || address.subdistrict || address.road;
        const city = address.city || address.town || address.county || 'Gwalior';

        let formatted = '';
        if (suburb) {
          formatted = `${suburb}, ${city}`;
        } else {
          formatted = `${city}`;
        }

        saveLocation(formatted);
        setLocationStatusMessage(`Location detected: ${formatted}`);
      } else {
        // Fallback
        saveLocation('City Centre, Gwalior');
      }
    } catch (e) {
      console.error('Reverse geocode error:', e);
      saveLocation('City Centre, Gwalior');
    }
  };

  const saveLocation = (locStr: string) => {
    setCurrentLocation(locStr);
    try {
      localStorage.setItem('swan_beauty_customer_location', locStr);
    } catch (e) {
      console.error(e);
    }
    if (onLocationChange) onLocationChange(locStr);
  };

  const filteredAreas = POPULAR_GWALIOR_AREAS.filter((area) =>
    area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Header Bar Location Widget */}
      <div className="bg-[#EBF8FF] border-b border-sky-100 py-2.5 px-4 sm:px-8 flex items-center justify-between text-xs text-[#1E3A5F] transition-all">
        
        {/* Current Location Badge & Trigger */}
        <div className="flex items-center gap-2 max-w-full overflow-hidden">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-sky-200 shadow-sm text-[#1E3A5F] font-medium shrink-0">
            {isLocating ? (
              <Loader2 className="w-3.5 h-3.5 text-[#0284C7] animate-spin" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-[#0284C7] fill-sky-200" />
            )}
            <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">Serving at:</span>
            <span className="text-xs font-extrabold text-[#1E3A5F] truncate max-w-[160px] sm:max-w-[280px]">
              {isLocating ? 'Detecting Location...' : currentLocation}
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[11px] font-extrabold text-[#0284C7] hover:text-[#0369A1] uppercase tracking-wider flex items-center gap-1 bg-sky-100/80 hover:bg-sky-200/80 px-2.5 py-1 rounded-full transition-all border border-sky-300 shrink-0"
          >
            <span>Change Location</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Women Only Tag on Right */}
        <div className="hidden md:flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#0284C7] bg-white px-3 py-1 rounded-full border border-sky-200 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Women-Only Doorstep Salon • Gwalior</span>
        </div>

      </div>

      {/* Location Picker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[22px] max-w-md w-full p-6 sm:p-7 shadow-2xl border border-sky-100 space-y-5 relative">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-sky-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0284C7] bg-sky-100 px-2.5 py-0.5 rounded-full">
                  Delivery Address
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1E3A5F]">
                  Select Your Location in Gwalior
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* GPS Auto Detect CTA Button */}
            <button
              onClick={handleDetectLocation}
              disabled={isLocating}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#0284C7] text-white hover:bg-[#0369A1] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md transition-all duration-300 disabled:opacity-50"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Detecting GPS Location...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 text-sky-200 fill-current" />
                  <span>Use Current GPS Location</span>
                </>
              )}
            </button>

            {/* Status Feedback Message */}
            {locationStatusMessage && (
              <p className="text-[11px] text-[#1E3A5F] bg-sky-50 p-2.5 rounded-xl border border-sky-100 text-center font-medium">
                {locationStatusMessage}
              </p>
            )}

            <div className="relative flex items-center my-2">
              <div className="flex-grow border-t border-sky-100" />
              <span className="shrink mx-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Or Search Gwalior Areas
              </span>
              <div className="flex-grow border-t border-sky-100" />
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search area (e.g. City Centre, Lashkar, Morar...)"
                className="w-full pl-10 pr-4 py-3 bg-sky-50/50 border border-sky-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all"
              />
            </div>

            {/* Popular Areas List */}
            <div className="max-h-52 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
              {filteredAreas.length > 0 ? (
                filteredAreas.map((area) => {
                  const isSelected = currentLocation === area;
                  return (
                    <button
                      key={area}
                      onClick={() => {
                        saveLocation(area);
                        setIsModalOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl text-left text-xs flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-sky-100 text-[#0284C7] font-extrabold border border-sky-300'
                          : 'hover:bg-sky-50 text-gray-700 font-medium'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0284C7]' : 'text-gray-400'}`} />
                        {area}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#0284C7]" />}
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center space-y-2">
                  <p className="text-xs text-gray-500">No matching preset area. Use your input as location:</p>
                  <button
                    onClick={() => {
                      if (searchQuery.trim()) {
                        saveLocation(`${searchQuery.trim()}, Gwalior`);
                        setIsModalOpen(false);
                      }
                    }}
                    className="px-4 py-2 bg-[#0284C7] text-white font-bold text-xs rounded-xl uppercase tracking-wider"
                  >
                    Select "{searchQuery.trim()}, Gwalior"
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
