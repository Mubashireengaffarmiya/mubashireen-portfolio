import React from 'react';
import { 
  Code2, 
  FileCode2, 
  Coffee, 
  Terminal, 
  Braces, 
  Binary, 
  Globe, 
  Palette, 
  Atom, 
  Sparkles, 
  Server, 
  Database, 
  Layers, 
  GitBranch, 
  Github, 
  Cpu, 
  ScanText, 
  Bot, 
  Network, 
  Zap,
  LineChart,
  BarChart3
} from 'lucide-react';
import { SkillItem } from '../../types';

interface SkillCardProps {
  skill: SkillItem;
}

const iconMap: { [key: string]: React.ReactNode } = {
  Code2: <Code2 className="w-5 h-5" />,
  FileCode2: <FileCode2 className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Braces: <Braces className="w-5 h-5" />,
  Binary: <Binary className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Atom: <Atom className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Github: <Github className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  ScanText: <ScanText className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  LineChart: <LineChart className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div className="p-4 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md hover:border-accent-cyan/50 hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-light-bg dark:bg-dark-surface text-light-text dark:text-dark-text group-hover:text-accent-cyan group-hover:bg-accent-cyan/10 transition-colors">
            {iconMap[skill.icon] || <Code2 className="w-5 h-5" />}
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border text-accent-cyan bg-accent-cyan/10 border-accent-cyan/25">
            {skill.category}
          </span>
        </div>

        <h4 className="font-bold text-sm text-light-text dark:text-dark-text group-hover:text-accent-cyan transition-colors">
          {skill.name}
        </h4>
      </div>

      {skill.highlight && (
        <p className="mt-2 text-xs text-light-muted dark:text-dark-muted font-mono leading-tight">
          {skill.highlight}
        </p>
      )}
    </div>
  );
};
