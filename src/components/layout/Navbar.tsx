import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, Command, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { PROFILE } from '../../data/profile';
import { NavItem } from '../../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' }
];

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResume,
  onOpenMobileMenu,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(NAV_ITEMS.map(item => item.id), 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/80 dark:bg-dark-bg/85 backdrop-blur-md border-b border-slate-200/80 dark:border-dark-border/80 shadow-lg shadow-black/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={e => scrollToSection(e, 'hero')}
          className="group flex items-center gap-2.5 font-mono text-lg font-bold text-light-text dark:text-dark-text tracking-tight"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-cyan via-accent-indigo to-accent-violet flex items-center justify-center text-white shadow-md shadow-accent-cyan/20 group-hover:scale-105 transition-transform">
            <span className="text-sm font-bold">&lt;M/&gt;</span>
          </div>
          <span className="font-sans font-extrabold tracking-tight text-lg">
            {PROFILE.displayName}
            <span className="text-accent-cyan">.cse</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/70 dark:bg-dark-surface/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-dark-border/60">
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => scrollToSection(e, item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold shadow-sm'
                    : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-cyan to-accent-indigo -z-10" />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            aria-label="Open Command Palette"
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-100/80 dark:bg-dark-surface/80 hover:border-accent-cyan/40 text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-all text-xs font-mono"
            title="Search & Quick Actions (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="p-2 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-100/80 dark:bg-dark-surface/80 hover:border-accent-cyan/40 text-light-text dark:text-dark-text transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Resume CTA (Desktop) */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open mobile navigation menu"
            className="xl:hidden p-2 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-100/80 dark:bg-dark-surface/80 text-light-text dark:text-dark-text"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
