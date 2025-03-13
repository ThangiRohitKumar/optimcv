
import React from 'react';
import { cn } from '@/lib/utils';

interface Keyword {
  text: string;
  relevance: number; // 0-1 score
  category: 'skill' | 'tool' | 'qualification' | 'experience' | 'other';
}

interface KeywordExtractionProps {
  keywords: Keyword[];
  onKeywordClick: (keyword: Keyword) => void;
  className?: string;
}

const categoryColors = {
  skill: { bg: 'bg-neon-blue/10', border: 'border-neon-blue', text: 'text-neon-blue' },
  tool: { bg: 'bg-neon-green/10', border: 'border-neon-green', text: 'text-neon-green' },
  qualification: { bg: 'bg-neon-yellow/10', border: 'border-neon-yellow', text: 'text-neon-yellow' },
  experience: { bg: 'bg-neon-cyan/10', border: 'border-neon-cyan', text: 'text-neon-cyan' },
  other: { bg: 'bg-neon-magenta/10', border: 'border-neon-magenta', text: 'text-neon-magenta' }
};

const KeywordExtraction: React.FC<KeywordExtractionProps> = ({ 
  keywords,
  onKeywordClick,
  className 
}) => {
  return (
    <div className={cn("glass-card rounded-lg p-5", className)}>
      <h2 className="text-white text-lg font-medium mb-4">Extracted Keywords</h2>
      
      {keywords.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-white/50">
          <p>No keywords extracted yet</p>
          <p className="text-sm mt-2">Upload your resume and add a job description to get started</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(categoryColors).map((category) => (
              <div 
                key={category}
                className="flex items-center gap-2 text-xs"
              >
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  categoryColors[category as keyof typeof categoryColors].bg,
                  categoryColors[category as keyof typeof categoryColors].border,
                )} />
                <span className="text-white/70 capitalize">{category}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => {
              const { bg, border, text } = categoryColors[keyword.category];
              const opacity = 0.5 + keyword.relevance * 0.5;
              
              return (
                <button
                  key={index}
                  onClick={() => onKeywordClick(keyword)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-all duration-300",
                    "hover:scale-105 active:scale-95",
                    bg,
                    border,
                    text
                  )}
                  style={{
                    opacity: opacity,
                    boxShadow: `0 0 ${Math.round(keyword.relevance * 8)}px currentColor`
                  }}
                >
                  {keyword.text}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default KeywordExtraction;
