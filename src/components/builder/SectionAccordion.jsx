import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function SectionAccordion({ title, icon: Icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-800 rounded-2xl bg-surface overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-900/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-5 w-5 text-primary-light" />}
          <span className="font-bold text-sm tracking-wide text-text">{title}</span>
        </div>
        <div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-900/60 bg-slate-950/10 space-y-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
