import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-white border border-sky-200 text-[#0284C7] flex items-center justify-center shadow-lg hover:bg-[#0284C7] hover:text-white transition-all hover:scale-110 rounded-full"
      title="Back to Top"
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};
