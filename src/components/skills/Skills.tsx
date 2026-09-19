import React, { useState, useMemo } from 'react';
import { Search, Code2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { SkillCard } from './SkillCard';
import { SKILLS_DATA, SKILL_CATEGORIES } from '../../data/skills';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...SKILL_CATEGORIES];

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter(skill => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.highlight && skill.highlight.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Tech Stack"
          title="Skills & Technologies"
          subtitle="Real technologies verified from my GitHub repositories, coursework, and IBM/Wadhwani certifications. No arbitrary percentage bars."
        />

        {/* Filter Controls: Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-accent-cyan text-white shadow-md shadow-accent-cyan/25 font-semibold'
                    : 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:border-accent-cyan/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted dark:text-dark-muted" />
            <input
              type="text"
              placeholder="Search skills (e.g. React, C, OCR)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none focus:border-accent-cyan transition-colors"
            />
          </div>

        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
            <p className="text-sm text-light-muted dark:text-dark-muted">
              No skills found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
            {filteredSkills.map(skill => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        )}

        {/* Learning philosophy highlight */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-accent-cyan/5 via-accent-indigo/5 to-accent-violet/5 border border-accent-cyan/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent-cyan/10 text-accent-cyan shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-light-text dark:text-dark-text">
                Demonstrated Engineering Foundations
              </h4>
              <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">
                Every skill is backed by working code, repository commits, or accredited certificates.
              </p>
            </div>
          </div>
          <div className="font-mono text-xs text-accent-cyan shrink-0 bg-accent-cyan/10 px-3 py-1 rounded-full border border-accent-cyan/20">
            Active Project Practice
          </div>
        </div>

      </div>
    </section>
  );
};
