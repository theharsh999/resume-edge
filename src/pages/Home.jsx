import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Sparkles, 
  CheckCircle, 
  Cpu, 
  ArrowRight, 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  Award,
  Layers
} from 'lucide-react';

export function Home() {
  return (
    <Layout>
      <Container>
        {/* Hero Section */}
        <Section className="pt-16 pb-16 md:pt-24 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copywriting */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <Badge variant="primary" className="mb-2">
                <Sparkles className="h-3.5 w-3.5 mr-1 text-primary-light inline-block" />
                Next-gen ATS Resume Architect
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-text">
                Create Professional Resumes That <span className="gradient-text">Get Interviews</span>
              </h1>
              
              <p className="text-muted text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
                Build ATS-friendly resumes with a beautiful, modern builder. Take the guesswork out of job hunting and bypass hiring bots.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/builder">
                  <Button variant="primary" size="lg" className="gap-2 group">
                    Start Building <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button variant="outline" size="lg">
                    View Templates
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t border-slate-900 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" /> 100% ATS-Compliant Layouts
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-success" /> Recruiter-Approved Formats
                </span>
              </div>
            </div>

            {/* Right Column: Premium Pure UI Illustration */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-2xl border border-slate-800 bg-slate-950/40 p-4 shadow-2xl premium-card-glow overflow-hidden">
                {/* Background lights */}
                <div className="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
                
                {/* Editor Shell mockup */}
                <div className="h-full w-full rounded-xl border border-slate-800/80 bg-surface/90 flex flex-col overflow-hidden shadow-premium">
                  {/* Window Bar */}
                  <div className="h-9 border-b border-slate-900 bg-slate-950/40 flex items-center px-4 justify-between shrink-0">
                    <div className="flex space-x-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-800"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-800"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-800"></div>
                    </div>
                    <div className="text-[10px] text-muted font-mono flex items-center gap-1">
                      <Terminal className="h-3 w-3" /> resume-builder.edge
                    </div>
                    <div className="w-12"></div>
                  </div>

                  {/* Mock Columns */}
                  <div className="flex-grow flex overflow-hidden">
                    {/* Left Pane: Editor Fields */}
                    <div className="w-[45%] border-r border-slate-900 p-3 space-y-3.5 overflow-hidden flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-semibold tracking-wider text-muted uppercase">Editor</span>
                          <span className="h-3.5 w-8 bg-success/20 text-success rounded px-1 text-[8px] flex items-center justify-center font-bold">LIVE</span>
                        </div>
                        {/* Section Item */}
                        <div className="border border-slate-800 rounded-md p-2 bg-slate-950/20 space-y-1.5">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 text-primary-light" />
                            <span className="text-[10px] font-bold text-text">Experience</span>
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 w-full bg-slate-800 rounded"></div>
                            <div className="h-2.5 w-[85%] bg-slate-900 rounded"></div>
                          </div>
                        </div>
                        {/* Section Item */}
                        <div className="border border-slate-900/50 rounded-md p-2 bg-slate-950/10 space-y-1.5">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3 text-muted" />
                            <span className="text-[10px] font-bold text-muted">Education</span>
                          </div>
                          <div className="h-2 w-3/4 bg-slate-900 rounded"></div>
                        </div>
                        {/* Section Item */}
                        <div className="border border-slate-900/50 rounded-md p-2 bg-slate-950/10 space-y-1.5">
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3 text-muted" />
                            <span className="text-[10px] font-bold text-muted">Skills</span>
                          </div>
                          <div className="h-2 w-1/2 bg-slate-900 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="h-6 w-full bg-slate-900 rounded flex items-center justify-center text-[9px] text-muted border border-slate-800 cursor-pointer">
                        + Add Custom Section
                      </div>
                    </div>

                    {/* Right Pane: Live preview sheet */}
                    <div className="w-[55%] bg-slate-950/40 p-3 flex flex-col justify-between relative">
                      {/* Live Resume Mock sheet */}
                      <div className="bg-slate-900/60 rounded border border-slate-800 p-2.5 space-y-2 h-full flex flex-col justify-between">
                        {/* Header */}
                        <div className="text-center space-y-1 border-b border-slate-800 pb-2">
                          <div className="h-2.5 w-16 bg-text/80 rounded mx-auto"></div>
                          <div className="h-1.5 w-32 bg-muted/40 rounded mx-auto"></div>
                        </div>
                        {/* Experience block */}
                        <div className="space-y-1.5 flex-grow pt-1">
                          <div className="h-1.5 w-8 bg-primary/40 rounded"></div>
                          <div className="flex justify-between items-center">
                            <div className="h-2 w-14 bg-text/60 rounded"></div>
                            <div className="h-1.5 w-10 bg-muted/30 rounded"></div>
                          </div>
                          <div className="h-1.5 w-full bg-muted/20 rounded"></div>
                          <div className="h-1.5 w-[90%] bg-muted/20 rounded"></div>
                        </div>
                        {/* Education block */}
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-8 bg-primary/40 rounded"></div>
                          <div className="flex justify-between items-center">
                            <div className="h-2 w-12 bg-text/60 rounded"></div>
                            <div className="h-1.5 w-8 bg-muted/30 rounded"></div>
                          </div>
                          <div className="h-1.5 w-5/6 bg-muted/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Widget: ATS Score */}
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-slate-900 border border-slate-800 rounded-lg p-2.5 shadow-premium flex items-center space-x-2.5 max-w-[150px]">
                  <div className="relative flex items-center justify-center">
                    <svg className="h-9 w-9 transform -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3.5" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="10" />
                    </svg>
                    <span className="absolute text-[9px] font-bold text-success">98%</span>
                  </div>
                  <div className="text-[10px] text-left">
                    <p className="font-bold text-text">ATS Score</p>
                    <p className="text-[8px] text-success">Excellent Match</p>
                  </div>
                </div>

                {/* Floating Badge: Keywords matched */}
                <div className="absolute -bottom-2 left-6 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 shadow-premium flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
                  <span className="text-[9px] font-semibold text-text">5 keywords added</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Feature Cards Grid */}
        <Section className="border-t border-slate-900/60 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="secondary">Core Capabilities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
              Engineered to Bypass ATS Systems
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Standard recruiters spend less than 7 seconds reviewing your resume. We design layouts that catch human eyes and pass scanning software seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary-light mb-5">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">Automated Keyword Scan</h3>
              <p className="text-sm text-muted leading-relaxed">
                Add relevant key phrases identified by our analyzer. We suggest optimizations directly inside the editor layout.
              </p>
            </Card>

            <Card>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 border border-secondary/20 text-secondary-light mb-5">
                <Layers className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">Structure Integrity</h3>
              <p className="text-sm text-muted leading-relaxed">
                No complex tables, images, or graphical sliders that break recruitment tools. Simple, elegant, layout-rigid formats.
              </p>
            </Card>

            <Card>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 border border-success/20 text-success mb-5">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">Dynamic Theming</h3>
              <p className="text-sm text-muted leading-relaxed">
                Easily personalize typography and margins to compress your experience into a single, clean page without losing clarity.
              </p>
            </Card>
          </div>
        </Section>

        {/* CTA section */}
        <Section className="border-t border-slate-900/60 py-16 text-center">
          <Card className="max-w-4xl mx-auto py-12 px-6 md:py-16 md:px-12 bg-gradient-to-br from-slate-900/40 to-slate-950/60 border-slate-800">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-text">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-muted text-base max-w-xl mx-auto mb-8">
              Join thousands of professionals landing roles at Google, Stripe, Vercel, and OpenAI using ResumeEdge layouts.
            </p>
            <Link to="/builder">
              <Button variant="primary" size="lg" className="px-8 shadow-premium-glow">
                Start Building Free
              </Button>
            </Link>
          </Card>
        </Section>
      </Container>
    </Layout>
  );
}
