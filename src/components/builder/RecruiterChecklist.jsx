import React from 'react';
import { Check, X } from 'lucide-react';

export function RecruiterChecklist({ checklist = [] }) {
  return (
    <div className="flex flex-col p-6 rounded-2xl border border-slate-800 bg-surface/40 text-left space-y-3 shadow-sm">
      <h3 className="text-xs font-bold text-text uppercase tracking-wider">Recruiter Checklist</h3>
      
      <ul className="space-y-2.5">
        {checklist.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2.5 text-[11px] font-semibold">
            {item.checked ? (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success border border-success/30">
                <Check className="h-2.5 w-2.5 stroke-[3px]" />
              </span>
            ) : (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse">
                <X className="h-2.5 w-2.5 stroke-[3px]" />
              </span>
            )}
            <span className={item.checked ? 'text-slate-200' : 'text-muted'}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
