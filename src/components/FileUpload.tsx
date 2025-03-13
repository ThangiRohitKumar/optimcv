
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FileUp, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  accept,
  className 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const validateFile = (file: File): boolean => {
    const acceptedTypes = accept.split(',').map(t => t.trim());
    
    if (!acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.endsWith(type);
      }
      return file.type === type;
    })) {
      setError(`Invalid file type. Please upload ${accept.replace(/,/g, ' or ')} files.`);
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size exceeds 10MB limit.');
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        onFileUpload(droppedFile);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        onFileUpload(selectedFile);
      }
    }
  };

  return (
    <div 
      className={cn(
        'relative w-full rounded-lg transition-all duration-300',
        className
      )}
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'glass-card w-full h-48 rounded-lg flex flex-col items-center justify-center gap-4 p-6 cursor-pointer transition-all duration-300',
          isDragging && 'neon-border bg-white/10',
          file && !error && 'border-neon-green bg-neon-green/5'
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label 
          htmlFor="fileInput"
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
        >
          {!file && (
            <>
              <div className="mb-3 p-3 rounded-full bg-black/30 border border-white/10">
                <FileUp className="w-6 h-6 text-neon-cyan" />
              </div>
              <p className="text-white/80 text-lg font-medium">Drop your resume here</p>
              <p className="text-white/50 text-sm">(PDF or DOC files)</p>
              <button className="mt-4 px-4 py-2 bg-black/30 border border-neon-cyan rounded-md text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300">
                Browse Files
              </button>
            </>
          )}
          
          {file && !error && (
            <>
              <div className="mb-3 p-3 rounded-full bg-black/30 border border-neon-green">
                <CheckCircle className="w-6 h-6 text-neon-green" />
              </div>
              <p className="text-white/80 text-lg font-medium">File Uploaded Successfully</p>
              <p className="text-white/50 text-sm">{file.name}</p>
              <button className="mt-4 px-4 py-2 bg-black/30 border border-white/20 rounded-md text-white/80 hover:bg-white/5 transition-all duration-300">
                Change File
              </button>
            </>
          )}
          
          {error && (
            <>
              <div className="mb-3 p-3 rounded-full bg-black/30 border border-red-500">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-white/80 text-lg font-medium">Upload Error</p>
              <p className="text-red-400 text-sm">{error}</p>
              <button className="mt-4 px-4 py-2 bg-black/30 border border-white/20 rounded-md text-white/80 hover:bg-white/5 transition-all duration-300">
                Try Again
              </button>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
