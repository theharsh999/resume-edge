import React from 'react';
import { Palette, Check } from 'lucide-react';

export function TemplateSwitcher({ activeTemplate, onTemplateChange }) {
  const templates = [
    {
      id: 'modern',
      name: 'Modern Accent',
      description: 'Asymmetric grid, colored badges, clean sans-serif layout.'
    },
    {
      id: 'professional',
      name: 'Executive Classic',
      description: 'Centered margins, horizontal divider bands, elegant serif style.'
    },
    {
      id: 'minimal',
      name: 'Ultra Minimal',
      description: 'Compact sans-serif blocks, optimized whitespace grid.'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-text uppercase tracking-wider">
        <Palette className="h-4 w-4 text-primary" />
        <span>Select Template Style</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => onTemplateChange(tpl.id)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden ${
              activeTemplate === tpl.id
                ? 'border-primary bg-primary/5 shadow-premium-glow'
                : 'border-slate-800 bg-surface hover:border-slate-700'
            }`}
          >
            {activeTemplate === tpl.id && (
              <div className="absolute top-2.5 right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-text shadow-sm">
                <Check className="h-3 w-3 text-white font-bold" />
              </div>
            )}
            <h4 className={`text-xs font-bold transition-colors ${activeTemplate === tpl.id ? 'text-primary-light' : 'text-text'}`}>
              {tpl.name}
            </h4>
            <p className="text-[10px] text-muted leading-relaxed mt-1 font-medium">
              {tpl.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
