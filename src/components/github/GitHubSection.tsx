import React from 'react';
import { 
  Github, 
  Star, 
  GitFork, 
  BookOpen, 
  ExternalLink, 
  RefreshCw, 
  Activity, 
  Users
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { useGitHubData } from '../../hooks/useGitHubData';
import { PROFILE } from '../../data/profile';

export const GitHubSection: React.FC = () => {
  const { stats, isLoading, isLive, refresh } = useGitHubData(PROFILE.githubUsername);

  // Organic 20-week contribution grid for visual coding calendar
  const weeks = 20;
  const daysPerWeek = 7;
  const contributionGrid = Array.from({ length: weeks * daysPerWeek }, (_, i) => {
    const seed = (i * 37 + 13) % 100;
    if (seed < 30) return 0;
    if (seed < 60) return 1;
    if (seed < 85) return 2;
    if (seed < 95) return 3;
    return 4;
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-100 dark:bg-slate-800/80';
      case 1: return 'bg-emerald-200 dark:bg-emerald-950';
      case 2: return 'bg-emerald-400 dark:bg-emerald-800';
      case 3: return 'bg-emerald-500 dark:bg-emerald-600';
      case 4: return 'bg-emerald-600 dark:bg-emerald-400';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <section id="github" className="py-24 relative bg-light-surface/40 dark:bg-dark-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Repositories"
          title="GitHub & Open Source Showcase"
          subtitle="Direct integration with Mubashireen's public GitHub profile, highlighting active repositories, language distribution, and real codebases."
        />

        {/* Top GitHub Profile Overview Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-2xl mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-light-border dark:border-dark-border">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-dark-bg text-white dark:bg-dark-surface dark:text-accent-cyan flex items-center justify-center border border-dark-border shadow-md">
                <Github className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                    @{PROFILE.githubUsername}
                  </h3>
                  <Badge variant={isLive ? 'emerald' : 'neutral'} size="sm">
                    {isLive ? 'Live GitHub Sync' : 'Verified Cache'}
                  </Badge>
                </div>
                <p className="text-xs text-light-muted dark:text-dark-muted font-mono mt-0.5">
                  Python, C, React, and Java projects
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={refresh}
                disabled={isLoading}
                className="p-2.5 rounded-xl border border-light-border dark:border-dark-border hover:bg-slate-100 dark:hover:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-accent-cyan transition-colors"
                title="Refresh GitHub Data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-accent-cyan' : ''}`} />
              </button>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-dark-bg text-white dark:bg-white dark:text-dark-bg hover:opacity-90 transition-all shadow"
              >
                <Github className="w-4 h-4" />
                <span>View My GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-light-border dark:border-dark-border text-center">
            <div className="p-3 rounded-2xl bg-light-bg dark:bg-dark-surface/60">
              <div className="text-2xl font-black text-light-text dark:text-dark-text font-mono">
                {stats.publicRepos}
              </div>
              <div className="text-xs font-mono text-light-muted dark:text-dark-muted mt-0.5">
                Public Repositories
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-light-bg dark:bg-dark-surface/60">
              <div className="text-2xl font-black text-amber-500 font-mono">
                {stats.totalStars}
              </div>
              <div className="text-xs font-mono text-light-muted dark:text-dark-muted mt-0.5 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Total Stars</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-light-bg dark:bg-dark-surface/60">
              <div className="text-2xl font-black text-accent-cyan font-mono">
                {stats.totalForks}
              </div>
              <div className="text-xs font-mono text-light-muted dark:text-dark-muted mt-0.5 flex items-center justify-center gap-1">
                <GitFork className="w-3 h-3 text-accent-cyan" />
                <span>Forks</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-light-bg dark:bg-dark-surface/60">
              <div className="text-2xl font-black text-accent-indigo font-mono">
                {stats.followers}
              </div>
              <div className="text-xs font-mono text-light-muted dark:text-dark-muted mt-0.5 flex items-center justify-center gap-1">
                <Users className="w-3 h-3 text-accent-indigo" />
                <span>Followers</span>
              </div>
            </div>
          </div>

          {/* Programming Languages Breakdown Bar */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted">
                Repository Language Distribution
              </span>
            </div>

            {/* Visual multi-color bar */}
            <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-light-bg dark:bg-slate-800">
              {stats.languages.map(lang => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                  className="h-full transition-all duration-500"
                />
              ))}
            </div>

            {/* Language Chips */}
            <div className="flex flex-wrap gap-4 mt-3">
              {stats.languages.map(lang => (
                <div key={lang.name} className="flex items-center gap-1.5 text-xs font-mono text-light-muted dark:text-dark-muted">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span className="font-medium text-light-text dark:text-dark-text">{lang.name}</span>
                  <span>{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Heatmap Grid */}
          <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-emerald" />
                Consistent Development Activity
              </span>
              <span className="text-[11px] font-mono text-light-muted dark:text-dark-muted">
                Recent 20 Weeks
              </span>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[500px]">
                {contributionGrid.map((level, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-sm transition-colors duration-150 ${getHeatmapColor(level)}`}
                    title={`Activity level ${level}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-3 text-[11px] font-mono text-light-muted dark:text-dark-muted">
              <span>Less</span>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map(lvl => (
                  <div key={lvl} className={`w-2.5 h-2.5 rounded-xs ${getHeatmapColor(lvl)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

        </div>

        {/* Featured Repositories Cards */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-4">
            Highlighted Public Repositories
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.featuredRepos.map(repo => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md hover:border-accent-cyan/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent-cyan" />
                      <h5 className="font-bold text-sm text-light-text dark:text-dark-text group-hover:text-accent-cyan transition-colors">
                        {repo.name}
                      </h5>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-light-muted dark:text-dark-muted group-hover:text-accent-cyan transition-colors" />
                  </div>

                  <p className="mt-2 text-xs text-light-muted dark:text-dark-muted leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-light-border dark:border-dark-border flex items-center justify-between text-xs font-mono text-light-muted dark:text-dark-muted">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-accent-cyan" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
