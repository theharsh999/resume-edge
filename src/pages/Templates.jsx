import React, { useState, useRef } from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import { Toast } from '../components/ui/Toast';
import { FileUp, FileText, Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResumePreview } from '../components/builder/ResumePreview';
import { demoResumeData, defaultSettings, defaultOrder } from './Builder';

const LOCAL_STORAGE_KEY_TPL = 'resumeedge_template';
const LOCAL_STORAGE_KEY_TOAST = 'resumeedge_pending_toast';
const LOCAL_STORAGE_KEY_IMPORTED_FILE = 'resumeedge_imported_file';

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function Templates() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeTemplate, setActiveTemplate] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_TPL) || 'modern';
  });
  
  const [importedFile, setImportedFile] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_IMPORTED_FILE);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDragging, setIsDragging] = useState(false);
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

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['pdf', 'docx'];
    
    if (!validExtensions.includes(ext)) {
      addToast('Invalid file format. Please upload a PDF or DOCX resume.', 'warning');
      return;
    }

    const fileRef = {
      name: file.name,
      size: file.size,
      type: file.type || (ext === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
      uploadedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_IMPORTED_FILE, JSON.stringify(fileRef));
      setImportedFile(fileRef);
      addToast(`"${file.name}" imported successfully!`, 'success');
    } catch (err) {
      console.error('Failed to save file reference:', err);
      addToast('Failed to save file reference.', 'warning');
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    localStorage.removeItem(LOCAL_STORAGE_KEY_IMPORTED_FILE);
    setImportedFile(null);
    addToast('Imported resume reference unlinked.', 'info');
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 mb-20">
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

              return (
                <div
                  key={template.id}
                  onClick={() => handleSelectTemplate(template.id)}
                  className={`flex flex-col group rounded-2xl bg-surface/30 border transition-all duration-300 hover:shadow-premium-glow cursor-pointer relative overflow-hidden ${
                    activeTemplate === template.id
                      ? 'border-primary bg-primary/5 shadow-premium-glow ring-1 ring-primary/20'
                      : 'border-slate-800 hover:border-slate-700/80'
                  }`}
                >
                  {/* Template Preview Section */}
                  <div className="aspect-[3/4] w-full bg-slate-900 border-b border-slate-850 overflow-hidden relative group-hover:opacity-95 transition-all duration-300">
                    {/* Scale actual ResumePreview down */}
                    <div style={{
                      transform: 'scale(0.25)',
                      transformOrigin: 'top left',
                      width: '400%',
                      height: '400%',
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

                    {/* Active Check Badge */}
                    {activeTemplate === template.id && (
                      <div className="absolute top-4 right-4 h-7 w-7 rounded-full bg-primary flex items-center justify-center shadow-lg border border-primary-light/25 z-10">
                        <Check className="h-4 w-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="text-left space-y-1.5">
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="text-lg font-bold text-text group-hover:text-primary-light transition-colors duration-200">
                          {template.name}
                        </h3>
                        {activeTemplate === template.id && (
                          <Badge
                            variant="success"
                            className="text-[9px] py-0.5 px-2 bg-success/10 border-success/20 text-success flex items-center gap-1 font-bold tracking-wider"
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
                            className="text-[9px] py-0.5 px-2 font-bold tracking-wider uppercase"
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

          {/* Interactive Resume Import Area */}
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-left">
              <h2 className="text-xl font-bold tracking-tight text-text">Resume Import Control</h2>
              <p className="text-xs text-muted">Upload and reference your current documents inside browser storage.</p>
            </div>

            {importedFile ? (
              /* Active Linked File View */
              <div className="border border-slate-800 bg-surface/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-left shadow-2xl relative overflow-hidden animate-fade-in">
                <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-success/5 blur-2xl pointer-events-none"></div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="h-12 w-12 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6 text-success" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-text text-sm block truncate max-w-xs md:max-w-md">
                      {importedFile.name}
                    </span>
                    <span className="text-[11px] text-muted font-semibold mt-0.5 block">
                      {formatBytes(importedFile.size)} • Imported {new Date(importedFile.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Badge variant="success" className="bg-success/10 border-success/20 text-success text-[10px] py-1 px-3.5 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    File Linked
                  </Badge>
                  <button
                    onClick={handleRemoveFile}
                    type="button"
                    className="flex items-center justify-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors border border-red-500/10 hover:border-red-500/20 bg-red-950/10 px-3 py-2 rounded-xl cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                    Unlink
                  </button>
                </div>
              </div>
            ) : (
              /* Drag & Drop Upload Zone */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-4 group relative overflow-hidden ${
                  isDragging
                    ? 'border-primary bg-primary/5 shadow-premium-glow'
                    : 'border-slate-800 hover:border-slate-700/80 bg-surface/10 hover:bg-surface/20'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                  className="hidden"
                />

                <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isDragging ? 'bg-primary/20 text-primary-light' : 'bg-slate-900 text-muted group-hover:text-text border border-slate-800'
                }`}>
                  <FileUp className="h-6 w-6" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-text group-hover:text-primary-light transition-colors duration-200">
                    Import Existing Resume
                  </h3>
                  <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed font-semibold">
                    Drag and drop your PDF or DOCX file here, or <span className="text-primary-light hover:underline font-bold">browse folders</span> to link local file reference.
                  </p>
                </div>

                <div className="flex gap-2 justify-center pt-2">
                  <Badge variant="muted" className="text-[9px] font-extrabold uppercase py-0.5 px-2 bg-slate-900 border-slate-800 text-slate-400">PDF</Badge>
                  <Badge variant="muted" className="text-[9px] font-extrabold uppercase py-0.5 px-2 bg-slate-900 border-slate-800 text-slate-400">DOCX</Badge>
                </div>
              </div>
            )}
          </div>
        </Section>
      </Container>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </Layout>
  );
}
