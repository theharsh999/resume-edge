import { useState, useEffect, useMemo } from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/Badge';
import { ResumeForm } from '../components/builder/ResumeForm';
import { ResumePreview } from '../components/builder/ResumePreview';
import { Toast } from '../components/ui/Toast';
import { defaultState, defaultSettings, defaultOrder, demoResumeData } from '../utils/constants';

// Analytics dashboard widgets
import { ATSScoreCard } from '../components/builder/ATSScoreCard';
import { ResumeInsights } from '../components/builder/ResumeInsights';
import { CompletionTracker } from '../components/builder/CompletionTracker';
import { RecruiterChecklist } from '../components/builder/RecruiterChecklist';
import { ExportPDFButton } from '../components/builder/ExportPDFButton';

import { Trash2, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOCAL_STORAGE_KEY_DATA = 'resumeedge_data';
const LOCAL_STORAGE_KEY_TPL = 'resumeedge_template';
const LOCAL_STORAGE_KEY_SETTINGS = 'resumeedge_settings';
const LOCAL_STORAGE_KEY_ORDER = 'resumeedge_section_order';
const LOCAL_STORAGE_KEY_PENDING_TOAST = 'resumeedge_pending_toast';

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

  const [toasts, setToasts] = useState([]);

  const [showOnboarding, setShowOnboarding] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        const isEmpty = !parsed.personal?.fullName &&
          !parsed.summary &&
          (!parsed.skills || parsed.skills.length === 0) &&
          (!parsed.experience || parsed.experience.length === 0) &&
          (!parsed.education || parsed.education.length === 0) &&
          (!parsed.projects || parsed.projects.length === 0);
        return isEmpty;
      }
      return true;
    } catch {
      return true;
    }
  });

  const addToast = (message, type = 'success') => {
    setToasts((prev) => [...prev, { id: prev.length ? Math.max(...prev.map(t => t.id)) + 1 : 1, message, type }]);
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
        Promise.resolve().then(() => {
          addToast(parsed.message, parsed.type);
        });
        localStorage.removeItem(LOCAL_STORAGE_KEY_PENDING_TOAST);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync state variables to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(resumeData));
    } catch (e) {
      console.warn('LocalStorage write blocked:', e);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_TPL, template);
    } catch (e) {
      console.warn('LocalStorage write blocked:', e);
    }
  }, [template]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('LocalStorage write blocked:', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ORDER, JSON.stringify(sectionOrder));
    } catch (e) {
      console.warn('LocalStorage write blocked:', e);
    }
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
    setShowOnboarding(false);
    addToast('Demo developer resume loaded!', 'info');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear the workspace? This will reset all editing progress.')) {
      setResumeData(defaultState);
      setTemplate('modern');
      setSettings(defaultSettings);
      setSectionOrder(defaultOrder);
      setShowOnboarding(true);

      localStorage.removeItem(LOCAL_STORAGE_KEY_DATA);
      localStorage.removeItem(LOCAL_STORAGE_KEY_TPL);
      localStorage.removeItem(LOCAL_STORAGE_KEY_SETTINGS);
      localStorage.removeItem(LOCAL_STORAGE_KEY_ORDER);

      addToast('Workspace data cleared!', 'info');
    }
  };

  const handleStartFromScratch = () => {
    setResumeData(defaultState);
    setShowOnboarding(false);
    addToast('New workspace initialized!', 'success');
  };

  // Programmatic calculations for builder analytics
  const score = useMemo(() => {
    let pts = 0;
    const p = resumeData.personal || {};
    
    // Personal Info check: +15 max
    if (p.fullName) pts += 3;
    if (p.email) pts += 3;
    if (p.phone) pts += 3;
    if (p.location) pts += 2;
    if (p.linkedin) pts += 2;
    if (p.github) pts += 2;

    // Summary statement check: +15 max
    const summaryLen = (resumeData.summary || '').trim().length;
    if (summaryLen >= 80) pts += 15;
    else if (summaryLen > 0) pts += 10;

    // Technical skills count: +20 max
    const skillsCount = (resumeData.skills || []).length;
    if (skillsCount >= 5) pts += 20;
    else if (skillsCount > 0) pts += 10;

    // Education details: +15 max
    const eduCount = (resumeData.education || []).length;
    if (eduCount >= 1) pts += 15;

    // Experience logs: +20 max
    const expCount = (resumeData.experience || []).length;
    if (expCount >= 2) pts += 20;
    else if (expCount === 1) pts += 10;

    // Projects showcases: +15 max
    const projCount = (resumeData.projects || []).length;
    if (projCount >= 2) pts += 15;
    else if (projCount === 1) pts += 10;

    return pts;
  }, [resumeData]);

  const completion = useMemo(() => {
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
  }, [resumeData]);

  const insights = useMemo(() => {
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
  }, [resumeData]);

  const checklist = useMemo(() => {
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
  }, [resumeData]);

  const exportFilename = useMemo(() => {
    const nameStr = (resumeData.personal && resumeData.personal.fullName || 'Candidate').trim();
    return `ResumeEdge-${nameStr.replace(/\s+/g, '_')}.pdf`;
  }, [resumeData.personal]);

  return (
    <Layout>
      <Container className="py-8">
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-900 pb-6">
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
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Load Demo Resume */}
            <button
              onClick={handleLoadDemo}
              type="button"
              className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-surface hover:bg-slate-800 text-text border border-slate-800 hover:border-slate-700 px-4 py-2 rounded-lg transition-all active:scale-[0.98] shrink-0 cursor-pointer h-9 animate-fade-in"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary-light" />
              Load Demo
            </button>

            {/* Export PDF Button wrapper */}
            {!showOnboarding && (
              <ExportPDFButton 
                elementId="resume-print-content" 
                filename={exportFilename} 
                onSuccess={() => addToast('PDF exported successfully!', 'success')}
                onError={(msg) => addToast(msg, 'warning')}
                className="h-9 px-4 text-xs font-semibold shrink-0"
              />
            )}

            {/* Clear Workspace button */}
            {!showOnboarding && (
              <button
                onClick={handleClearAll}
                type="button"
                className="flex items-center justify-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors border border-red-500/10 hover:border-red-500/20 bg-red-950/10 px-3 py-1.5 rounded-lg shrink-0 cursor-pointer h-9 animate-fade-in"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear Workspace
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6 text-left">
            {showOnboarding ? (
              <div className="bg-surface border border-slate-800 rounded-2xl p-6 space-y-5 text-left shadow-2xl relative overflow-hidden animate-fade-in">
                {/* Visual light glow */}
                <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary/15 blur-3xl pointer-events-none"></div>
                
                {/* Onboarding Header */}
                <div className="space-y-1 relative z-10">
                  <Badge variant="primary" className="mb-1">Getting Started</Badge>
                  <h3 className="text-xl font-bold tracking-tight text-text">Welcome to ResumeEdge</h3>
                  <p className="text-xs text-muted leading-relaxed font-semibold">
                    Create ATS-friendly resumes in minutes. Choose how you want to start building.
                  </p>
                </div>

                {/* Onboarding Action Buttons */}
                <div className="flex flex-col gap-2 relative z-10">
                  <button
                    onClick={handleStartFromScratch}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold bg-slate-950/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl transition-all text-text active:scale-[0.98] cursor-pointer"
                  >
                    Start From Scratch
                  </button>

                  <button
                    onClick={handleLoadDemo}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold bg-primary hover:bg-primary-dark text-text border border-primary-light/25 shadow-premium-glow hover:shadow-premium-glow-hover px-4 py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                    Load Demo Resume
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <ResumeForm 
                  data={resumeData} 
                  onDataChange={setResumeData} 
                  template={template}
                  onTemplateChange={handleTemplateChange}
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                  sectionOrder={sectionOrder}
                  onReorderSections={handleReorderSections}
                />
              </div>
            )}
          </div>

          {/* Column 2: Live Sticky Preview (col-span-8) */}
          <div className="lg:col-span-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1 preview-scroll-container flex flex-col">
            <div className="w-full">
              <ResumePreview data={resumeData} template={template} settings={settings} sectionOrder={sectionOrder} />
            </div>
          </div>
        </div>

        {/* Bottom Area: Dedicated Analytics Dashboard */}
        {!showOnboarding && (
          <>
            {/* Separator */}
            <div className="border-t border-slate-900 my-16"></div>

            <div className="space-y-8 animate-fade-in">
              <div className="text-left space-y-2">
                <Badge variant="secondary">Resume Intelligence</Badge>
                <h2 className="text-2xl font-bold tracking-tight text-text">Recruiter & ATS Optimization</h2>
                <p className="text-muted text-xs md:text-sm font-medium">Real-time grading, automated checklist items, and expert improvements feedback.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
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
          </>
        )}
      </Container>

      {/* Floating Toast Notification alerts overlay */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </Layout>
  );
}
