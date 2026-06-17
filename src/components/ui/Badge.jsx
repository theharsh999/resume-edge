import React from 'react';

export function Badge({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border transition-colors duration-200';
  
  const variants = {
    primary: 'bg-primary/10 text-primary-light border-primary/20',
    secondary: 'bg-secondary/10 text-secondary-light border-secondary/20',
    success: 'bg-success/10 text-success border-success/20',
    muted: 'bg-slate-800 text-muted border-slate-700',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
