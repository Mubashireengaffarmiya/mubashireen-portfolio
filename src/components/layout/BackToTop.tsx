import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  // SVG Circle stroke dash calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-2xl bg-white dark:bg-dark-surface shadow-xl border border-slate-200 dark:border-dark-border hover:border-accent-cyan/50 text-light-text dark:text-dark-text transition-all duration-300 hover:scale-110 active:scale-95 group"
    >
      <div className="relative flex items-center justify-center w-9 h-9">
        {/* SVG Progress Ring */}
        <svg className="absolute w-10 h-10 -rotate-90 transform" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-200 dark:stroke-dark-card"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-accent-cyan transition-all duration-100"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-4 h-4 text-light-muted dark:text-dark-muted group-hover:text-accent-cyan transition-colors" />
      </div>
    </button>
  );
};
