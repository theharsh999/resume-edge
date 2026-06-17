import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, LayoutTemplate } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
                {/* Template Mockup representation */}
                <div className={`aspect-[3/4] w-full rounded-xl bg-gradient-to-br ${template.color} border border-slate-800/80 mb-6 flex flex-col p-5 justify-between overflow-hidden relative group-hover:border-slate-700/80 transition-all duration-300 group-hover:scale-[1.02]`}>
                  
                  {/* Visual resume outline */}
                  <div className="space-y-4 w-full pr-4 text-left opacity-75 group-hover:opacity-95 transition-opacity duration-300">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="space-y-1">
                        <div className="h-3 w-24 bg-white/25 rounded"></div>
                        <div className="h-2 w-14 bg-primary/35 rounded animate-pulse"></div>
                      </div>
                      <div className="h-2.5 w-16 bg-white/10 rounded"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-2 w-12 bg-white/20 rounded"></div>
                      <div className="h-1.5 w-full bg-white/10 rounded"></div>
                      <div className="h-1.5 w-5/6 bg-white/10 rounded"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-2 w-16 bg-white/20 rounded"></div>
                      <div className="h-1.5 w-full bg-white/10 rounded"></div>
                      <div className="h-1.5 w-4/5 bg-white/10 rounded"></div>
                    </div>
                  </div>

                  {/* Hover Actions overlay */}
                  <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-350">
                    <Button 
                      variant="primary" 
                      size="md" 
                      onClick={() => handleSelectTemplate(template.id)}
                      className="gap-2 font-bold px-6 shadow-premium-glow"
                    >
                      Use Template <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 relative z-10">
                    {template.tags.map((tag, idx) => {
                      const isPopular = tag.toLowerCase().includes('popular');
                      const isAts = tag.toLowerCase().includes('ats');
                      return (
                        <Badge 
                          key={idx} 
                          variant={isPopular ? 'primary' : isAts ? 'success' : 'muted'} 
                          className={`text-[9px] py-0.5 px-2 font-extrabold uppercase tracking-wider ${
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

                <div className="flex-grow flex flex-col text-left">
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary-light transition-colors duration-200">
                    {template.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed flex-grow font-semibold">
                    {template.description}
                  </p>
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
