import { useMemo } from 'react';
import { Badge } from '../ui/Badge';
import { Mail, Phone, MapPin, Linkedin, Github, FileText } from 'lucide-react';

const SPACING_MAP = {
  comfortable: {
    headingToDivider: '6px',
    dividerToContent: '18px',
    sectionBottom: '32px',
    itemSpacing: '20px'
  },
  balanced: {
    headingToDivider: '6px',
    dividerToContent: '14px',
    sectionBottom: '24px',
    itemSpacing: '16px'
  },
  compact: {
    headingToDivider: '6px',
    dividerToContent: '12px',
    sectionBottom: '16px',
    itemSpacing: '12px'
  }
};

function SectionHeader({ title, density = 'balanced' }) {
  const spacing = SPACING_MAP[density] || SPACING_MAP.balanced;
  return (
    <div className="flex flex-col w-full" style={{ marginBottom: spacing.dividerToContent }}>
      <h4 className="text-[12.5px] font-bold text-slate-800 uppercase tracking-wider leading-none" style={{ marginBottom: spacing.headingToDivider }}>
        {title}
      </h4>
      <div className="w-full border-b border-slate-300" style={{ borderBottomWidth: '1px' }}></div>
    </div>
  );
}

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
      spacing: 'space-y-8',
      itemSpacing: 'space-y-5',
      sectionSpacing: 'space-y-3'
    },
    balanced: {
      padding: 'p-6 md:p-8',
      spacing: 'space-y-6',
      itemSpacing: 'space-y-4',
      sectionSpacing: 'space-y-2'
    },
    compact: {
      padding: 'p-4 md:p-5',
      spacing: 'space-y-4',
      itemSpacing: 'space-y-3',
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
    <div key="summary" className="flex flex-col">
      <SectionHeader title="Professional Summary" density={settings.density} />
      <p className="text-[11px] text-slate-800 leading-relaxed font-medium">{summary}</p>
    </div>
  );

  const renderSkills = (asList = true) => {
    if (!hasSkills) return null;
    return (
      <div key="skills" className="flex flex-col">
        <SectionHeader title="Skills" density={settings.density} />
        {asList ? (
          <p className="text-[11px] text-slate-800 leading-relaxed font-medium">
            {skills.join(', ')}
          </p>
        ) : (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {skills.map((skill, idx) => (
              <Badge key={idx} variant="muted" className="text-[9px] bg-slate-100 border-slate-200 py-0.5 px-2 font-semibold text-slate-800">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderExperience = (showBullets = true) => (
    <div key="experience" className="flex flex-col">
      <SectionHeader title="Experience" density={settings.density} />
      <div className="flex flex-col">
        {experience.map((exp, idx) => (
          <div 
            key={idx} 
            className="text-[11px] flex flex-col"
            style={{ 
              marginBottom: idx === experience.length - 1 ? '0px' : (SPACING_MAP[settings.density || 'balanced']?.itemSpacing || '16px') 
            }}
          >
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-[11px] text-slate-900 font-bold">{exp.company}</span>
              <span className="text-[10px] text-slate-600 font-semibold">{exp.startDate} – {exp.endDate}</span>
            </div>
            <div className={`text-[11px] ${colors.text} font-bold`}>{exp.role}</div>
            {exp.description && (
              <p className="text-[11px] text-slate-800 mt-1 leading-relaxed whitespace-pre-line font-medium">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div key="projects" className="flex flex-col">
      <SectionHeader title="Projects" density={settings.density} />
      <div className="flex flex-col">
        {projects.map((proj, idx) => (
          <div 
            key={idx} 
            className="text-[11px] flex flex-col"
            style={{ 
              marginBottom: idx === projects.length - 1 ? '0px' : (SPACING_MAP[settings.density || 'balanced']?.itemSpacing || '16px') 
            }}
          >
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-[11px] text-slate-900 font-bold">{proj.projectName}</span>
              {proj.githubLink && (
                <span className={`text-[10px] ${colors.text} hover:underline font-semibold`}>
                  {proj.githubLink.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                </span>
              )}
            </div>
            {proj.techStack && (
              <div className="text-[10px] text-slate-600 font-bold mt-0.5">Tech Stack: {proj.techStack}</div>
            )}
            {proj.description && (
              <p className="text-[11px] text-slate-800 mt-1 leading-relaxed font-medium">
                {proj.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div key="education" className="flex flex-col">
      <SectionHeader title="Education" density={settings.density} />
      <div className="flex flex-col">
        {education.map((edu, idx) => (
          <div 
            key={idx} 
            className="flex justify-between items-baseline text-[11px]"
            style={{ 
              marginBottom: idx === education.length - 1 ? '0px' : '8px' 
            }}
          >
            <div>
              <span className="text-[11px] font-bold text-slate-900">{edu.degree}</span>
              <span className="text-slate-600 block text-[10px] font-bold">{edu.college}</span>
            </div>
            <span className="text-[10px] text-slate-600 shrink-0 font-semibold">{edu.startYear} – {edu.endYear}</span>
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
      <div className="w-full md:w-[25%] border-b md:border-b-0 md:border-r border-slate-200 p-5 space-y-6 shrink-0 bg-slate-50">
        {/* Contact info */}
        <div className="space-y-3 text-left">
          <h4 className={`text-[12.5px] font-bold ${colors.text} uppercase tracking-wider border-b border-slate-200 pb-1`}>Contact</h4>
          <div className="space-y-2.5 text-[11px] break-all font-medium text-slate-800">
            {personal.email && <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-600 shrink-0" /><span>{personal.email}</span></div>}
            {personal.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-600 shrink-0" /><span>{personal.phone}</span></div>}
            {personal.location && <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-slate-600 shrink-0" /><span>{personal.location}</span></div>}
            {personal.linkedin && <div className="flex items-center gap-2"><Linkedin className="h-3.5 w-3.5 text-slate-600 shrink-0" /><span className="truncate">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
            {personal.github && <div className="flex items-center gap-2"><Github className="h-3.5 w-3.5 text-slate-600 shrink-0" /><span className="truncate">{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
          </div>
        </div>

        {/* Skills sidebar */}
        <div className="space-y-3 text-left">
          <h4 className={`text-[12.5px] font-bold ${colors.text} uppercase tracking-wider border-b border-slate-200 pb-1`}>Skills</h4>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {skills.map((s, idx) => (
              <Badge key={idx} variant="muted" className="text-[9px] bg-slate-100 border-slate-200 py-0.5 px-2 font-semibold text-slate-800">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column Body */}
      <div className={`flex flex-col flex-grow ${density.padding}`}>
        <div className="flex flex-col text-left border-b border-slate-200 pb-3" style={{ marginBottom: SPACING_MAP[settings.density || 'balanced']?.sectionBottom }}>
          <h3 className="text-[30px] leading-tight font-extrabold tracking-tight text-slate-900">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-[15px] ${colors.text} font-bold tracking-wide uppercase`} style={{ marginTop: '4px' }}>{personal.role || 'Professional Role'}</p>
        </div>
        {/* Render sections in custom order (excluding skills which is in sidebar) */}
        {(() => {
          const activeSections = sectionOrder
            .filter(id => id !== 'skills')
            .map(id => ({ id, element: renderSection(id) }))
            .filter(item => item.element !== null);
          return activeSections.map((item, idx) => (
            <div 
              key={item.id} 
              style={{ 
                marginBottom: idx === activeSections.length - 1 ? '0px' : (SPACING_MAP[settings.density || 'balanced']?.sectionBottom || '24px') 
              }}
            >
              {item.element}
            </div>
          ));
        })()}
      </div>
    </div>
  );

  // Professional Template (Serif elegant centered style)
  const renderProfessionalTemplate = () => (
    <div className={`flex flex-col font-serif ${density.padding}`}>
      <div className="flex flex-col text-center border-b border-slate-200 pb-3" style={{ marginBottom: SPACING_MAP[settings.density || 'balanced']?.sectionBottom }}>
        <h3 className="text-[30px] leading-tight font-semibold tracking-wide text-slate-900">{personal.fullName || 'Your Name'}</h3>
        <p className={`text-[15px] italic ${colors.text} font-semibold tracking-wide`} style={{ marginTop: '6px' }}>{personal.role || 'Professional Role'}</p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-slate-600 font-semibold font-sans" style={{ marginTop: '6px' }}>
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
      {(() => {
        const activeSections = sectionOrder
          .map(id => ({ id, element: renderSection(id, true) }))
          .filter(item => item.element !== null);
        return activeSections.map((item, idx) => (
          <div 
            key={item.id} 
            style={{ 
              marginBottom: idx === activeSections.length - 1 ? '0px' : (SPACING_MAP[settings.density || 'balanced']?.sectionBottom || '24px') 
            }}
          >
            {item.element}
          </div>
        ));
      })()}
    </div>
  );

  // Minimal Template (Clean compact columns)
  const renderMinimalTemplate = () => (
    <div className={`flex flex-col ${density.padding}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-2" style={{ marginBottom: SPACING_MAP[settings.density || 'balanced']?.sectionBottom }}>
        <div className="flex flex-col text-left">
          <h3 className="text-[30px] leading-tight font-bold tracking-tight text-slate-900">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-[15px] ${colors.text} font-bold tracking-wide`} style={{ marginTop: '2px' }}>{personal.role || 'Professional Role'}</p>
        </div>
        <div className="flex flex-col text-left sm:text-right text-[10px] text-slate-600 font-semibold shrink-0">
          {[personal.email, personal.phone, personal.location].filter(Boolean).map((text, idx, arr) => (
            <span key={idx} style={{ marginBottom: idx === arr.length - 1 ? '0px' : '2px' }}>{text}</span>
          ))}
        </div>
      </div>
      {(() => {
        const activeSections = sectionOrder
          .map(id => ({ id, element: renderSection(id, false) }))
          .filter(item => item.element !== null);
        return activeSections.map((item, idx) => (
          <div 
            key={item.id} 
            style={{ 
              marginBottom: idx === activeSections.length - 1 ? '0px' : (SPACING_MAP[settings.density || 'balanced']?.sectionBottom || '24px') 
            }}
          >
            {item.element}
          </div>
        ));
      })()}
    </div>
  );

  // Creative Template (Highlight side borders, clean cards, design-centric)
  const renderCreativeTemplate = () => (
    <div className="flex flex-col md:flex-row h-full">
      {/* Side Column with custom border */}
      <div className={`w-full md:w-[25%] p-5 space-y-6 bg-slate-50 border-r border-slate-200 relative`}>
        {/* Color accent bar */}
        <div className={`absolute top-0 left-0 bottom-0 w-1 ${colors.bg} bg-opacity-100 ${colors.borderSolid} border-l-4`}></div>
        
        <div className="space-y-3 text-left pl-1">
          <h4 className={`text-[12.5px] font-bold ${colors.text} uppercase tracking-widest`}>Details</h4>
          <div className="space-y-3 text-[10px] text-slate-800 font-semibold">
            {personal.email && <div><p className="text-slate-600 text-[8px] uppercase tracking-wider font-semibold">Email</p><span className="break-all">{personal.email}</span></div>}
            {personal.phone && <div><p className="text-slate-600 text-[8px] uppercase tracking-wider font-semibold">Phone</p><span>{personal.phone}</span></div>}
            {personal.location && <div><p className="text-slate-600 text-[8px] uppercase tracking-wider font-semibold">Address</p><span>{personal.location}</span></div>}
            {personal.linkedin && <div><p className="text-slate-600 text-[8px] uppercase tracking-wider font-semibold">LinkedIn</p><span className="break-all">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
            {personal.github && <div><p className="text-slate-600 text-[8px] uppercase tracking-wider font-semibold">GitHub</p><span className="break-all">{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span></div>}
          </div>
        </div>

        {/* Skills pill list */}
        <div className="space-y-3 text-left pl-1">
          <h4 className={`text-[12.5px] font-bold ${colors.text} uppercase tracking-widest`}>Skills</h4>
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
      <div className={`flex flex-col flex-grow ${density.padding}`}>
        <div className="text-left border-b border-slate-200 pb-3" style={{ marginBottom: SPACING_MAP[settings.density || 'balanced']?.sectionBottom }}>
          <h3 className="text-[30px] leading-tight font-black tracking-tight text-slate-900 uppercase">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-[15px] ${colors.text} font-bold tracking-widest uppercase mt-0.5`} style={{ marginTop: '2px' }}>{personal.role || 'Professional Role'}</p>
        </div>
        {(() => {
          const activeSections = sectionOrder
            .filter(id => id !== 'skills')
            .map(id => ({ id, element: renderSection(id) }))
            .filter(item => item.element !== null);
          return activeSections.map((item, idx) => (
            <div 
              key={item.id} 
              style={{ 
                marginBottom: idx === activeSections.length - 1 ? '0px' : (SPACING_MAP[settings.density || 'balanced']?.sectionBottom || '24px') 
              }}
            >
              {item.element}
            </div>
          ));
        })()}
      </div>
    </div>
  );

  // Executive Template (Heavy corporate layouts, formal italics)
  const renderExecutiveTemplate = () => (
    <div className={`flex flex-col ${density.padding} font-serif text-slate-800 border-t-4 ${colors.borderSolid}`}>
      <div className="text-left flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-200 pb-4 gap-3" style={{ marginBottom: SPACING_MAP[settings.density || 'balanced']?.sectionBottom }}>
        <div className="flex flex-col">
          <h3 className="text-[30px] leading-tight font-bold tracking-wide text-slate-900">{personal.fullName || 'Your Name'}</h3>
          <p className={`text-[15px] font-semibold uppercase tracking-wider ${colors.text}`} style={{ marginTop: '4px' }}>{personal.role || 'Professional Role'}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-600 font-sans text-left sm:text-right font-semibold shrink-0">
          {personal.email && <span>Email: {personal.email}</span>}
          {personal.phone && <span>Tel: {personal.phone}</span>}
          {personal.location && <span>Loc: {personal.location}</span>}
          {personal.linkedin && <span>LinkedIn: {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
        </div>
      </div>

      {(() => {
        const activeSections = sectionOrder
          .map(id => ({ id, element: renderSection(id, true) }))
          .filter(item => item.element !== null);
        return activeSections.map((item, idx) => (
          <div 
            key={item.id} 
            style={{ 
              marginBottom: idx === activeSections.length - 1 ? '0px' : (SPACING_MAP[settings.density || 'balanced']?.sectionBottom || '24px') 
            }}
          >
            {item.element}
          </div>
        ));
      })()}
    </div>
  );

  // Compact Template (High density grids, optimized margins)
  const renderCompactTemplate = () => (
    <div className={`flex flex-col ${density.padding} font-sans`}>
      {/* Header Compact */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-slate-200 pb-2.5 gap-1.5" style={{ marginBottom: SPACING_MAP[settings.density || 'balanced']?.sectionBottom }}>
        <div className="text-left">
          <h3 className="text-[30px] leading-tight font-bold tracking-tight text-slate-900 inline-block mr-3">{personal.fullName || 'Your Name'}</h3>
          <span className={`text-[15px] ${colors.text} font-bold uppercase tracking-wider`}>{personal.role || 'Professional Role'}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] text-slate-600 font-semibold">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
        </div>
      </div>

      {(() => {
        const activeSections = sectionOrder
          .map(id => ({ id, element: renderSection(id, true) }))
          .filter(item => item.element !== null);
        return activeSections.map((item, idx) => (
          <div 
            key={item.id} 
            style={{ 
              marginBottom: idx === activeSections.length - 1 ? '0px' : (SPACING_MAP[settings.density || 'balanced']?.sectionBottom || '24px') 
            }}
          >
            {item.element}
          </div>
        ));
      })()}
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
