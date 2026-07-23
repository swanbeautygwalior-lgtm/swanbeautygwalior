import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Lock } from 'lucide-react';

export type PolicyTab = 'terms' | 'privacy' | 'refund' | 'hygiene';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms'
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1E3A5F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[85vh] flex flex-col border border-sky-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-50 via-white to-sky-50 border-b border-sky-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#0284C7] text-white rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-extrabold text-[#1E3A5F] uppercase tracking-wider">
                Swan Beauty Home Salon Policies
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">Official Gwalior Terms & Service Guidelines</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-[#1E3A5F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-sky-100 bg-sky-50/50 p-2 gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'terms'
                ? 'bg-[#0284C7] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-[#0284C7]'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'privacy'
                ? 'bg-[#0284C7] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-[#0284C7]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'refund'
                ? 'bg-[#0284C7] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-[#0284C7]'
            }`}
          >
            Refund & Cancellation
          </button>
          <button
            onClick={() => setActiveTab('hygiene')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'hygiene'
                ? 'bg-[#0284C7] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-[#0284C7]'
            }`}
          >
            Hygiene Guarantee
          </button>
        </div>

        {/* Modal Body Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed font-normal">
          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase">1. Service Scope & Availability</h4>
              <p>
                Swan Beauty provides doorstep home salon services exclusively for women in Gwalior, MP. All appointments require valid phone number confirmation and address details.
              </p>
              <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase">2. Appointment Time & Delay</h4>
              <p>
                Beauticians arrive within a 15-minute grace window of your selected slot. Please ensure adequate lighting, power backup for heated equipment, and access to clean water.
              </p>
              <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase">3. Transparent Pricing</h4>
              <p>
                All prices displayed on website are final. No additional travel fees, conveyance costs, or unexpected taxes are added at checkout.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase">1. Customer Privacy Commitment</h4>
              <p>
                Your phone number, doorstep location, and appointment records are kept strictly confidential and never shared with third parties.
              </p>
              <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase">2. Verified Female Personnel Only</h4>
              <p>
                All staff profiles undergo strict Aadhaar & police verification prior to home visits.
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase">1. Free Rescheduling & Cancellation</h4>
              <p>
                You can cancel or reschedule your home appointment free of cost up to 2 hours prior to your scheduled time slot.
              </p>
              <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase">2. 100% Satisfaction Guarantee</h4>
              <p>
                If you encounter any product discrepancy or service issue, notify support within 24 hours for a complimentary re-service or instant wallet refund.
              </p>
            </div>
          )}

          {activeTab === 'hygiene' && (
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase">1. Sealed Disposable Mono-Dose Kits</h4>
              <p>
                Every bedsheet, facial wipe, towel, headband, wax spatula, and apron is opened fresh right in front of you from sealed single-use packs.
              </p>
              <h4 className="font-serif text-sm font-extrabold text-[#1E3A5F] uppercase">2. Sterilized Equipment & Fresh Products</h4>
              <p>
                Only original products from Rica Italy, O3+, Casmara, and Korean skincare brands are utilized.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-sky-50 border-t border-sky-100 flex items-center justify-between shrink-0">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase">
            Swan Beauty Support • +91 83497 29518
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0284C7] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-[#0369A1] transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
