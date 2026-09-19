import { useState, useEffect } from 'react';
import { GitHubStats } from '../types';
import { FALLBACK_GITHUB_STATS } from '../services/github';

interface UseGitHubDataResult {
  stats: GitHubStats;
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
  refresh: () => void;
}

export const useGitHubData = (username: string): UseGitHubDataResult => {
  const [stats, setStats] = useState<GitHubStats>(FALLBACK_GITHUB_STATS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHub = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });

      if (!userRes.ok) {
        throw new Error(`GitHub API returned status ${userRes.status}`);
      }

      const userData = await userRes.json();

      // Fetch user repos
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
        {
          headers: { Accept: 'application/vnd.github.v3+json' },
        }
      );

      let reposData: any[] = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      let totalStars = 0;
      let totalForks = 0;
      const languageMap: { [key: string]: number } = {};

      const featuredRepos = reposData
        .map((r: any) => {
          totalStars += r.stargazers_count || 0;
          totalForks += r.forks_count || 0;

          if (r.language) {
            languageMap[r.language] = (languageMap[r.language] || 0) + 1;
          }

          return {
            name: r.name,
            description: r.description || 'Public GitHub repository by Mubashireen.',
            language: r.language || 'Code',
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            url: r.html_url,
          };
        });

      // Calculate language percentage
      const totalLangEntries = Object.values(languageMap).reduce((a, b) => a + b, 0);
      const colorPalette = ['#3572A5', '#f34b7d', '#3178c6', '#b07219', '#10b981', '#8b5cf6'];

      const languages = Object.entries(languageMap)
        .map(([name, count], idx) => ({
          name,
          percentage: totalLangEntries > 0 ? Math.round((count / totalLangEntries) * 100) : 0,
          color: colorPalette[idx % colorPalette.length],
        }))
        .sort((a, b) => b.percentage - a.percentage);

      setStats({
        publicRepos: userData.public_repos || FALLBACK_GITHUB_STATS.publicRepos,
        totalStars: totalStars,
        totalForks: totalForks,
        followers: userData.followers || 0,
        languages: languages.length > 0 ? languages : FALLBACK_GITHUB_STATS.languages,
        featuredRepos: featuredRepos.length > 0 ? featuredRepos : FALLBACK_GITHUB_STATS.featuredRepos,
      });

      setIsLive(true);
    } catch (err: any) {
      // Graceful fallback to verified stats
      setStats(FALLBACK_GITHUB_STATS);
      setIsLive(false);
      setError(err?.message || 'Using verified local repository data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHub();
  }, [username]);

  return {
    stats,
    isLoading,
    isLive,
    error,
    refresh: fetchGitHub,
  };
};
