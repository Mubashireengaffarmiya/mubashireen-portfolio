import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-violet text-white hover:opacity-95 shadow-md shadow-accent-cyan/20 hover:shadow-lg hover:shadow-accent-cyan/30 focus:ring-accent-cyan',
    secondary: 'bg-slate-100 dark:bg-dark-card text-light-text dark:text-dark-text border border-slate-200 dark:border-dark-border hover:bg-slate-200 dark:hover:bg-dark-cardHover shadow-sm',
    outline: 'border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 focus:ring-accent-cyan',
    ghost: 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-slate-100 dark:hover:bg-dark-surface',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5 font-semibold',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
