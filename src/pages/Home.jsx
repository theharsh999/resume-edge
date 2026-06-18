import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Sparkles, 
  Check, 
  Cpu, 
  Layers, 
  Eye, 
  FileDown, 
  Smartphone, 
  Edit3, 
  ArrowRight,
  Settings,
  Star,
  Zap
} from 'lucide-react';

export function Home() {
  // Mock Editor State for interactive preview showcase
  const [name, setName] = useState('Sarah Jenkins');
  const [role, setRole] = useState('Lead Frontend Architect');
  const [summary, setSummary] = useState('Passionate UI engineer with 6+ years of experience constructing high-performance React applications and scalable component systems.');
  const [template, setTemplate] = useState('modern'); // 'modern' or 'classic'
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' or 'experience'

  // Features list
  const features = [
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "ATS Optimized",
      description: "Recruiter-tested layouts designed specifically to parse perfectly through applicant tracking bots."
    },
    {
      icon: <Eye className="h-6 w-6 text-secondary" />,
      title: "Live Resume Preview",
      description: "Watch your changes render in real-time as you fill out details, with no page reloads."
    },
    {
      icon: <Layers className="h-6 w-6 text-success" />,
      title: "Multiple Templates",
      description: "Switch layouts instantly between Modern and Classic styles with a single click."
    },
    {
      icon: <FileDown className="h-6 w-6 text-primary" />,
      title: "PDF Export",
      description: "Download polished, print-ready PDF files with optimized spacing and font sizes."
    },
    {
      icon: <Smartphone className="h-6 w-6 text-secondary" />,
      title: "Mobile Friendly",
      description: "Build, review, and edit your resume directly from your smartphone or tablet."
    },
    {
      icon: <Edit3 className="h-6 w-6 text-success" />,
      title: "Easy Editing",
      description: "Structured form modules with contextual helper tips make entering achievements easy."
    }
  ];

  // Steps list
  const steps = [
    {
      number: "01",
      title: "Fill Information",
      description: "Enter your experience, education, and skills into our intuitive guided form sections."
    },
    {
      number: "02",
      title: "Choose Template",
      description: "Select from our range of modern and classic resume templates."
    },
    {
      number: "03",
      title: "Download Resume",
      description: "Export your highly optimized, print-perfect resume in PDF format instantly."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Section className="pt-20 pb-16 md:pt-32 md:pb-24 text-center">
        <Container className="space-y-6 max-w-4xl">
          <Badge variant="primary" className="mb-2">
            <Sparkles className="h-3.5 w-3.5 mr-1 text-primary-light inline-block animate-pulse" />
            Resume Builder 2.0
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-text">
            Create ATS-Friendly Resumes <br />
            That <span className="gradient-text">Get Interviews</span>
          </h1>
          
          <p className="text-muted text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Build modern professional resumes in minutes with real-time editing, beautiful templates, and instant PDF export.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/builder">
              <Button variant="primary" size="lg" className="gap-2 px-8 shadow-premium-glow">
                Start Building <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline" size="lg" className="px-8">
                Browse Templates
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs md:text-sm text-muted font-medium">
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-success">
                <Check className="h-3 w-3" />
              </span>
              ATS Friendly
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-success">
                <Check className="h-3 w-3" />
              </span>
              Instant PDF Export
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-success">
                <Check className="h-3 w-3" />
              </span>
              Free Templates
            </span>
          </div>
        </Container>
      </Section>

      {/* Resume Preview Showcase (HTML/CSS Split Mockup) */}
      <Section className="py-20 md:py-28 bg-slate-950/20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-3">Interactive Demo</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-text">Live Preview Simulator</h2>
            <p className="text-muted text-sm md:text-base mt-2">
              Modify the input form on the left to see the print-ready resume document on the right adapt instantly.
            </p>
          </div>

          <Card className="max-w-5xl mx-auto p-4 md:p-6 rounded-2xl bg-slate-900/40 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden" hoverEffect={false}>
            {/* Visual glow backdrops */}
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column: Mock Form Editor */}
              <div className="lg:col-span-5 flex flex-col bg-surface border border-slate-850 rounded-xl overflow-hidden shadow-premium z-10">
                {/* Header of Editor panel */}
                <div className="border-b border-slate-900 bg-slate-950/30 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary-light animate-spin-slow" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text">Resume Fields</span>
                  </div>
                  {/* Template switcher pills */}
                  <div className="flex gap-1 bg-slate-900 p-0.5 rounded-md border border-slate-800">
                    <button
                      onClick={() => setTemplate('modern')}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${template === 'modern' ? 'bg-primary text-text' : 'text-muted hover:text-text'}`}
                    >
                      Modern
                    </button>
                    <button
                      onClick={() => setTemplate('classic')}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${template === 'classic' ? 'bg-primary text-text' : 'text-muted hover:text-text'}`}
                    >
                      Classic
                    </button>
                  </div>
                </div>

                {/* Tabs selection */}
                <div className="flex border-b border-slate-900 text-xs bg-slate-950/10">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`flex-1 py-2.5 text-center border-b-2 font-medium ${activeTab === 'personal' ? 'border-primary text-primary-light' : 'border-transparent text-muted hover:text-text'}`}
                  >
                    Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab('experience')}
                    className={`flex-1 py-2.5 text-center border-b-2 font-medium ${activeTab === 'experience' ? 'border-primary text-primary-light' : 'border-transparent text-muted hover:text-text'}`}
                  >
                    Experience
                  </button>
                </div>

                {/* Tab content forms */}
                <div className="p-4 space-y-4 flex-grow text-left">
                  {activeTab === 'personal' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Full Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors font-medium"
                          placeholder="e.g. Sarah Jenkins"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Job Title</label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-colors font-medium"
                          placeholder="e.g. Lead Frontend Architect"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Professional Summary</label>
                        <textarea
                          rows="3"
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed font-medium"
                          placeholder="Write a brief professional overview..."
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'experience' && (
                    <div className="space-y-3">
                      <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-850">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-text">Stripe</span>
                          <span className="text-[10px] text-muted font-medium">2023 - Present</span>
                        </div>
                        <span className="text-[11px] text-primary-light block font-semibold">Lead UI Architect</span>
                        <p className="text-[11px] text-muted mt-1 leading-relaxed">
                          • Spearheaded standard design system utilized across billing modules.
                          <br />
                          • Optimized page weight yielding 14% conversion gains.
                        </p>
                      </div>
                      
                      <div className="p-2.5 rounded-lg bg-slate-950/20 border border-slate-900/60">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-muted">Meta</span>
                          <span className="text-[10px] text-muted font-medium">2020 - 2023</span>
                        </div>
                        <span className="text-[11px] text-muted block font-medium">Senior React Developer</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-950/30 border-t border-slate-900 flex justify-between items-center text-xs">
                  <span className="text-success flex items-center gap-1.5 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-ping"></span> Live Sync Active
                  </span>
                  <Link to="/builder">
                    <Button size="sm" className="h-7 text-[11px] font-semibold">Go to Editor</Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Resume Canvas Preview */}
              <div className="lg:col-span-7 flex flex-col bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-6 overflow-hidden min-h-[420px] justify-between z-10 text-left">
                {/* Simulated template rendering */}
                <div className="h-full flex flex-col justify-between space-y-4">
                  {template === 'modern' ? (
                    /* Modern Template Style */
                    <div className="space-y-4 font-sans text-xs">
                      {/* Name and title */}
                      <div className="border-b border-slate-800 pb-3">
                        <h3 className="text-lg md:text-xl font-bold tracking-tight text-text">{name || 'Sarah Jenkins'}</h3>
                        <p className="text-xs text-primary font-bold tracking-wide uppercase mt-0.5">{role || 'Lead Frontend Architect'}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted mt-2 font-medium">
                          <span>sarah@edge.io</span>
                          <span>•</span>
                          <span>+1 (555) 019-2834</span>
                          <span>•</span>
                          <span>San Francisco, CA</span>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="space-y-1">
                        <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider">Summary</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{summary || 'Passionate UI engineer...'}</p>
                      </div>

                      {/* Experience */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider">Professional Experience</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-baseline font-semibold">
                              <span className="text-slate-200">Stripe</span>
                              <span className="text-[10px] text-muted">2023 - Present</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-medium">
                              <span className="text-primary-light">Lead UI Architect</span>
                              <span className="text-[10px] text-muted">San Francisco, CA</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                              • Lead construction of core design system driving billing portal components. <br />
                              • Standardized micro-interaction schemas increasing engagement metrics by 12%.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Education & Skills */}
                      <div className="grid grid-cols-2 gap-4 pt-1 border-t border-slate-900">
                        <div className="space-y-1">
                          <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider">Education</h4>
                          <div className="text-[11px]">
                            <p className="font-bold text-slate-200">B.S. Computer Science</p>
                            <p className="text-[10px] text-muted font-medium">Stanford University (GPA: 3.9)</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider">Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {['React', 'Vite', 'PostCSS', 'System Design'].map((s) => (
                              <Badge key={s} variant="muted" className="text-[9px] bg-slate-900 border-slate-800 text-slate-300 px-1.5 py-0">
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Classic Template Style */
                    <div className="space-y-3.5 font-serif text-xs">
                      {/* Name and title */}
                      <div className="text-center border-b border-slate-800 pb-3">
                        <h3 className="text-xl md:text-2xl font-semibold tracking-wide text-text">{name || 'Sarah Jenkins'}</h3>
                        <p className="text-[11px] italic text-muted mt-0.5">{role || 'Lead Frontend Architect'}</p>
                        <div className="flex justify-center gap-4 text-[10px] text-slate-400 mt-2">
                          <span>sarah@edge.io</span>
                          <span>|</span>
                          <span>+1 (555) 019-2834</span>
                          <span>|</span>
                          <span>Stanford Alumni</span>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="space-y-1">
                        <h4 className="text-[9px] font-bold text-text uppercase tracking-wider text-center">Executive Summary</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed italic text-center px-4">"{summary || 'Passionate UI engineer...'}"</p>
                      </div>

                      {/* Experience */}
                      <div className="space-y-2">
                        <h4 className="text-[9px] font-bold text-text uppercase tracking-wider border-b border-slate-900 pb-0.5">Experience History</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-baseline font-semibold">
                              <span className="text-slate-200">STRIPE, INC.</span>
                              <span className="text-[10px] text-slate-400">2023 - Present</span>
                            </div>
                            <div className="flex justify-between text-[10px] italic text-muted">
                              <span>Lead UI Architect</span>
                              <span>California, USA</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                              - Engineered highly reusable styling patterns using atomic CSS guidelines. <br />
                              - Reduced core dashboard styles bundle size by 35% using purging tools.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Education & Skills */}
                      <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-2.5">
                        <div className="space-y-0.5">
                          <h4 className="text-[9px] font-bold text-text uppercase tracking-wider">Education</h4>
                          <p className="text-[10px] font-semibold text-slate-200">STANFORD UNIVERSITY</p>
                          <p className="text-[9px] text-slate-400 italic">Bachelor of Science in CS</p>
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[9px] font-bold text-text uppercase tracking-wider">Expertise</h4>
                          <p className="text-[10px] text-slate-300 leading-relaxed">
                            React, ESNext, Webpack, Responsive Design, CSS Grids, System Integration
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footer details */}
                  <div className="text-[10px] text-muted flex items-center justify-between border-t border-slate-900 pt-2.5 font-medium">
                    <span className="flex items-center gap-1 text-[9px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800/80">
                      Format: US Letter
                    </span>
                    <span className="text-[9px] text-primary-light">
                      * Changes sync instantly on input
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Features Section (6 Cards Grid) */}
      <Section className="border-t border-slate-900/60 py-20 md:py-28 lg:py-32">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="secondary">Core Capabilities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text animate-fade-in">
              Engineered to Bypass Hiring Filters
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              ResumeEdge implements recruiter-backed layout parameters designed specifically to pass applicant tracking engines without sacrificing design quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <Card key={idx} className="flex flex-col text-left group p-8 rounded-2xl hover-elevation" hoverEffect={false}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary-light mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary-light transition-colors duration-200">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feat.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* How It Works Section (Horizontal Timeline on Desktop) */}
      <Section className="border-t border-slate-900/60 bg-slate-950/10 py-20 md:py-28 lg:py-32">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Workflow</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
              How It Works
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Create your document in three simple, guided steps and get interview ready.
            </p>
          </div>

          {/* Timeline container */}
          <div className="relative">
            {/* Desktop Connective Progress Line */}
            <div className="hidden lg:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-primary/30 via-secondary/30 to-success/30 z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group bg-surface lg:bg-transparent border lg:border-none border-slate-850 p-6 lg:p-0 rounded-xl shadow-premium lg:shadow-none">
                  {/* Step Bubble */}
                  <div className="h-14 w-14 rounded-full border border-slate-800 bg-surface flex items-center justify-center font-extrabold text-sm text-text shadow-premium group-hover:border-primary-light/40 group-hover:shadow-premium-glow transition-all duration-300 mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-text to-muted group-hover:from-primary-light group-hover:to-secondary">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary-light transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted max-w-xs leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section className="border-t border-slate-900/60 bg-slate-950/20 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-1">
              <p className="text-3xl md:text-5xl font-extrabold text-text tracking-tight">10K+</p>
              <p className="text-xs md:text-sm text-muted font-bold uppercase tracking-wider">Resumes Created</p>
            </div>
            
            <div className="text-center space-y-1">
              <p className="text-3xl md:text-5xl font-extrabold text-primary-light tracking-tight">95%</p>
              <p className="text-xs md:text-sm text-muted font-bold uppercase tracking-wider">ATS Compatibility</p>
            </div>

            <div className="text-center space-y-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1">
                <p className="text-3xl md:text-5xl font-extrabold text-text tracking-tight">4.9</p>
                <div className="flex text-yellow-500 pb-1">
                  <Star className="h-5 w-5 fill-yellow-500 stroke-none" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted font-bold uppercase tracking-wider">User Rating</p>
            </div>

            <div className="text-center space-y-1">
              <p className="text-3xl md:text-5xl font-extrabold text-success tracking-tight">100%</p>
              <p className="text-xs md:text-sm text-muted font-bold uppercase tracking-wider">Free To Start</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="border-t border-slate-900/60 py-24 md:py-32 text-center">
        <Container>
          <Card className="max-w-4xl mx-auto py-16 px-8 md:py-24 md:px-16 rounded-3xl bg-gradient-to-br from-slate-900/40 via-surface to-slate-950/60 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden" hoverEffect={false}>
            {/* Ambient light effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none"></div>

            <Badge variant="primary" className="mb-4">
              <Zap className="h-3.5 w-3.5 mr-1 text-primary-light inline-block animate-pulse" />
              Boost Your Hiring Chance
            </Badge>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-text leading-tight max-w-2xl mx-auto">
              Ready To Build Your Dream Resume?
            </h2>
            
            <p className="text-muted text-sm md:text-base max-w-lg mx-auto mb-8 font-medium">
              Format resumes easily. Create your optimized layout in less than 10 minutes and bypass traditional application filters.
            </p>

            <Link to="/builder">
              <Button variant="primary" size="lg" className="px-8 shadow-premium-glow hover:scale-105 transition-transform duration-200 gap-2 font-semibold">
                Create My Resume <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </Container>
      </Section>
    </Layout>
  );
}
