import React, { useState } from 'react';
import { SectionAccordion } from './SectionAccordion';
import { Button } from '../ui/Button';
import { 
  User, 
  FileText, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Plus, 
  Trash2, 
  Sparkles 
} from 'lucide-react';
import { TemplateSwitcher } from './TemplateSwitcher';
import { ResumeSettings } from './ResumeSettings';
import { SectionDndList } from './SectionDndList';

export function ResumeForm({ 
  data, 
  onDataChange, 
  template, 
  onTemplateChange, 
  settings, 
  onSettingsChange, 
  sectionOrder, 
  onReorderSections 
}) {
  const [skillInput, setSkillInput] = useState('');

  // Helper to deep update fields
  const updatePersonal = (field, value) => {
    onDataChange({
      ...data,
      personal: {
        ...data.personal,
        [field]: value
      }
    });
  };

  const updateSummary = (value) => {
    onDataChange({
      ...data,
      summary: value
    });
  };

  // Skills handlers
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (data.skills.includes(skillInput.trim())) return;
    onDataChange({
      ...data,
      skills: [...data.skills, skillInput.trim()]
    });
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    onDataChange({
      ...data,
      skills: data.skills.filter(s => s !== skillToRemove)
    });
  };

  // Dynamic lists generators
  const addExperience = () => {
    const newExp = { company: '', role: '', startDate: '', endDate: '', description: '' };
    onDataChange({
      ...data,
      experience: [...data.experience, newExp]
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = data.experience.map((exp, idx) => {
      if (idx === index) return { ...exp, [field]: value };
      return exp;
    });
    onDataChange({ ...data, experience: updated });
  };

  const deleteExperience = (index) => {
    onDataChange({
      ...data,
      experience: data.experience.filter((_, idx) => idx !== index)
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu = { college: '', degree: '', startYear: '', endYear: '' };
    onDataChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = data.education.map((edu, idx) => {
      if (idx === index) return { ...edu, [field]: value };
      return edu;
    });
    onDataChange({ ...data, education: updated });
  };

  const deleteEducation = (index) => {
    onDataChange({
      ...data,
      education: data.education.filter((_, idx) => idx !== index)
    });
  };

  // Projects handlers
  const addProject = () => {
    const newProj = { projectName: '', techStack: '', description: '', githubLink: '' };
    onDataChange({
      ...data,
      projects: [...data.projects, newProj]
    });
  };

  const updateProject = (index, field, value) => {
    const updated = data.projects.map((proj, idx) => {
      if (idx === index) return { ...proj, [field]: value };
      return proj;
    });
    onDataChange({ ...data, projects: updated });
  };

  const deleteProject = (index) => {
    onDataChange({
      ...data,
      projects: data.projects.filter((_, idx) => idx !== index)
    });
  };

  return (
    <div className="space-y-4">
      {/* Accordions */}
      <div className="space-y-4 text-left">
        {/* Template Switcher Accordion */}
        <TemplateSwitcher activeTemplate={template} onTemplateChange={onTemplateChange} />

        {/* Theme Settings Accordion */}
        <ResumeSettings settings={settings} onSettingsChange={onSettingsChange} />

        {/* Section Ordering Accordion */}
        <SectionDndList items={sectionOrder} onReorder={onReorderSections} />

        {/* Personal info */}
        <SectionAccordion title="Personal Information" icon={User} defaultOpen={true}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Full Name</label>
              <input
                type="text"
                value={data.personal.fullName || ''}
                onChange={(e) => updatePersonal('fullName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="Sarah Jenkins"
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Professional Role</label>
              <input
                type="text"
                value={data.personal.role || ''}
                onChange={(e) => updatePersonal('role', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="Lead Frontend Architect"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Email Address</label>
              <input
                type="email"
                value={data.personal.email || ''}
                onChange={(e) => updatePersonal('email', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="sarah@edge.io"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Phone Number</label>
              <input
                type="text"
                value={data.personal.phone || ''}
                onChange={(e) => updatePersonal('phone', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="+1 (555) 019-2834"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Location</label>
              <input
                type="text"
                value={data.personal.location || ''}
                onChange={(e) => updatePersonal('location', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={data.personal.linkedin || ''}
                onChange={(e) => updatePersonal('linkedin', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="https://linkedin.com/in/sarah"
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">GitHub Profile Link</label>
              <input
                type="text"
                value={data.personal.github || ''}
                onChange={(e) => updatePersonal('github', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="https://github.com/sarah-jenkins"
              />
            </div>
          </div>
        </SectionAccordion>

        {/* Summary */}
        <SectionAccordion title="Professional Summary" icon={FileText}>
          <div className="text-xs space-y-2">
            <div className="flex justify-between items-baseline mb-1">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider">Summary Statement</label>
              <span className="text-[10px] font-semibold text-muted">{(data.summary || '').length} characters</span>
            </div>
            <textarea
              rows="4"
              value={data.summary || ''}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-text focus:outline-none focus:border-primary transition-colors leading-relaxed font-semibold resize-none"
              placeholder="Detail your professional highlights..."
            />
          </div>
        </SectionAccordion>

        {/* Skills */}
        <SectionAccordion title="Skills" icon={Cpu}>
          <div className="text-xs space-y-4">
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="e.g. Next.js"
              />
              <Button type="submit" size="sm" className="h-9 shrink-0 gap-1 text-xs font-semibold">
                <Plus className="h-4 w-4" /> Add Skill
              </Button>
            </form>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900">
              {data.skills && data.skills.length > 0 ? (
                data.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-muted hover:text-red-400 transition-colors cursor-pointer text-xs font-bold leading-none"
                    >
                      &times;
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-[11px] italic text-muted">No skills added yet.</span>
              )}
            </div>
          </div>
        </SectionAccordion>

        {/* Experience */}
        <SectionAccordion title="Experience" icon={Briefcase}>
          <div className="space-y-4">
            {data.experience && data.experience.length > 0 ? (
              data.experience.map((exp, index) => (
                <div key={index} className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/20 text-xs space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => deleteExperience(index)}
                    className="absolute top-4 right-4 text-muted hover:text-red-400 transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Stripe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Role / Job Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(index, 'role', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Senior Architect"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Jan 2023"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Present"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Responsibilities / Bullet Points</label>
                      <textarea
                        rows="3"
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-text focus:outline-none focus:border-primary transition-colors font-semibold resize-none leading-relaxed"
                        placeholder="• Spearheaded construction of core component libraries..."
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 border border-dashed border-slate-850 rounded-xl text-muted text-xs font-semibold">
                No experience entries added.
              </div>
            )}

            <Button
              type="button"
              onClick={addExperience}
              variant="secondary"
              className="w-full h-10 border-slate-800 border bg-surface hover:bg-slate-800/80 text-xs font-semibold gap-1.5"
            >
              <Plus className="h-4 w-4 text-primary" /> Add Experience Entry
            </Button>
          </div>
        </SectionAccordion>

        {/* Projects */}
        <SectionAccordion title="Projects" icon={FolderGit2}>
          <div className="space-y-4">
            {data.projects && data.projects.length > 0 ? (
              data.projects.map((proj, index) => (
                <div key={index} className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/20 text-xs space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => deleteProject(index)}
                    className="absolute top-4 right-4 text-muted hover:text-red-400 transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Project Name</label>
                      <input
                        type="text"
                        value={proj.projectName}
                        onChange={(e) => updateProject(index, 'projectName', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. E-Commerce Core"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Tech Stack Summary</label>
                      <input
                        type="text"
                        value={proj.techStack}
                        onChange={(e) => updateProject(index, 'techStack', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. React, Next.js, Node.js"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">GitHub Link URL</label>
                      <input
                        type="text"
                        value={proj.githubLink}
                        onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. https://github.com/user/project"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Project Description</label>
                      <textarea
                        rows="3.5"
                        value={proj.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-text focus:outline-none focus:border-primary transition-colors font-semibold resize-none leading-relaxed"
                        placeholder="Detail the challenges resolved and accomplishments..."
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 border border-dashed border-slate-850 rounded-xl text-muted text-xs font-semibold">
                No project entries added.
              </div>
            )}

            <Button
              type="button"
              onClick={addProject}
              variant="secondary"
              className="w-full h-10 border-slate-800 border bg-surface hover:bg-slate-800/80 text-xs font-semibold gap-1.5"
            >
              <Plus className="h-4 w-4 text-primary" /> Add Project Entry
            </Button>
          </div>
        </SectionAccordion>

        {/* Education */}
        <SectionAccordion title="Education" icon={GraduationCap}>
          <div className="space-y-4">
            {data.education && data.education.length > 0 ? (
              data.education.map((edu, index) => (
                <div key={index} className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/20 text-xs space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => deleteEducation(index)}
                    className="absolute top-4 right-4 text-muted hover:text-red-400 transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">College / University Name</label>
                      <input
                        type="text"
                        value={edu.college}
                        onChange={(e) => updateEducation(index, 'college', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Stanford University"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Degree / Certification</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Bachelor of Science in CS"
                      />
                    </div>
                    <div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Start Year</label>
                          <input
                            type="text"
                            value={edu.startYear}
                            onChange={(e) => updateEducation(index, 'startYear', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold text-center"
                            placeholder="e.g. 2016"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">End Year</label>
                          <input
                            type="text"
                            value={edu.endYear}
                            onChange={(e) => updateEducation(index, 'endYear', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold text-center"
                            placeholder="e.g. 2020"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 border border-dashed border-slate-850 rounded-xl text-muted text-xs font-semibold">
                No education entries added.
              </div>
            )}

            <Button
              type="button"
              onClick={addEducation}
              variant="secondary"
              className="w-full h-10 border-slate-800 border bg-surface hover:bg-slate-800/80 text-xs font-semibold gap-1.5"
            >
              <Plus className="h-4 w-4 text-primary" /> Add Education Entry
            </Button>
          </div>
        </SectionAccordion>
      </div>
    </div>
  );
}
