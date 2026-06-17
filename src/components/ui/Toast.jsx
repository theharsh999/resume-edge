import React, { useEffect } from 'react';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export function Toast({ toasts = [], onDismiss }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: <CheckCircle className="h-4 w-4 text-success shrink-0" />,
    info: <Info className="h-4 w-4 text-primary-light shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />,
  };

  return (
    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-md shadow-premium pointer-events-auto animate-fade-in">
      <div className="flex items-center gap-2.5 text-xs font-semibold text-text">
        {icons[toast.type] || icons.info}
        <span>{toast.message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="text-muted hover:text-text transition-colors p-0.5 rounded-md hover:bg-slate-800 cursor-pointer"
        aria-label="Dismiss toast"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
