import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Toast } from '../components/ui/Toast';
import { FileUp, FileText, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Mini Template Preview Components ──────────────────────────────────────

const MiniSectionHeader = ({ label, color }) => (
  <div className={`text-[3.5px] font-black uppercase tracking-widest border-b pb-0.5 mb-0.5 ${color || 'text-slate-500 border-slate-800'}`}>{label}</div>
);

const MiniLine = ({ w = 'w-full', opacity = '80' }) => (
  <div className={`h-0.5 ${w} bg-slate-700/${opacity} rounded mb-0.5`} />
);

const ModernMini = ({ accentColor }) => (
  <div className="flex h-full w-full bg-slate-950 text-[4.5px] leading-tight select-none rounded-lg overflow-hidden border border-slate-800">
    {/* Sidebar */}
    <div className="w-[30%] bg-slate-900/60 border-r border-slate-850 p-1.5 space-y-1.5 text-left shrink-0">
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest border-b border-slate-800 pb-0.5 mb-0.5 ${accentColor}`}>Contact</div>
        <div className="text-[3.5px] text-slate-500 break-all">alex@morgan.io</div>
        <div className="text-[3.5px] text-slate-500">+1 555 382 9102</div>
        <div className="text-[3.5px] text-slate-500">Seattle, WA</div>
      </div>
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest border-b border-slate-800 pb-0.5 mb-0.5 ${accentColor}`}>Skills</div>
        <div className="flex flex-wrap gap-0.5">
          <span className="px-0.5 py-0.1 rounded bg-slate-850 text-slate-400 text-[3px]">React</span>
          <span className="px-0.5 py-0.1 rounded bg-slate-850 text-slate-400 text-[3px]">Node</span>
          <span className="px-0.5 py-0.1 rounded bg-slate-850 text-slate-400 text-[3px]">TypeScript</span>
        </div>
      </div>
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest border-b border-slate-800 pb-0.5 mb-0.5 ${accentColor}`}>Education</div>
        <div className="text-[3.5px] text-slate-400 font-semibold">Univ. of Washington</div>
        <div className="text-[3px] text-slate-500">B.S. Computer Science</div>
        <div className="text-[3px] text-slate-500">2015 – 2019</div>
      </div>
    </div>
    {/* Body */}
    <div className="flex-grow p-1.5 space-y-1.5 text-left bg-slate-900/20">
      <div className="border-b border-slate-850 pb-1 space-y-0.5">
        <div className="font-extrabold text-[6px] text-white">Alex Morgan</div>
        <div className={`font-bold text-[4.5px] ${accentColor}`}>Frontend Developer</div>
      </div>
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest border-b border-slate-800 pb-0.5 mb-0.5 ${accentColor}`}>Summary</div>
        <p className="text-slate-400 text-[3.5px] leading-tight">Senior developer with 6+ years building React apps and scalable UI architectures.</p>
      </div>
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest border-b border-slate-800 pb-0.5 mb-0.5 ${accentColor}`}>Experience</div>
        <div className="flex justify-between text-slate-300 font-bold text-[3.5px]"><span>Stripe</span><span>2023–Now</span></div>
        <div className={`text-[3px] ${accentColor}`}>Lead UI Architect</div>
        <p className="text-slate-400 text-[3px]">• Built dynamic dashboard widgets and systems.</p>
      </div>
    </div>
  </div>
);

const ProfessionalMini = ({ accentColor }) => (
  <div className="h-full w-full bg-slate-950 p-2 space-y-1.5 text-[4.5px] leading-tight select-none font-serif rounded-lg border border-slate-800 text-center">
    <div className="border-b border-slate-850 pb-1 space-y-0.5">
      <div className="font-bold text-[6.5px] text-white">Alex Morgan</div>
      <div className={`italic text-[4.5px] ${accentColor}`}>Frontend Developer</div>
      <div className="text-slate-500 flex justify-center gap-1 font-sans text-[3.5px]">
        <span>alex@morgan.io</span><span>|</span><span>Seattle, WA</span>
      </div>
    </div>
    <div className="space-y-0.5 text-left">
      <div className="h-0.5 w-full bg-slate-700/60 rounded" />
      <p className="text-slate-400 text-[3.5px]">Senior developer with 6+ years building enterprise React applications.</p>
    </div>
    <div className="space-y-0.5 text-left">
      <MiniSectionHeader label="Experience" color={accentColor} />
      <div className="flex justify-between font-bold text-slate-300 text-[3.5px]"><span>Stripe</span><span>2023–Now</span></div>
      <p className="text-slate-400 text-[3px]">• Engineered billing dashboard interfaces.</p>
    </div>
    <div className="space-y-0.5 text-left">
      <MiniSectionHeader label="Education" color={accentColor} />
      <div className="text-slate-400 text-[3.5px] font-semibold">Univ. of Washington — B.S. CS, 2019</div>
    </div>
    <div className="space-y-0.5 text-left">
      <MiniSectionHeader label="Skills" color={accentColor} />
      <div className="text-slate-400 text-[3.5px]">React, TypeScript, Node.js, GraphQL</div>
    </div>
  </div>
);

const MinimalMini = ({ accentColor }) => (
  <div className="h-full w-full bg-slate-950 p-2 space-y-1.5 text-[4.5px] leading-tight select-none rounded-lg border border-slate-800 text-left">
    <div className="flex justify-between items-start border-b border-slate-850 pb-1">
      <div>
        <div className="font-bold text-[6px] text-white">Alex Morgan</div>
        <div className={`font-semibold text-[4.5px] ${accentColor}`}>Frontend Developer</div>
      </div>
      <div className="text-slate-500 text-right text-[3.5px]">
        <div>alex@morgan.io</div>
        <div>Seattle, WA</div>
      </div>
    </div>
    <div className="space-y-0.5">
      <MiniSectionHeader label="Summary" color={accentColor} />
      <p className="text-slate-400 text-[3.5px]">Senior developer with 6+ years building React apps.</p>
    </div>
    <div className="space-y-0.5">
      <MiniSectionHeader label="Experience" color={accentColor} />
      <div className="flex justify-between font-bold text-slate-300 text-[3.5px]"><span>Stripe</span><span>2023–Now</span></div>
      <p className="text-slate-400 text-[3px]">• Constructed responsive billing panels.</p>
    </div>
    <div className="space-y-0.5">
      <MiniSectionHeader label="Skills" color={accentColor} />
      <div className="text-slate-400 text-[3.5px]">React, TypeScript, Node.js, Tailwind</div>
    </div>
    <div className="space-y-0.5">
      <MiniSectionHeader label="Education" color={accentColor} />
      <div className="text-slate-400 text-[3.5px]">Univ. of Washington — 2019</div>
    </div>
  </div>
);

const CreativeMini = ({ accentColor, borderAccent, bgAccent }) => (
  <div className="flex h-full w-full bg-slate-950 text-[4.5px] leading-tight select-none rounded-lg overflow-hidden border border-slate-800 relative">
    <div className={`absolute top-0 left-0 bottom-0 w-1 ${borderAccent} border-l-2`} />
    {/* Sidebar */}
    <div className="w-[30%] bg-slate-900/40 border-r border-slate-850 p-1.5 space-y-1.5 text-left pl-2 shrink-0">
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest ${accentColor}`}>Details</div>
        <div className="text-[3.5px] text-slate-400">alex@morgan.io</div>
        <div className="text-[3.5px] text-slate-400">Seattle, WA</div>
      </div>
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest ${accentColor}`}>Skills</div>
        <div className="flex flex-wrap gap-0.5">
          <span className={`px-0.5 py-0.1 rounded text-[3px] ${bgAccent} ${accentColor}`}>React</span>
          <span className={`px-0.5 py-0.1 rounded text-[3px] ${bgAccent} ${accentColor}`}>Node</span>
        </div>
      </div>
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest ${accentColor}`}>Education</div>
        <div className="text-[3.5px] text-slate-400 font-semibold">U. of Washington</div>
        <div className="text-[3px] text-slate-500">B.S. CS · 2019</div>
      </div>
    </div>
    {/* Body */}
    <div className="flex-grow p-1.5 space-y-1.5 text-left">
      <div className="border-b border-slate-850 pb-1 space-y-0.5">
        <div className="font-black text-[6px] text-white uppercase">Alex Morgan</div>
        <div className={`font-bold text-[4.5px] ${accentColor} uppercase tracking-wide`}>Frontend Developer</div>
      </div>
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest ${accentColor}`}>Summary</div>
        <p className="text-slate-400 text-[3.5px] leading-tight">Senior developer with 6+ years constructing React applications.</p>
      </div>
      <div className="space-y-0.5">
        <div className={`text-[3.5px] font-black uppercase tracking-widest ${accentColor}`}>Experience</div>
        <div className="flex justify-between font-bold text-slate-300 text-[3.5px]"><span>Stripe</span><span>2023–Now</span></div>
        <p className="text-slate-400 text-[3px]">• Built scalable design systems.</p>
      </div>
    </div>
  </div>
);

const ExecutiveMini = ({ accentColor, borderAccent }) => (
  <div className={`h-full w-full bg-slate-950 p-2 space-y-1.5 text-[4.5px] leading-tight select-none font-serif rounded-lg border border-slate-800 border-t-2 ${borderAccent} text-left`}>
    <div className="flex justify-between items-end border-b border-slate-850 pb-1">
      <div>
        <div className="font-bold text-[6px] text-white">Alex Morgan</div>
        <div className={`font-semibold text-[4px] uppercase tracking-wide ${accentColor}`}>Frontend Developer</div>
      </div>
      <div className="text-slate-500 text-right text-[3.5px] font-sans">
        <div>alex@morgan.io</div>
        <div>Seattle, WA</div>
      </div>
    </div>
    <div className="space-y-0.5">
      <MiniSectionHeader label="Professional Summary" color={accentColor} />
      <p className="text-slate-400 text-[3.5px]">Senior developer with 6+ years building React applications.</p>
    </div>
    <div className="space-y-0.5">
      <MiniSectionHeader label="Experience" color={accentColor} />
      <div className="flex justify-between font-bold text-slate-300 text-[3.5px]"><span>Stripe</span><span>2023–Now</span></div>
      <p className="text-slate-400 text-[3px]">• Constructed secure dashboard layouts.</p>
    </div>
    <div className="space-y-0.5">
      <MiniSectionHeader label="Education" color={accentColor} />
      <div className="text-slate-400 text-[3.5px]">Univ. of Washington — B.S. CS, 2019</div>
    </div>
    <div className="space-y-0.5">
      <MiniSectionHeader label="Core Skills" color={accentColor} />
      <div className="text-slate-400 text-[3.5px]">React · TypeScript · GraphQL · System Design</div>
    </div>
  </div>
);

const CompactMini = ({ accentColor }) => (
  <div className="h-full w-full bg-slate-950 p-1.5 space-y-1 text-[4.5px] leading-tight select-none rounded-lg border border-slate-800 text-left">
    <div className="flex justify-between items-baseline border-b border-slate-850 pb-0.5">
      <div>
        <span className="font-bold text-[6px] text-white">Alex Morgan</span>
        <span className={`ml-1 text-[4px] ${accentColor} font-bold uppercase`}>Frontend Dev</span>
      </div>
      <div className="text-slate-500 text-[3.5px] flex gap-1 font-semibold">
        <span>alex@morgan.io</span><span>•</span><span>Seattle</span>
      </div>
    </div>
    <div>
      <p className="text-slate-400 text-[3.5px]">Senior developer with 6+ years building React apps and scalable architectures.</p>
    </div>
    <div className="space-y-0.3">
      <MiniSectionHeader label="Experience" color={accentColor} />
      <div className="flex justify-between font-bold text-slate-300 text-[3.5px]"><span>Stripe</span><span>2023–Now</span></div>
      <p className="text-slate-400 text-[3px]">• Built responsive billing dashboards.</p>
    </div>
    <div>
      <MiniSectionHeader label="Skills" color={accentColor} />
      <div className="text-slate-400 text-[3.5px]">React · TypeScript · Node.js · GraphQL · Tailwind</div>
    </div>
    <div>
      <MiniSectionHeader label="Education" color={accentColor} />
      <div className="text-slate-400 text-[3.5px]">Univ. of Washington — B.S. CS · 2019</div>
    </div>
  </div>
);

// ─── Constants ──────────────────────────────────────────────────────────────

const LOCAL_STORAGE_KEY_TPL = 'resumeedge_template';
const LOCAL_STORAGE_KEY_TOAST = 'resumeedge_pending_toast';

// ─── Main Component ─────────────────────────────────────────────────────────

export function Templates() {
  const navigate = useNavigate();
  const [activeTemplate, setActiveTemplate] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_TPL) || 'modern';
  });
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

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
    setActiveTemplate(id);
    localStorage.setItem(LOCAL_STORAGE_KEY_TPL, id);
    addToast('Template selected! Opening builder...', 'success');
    localStorage.setItem(LOCAL_STORAGE_KEY_TOAST, JSON.stringify({
      message: 'Template applied successfully!',
      type: 'success'
    }));
    setTimeout(() => navigate('/builder'), 900);
  };

  const handleImportClick = () => {
    addToast('Resume import coming soon!', 'info');
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
              Choose from a curated collection of recruiter-approved, ATS-friendly resume templates. Click any card to apply and open the editor.
            </p>
          </div>

          {/* Grid of Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className={`flex flex-col h-full group p-7 rounded-2xl bg-surface/40 border transition-all duration-300 hover:shadow-premium-glow cursor-pointer relative ${
                  activeTemplate === template.id
                    ? 'border-primary bg-primary/5 shadow-premium-glow ring-1 ring-primary/20'
                    : 'border-slate-800/60 hover:border-slate-700/80'
                }`}
              >
                {/* Active check badge */}
                {activeTemplate === template.id && (
                  <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </div>
                )}

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
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xl font-bold text-text group-hover:text-primary-light transition-colors duration-200">
                      {template.name}
                    </h3>
                    {activeTemplate === template.id && (
                      <Badge
                        variant="success"
                        className="text-[9px] py-0.5 px-2.5 font-extrabold uppercase tracking-wider shrink-0 bg-success/15 border-success/30 text-success flex items-center gap-1.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                        Active
                      </Badge>
                    )}
                  </div>

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
              </div>
            ))}
          </div>

          {/* Resume Import Card */}
          <div className="max-w-3xl mx-auto border border-dashed border-slate-700 rounded-2xl bg-surface/30 p-8 text-center space-y-5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-1">
              <FileUp className="h-6 w-6 text-primary-light" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text">Import Existing Resume</h3>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed font-medium">
                Already have a resume? Upload your current file and rebuild it using ResumeEdge templates and tools.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleImportClick}
                className="flex items-center justify-center gap-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-text border border-slate-700 hover:border-slate-600 px-5 py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
              >
                <FileText className="h-4 w-4 text-primary-light" />
                Upload PDF
              </button>
              <button
                onClick={handleImportClick}
                className="flex items-center justify-center gap-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-text border border-slate-700 hover:border-slate-600 px-5 py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-secondary" />
                Upload DOCX
              </button>
            </div>
            <p className="text-[10px] text-muted font-semibold uppercase tracking-wider">
              🚧 Parser engine coming soon
            </p>
          </div>
        </Section>
      </Container>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </Layout>
  );
}
