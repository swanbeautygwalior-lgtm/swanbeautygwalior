import React, { useState } from 'react';
import {
  X,
  Gift,
  Copy,
  Check,
  Share2,
  MessageCircle,
  Sparkles,
  Users,
  ShieldCheck,
  ArrowRight,
  Send,
  QrCode,
  Tag,
  HeartHandshake,
  ExternalLink
} from 'lucide-react';

interface ReferAFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCouponCode?: (code: string) => void;
}

export const ReferAFriendModal: React.FC<ReferAFriendModalProps> = ({
  isOpen,
  onClose,
  onApplyCouponCode,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [userPhoneInput, setUserPhoneInput] = useState('');
  const [customRefCode, setCustomRefCode] = useState('SWAN-GWL-8821');

  if (!isOpen) return null;

  const siteUrl = window.location.origin;
  const referralLink = `${siteUrl}/?ref=${customRefCode}`;
  const rewardDiscountCode = 'FRIEND150';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(customRefCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const shareText = `Hey! I recommend Swan Beauty Home Salon in Gwalior. Get ₹100 OFF on your first salon service at doorstep using my referral link: ${referralLink}`;

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Swan Beauty Gwalior - Refer & Earn',
          text: shareText,
          url: referralLink,
        });
      } catch (e) {
        console.log('Share dismissed', e);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleGenerateCodeFromPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPhoneInput) return;
    const cleanDigits = userPhoneInput.replace(/\D/g, '').slice(-4) || '8821';
    setCustomRefCode(`SWAN-GWL-${cleanDigits}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-[0_25px_60px_rgba(2,132,199,0.25)] border border-sky-100 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#1E3A5F] via-[#0284C7] to-[#4FC3F7] p-6 text-white relative overflow-hidden shrink-0">
          
          {/* Subtle Decorative Background Rings */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-sky-300/20 blur-lg pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white shadow-lg border border-white/20">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sky-100 border border-white/20">
              Exclusive Reward Program
            </span>
          </div>

          <h3 className="font-serif text-2xl font-black text-white uppercase tracking-wider leading-tight">
            Refer a Friend, <br />
            <span className="text-sky-200">Both Get ₹150 OFF!</span>
          </h3>

          <p className="text-xs text-sky-100 mt-2 font-medium max-w-sm">
            Share your unique link with friends in Gwalior. They get ₹100 instant discount & you unlock a ₹150 voucher code!
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar bg-white">
          
          {/* HOW IT WORKS 3-STEP GRID */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0284C7]" /> How Referral Rewards Work
            </h4>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1.5">
                <div className="w-7 h-7 bg-[#0284C7] text-white font-extrabold text-xs rounded-full flex items-center justify-center mx-auto shadow-sm">
                  1
                </div>
                <p className="text-[11px] font-extrabold text-[#1E3A5F] leading-tight">Share Link</p>
                <p className="text-[9px] text-slate-500">Send code or link to friends in Gwalior</p>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1.5">
                <div className="w-7 h-7 bg-[#0284C7] text-white font-extrabold text-xs rounded-full flex items-center justify-center mx-auto shadow-sm">
                  2
                </div>
                <p className="text-[11px] font-extrabold text-[#1E3A5F] leading-tight">Friend Books</p>
                <p className="text-[9px] text-slate-500">Friend gets ₹100 OFF on 1st service</p>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1.5">
                <div className="w-7 h-7 bg-[#0284C7] text-white font-extrabold text-xs rounded-full flex items-center justify-center mx-auto shadow-sm">
                  3
                </div>
                <p className="text-[11px] font-extrabold text-[#1E3A5F] leading-tight">You Earn ₹150</p>
                <p className="text-[9px] text-slate-500">Voucher credited directly to wallet</p>
              </div>
            </div>
          </div>

          {/* CUSTOMIZE CODE BY PHONE */}
          <form onSubmit={handleGenerateCodeFromPhone} className="bg-sky-50/80 border border-sky-200 rounded-2xl p-3.5 space-y-2">
            <label className="block text-[11px] font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center justify-between">
              <span>Personalize Your Referral Code</span>
              <span className="text-[9px] text-[#0284C7] font-bold">Optional</span>
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={userPhoneInput}
                onChange={(e) => setUserPhoneInput(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                className="flex-1 bg-white border border-sky-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#1E3A5F] focus:outline-none focus:border-[#0284C7]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0369A1] transition-all"
              >
                Set Code
              </button>
            </div>
          </form>

          {/* YOUR UNIQUE REFERRAL LINK BOX */}
          <div className="bg-white rounded-2xl border-2 border-[#0284C7] p-4 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#1E3A5F] uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#0284C7]" /> Your Unique Referral Link
              </span>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                Active Code: {customRefCode}
              </span>
            </div>

            {/* Readonly Link Box */}
            <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-xl p-2.5">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 bg-transparent text-xs font-mono font-bold text-[#1E3A5F] focus:outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 ${
                  copiedLink
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-sm'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Link
                  </>
                )}
              </button>
            </div>

            {/* Code Only Copy Option */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-medium">
                Referral Code: <strong className="text-[#1E3A5F]">{customRefCode}</strong>
              </span>
              <button
                onClick={handleCopyCode}
                className="text-[#0284C7] hover:underline font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedCode ? 'Code Copied' : 'Copy Code Only'}
              </button>
            </div>
          </div>

          {/* ONE-TAP INSTANT SHARE BUTTONS */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-[#1E3A5F] uppercase tracking-wider block">
              Instant Share Options
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-current text-white" />
                <span>Share on WhatsApp</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="py-3 px-4 bg-[#0284C7] hover:bg-[#0369A1] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-sky-400/20 transition-all hover:scale-[1.02]"
              >
                <Share2 className="w-4 h-4" />
                <span>More Apps</span>
              </button>
            </div>
          </div>

          {/* REWARD CODE PREVIEW FOR SELF */}
          <div className="bg-[#EAF8FF] border border-sky-200 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white text-[#0284C7] rounded-xl border border-sky-200 shadow-sm shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#1E3A5F]">
                  Have a friend's referral code?
                </p>
                <p className="text-[10px] text-slate-600">
                  Use coupon code <strong className="text-[#0284C7]">FRIEND150</strong> to claim ₹150 OFF
                </p>
              </div>
            </div>

            {onApplyCouponCode && (
              <button
                onClick={() => {
                  onApplyCouponCode('FRIEND150');
                  onClose();
                }}
                className="px-3 py-2 bg-white border border-sky-300 hover:border-[#0284C7] text-[#0284C7] font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm shrink-0"
              >
                Apply to Cart
              </button>
            )}
          </div>

          <div className="text-center pt-1">
            <p className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Valid across all Gwalior localities • No maximum limit on earned rewards
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
