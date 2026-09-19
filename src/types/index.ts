export type ProjectCategory = 'All' | 'AI & ML' | 'Web' | 'Graphics' | 'Academic' | 'Full Stack' | 'Data';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problemSolved: string;
  category: ProjectCategory;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  architecture?: {
    frontend?: string;
    backend?: string;
    aiEngine?: string;
    database?: string;
    deployment?: string;
  };
  metrics?: string[];
  isFeatured?: boolean;
  // Case study specific fields
  idea?: string;
  approach?: string;
  solution?: string;
  myContribution?: string;
  currentResult?: string;
  screenshots?: string[];
  challenges?: string[];
}

export type CertificateCategory = 'ALL' | 'IBM' | 'PYTHON' | 'DATA SCIENCE' | 'PROGRAMS';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  courseCode?: string;
  category: CertificateCategory[];
  credentialUrl?: string;
  file?: string;
  description: string;
  duration?: string;
  recipientName: string;
  institution?: string;
  verified: boolean;
  skillsLearned: string[];
}

export type SkillCategory = 'Programming' | 'Web' | 'Backend' | 'Database' | 'Tools' | 'AI & Data';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  proficiency?: 'Advanced' | 'Proficient' | 'Familiar';
  icon: string;
  highlight?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  dateText: string;
  title: string;
  subtitle: string;
  institution?: string;
  description: string;
  type: 'education' | 'certificate' | 'project' | 'hackathon';
  tags: string[];
  highlight?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: 'Hackathon' | 'Certification' | 'Academic' | 'Project';
  description: string;
  iconName: string;
  badge: string;
  credentialUrl?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  updatedAt?: string;
}

export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  languages: { name: string; percentage: number; color: string }[];
  featuredRepos: GitHubRepo[];
}

export interface NavItem {
  id: string;
  label: string;
}

export type VisualCardType = 'projects' | 'certificates' | 'sih' | 'skills' | 'contact' | 'github' | 'tour' | 'none';

export interface AIResponse {
  spokenText: string;
  displayText?: string;
  visualCardType?: VisualCardType;
  visualCardData?: any;
  actions?: {
    label: string;
    target: string;
    type: 'scroll' | 'link' | 'command';
  }[];
  voiceCommand?: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: {
    label: string;
    target: string;
    type: 'scroll' | 'link';
  }[];
}
