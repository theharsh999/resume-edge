import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-text shadow-premium-glow hover:shadow-premium-glow-hover border border-primary-light/25',
    secondary: 'bg-surface hover:bg-slate-800 text-text border border-slate-800 hover:border-slate-700 shadow-sm',
    outline: 'bg-transparent text-text border border-slate-700 hover:bg-slate-800 hover:border-slate-600',
    ghost: 'bg-transparent text-muted hover:text-text hover:bg-slate-800/50',
    success: 'bg-success hover:bg-green-600 text-white shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
