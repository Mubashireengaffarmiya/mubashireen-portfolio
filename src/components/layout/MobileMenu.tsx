import React, { useEffect } from 'react';
import { X, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { NAV_ITEMS } from './Navbar';
import { PROFILE } from '../../data/profile';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavClick = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-light-surface dark:bg-dark-surface shadow-2xl p-6 flex flex-col justify-between border-l border-light-border dark:border-dark-border z-10 animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-light-border dark:border-dark-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-cyan to-accent-violet flex items-center justify-center text-white text-xs font-mono font-bold">
                &lt;M/&gt;
              </div>
              <span className="font-bold text-light-text dark:text-dark-text">{PROFILE.displayName}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-light-bg dark:hover:bg-dark-card"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="mt-6 flex flex-col space-y-1">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-medium text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-card hover:text-accent-cyan transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-mono text-light-muted dark:text-dark-muted">0{idx + 1}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-light-border dark:border-dark-border space-y-4">
          <button
            onClick={() => {
              onClose();
              onOpenResume();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-accent-cyan text-white shadow-md shadow-accent-cyan/25 hover:bg-accent-cyan/90 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </button>

          <div className="flex items-center justify-center gap-4 text-light-muted dark:text-dark-muted">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl hover:text-light-text dark:hover:text-dark-text hover:bg-light-bg dark:hover:bg-dark-card transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            {PROFILE.linkedin && (
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl hover:text-blue-500 hover:bg-light-bg dark:hover:bg-dark-card transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {PROFILE.email && (
              <a
                href={`mailto:${PROFILE.email}`}
                className="p-2 rounded-xl hover:text-accent-emerald hover:bg-light-bg dark:hover:bg-dark-card transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>

          <div className="text-center text-[11px] text-light-muted dark:text-dark-muted font-mono">
            <span>{PROFILE.statusText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
