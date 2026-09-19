import React from 'react';
import { Github, Linkedin, Mail, GraduationCap } from 'lucide-react';
import { PROFILE } from '../../data/profile';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-light-border dark:border-dark-border bg-light-surface/60 dark:bg-dark-surface/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-accent-cyan to-accent-violet flex items-center justify-center text-white text-xs font-mono font-bold">
                &lt;M/&gt;
              </div>
              <span className="font-extrabold text-base tracking-tight text-light-text dark:text-dark-text">
                {PROFILE.name}
              </span>
            </div>
            
            <p className="mt-2 text-xs text-light-muted dark:text-dark-muted font-medium flex items-center justify-center md:justify-start gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-accent-cyan" />
              <span>{PROFILE.role} @ {PROFILE.university} • Graduating {PROFILE.graduationYear}</span>
            </p>
            <p className="text-[11px] text-light-muted/80 dark:text-dark-muted/80 mt-1">
              {PROFILE.institution}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:border-accent-cyan/40 transition-all hover:scale-105"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {PROFILE.linkedin && (
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted hover:text-blue-500 hover:border-blue-500/40 transition-all hover:scale-105"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {PROFILE.email && (
              <a
                href={`mailto:${PROFILE.email}`}
                className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted hover:text-accent-emerald hover:border-accent-emerald/40 transition-all hover:scale-105"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-light-border/60 dark:border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-muted dark:text-dark-muted">
          <p>© 2026 {PROFILE.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-mono text-[11px]">
            {PROFILE.statusText}
          </p>
        </div>
      </div>
    </footer>
  );
};
