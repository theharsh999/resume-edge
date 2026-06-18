import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import { Toast } from '../components/ui/Toast';
import { useNavigate } from 'react-router-dom';
import { ResumePreview } from '../components/builder/ResumePreview';
import { demoResumeData, defaultOrder } from '../utils/constants';

const LOCAL_STORAGE_KEY_TPL = 'resumeedge_template';
const LOCAL_STORAGE_KEY_TOAST = 'resumeedge_pending_toast';

export function Templates() {
  const navigate = useNavigate();
  const [activeTemplate, setActiveTemplate] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_TPL) || 'modern';
  });
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    setToasts((prev) => [...prev, { id: prev.length ? Math.max(...prev.map(t => t.id)) + 1 : 1, message, type }]);
  };
  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const templates = [
    {
      id: 'modern',
      name: 'Modern Accent',
      description: 'Asymmetric grid, colored badges, clean sans-serif layout. Perfect for tech and product roles.',
      tags: ['Popular', 'ATS Friendly'],
    },
    {
      id: 'professional',
      name: 'Executive Classic',
      description: 'Traditional layout, elegant serif typography. Best for finance, consulting, and management.',
      tags: ['ATS Friendly', 'Corporate'],
    },
    {
      id: 'minimal',
      name: 'Ultra Minimal',
      description: 'Compact sans-serif blocks, optimized whitespace. Cleanest format for high-density experiences.',
      tags: ['Minimalist', 'ATS Friendly'],
    },
    {
      id: 'creative',
      name: 'Creative Pro',
      description: 'Side highlights, left border accents, round tags. Ideal for designer, startup, and media roles.',
      tags: ['Creative', 'Startup'],
    },
    {
      id: 'executive',
      name: 'Executive Premium',
      description: 'Deep margins, corporate structures, robust spacing. Tailored for leadership and director levels.',
      tags: ['Executive', 'ATS Friendly'],
    },
    {
      id: 'compact',
      name: 'Compact Fast',
      description: 'High-density horizontal alignment. Perfect for fitting extensive histories into a single page.',
      tags: ['Dense', 'ATS Friendly'],
    }
  ];

  const handleSelectTemplate = (id) => {
    setActiveTemplate(id);
    localStorage.setItem(LOCAL_STORAGE_KEY_TPL, id);
    addToast(`${templates.find(t => t.id === id).name} applied! Opening builder...`, 'success');
    localStorage.setItem(LOCAL_STORAGE_KEY_TOAST, JSON.stringify({
      message: 'Template applied successfully!',
      type: 'success'
    }));
    setTimeout(() => navigate('/builder'), 800);
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
            <p className="text-muted text-base md:text-lg leading-relaxed font-semibold">
              Choose from a curated collection of recruiter-approved, ATS-friendly resume templates. Click any card to apply and open the editor.
            </p>
          </div>

          {/* Grid of Templates (3 columns desktop, 2 columns tablet, 1 column mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 mb-16">
            {templates.map((template) => {
              // Custom primary colors per template
              const primaryColors = {
                modern: 'indigo',
                professional: 'emerald',
                minimal: 'blue',
                creative: 'rose',
                executive: 'amber',
                compact: 'indigo'
              };

              const templateSettings = {
                primaryColor: primaryColors[template.id] || 'indigo',
                fontFamily: template.id === 'professional' || template.id === 'executive' ? 'Roboto' : 'Inter',
                density: template.id === 'compact' ? 'compact' : 'balanced'
              };

              const isActive = activeTemplate === template.id;

              return (
                <div
                  key={template.id}
                  onClick={() => handleSelectTemplate(template.id)}
                  className={`flex flex-col group rounded-3xl bg-surface/30 border cursor-pointer relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:scale-[1.01] ${
                    isActive
                      ? 'border-primary bg-primary/5 shadow-premium shadow-primary/10 ring-1 ring-primary/20'
                      : 'border-slate-800 hover:border-slate-700/80 hover:shadow-2xl hover:shadow-primary/5'
                  }`}
                >
                  {/* Template Preview Section — height driven by scaled sheet */}
                  <div className="w-full bg-slate-950/45 border-b border-slate-800 flex items-start justify-center px-3 pt-3 pb-2 overflow-hidden relative transition-all duration-300 group-hover:opacity-95">
                    {/* Centered A4 Page Mockup */}
                    <div className="w-[300px] h-[420px] bg-white rounded-lg shadow-2xl overflow-hidden relative border border-slate-200 shrink-0">
                      {/* Scaled ResumePreview inside the sheet */}
                      <div style={{
                        transform: 'scale(0.38)',
                        transformOrigin: 'top left',
                        width: '263.16%', // 1 / 0.38
                        height: '263.16%',
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}>
                        <ResumePreview 
                          data={demoResumeData} 
                          template={template.id} 
                          settings={templateSettings} 
                          sectionOrder={defaultOrder} 
                        />
                      </div>
                    </div>

                    {/* Active Ribbon/Badge Indicator (Elegant & non-intrusive) */}
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-dark to-primary text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-5 rounded-bl-xl shadow-lg border-l border-b border-primary-light/25 z-20 animate-fade-in">
                        Active Template
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="p-6 flex flex-col justify-between space-y-4">
                    <div className="text-left space-y-1">
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="text-lg font-bold text-text group-hover:text-primary-light transition-colors duration-200">
                          {template.name}
                        </h3>
                        {isActive && (
                          <Badge
                            variant="success"
                            className="text-[9px] py-0.5 px-2 bg-success/15 border-success/35 text-success flex items-center gap-1 font-extrabold tracking-wider uppercase animate-fade-in"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-semibold">
                        {template.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-900/40">
                      {template.tags.map((tag, idx) => {
                        const isPopular = tag.toLowerCase().includes('popular');
                        const isAts = tag.toLowerCase().includes('ats');
                        return (
                          <Badge
                            key={idx}
                            variant={isPopular ? 'primary' : isAts ? 'success' : 'muted'}
                            className="text-[9px] py-0.5 px-2.5 font-extrabold tracking-wider uppercase"
                          >
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </Container>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </Layout>
  );
}
