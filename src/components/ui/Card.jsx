import React from 'react';

export function Card({ children, className = '', hoverEffect = true, ...props }) {
  return (
    <div 
      className={`bg-surface rounded-xl border border-slate-800/80 p-6 ${
        hoverEffect ? 'hover:border-slate-700/80 transition-all duration-300 premium-card-glow hover:shadow-premium-glow' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
