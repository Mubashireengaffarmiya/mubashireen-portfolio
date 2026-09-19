import React from 'react';
import { PROFILE } from '../../data/profile';
import { GitFork, Award, GraduationCap, Calendar } from 'lucide-react';

export const ImpactStats: React.FC = () => {
  const icons = [GitFork, Award, GraduationCap, Calendar];

  return (
    <section className="py-12 border-y border-light-border/60 dark:border-dark-border/60 bg-light-surface/30 dark:bg-dark-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFILE.stats.map((stat, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border flex items-center gap-4 hover:border-accent-cyan/40 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent-cyan/15 to-accent-indigo/15 text-accent-cyan flex items-center justify-center shrink-0 border border-accent-cyan/20">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-dark-text tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-light-text dark:text-dark-text">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-light-muted dark:text-dark-muted">
                    {stat.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
