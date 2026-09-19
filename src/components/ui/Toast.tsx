import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  isOpen: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-in">
      <div className="flex items-center justify-between gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md bg-white/90 dark:bg-dark-surface/90 border-slate-200 dark:border-dark-border">
        <div className="flex items-center gap-3">
          {type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-accent-emerald flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          )}
          <p className="text-sm font-medium text-light-text dark:text-dark-text">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-card text-light-muted dark:text-dark-muted transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
