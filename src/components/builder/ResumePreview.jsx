import { useMemo } from 'react';
import { Badge } from '../ui/Badge';
import { Mail, Phone, MapPin, Linkedin, Github, FileText } from 'lucide-react';

export function ResumePreview({ 
  data, 
  template = 'modern',
  settings = { primaryColor: 'indigo', fontFamily: 'Inter', density: 'balanced' },
  sectionOrder = ['summary', 'skills', 'experience', 'projects', 'education']
}) {
  const {
    personal = {},
    summary = '',
    skills = [],
    education = [],
    experience = [],
    projects = []
  } = data;

  const hasPersonal = personal.fullName || personal.email || personal.phone || personal.location || personal.linkedin || personal.github || personal.role;
  const hasSummary = summary && summary.trim().length > 0;
  const hasSkills = skills && skills.length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;

  // Primary Theme Colors Map (Optimized for light background paper)
  const themeColors = {
    indigo: {
      text: 'text-indigo-600',
      textLight: 'text-indigo-500',
      border: 'border-indigo-100',
      borderSolid: 'border-indigo-600',
      bg: 'bg-indigo-50/60',
      bullet: 'text-indigo-600',
    },
    blue: {
      text: 'text-blue-600',
      textLight: 'text-blue-500',
      border: 'border-blue-100',
      borderSolid: 'border-blue-600',
      bg: 'bg-blue-50/60',
      bullet: 'text-blue-600',
    },
    emerald: {
      text: 'text-emerald-600',
      textLight: 'text-emerald-500',
      border: 'border-emerald-100',
      borderSolid: 'border-emerald-600',
      bg: 'bg-emerald-50/60',
      bullet: 'text-emerald-600',
    },
    rose: {
      text: 'text-rose-600',
      textLight: 'text-rose-500',
      border: 'border-rose-100',
      borderSolid: 'border-rose-600',
      bg: 'bg-rose-50/60',
      bullet: 'text-rose-600',
    },
    amber: {
      text: 'text-amber-600',
      textLight: 'text-amber-700',
      border: 'border-amber-100',
      borderSolid: 'border-amber-600',
      bg: 'bg-amber-50/60',
      bullet: 'text-amber-600',
    }
  };

  const colors = themeColors[settings.primaryColor || 'indigo'] || themeColors.indigo;

  // Spacing Densities Map
  const densityStyles = {
    comfortable: {
      padding: 'p-8 md:p-10',
      spacing: 'space-y-7',
      itemSpacing: 'space-y-5',
      sectionSpacing: 'space-y-3'
    },
    balanced: {
      padding: 'p-6 md:p-8',
      spacing: 'space-y-5',
      itemSpacing: 'space-y-4',
      sectionSpacing: 'space-y-2'
    },
    compact: {
      padding: 'p-4 md:p-5',
      spacing: 'space-y-3.5',
      itemSpacing: 'space-y-2.5',
      sectionSpacing: 'space-y-1.5'
    }
  };

  const density = densityStyles[settings.density || 'balanced'] || densityStyles.balanced;

  // Font family loader
  const fontStyle = {
    fontFamily: settings.fontFamily === 'Poppins'
      ? 'Poppins, sans-serif'
      : settings.fontFamily === 'Roboto'
      ? 'Roboto, sans-serif'
      : 'Inter, sans-serif'
  };

  // Section Renders
  const renderSummary = () => (
    <div key="summary" className={density.sectionSpacing}>
      <h4 className={`text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-0.5`}>
        Professional Summary
      </h4>
      <p className="text-[11px] text-slate-700 leading-relaxed font-medium">{summary}</p>
    </div>
  );

  const renderSkills = (asList = true) => {
    if (!hasSkills) return null;
    return (
      <div key="skills" className={density.sectionSpacing}>
        <h4 className={`text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-0.5`}>
          Skills
        </h4>
        {asList ? (
          <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
            {skills.join(', ')}
          </p>
        ) : (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {skills.map((skill, idx) => (
              <Badge key={idx} variant="muted" className="text-[9px] bg-slate-100 border-slate-200 py-0.5 px-2 font-medium text-slate-700">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderExperience = (showBullets = true) => (
    <div key="experience" className={density.sectionSpacing}>
      <h4 className={`text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-0.5`}>
        Experience
      </h4>
      <div className={density.itemSpacing}>
        {experience.map((exp, idx) => (
          <div key={idx} className="text-[11px]">
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-slate-900">{exp.company}</span>
              <span className="text-[10px] text-slate-500 font-medium">{exp.startDate} – {exp.endDate}</span>
            </div>
            <div className={`${colors.textLight} font-semibold`}>{exp.role}</div>
            {exp.description && (
              <p className="text-[10px] text-slate-600 mt-1 leading-relaxed whitespace-pre-line font-medium">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div key="projects" className={density.sectionSpacing}>
      <h4 className={`text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-0.5`}>
        Projects
      </h4>
      <div className={density.itemSpacing}>
        {projects.map((proj, idx) => (
          <div key={idx} className="text-[11px]">
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-slate-900">{proj.projectName}</span>
              {proj.githubLink && (
                <span className={`text-[10px] ${colors.text} hover:underline font-semibold`}>
                  {proj.githubLink.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                </span>
              )}
            </div>
            {proj.techStack && (
              <div className="text-[10px] text-slate-500 font-semibold mt-0.5">Tech Stack: {proj.techStack}</div>
            )}
            {proj.description && (
              <p className="text-[10px] text-slate-600 mt-1 leading-relaxed font-medium">
                {proj.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div key="education" className={density.sectionSpacing}>
      <h4 className={`text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-0.5`}>
        Education
      </h4>
      <div className="space-y-2">
        {education.map((edu, idx) => (
          <div key={idx} className="flex justify-between items-baseline text-[11px]">
            <div>
              <span className="font-bold text-slate-900">{edu.degree}</span>
              <span className="text-slate-500 block text-[10px] font-semibold">{edu.college}</span>
            </div>
            <span className="text-[10px] text-slate-500 shrink-0 font-medium">{edu.startYear} – {edu.endYear}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSection = (sectionId, asList = true) => {
    switch(sectionId) {
      case 'summary': return hasSummary ? renderSummary() : null;
      case 'skills': return hasSkills ? renderSkills(asList) : null;
      case 'experience': return hasExperience ? renderExperience() : null;
      case 'projects': return hasProjects ? renderProjects() : null;
      case 'education': return hasEducation ? renderEducation() : null;
      default: return null;
    }
  };

  // Modern Template (Asymmetric columns)
  const renderModernTemplate = () => (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left Sidebar */}
      <div className="w-full md:w-[32%] border-b md:border-b-0 md:border-r border-slate-200 p-5 space-y-5 shrink-0 bg-slate-50">
        {/* Contact info */}
        <div className="space-y-3 text-left">
          <h4 className={`text-[10px] font-bold ${colors.text} uppercase tracking-wider border-b border-slate-200 pb-1 font-semibold`}>Contact</h4>
          <div className="space-y-2.5 text-[11px] break-all font-medium text-slate-700">
            {personal.email && <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" /><span>{personal.email}</span></div>}
            {personal.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" /><span>{personal.phone}</span></div>}
            {personal.location && <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" /><span>{personal.location}</span></div>}
            {personal.linkedin && <div className="flex items-center gap-2"><Linkedin className="h-3.5 w-3.5 text-slate-400 shrink-0" /><span className="truncate">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
            {personal.github && <div className="flex items-center gap-2"><Github className="h-3.5 w-3.5 text-slate-400 shrink-0" /><span className="truncate">{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
          </div>
        </div>

        {/* Skills sidebar */}
        <div className="space-y-3 text-left">
          <h4 className={`text-[10px] font-bold ${colors.text} uppercase tracking-wider border-b border-slate-200 pb-1 font-semibold`}>Skills</h4>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {skills.map((s, idx) => (
              <Badge key={idx} variant="muted" className="text-[9px] bg-slate-100 border-slate-200 py-0.5 px-2 font-medium text-slate-700">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column Body */}
      <div className={`flex-grow ${density.padding} ${density.spacing}`}>
        <div className="space-y-1 text-left border-b border-slate-200 pb-3">
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-xs ${colors.text} font-bold tracking-wide uppercase`}>{personal.role || 'Professional Role'}</p>
        </div>
        {/* Render sections in custom order (excluding skills which is in sidebar) */}
        {sectionOrder.filter(id => id !== 'skills').map(id => renderSection(id))}
      </div>
    </div>
  );

  // Professional Template (Serif elegant centered style)
  const renderProfessionalTemplate = () => (
    <div className={`font-serif ${density.padding} ${density.spacing}`}>
      <div className="text-center border-b border-slate-200 pb-3 space-y-1.5">
        <h3 className="text-2xl font-semibold tracking-wide text-slate-900">{personal.fullName || 'Your Name'}</h3>
        <p className={`text-xs italic ${colors.text} font-semibold tracking-wide`}>{personal.role || 'Professional Role'}</p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-slate-500 font-medium font-sans">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && (
            <>
              <span className="text-slate-300">|</span>
              <span>{personal.phone}</span>
            </>
          )}
          {personal.location && (
            <>
              <span className="text-slate-300">|</span>
              <span>{personal.location}</span>
            </>
          )}
          {personal.linkedin && (
            <>
              <span className="text-slate-300">|</span>
              <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
          {personal.github && (
            <>
              <span className="text-slate-300">|</span>
              <span>{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
        </div>
      </div>
      {sectionOrder.map(id => renderSection(id, true))}
    </div>
  );

  // Minimal Template (Clean compact columns)
  const renderMinimalTemplate = () => (
    <div className={`${density.padding} ${density.spacing}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-2">
        <div className="space-y-0.5 text-left">
          <h3 className="text-xl font-bold tracking-tight text-slate-900">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-xs ${colors.text} font-bold tracking-wide`}>{personal.role || 'Professional Role'}</p>
        </div>
        <div className="flex flex-col text-left sm:text-right text-[10px] text-slate-550 space-y-0.5 font-medium shrink-0">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>
      {sectionOrder.map(id => renderSection(id, false))}
    </div>
  );

  // Creative Template (Highlight side borders, clean cards, design-centric)
  const renderCreativeTemplate = () => (
    <div className="flex flex-col md:flex-row h-full">
      {/* Side Column with custom border */}
      <div className={`w-full md:w-[30%] p-5 space-y-5 bg-slate-50 border-r border-slate-200 relative`}>
        {/* Color accent bar */}
        <div className={`absolute top-0 left-0 bottom-0 w-1 ${colors.bg} bg-opacity-100 ${colors.borderSolid} border-l-4`}></div>
        
        <div className="space-y-3 text-left pl-1">
          <h4 className={`text-[10px] font-bold ${colors.text} uppercase tracking-widest font-semibold`}>Details</h4>
          <div className="space-y-3 text-[10px] text-slate-700 font-medium">
            {personal.email && <div><p className="text-slate-400 text-[8px] uppercase tracking-wider font-semibold">Email</p><span className="break-all">{personal.email}</span></div>}
            {personal.phone && <div><p className="text-slate-400 text-[8px] uppercase tracking-wider font-semibold">Phone</p><span>{personal.phone}</span></div>}
            {personal.location && <div><p className="text-slate-400 text-[8px] uppercase tracking-wider font-semibold">Address</p><span>{personal.location}</span></div>}
            {personal.linkedin && <div><p className="text-slate-400 text-[8px] uppercase tracking-wider font-semibold">LinkedIn</p><span className="break-all">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
            {personal.github && <div><p className="text-slate-400 text-[8px] uppercase tracking-wider font-semibold">GitHub</p><span className="break-all">{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
          </div>
        </div>

        {/* Skills pill list */}
        <div className="space-y-3 text-left pl-1">
          <h4 className={`text-[10px] font-bold ${colors.text} uppercase tracking-widest font-semibold`}>Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.map((s, idx) => (
              <span key={idx} className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className={`flex-grow ${density.padding} ${density.spacing}`}>
        <div className="text-left border-b border-slate-200 pb-3">
          <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-xs ${colors.textLight} font-bold tracking-widest uppercase mt-0.5`}>{personal.role || 'Professional Role'}</p>
        </div>
        {sectionOrder.filter(id => id !== 'skills').map(id => renderSection(id))}
      </div>
    </div>
  );

  // Executive Template (Heavy corporate layouts, formal italics)
  const renderExecutiveTemplate = () => (
    <div className={`p-6 md:p-8 space-y-5 font-serif text-slate-700 border-t-4 ${colors.borderSolid}`}>
      <div className="text-left flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-200 pb-4 gap-3">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold tracking-wide text-slate-900">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>{personal.role || 'Professional Role'}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-500 font-sans text-left sm:text-right font-medium shrink-0">
          {personal.email && <span>Email: {personal.email}</span>}
          {personal.phone && <span>Tel: {personal.phone}</span>}
          {personal.location && <span>Loc: {personal.location}</span>}
          {personal.linkedin && <span>LinkedIn: {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
        </div>
      </div>

      {sectionOrder.map(id => renderSection(id, true))}
    </div>
  );

  // Compact Template (High density grids, optimized margins)
  const renderCompactTemplate = () => (
    <div className={`p-4 md:p-5 ${density.spacing} font-sans`}>
      {/* Header Compact */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-slate-200 pb-2.5 gap-1.5">
        <div className="text-left">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 inline-block mr-3">{personal.fullName || 'Your Name'}</h3>
          <span className={`text-[10px] ${colors.textLight} font-bold uppercase tracking-wider`}>{personal.role || 'Professional Role'}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-[9px] text-slate-500 font-semibold">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
        </div>
      </div>

      {sectionOrder.map(id => renderSection(id, true))}
    </div>
  );

  return (
    <div className="w-full bg-slate-900 dark:bg-slate-900 border border-slate-800 dark:border-slate-800 rounded-2xl shadow-2xl p-1 md:p-3 min-h-[600px] flex flex-col justify-between overflow-hidden relative border-slate-200 bg-white">
      <div className="flex-grow" style={fontStyle}>
        {(!hasPersonal && !hasSummary && !hasSkills && !hasExperience && !hasEducation && !hasProjects) ? (
          /* Empty state block */
          <div data-empty-preview="true" className="h-full min-h-[450px] flex flex-col items-center justify-center text-center p-8 space-y-4 font-sans text-slate-500">
            <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
              <FileText className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-xs">
              <h4 className="text-sm font-bold text-slate-800 dark:text-text">No Information Provided</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Start entering details in the form on the left or click "Load Demo Resume" to populate details.
              </p>
            </div>
          </div>
        ) : (
          /* Render designated layout template (Always white paper style) */
          <div id="resume-print-content" className="animate-fade-in bg-white text-slate-800 rounded-xl border border-slate-200 shadow-[0_10px_35px_rgba(0,0,0,0.1)]">
            {template === 'modern' && renderModernTemplate()}
            {template === 'professional' && renderProfessionalTemplate()}
            {template === 'minimal' && renderMinimalTemplate()}
            {template === 'creative' && renderCreativeTemplate()}
            {template === 'executive' && renderExecutiveTemplate()}
            {template === 'compact' && renderCompactTemplate()}
          </div>
        )}
      </div>

      {/* Sheet guidelines footer */}
      <div className="border-t border-slate-200 dark:border-slate-800 mx-4 mt-6 pt-3 pb-3 flex justify-between items-center text-[10px] text-slate-400 dark:text-muted font-semibold font-sans">
        <span>Format: US Letter (Print Standard)</span>
        <span className={`${colors.text} animate-pulse`}>Auto Sync Active</span>
      </div>
    </div>
  );
}
