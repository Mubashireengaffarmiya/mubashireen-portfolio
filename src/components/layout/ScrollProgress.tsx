import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-violet transition-all duration-75 ease-out shadow-sm shadow-accent-cyan/30"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
