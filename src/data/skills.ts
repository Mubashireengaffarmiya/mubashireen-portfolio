import { SkillItem, SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  'Programming',
  'Web',
  'Backend',
  'Database',
  'Tools',
  'AI & Data'
];

export const SKILLS_DATA: SkillItem[] = [
  // Programming Languages
  { name: 'C', category: 'Programming', proficiency: 'Proficient', icon: 'Code2', highlight: '2D Graphics Editor, Bresenham Algorithm, Pointers' },
  { name: 'C++', category: 'Programming', proficiency: 'Proficient', icon: 'FileCode2', highlight: 'OOP, STL, Data Structures' },
  { name: 'Java', category: 'Programming', proficiency: 'Proficient', icon: 'Coffee', highlight: 'OOP, Algorithms, LeetCode Solutions' },
  { name: 'Python', category: 'Programming', proficiency: 'Advanced', icon: 'Terminal', highlight: 'FastAPI, OCR Pipeline, Data Analysis, Scripting' },
  { name: 'JavaScript', category: 'Programming', proficiency: 'Advanced', icon: 'Braces', highlight: 'ES6+, DOM Manipulation, Modern Tooling' },
  { name: 'TypeScript', category: 'Programming', proficiency: 'Proficient', icon: 'Binary', highlight: 'Type Safety, React Components, Interfaces' },

  // Web Development
  { name: 'HTML5', category: 'Web', proficiency: 'Advanced', icon: 'Globe', highlight: 'Semantic Layouts, Accessibility, Modern Standards' },
  { name: 'CSS3', category: 'Web', proficiency: 'Advanced', icon: 'Palette', highlight: 'Flexbox, Grid, Custom Keyframes, Transitions' },
  { name: 'React', category: 'Web', proficiency: 'Advanced', icon: 'Atom', highlight: 'Hooks, State Management, Component Architecture' },
  { name: 'Tailwind CSS', category: 'Web', proficiency: 'Advanced', icon: 'Sparkles', highlight: 'Responsive Design, Modern Glassmorphism, Dark Mode' },

  // Backend
  { name: 'FastAPI', category: 'Backend', proficiency: 'Proficient', icon: 'Zap', highlight: 'SIH Backend, Pydantic Models, Async Handlers' },
  { name: 'REST APIs', category: 'Backend', proficiency: 'Proficient', icon: 'Network', highlight: 'Endpoint Design, Request Validation, JSON Routing' },

  // Database
  { name: 'MySQL', category: 'Database', proficiency: 'Proficient', icon: 'Database', highlight: 'Relational Schemas, Queries, Normalization' },

  // Tools
  { name: 'Git', category: 'Tools', proficiency: 'Advanced', icon: 'GitBranch', highlight: 'Branching, Merges, Commit Discipline' },
  { name: 'GitHub', category: 'Tools', proficiency: 'Advanced', icon: 'Github', highlight: 'Repositories, Open Source, Collaboration' },
  { name: 'VS Code', category: 'Tools', proficiency: 'Advanced', icon: 'Cpu', highlight: 'Primary IDE, Extensions, Integrated Terminal' },

  // AI & Data
  { name: 'OCR (Tesseract & PaddleOCR)', category: 'AI & Data', proficiency: 'Proficient', icon: 'ScanText', highlight: 'Packaging Label Text Extraction, Image Preprocessing' },
  { name: 'Generative AI', category: 'AI & Data', proficiency: 'Proficient', icon: 'Bot', highlight: 'Prompt Engineering, LLM Integration, Assistant Architecture' },
  { name: 'Data Analysis', category: 'AI & Data', proficiency: 'Proficient', icon: 'LineChart', highlight: 'IBM Certified, Pandas, NumPy, Statistical Evaluation' },
  { name: 'Data Visualization', category: 'AI & Data', proficiency: 'Proficient', icon: 'BarChart3', highlight: 'IBM Certified, Matplotlib, Seaborn, Folium' }
];
