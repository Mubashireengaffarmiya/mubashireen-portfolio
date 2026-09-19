import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Home, 
  User, 
  Code2, 
  FolderGit2, 
  GraduationCap, 
  Award, 
  Activity, 
  Mail, 
  Github, 
  Linkedin, 
  FileText, 
  Sun, 
  Moon, 
  X,
  CornerDownLeft,
  Sparkles,
  Bot
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { PROFILE } from '../../data/profile';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenAIAssistant?: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Social';
  icon: React.ReactNode;
  perform: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenAIAssistant,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  const actions: PaletteAction[] = [
    // Navigation
    { id: 'nav-hero', title: 'Go to Home', category: 'Navigation', icon: <Home className="w-4 h-4" />, perform: () => scrollToSection('hero') },
    { id: 'nav-about', title: 'Go to About Me', category: 'Navigation', icon: <User className="w-4 h-4" />, perform: () => scrollToSection('about') },
    { id: 'nav-skills', title: 'Go to Skills & Tech Arsenal', category: 'Navigation', icon: <Code2 className="w-4 h-4" />, perform: () => scrollToSection('skills') },
    { id: 'nav-certifications', title: 'Go to Verified Certifications', category: 'Navigation', icon: <Award className="w-4 h-4" />, perform: () => scrollToSection('certifications') },
    { id: 'nav-case-studies', title: 'Go to Featured Case Studies (SIH26034)', category: 'Navigation', icon: <Sparkles className="w-4 h-4 text-accent-cyan" />, perform: () => scrollToSection('case-studies') },
    { id: 'nav-projects', title: 'Go to Projects & Codebases', category: 'Navigation', icon: <FolderGit2 className="w-4 h-4" />, perform: () => scrollToSection('projects') },
    { id: 'nav-timeline', title: 'Go to Technical Timeline', category: 'Navigation', icon: <GraduationCap className="w-4 h-4" />, perform: () => scrollToSection('timeline') },
    { id: 'nav-github', title: 'Go to GitHub Showcase', category: 'Navigation', icon: <Activity className="w-4 h-4" />, perform: () => scrollToSection('github') },
    { id: 'nav-contact', title: 'Go to Contact', category: 'Navigation', icon: <Mail className="w-4 h-4" />, perform: () => scrollToSection('contact') },

    // Actions
    { id: 'act-ai', title: 'Ask Mubi AI (Portfolio Assistant)', category: 'Actions', icon: <Bot className="w-4 h-4 text-accent-cyan" />, perform: () => { onClose(); if (onOpenAIAssistant) onOpenAIAssistant(); } },
    { id: 'act-resume', title: 'View Academic Resume', category: 'Actions', icon: <FileText className="w-4 h-4 text-accent-cyan" />, perform: () => { onClose(); onOpenResume(); } },
    { id: 'act-theme', title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, category: 'Actions', icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />, perform: () => { toggleTheme(); onClose(); } },

    // Social
    { id: 'soc-github', title: `Open GitHub (@${PROFILE.githubUsername})`, category: 'Social', icon: <Github className="w-4 h-4" />, perform: () => { window.open(PROFILE.github, '_blank'); onClose(); } },
  ];

  if (PROFILE.linkedin) {
    actions.push({
      id: 'soc-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'Social',
      icon: <Linkedin className="w-4 h-4 text-blue-500" />,
      perform: () => { window.open(PROFILE.linkedin, '_blank'); onClose(); }
    });
  }

  const filtered = actions.filter(action =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : {};
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].perform();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette dialog */}
      <div className="relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-light-border dark:border-dark-border">
          <Search className="w-5 h-5 text-light-muted dark:text-dark-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search section..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-light-text dark:text-dark-text placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none text-base font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono font-semibold text-light-muted dark:text-dark-muted bg-light-bg dark:bg-dark-card rounded border border-light-border dark:border-dark-border">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="sm:hidden p-1 text-light-muted hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-light-border dark:divide-slate-800/40">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-light-muted dark:text-dark-muted">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.perform()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-accent-cyan/10 text-accent-cyan dark:bg-accent-cyan/15 dark:text-accent-cyan font-medium'
                      : 'text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isSelected ? 'text-accent-cyan' : 'text-light-muted dark:text-dark-muted'}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded text-light-muted dark:text-dark-muted font-mono text-[10px] uppercase">
                      {item.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-accent-cyan" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="hidden sm:flex items-center justify-between px-4 py-2 bg-light-bg dark:bg-dark-card/50 border-t border-light-border dark:border-dark-border text-[11px] text-light-muted dark:text-dark-muted font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>esc Close</span>
          </div>
          <span className="text-accent-cyan">Quick Palette</span>
        </div>
      </div>
    </div>
  );
};
