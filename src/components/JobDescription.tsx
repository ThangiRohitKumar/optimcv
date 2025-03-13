
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface JobDescriptionProps {
  onDescriptionChange: (description: string) => void;
  className?: string;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ 
  onDescriptionChange,
  className 
}) => {
  const [description, setDescription] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 5000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setDescription(text);
      setCharCount(text.length);
      onDescriptionChange(text);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex justify-between items-center">
        <label htmlFor="jobDescription" className="text-white text-sm font-medium">
          Job Description
        </label>
        <span className={cn(
          "text-xs",
          charCount > maxChars * 0.9 ? "text-red-400" : "text-white/50"
        )}>
          {charCount}/{maxChars}
        </span>
      </div>
      
      <div className="relative glass-card rounded-lg focus-within:neon-border-blue">
        <textarea
          id="jobDescription"
          value={description}
          onChange={handleChange}
          placeholder="Paste the job description here..."
          className="w-full h-64 bg-transparent text-white/90 p-4 focus:outline-none rounded-lg resize-none"
        />
        
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button 
            className="p-2 rounded-md bg-black/30 border border-white/10 text-white/70 hover:bg-white/5 transition-all"
            onClick={() => navigator.clipboard.readText().then(text => {
              setDescription(text.substring(0, maxChars));
              setCharCount(Math.min(text.length, maxChars));
              onDescriptionChange(text.substring(0, maxChars));
            })}
          >
            Paste
          </button>
          <button 
            className="p-2 rounded-md bg-black/30 border border-white/10 text-white/70 hover:bg-white/5 transition-all"
            onClick={() => {
              setDescription('');
              setCharCount(0);
              onDescriptionChange('');
            }}
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-white/90 text-sm mb-2">Quick Tips:</h3>
        <ul className="list-disc list-inside text-xs text-white/60 space-y-1">
          <li>Include the complete job description for best results</li>
          <li>More detailed descriptions lead to better keyword extraction</li>
          <li>Make sure to include required skills and qualifications</li>
        </ul>
      </div>
    </div>
  );
};

export default JobDescription;
