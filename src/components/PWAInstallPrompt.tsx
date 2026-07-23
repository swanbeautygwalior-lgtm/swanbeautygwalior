import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40 glass-card rounded-2xl p-4 border border-white/10 shadow-2xl animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Install Swan Beauty App</h4>
            <p className="text-[10px] text-gray-400">Faster booking & instant WhatsApp access in Gwalior</p>
          </div>
        </div>

        <button
          onClick={() => setShowPrompt(false)}
          className="text-gray-500 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 py-2 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md hover:bg-white transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install App</span>
        </button>
      </div>
    </div>
  );
};
