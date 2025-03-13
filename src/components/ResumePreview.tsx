
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FileDown, Copy, CheckCheck, ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  content: string;
  fileName: string;
  className?: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  content,
  fileName,
  className 
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className={cn("glass-card rounded-lg overflow-hidden flex flex-col", className)}>
      <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-white text-lg font-medium">Optimized Resume</h2>
        
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-md bg-black/30 border border-white/10 text-white/70 hover:bg-white/5 transition-all"
            title="Copy to clipboard"
          >
            {copied ? <CheckCheck className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
          </button>
          
          <button
            className="p-2 rounded-md bg-black/30 border border-white/10 text-white/70 hover:bg-white/5 transition-all"
            title="Download"
          >
            <FileDown className="w-4 h-4" />
          </button>
          
          <button
            className="p-2 rounded-md bg-black/30 border border-white/10 text-white/70 hover:bg-white/5 transition-all"
            title="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-5">
        {content ? (
          <pre className="text-white/80 whitespace-pre-wrap font-sans text-sm">{content}</pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/50 py-12">
            <p>No optimized resume generated yet</p>
            <p className="text-sm mt-2">Upload your resume and add a job description to get started</p>
          </div>
        )}
      </div>
      
      {fileName && (
        <div className="px-5 py-3 border-t border-white/10 flex justify-between items-center">
          <span className="text-white/50 text-xs">{fileName}</span>
          <span className="text-white/50 text-xs">{content.length} characters</span>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
