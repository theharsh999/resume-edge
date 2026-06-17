import React, { useState } from 'react';
import { Palette, Check, Loader2 } from 'lucide-react';
import { SectionAccordion } from './SectionAccordion';

export function TemplateSwitcher({ activeTemplate, onTemplateChange }) {
  const [loadingTemplate, setLoadingTemplate] = useState(null);

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
    },
    {
      id: 'creative',
      name: 'Creative Pro',
      description: 'Side highlights, left border accents, round tags.'
    },
    {
      id: 'executive',
      name: 'Executive Premium',
      description: 'Deep margins, corporate structures, robust spacing.'
    },
    {
      id: 'compact',
      name: 'Compact Fast',
      description: 'High-density horizontal alignment, space saver.'
    }
  ];

  const handleSelect = (tplId) => {
    if (tplId === activeTemplate) return;
    setLoadingTemplate(tplId);
    onTemplateChange(tplId);
    setTimeout(() => {
      setLoadingTemplate(null);
    }, 400);
  };

  return (
    <SectionAccordion title="Select Template Style" icon={Palette} defaultOpen={false}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => handleSelect(tpl.id)}
            className={`w-full text-left p-3 rounded-xl border transition-all duration-300 relative overflow-hidden ${
              activeTemplate === tpl.id
                ? 'border-primary bg-primary/5 shadow-premium-glow'
                : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
            }`}
          >
            {loadingTemplate === tpl.id ? (
              <div className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center text-primary">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              </div>
            ) : activeTemplate === tpl.id && (
              <div className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-text shadow-sm">
                <Check className="h-2.5 w-2.5 text-white font-bold" />
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
    </SectionAccordion>
  );
}

