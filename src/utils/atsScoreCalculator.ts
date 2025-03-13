import { type Keyword } from '../types';

interface ScoreResult {
  originalScore: number;
  optimizedScore: number;
  matches: {
    found: number;
    total: number;
  };
}

// Calculate ATS score based on keyword matches
export const calculateAtsScore = (
  resumeText: string,
  keywords: Keyword[],
  optimizedContent?: string
): ScoreResult => {
  if (!resumeText || keywords.length === 0) {
    return {
      originalScore: 0,
      optimizedScore: 0,
      matches: { found: 0, total: keywords.length || 1 }
    };
  }
  
  const resumeLower = resumeText.toLowerCase();
  const optimizedLower = optimizedContent ? optimizedContent.toLowerCase() : resumeLower;
  
  let originalMatches = 0;
  let optimizedMatches = 0;
  
  // Weight factors for scoring
  const categoryWeights = {
    skill: 1.5,
    tool: 1.2,
    qualification: 1.3,
    experience: 1.0,
    other: 0.8
  };
  
  // Calculate matches
  keywords.forEach(keyword => {
    const keywordLower = keyword.text.toLowerCase();
    
    // Check original resume
    if (resumeLower.includes(keywordLower)) {
      originalMatches += 1 * categoryWeights[keyword.category] * keyword.relevance;
    }
    
    // Check optimized resume
    if (optimizedLower.includes(keywordLower)) {
      optimizedMatches += 1 * categoryWeights[keyword.category] * keyword.relevance;
    }
  });
  
  // Calculate maximum possible score
  const maxPossibleScore = keywords.reduce((sum, keyword) => {
    return sum + (1 * categoryWeights[keyword.category] * keyword.relevance);
  }, 0);
  
  // Format scores as percentages
  const originalScore = (originalMatches / maxPossibleScore) * 100;
  const optimizedScore = (optimizedMatches / maxPossibleScore) * 100;
  
  // Count exact matches for display
  const exactMatchesOriginal = keywords.filter(keyword => 
    resumeLower.includes(keyword.text.toLowerCase())
  ).length;
  
  const exactMatchesOptimized = optimizedContent ? 
    keywords.filter(keyword => optimizedLower.includes(keyword.text.toLowerCase())).length : 
    exactMatchesOriginal;
  
  return {
    originalScore,
    optimizedScore: optimizedContent ? optimizedScore : originalScore,
    matches: {
      found: optimizedContent ? exactMatchesOptimized : exactMatchesOriginal,
      total: keywords.length
    }
  };
};

// Generate optimized content based on resume and keywords
export const generateOptimizedResume = (
  resumeText: string,
  keywords: Keyword[]
): string => {
  if (!resumeText) return '';
  
  // Simple optimization strategy:
  // 1. Keep the original resume as base
  // 2. If a keyword is missing, try to add it naturally
  
  let optimizedResume = resumeText;
  
  const resumeLower = resumeText.toLowerCase();
  const missingKeywords = keywords.filter(
    keyword => !resumeLower.includes(keyword.text.toLowerCase())
  );
  
  // For simulation purposes, we'll add missing keywords to the skills section
  if (missingKeywords.length > 0) {
    // Find the skills section
    const skillsIndex = optimizedResume.indexOf('SKILLS');
    
    if (skillsIndex !== -1) {
      // Find the end of the skills section (next section)
      let nextSectionIndex = optimizedResume.indexOf('EXPERIENCE', skillsIndex);
      if (nextSectionIndex === -1) {
        nextSectionIndex = optimizedResume.indexOf('EDUCATION', skillsIndex);
      }
      if (nextSectionIndex === -1) {
        nextSectionIndex = optimizedResume.length;
      }
      
      // Extract skills section
      const skillsSection = optimizedResume.substring(skillsIndex, nextSectionIndex);
      
      // Add missing keywords as bullet points
      let updatedSkillsSection = skillsSection;
      
      // Group missing keywords by category
      const missingSkills = missingKeywords.filter(k => k.category === 'skill');
      const missingTools = missingKeywords.filter(k => k.category === 'tool');
      
      // Add missing skills
      if (missingSkills.length > 0) {
        const skillsToAdd = missingSkills.map(k => k.text).join(', ');
        updatedSkillsSection += `\n- Additional Skills: ${skillsToAdd}`;
      }
      
      // Add missing tools
      if (missingTools.length > 0) {
        const toolsToAdd = missingTools.map(k => k.text).join(', ');
        updatedSkillsSection += `\n- Additional Tools: ${toolsToAdd}`;
      }
      
      // Replace the original skills section
      optimizedResume = 
        optimizedResume.substring(0, skillsIndex) + 
        updatedSkillsSection + 
        optimizedResume.substring(nextSectionIndex);
    } else {
      // If no skills section, add one
      optimizedResume += '\n\nADDITIONAL SKILLS\n';
      
      // Group by category
      const missingByCategory: Record<string, Keyword[]> = {};
      missingKeywords.forEach(keyword => {
        if (!missingByCategory[keyword.category]) {
          missingByCategory[keyword.category] = [];
        }
        missingByCategory[keyword.category].push(keyword);
      });
      
      // Add each category
      Object.entries(missingByCategory).forEach(([category, keywords]) => {
        optimizedResume += `- ${category.charAt(0).toUpperCase() + category.slice(1)}: ${keywords.map(k => k.text).join(', ')}\n`;
      });
    }
  }
  
  return optimizedResume;
};
