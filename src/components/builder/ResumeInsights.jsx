import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function ResumeInsights({ insights = [] }) {
  return (
    <div className="flex flex-col p-5 rounded-xl border border-slate-800 bg-surface/40 text-left space-y-3">
      <h3 className="text-xs font-bold text-text uppercase tracking-wider">Quality Insights</h3>
      
      {insights.length > 0 ? (
        <ul className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[11px] text-muted leading-relaxed font-medium">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center gap-2 text-[11px] text-success font-semibold py-1">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>All checks passed! Your resume is fully optimized.</span>
        </div>
      )}
    </div>
  );
}
