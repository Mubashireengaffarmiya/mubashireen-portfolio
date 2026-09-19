import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { MobileMenu } from './components/layout/MobileMenu';
import { BackToTop } from './components/layout/BackToTop';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { Skills } from './components/skills/Skills';
import { Certifications } from './components/certificates/Certifications';
import { CaseStudies } from './components/casestudies/CaseStudies';
import { Projects } from './components/projects/Projects';
import { Timeline } from './components/timeline/Timeline';
import { ImpactStats } from './components/impact/ImpactStats';
import { Achievements } from './components/achievements/Achievements';
import { GitHubSection } from './components/github/GitHubSection';
import { Contact } from './components/contact/Contact';
import { CommandPalette } from './components/ui/CommandPalette';
import { ResumeModal } from './components/about/ResumeModal';
import { MubaVoiceAssistant } from './components/ai/MubaVoiceAssistant';

export const AppContent: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300 relative selection:bg-accent-cyan/20 selection:text-accent-cyan">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Sticky Header Navbar */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Sections in Storytelling Order */}
      <main>
        {/* 1. Home / Hero */}
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />

        {/* 2. Impact & Verified Stats */}
        <ImpactStats />

        {/* 3. About Me */}
        <About onOpenResume={() => setIsResumeModalOpen(true)} />

        {/* 4. Skills / Tech Arsenal */}
        <Skills />

        {/* 5. Verified Certifications */}
        <Certifications />

        {/* 6. Featured Case Studies (Large SIH Case Study + In-depth Analysis) */}
        <CaseStudies />

        {/* 7. All Projects & Codebases */}
        <Projects />

        {/* 8. Technical Timeline */}
        <Timeline />

        {/* 9. Achievements */}
        <Achievements />

        {/* 10. GitHub Showcase */}
        <GitHubSection />

        {/* 11. Contact */}
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Floating Personal Voice AI Assistant (MUBA AI) */}
      <MubaVoiceAssistant />

      {/* Back to top floating button */}
      <BackToTop />

      {/* Command Palette Modal (Ctrl/Cmd + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Resume Document Preview & Print Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
