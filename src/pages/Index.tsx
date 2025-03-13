
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FileUpload from '@/components/FileUpload';
import JobDescription from '@/components/JobDescription';
import KeywordExtraction from '@/components/KeywordExtraction';
import AtsScoreCard from '@/components/AtsScoreCard';
import ResumePreview from '@/components/ResumePreview';
import { extractKeywords, calculateKeywordMatch } from '@/utils/keywordExtractor';
import { calculateAtsScore, generateOptimizedResume } from '@/utils/atsScoreCalculator';
import { parseResumeFromFile } from '@/utils/resumeParser';
import { type Keyword } from '@/types';
import { ArrowRight, Brain, BarChart, FileText } from 'lucide-react';

const Index = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeContent, setResumeContent] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [optimizedContent, setOptimizedContent] = useState<string>('');
  const [atsScore, setAtsScore] = useState({
    originalScore: 0,
    optimizedScore: 0,
    matches: { found: 0, total: 1 }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Process job description to extract keywords
  useEffect(() => {
    if (jobDescription.length > 50) {
      const extractedKeywords = extractKeywords(jobDescription);
      setKeywords(extractedKeywords);
      
      if (resumeContent) {
        const score = calculateAtsScore(resumeContent, extractedKeywords);
        setAtsScore(score);
      }
    }
  }, [jobDescription, resumeContent]);

  // Handle resume file upload
  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setResumeFile(file);
      const content = await parseResumeFromFile(file);
      setResumeContent(content);
      
      if (keywords.length > 0) {
        const score = calculateAtsScore(content, keywords);
        setAtsScore(score);
      }
      
      // Auto-advance to step 2
      setActiveStep(2);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle job description changes
  const handleDescriptionChange = (text: string) => {
    setJobDescription(text);
    
    // Auto-advance to step 3 if we have both resume and description
    if (text.length > 50 && resumeContent) {
      setActiveStep(3);
    }
  };

  // Optimize resume
  const handleOptimize = () => {
    setIsOptimizing(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const optimized = generateOptimizedResume(resumeContent, keywords);
      setOptimizedContent(optimized);
      
      const newScore = calculateAtsScore(resumeContent, keywords, optimized);
      setAtsScore(newScore);
      
      setIsOptimizing(false);
    }, 1500);
  };

  // Handle keyword click (for future enhancements)
  const handleKeywordClick = (keyword: Keyword) => {
    // This could be used to highlight where a keyword appears in the resume
    console.log('Keyword clicked:', keyword);
  };

  const steps = [
    { 
      number: 1, 
      title: 'Upload Resume', 
      icon: <FileText className="w-5 h-5" />,
      completed: !!resumeContent
    },
    { 
      number: 2, 
      title: 'Add Job Description', 
      icon: <Brain className="w-5 h-5" />,
      completed: jobDescription.length > 50 
    },
    { 
      number: 3, 
      title: 'Analyze & Optimize', 
      icon: <BarChart className="w-5 h-5" />,
      completed: !!optimizedContent
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero section with gradient background */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.1),transparent_60%)]"></div>
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-black/40 border border-neon-cyan/30 text-neon-cyan text-sm">
                ATS-Optimized Resume Builder
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white text-glow">
                Get <span className="text-neon-cyan">Noticed</span> <br /> 
                by Recruiters
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-lg">
                Tailor your resume to match job descriptions, optimize for ATS systems, 
                and increase your chances of getting an interview.
              </p>
              
              <div className="flex gap-4 items-center">
                <button 
                  onClick={() => document.getElementById('step-1')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 rounded-md bg-neon-cyan text-black font-medium hover:bg-white transition-all duration-300"
                >
                  Get Started
                </button>
                <a 
                  href="#how-it-works" 
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  Learn how it works
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block relative animate-fade-in">
              <div className="absolute -inset-0.5 bg-neon-cyan/20 blur-xl opacity-50 rounded-lg"></div>
              <div className="glass-card relative rounded-lg overflow-hidden p-6 h-[400px] flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full glass-card flex items-center justify-center border border-neon-cyan/30">
                    <div className="w-16 h-16 rounded-full animate-pulse-glow bg-neon-cyan/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-neon-cyan">87%</span>
                    </div>
                  </div>
                  <h3 className="text-white text-xl font-medium mb-4">Higher Interview Rate</h3>
                  <p className="text-white/70 max-w-xs mx-auto">
                    Our users report getting more interviews with ATS-optimized resumes tailored for specific job descriptions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Step indicators */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div 
              key={step.number}
              id={`step-${step.number}`}
              className={cn(
                "glass-card rounded-lg p-6 transition-all duration-300",
                activeStep === step.number && "neon-border-blue",
                step.completed && "border-neon-green"
              )}
              onClick={() => setActiveStep(step.number)}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  step.completed ? "bg-neon-green/20 text-neon-green" : "bg-black/30 text-white/80",
                  activeStep === step.number && !step.completed && "bg-neon-blue/20 text-neon-blue"
                )}>
                  {step.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </div>
                <div>
                  <h3 className={cn(
                    "text-lg font-medium",
                    step.completed ? "text-neon-green" : "text-white",
                    activeStep === step.number && !step.completed && "text-neon-blue"
                  )}>
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm">Step {step.number} of 3</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main application */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Input */}
          <div className="space-y-8">
            <div className={cn(
              "transition-all duration-500",
              activeStep !== 1 && "opacity-70 hover:opacity-100"
            )}>
              <h2 className="text-2xl font-bold text-white mb-4">Upload Your Resume</h2>
              <FileUpload 
                onFileUpload={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
              />
            </div>
            
            <div className={cn(
              "transition-all duration-500",
              activeStep !== 2 && "opacity-70 hover:opacity-100"
            )}>
              <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
              <JobDescription onDescriptionChange={handleDescriptionChange} />
            </div>
            
            <div className={cn(
              "transition-all duration-500",
              (!resumeContent || !jobDescription) && "opacity-50 pointer-events-none",
              activeStep !== 3 && "opacity-70 hover:opacity-100"
            )}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Analyze & Optimize</h2>
                <button
                  onClick={handleOptimize}
                  disabled={!resumeContent || !jobDescription || isOptimizing}
                  className={cn(
                    "px-4 py-2 rounded-md font-medium transition-all duration-300",
                    (!resumeContent || !jobDescription || isOptimizing) ? 
                      "bg-gray-700 text-gray-400 cursor-not-allowed" : 
                      "bg-neon-cyan text-black hover:bg-white"
                  )}
                >
                  {isOptimizing ? "Optimizing..." : optimizedContent ? "Re-Optimize" : "Optimize Resume"}
                </button>
              </div>
              
              <KeywordExtraction 
                keywords={keywords}
                onKeywordClick={handleKeywordClick}
              />
            </div>
          </div>
          
          {/* Right column - Results */}
          <div className="space-y-8">
            {keywords.length > 0 && resumeContent && (
              <AtsScoreCard 
                originalScore={atsScore.originalScore}
                optimizedScore={atsScore.optimizedScore}
                matches={atsScore.matches}
              />
            )}
            
            <ResumePreview 
              content={optimizedContent || resumeContent}
              fileName={resumeFile?.name || ''}
            />
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div 
        id="how-it-works" 
        className="max-w-7xl mx-auto px-6 py-20 mt-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Our sophisticated algorithm analyzes job descriptions and your resume to create an optimized version that passes through ATS systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-lg p-6 transition-all duration-300 hover:neon-border">
            <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-neon-cyan" />
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Resume Analysis</h3>
            <p className="text-white/70">
              Our system parses your resume to identify your skills, experience, and qualifications.
            </p>
          </div>
          
          <div className="glass-card rounded-lg p-6 transition-all duration-300 hover:neon-border-magenta">
            <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-neon-magenta" />
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Keyword Extraction</h3>
            <p className="text-white/70">
              We extract key requirements and skills from the job description.
            </p>
          </div>
          
          <div className="glass-card rounded-lg p-6 transition-all duration-300 hover:neon-border-blue">
            <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center mb-6">
              <BarChart className="w-6 h-6 text-neon-blue" />
            </div>
            <h3 className="text-xl font-medium text-white mb-3">ATS Optimization</h3>
            <p className="text-white/70">
              Your resume is tailored to include relevant keywords and formatted for ATS compatibility.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-white text-glow">
                  Optim<span className="text-neon-cyan">CV</span>
                </span>
              </div>
              <p className="text-white/50 text-sm max-w-xs">
                Helping job seekers optimize their resumes for ATS systems and increase their chances of getting interviewed.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 text-sm">
              <div>
                <h4 className="text-white font-medium mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/50 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-white/50 hover:text-white">How It Works</a></li>
                  <li><a href="#" className="text-white/50 hover:text-white">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/50 hover:text-white">About</a></li>
                  <li><a href="#" className="text-white/50 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-white/50 hover:text-white">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/50 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-white/50 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-white/50 hover:text-white">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} OptimCV. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/50 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white/50 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/50 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
