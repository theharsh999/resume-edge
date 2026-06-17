import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TemplateSwitcher } from '../components/builder/TemplateSwitcher';
import { ResumeForm } from '../components/builder/ResumeForm';
import { ResumePreview } from '../components/builder/ResumePreview';

// Customization and Ordering Panels
import { ResumeSettings } from '../components/builder/ResumeSettings';
import { SectionDndList } from '../components/builder/SectionDndList';
import { Toast } from '../components/ui/Toast';

// Analytics dashboard widgets
import { ATSScoreCard } from '../components/builder/ATSScoreCard';
import { ResumeInsights } from '../components/builder/ResumeInsights';
import { CompletionTracker } from '../components/builder/CompletionTracker';
import { RecruiterChecklist } from '../components/builder/RecruiterChecklist';
import { ExportPDFButton } from '../components/builder/ExportPDFButton';

import { Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOCAL_STORAGE_KEY_DATA = 'resumeedge_data';
const LOCAL_STORAGE_KEY_TPL = 'resumeedge_template';
const LOCAL_STORAGE_KEY_SETTINGS = 'resumeedge_settings';
const LOCAL_STORAGE_KEY_ORDER = 'resumeedge_section_order';
const LOCAL_STORAGE_KEY_PENDING_TOAST = 'resumeedge_pending_toast';

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

const defaultSettings = {
  primaryColor: 'indigo',
  fontFamily: 'Inter',
  density: 'balanced'
};

const defaultOrder = ['summary', 'skills', 'experience', 'projects', 'education'];

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

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SETTINGS);
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [sectionOrder, setSectionOrder] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ORDER);
      return saved ? JSON.parse(saved) : defaultOrder;
    } catch {
      return defaultOrder;
    }
  });

  // Toasts state management
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Check pending toast on mount
  useEffect(() => {
    try {
      const pending = localStorage.getItem(LOCAL_STORAGE_KEY_PENDING_TOAST);
      if (pending) {
        const parsed = JSON.parse(pending);
        addToast(parsed.message, parsed.type);
        localStorage.removeItem(LOCAL_STORAGE_KEY_PENDING_TOAST);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync state variables to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TPL, template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ORDER, JSON.stringify(sectionOrder));
  }, [sectionOrder]);

  const handleTemplateChange = (newTpl) => {
    setTemplate(newTpl);
    addToast('Template style applied!', 'success');
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    addToast('Styling settings updated!', 'success');
  };

  const handleReorderSections = (newOrder) => {
    setSectionOrder(newOrder);
    addToast('Layout sections rearranged!', 'success');
  };

  const handleLoadDemo = () => {
    setResumeData(demoResumeData);
    addToast('Demo developer resume loaded!', 'info');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all resume information?')) {
      setResumeData(defaultState);
      setTemplate('modern');
      setSettings(defaultSettings);
      setSectionOrder(defaultOrder);
      addToast('Workspace data cleared!', 'info');
    }
  };

  // Programmatic calculations for builder analytics
  const calculateATSScore = () => {
    let score = 0;
    const p = resumeData.personal || {};
    
    // Personal Info check: +15 max
    if (p.fullName) score += 3;
    if (p.email) score += 3;
    if (p.phone) score += 3;
    if (p.location) score += 2;
    if (p.linkedin) score += 2;
    if (p.github) score += 2;

    // Summary statement check: +15 max
    const summaryLen = (resumeData.summary || '').trim().length;
    if (summaryLen >= 80) score += 15;
    else if (summaryLen > 0) score += 10;

    // Technical skills count: +20 max
    const skillsCount = (resumeData.skills || []).length;
    if (skillsCount >= 5) score += 20;
    else if (skillsCount > 0) score += 10;

    // Education details: +15 max
    const eduCount = (resumeData.education || []).length;
    if (eduCount >= 1) score += 15;

    // Experience logs: +20 max
    const expCount = (resumeData.experience || []).length;
    if (expCount >= 2) score += 20;
    else if (expCount === 1) score += 10;

    // Projects showcases: +15 max
    const projCount = (resumeData.projects || []).length;
    if (projCount >= 2) score += 15;
    else if (projCount === 1) score += 10;

    return score;
  };

  const calculateCompletion = () => {
    let total = 0;
    const p = resumeData.personal || {};

    // Personal details verification: max 30% (6 fields, each 5%)
    if (p.fullName) total += 5;
    if (p.role) total += 5;
    if (p.email) total += 5;
    if (p.phone) total += 5;
    if (p.location) total += 5;
    if (p.linkedin || p.github) total += 5;

    // Summary validation: max 15%
    if ((resumeData.summary || '').trim().length > 0) total += 15;

    // Core Skills validation: max 15%
    const skillsCount = (resumeData.skills || []).length;
    if (skillsCount >= 5) total += 15;
    else if (skillsCount > 0) total += 5;

    // Work history validation: max 20%
    if ((resumeData.experience || []).length >= 1) total += 20;

    // Academic verification: max 10%
    if ((resumeData.education || []).length >= 1) total += 10;

    // Project entries validation: max 10%
    if ((resumeData.projects || []).length >= 1) total += 10;

    return total;
  };

  const getInsights = () => {
    const list = [];
    const p = resumeData.personal || {};

    if (!p.email || !p.phone) {
      list.push('Add contact details (email and phone) so recruiters can reach you.');
    }
    if (!p.linkedin) {
      list.push('Add your LinkedIn URL link to build recruiter trust.');
    }
    if (!p.github) {
      list.push('Link your GitHub profile to showcase open source contributions.');
    }
    if (!(resumeData.summary || '').trim()) {
      list.push('Add a Professional Summary to summarize your career strengths.');
    } else if (resumeData.summary.trim().length < 80) {
      list.push('Expand your summary statement to be more descriptive (aim for 80+ chars).');
    }
    if ((resumeData.skills || []).length < 5) {
      list.push('List at least 5 key technical skills to satisfy screening filters.');
    }
    if ((resumeData.experience || []).length === 0) {
      list.push('Add your professional work history to showcase career growth.');
    } else {
      const shortDesc = resumeData.experience.some(exp => (exp.description || '').trim().length < 40);
      if (shortDesc) {
        list.push('Expand experience bullet points (explain your actions and metrics).');
      }
    }
    if ((resumeData.education || []).length === 0) {
      list.push('Add your education history (degrees or certification listings).');
    }
    if ((resumeData.projects || []).length === 0) {
      list.push('Add at least one project entry to prove hands-on abilities.');
    }

    return list;
  };

  const getRecruiterChecklist = () => {
    const p = resumeData.personal || {};
    return [
      { label: 'Full Name & Role Title', checked: !!(p.fullName && p.role) },
      { label: 'Professional Summary Statement', checked: !!(resumeData.summary && resumeData.summary.trim().length > 0) },
      { label: '5+ Core Skills Listed', checked: !!(resumeData.skills && resumeData.skills.length >= 5) },
      { label: 'Work History Documented', checked: !!(resumeData.experience && resumeData.experience.length >= 1) },
      { label: 'Academic History Documented', checked: !!(resumeData.education && resumeData.education.length >= 1) },
      { label: 'Project Portfolio Present', checked: !!(resumeData.projects && resumeData.projects.length >= 1) },
      { label: 'LinkedIn Profile Connected', checked: !!(p.linkedin && p.linkedin.trim().length > 0) },
      { label: 'GitHub Profile Connected', checked: !!(p.github && p.github.trim().length > 0) },
    ];
  };

  // Variable aggregates
  const score = calculateATSScore();
  const completion = calculateCompletion();
  const insights = getInsights();
  const checklist = getRecruiterChecklist();
  const exportFilename = `ResumeEdge-${(resumeData.personal.fullName || 'Candidate').trim().replace(/\s+/g, '_')}.pdf`;

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
            <p className="text-muted text-xs md:text-sm font-medium">Build, check score, customize styling themes, and export A4 PDFs in real time.</p>
          </div>
          <button
            onClick={handleClearAll}
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors border border-red-500/10 hover:border-red-500/20 bg-red-950/10 px-3 py-1.5 rounded-lg shrink-0 cursor-pointer self-start md:self-auto"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear Workspace
          </button>
        </div>

        {/* 3-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Form & Customization Switchers (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <Card hoverEffect={false} className="p-4 md:p-5 border-slate-800 bg-surface/50 space-y-4">
              <TemplateSwitcher activeTemplate={template} onTemplateChange={handleTemplateChange} />
              
              {/* Styling settings selector accordion */}
              <ResumeSettings settings={settings} onSettingsChange={handleSettingsChange} />

              {/* Drag and Drop layout sortable list */}
              <SectionDndList items={sectionOrder} onReorder={handleReorderSections} />
            </Card>

            <ResumeForm data={resumeData} onDataChange={setResumeData} onLoadDemo={handleLoadDemo} />
          </div>

          {/* Column 2: Live Sticky Preview (col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ResumePreview data={resumeData} template={template} settings={settings} sectionOrder={sectionOrder} />
          </div>

          {/* Column 3: Analytics Dashboard (col-span-3) */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
            {/* PDF export button wrapper */}
            <ExportPDFButton 
              elementId="resume-print-content" 
              filename={exportFilename} 
              onSuccess={() => addToast('Resume PDF downloaded!', 'success')}
            />

            {/* Score circle */}
            <ATSScoreCard score={score} />

            {/* Completion metrics */}
            <CompletionTracker percentage={completion} />

            {/* Checklist */}
            <RecruiterChecklist checklist={checklist} />

            {/* Insights recommendations list */}
            <ResumeInsights insights={insights} />
          </div>
        </div>
      </Container>

      {/* Floating Toast Notification alerts overlay */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </Layout>
  );
}
