import React from 'react';
import { 
  X, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Project } from '../../types';
import { Badge } from '../ui/Badge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-light-surface dark:bg-dark-surface rounded-3xl shadow-2xl border border-light-border dark:border-dark-border overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card/60">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="sm">
              {project.category}
            </Badge>
            {project.isFeatured && (
              <Badge variant="emerald" size="sm">
                Featured Project
              </Badge>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-dark-card text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Title & Subtitle */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-light-text dark:text-dark-text tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-accent-cyan font-mono font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Problem Solved Callout */}
          <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-card/80 border border-light-border dark:border-dark-border">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
              The Problem Solved
            </h4>
            <p className="text-sm text-light-text dark:text-dark-text leading-relaxed">
              {project.problemSolved}
            </p>
          </div>

          {/* Deep Overview */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-2">
              System Overview & Approach
            </h4>
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              {project.description} {project.approach}
            </p>
          </div>

          {/* My Contribution */}
          {project.myContribution && (
            <div className="p-4 rounded-2xl bg-accent-indigo/5 border border-accent-indigo/20">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-indigo mb-1.5">
                My Contribution
              </h4>
              <p className="text-sm text-light-text dark:text-dark-text leading-relaxed">
                {project.myContribution}
              </p>
            </div>
          )}

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-3">
              Key Engineering Features
            </h4>
            <div className="space-y-2.5">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-accent-emerald mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Architecture */}
          {project.architecture && (
            <div className="p-5 rounded-2xl bg-light-bg dark:bg-[#0c121e] border border-light-border dark:border-dark-border">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-cyan mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Technical Architecture
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {project.architecture.frontend && (
                  <div className="p-3 rounded-xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border">
                    <span className="text-light-muted dark:text-dark-muted block mb-0.5">Frontend</span>
                    <span className="font-semibold text-light-text dark:text-dark-text">{project.architecture.frontend}</span>
                  </div>
                )}
                {project.architecture.backend && (
                  <div className="p-3 rounded-xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border">
                    <span className="text-light-muted dark:text-dark-muted block mb-0.5">Backend Service</span>
                    <span className="font-semibold text-light-text dark:text-dark-text">{project.architecture.backend}</span>
                  </div>
                )}
                {project.architecture.aiEngine && (
                  <div className="p-3 rounded-xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border">
                    <span className="text-light-muted dark:text-dark-muted block mb-0.5">Vision / OCR Pipeline</span>
                    <span className="font-semibold text-light-text dark:text-dark-text">{project.architecture.aiEngine}</span>
                  </div>
                )}
                {project.architecture.database && (
                  <div className="p-3 rounded-xl bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border">
                    <span className="text-light-muted dark:text-dark-muted block mb-0.5">Storage & Logging</span>
                    <span className="font-semibold text-light-text dark:text-dark-text">{project.architecture.database}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Challenges if present */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-accent-amber" />
                Technical Challenges Addressed
              </h4>
              <div className="space-y-2">
                {project.challenges.map((ch, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border text-xs text-light-text dark:text-dark-text">
                    • {ch}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Tag Cloud */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-2">
              Technologies Utilized
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-light-bg dark:bg-dark-card text-light-text dark:text-dark-text border border-light-border dark:border-dark-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="p-5 border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-dark-bg text-white dark:bg-white dark:text-dark-bg hover:opacity-90 transition-all shadow"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent-cyan text-white hover:bg-accent-cyan/90 transition-all shadow"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-slate-200 dark:hover:bg-dark-card transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
