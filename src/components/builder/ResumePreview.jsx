import React from 'react';
import { Badge } from '../ui/Badge';
import { Mail, Phone, MapPin, Linkedin, Github, FileText } from 'lucide-react';

export function ResumePreview({ data, template = 'modern' }) {
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

  // Modern Template Layout
  const ModernTemplate = () => (
    <div className="flex flex-col md:flex-row h-full font-sans text-xs text-slate-300">
      {/* Left Sidebar */}
      <div className="w-full md:w-[32%] border-b md:border-b-0 md:border-r border-slate-800 p-5 space-y-5 shrink-0 bg-slate-950/30">
        {/* Contact info */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-primary-light uppercase tracking-wider border-b border-slate-800 pb-1">Contact</h4>
          <div className="space-y-2.5 text-[11px] break-all">
            {personal.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-muted shrink-0" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-muted shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-3.5 w-3.5 text-muted shrink-0" />
                <span className="truncate">{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-2">
                <Github className="h-3.5 w-3.5 text-muted shrink-0" />
                <span className="truncate">{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills sidebar */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-primary-light uppercase tracking-wider border-b border-slate-800 pb-1">Skills</h4>
          {hasSkills ? (
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, idx) => (
                <Badge key={idx} variant="muted" className="text-[9px] bg-slate-900 border-slate-800 py-0.5 px-2 font-medium">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-[10px] italic text-muted">No skills added.</span>
          )}
        </div>
      </div>

      {/* Right Content Pane */}
      <div className="flex-grow p-5 space-y-5">
        {/* Name / Title */}
        <div className="space-y-1 text-left">
          <h3 className="text-2xl font-extrabold tracking-tight text-text">{personal.fullName || 'Your Name'}</h3>
          <p className="text-xs text-primary font-bold tracking-wide uppercase">{personal.role || 'Professional Role'}</p>
        </div>

        {/* Professional Summary */}
        {hasSummary && (
          <div className="space-y-1.5 text-left">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider border-b border-slate-900 pb-0.5">Professional Summary</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <div className="space-y-2.5 text-left">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider border-b border-slate-900 pb-0.5">Experience</h4>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1 text-[11px]">
                  <div className="flex justify-between items-baseline font-bold">
                    <span className="text-slate-200">{exp.company}</span>
                    <span className="text-[10px] text-muted font-medium">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="text-primary-light font-semibold">{exp.role}</div>
                  {exp.description && (
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed whitespace-pre-line font-medium">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div className="space-y-2.5 text-left">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider border-b border-slate-900 pb-0.5">Projects</h4>
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-1 text-[11px]">
                  <div className="flex justify-between items-baseline font-bold">
                    <span className="text-slate-200">{proj.projectName}</span>
                    {proj.githubLink && (
                      <span className="text-[10px] text-primary-light hover:underline font-semibold">{proj.githubLink.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                    )}
                  </div>
                  {proj.techStack && (
                    <div className="text-[10px] text-muted font-medium">Tech Stack: {proj.techStack}</div>
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
        )}

        {/* Education */}
        {hasEducation && (
          <div className="space-y-2.5 text-left">
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider border-b border-slate-900 pb-0.5">Education</h4>
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
        )}
      </div>
    </div>
  );

  // Professional Template Layout
  const ProfessionalTemplate = () => (
    <div className="p-6 md:p-8 space-y-4 font-serif text-xs text-slate-300">
      {/* Center Header */}
      <div className="text-center border-b border-slate-800 pb-3 space-y-1">
        <h3 className="text-2xl font-semibold tracking-wide text-text">{personal.fullName || 'Your Name'}</h3>
        <p className="text-xs italic text-primary-light font-semibold tracking-wide">{personal.role || 'Professional Role'}</p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-slate-400 font-medium mt-1.5">
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

      {/* Summary */}
      {hasSummary && (
        <div className="space-y-1 text-center font-medium italic">
          <p className="text-[11px] text-slate-300 leading-relaxed px-6">"{summary}"</p>
        </div>
      )}

      {/* Experience */}
      {hasExperience && (
        <div className="space-y-2 text-left">
          <h4 className="text-[10px] font-bold text-text uppercase tracking-wider border-b border-slate-800 pb-0.5">Professional Experience</h4>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline font-semibold text-[11px]">
                  <span className="text-slate-200">{exp.company.toUpperCase()}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between text-[10px] italic text-muted font-medium">
                  <span>{exp.role}</span>
                </div>
                {exp.description && (
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed whitespace-pre-line font-sans font-medium">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {hasProjects && (
        <div className="space-y-2 text-left">
          <h4 className="text-[10px] font-bold text-text uppercase tracking-wider border-b border-slate-800 pb-0.5">Project Catalog</h4>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline font-semibold text-[11px]">
                  <span className="text-slate-200">{proj.projectName}</span>
                  {proj.githubLink && <span className="text-[10px] text-primary hover:underline font-mono">{proj.githubLink.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
                </div>
                {proj.techStack && <div className="text-[10px] text-muted italic font-medium">Keywords: {proj.techStack}</div>}
                {proj.description && (
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-sans font-medium">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {hasSkills && (
        <div className="space-y-1.5 text-left">
          <h4 className="text-[10px] font-bold text-text uppercase tracking-wider border-b border-slate-800 pb-0.5">Core Competencies</h4>
          <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium">
            {skills.join(', ')}
          </p>
        </div>
      )}

      {/* Education */}
      {hasEducation && (
        <div className="space-y-2 text-left">
          <h4 className="text-[10px] font-bold text-text uppercase tracking-wider border-b border-slate-800 pb-0.5">Education History</h4>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-[11px]">
                <div>
                  <span className="font-semibold text-slate-200">{edu.degree}</span>
                  <span className="text-muted block text-[10px] font-semibold">{edu.college}</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-medium">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Minimal Template Layout
  const MinimalTemplate = () => (
    <div className="p-6 md:p-8 space-y-4 font-sans text-xs text-slate-300">
      {/* Clean Single Column Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 gap-2">
        <div className="space-y-0.5 text-left">
          <h3 className="text-xl font-bold tracking-tight text-text">{personal.fullName || 'Your Name'}</h3>
          <p className="text-xs text-primary font-bold tracking-wide">{personal.role || 'Professional Role'}</p>
        </div>
        <div className="flex flex-col text-left sm:text-right text-[10px] text-muted space-y-0.5 font-medium shrink-0">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {hasSummary && (
        <div className="space-y-1 text-left">
          <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {hasExperience && (
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-text uppercase tracking-widest border-b border-slate-900 pb-1">Experience</h4>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1 text-[11px]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline font-bold">
                  <span className="text-slate-200">{exp.company} – <span className="text-primary-light font-semibold">{exp.role}</span></span>
                  <span className="text-[10px] text-muted shrink-0 font-medium">{exp.startDate} – {exp.endDate}</span>
                </div>
                {exp.description && (
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed whitespace-pre-line font-medium">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {hasProjects && (
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-text uppercase tracking-widest border-b border-slate-900 pb-1">Projects</h4>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={idx} className="space-y-1 text-[11px]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline font-bold">
                  <span className="text-slate-200">{proj.projectName}</span>
                  <span className="text-[10px] text-muted font-medium shrink-0">{proj.techStack}</span>
                </div>
                {proj.description && (
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-medium">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {hasEducation && (
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-text uppercase tracking-widest border-b border-slate-900 pb-1">Education</h4>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-[11px]">
                <div>
                  <span className="font-bold text-slate-200">{edu.degree}</span>
                  <span className="text-muted text-[10px] font-semibold">, {edu.college}</span>
                </div>
                <span className="text-[10px] text-muted shrink-0 font-medium">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {hasSkills && (
        <div className="space-y-2.5 text-left">
          <h4 className="text-[10px] font-bold text-text uppercase tracking-widest border-b border-slate-900 pb-1">Technical Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.map((s, idx) => (
              <span key={idx} className="text-[10px] bg-slate-900 border border-slate-850 text-slate-300 rounded px-2 py-0.5 font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 md:p-6 min-h-[600px] flex flex-col justify-between overflow-hidden relative">
      {/* Print sheet simulation wrapper */}
      <div className="flex-grow">
        {(!hasPersonal && !hasSummary && !hasSkills && !hasExperience && !hasEducation && !hasProjects) ? (
          /* Empty state block */
          <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-center p-8 space-y-4">
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
          /* Renders template based on template state */
          <div className="animate-fade-in">
            {template === 'modern' && <ModernTemplate />}
            {template === 'professional' && <ProfessionalTemplate />}
            {template === 'minimal' && <MinimalTemplate />}
          </div>
        )}
      </div>

      {/* Sheet guidelines footer */}
      <div className="border-t border-slate-900 mt-6 pt-3 flex justify-between items-center text-[10px] text-muted font-semibold">
        <span>Format: US Letter (Print Standard)</span>
        <span className="text-primary-light">Auto Sync Active</span>
      </div>
    </div>
  );
}
