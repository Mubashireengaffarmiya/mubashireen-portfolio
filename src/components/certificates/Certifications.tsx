import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { CERTIFICATES_DATA } from '../../data/certificates';
import { CertificateCard } from './CertificateCard';
import { CertificateModal } from './CertificateModal';
import { CertificateCategory, CertificateItem } from '../../types';

const CATEGORIES: CertificateCategory[] = ['ALL', 'IBM', 'PYTHON', 'DATA SCIENCE', 'PROGRAMS'];

export const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>('ALL');
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  const filteredCertificates = CERTIFICATES_DATA.filter(cert => {
    if (selectedCategory === 'ALL') return true;
    return cert.category.includes(selectedCategory);
  });

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-accent-indigo/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          badge="Verified Credentials"
          title="Official Certifications"
          subtitle="Accredited certifications in Python programming, data analytics, visualization, and venture creation from IBM SkillsBuild and Wadhwani Foundation."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-indigo text-white shadow-lg shadow-accent-cyan/20 scale-105'
                  : 'bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:border-accent-cyan/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCertificates.map(cert => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onView={(c) => setActiveCert(c)}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <CertificateModal
        certificate={activeCert}
        isOpen={Boolean(activeCert)}
        onClose={() => setActiveCert(null)}
      />
    </section>
  );
};
