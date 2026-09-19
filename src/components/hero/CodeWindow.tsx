import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { PROFILE } from '../../data/profile';

export const CodeWindow: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'status'>('profile');

  const codeSnippets = {
    profile: `// Student Developer Profile
interface StudentDeveloper {
  name: string;
  role: string;
  degree: string;
  university: string;
  graduationYear: number;
  currentStatus: string;
  focus: string[];
}

const mubashireen: StudentDeveloper = {
  name: "${PROFILE.displayName}",
  role: "${PROFILE.role}",
  degree: "${PROFILE.degree}",
  university: "${PROFILE.university}",
  graduationYear: 2029,
  currentStatus: "${PROFILE.semester}",
  focus: ["AI/OCR Pipelines", "Web Development", "Systems & Graphics"]
};`,

    skills: `// Verified Technical Competencies
const verifiedArsenal = {
  languages: ["Python", "C", "C++", "Java", "JavaScript", "TypeScript"],
  web: ["React", "Tailwind CSS", "HTML5", "CSS3"],
  backend: ["FastAPI", "REST APIs"],
  aiAndData: ["PaddleOCR", "Tesseract 5", "Data Analysis", "Data Visualization"],
  tools: ["Git", "GitHub", "VS Code"]
};`,

    status: `// Current Academic & Project Status
{
  "student": "${PROFILE.displayName}",
  "semester": "3rd Semester CSE",
  "university": "REVA University, Bengaluru",
  "featuredProject": "SMART-LM (SIH26034)",
  "verifiedCertificates": 4,
  "status": "${PROFILE.statusText}"
}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg lg:max-w-xl rounded-2xl overflow-hidden border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-dark-surface border-b border-slate-200 dark:border-dark-border">
        {/* macOS style buttons */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <div className="ml-2 flex items-center gap-1.5 text-xs font-mono text-light-muted dark:text-dark-muted">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
            <span>mubashireen.ts</span>
          </div>
        </div>

        {/* Tab triggers */}
        <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-dark-card/60 p-0.5 rounded-lg text-xs font-mono">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              activeTab === 'profile'
                ? 'bg-white dark:bg-dark-surface text-accent-cyan shadow-xs'
                : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
            }`}
          >
            profile.ts
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              activeTab === 'skills'
                ? 'bg-white dark:bg-dark-surface text-accent-cyan shadow-xs'
                : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
            }`}
          >
            stack.ts
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              activeTab === 'status'
                ? 'bg-white dark:bg-dark-surface text-accent-cyan shadow-xs'
                : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
            }`}
          >
            status.json
          </button>
        </div>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md text-light-muted dark:text-dark-muted hover:text-accent-cyan transition-colors"
          title="Copy Code"
          aria-label="Copy code snippet"
        >
          {copied ? <Check className="w-4 h-4 text-accent-emerald" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto bg-slate-50 dark:bg-[#0c121e]">
        <pre className="text-slate-800 dark:text-slate-300">
          <code>
            {codeSnippets[activeTab].split('\n').map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell pr-4 text-slate-400 select-none text-[11px] text-right w-6">
                  {idx + 1}
                </span>
                <span className="table-cell">
                  {line.startsWith('//') ? (
                    <span className="text-slate-400 italic">{line}</span>
                  ) : line.includes('interface') || line.includes('const') ? (
                    <span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">
                        {line.split(' ')[0]}{' '}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">
                        {line.split(' ').slice(1).join(' ')}
                      </span>
                    </span>
                  ) : line.includes(':') && line.includes('"') ? (
                    <span>
                      <span className="text-cyan-600 dark:text-cyan-300">
                        {line.split(':')[0]}:
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-300">
                        {line.split(':').slice(1).join(':')}
                      </span>
                    </span>
                  ) : (
                    <span>{line}</span>
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Terminal status bar */}
      <div className="px-4 py-2 bg-slate-100/90 dark:bg-dark-surface/90 border-t border-slate-200 dark:border-dark-border flex items-center justify-between text-[11px] font-mono text-light-muted dark:text-dark-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span>Types: Strict</span>
        </div>
        <div className="flex items-center gap-3">
          <span>REVA University</span>
          <span className="text-accent-cyan">Batch 2029</span>
        </div>
      </div>
    </div>
  );
};
