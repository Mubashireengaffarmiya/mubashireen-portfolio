import React from 'react';
import { ArrowRight, Mail, Github, Linkedin, Download, MapPin, Sparkles, GraduationCap } from 'lucide-react';
import { Button } from '../ui/Button';
import { ParticleBackground } from './ParticleBackground';
import { CodeWindow } from './CodeWindow';
import { PROFILE } from '../../data/profile';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background */}
      <ParticleBackground />

      {/* Ambient gradient blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-accent-cyan/15 dark:bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-accent-violet/15 dark:bg-accent-violet/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Info & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
              </span>
              <span>{PROFILE.statusText}</span>
            </div>

            {/* Main Name & Identity */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-light-text dark:text-dark-text leading-[1.15]">
              <span className="bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-violet bg-clip-text text-transparent">
                {PROFILE.name}
              </span>
            </h1>

            {/* Role & University */}
            <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-base sm:text-xl font-semibold text-slate-700 dark:text-slate-200">
              <span>{PROFILE.role}</span>
              <span className="text-accent-cyan">@</span>
              <span className="text-accent-indigo">{PROFILE.university}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20 font-mono">
                Batch {PROFILE.graduationYear}
              </span>
            </div>

            {/* Concise Personal Introduction (Exact master prompt requirement) */}
            <p className="mt-4 text-base sm:text-lg text-light-muted dark:text-dark-muted max-w-2xl leading-relaxed">
              {PROFILE.bioShort}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection('projects')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View Projects
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection('case-studies')}
                icon={<Sparkles className="w-4 h-4 text-accent-cyan" />}
              >
                Explore My Work
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('contact')}
                icon={<Mail className="w-4 h-4 text-accent-cyan" />}
              >
                Contact Me
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onOpenResume}
                icon={<Download className="w-4 h-4 text-accent-indigo" />}
              >
                Resume
              </Button>
            </div>

            {/* Social Proof & Quick Links */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-dark-border/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-light-muted dark:text-dark-muted">
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 p-2 rounded-xl hover:text-light-text dark:hover:text-dark-text hover:bg-slate-100 dark:hover:bg-dark-card border border-transparent hover:border-slate-200 dark:hover:border-dark-border transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                  <span className="font-mono text-xs">{PROFILE.githubUsername}</span>
                </a>

                {PROFILE.linkedin ? (
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 p-2 rounded-xl hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-dark-card border border-transparent hover:border-slate-200 dark:hover:border-dark-border transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <span className="font-mono text-xs">Mubashireen Shaik</span>
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 p-2 text-xs font-mono text-light-muted dark:text-dark-muted">
                    <Linkedin className="w-4 h-4 text-blue-500/70" />
                    <span>Mubashireen Shaik</span>
                  </span>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-light-muted dark:text-dark-muted">
                <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
                <span>{PROFILE.location}</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Interactive Terminal Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <CodeWindow />

            {/* Verified Student Badge */}
            <div className="mt-6 flex items-center gap-3 p-3 rounded-2xl bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md border border-slate-200 dark:border-dark-border shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-indigo flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-light-text dark:text-dark-text">{PROFILE.semester}</div>
                <div className="text-light-muted dark:text-dark-muted font-mono">{PROFILE.institution}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
