import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TemplateSwitcher } from '../components/builder/TemplateSwitcher';
import { ResumeForm } from '../components/builder/ResumeForm';
import { ResumePreview } from '../components/builder/ResumePreview';
import { Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOCAL_STORAGE_KEY_DATA = 'resumeedge_data';
const LOCAL_STORAGE_KEY_TPL = 'resumeedge_template';

const defaultState = {
  personal: {
    fullName: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: []
};

const demoResumeData = {
  personal: {
    fullName: 'Alex Morgan',
    role: 'Senior Frontend Engineer',
    email: 'alex.morgan@dev.io',
    phone: '+1 (555) 382-9102',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan-codes',
  },
  summary: 'Senior Frontend Engineer with 7+ years of experience specializing in React, Next.js, and high-performance user interface design. Proven history of leading architecture refactors that decrease page load times by 40% and improve conversion funnel metrics.',
  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'GraphQL', 'System Design', 'CI/CD', 'Jest'],
  experience: [
    {
      company: 'TechCorp Solutions',
      role: 'Lead UI Architect',
      startDate: 'Mar 2022',
      endDate: 'Present',
      description: '• Orchestrated transition of legacy SaaS platform to Next.js App Router, boosting web performance score from 65 to 98.\n• Mentored 8 mid-level front-end engineers and created internal design tokens library adopted by 4 cross-functional divisions.\n• Partnered with product teams to design modular analytics widgets, resulting in 18% higher subscription conversions.'
    },
    {
      company: 'Innovate Digital',
      role: 'Senior Frontend Developer',
      startDate: 'Aug 2019',
      endDate: 'Feb 2022',
      description: '• Engineered micro-frontend modules using Module Federation, enabling isolated team releases.\n• Cut asset weight by 45% through aggressive bundles tree-shaking and custom PostCSS rules.'
    }
  ],
  projects: [
    {
      projectName: 'ResumeEdge App',
      techStack: 'React, Vite, Tailwind CSS v4, Lucide Icons',
      description: 'Built a premium, high-performance ATS resume builder with real-time responsive styling previews and local storage synchronization.',
      githubLink: 'https://github.com/theharsh999/resume-edge'
    },
    {
      projectName: 'Framer Canvas Simulator',
      techStack: 'React, Framer Motion, HTML5 Canvas',
      description: 'Developed an interactive drag-and-drop vector editing board simulating Figma grid snaps.',
      githubLink: 'https://github.com/alex/framer-sim'
    }
  ],
  education: [
    {
      college: 'University of Washington',
      degree: 'B.S. in Computer Science & Engineering',
      startYear: '2015',
      endYear: '2019'
    }
  ]
};

export function Builder() {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_DATA);
      return saved ? JSON.parse(saved) : defaultState;
    } catch {
      return defaultState;
    }
  });

  const [template, setTemplate] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TPL);
    return saved || 'modern';
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TPL, template);
  }, [template]);

  const handleLoadDemo = () => {
    setResumeData(demoResumeData);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all resume information?')) {
      setResumeData(defaultState);
    }
  };

  return (
    <Layout>
      <Container className="py-8">
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <Link to="/" className="text-muted hover:text-text transition-colors duration-200 text-xs font-semibold flex items-center">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Home
              </Link>
              <Badge variant="primary">Builder Workspace</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text">Resume Workspace</h1>
            <p className="text-muted text-xs md:text-sm font-medium">Build, preview, and customize your professional ATS resume in real time.</p>
          </div>
          <button
            onClick={handleClearAll}
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors border border-red-500/10 hover:border-red-500/20 bg-red-950/10 px-3 py-1.5 rounded-lg shrink-0 cursor-pointer self-start md:self-auto"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear Workspace
          </button>
        </div>

        {/* Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Switcher (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <Card hoverEffect={false} className="p-4 md:p-5 border-slate-800 bg-surface/50">
              <TemplateSwitcher activeTemplate={template} onTemplateChange={setTemplate} />
            </Card>

            <ResumeForm data={resumeData} onDataChange={setResumeData} onLoadDemo={handleLoadDemo} />
          </div>

          {/* Right Column: Live Sticky Preview (col-span-7) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <ResumePreview data={resumeData} template={template} />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
