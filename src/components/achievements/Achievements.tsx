import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  ExternalLink,
  Medal
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ACHIEVEMENTS_DATA } from '../../data/achievements';

export const Achievements: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Hackathon', 'Certification', 'Academic'];

  const filteredAchievements = activeCategory === 'All'
    ? ACHIEVEMENTS_DATA
    : ACHIEVEMENTS_DATA.filter(a => a.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-amber-400" />;
      case 'Award':
        return <Award className="w-6 h-6 text-accent-indigo" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-accent-emerald" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-accent-violet" />;
      default:
        return <Medal className="w-6 h-6 text-accent-cyan" />;
    }
  };

  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Honors"
          title="Achievements & Recognition"
          subtitle="Milestones celebrating hackathon innovation, accredited technical certifications, and academic progress at REVA University."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-accent-cyan text-white shadow-md shadow-accent-cyan/25'
                  : 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(ach => (
            <div
              key={ach.id}
              className="p-6 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-xl hover:border-accent-cyan/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-light-bg dark:bg-dark-surface">
                    {getIcon(ach.iconName)}
                  </div>
                  {ach.badge && (
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/25">
                      {ach.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-light-text dark:text-dark-text">
                  {ach.title}
                </h3>

                <div className="text-xs font-mono text-accent-cyan mt-1">
                  {ach.organization} • {ach.date}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {ach.credentialUrl && (
                <div className="mt-5 pt-4 border-t border-light-border dark:border-dark-border flex items-center justify-between">
                  <span className="text-xs font-mono text-light-muted dark:text-dark-muted">
                    Credential Proof
                  </span>
                  <a
                    href={ach.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan hover:underline"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
