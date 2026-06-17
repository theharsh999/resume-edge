import React from 'react';

export function CompletionTracker({ percentage = 0 }) {
  return (
    <div className="flex flex-col p-5 rounded-xl border border-slate-800 bg-surface/40 text-left space-y-3">
      <div className="flex justify-between items-baseline">
        <h3 className="text-xs font-bold text-text uppercase tracking-wider">Completion Tracker</h3>
        <span className="text-xs font-extrabold text-primary-light">{percentage}%</span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
