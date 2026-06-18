import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import mammoth from 'mammoth';

// Set up the worker for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  return fullText;
}

export async function extractTextFromDocx(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

const SECTION_HEADERS = {
  summary: [/summary/i, /professional summary/i, /objective/i, /profile/i],
  skills: [/skills/i, /technical skills/i, /key skills/i, /core competencies/i, /expertise/i, /languages/i],
  experience: [/experience/i, /work history/i, /employment history/i, /professional experience/i, /employment/i],
  education: [/education/i, /academic history/i, /academic credentials/i, /qualifications/i],
  projects: [/projects/i, /personal projects/i, /academic projects/i, /key projects/i]
};

export function parseResumeText(text) {
  const lines = text.split('\n').map(l => l.trim());
  const sections = {
    personal: [],
    summary: [],
    skills: [],
    experience: [],
    projects: [],
    education: []
  };

  let currentSection = 'personal';

  for (let line of lines) {
    if (line.length === 0) continue;

    let isHeader = false;
    for (const [secKey, regexes] of Object.entries(SECTION_HEADERS)) {
      for (const regex of regexes) {
        if (line.length < 40 && regex.test(line)) {
          currentSection = secKey;
          isHeader = true;
          break;
        }
      }
      if (isHeader) break;
    }

    if (!isHeader) {
      sections[currentSection].push(line);
    }
  }

  // Parse Personal Info
  let fullName = '';
  let role = '';
  let email = '';
  let phone = '';
  let location = '';
  let linkedin = '';
  let github = '';

  // Extract links and emails using regex over the entire text or personal section
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) email = emailMatch[0];

  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) phone = phoneMatch[0];

  const linkedinMatch = text.match(/(?:linkedin\.com\/in\/[a-zA-Z0-9-_]+)/i);
  if (linkedinMatch) linkedin = linkedinMatch[0];

  const githubMatch = text.match(/(?:github\.com\/[a-zA-Z0-9-_]+)/i);
  if (githubMatch) github = githubMatch[0];

  const locMatch = text.match(/\b([A-Z][a-zA-Z\s]{1,15},\s*[A-Z]{2,15})\b/);
  if (locMatch) location = locMatch[1];

  const personalLines = sections.personal.filter(l => 
    !l.includes('@') && 
    !l.includes('http') && 
    !l.includes('/') && 
    !l.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)
  );

  if (personalLines.length > 0) {
    fullName = personalLines[0];
    if (personalLines.length > 1) {
      role = personalLines[1];
    }
  }

  // Parse Summary
  const summary = sections.summary.join(' ');

  // Parse Skills
  let skills = [];
  for (let line of sections.skills) {
    const split = line.split(/[,|•\t]+/).map(s => s.trim()).filter(s => s.length > 0);
    skills.push(...split);
  }
  skills = [...new Set(skills)].slice(0, 15);

  // Parse Education
  const education = [];
  let currentEdu = null;
  for (let line of sections.education) {
    const yearMatch = line.match(/\b(19\d{2}|20\d{2})\b/g);
    const hasYear = yearMatch && yearMatch.length > 0;
    const isCollege = /university|college|school|institute|academy/i.test(line);
    const isDegree = /bachelor|master|degree|b\.s\.|b\.a\.|m\.s\.|ph\.d|diploma|associate/i.test(line);

    if (isCollege || isDegree || hasYear) {
      const startYear = yearMatch && yearMatch[0] ? yearMatch[0] : '2015';
      const endYear = yearMatch && yearMatch[1] ? yearMatch[1] : '2019';

      if (isCollege && !isDegree) {
        if (currentEdu) education.push(currentEdu);
        currentEdu = {
          college: line,
          degree: 'B.S. in Computer Science',
          startYear,
          endYear
        };
      } else if (isDegree) {
        if (!currentEdu) {
          currentEdu = {
            college: 'University',
            degree: line,
            startYear,
            endYear
          };
        } else {
          currentEdu.degree = line;
        }
      }
    }
  }
  if (currentEdu) education.push(currentEdu);
  if (education.length === 0 && sections.education.length > 0) {
    education.push({
      college: sections.education[0] || 'University Name',
      degree: sections.education[1] || 'Degree/Major',
      startYear: '2015',
      endYear: '2019'
    });
  }

  // Parse Experience
  const experience = [];
  let currentExp = null;
  for (let line of sections.experience) {
    const dateMatch = line.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)?\s*(19\d{2}|20\d{2})\b/gi);
    const isCompanyOrRole = line.length < 85 && !line.startsWith('•') && !line.startsWith('-') && !line.startsWith('*');

    if (dateMatch && dateMatch.length > 0 && isCompanyOrRole) {
      if (currentExp) experience.push(currentExp);
      const companyText = line.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)?\s*(19\d{2}|20\d{2})\b/gi, '').trim();
      currentExp = {
        company: companyText || 'Company Name',
        role: 'Software Engineer',
        startDate: dateMatch[0] || 'Mar 2022',
        endDate: dateMatch[1] || 'Present',
        description: ''
      };
    } else if (currentExp) {
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        currentExp.description += (currentExp.description ? '\n' : '') + line;
      } else if (line.length < 50 && (currentExp.role === 'Software Engineer' || !currentExp.role)) {
        currentExp.role = line;
      } else {
        currentExp.description += (currentExp.description ? '\n' : '') + '• ' + line;
      }
    }
  }
  if (currentExp) experience.push(currentExp);
  if (experience.length === 0 && sections.experience.length > 0) {
    experience.push({
      company: sections.experience[0] || 'Company Name',
      role: sections.experience[1] || 'Job Role',
      startDate: '2022',
      endDate: 'Present',
      description: sections.experience.slice(2).join('\n')
    });
  }

  // Parse Projects
  const projects = [];
  let currentProj = null;
  for (let line of sections.projects) {
    const isHeader = line.length < 60 && !line.startsWith('•') && !line.startsWith('-') && !line.startsWith('*');

    if (isHeader) {
      if (currentProj) projects.push(currentProj);
      const ghMatch = line.match(/(github\.com\/[^\s]+)/i);
      const ghLink = ghMatch ? 'https://' + ghMatch[1] : '';
      const nameText = line.replace(/(github\.com\/[^\s]+)/i, '').trim();
      currentProj = {
        projectName: nameText || 'Project Name',
        techStack: 'React, Vite, CSS',
        description: '',
        githubLink: ghLink
      };
    } else if (currentProj) {
      if (line.toLowerCase().includes('tech') || line.toLowerCase().includes('stack') || line.toLowerCase().includes('technologies')) {
        currentProj.techStack = line.replace(/tech\s*stack:|technologies:/i, '').trim();
      } else {
        currentProj.description += (currentProj.description ? '\n' : '') + line;
      }
    }
  }
  if (currentProj) projects.push(currentProj);

  return {
    personal: {
      fullName: fullName || 'Candidate Name',
      role: role || 'Professional Role',
      email: email || 'candidate@domain.com',
      phone: phone || '+1 (555) 000-0000',
      location: location || 'Location, ST',
      linkedin: linkedin || 'linkedin.com/in/username',
      github: github || 'github.com/username',
    },
    summary: summary || 'A professional summary of accomplishments and technical expertise.',
    skills: skills.length > 0 ? skills : ['React', 'JavaScript', 'HTML/CSS'],
    experience: experience.length > 0 ? experience : [
      {
        company: 'Company Name',
        role: 'Job Role',
        startDate: 'Jan 2022',
        endDate: 'Present',
        description: '• Delivered key products and technical initiatives.'
      }
    ],
    education: education.length > 0 ? education : [
      {
        college: 'University Name',
        degree: 'Degree / Certificate',
        startYear: '2015',
        endYear: '2019'
      }
    ],
    projects: projects.length > 0 ? projects : [
      {
        projectName: 'Project Name',
        techStack: 'React, JavaScript',
        description: 'Built a high performance web application.',
        githubLink: ''
      }
    ]
  };
}
