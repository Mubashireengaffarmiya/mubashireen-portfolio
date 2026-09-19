import { GitHubStats, GitHubRepo } from '../types';
import { PROFILE } from '../data/profile';

export const FALLBACK_GITHUB_STATS: GitHubStats = {
  publicRepos: 7,
  totalStars: 0,
  totalForks: 1,
  followers: 0,
  languages: [
    { name: 'Python', percentage: 40, color: '#3572A5' },
    { name: 'C / C++', percentage: 30, color: '#f34b7d' },
    { name: 'JavaScript / TypeScript', percentage: 20, color: '#3178c6' },
    { name: 'Java', percentage: 10, color: '#b07219' }
  ],
  featuredRepos: [
    {
      name: 'SIH_PROJECT',
      description: 'SMART-LM: Smart Legal Metrology Compliance & Inspection System for SIH 2026 Problem Statement SIH26034. Built with FastAPI, React, OpenCV, PaddleOCR, and Tesseract 5.',
      language: 'Python',
      stars: 0,
      forks: 0,
      url: 'https://github.com/Mubashireengaffarmiya/SIH_PROJECT'
    },
    {
      name: 'AI-Complaint-Management-System',
      description: 'AI-powered complaint management system built with React, modern CSS, and Vite tooling for automated issue handling.',
      language: 'React / CSS',
      stars: 0,
      forks: 0,
      url: 'https://github.com/Mubashireengaffarmiya/AI-Complaint-Management-System'
    },
    {
      name: '2D-Graphics-editor',
      description: 'Menu-driven character-based 2D graphics editor in C implementing Bresenham Line Drawing and Midpoint Circle algorithms on an 80x25 canvas.',
      language: 'C',
      stars: 0,
      forks: 0,
      url: 'https://github.com/Mubashireengaffarmiya/2D-Graphics-editor'
    },
    {
      name: '2D-Graphics-Project',
      description: 'Computer graphics project exploring coordinate transformations and basic rasterization in C.',
      language: 'C',
      stars: 0,
      forks: 0,
      url: 'https://github.com/Mubashireengaffarmiya/2D-Graphics-Project'
    },
    {
      name: 'PB_WAD',
      description: 'Web Application Development lab exercises and implementations across Python, Java, C++, and HTML/CSS.',
      language: 'Python / Java',
      stars: 0,
      forks: 0,
      url: 'https://github.com/Mubashireengaffarmiya/PB_WAD'
    },
    {
      name: 'leetcode-solutions',
      description: 'Verified repository of data structures and algorithmic problem solutions in Java.',
      language: 'Java',
      stars: 0,
      forks: 0,
      url: 'https://github.com/Mubashireengaffarmiya/leetcode-solutions'
    }
  ]
};

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const userRes = await fetch(`https://api.github.com/users/${PROFILE.githubUsername}`);
    if (!userRes.ok) throw new Error('Failed to fetch user data');
    const userData = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${PROFILE.githubUsername}/repos?sort=updated&per_page=15`);
    if (!reposRes.ok) throw new Error('Failed to fetch repos');
    const reposData = await reposRes.json();

    if (!Array.isArray(reposData) || reposData.length === 0) {
      return FALLBACK_GITHUB_STATS;
    }

    const repos: GitHubRepo[] = reposData.map((r: any) => ({
      name: r.name,
      description: r.description || 'Public GitHub repository by Mubashireen.',
      language: r.language || 'Code',
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      url: r.html_url,
      updatedAt: r.updated_at
    }));

    return {
      publicRepos: userData.public_repos || repos.length,
      totalStars: repos.reduce((acc, r) => acc + r.stars, 0),
      totalForks: repos.reduce((acc, r) => acc + r.forks, 0),
      followers: userData.followers || 0,
      languages: FALLBACK_GITHUB_STATS.languages,
      featuredRepos: repos
    };
  } catch {
    return FALLBACK_GITHUB_STATS;
  }
}
