import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'indigo' | 'emerald' | 'violet' | 'amber' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20 dark:border-accent-cyan/30',
    indigo: 'bg-accent-indigo/10 text-accent-indigo border-accent-indigo/20 dark:border-accent-indigo/30',
    emerald: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20 dark:border-accent-emerald/30',
    violet: 'bg-accent-violet/10 text-accent-violet border-accent-violet/20 dark:border-accent-violet/30',
    amber: 'bg-accent-amber/10 text-accent-amber border-accent-amber/20 dark:border-accent-amber/30',
    neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs sm:text-sm px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
