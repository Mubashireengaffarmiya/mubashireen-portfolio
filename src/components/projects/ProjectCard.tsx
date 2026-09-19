import React from 'react';
import { 
  Github, 
  ExternalLink, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Bot, 
  Code 
} from 'lucide-react';
import { Project } from '../../types';
import { Badge } from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  const getVisualIcon = () => {
    switch (project.category) {
      case 'AI & ML':
        return <Bot className="w-10 h-10 text-accent-cyan" />;
      case 'Graphics':
        return <Layers className="w-10 h-10 text-accent-indigo" />;
      case 'Web':
        return <Cpu className="w-10 h-10 text-accent-emerald" />;
      default:
        return <Code className="w-10 h-10 text-accent-amber" />;
    }
  };

  const getBadgeVariant = (): 'cyan' | 'indigo' | 'emerald' | 'amber' => {
    switch (project.category) {
      case 'AI & ML':
        return 'cyan';
      case 'Graphics':
        return 'indigo';
      case 'Web':
        return 'emerald';
      default:
        return 'amber';
    }
  };

  return (
    <div className="flex flex-col justify-between h-full rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-xl hover:border-accent-cyan/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group">
      
      {/* Top Banner */}
      <div className="relative h-44 p-6 bg-gradient-to-br from-accent-cyan/15 via-accent-indigo/10 to-transparent border-b border-light-border dark:border-dark-border flex flex-col justify-between overflow-hidden">
        {/* Top Badges */}
        <div className="flex items-center justify-between z-10">
          <Badge variant={getBadgeVariant()} size="sm">
            {project.category}
          </Badge>
          {project.isFeatured && (
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
              Featured
            </span>
          )}
        </div>

        {/* Center Graphic & Details Button */}
        <div className="flex items-center justify-between z-10 mt-auto">
          <div className="p-3 rounded-2xl bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md border border-light-border dark:border-dark-border shadow-md group-hover:scale-110 transition-transform">
            {getVisualIcon()}
          </div>
          <button
            onClick={() => onSelectProject(project)}
            className="flex items-center gap-1 text-xs font-mono font-semibold text-light-muted dark:text-dark-muted hover:text-accent-cyan transition-colors bg-light-surface/70 dark:bg-dark-surface/70 px-3 py-1 rounded-xl backdrop-blur-sm border border-light-border dark:border-dark-border"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onSelectProject(project)}
            className="text-xl font-extrabold text-light-text dark:text-dark-text tracking-tight group-hover:text-accent-cyan transition-colors cursor-pointer"
          >
            {project.title}
          </h3>

          <p className="mt-1 text-xs font-mono text-accent-cyan font-medium">
            {project.subtitle}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Problem Solved Snapshot */}
          <div className="mt-4 p-3 rounded-xl bg-light-bg dark:bg-dark-surface/70 border border-light-border dark:border-dark-border text-xs text-light-muted dark:text-dark-muted">
            <span className="font-bold text-light-text dark:text-dark-text block mb-0.5 font-mono text-[11px] text-accent-cyan">
              Problem Solved:
            </span>
            <span className="line-clamp-2">{project.problemSolved}</span>
          </div>

          {/* Highlights */}
          <div className="mt-4 space-y-1.5">
            {project.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Links Footer */}
        <div className="mt-6 pt-5 border-t border-light-border dark:border-dark-border">
          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 5).map(tech => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-light-bg dark:bg-dark-surface text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-light-muted dark:text-dark-muted">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-light-bg dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan transition-colors"
                  title="View Live Application"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={() => onSelectProject(project)}
              className="text-xs font-mono text-accent-cyan hover:underline"
            >
              View Details →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
