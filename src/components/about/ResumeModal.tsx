import React from 'react';
import { X, Download, Printer, GraduationCap, Briefcase, Code, Award } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { PROJECTS_DATA } from '../../data/projects';
import { CERTIFICATES_DATA } from '../../data/certificates';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-dark-surface rounded-3xl shadow-2xl border border-light-border dark:border-dark-border overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-border dark:border-dark-border bg-slate-50 dark:bg-dark-card/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 text-accent-cyan flex items-center justify-center font-mono font-bold text-xs">
              CV
            </div>
            <div>
              <h3 className="text-base font-bold text-light-text dark:text-dark-text">Academic Resume</h3>
              <p className="text-xs text-light-muted dark:text-dark-muted font-mono">{PROFILE.displayName} — {PROFILE.degree}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl border border-light-border dark:border-dark-border hover:bg-slate-200 dark:hover:bg-dark-card text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors"
              title="Print / Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-light-border dark:border-dark-border hover:bg-slate-200 dark:hover:bg-dark-card text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Formatted Resume Document */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 font-sans text-sm print:p-0">
          {/* Header Info */}
          <div className="border-b border-light-border dark:border-dark-border pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-light-text dark:text-dark-text">{PROFILE.displayName}</h1>
              <p className="text-accent-cyan font-semibold text-sm mt-0.5">{PROFILE.role} • {PROFILE.institution}</p>
              <p className="text-xs text-light-muted dark:text-dark-muted mt-1">{PROFILE.location} • Batch {PROFILE.graduationYear}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded bg-slate-100 dark:bg-dark-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-accent-cyan">
                github.com/{PROFILE.githubUsername}
              </a>
              {PROFILE.linkedin && (
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded bg-slate-100 dark:bg-dark-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-blue-500">
                  LinkedIn: Mubashireen Shaik
                </a>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-cyan mb-2 font-mono">
              <GraduationCap className="w-4 h-4" /> Education
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-card/40 border border-light-border dark:border-dark-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold">
                <span>{PROFILE.university}, Bengaluru</span>
                <span className="text-xs text-light-muted dark:text-dark-muted font-mono">2025 – 2029</span>
              </div>
              <div className="text-xs text-light-muted dark:text-dark-muted mt-0.5">
                {PROFILE.degree} • Status: <strong className="text-light-text dark:text-dark-text">{PROFILE.semester}</strong>
              </div>
            </div>
          </div>

          {/* Key Featured Projects */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-cyan mb-2 font-mono">
              <Briefcase className="w-4 h-4" /> Practical Projects
            </h4>
            <div className="space-y-3">
              {PROJECTS_DATA.slice(0, 3).map(project => (
                <div key={project.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-card/40 border border-light-border dark:border-dark-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold">
                    <span className="text-light-text dark:text-dark-text">{project.title}</span>
                    <span className="text-xs text-accent-cyan font-mono">{project.category}</span>
                  </div>
                  <p className="text-xs text-light-muted dark:text-dark-muted mt-1 leading-relaxed">{project.problemSolved}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-[11px] px-2 py-0.5 rounded bg-slate-200/60 dark:bg-dark-card text-light-text dark:text-dark-text font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Certifications */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-cyan mb-2 font-mono">
              <Award className="w-4 h-4" /> Verified Certifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CERTIFICATES_DATA.map(cert => (
                <div key={cert.id} className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card/40 border border-light-border dark:border-dark-border">
                  <div className="font-bold text-light-text dark:text-dark-text">{cert.title}</div>
                  <div className="text-[11px] text-light-muted dark:text-dark-muted">{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-cyan mb-2 font-mono">
              <Code className="w-4 h-4" /> Technical Skills
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card/40 border border-light-border dark:border-dark-border">
                <span className="font-bold text-light-text dark:text-dark-text">Languages:</span> Python, C, C++, Java, JavaScript, TypeScript
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card/40 border border-light-border dark:border-dark-border">
                <span className="font-bold text-light-text dark:text-dark-text">Web & Backend:</span> React, Tailwind CSS, FastAPI, REST APIs
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card/40 border border-light-border dark:border-dark-border">
                <span className="font-bold text-light-text dark:text-dark-text">AI & Data:</span> PaddleOCR, Tesseract 5, OpenCV, Data Analysis, Data Visualization
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-card/40 border border-light-border dark:border-dark-border">
                <span className="font-bold text-light-text dark:text-dark-text">Tools:</span> Git, GitHub, VS Code, MySQL
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-light-border dark:border-dark-border bg-slate-50 dark:bg-dark-card/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-light-muted dark:text-dark-muted font-mono">
            Direct download formatted for academic and recruitment review
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent-cyan text-white shadow hover:bg-accent-cyan/90 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:bg-slate-200 dark:hover:bg-dark-card transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
