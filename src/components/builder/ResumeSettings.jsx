import React from 'react';
import { Settings } from 'lucide-react';
import { SectionAccordion } from './SectionAccordion';

export function ResumeSettings({ settings, onSettingsChange }) {
  const colors = [
    { name: 'Indigo', value: 'indigo', class: 'bg-[#6366F1]' },
    { name: 'Blue', value: 'blue', class: 'bg-[#3B82F6]' },
    { name: 'Emerald', value: 'emerald', class: 'bg-[#10B981]' },
    { name: 'Rose', value: 'rose', class: 'bg-[#F43F5E]' },
    { name: 'Amber', value: 'amber', class: 'bg-[#F59E0B]' },
  ];

  const fonts = ['Inter', 'Poppins', 'Roboto'];
  const densities = [
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'compact', label: 'Compact' },
  ];

  const handleChange = (field, value) => {
    onSettingsChange({
      ...settings,
      [field]: value
    });
  };

  return (
    <SectionAccordion title="Styling & Density Settings" icon={Settings} defaultOpen={false}>
      <div className="space-y-4 text-xs">
        {/* Colors Row */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-muted uppercase tracking-wider">Primary Color Theme</label>
          <div className="flex gap-2.5">
            {colors.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => handleChange('primaryColor', c.value)}
                className={`h-6 w-6 rounded-full border transition-all ${c.class} ${
                  settings.primaryColor === c.value
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-slate-900 border-white scale-110'
                    : 'border-slate-800 hover:scale-105 cursor-pointer'
                }`}
                title={c.name}
                aria-label={`Select ${c.name} primary color`}
              />
            ))}
          </div>
        </div>

        {/* Font Family Row */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-muted uppercase tracking-wider">Font Family</label>
          <div className="grid grid-cols-3 gap-2">
            {fonts.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => handleChange('fontFamily', f)}
                className={`py-1.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                  settings.fontFamily === f
                    ? 'border-primary bg-primary/10 text-primary-light font-bold animate-fade-in'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 text-muted hover:text-text'
                }`}
                style={{ fontFamily: f === 'Inter' ? 'Inter' : f === 'Poppins' ? 'Poppins' : 'Roboto' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Resume Density Row */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-muted uppercase tracking-wider">Spacing Density</label>
          <div className="grid grid-cols-3 gap-2">
            {densities.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => handleChange('density', d.value)}
                className={`py-1.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                  settings.density === d.value
                    ? 'border-primary bg-primary/10 text-primary-light font-bold animate-fade-in'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 text-muted hover:text-text'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionAccordion>
  );
}
