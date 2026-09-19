import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-3 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-light-text dark:text-dark-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-light-muted dark:text-dark-muted max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
