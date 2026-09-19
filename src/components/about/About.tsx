import React from 'react';
import { 
  GraduationCap, 
  User, 
  MapPin, 
  Calendar, 
  Github, 
  Linkedin, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Building2,
  Code2,
  Cpu
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { PROFILE } from '../../data/profile';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="py-24 relative bg-light-surface/40 dark:bg-dark-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Who I Am"
          title="About Mubashireen"
          subtitle="Computer Science Engineering student at REVA University, Bengaluru, dedicated to building practical software and exploring modern AI and web systems."
        />

        {/* 6 Structured Cards Requested in Section 8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* 1. Profile Card */}
          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md hover:border-accent-cyan/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center mb-4">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted block">
              Identity & Role
            </span>
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mt-1">
              {PROFILE.displayName}
            </h3>
            <p className="text-xs text-accent-cyan font-medium mt-0.5">
              {PROFILE.role}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-light-muted dark:text-dark-muted mt-3">
              <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
              <span>{PROFILE.location}</span>
            </div>
          </div>

          {/* 2. Education Card */}
          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md hover:border-accent-indigo/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-accent-indigo/10 text-accent-indigo flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted block">
              Education
            </span>
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mt-1">
              {PROFILE.degree}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-accent-indigo font-medium mt-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>{PROFILE.institution}</span>
            </div>
          </div>

          {/* 3. Current Status Card */}
          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md hover:border-accent-emerald/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-accent-emerald/10 text-accent-emerald flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted block">
              Current Status
            </span>
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mt-1">
              {PROFILE.semester}
            </h3>
            <p className="text-xs text-accent-emerald font-medium mt-0.5">
              Active Project Builder
            </p>
            <p className="text-xs text-light-muted dark:text-dark-muted mt-2 font-mono">
              {PROFILE.statusText}
            </p>
          </div>

          {/* 4. Graduation Card */}
          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md hover:border-accent-violet/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-accent-violet/10 text-accent-violet flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted block">
              Expected Graduation
            </span>
            <h3 className="text-2xl font-extrabold text-light-text dark:text-dark-text mt-1 font-mono">
              {PROFILE.graduationYear}
            </h3>
            <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
              4-Year B.Tech Computer Science Engineering Program
            </p>
          </div>

          {/* 5. GitHub Card */}
          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md hover:border-accent-cyan/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-dark-border/40 text-light-text dark:text-dark-text flex items-center justify-center mb-4">
              <Github className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted block">
              GitHub Profile
            </span>
            <h3 className="text-base font-bold text-light-text dark:text-dark-text mt-1 font-mono">
              @{PROFILE.githubUsername}
            </h3>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-accent-cyan hover:underline mt-2 font-medium"
            >
              <span>Visit GitHub Profile</span>
            </a>
          </div>

          {/* 6. LinkedIn Card */}
          <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md hover:border-blue-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
              <Linkedin className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted block">
              LinkedIn
            </span>
            <h3 className="text-base font-bold text-light-text dark:text-dark-text mt-1">
              Mubashireen Shaik
            </h3>
            {PROFILE.linkedin ? (
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline mt-2 font-medium"
              >
                <span>Connect on LinkedIn</span>
              </a>
            ) : (
              <span className="text-xs text-light-muted dark:text-dark-muted block mt-2">
                Available for professional networking
              </span>
            )}
          </div>

        </div>

        {/* Narrative & Interests Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Bio Story */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-xl">
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-accent-cyan" />
              <span>Engineering Journey & Vision</span>
            </h3>
            <div className="space-y-4 text-sm text-light-muted dark:text-dark-muted leading-relaxed">
              <p>
                {PROFILE.bioExtended}
              </p>
              <p>
                I prioritize deep conceptual understanding: mastering data structures, learning computer graphics algorithms from the ground up in C, building responsive client-side web applications in React, and architecting asynchronous Python services with FastAPI.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border flex flex-wrap gap-4">
              <Button
                variant="primary"
                onClick={onOpenResume}
                icon={<FileText className="w-4 h-4" />}
              >
                View Academic Resume
              </Button>
            </div>
          </div>

          {/* Interests & Focus Areas */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-xl">
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent-indigo" />
              <span>Core Interests & Focus</span>
            </h3>
            <p className="text-xs text-light-muted dark:text-dark-muted mb-6 leading-relaxed">
              Key areas of active technical exploration and academic coursework:
            </p>

            <div className="space-y-2.5">
              {PROFILE.interests.map((interest, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border text-xs font-medium text-light-text dark:text-dark-text"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
