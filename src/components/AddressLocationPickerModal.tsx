import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  MapPin,
  Navigation,
  Check,
  AlertCircle,
  Loader2,
  RefreshCw,
  Settings,
  Home,
  Map,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Search,
  Lock,
  Smartphone,
  Globe,
  ArrowRight
} from 'lucide-react';
import L from 'leaflet';

export interface AddressDetails {
  houseNumber: string;
  street: string;
  areaLocality: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  formattedAddress: string;
  lat?: number;
  lng?: number;
}

interface AddressLocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAddress: (address: AddressDetails) => void;
  initialAddress?: Partial<AddressDetails>;
}

// Default Gwalior coordinates (City Centre)
const DEFAULT_GWALIOR_COORDS = { lat: 26.2183, lng: 78.1828 };

// Custom SVG Pin Icon for Leaflet
const createCustomIcon = () => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="36" height="48">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24c0-6.63-5.37-12-12-12z" fill="#0284C7"/>
      <circle cx="12" cy="12" r="5" fill="#FFFFFF"/>
      <circle cx="12" cy="12" r="3" fill="#1E3A5F"/>
    </svg>
  `;
  return L.divIcon({
    className: 'custom-leaflet-pin',
    html: svgIcon,
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -48],
  });
};

export const AddressLocationPickerModal: React.FC<AddressLocationPickerModalProps> = ({
  isOpen,
  onClose,
  onSaveAddress,
  initialAddress,
}) => {
  // Form State
  const [addressState, setAddressState] = useState<AddressDetails>({
    houseNumber: initialAddress?.houseNumber || '',
    street: initialAddress?.street || '',
    areaLocality: initialAddress?.areaLocality || 'City Centre, Gwalior',
    landmark: initialAddress?.landmark || '',
    city: initialAddress?.city || 'Gwalior',
    state: initialAddress?.state || 'Madhya Pradesh',
    pincode: initialAddress?.pincode || '474001',
    country: initialAddress?.country || 'India',
    formattedAddress: initialAddress?.formattedAddress || '',
    lat: initialAddress?.lat || DEFAULT_GWALIOR_COORDS.lat,
    lng: initialAddress?.lng || DEFAULT_GWALIOR_COORDS.lng,
  });

  // GPS & Map States
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: initialAddress?.lat || DEFAULT_GWALIOR_COORDS.lat,
    lng: initialAddress?.lng || DEFAULT_GWALIOR_COORDS.lng,
  });

  const [isLocating, setIsLocating] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsErrorCode, setGpsErrorCode] = useState<'PERMISSION_DENIED' | 'TIMEOUT' | 'UNAVAILABLE' | 'NOT_SUPPORTED' | 'INSECURE_CONTEXT' | null>(null);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [hasGpsSuccess, setHasGpsSuccess] = useState(false);
  const [isSecureContext, setIsSecureContext] = useState(true);

  // Address Search Autocomplete States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Map Container Ref
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // 1. On Mount / Open: Check HTTPS & Auto Request GPS
  useEffect(() => {
    if (!isOpen) return;

    // Check secure context
    const isSecure = window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    setIsSecureContext(isSecure);

    if (!isSecure) {
      setGpsErrorCode('INSECURE_CONTEXT');
      setGpsError('Geolocation requires a secure HTTPS connection. Please use the address search bar below to pinpoint your location.');
    } else {
      // Auto trigger GPS detection on modal open
      handleFetchGpsLocation();
    }

    // Register Permission Status Listener for auto retry when permission is granted
    let permStatus: PermissionStatus | null = null;
    if (typeof window !== 'undefined' && navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((status) => {
          permStatus = status;
          if (status.state === 'denied') {
            setIsPermissionDenied(true);
          }
          status.onchange = () => {
            if (status.state === 'granted') {
              setIsPermissionDenied(false);
              setShowPermissionModal(false);
              setGpsError(null);
              setGpsErrorCode(null);
              handleFetchGpsLocation(); // Auto retry after permission granted!
            } else if (status.state === 'denied') {
              setIsPermissionDenied(true);
            }
          };
        })
        .catch((e) => console.log('Permission query error:', e));
    }

    return () => {
      if (permStatus) {
        permStatus.onchange = null;
      }
    };
  }, [isOpen]);

  // 2. Initialize / Update Leaflet Map
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        const map = L.map(mapRef.current, {
          center: [coords.lat, coords.lng],
          zoom: 16,
          zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap',
        }).addTo(map);

        const marker = L.marker([coords.lat, coords.lng], {
          draggable: true,
          icon: createCustomIcon(),
        }).addTo(map);

        markerRef.current = marker;
        mapInstanceRef.current = map;

        // Handle Pin Drag
        marker.on('dragend', async () => {
          const newPos = marker.getLatLng();
          setCoords({ lat: newPos.lat, lng: newPos.lng });
          await reverseGeocode(newPos.lat, newPos.lng);
        });

        // Handle Map Click
        map.on('click', async (e: L.LeafletMouseEvent) => {
          marker.setLatLng(e.latlng);
          setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
          await reverseGeocode(e.latlng.lat, e.latlng.lng);
        });
      } else if (mapInstanceRef.current && markerRef.current) {
        mapInstanceRef.current.setView([coords.lat, coords.lng], 16);
        markerRef.current.setLatLng([coords.lat, coords.lng]);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, coords]);

  // Clean up map on modal close
  useEffect(() => {
    if (!isOpen && mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    }
  }, [isOpen]);

  // 3. Reverse Geocoding API function
  const reverseGeocode = async (lat: number, lng: number) => {
    setIsGeocoding(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};

        const houseNum = address.house_number || address.building || address.flat || address.office || '';
        const streetName = address.road || address.street || address.pedestrian || address.suburb || 'Main Road';
        const locality =
          address.neighbourhood ||
          address.suburb ||
          address.residential ||
          address.city_district ||
          address.county ||
          'City Centre';

        const cityName = address.city || address.town || address.village || address.municipality || 'Gwalior';
        const stateName = address.state || 'Madhya Pradesh';
        const postcode = address.postcode || '474001';
        const countryName = address.country || 'India';

        const formatted = data.display_name || `${streetName}, ${locality}, ${cityName}, ${stateName} ${postcode}`;

        setAddressState((prev) => ({
          ...prev,
          houseNumber: prev.houseNumber || houseNum || 'Doorstep Location',
          street: prev.street || streetName || 'Main Street',
          areaLocality: locality.includes('Gwalior') ? locality : `${locality}, Gwalior`,
          city: cityName,
          state: stateName,
          pincode: postcode,
          country: countryName,
          formattedAddress: formatted,
          lat,
          lng,
        }));
      } else {
        // Fallback: BigDataCloud Reverse Geocode
        const fallbackRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        if (fallbackRes.ok) {
          const fData = await fallbackRes.json();
          const locName = fData.locality || fData.city || 'City Centre';
          setAddressState((prev) => ({
            ...prev,
            houseNumber: prev.houseNumber || 'Doorstep Location',
            street: prev.street || 'Main Road',
            areaLocality: locName.includes('Gwalior') ? locName : `${locName}, Gwalior`,
            city: fData.city || 'Gwalior',
            state: fData.principalSubdivision || 'Madhya Pradesh',
            country: fData.countryName || 'India',
            pincode: fData.postcode || '474001',
            lat,
            lng,
          }));
        }
      }
    } catch (err) {
      console.warn('Reverse geocoding error:', err);
    } finally {
      setIsGeocoding(false);
    }
  };

  // 4. Main GPS Fetch Function with High & Low Accuracy Fallback for Mobile/Android
  const handleFetchGpsLocation = (isManualRetry = false) => {
    // Check HTTPS
    const isSecure = window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isSecure) {
      setIsSecureContext(false);
      setGpsErrorCode('INSECURE_CONTEXT');
      setGpsError('Geolocation API requires a secure HTTPS connection. Please search or enter your address manually below.');
      return;
    }

    if (!navigator.geolocation) {
      setGpsErrorCode('NOT_SUPPORTED');
      setGpsError('Geolocation is not supported by your browser or device.');
      return;
    }

    setIsLocating(true);
    setGpsError(null);
    setGpsErrorCode(null);

    // High accuracy settings with 10s timeout
    const highAccuracyOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    // Low accuracy fallback settings for weak GPS / indoor Android Chrome
    const lowAccuracyOptions: PositionOptions = {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 60000,
    };

    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCoords({ lat: latitude, lng: longitude });
      setHasGpsSuccess(true);
      setIsLocating(false);
      setIsPermissionDenied(false);
      setShowPermissionModal(false);
      setGpsError(null);
      setGpsErrorCode(null);

      // Update Map View
      if (mapInstanceRef.current && markerRef.current) {
        mapInstanceRef.current.setView([latitude, longitude], 17);
        markerRef.current.setLatLng([latitude, longitude]);
      }

      await reverseGeocode(latitude, longitude);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.warn('Geolocation Error Code:', error.code, error.message);

      if (error.code === error.PERMISSION_DENIED) {
        setIsLocating(false);
        setIsPermissionDenied(true);
        setShowPermissionModal(true);
        setGpsErrorCode('PERMISSION_DENIED');
        setGpsError('Location permission denied. Please grant location access in browser settings or search address below.');
      } else if (error.code === error.TIMEOUT && !isManualRetry) {
        // High accuracy timed out - automatically attempt low accuracy cellular/Wi-Fi positioning (crucial for Android)
        console.log('High accuracy GPS timed out. Trying WiFi/cellular location positioning...');
        navigator.geolocation.getCurrentPosition(
          handleSuccess,
          (err2) => {
            setIsLocating(false);
            setGpsErrorCode('TIMEOUT');
            setGpsError('GPS satellite signal timed out. Please focus the search bar below to select your address in Gwalior.');
            // Focus search bar as automatic fallback
            if (searchInputRef.current) searchInputRef.current.focus();
          },
          lowAccuracyOptions
        );
      } else {
        setIsLocating(false);
        if (error.code === error.TIMEOUT) {
          setGpsErrorCode('TIMEOUT');
          setGpsError('GPS location request timed out. Please check location settings or search manually below.');
        } else {
          setGpsErrorCode('UNAVAILABLE');
          setGpsError('GPS location unavailable. Please ensure location is enabled on your device or search address manually.');
        }
        // Focus search bar as automatic fallback
        if (searchInputRef.current) searchInputRef.current.focus();
      }
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, highAccuracyOptions);
  };

  // 5. Address Search Autocomplete Handler
  const handleSearchAddress = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim() || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const formattedQuery = query.toLowerCase().includes('gwalior') ? query : `${query}, Gwalior, India`;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formattedQuery)}&addressdetails=1&limit=5`,
        {
          headers: { 'Accept-Language': 'en' },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
      }
    } catch (err) {
      console.error('Address search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Select Search Result
  const handleSelectSearchResult = async (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setCoords({ lat, lng });
    setSearchResults([]);
    setSearchQuery(result.display_name.split(',')[0]);

    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([lat, lng], 17);
      markerRef.current.setLatLng([lat, lng]);
    }

    await reverseGeocode(lat, lng);
  };

  // Validation check: address is valid as long as essential fields are filled
  const isAddressValid =
    addressState.houseNumber.trim().length > 0 &&
    addressState.street.trim().length > 0 &&
    addressState.areaLocality.trim().length > 0 &&
    addressState.city.trim().length > 0 &&
    addressState.pincode.trim().length >= 4;

  const handleSave = () => {
    if (!isAddressValid) return;
    onSaveAddress(addressState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_rgba(2,132,199,0.3)] border border-sky-100 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-250">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E3A5F] via-[#0284C7] to-[#4FC3F7] p-4 sm:p-5 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-sky-100 border border-white/20">
              Live Doorstep Pinpoint
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
            Confirm Service Address
          </h3>
          <p className="text-xs text-sky-100 mt-0.5">
            Detect GPS location or search your area in Gwalior.
          </p>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar bg-white">
          
          {/* HTTPS Warning if non-secure context */}
          {!isSecureContext && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 animate-in fade-in">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900">Secure HTTPS Required for Geolocation</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Browsers disable automatic GPS detection over HTTP. Please search or select your address manually using the search bar below.
                </p>
              </div>
            </div>
          )}

          {/* PRIMARY GPS BUTTON */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleFetchGpsLocation(true)}
              disabled={isLocating}
              className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md ${
                isLocating
                  ? 'bg-sky-100 text-[#0284C7] cursor-wait border border-sky-300'
                  : 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#1E3A5F] hover:from-[#0369A1] hover:to-[#0284C7] text-white shadow-sky-400/20 hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#0284C7]" />
                  <span>Detecting GPS Location...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5 animate-pulse fill-current text-sky-200" />
                  <span>Detect Current GPS Location</span>
                </>
              )}
            </button>

            {/* GPS Success Toast */}
            {hasGpsSuccess && !isLocating && !gpsError && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  GPS Location Detected Successfully!
                </span>
                <span className="text-[10px] text-emerald-700 font-extrabold uppercase">
                  Precision: High
                </span>
              </div>
            )}

            {/* GPS Error Box */}
            {gpsError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="font-semibold leading-relaxed">{gpsError}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleFetchGpsLocation(true)}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Request Permission Again
                  </button>

                  {isPermissionDenied && (
                    <button
                      type="button"
                      onClick={() => setShowPermissionModal(true)}
                      className="px-3.5 py-1.5 bg-white border border-rose-300 hover:bg-rose-100 text-rose-700 font-extrabold text-[10px] uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all"
                    >
                      <Settings className="w-3.5 h-3.5" /> How to Enable Permission
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ADDRESS SEARCH AUTOCOMPLETE (FALLBACK & QUICK SEARCH) */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-[#1E3A5F] font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#0284C7]" /> Search Area or Colony in Gwalior
            </label>
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchAddress(e.target.value)}
                placeholder="🔍 Type locality (e.g. City Centre, Lashkar, Thatipur, Morar)..."
                className="w-full bg-sky-50/50 border-2 border-sky-300 rounded-2xl px-3.5 py-2.5 text-xs text-[#1E3A5F] font-semibold placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all shadow-xs"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-4 h-4 text-[#0284C7] animate-spin" />
                </div>
              )}

              {/* Search Suggestions Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-sky-200 rounded-2xl shadow-xl z-30 max-h-48 overflow-y-auto divide-y divide-sky-100">
                  {searchResults.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSearchResult(item)}
                      className="w-full p-2.5 text-left text-xs hover:bg-sky-50 text-[#1E3A5F] transition-colors flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                      <span className="truncate">{item.display_name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MAP CANVAS CONTAINER */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0284C7]" /> Drag Pin To Fine-Tune Address
              </span>
              {isGeocoding && (
                <span className="text-[10px] text-[#0284C7] font-bold flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Updating location...
                </span>
              )}
            </div>

            <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-sky-300 shadow-md">
              <div ref={mapRef} className="w-full h-full z-0" />

              {/* Map instruction floating pill */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-extrabold text-[#1E3A5F] border border-sky-200 shadow-lg pointer-events-none flex items-center gap-1">
                <Map className="w-3 h-3 text-[#0284C7]" />
                <span>Drag blue pin to exact doorstep</span>
              </div>
            </div>
          </div>

          {/* AUTO-FILLED DETAILED ADDRESS FORM */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-1.5 border-b border-sky-100 pb-1.5">
              <Home className="w-4 h-4 text-[#0284C7]" /> Address Details (Auto-Filled via GPS)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">
                  House / Flat / Building No. *
                </label>
                <input
                  type="text"
                  required
                  value={addressState.houseNumber}
                  onChange={(e) => setAddressState({ ...addressState, houseNumber: e.target.value })}
                  placeholder="e.g. Flat 302, Royal Residency"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">
                  Street / Road Name *
                </label>
                <input
                  type="text"
                  required
                  value={addressState.street}
                  onChange={(e) => setAddressState({ ...addressState, street: e.target.value })}
                  placeholder="e.g. Main Market Road, Lane 4"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">
                  Area / Locality in Gwalior *
                </label>
                <input
                  type="text"
                  required
                  value={addressState.areaLocality}
                  onChange={(e) => setAddressState({ ...addressState, areaLocality: e.target.value })}
                  placeholder="e.g. City Centre, Gwalior"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={addressState.landmark}
                  onChange={(e) => setAddressState({ ...addressState, landmark: e.target.value })}
                  placeholder="e.g. Near SBI Bank ATM"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={addressState.city}
                  onChange={(e) => setAddressState({ ...addressState, city: e.target.value })}
                  placeholder="Gwalior"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">
                  PIN Code *
                </label>
                <input
                  type="text"
                  required
                  value={addressState.pincode}
                  onChange={(e) => setAddressState({ ...addressState, pincode: e.target.value })}
                  placeholder="474001"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            Doorstep beautician arrives with GPS Navigation & verified service kit.
          </div>
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-4 bg-sky-50 border-t border-sky-200 shrink-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-2xl bg-white border border-sky-300 text-[#1E3A5F] font-extrabold text-xs uppercase tracking-wider hover:bg-sky-100 transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!isAddressValid}
            className={`flex-1 py-3 px-5 rounded-2xl font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
              isAddressValid
                ? 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-sky-400/30 hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Confirm & Use This Location</span>
          </button>
        </div>
      </div>

      {/* CLEAR PERMISSION GUIDANCE POPUP OVERLAY */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-sky-200 space-y-4 relative animate-in zoom-in-95">
            
            <button
              onClick={() => setShowPermissionModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-100 text-[#0284C7] rounded-2xl">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
                  Permission Required
                </span>
                <h3 className="text-lg font-bold text-[#1E3A5F] font-serif mt-0.5">
                  How to Grant Location Permission
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your browser blocked location access. To automatically pinpoint your doorstep in Gwalior, please enable location permissions following these steps:
            </p>

            <div className="space-y-2.5 text-xs bg-sky-50 p-3.5 rounded-2xl border border-sky-200">
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E3A5F]">Android / Chrome Mobile:</strong>
                  <p className="text-[11px] text-slate-600">Tap the padlock/settings icon <span className="px-1.5 py-0.5 bg-white border rounded">🔒</span> next to the URL bar &rarr; Permissions &rarr; Location &rarr; Allow.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Smartphone className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E3A5F]">iPhone / Safari iOS:</strong>
                  <p className="text-[11px] text-slate-600">Open iOS Settings &rarr; Privacy & Security &rarr; Location Services &rarr; Safari &rarr; Select "While Using the App".</p>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowPermissionModal(false);
                  handleFetchGpsLocation(true);
                }}
                className="w-full py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-sky-400/20 flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Request Permission Again</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPermissionModal(false);
                  if (searchInputRef.current) searchInputRef.current.focus();
                }}
                className="w-full py-2.5 bg-white border border-sky-300 text-[#1E3A5F] hover:bg-sky-50 font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Search Address Manually</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
