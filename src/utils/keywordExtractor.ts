
import { type Keyword } from '../types';

// In a real implementation, this would use NLP libraries or AI models for better extraction
// This is a simplified version for demonstration purposes

export const extractKeywords = (jobDescription: string): Keyword[] => {
  if (!jobDescription) return [];
  
  // Common technical skills
  const technicalSkills = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'PHP', 'Swift', 'Kotlin',
    'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'ASP.NET',
    'HTML', 'CSS', 'SASS', 'LESS', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Oracle',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'GitHub', 'GitLab', 'BitBucket',
    'REST', 'GraphQL', 'Microservices', 'Serverless', 'API', 'JSON', 'XML', 'AJAX',
  ];
  
  // Common tools
  const tools = [
    'Jira', 'Confluence', 'Trello', 'Slack', 'Teams', 'Zoom', 'Jenkins', 'Travis CI', 'CircleCI',
    'Webpack', 'Babel', 'ESLint', 'Prettier', 'npm', 'yarn', 'pnpm', 'Gradle', 'Maven',
    'VS Code', 'IntelliJ', 'Eclipse', 'Xcode', 'Android Studio', 'Figma', 'Sketch', 'Photoshop',
  ];
  
  // Common qualifications
  const qualifications = [
    'Bachelor', 'Master', 'PhD', 'Degree', 'Certificate', 'Certification', 'License', 'Diploma',
    'Certified', 'CSPO', 'CSM', 'PMP', 'MBA', 'CPA', 'CFA', 'AWS Certified', 'Microsoft Certified',
    'Google Certified', 'Cisco Certified', 'CompTIA', 'ITIL', 'Agile', 'Scrum', 'Kanban', 'Lean',
  ];
  
  // Common experience-related terms
  const experiences = [
    'years', 'experience', 'lead', 'senior', 'junior', 'entry-level', 'mid-level', 'architect',
    'manager', 'director', 'VP', 'C-level', 'CEO', 'CTO', 'CFO', 'COO', 'CMO', 'CIO',
    'team', 'project', 'product', 'development', 'management', 'leadership', 'collaboration',
    'client', 'customer', 'stakeholder', 'mentor', 'coach', 'consultant', 'advisor',
  ];
  
  const extractedKeywords: Keyword[] = [];
  
  // Extract keywords from job description
  const words = jobDescription.split(/\s+/);
  
  // Process each word in the job description
  words.forEach(word => {
    // Clean up the word
    const cleanWord = word.replace(/[^\w\s]/gi, '');
    if (cleanWord.length < 3) return; // Skip short words
    
    // Check if the word is a technical skill
    technicalSkills.forEach(skill => {
      if (jobDescription.toLowerCase().includes(skill.toLowerCase())) {
        const existingKeyword = extractedKeywords.find(
          k => k.text.toLowerCase() === skill.toLowerCase()
        );
        
        if (!existingKeyword) {
          extractedKeywords.push({
            text: skill,
            relevance: Math.random() * 0.5 + 0.5, // Random relevance between 0.5 and 1
            category: 'skill'
          });
        }
      }
    });
    
    // Check if the word is a tool
    tools.forEach(tool => {
      if (jobDescription.toLowerCase().includes(tool.toLowerCase())) {
        const existingKeyword = extractedKeywords.find(
          k => k.text.toLowerCase() === tool.toLowerCase()
        );
        
        if (!existingKeyword) {
          extractedKeywords.push({
            text: tool,
            relevance: Math.random() * 0.5 + 0.5,
            category: 'tool'
          });
        }
      }
    });
    
    // Check if the word is a qualification
    qualifications.forEach(qual => {
      if (jobDescription.toLowerCase().includes(qual.toLowerCase())) {
        const existingKeyword = extractedKeywords.find(
          k => k.text.toLowerCase() === qual.toLowerCase()
        );
        
        if (!existingKeyword) {
          extractedKeywords.push({
            text: qual,
            relevance: Math.random() * 0.5 + 0.5,
            category: 'qualification'
          });
        }
      }
    });
    
    // Check if the word is experience-related
    experiences.forEach(exp => {
      if (jobDescription.toLowerCase().includes(exp.toLowerCase())) {
        const existingKeyword = extractedKeywords.find(
          k => k.text.toLowerCase() === exp.toLowerCase()
        );
        
        if (!existingKeyword) {
          extractedKeywords.push({
            text: exp,
            relevance: Math.random() * 0.5 + 0.5,
            category: 'experience'
          });
        }
      }
    });
  });
  
  // Limit to top 20 keywords
  return extractedKeywords.slice(0, 20);
};

// Function to calculate the match between resume and job description
export const calculateKeywordMatch = (
  resumeText: string,
  keywords: Keyword[]
): { matched: Keyword[], unmatched: Keyword[] } => {
  const resumeLower = resumeText.toLowerCase();
  
  const matched: Keyword[] = [];
  const unmatched: Keyword[] = [];
  
  keywords.forEach(keyword => {
    if (resumeLower.includes(keyword.text.toLowerCase())) {
      matched.push(keyword);
    } else {
      unmatched.push(keyword);
    }
  });
  
  return { matched, unmatched };
};
