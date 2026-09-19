import React from 'react';
import { Award, Calendar, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';
import { CertificateItem } from '../../types';

interface CertificateCardProps {
  certificate: CertificateItem;
  onView: (cert: CertificateItem) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onView }) => {
  return (
    <div className="group relative rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 hover:border-accent-cyan/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent-cyan/10 flex flex-col justify-between">
      {/* Top Accent Gradient Border Glow */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
            <Award className="w-3.5 h-3.5" />
            {certificate.courseCode || certificate.duration || 'Certified'}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-accent-emerald font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified
          </span>
        </div>

        {/* Certificate Title */}
        <h3 className="text-lg font-bold text-light-text dark:text-dark-text group-hover:text-accent-cyan transition-colors line-clamp-2">
          {certificate.title}
        </h3>

        {/* Issuer */}
        <p className="text-xs font-medium text-light-muted dark:text-dark-muted mt-1">
          {certificate.issuer}
        </p>

        {/* Date & Recipient */}
        <div className="flex items-center gap-4 text-xs text-light-muted/80 dark:text-dark-muted/80 mt-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-accent-indigo" />
            <span>{certificate.date}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-light-muted dark:text-dark-muted mt-3 leading-relaxed">
          {certificate.description}
        </p>

        {/* Skills Badges */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {certificate.skillsLearned.map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-mono"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-light-border dark:border-dark-border flex items-center justify-between gap-3">
        <button
          onClick={() => onView(certificate)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 transition-all hover:scale-[1.02]"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Certificate</span>
        </button>

        <button
          onClick={() => onView(certificate)}
          className="inline-flex items-center justify-center p-2 rounded-xl text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-light-bg dark:hover:bg-dark-surface border border-light-border dark:border-dark-border transition-colors"
          title="Verify Credential"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
