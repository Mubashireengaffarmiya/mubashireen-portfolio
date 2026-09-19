import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { FeaturedSIH } from './FeaturedSIH';
import { PROJECTS_DATA } from '../../data/projects';
import { Github, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const otherCaseStudies = PROJECTS_DATA.filter(p => p.id !== 'sih-smart-lm' && p.isFeatured);

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="In-Depth Engineering"
          title="Featured Case Studies"
          subtitle="A detailed breakdown of architectural decisions, problem-solving methodologies, and technical implementations across my key projects."
        />

        {/* 1. Large Highlighted SIH Case Study */}
        <FeaturedSIH />

        {/* 2. Additional In-Depth Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {otherCaseStudies.map(project => (
            <div
              key={project.id}
              className="rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 sm:p-8 flex flex-col justify-between hover:border-accent-cyan/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent-cyan/5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    Case Study
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-light-muted dark:text-dark-muted hover:text-accent-cyan transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-accent-cyan font-medium mb-4">
                  {project.subtitle}
                </p>

                {/* The Problem & The Solution */}
                <div className="space-y-3 mb-6 text-xs text-light-muted dark:text-dark-muted leading-relaxed">
                  <div>
                    <strong className="text-light-text dark:text-dark-text block mb-0.5">The Problem:</strong>
                    {project.problemSolved}
                  </div>
                  <div>
                    <strong className="text-light-text dark:text-dark-text block mb-0.5">The Solution & Approach:</strong>
                    {project.solution} {project.approach}
                  </div>
                  <div>
                    <strong className="text-light-text dark:text-dark-text block mb-0.5">My Contribution:</strong>
                    {project.myContribution}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 mb-6">
                  {project.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-light-text dark:text-dark-text">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Current Result */}
              <div className="pt-4 border-t border-light-border dark:border-dark-border">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border font-mono text-light-muted dark:text-dark-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-accent-cyan font-medium">
                  Result: {project.currentResult}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
