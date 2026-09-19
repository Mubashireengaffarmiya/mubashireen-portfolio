import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Github, 
  Cpu, 
  Eye, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ScanText
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/projects';

export const FeaturedSIH: React.FC = () => {
  const sihProject = PROJECTS_DATA.find(p => p.id === 'sih-smart-lm')!;
  const [activeTab, setActiveTab] = useState<'workflow' | 'architecture' | 'rules'>('workflow');

  const workflowSteps = [
    {
      title: '1. Label Capture',
      desc: 'Inspector captures or uploads packaged commodity packaging photo.',
      icon: Eye
    },
    {
      title: '2. OpenCV Enhancement',
      desc: 'Adaptive thresholding, deskewing, and noise filtering for maximum readability.',
      icon: Cpu
    },
    {
      title: '3. Dual-Engine OCR',
      desc: 'PaddleOCR / Tesseract 5 extracts text from curved, glossy, and printed labels.',
      icon: ScanText
    },
    {
      title: '4. Rule Evaluation',
      desc: 'Custom rule engine checks MRP, net qty, dates, manufacturer & consumer care.',
      icon: FileCheck
    },
    {
      title: '5. Decision Support',
      desc: 'Displays compliance status, confidence score, and routes edge cases to review.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-light-card to-light-surface dark:from-dark-card dark:to-dark-surface border border-light-border dark:border-dark-border p-6 sm:p-10 shadow-2xl overflow-hidden mb-16">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-indigo/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
            <ShieldCheck className="w-4 h-4" />
            Featured SIH 2026 Case Study
          </span>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted">
            SIH26034
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={sihProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-dark-surface dark:bg-dark-surface border border-dark-border hover:border-accent-cyan text-white transition-all hover:scale-105"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Project Title & Subtitle */}
      <div className="max-w-3xl mb-8">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-light-text dark:text-dark-text tracking-tight">
          {sihProject.title}
        </h3>
        <p className="text-sm sm:text-base text-accent-cyan font-medium mt-2">
          {sihProject.subtitle}
        </p>
        <p className="text-sm text-light-muted dark:text-dark-muted mt-4 leading-relaxed">
          {sihProject.description}
        </p>
      </div>

      {/* Legal Metrology Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-accent-amber/10 border border-accent-amber/30 flex items-start gap-3 mb-10">
        <AlertTriangle className="w-5 h-5 text-accent-amber shrink-0 mt-0.5" />
        <div className="text-xs text-light-text dark:text-dark-text leading-relaxed">
          <strong className="text-accent-amber font-semibold">Regulatory Notice & Scope: </strong>
          AI/OCR-assisted compliance screening based on configured rules. SMART-LM is designed to support the officer's decision-making process. It does not replace the final legal decision or physical verification by a qualified inspector.
        </div>
      </div>

      {/* Interactive Tabs: Workflow vs Architecture vs Rules */}
      <div className="flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-3 mb-8">
        <button
          onClick={() => setActiveTab('workflow')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'workflow'
              ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
              : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
          }`}
        >
          System Workflow
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'architecture'
              ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
              : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
          }`}
        >
          Technical Architecture
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'rules'
              ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
              : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
          }`}
        >
          Key Declarations Checked
        </button>
      </div>

      {/* Tab 1: Workflow */}
      {activeTab === 'workflow' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-light-text dark:text-dark-text">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-light-muted dark:text-dark-muted mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Architecture */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-cyan mb-2">
              Frontend Client
            </h4>
            <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">
              {sihProject.architecture?.frontend}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-indigo mb-2">
              Backend & API Gateway
            </h4>
            <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">
              {sihProject.architecture?.backend}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-violet mb-2">
              Vision & OCR Pipeline
            </h4>
            <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">
              {sihProject.architecture?.aiEngine}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-emerald mb-2">
              Review Queue & Audit Reports
            </h4>
            <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">
              Automated PDF and DOCX inspection logs with evidence bounding boxes and timestamped records.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Declarations Checked */}
      {activeTab === 'rules' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {[
            'Manufacturer / Packer Details',
            'Maximum Retail Price (MRP)',
            'Net Quantity / Units',
            'Month & Year of Manufacture/Packing',
            'Consumer Care Contact Details',
            'Country of Origin (for imports)'
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
              <span className="text-xs font-medium text-light-text dark:text-dark-text">
                {item}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Narrative Grid: The Problem, The Idea, My Contribution, Current Result */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-light-border dark:border-dark-border">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-2">
            The Problem & The Idea
          </h4>
          <p className="text-xs text-light-text dark:text-dark-text leading-relaxed">
            {sihProject.problemSolved}
          </p>
          <p className="text-xs text-light-muted dark:text-dark-muted mt-2 leading-relaxed">
            {sihProject.idea}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-2">
            My Contribution & Current Result
          </h4>
          <p className="text-xs text-light-text dark:text-dark-text leading-relaxed">
            {sihProject.myContribution}
          </p>
          <p className="text-xs text-accent-cyan mt-2 font-medium leading-relaxed">
            Current Status: {sihProject.currentResult}
          </p>
        </div>
      </div>

      {/* Tech Badges */}
      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-light-border dark:border-dark-border">
        {sihProject.technologies.map((tech, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-lg bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border font-mono text-light-text dark:text-dark-text"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
