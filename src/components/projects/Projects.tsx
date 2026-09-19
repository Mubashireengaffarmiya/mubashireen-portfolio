import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { PROJECTS_DATA } from '../../data/projects';
import { Project, ProjectCategory } from '../../types';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'AI & ML', 'Web', 'Graphics', 'Academic'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-24 relative bg-light-surface/40 dark:bg-dark-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Codebases"
          title="Projects & Repositories"
          subtitle="Real projects developed by Mubashireen and hosted on GitHub, spanning regulatory AI/OCR inspection systems, reactive web apps, and low-level C graphics."
        />

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' 
              ? PROJECTS_DATA.length 
              : PROJECTS_DATA.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-accent-cyan to-accent-indigo text-white shadow-md shadow-accent-cyan/25 scale-105'
                    : 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:border-accent-cyan/40'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-light-bg dark:bg-dark-surface text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={p => setActiveModalProject(p)}
            />
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
};
