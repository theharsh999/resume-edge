import React from 'react';
import { Badge } from '../ui/Badge';
import { Mail, Phone, MapPin, Linkedin, Github, FileText, Globe } from 'lucide-react';

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

  // Primary Theme Colors Map
  const themeColors = {
    indigo: {
      text: 'text-[#6366F1]',
      textLight: 'text-[#818CF8]',
      border: 'border-[#6366F1]/20',
      borderSolid: 'border-[#6366F1]',
      bg: 'bg-[#6366F1]/10',
      bullet: 'text-[#6366F1]',
    },
    blue: {
      text: 'text-[#3B82F6]',
      textLight: 'text-[#60A5FA]',
      border: 'border-[#3B82F6]/20',
      borderSolid: 'border-[#3B82F6]',
      bg: 'bg-[#3B82F6]/10',
      bullet: 'text-[#3B82F6]',
    },
    emerald: {
      text: 'text-[#10B981]',
      textLight: 'text-[#34D399]',
      border: 'border-[#10B981]/20',
      borderSolid: 'border-[#10B981]',
      bg: 'bg-[#10B981]/10',
      bullet: 'text-[#10B981]',
    },
    rose: {
      text: 'text-[#F43F5E]',
      textLight: 'text-[#FB7185]',
      border: 'border-[#F43F5E]/20',
      borderSolid: 'border-[#F43F5E]',
      bg: 'bg-[#F43F5E]/10',
      bullet: 'text-[#F43F5E]',
    },
    amber: {
      text: 'text-[#F59E0B]',
      textLight: 'text-[#FBBF24]',
      border: 'border-[#F59E0B]/20',
      borderSolid: 'border-[#F59E0B]',
      bg: 'bg-[#F59E0B]/10',
      bullet: 'text-[#F59E0B]',
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
      <h4 className={`text-[10px] font-bold text-muted uppercase tracking-wider border-b border-slate-800 pb-0.5`}>
        Professional Summary
      </h4>
      <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{summary}</p>
    </div>
  );

  const renderSkills = (asList = true) => {
    if (!hasSkills) return null;
    return (
      <div key="skills" className={density.sectionSpacing}>
        <h4 className={`text-[10px] font-bold text-muted uppercase tracking-wider border-b border-slate-800 pb-0.5`}>
          Skills
        </h4>
        {asList ? (
          <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
            {skills.join(', ')}
          </p>
        ) : (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {skills.map((skill, idx) => (
              <Badge key={idx} variant="muted" className="text-[9px] bg-slate-900 border-slate-800 py-0.5 px-2 font-medium text-slate-300">
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
      <h4 className={`text-[10px] font-bold text-muted uppercase tracking-wider border-b border-slate-800 pb-0.5`}>
        Experience
      </h4>
      <div className={density.itemSpacing}>
        {experience.map((exp, idx) => (
          <div key={idx} className="text-[11px]">
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-slate-200">{exp.company}</span>
              <span className="text-[10px] text-muted font-medium">{exp.startDate} – {exp.endDate}</span>
            </div>
            <div className={`${colors.textLight} font-semibold`}>{exp.role}</div>
            {exp.description && (
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed whitespace-pre-line font-medium">
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
      <h4 className={`text-[10px] font-bold text-muted uppercase tracking-wider border-b border-slate-800 pb-0.5`}>
        Projects
      </h4>
      <div className={density.itemSpacing}>
        {projects.map((proj, idx) => (
          <div key={idx} className="text-[11px]">
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-slate-200">{proj.projectName}</span>
              {proj.githubLink && (
                <span className={`text-[10px] ${colors.text} hover:underline font-semibold`}>
                  {proj.githubLink.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                </span>
              )}
            </div>
            {proj.techStack && (
              <div className="text-[10px] text-muted font-semibold mt-0.5">Tech Stack: {proj.techStack}</div>
            )}
            {proj.description && (
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-medium">
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
      <h4 className={`text-[10px] font-bold text-muted uppercase tracking-wider border-b border-slate-800 pb-0.5`}>
        Education
      </h4>
      <div className="space-y-2">
        {education.map((edu, idx) => (
          <div key={idx} className="flex justify-between items-baseline text-[11px]">
            <div>
              <span className="font-bold text-slate-200">{edu.degree}</span>
              <span className="text-muted block text-[10px] font-semibold">{edu.college}</span>
            </div>
            <span className="text-[10px] text-muted shrink-0 font-medium">{edu.startYear} – {edu.endYear}</span>
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
  const ModernTemplate = () => (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left Sidebar */}
      <div className="w-full md:w-[32%] border-b md:border-b-0 md:border-r border-slate-850 p-5 space-y-5 shrink-0 bg-slate-950/20">
        {/* Contact info */}
        <div className="space-y-3 text-left">
          <h4 className={`text-[10px] font-bold ${colors.textLight} uppercase tracking-wider border-b border-slate-850 pb-1 font-semibold`}>Contact</h4>
          <div className="space-y-2.5 text-[11px] break-all font-medium">
            {personal.email && <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-muted shrink-0" /><span>{personal.email}</span></div>}
            {personal.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-muted shrink-0" /><span>{personal.phone}</span></div>}
            {personal.location && <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-muted shrink-0" /><span>{personal.location}</span></div>}
            {personal.linkedin && <div className="flex items-center gap-2"><Linkedin className="h-3.5 w-3.5 text-muted shrink-0" /><span className="truncate">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
            {personal.github && <div className="flex items-center gap-2"><Github className="h-3.5 w-3.5 text-muted shrink-0" /><span className="truncate">{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
          </div>
        </div>

        {/* Skills sidebar */}
        <div className="space-y-3 text-left">
          <h4 className={`text-[10px] font-bold ${colors.textLight} uppercase tracking-wider border-b border-slate-850 pb-1 font-semibold`}>Skills</h4>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {skills.map((s, idx) => (
              <Badge key={idx} variant="muted" className="text-[9px] bg-slate-900 border-slate-800 py-0.5 px-2 font-medium text-slate-300">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column Body */}
      <div className={`flex-grow ${density.padding} ${density.spacing}`}>
        <div className="space-y-1 text-left border-b border-slate-800 pb-3">
          <h3 className="text-2xl font-extrabold tracking-tight text-text">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-xs ${colors.text} font-bold tracking-wide uppercase`}>{personal.role || 'Professional Role'}</p>
        </div>
        {/* Render sections in custom order (excluding skills which is in sidebar) */}
        {sectionOrder.filter(id => id !== 'skills').map(id => renderSection(id))}
      </div>
    </div>
  );

  // Professional Template (Serif elegant centered style)
  const ProfessionalTemplate = () => (
    <div className={`font-serif ${density.padding} ${density.spacing}`}>
      <div className="text-center border-b border-slate-800 pb-3 space-y-1.5">
        <h3 className="text-2xl font-semibold tracking-wide text-text">{personal.fullName || 'Your Name'}</h3>
        <p className={`text-xs italic ${colors.textLight} font-semibold tracking-wide`}>{personal.role || 'Professional Role'}</p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-slate-400 font-medium font-sans">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && (
            <>
              <span className="text-slate-800">|</span>
              <span>{personal.phone}</span>
            </>
          )}
          {personal.location && (
            <>
              <span className="text-slate-800">|</span>
              <span>{personal.location}</span>
            </>
          )}
          {personal.linkedin && (
            <>
              <span className="text-slate-800">|</span>
              <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
          {personal.github && (
            <>
              <span className="text-slate-800">|</span>
              <span>{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </>
          )}
        </div>
      </div>
      {sectionOrder.map(id => renderSection(id, true))}
    </div>
  );

  // Minimal Template (Clean compact columns)
  const MinimalTemplate = () => (
    <div className={`${density.padding} ${density.spacing}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-850 pb-4 gap-2">
        <div className="space-y-0.5 text-left">
          <h3 className="text-xl font-bold tracking-tight text-text">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-xs ${colors.text} font-bold tracking-wide`}>{personal.role || 'Professional Role'}</p>
        </div>
        <div className="flex flex-col text-left sm:text-right text-[10px] text-muted space-y-0.5 font-medium shrink-0">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>
      {sectionOrder.map(id => renderSection(id, false))}
    </div>
  );

  // Creative Template (Highlight side borders, clean cards, design-centric)
  const CreativeTemplate = () => (
    <div className="flex flex-col md:flex-row h-full">
      {/* Side Column with custom border */}
      <div className={`w-full md:w-[30%] p-5 space-y-5 bg-slate-950/45 border-r border-slate-850 relative`}>
        {/* Color accent bar */}
        <div className={`absolute top-0 left-0 bottom-0 w-1 ${colors.bg} bg-opacity-100 ${colors.borderSolid} border-l-4`}></div>
        
        <div className="space-y-3 text-left pl-1">
          <h4 className={`text-[10px] font-bold ${colors.text} uppercase tracking-widest font-semibold`}>Details</h4>
          <div className="space-y-3 text-[10px] text-slate-300 font-medium">
            {personal.email && <div><p className="text-muted text-[8px] uppercase tracking-wider font-semibold">Email</p><span className="break-all">{personal.email}</span></div>}
            {personal.phone && <div><p className="text-muted text-[8px] uppercase tracking-wider font-semibold">Phone</p><span>{personal.phone}</span></div>}
            {personal.location && <div><p className="text-muted text-[8px] uppercase tracking-wider font-semibold">Address</p><span>{personal.location}</span></div>}
            {personal.linkedin && <div><p className="text-muted text-[8px] uppercase tracking-wider font-semibold">LinkedIn</p><span className="break-all">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
            {personal.github && <div><p className="text-muted text-[8px] uppercase tracking-wider font-semibold">GitHub</p><span className="break-all">{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
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
        <div className="text-left border-b border-slate-800 pb-3">
          <h3 className="text-2xl font-black tracking-tight text-text uppercase">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-xs ${colors.textLight} font-bold tracking-widest uppercase mt-0.5`}>{personal.role || 'Professional Role'}</p>
        </div>
        {sectionOrder.filter(id => id !== 'skills').map(id => renderSection(id))}
      </div>
    </div>
  );

  // Executive Template (Heavy corporate layouts, formal italics)
  const ExecutiveTemplate = () => (
    <div className={`p-6 md:p-8 space-y-5 font-serif text-slate-300 border-t-4 ${colors.borderSolid}`}>
      <div className="text-left flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-850 pb-4 gap-3">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold tracking-wide text-text">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>{personal.role || 'Professional Role'}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-400 font-sans text-left sm:text-right font-medium shrink-0">
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
  const CompactTemplate = () => (
    <div className={`p-4 md:p-5 ${density.spacing} font-sans`}>
      {/* Header Compact */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-slate-850 pb-2.5 gap-1.5">
        <div className="text-left">
          <h3 className="text-lg font-bold tracking-tight text-text inline-block mr-3">{personal.fullName || 'Your Name'}</h3>
          <span className={`text-[10px] ${colors.textLight} font-bold uppercase tracking-wider`}>{personal.role || 'Professional Role'}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-[9px] text-muted font-semibold">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
        </div>
      </div>

      {sectionOrder.map(id => renderSection(id, true))}
    </div>
  );

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1 md:p-3 min-h-[600px] flex flex-col justify-between overflow-hidden relative">
      <div className="flex-grow" style={fontStyle}>
        {(!hasPersonal && !hasSummary && !hasSkills && !hasExperience && !hasEducation && !hasProjects) ? (
          /* Empty state block */
          <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-center p-8 space-y-4 font-sans">
            <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-muted">
              <FileText className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-xs">
              <h4 className="text-sm font-bold text-text">No Information Provided</h4>
              <p className="text-xs text-muted leading-relaxed font-medium">
                Start entering details in the form on the left or click "Load Demo Resume" to populate details.
              </p>
            </div>
          </div>
        ) : (
          /* Render designated layout template */
          <div id="resume-print-content" className="animate-fade-in bg-slate-900 rounded-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            {template === 'modern' && <ModernTemplate />}
            {template === 'professional' && <ProfessionalTemplate />}
            {template === 'minimal' && <MinimalTemplate />}
            {template === 'creative' && <CreativeTemplate />}
            {template === 'executive' && <ExecutiveTemplate />}
            {template === 'compact' && <CompactTemplate />}
          </div>
        )}
      </div>

      {/* Sheet guidelines footer */}
      <div className="border-t border-slate-900 mx-4 mt-6 pt-3 pb-3 flex justify-between items-center text-[10px] text-muted font-semibold font-sans">
        <span>Format: US Letter (Print Standard)</span>
        <span className={`${colors.textLight} animate-pulse`}>Auto Sync Active</span>
      </div>
    </div>
  );
}
