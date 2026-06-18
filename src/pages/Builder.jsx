import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/Badge';
import { ResumeForm } from '../components/builder/ResumeForm';
import { ResumePreview } from '../components/builder/ResumePreview';
import { Toast } from '../components/ui/Toast';
import { extractTextFromPdf, extractTextFromDocx, parseResumeText, convertDocxToHtml } from '../utils/parser';

// Analytics dashboard widgets
import { ATSScoreCard } from '../components/builder/ATSScoreCard';
import { ResumeInsights } from '../components/builder/ResumeInsights';
import { CompletionTracker } from '../components/builder/CompletionTracker';
import { RecruiterChecklist } from '../components/builder/RecruiterChecklist';
import { ExportPDFButton } from '../components/builder/ExportPDFButton';

import { Trash2, ArrowLeft, Sparkles, FileUp, FileText, Check, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
import { Link } from 'react-router-dom';

const LOCAL_STORAGE_KEY_DATA = 'resumeedge_data';
const LOCAL_STORAGE_KEY_TPL = 'resumeedge_template';
const LOCAL_STORAGE_KEY_SETTINGS = 'resumeedge_settings';
const LOCAL_STORAGE_KEY_ORDER = 'resumeedge_section_order';
const LOCAL_STORAGE_KEY_PENDING_TOAST = 'resumeedge_pending_toast';
const LOCAL_STORAGE_KEY_IMPORTED_FILE = 'resumeedge_imported_file';

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

function PdfCanvasViewer({ fileUrl }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!fileUrl) return;

    let isMounted = true;
    setLoading(true);
    setPages([]);

    const renderPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: fileUrl });
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;

        const renderedPages = [];
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          renderedPages.push(pageNum);
        }
        setPages(renderedPages);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF for canvas rendering:', err);
        if (isMounted) setLoading(false);
      }
    };

    renderPdf();

    return () => {
      isMounted = false;
    };
  }, [fileUrl]);

  return (
    <div className="w-full flex flex-col gap-6 items-center py-6 bg-slate-950/20 rounded-xl overflow-y-auto max-h-[80vh] border border-slate-800/60" ref={containerRef}>
      {loading && (
        <div className="text-xs font-semibold text-muted py-16 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Loading document pages...
        </div>
      )}
      {!loading && pages.map((pageNum) => (
        <PdfPageCanvas key={pageNum} fileUrl={fileUrl} pageNum={pageNum} />
      ))}
    </div>
  );
}

function PdfPageCanvas({ fileUrl, pageNum }) {
  const canvasRef = useRef(null);
  const [renderStatus, setRenderStatus] = useState('idle'); // 'idle' | 'rendering' | 'success' | 'error'

  useEffect(() => {
    let isMounted = true;

    const renderPage = async () => {
      try {
        setRenderStatus('rendering');
        const loadingTask = pdfjsLib.getDocument({ url: fileUrl });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(pageNum);
        
        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;
        if (isMounted) setRenderStatus('success');
      } catch (err) {
        console.error(`Error rendering PDF page ${pageNum}:`, err);
        if (isMounted) setRenderStatus('error');
      }
    };

    renderPage();

    return () => {
      isMounted = false;
    };
  }, [fileUrl, pageNum]);

  return (
    <div className="bg-white p-3 rounded-xl shadow-premium border border-slate-200 w-[95%] max-w-[700px] shrink-0 flex flex-col items-center justify-center relative min-h-[300px]">
      {renderStatus === 'rendering' && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 rounded-lg">
          <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-auto rounded-md block bg-white" />
    </div>
  );
}

function DocxHtmlViewer({ htmlContent }) {
  return (
    <div className="w-full flex flex-col gap-6 items-center py-6 bg-slate-950/20 rounded-xl overflow-y-auto max-h-[80vh] border border-slate-800/60">
      <div className="bg-white p-10 rounded-xl shadow-premium border border-slate-200 w-[95%] max-w-[700px] shrink-0 text-slate-800 text-left docx-preview-container animate-fade-in min-h-[80vh]">
        <style>{`
          .docx-preview-container h1, .docx-preview-container h2, .docx-preview-container h3 {
            font-weight: 700;
            color: #0f172a;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
          }
          .docx-preview-container h1 { font-size: 1.75rem; border-b: 1px solid #e2e8f0; padding-bottom: 0.25rem; }
          .docx-preview-container h2 { font-size: 1.25rem; }
          .docx-preview-container p { margin-bottom: 0.75rem; line-height: 1.6; }
          .docx-preview-container ul, .docx-preview-container ol { margin-left: 1.5rem; margin-bottom: 1rem; list-style-type: disc; }
          .docx-preview-container li { margin-bottom: 0.25rem; }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
}

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

export const defaultSettings = {
  primaryColor: 'indigo',
  fontFamily: 'Inter',
  density: 'balanced'
};

export const defaultOrder = ['summary', 'skills', 'experience', 'projects', 'education'];

export const demoResumeData = {
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
  const [showOnboarding, setShowOnboarding] = useState(true);
  const fileInputRef = useRef(null);

  const [importedFile, setImportedFile] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_IMPORTED_FILE);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [importedFileUrl, setImportedFileUrl] = useState(null);
  const [importedFileType, setImportedFileType] = useState(null);
  const [docxHtml, setDocxHtml] = useState(() => {
    return localStorage.getItem('resumeedge_imported_file_docx_html') || '';
  });

  const [appMode, setAppMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('resumeedge_app_mode');
      const savedFile = localStorage.getItem(LOCAL_STORAGE_KEY_IMPORTED_FILE);
      if (savedFile) {
        return savedMode || 'import';
      }
      return 'builder';
    } catch {
      return 'builder';
    }
  });

  useEffect(() => {
    localStorage.setItem('resumeedge_app_mode', appMode);
  }, [appMode]);

  useEffect(() => {
    const base64 = localStorage.getItem('resumeedge_imported_file_data');
    const type = localStorage.getItem('resumeedge_imported_file_type') || '';
    if (base64) {
      try {
        const blob = dataURLtoBlob(base64);
        const url = URL.createObjectURL(blob);
        setImportedFileUrl(url);
        setImportedFileType(type);
      } catch (e) {
        console.error('Failed to restore imported file blob:', e);
      }
    } else {
      setImportedFileUrl(null);
      setImportedFileType(null);
    }
  }, [importedFile]);

  useEffect(() => {
    return () => {
      if (importedFileUrl) {
        URL.revokeObjectURL(importedFileUrl);
      }
    };
  }, [importedFileUrl]);

  const handleImportFile = async (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
      addToast('Invalid file format. Please upload a PDF or DOCX file.', 'warning');
      return;
    }

    try {
      addToast('Reading file...', 'info');
      await new Promise(r => setTimeout(r, 400));
      
      addToast('Extracting content...', 'info');
      await new Promise(r => setTimeout(r, 400));

      let text = '';
      if (ext === 'pdf') {
        text = await extractTextFromPdf(file);
      } else {
        text = await extractTextFromDocx(file);
      }

      if (!text || text.trim().length === 0) {
        throw new Error('The file contains no readable text.');
      }

      // Save raw text to localStorage for later parsing in Edit Mode
      localStorage.setItem('resumeedge_imported_file_text', text);

      let htmlContent = '';
      if (ext === 'docx') {
        try {
          htmlContent = await convertDocxToHtml(file);
          setDocxHtml(htmlContent);
          localStorage.setItem('resumeedge_imported_file_docx_html', htmlContent);
        } catch (docxErr) {
          console.error('Failed to convert docx to html:', docxErr);
        }
      }

      const base64Data = await fileToBase64(file);
      localStorage.setItem('resumeedge_imported_file_data', base64Data);
      localStorage.setItem('resumeedge_imported_file_type', file.type || ext);

      const fileRef = {
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      localStorage.setItem(LOCAL_STORAGE_KEY_IMPORTED_FILE, JSON.stringify(fileRef));
      setImportedFile(fileRef);
      setAppMode('import');
      setShowOnboarding(false);
      addToast('Resume uploaded successfully.', 'success');
    } catch (error) {
      console.error('Import failed:', error);
      addToast(`Import failed: ${error.message || 'Corrupted or unreadable file.'}`, 'warning');
    }
  };

  const handleEnterEditMode = () => {
    const text = localStorage.getItem('resumeedge_imported_file_text') || '';
    
    // Parse raw text into fields confidently without default templates
    const parsedData = parseResumeText(text);

    setResumeData(parsedData);
    setAppMode('edit');
    localStorage.setItem('resumeedge_app_mode', 'edit');

    const hasAnyExtracted = 
      parsedData.personal.fullName ||
      parsedData.personal.role ||
      parsedData.personal.email ||
      parsedData.personal.phone ||
      parsedData.personal.location ||
      parsedData.personal.linkedin ||
      parsedData.personal.github ||
      parsedData.summary ||
      (parsedData.skills && parsedData.skills.length > 0) ||
      (parsedData.experience && parsedData.experience.length > 0) ||
      (parsedData.education && parsedData.education.length > 0) ||
      (parsedData.projects && parsedData.projects.length > 0);

    if (hasAnyExtracted) {
      addToast('Resume imported. Some fields may require manual review.', 'success');
    } else {
      addToast('Resume uploaded successfully. Structured data could not be extracted.', 'warning');
    }
  };

  const handleRemoveImport = (e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to remove the imported resume? This will clear the workspace.')) {
      localStorage.removeItem(LOCAL_STORAGE_KEY_IMPORTED_FILE);
      localStorage.removeItem('resumeedge_imported_file_data');
      localStorage.removeItem('resumeedge_imported_file_type');
      localStorage.removeItem('resumeedge_imported_file_docx_html');
      localStorage.removeItem('resumeedge_imported_file_text');
      setImportedFile(null);
      setDocxHtml('');
      setAppMode('builder');
      setResumeData(defaultState);
      setShowOnboarding(true);
      addToast('Imported resume removed.', 'info');
    }
  };

  const isEmptyData = 
    !resumeData.personal.fullName && 
    !resumeData.summary && 
    (resumeData.skills || []).length === 0 && 
    (resumeData.experience || []).length === 0 && 
    (resumeData.education || []).length === 0 && 
    (resumeData.projects || []).length === 0;

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
    setAppMode('builder');
    setShowOnboarding(false);
    addToast('Demo developer resume loaded!', 'info');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all resume information?')) {
      setResumeData(defaultState);
      setTemplate('modern');
      setSettings(defaultSettings);
      setSectionOrder(defaultOrder);
      localStorage.removeItem(LOCAL_STORAGE_KEY_IMPORTED_FILE);
      localStorage.removeItem('resumeedge_imported_file_data');
      localStorage.removeItem('resumeedge_imported_file_type');
      localStorage.removeItem('resumeedge_imported_file_docx_html');
      localStorage.removeItem('resumeedge_imported_file_text');
      setImportedFile(null);
      setDocxHtml('');
      setAppMode('builder');
      setShowOnboarding(true);
      addToast('Workspace data cleared!', 'info');
    }
  };

  const renderImportedCard = (showEditButton) => {
    if (!importedFile) return null;
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden shadow-lg mb-6 text-left">
        <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-bl-full pointer-events-none blur-xl"></div>
        
        <div>
          <Badge variant="primary" className="mb-2">Imported Resume</Badge>
          <div className="flex items-center gap-2.5 min-w-0">
            <FileText className="h-5 w-5 text-primary shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-bold text-text truncate max-w-[220px]" title={importedFile.name}>
                {importedFile.name}
              </div>
              <div className="text-xs text-muted font-medium mt-1">
                Size: {formatBytes(importedFile.size)}
              </div>
              <div className="text-xs text-muted font-medium mt-0.5">
                Imported On: {new Date(importedFile.uploadedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
          {showEditButton && (
            <button
              onClick={handleEnterEditMode}
              type="button"
              className="flex-grow min-w-[100px] flex items-center justify-center gap-1.5 text-xs font-bold bg-primary hover:bg-primary-dark text-text border border-primary-light/20 px-3 py-2 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" />
              Edit Resume
            </button>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            className="flex-grow min-w-[100px] flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-text border border-slate-700 px-3 py-2 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            Replace Resume
          </button>
          <button
            onClick={handleRemoveImport}
            type="button"
            className="flex-grow min-w-[100px] flex items-center justify-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-350 bg-red-950/20 hover:bg-red-950/30 border border-red-500/10 px-3 py-2 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove Resume
          </button>
        </div>
      </div>
    );
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
  }, [resumeData.personal.fullName]);

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
              className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-surface hover:bg-slate-800 text-text border border-slate-800 hover:border-slate-700 px-4 py-2 rounded-lg transition-all active:scale-[0.98] shrink-0 cursor-pointer h-9"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary-light" />
              Load Demo
            </button>

            {/* Export PDF Button wrapper */}
            <ExportPDFButton 
              elementId="resume-print-content" 
              filename={exportFilename} 
              onSuccess={() => addToast('PDF exported successfully!', 'success')}
              onError={(msg) => addToast(msg, 'warning')}
              disabled={isEmptyData}
              className="h-9 px-4 text-xs font-semibold shrink-0"
            />

            {/* Clear Workspace button */}
            {(!isEmptyData || importedFile) && (
              <button
                onClick={handleClearAll}
                type="button"
                className="flex items-center justify-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors border border-red-500/10 hover:border-red-500/20 bg-red-950/10 px-3 py-1.5 rounded-lg shrink-0 cursor-pointer h-9"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear Workspace
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            {isEmptyData && showOnboarding ? (
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

                {/* Compact Action Buttons */}
                <div className="flex flex-col gap-2 relative z-10">
                  <button
                    onClick={() => {
                      setShowOnboarding(false);
                      setAppMode('builder');
                    }}
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

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold bg-slate-900 hover:bg-slate-850 text-text border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <FileUp className="h-3.5 w-3.5 text-secondary-light" />
                    Import Existing Resume
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                {appMode === 'import' && importedFile ? (
                  renderImportedCard(true)
                ) : (
                  <>
                    {importedFile && renderImportedCard(false)}
                    {!importedFile && (
                      <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-center gap-2">
                          <FileUp className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold text-muted">Have an existing resume?</span>
                        </div>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          type="button"
                          className="text-xs font-bold text-primary-light hover:text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30 px-3 py-1.5 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
                        >
                          Import File
                        </button>
                      </div>
                    )}
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
                  </>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Live Sticky Preview (col-span-8) */}
          <div className="lg:col-span-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1 preview-scroll-container flex flex-col">
            {appMode === 'import' && importedFile ? (
              <div className="w-full flex flex-col flex-grow">
                {/* Top Section */}
                <div className="flex justify-between items-center gap-4 mb-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 shrink-0 text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">📄</span>
                    <div>
                      <h4 className="text-xs font-bold text-text">Uploaded Resume</h4>
                      <p className="text-[10px] text-muted font-medium mt-0.5">Viewing original uploaded document</p>
                    </div>
                  </div>
                  <button
                    onClick={handleEnterEditMode}
                    type="button"
                    className="text-xs font-bold bg-primary hover:bg-primary-dark text-text border border-primary-light/20 px-4 py-2 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Edit Resume
                  </button>
                </div>

                {/* PDF/DOCX Viewer */}
                <div className="w-full flex-grow">
                  {importedFileType?.includes('pdf') || importedFile?.name.toLowerCase().endsWith('.pdf') ? (
                    <PdfCanvasViewer fileUrl={importedFileUrl} />
                  ) : docxHtml ? (
                    <DocxHtmlViewer htmlContent={docxHtml} />
                  ) : (
                    <div className="w-full h-[80vh] border border-slate-800 rounded-xl bg-slate-900/40 flex flex-col items-center justify-center p-8 text-center text-muted animate-fade-in">
                      <FileText className="h-12 w-12 text-muted mb-4" />
                      <p className="font-bold text-text mb-1">Document Viewer</p>
                      <p className="text-xs max-w-xs leading-relaxed">The uploaded document preview is ready. Click "Edit Resume" to begin editing.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Template preview is rendered offscreen when in import mode, so PDF export can always capture it */}
            <div className={appMode === 'import' && importedFile ? 'absolute left-[-9999px] top-0 w-full' : 'w-full'}>
              <ResumePreview data={resumeData} template={template} settings={settings} sectionOrder={sectionOrder} />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-900 my-16"></div>

        {/* Bottom Area: Dedicated Analytics Dashboard */}
        <div className="space-y-8">
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleImportFile(e.target.files[0]);
            }
          }}
          accept=".pdf,.docx"
          className="hidden"
        />
      </Container>

      {/* Floating Toast Notification alerts overlay */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </Layout>
  );
}
