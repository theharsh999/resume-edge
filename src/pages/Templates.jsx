import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LayoutTemplate, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Templates() {
  const dummyTemplates = [
    {
      id: 'modern',
      name: 'Modern Minimalist',
      description: 'Clean lines, bold headers, spacious. Perfect for tech and creative roles.',
      tags: ['Popular', 'ATS-Friendly'],
      color: 'from-indigo-500/15 to-violet-500/5'
    },
    {
      id: 'professional',
      name: 'Executive Classic',
      description: 'Traditional layout, elegant serif typography. Best for finance and management.',
      tags: ['ATS-Friendly', 'Corporate'],
      color: 'from-emerald-500/15 to-teal-500/5'
    },
    {
      id: 'creative',
      name: 'SaaS Innovator',
      description: 'Unique layout elements, stylish badges, modern touch. Ideal for startup developers.',
      tags: ['Creative', 'Startup'],
      color: 'from-purple-500/15 to-pink-500/5'
    }
  ];

  return (
    <Layout>
      <Container>
        <Section className="py-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Premium Designs
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-text">
              Professional Resume Templates
            </h1>
            <p className="text-muted text-base md:text-lg">
              Choose from a curated collection of recruiter-approved, ATS-friendly resume templates. Customize them instantly in the editor.
            </p>
          </div>

          {/* Grid of Templates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {dummyTemplates.map((template) => (
              <Card key={template.id} className="flex flex-col h-full group" hoverEffect={true}>
                {/* Template Mockup representation */}
                <div className={`aspect-[3/4] w-full rounded-lg bg-gradient-to-br ${template.color} border border-slate-800/80 mb-6 flex flex-col p-4 justify-between overflow-hidden relative group-hover:border-slate-700 transition-all`}>
                  {/* Subtle resume simulation */}
                  <div className="space-y-3 opacity-60">
                    <div className="flex justify-between items-center">
                      <div className="h-3.5 w-24 bg-slate-200/20 rounded"></div>
                      <div className="h-2 w-16 bg-slate-200/10 rounded"></div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200/10 rounded"></div>
                    <div className="space-y-1.5 pt-2">
                      <div className="h-1.5 w-1/3 bg-primary/30 rounded"></div>
                      <div className="h-2 w-full bg-slate-200/25 rounded"></div>
                      <div className="h-2 w-5/6 bg-slate-200/25 rounded"></div>
                    </div>
                    <div className="space-y-1.5 pt-2">
                      <div className="h-1.5 w-1/4 bg-primary/30 rounded"></div>
                      <div className="h-2 w-full bg-slate-200/25 rounded"></div>
                      <div className="h-2 w-4/5 bg-slate-200/25 rounded"></div>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                    <Link to="/builder">
                      <Button variant="primary" size="sm" className="gap-1.5">
                        Use Template <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>

                  <div className="flex gap-2.5">
                    {template.tags.map((tag, idx) => (
                      <Badge key={idx} variant="muted" className="text-[10px] bg-slate-900/60 border-slate-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary-light transition-colors duration-200">
                    {template.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed flex-grow">
                    {template.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-center">
                  <span className="text-xs text-muted font-medium">Free Access</span>
                  <Link to="/builder" className="text-xs font-semibold text-primary hover:text-primary-light flex items-center gap-1 transition-colors">
                    Build Now <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Templates teaser card */}
          <Card className="max-w-3xl mx-auto border-dashed border-slate-800 text-center py-8">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/15 text-secondary-light mb-4">
              <LayoutTemplate className="h-5 w-5 text-secondary" />
            </div>
            <h3 className="font-semibold text-text mb-1">Custom Styling & PDF Export</h3>
            <p className="text-sm text-muted max-w-xl mx-auto">
              Dynamic template generation, customized layout parameters, margins, fonts, and print-perfect PDF rendering will be set up in subsequent development phases.
            </p>
          </Card>
        </Section>
      </Container>
    </Layout>
  );
}
