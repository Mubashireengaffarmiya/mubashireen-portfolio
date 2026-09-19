import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { PROFILE } from '../../data/profile';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setToastType('error');
      setToastMessage('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);

    // Form submission simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setToastType('success');
      setToastMessage('Thank you! Your message has been prepared. (Portfolio demo submission)');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#06b6d4', '#6366f1', '#10b981', '#8b5cf6'],
        });
      } catch {
        // Fallback silently if canvas-confetti is not loaded
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    }, 800);
  };

  const copyEmail = () => {
    if (!PROFILE.email) {
      setToastType('error');
      setToastMessage('Email is not publicly listed yet. Please use this contact form.');
      return;
    }
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setToastType('success');
    setToastMessage('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Connect"
          subtitle="Interested in discussing technical projects, academic collaboration, or hackathons? Reach out anytime!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          
          {/* Left Column: Contact Details & Availability */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-xl">
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">
                Connect Directly
              </h3>
              <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted mb-6 leading-relaxed">
                Whether you have an inquiry regarding engineering projects, hackathons, or software development, feel free to send a message.
              </p>

              {/* Email Copier / Notification */}
              <div className="p-4 rounded-2xl bg-light-bg dark:bg-dark-surface border border-light-border dark:border-dark-border mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-xl bg-accent-cyan/10 text-accent-cyan shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-light-muted dark:text-dark-muted block">
                      Email Address
                    </span>
                    <span className="text-xs font-mono font-medium text-light-text dark:text-dark-text truncate block">
                      {PROFILE.email || 'Reach out via the form below'}
                    </span>
                  </div>
                </div>

                {PROFILE.email && (
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-xl border border-light-border dark:border-dark-border hover:bg-light-surface dark:hover:bg-dark-card text-light-muted dark:text-dark-muted hover:text-accent-cyan transition-colors shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-accent-emerald" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Location & Timezone info */}
              <div className="space-y-3 text-xs sm:text-sm text-light-muted dark:text-dark-muted">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-light-bg dark:bg-dark-surface shrink-0">
                    <MapPin className="w-4 h-4 text-accent-indigo" />
                  </div>
                  <span>Location: <strong className="text-light-text dark:text-dark-text">{PROFILE.location}</strong></span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-light-bg dark:bg-dark-surface shrink-0">
                    <Clock className="w-4 h-4 text-accent-emerald" />
                  </div>
                  <span>Timezone: <strong className="text-light-text dark:text-dark-text">IST (UTC +5:30)</strong></span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted block mb-3">
                  Verified Social Profiles
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-dark-card text-xs font-semibold text-light-text dark:text-dark-text transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  {PROFILE.linkedin ? (
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-dark-card text-xs font-semibold text-blue-600 dark:text-blue-400 transition-all hover:scale-105"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-surface text-xs font-semibold text-light-muted dark:text-dark-muted">
                      <Linkedin className="w-4 h-4 text-blue-500/70" />
                      <span>Mubashireen Shaik</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-2xl">
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-light-bg dark:bg-dark-surface border ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-light-border dark:border-dark-border focus:border-accent-cyan'
                      } text-light-text dark:text-dark-text placeholder:text-slate-400 focus:outline-none transition-colors`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-1.5">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-light-bg dark:bg-dark-surface border ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-light-border dark:border-dark-border focus:border-accent-cyan'
                      } text-light-text dark:text-dark-text placeholder:text-slate-400 focus:outline-none transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Technical Collaboration"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-light-bg dark:bg-dark-surface border ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-light-border dark:border-dark-border focus:border-accent-cyan'
                    } text-light-text dark:text-dark-text placeholder:text-slate-400 focus:outline-none transition-colors`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder={`Hello ${PROFILE.displayName}, I came across your portfolio and wanted to connect...`}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-light-bg dark:bg-dark-surface border ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-light-border dark:border-dark-border focus:border-accent-cyan'
                    } text-light-text dark:text-dark-text placeholder:text-slate-400 focus:outline-none transition-colors`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    iconPosition="right"
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Preparing...' : 'Send Message'}
                  </Button>
                </div>

              </form>
            </div>
          </div>

        </div>

        {/* Feedback Toast */}
        <Toast
          isOpen={toastMessage !== null}
          message={toastMessage || ''}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      </div>
    </section>
  );
};
