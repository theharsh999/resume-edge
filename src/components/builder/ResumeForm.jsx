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

const generateSummaryVariations = (role, skills) => {
  const cleanRole = role || 'Professional';
  const skillsList = skills && skills.length > 0 ? skills.slice(0, 5).join(', ') : 'key technologies';
  
  return [
    `${cleanRole} skilled in ${skillsList} with experience building responsive web applications, creating reusable components and delivering modern user experiences.`,
    `Results-driven ${cleanRole} specializing in ${skillsList}. Proven track record of designing scalable user interfaces, optimizing code performance, and collaborating with cross-functional development teams.`,
    `Passionate ${cleanRole} dedicated to leveraging ${skillsList} to build high-performance products. Focused on writing clean, maintainable code and optimizing overall usability.`
  ];
};

const skillSuggestionsMap = {
  react: ['Redux', 'Next.js', 'REST APIs', 'Vite', 'TypeScript', 'Tailwind CSS'],
  redux: ['React', 'Next.js', 'TypeScript', 'REST APIs', 'GraphQL'],
  nextjs: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Vercel'],
  typescript: ['React', 'Node.js', 'Next.js', 'Express', 'Vite'],
  javascript: ['HTML5', 'CSS3', 'React', 'Node.js', 'REST APIs'],
  tailwind: ['React', 'HTML5', 'CSS3', 'Next.js', 'Responsive Design'],
  vite: ['React', 'TypeScript', 'Tailwind CSS', 'Jest', 'Vitest'],
  nodejs: ['Express', 'MongoDB', 'JWT', 'REST APIs', 'SQL'],
  express: ['Node.js', 'MongoDB', 'REST APIs', 'JWT', 'PostgreSQL'],
  mongodb: ['Node.js', 'Express', 'Mongoose', 'REST APIs'],
  mysql: ['Java', 'Spring Boot', 'PHP', 'SQL', 'PostgreSQL'],
  postgresql: ['Node.js', 'Express', 'SQL', 'Sequelize', 'Prisma'],
  java: ['Spring Boot', 'Hibernate', 'MySQL', 'SQL', 'Data Structures'],
  springboot: ['Java', 'Hibernate', 'MySQL', 'REST APIs', 'Microservices'],
  hibernate: ['Java', 'Spring Boot', 'MySQL', 'JPA'],
  python: ['Django', 'Flask', 'Pandas', 'NumPy', 'Machine Learning'],
  django: ['Python', 'PostgreSQL', 'REST APIs', 'Flask'],
  flask: ['Python', 'SQLAlchemy', 'REST APIs', 'HTML5'],
  docker: ['Kubernetes', 'CI/CD', 'AWS', 'Linux', 'Node.js'],
  git: ['GitHub', 'GitLab', 'CI/CD', 'Teamwork'],
  figma: ['UI/UX Design', 'Wireframing', 'Prototyping', 'User Research'],
};

const roleBulletsMap = {
  frontend: [
    '• Built responsive user interfaces using React.',
    '• Improved page performance and accessibility.',
    '• Collaborated with designers and backend developers.',
    '• Developed reusable UI components.',
    '• Integrated RESTful and GraphQL APIs for client-side routing.'
  ],
  backend: [
    '• Designed and built scalable backend REST APIs using Node.js and Express.',
    '• Managed database architecture and queries, optimizing performance.',
    '• Integrated secure authentication and authorization systems.',
    '• Coordinated CI/CD pipelines for staging environment testing.',
    '• Implemented unit testing blocks to verify data integrity.'
  ],
  fullstack: [
    '• Engineered responsive layouts and database schemas.',
    '• Built end-to-end user-facing modules and REST connections.',
    '• Refactored styling parameters, cutting build weight.',
    '• Resolved technical debt inside dynamic dashboard applications.'
  ],
  intern: [
    '• Built responsive user interfaces using React.',
    '• Improved page performance and accessibility.',
    '• Collaborated with designers and backend developers.',
    '• Developed reusable UI components.'
  ],
  designer: [
    '• Created wireframes, high-fidelity prototypes, and design systems in Figma.',
    '• Coordinated with development teams to ensure precise handoffs.',
    '• Conducted user research interviews and usability testing sessions.'
  ],
  manager: [
    '• Guided software delivery groups during design sprints and agile releases.',
    '• Governed project scope boundaries, resources, and timeline estimations.',
    '• Mentored developers on design choices, clean structures, and documentation.'
  ]
};

const defaultBullets = [
  '• Built responsive user interfaces and modular layouts.',
  '• Improved codebase stability, testing coverage, and build speed.',
  '• Collaborated with designers and developers in agile sprints.',
  '• Developed new user-facing features and modular components.'
];

const getBulletsForRole = (roleTitle) => {
  const role = (roleTitle || '').toLowerCase();
  if (role.includes('frontend') || role.includes('front-end') || role.includes('ui') || role.includes('react')) {
    return roleBulletsMap.frontend;
  }
  if (role.includes('backend') || role.includes('back-end') || role.includes('api') || role.includes('node')) {
    return roleBulletsMap.backend;
  }
  if (role.includes('fullstack') || role.includes('full-stack') || role.includes('engineer') || role.includes('developer')) {
    return roleBulletsMap.fullstack;
  }
  if (role.includes('intern') || role.includes('junior') || role.includes('associate')) {
    return roleBulletsMap.intern;
  }
  if (role.includes('design') || role.includes('ux') || role.includes('designer')) {
    return roleBulletsMap.designer;
  }
  if (role.includes('manager') || role.includes('lead') || role.includes('architect') || role.includes('director')) {
    return roleBulletsMap.manager;
  }
  return defaultBullets;
};

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
  const [summaryVariationIdx, setSummaryVariationIdx] = useState(0);

  const handleGenerateSummary = () => {
    const variations = generateSummaryVariations(data.personal.role, data.skills);
    const nextIdx = (summaryVariationIdx + 1) % variations.length;
    setSummaryVariationIdx(nextIdx);
    updateSummary(variations[summaryVariationIdx]);
  };

  const getSuggestions = () => {
    const currentSkills = data.skills || [];
    const suggestionsSet = new Set();
    
    if (currentSkills.length === 0) {
      return ['React', 'JavaScript', 'Node.js', 'Python', 'Tailwind CSS'];
    }
    
    currentSkills.forEach(skill => {
      const key = skill.toLowerCase().trim();
      Object.keys(skillSuggestionsMap).forEach(suggestKey => {
        if (key.includes(suggestKey) || suggestKey.includes(key)) {
          skillSuggestionsMap[suggestKey].forEach(s => {
            if (!currentSkills.some(cs => cs.toLowerCase() === s.toLowerCase())) {
              suggestionsSet.add(s);
            }
          });
        }
      });
    });
    
    return Array.from(suggestionsSet).slice(0, 6);
  };

  const handleAddSuggestedSkill = (skill) => {
    if (data.skills.includes(skill)) return;
    onDataChange({
      ...data,
      skills: [...data.skills, skill]
    });
  };

  const handleGenerateBullets = (index) => {
    const exp = data.experience[index];
    const bullets = getBulletsForRole(exp.role);
    updateExperience(index, 'description', bullets.join('\n'));
  };

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
              <label htmlFor="personal-fullName" className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Full Name</label>
              <input
                id="personal-fullName"
                type="text"
                value={data.personal.fullName || ''}
                onChange={(e) => updatePersonal('fullName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="Sarah Jenkins"
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="personal-role" className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Professional Role</label>
              <input
                id="personal-role"
                type="text"
                value={data.personal.role || ''}
                onChange={(e) => updatePersonal('role', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="Lead Frontend Architect"
              />
            </div>
            <div>
              <label htmlFor="personal-email" className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Email Address</label>
              <input
                id="personal-email"
                type="email"
                value={data.personal.email || ''}
                onChange={(e) => updatePersonal('email', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="sarah@edge.io"
              />
            </div>
            <div>
              <label htmlFor="personal-phone" className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Phone Number</label>
              <input
                id="personal-phone"
                type="text"
                value={data.personal.phone || ''}
                onChange={(e) => updatePersonal('phone', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="+1 (555) 019-2834"
              />
            </div>
            <div>
              <label htmlFor="personal-location" className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Location</label>
              <input
                id="personal-location"
                type="text"
                value={data.personal.location || ''}
                onChange={(e) => updatePersonal('location', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <label htmlFor="personal-linkedin" className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">LinkedIn URL</label>
              <input
                id="personal-linkedin"
                type="text"
                value={data.personal.linkedin || ''}
                onChange={(e) => updatePersonal('linkedin', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="https://linkedin.com/in/sarah"
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="personal-github" className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">GitHub Profile Link</label>
              <input
                id="personal-github"
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
          <div className="text-xs space-y-3">
            <div className="flex justify-between items-baseline">
              <label htmlFor="personal-summary" className="block text-[10px] font-bold text-muted uppercase tracking-wider">Summary Statement</label>
              <span className="text-[10px] font-semibold text-muted">{(data.summary || '').length} characters</span>
            </div>
            <textarea
              id="personal-summary"
              rows="4"
              value={data.summary || ''}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-text focus:outline-none focus:border-primary transition-colors leading-relaxed font-semibold resize-none"
              placeholder="Detail your professional highlights..."
            />
            <Button
              type="button"
              onClick={handleGenerateSummary}
              variant="secondary"
              size="sm"
              className="w-full h-9 border-slate-800 border bg-surface hover:bg-slate-800/80 text-[11px] font-semibold gap-1.5"
              aria-label="Generate professional summary using profile context"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Generate Professional Summary
            </Button>
          </div>
        </SectionAccordion>

        {/* Skills */}
        <SectionAccordion title="Skills" icon={Cpu}>
          <div className="text-xs space-y-4">
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <label htmlFor="skillInput" className="sr-only">Add Skill</label>
              <input
                id="skillInput"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                placeholder="e.g. Next.js"
              />
              <Button type="submit" size="sm" className="h-9 shrink-0 gap-1 text-xs font-semibold" aria-label="Add entered skill">
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
                      aria-label={`Remove ${skill} skill`}
                    >
                      &times;
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-[11px] italic text-muted">Add skills to improve ATS score.</span>
              )}
            </div>

            {/* Suggested Skill Chips */}
            {getSuggestions().length > 0 && (
              <div className="pt-2 border-t border-slate-900/40">
                <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-2">Suggested Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {getSuggestions().map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleAddSuggestedSkill(s)}
                      className="px-2.5 py-1 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 text-[10px] font-semibold text-primary-light transition-all cursor-pointer"
                      aria-label={`Add suggested skill ${s}`}
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
                    aria-label={`Delete experience entry ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`exp-company-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Company / Organization</label>
                      <input
                        id={`exp-company-${index}`}
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Stripe"
                      />
                    </div>
                    <div>
                      <label htmlFor={`exp-role-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Role / Job Title</label>
                      <input
                        id={`exp-role-${index}`}
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(index, 'role', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Senior Architect"
                      />
                    </div>
                    <div>
                      <label htmlFor={`exp-startDate-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Start Date</label>
                      <input
                        id={`exp-startDate-${index}`}
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Jan 2023"
                      />
                    </div>
                    <div>
                      <label htmlFor={`exp-endDate-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">End Date</label>
                      <input
                        id={`exp-endDate-${index}`}
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Present"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor={`exp-description-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider">Responsibilities / Bullet Points</label>
                        <button
                          type="button"
                          onClick={() => handleGenerateBullets(index)}
                          className="text-[10px] font-bold text-primary hover:text-primary-light flex items-center gap-1 transition-colors cursor-pointer"
                          aria-label={`Generate achievement bullets for experience entry ${index + 1}`}
                        >
                          <Sparkles className="h-3 w-3" /> Generate Achievement Bullets
                        </button>
                      </div>
                      <textarea
                        id={`exp-description-${index}`}
                        rows="3"
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-text focus:outline-none focus:border-primary transition-colors font-semibold resize-none leading-relaxed"
                        placeholder="• Built responsive user interfaces using React."
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 border border-dashed border-slate-850 rounded-xl text-muted text-xs font-medium">
                Add your first experience to build your profile.
              </div>
            )}

            <Button
              type="button"
              onClick={addExperience}
              variant="secondary"
              className="w-full h-10 border-slate-800 border bg-surface hover:bg-slate-800/80 text-xs font-semibold gap-1.5"
              aria-label="Add new experience entry"
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
                    aria-label={`Delete project entry ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`proj-name-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Project Name</label>
                      <input
                        id={`proj-name-${index}`}
                        type="text"
                        value={proj.projectName}
                        onChange={(e) => updateProject(index, 'projectName', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. E-Commerce Core"
                      />
                    </div>
                    <div>
                      <label htmlFor={`proj-tech-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Tech Stack Summary</label>
                      <input
                        id={`proj-tech-${index}`}
                        type="text"
                        value={proj.techStack}
                        onChange={(e) => updateProject(index, 'techStack', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. React, Next.js, Node.js"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label htmlFor={`proj-git-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">GitHub Link URL</label>
                      <input
                        id={`proj-git-${index}`}
                        type="text"
                        value={proj.githubLink}
                        onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. https://github.com/user/project"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label htmlFor={`proj-desc-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Project Description</label>
                      <textarea
                        id={`proj-desc-${index}`}
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
              <div className="text-center py-6 border border-dashed border-slate-850 rounded-xl text-muted text-xs font-medium">
                No projects added yet.
              </div>
            )}

            <Button
              type="button"
              onClick={addProject}
              variant="secondary"
              className="w-full h-10 border-slate-800 border bg-surface hover:bg-slate-800/80 text-xs font-semibold gap-1.5"
              aria-label="Add new project entry"
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
                    aria-label={`Delete education entry ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="col-span-1 sm:col-span-2">
                      <label htmlFor={`edu-college-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">College / University Name</label>
                      <input
                        id={`edu-college-${index}`}
                        type="text"
                        value={edu.college}
                        onChange={(e) => updateEducation(index, 'college', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold"
                        placeholder="e.g. Stanford University"
                      />
                    </div>
                    <div>
                      <label htmlFor={`edu-degree-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Degree / Certification</label>
                      <input
                        id={`edu-degree-${index}`}
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
                          <label htmlFor={`edu-startYear-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Start Year</label>
                          <input
                            id={`edu-startYear-${index}`}
                            type="text"
                            value={edu.startYear}
                            onChange={(e) => updateEducation(index, 'startYear', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary transition-colors font-semibold text-center"
                            placeholder="e.g. 2016"
                          />
                        </div>
                        <div>
                          <label htmlFor={`edu-endYear-${index}`} className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">End Year</label>
                          <input
                            id={`edu-endYear-${index}`}
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
                No education history added yet. Add your academic qualifications.
              </div>
            )}

            <Button
              type="button"
              onClick={addEducation}
              variant="secondary"
              className="w-full h-10 border-slate-800 border bg-surface hover:bg-slate-800/80 text-xs font-semibold gap-1.5"
              aria-label="Add new education entry"
            >
              <Plus className="h-4 w-4 text-primary" /> Add Education Entry
            </Button>
          </div>
        </SectionAccordion>
      </div>
    </div>
  );
}
