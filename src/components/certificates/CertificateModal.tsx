import React from 'react';
import { X, Award, CheckCircle2, Calendar, Building2, User, BookOpen } from 'lucide-react';
import { CertificateItem } from '../../types';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, isOpen, onClose }) => {
  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Certificate Decorative Header */}
        <div className="p-6 bg-gradient-to-r from-accent-cyan/15 via-accent-indigo/15 to-accent-violet/10 border-b border-light-border dark:border-dark-border relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-light-card/80 dark:hover:bg-dark-card/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
              <Award className="w-3.5 h-3.5" />
              Verified Certificate
            </span>
            {certificate.courseCode && (
              <span className="text-xs font-mono text-light-muted dark:text-dark-muted">
                ID: {certificate.courseCode}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
            {certificate.title}
          </h2>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Issued by {certificate.issuer}
          </p>
        </div>

        {/* Certificate Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Certificate Credential Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border">
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-light-muted dark:text-dark-muted block">Recipient Name</span>
                <span className="text-sm font-semibold text-light-text dark:text-dark-text">{certificate.recipientName}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-accent-indigo shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-light-muted dark:text-dark-muted block">Issue / Completion Date</span>
                <span className="text-sm font-semibold text-light-text dark:text-dark-text">{certificate.date}</span>
              </div>
            </div>

            {certificate.institution && (
              <div className="flex items-start gap-3 sm:col-span-2">
                <Building2 className="w-4 h-4 text-accent-violet shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-light-muted dark:text-dark-muted block">Institution</span>
                  <span className="text-sm font-semibold text-light-text dark:text-dark-text">{certificate.institution}</span>
                </div>
              </div>
            )}

            {certificate.duration && (
              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-accent-amber shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-light-muted dark:text-dark-muted block">Training Duration</span>
                  <span className="text-sm font-semibold text-light-text dark:text-dark-text">{certificate.duration}</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-light-muted dark:text-dark-muted block">Verification Status</span>
                <span className="text-sm font-semibold text-accent-emerald">Officially Verified</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-2">
              Curriculum & Overview
            </h4>
            <p className="text-sm text-light-text dark:text-dark-text leading-relaxed">
              {certificate.description}
            </p>
          </div>

          {/* Key Competencies Acquired */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-2">
              Key Competencies Acquired
            </h4>
            <div className="flex flex-wrap gap-2">
              {certificate.skillsLearned.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-lg bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border flex items-center justify-between">
          <span className="text-xs text-light-muted dark:text-dark-muted">
            Verified under Mubashireen's student credentials
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
