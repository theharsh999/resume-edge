import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, LayoutTemplate } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ModernMini = ({ accentColor }) => (
  <div className="flex h-full w-full bg-slate-950 text-[4.5px] leading-tight select-none rounded-lg overflow-hidden border border-slate-800">
    {/* Sidebar */}
    <div className="w-[32%] bg-slate-900/60 border-r border-slate-850 p-1.5 space-y-2 text-left">
      <div className="space-y-0.5">
        <div className="h-1 w-5 bg-slate-700/80 rounded"></div>
        <div className="text-[3.5px] text-slate-500 break-all">alex@morgan.io</div>
        <div className="text-[3.5px] text-slate-500">Seattle, WA</div>
      </div>
      <div className="space-y-1 pt-1 border-t border-slate-850">
        <div className="h-1 w-5 bg-slate-700/80 rounded"></div>
        <div className="flex flex-wrap gap-0.5">
          <span className="px-0.8 py-0.1 rounded bg-slate-850 text-slate-400">React</span>
          <span className="px-0.8 py-0.1 rounded bg-slate-850 text-slate-400">Node</span>
          <span className="px-0.8 py-0.1 rounded bg-slate-850 text-slate-400">Vite</span>
        </div>
      </div>
    </div>
    {/* Body */}
    <div className="flex-grow p-1.5 space-y-1.5 text-left bg-slate-900/20">
      <div className="border-b border-slate-850 pb-1 space-y-0.5">
        <div className="font-extrabold text-[6.5px] text-text">Alex Morgan</div>
        <div className={`font-bold text-[5px] ${accentColor}`}>Frontend Developer</div>
      </div>
      <div className="space-y-0.5">
        <div className="h-1 w-8 bg-slate-700/60 rounded"></div>
        <p className="text-slate-400 text-[4px]">Senior developer with 6+ years constructing React applications.</p>
      </div>
      <div className="space-y-1">
        <div className="h-1 w-8 bg-slate-700/60 rounded"></div>
        <div className="space-y-0.5">
          <div className="flex justify-between text-slate-300 font-bold"><span>Stripe</span><span>2023 - Pres</span></div>
          <div className="text-slate-400 text-[3.8px]">• Built dynamic dashboard widgets.</div>
        </div>
      </div>
    </div>
  </div>
);

const ProfessionalMini = ({ accentColor }) => (
  <div className="h-full w-full bg-slate-950 p-2 space-y-1.5 text-[4.5px] leading-tight select-none font-serif rounded-lg border border-slate-800 text-center">
    <div className="border-b border-slate-850 pb-1 space-y-0.5">
      <div className="font-bold text-[6.5px] text-text">Alex Morgan</div>
      <div className={`italic text-[5px] ${accentColor}`}>Frontend Developer</div>
      <div className="text-slate-500 flex justify-center gap-1 font-sans text-[3.5px]">
        <span>alex@morgan.io</span><span>|</span><span>Seattle, WA</span>
      </div>
    </div>
    <div className="space-y-0.5 text-left">
      <div className="h-1 w-12 bg-slate-700/60 rounded mx-auto"></div>
      <p className="text-slate-400 text-center">Senior developer with 6+ years constructing React applications.</p>
    </div>
    <div className="space-y-1 text-left">
      <div className="h-1 w-12 bg-slate-700/60 rounded"></div>
      <div className="space-y-0.5">
        <div className="flex justify-between font-bold text-slate-300"><span>Stripe</span><span>2023 - Pres</span></div>
        <p className="text-slate-400 text-[3.8px]">• Engineered billing dashboard interfaces.</p>
      </div>
    </div>
  </div>
);

const MinimalMini = ({ accentColor }) => (
  <div className="h-full w-full bg-slate-950 p-2.5 space-y-1.5 text-[4.5px] leading-tight select-none rounded-lg border border-slate-800 text-left">
    <div className="flex justify-between items-baseline border-b border-slate-850 pb-1">
      <div>
        <div className="font-bold text-[6.5px] text-text">Alex Morgan</div>
        <div className={`font-semibold text-[5px] ${accentColor}`}>Frontend Developer</div>
      </div>
      <div className="text-slate-500 text-right text-[3.5px]">
        <div>alex@morgan.io</div>
        <div>Seattle, WA</div>
      </div>
    </div>
    <div className="space-y-0.5">
      <div className="h-1 w-8 bg-slate-700/60 rounded"></div>
      <p className="text-slate-400">Senior developer with 6+ years constructing React applications.</p>
    </div>
    <div className="space-y-1">
      <div className="h-1 w-8 bg-slate-700/60 rounded"></div>
      <div className="space-y-0.5">
        <div className="flex justify-between font-bold text-slate-300"><span>Stripe</span><span>2023 - Pres</span></div>
        <p className="text-slate-400 text-[3.8px]">• Constructed responsive billing panels.</p>
      </div>
    </div>
  </div>
);

const CreativeMini = ({ accentColor, borderAccent, bgAccent }) => (
  <div className="flex h-full w-full bg-slate-950 text-[4.5px] leading-tight select-none rounded-lg overflow-hidden border border-slate-800 relative">
    <div className={`absolute top-0 left-0 bottom-0 w-0.5 ${borderAccent} border-l`}></div>
    {/* Sidebar */}
    <div className="w-[30%] bg-slate-900/40 border-r border-slate-850 p-1.5 space-y-2 text-left pl-2">
      <div className="space-y-0.5">
        <div className={`text-[5px] font-bold ${accentColor}`}>Details</div>
        <div className="text-[3.5px] text-slate-400">alex@morgan.io</div>
        <div className="text-[3.5px] text-slate-400">Seattle, WA</div>
      </div>
      <div className="space-y-0.5 pt-1">
        <div className={`text-[5px] font-bold ${accentColor}`}>Skills</div>
        <div className="flex flex-wrap gap-0.5">
          <span className={`px-0.8 py-0.1 rounded ${bgAccent} ${accentColor}`}>React</span>
          <span className={`px-0.8 py-0.1 rounded ${bgAccent} ${accentColor}`}>Node</span>
        </div>
      </div>
    </div>
    {/* Body */}
    <div className="flex-grow p-1.5 space-y-1.5 text-left">
      <div className="border-b border-slate-850 pb-1 space-y-0.5">
        <div className="font-black text-[6.5px] text-text uppercase">Alex Morgan</div>
        <div className={`font-bold text-[5px] ${accentColor} uppercase tracking-wide`}>Frontend Developer</div>
      </div>
      <div className="space-y-0.5">
        <div className="h-1 w-8 bg-slate-700/60 rounded"></div>
        <p className="text-slate-400 text-[4px]">Senior developer with 6+ years constructing React applications.</p>
      </div>
      <div className="space-y-1">
        <div className="h-1 w-8 bg-slate-700/60 rounded"></div>
        <div className="space-y-0.5">
          <div className="flex justify-between font-bold text-slate-300"><span>Stripe</span><span>2023 - Pres</span></div>
          <p className="text-slate-400 text-[3.8px]">• Built scalable design systems library.</p>
        </div>
      </div>
    </div>
  </div>
);

const ExecutiveMini = ({ accentColor, borderAccent }) => (
  <div className={`h-full w-full bg-slate-950 p-2 space-y-1.5 text-[4.5px] leading-tight select-none font-serif rounded-lg border border-slate-800 border-t-2 ${borderAccent} text-left`}>
    <div className="flex justify-between items-end border-b border-slate-850 pb-1">
      <div>
        <div className="font-bold text-[6.5px] text-text">Alex Morgan</div>
        <div className={`font-semibold text-[5px] uppercase tracking-wide ${accentColor}`}>Frontend Developer</div>
      </div>
      <div className="text-slate-500 text-right text-[3.5px] font-sans">
        <div>Email: alex@morgan.io</div>
        <div>Loc: Seattle, WA</div>
      </div>
    </div>
    <div className="space-y-0.5">
      <div className="h-1 w-8 bg-slate-700/60 rounded"></div>
      <p className="text-slate-400">Senior developer with 6+ years constructing React applications.</p>
    </div>
    <div className="space-y-1">
      <div className="h-1 w-8 bg-slate-700/60 rounded"></div>
      <div className="space-y-0.5">
        <div className="flex justify-between font-bold text-slate-300"><span>Stripe</span><span>2023 - Pres</span></div>
        <p className="text-slate-400 text-[3.8px]">• Constructed secure dashboard layouts.</p>
      </div>
    </div>
  </div>
);

const CompactMini = ({ accentColor }) => (
  <div className="h-full w-full bg-slate-950 p-1.5 space-y-1 text-[4.5px] leading-tight select-none rounded-lg border border-slate-800 text-left">
    <div className="flex justify-between items-baseline border-b border-slate-850 pb-0.5">
      <div>
        <span className="font-bold text-[6.5px] text-text">Alex Morgan</span>
        <span className={`ml-1 text-[4.5px] ${accentColor} font-bold uppercase`}>Frontend Developer</span>
      </div>
      <div className="text-slate-500 text-[3.5px] flex gap-1 font-semibold">
        <span>alex@morgan.io</span><span>•</span><span>Seattle, WA</span>
      </div>
    </div>
    <div className="space-y-0.2">
      <p className="text-slate-400 text-[4px]">Senior developer with 6+ years constructing React applications.</p>
    </div>
    <div className="space-y-0.8">
      <div className="space-y-0.2">
        <div className="flex justify-between font-bold text-slate-300"><span>Stripe</span><span>2023 - Pres</span></div>
        <p className="text-slate-400 text-[3.8px]">• Constructed responsive billing panels.</p>
      </div>
    </div>
  </div>
);

const LOCAL_STORAGE_KEY_TPL = 'resumeedge_template';
const LOCAL_STORAGE_KEY_TOAST = 'resumeedge_pending_toast';

export function Templates() {
  const navigate = useNavigate();

  const templates = [
    {
      id: 'modern',
      name: 'Modern Accent',
      description: 'Asymmetric grid, colored badges, clean sans-serif layout. Perfect for tech and product roles.',
      tags: ['Popular', 'ATS Friendly'],
      color: 'from-indigo-500/15 to-violet-500/5'
    },
    {
      id: 'professional',
      name: 'Executive Classic',
      description: 'Traditional layout, elegant serif typography. Best for finance, consulting, and management.',
      tags: ['ATS Friendly', 'Corporate'],
      color: 'from-emerald-500/15 to-teal-500/5'
    },
    {
      id: 'minimal',
      name: 'Ultra Minimal',
      description: 'Compact sans-serif blocks, optimized whitespace. Cleanest format for high-density experiences.',
      tags: ['Minimalist', 'ATS Friendly'],
      color: 'from-blue-500/15 to-indigo-500/5'
    },
    {
      id: 'creative',
      name: 'Creative Pro',
      description: 'Side highlights, left border accents, round tags. Ideal for designer, startup, and media roles.',
      tags: ['Creative', 'Startup'],
      color: 'from-purple-500/15 to-pink-500/5'
    },
    {
      id: 'executive',
      name: 'Executive Premium',
      description: 'Deep margins, corporate structures, robust spacing. Tailored for leadership and director levels.',
      tags: ['Executive', 'ATS Friendly'],
      color: 'from-amber-500/15 to-orange-500/5'
    },
    {
      id: 'compact',
      name: 'Compact Fast',
      description: 'High-density horizontal alignment. Perfect for fitting extensive histories into a single page.',
      tags: ['Dense', 'ATS Friendly'],
      color: 'from-rose-500/15 to-pink-500/5'
    }
  ];

  const handleSelectTemplate = (id) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TPL, id);
    localStorage.setItem(LOCAL_STORAGE_KEY_TOAST, JSON.stringify({
      message: 'Template applied successfully!',
      type: 'success'
    }));
    navigate('/builder');
  };

  return (
    <Layout>
      <Container>
        <Section className="py-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="secondary">Premium Designs</Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text">
              Professional Resume Templates
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Choose from a curated collection of recruiter-approved, ATS-friendly resume templates. Customize them instantly in the editor.
            </p>
          </div>

          {/* Grid of Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className="flex flex-col h-full group p-7 rounded-2xl bg-surface/40 border-slate-800/60 hover:border-slate-700/80 hover:shadow-premium-glow hover-elevation" 
                hoverEffect={false}
              >
                {/* 1. Preview */}
                <div className={`aspect-[3/4] w-full rounded-xl bg-gradient-to-br ${template.color} border border-slate-800/80 mb-6 flex flex-col p-1 overflow-hidden relative transition-all duration-300 group-hover:scale-[1.02]`}>
                  {template.id === 'modern' && <ModernMini accentColor="text-indigo-400" />}
                  {template.id === 'professional' && <ProfessionalMini accentColor="text-emerald-400" />}
                  {template.id === 'minimal' && <MinimalMini accentColor="text-blue-400" />}
                  {template.id === 'creative' && <CreativeMini accentColor="text-purple-400" borderAccent="border-purple-500" bgAccent="bg-purple-500/10" />}
                  {template.id === 'executive' && <ExecutiveMini accentColor="text-amber-400" borderAccent="border-amber-500" />}
                  {template.id === 'compact' && <CompactMini accentColor="text-rose-400" />}
                </div>

                {/* Card Details */}
                <div className="flex-grow flex flex-col text-left space-y-3">
                  {/* 2. Template Name */}
                  <h3 className="text-xl font-bold text-text group-hover:text-primary-light transition-colors duration-200">
                    {template.name}
                  </h3>
                  
                  {/* 3. Short Description */}
                  <p className="text-xs text-muted leading-relaxed flex-grow font-semibold">
                    {template.description}
                  </p>

                  {/* 4. Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900/60">
                    {template.tags.map((tag, idx) => {
                      const isPopular = tag.toLowerCase().includes('popular');
                      const isAts = tag.toLowerCase().includes('ats');
                      return (
                        <Badge 
                          key={idx} 
                          variant={isPopular ? 'primary' : isAts ? 'success' : 'muted'} 
                          className={`text-[9px] py-0.5 px-2.5 font-extrabold uppercase tracking-wider ${
                            isPopular 
                              ? 'bg-primary/10 border-primary-light/20 text-primary-light' 
                              : isAts 
                              ? 'bg-success/15 border-success/30 text-success' 
                              : 'bg-slate-900/60 border-slate-800 text-slate-300'
                          }`}
                        >
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-center">
                  <span className="text-[10px] text-muted font-extrabold uppercase tracking-wider">100% Free Access</span>
                  <button 
                    onClick={() => handleSelectTemplate(template.id)}
                    className="text-xs font-bold text-primary hover:text-primary-light flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
                  >
                    Build Now <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Settings teaser card */}
          <Card className="max-w-3xl mx-auto border-dashed border-slate-800 text-center py-8">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/15 text-secondary-light mb-4">
              <LayoutTemplate className="h-5 w-5 text-secondary" />
            </div>
            <h3 className="font-bold text-text mb-1">Custom Styling & Section Ordering</h3>
            <p className="text-sm text-muted max-w-xl mx-auto leading-relaxed font-medium">
              You can customize colors, toggle density gaps, adjust font faces, and rearrange sections inside our interactive workspace editor.
            </p>
          </Card>
        </Section>
      </Container>
    </Layout>
  );
}
