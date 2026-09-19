import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { TIMELINE_DATA } from '../../data/timeline';
import { Calendar, Award, GraduationCap, Trophy, Sparkles } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-light-surface/40 dark:bg-dark-surface/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Milestones & Journey"
          title="Technical Journey & Milestones"
          subtitle="Key academic and practical milestones, verified certifications, hackathon projects, and future graduation."
        />

        <div className="relative mt-12">
          {/* Vertical central timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-indigo to-accent-violet -translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = 
                item.type === 'education' ? GraduationCap :
                item.type === 'hackathon' ? Trophy :
                Award;

              return (
                <div 
                  key={item.id} 
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node Icon */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-light-surface dark:bg-dark-surface border-2 border-accent-cyan flex items-center justify-center text-accent-cyan shadow-glow-cyan z-10">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Content Card */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                    isEven ? 'sm:pr-10' : 'sm:pl-10'
                  }`}>
                    <div className={`p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent-cyan/40 transition-all duration-300 shadow-md ${
                      item.highlight ? 'ring-1 ring-accent-cyan/30' : ''
                    }`}>
                      {/* Date & Type Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.dateText}
                        </span>
                        {item.highlight && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                            <Sparkles className="w-2.5 h-2.5" />
                            Key Milestone
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <h4 className="text-base font-bold text-light-text dark:text-dark-text">
                        {item.title}
                      </h4>
                      <p className="text-xs font-medium text-accent-indigo mt-0.5">
                        {item.subtitle}
                      </p>

                      {item.institution && (
                        <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
                          {item.institution}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-xs text-light-muted dark:text-dark-muted mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
