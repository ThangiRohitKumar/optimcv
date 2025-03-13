
import React, { useEffect, useRef } from 'react';
import { 
  FileText, Briefcase, GraduationCap, Award, 
  Check, Clock, LineChart, PieChart, BarChart, 
  Users, Layers, Target, Brain
} from 'lucide-react';

const BackgroundInfographics = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize floating elements with random positions and speeds
    const container = containerRef.current;
    const elements = container.querySelectorAll('.floating-element');
    
    elements.forEach((element) => {
      // Random starting position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random speeds
      const speedX = (Math.random() - 0.5) * 0.04;
      const speedY = (Math.random() - 0.5) * 0.04;
      
      // Store data attributes
      element.setAttribute('data-x', x.toString());
      element.setAttribute('data-y', y.toString());
      element.setAttribute('data-speed-x', speedX.toString());
      element.setAttribute('data-speed-y', speedY.toString());
      
      // Set initial position
      (element as HTMLElement).style.left = `${x}%`;
      (element as HTMLElement).style.top = `${y}%`;
    });
    
    // Animation frame for movement
    let animationFrameId: number;
    const animate = () => {
      elements.forEach((element) => {
        let x = parseFloat(element.getAttribute('data-x') || '0');
        let y = parseFloat(element.getAttribute('data-y') || '0');
        const speedX = parseFloat(element.getAttribute('data-speed-x') || '0');
        const speedY = parseFloat(element.getAttribute('data-speed-y') || '0');
        
        // Update position
        x += speedX;
        y += speedY;
        
        // Boundary checking with rebound
        if (x > 95 || x < 5) {
          element.setAttribute('data-speed-x', (-speedX).toString());
        }
        
        if (y > 95 || y < 5) {
          element.setAttribute('data-speed-y', (-speedY).toString());
        }
        
        // Update data and style
        element.setAttribute('data-x', x.toString());
        element.setAttribute('data-y', y.toString());
        (element as HTMLElement).style.left = `${x}%`;
        (element as HTMLElement).style.top = `${y}%`;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  const infographicElements = [
    { Icon: FileText, label: "Resume", color: "text-neon-cyan" },
    { Icon: Briefcase, label: "Jobs", color: "text-neon-blue" },
    { Icon: GraduationCap, label: "Internships", color: "text-neon-magenta" },
    { Icon: Award, label: "Skills", color: "text-neon-green" },
    { Icon: Check, label: "Matched", color: "text-neon-cyan" },
    { Icon: Clock, label: "Recent", color: "text-neon-blue" },
    { Icon: LineChart, label: "Growth", color: "text-neon-magenta" },
    { Icon: BarChart, label: "Statistics", color: "text-neon-cyan" },
    { Icon: PieChart, label: "Metrics", color: "text-neon-green" },
    { Icon: Users, label: "Network", color: "text-neon-blue" },
    { Icon: Layers, label: "Experience", color: "text-neon-cyan" },
    { Icon: Target, label: "Goals", color: "text-neon-magenta" },
    { Icon: Brain, label: "AI Match", color: "text-neon-green" }
  ];
  
  // Random size classes
  const sizeClasses = ["w-12 h-12", "w-16 h-16", "w-20 h-20"];
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {infographicElements.map((item, index) => {
        const IconComponent = item.Icon;
        const sizeClass = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
        
        return (
          <div 
            key={index}
            className={`floating-element absolute ${sizeClass} opacity-10 hover:opacity-30 transition-opacity duration-500`}
            style={{
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <IconComponent className={`${item.color} w-full h-full`} />
              <span className={`text-xs font-semibold mt-1 ${item.color}`}>
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
      
      {/* Data visualization elements */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={`chart-${index}`}
          className="floating-element absolute opacity-5 hover:opacity-15 transition-opacity duration-500"
          style={{
            width: `${80 + Math.random() * 120}px`,
            height: `${60 + Math.random() * 80}px`,
          }}
        >
          <div className="w-full h-full rounded-md border border-neon-cyan/30 bg-black/20 backdrop-blur-sm flex flex-col">
            <div className="h-2 bg-neon-cyan/30 w-full rounded-t-md"></div>
            <div className="flex-grow p-2 flex items-end justify-around">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className="w-3 bg-neon-cyan/50"
                  style={{ height: `${10 + Math.random() * 90}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {/* Circle stats */}
      {Array.from({ length: 3 }).map((_, index) => {
        const percentage = 25 + Math.floor(Math.random() * 75);
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - (percentage / 100) * circumference;
        
        return (
          <div
            key={`stat-${index}`}
            className="floating-element absolute opacity-10 hover:opacity-30 transition-opacity duration-500"
            style={{
              width: '120px',
              height: '120px',
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="opacity-20 stroke-neon-magenta fill-transparent"
                  strokeWidth="6"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="stroke-neon-magenta fill-transparent"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  r="40"
                  cx="50"
                  cy="50"
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="55"
                  className="fill-neon-magenta text-xl font-bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {percentage}%
                </text>
              </svg>
            </div>
          </div>
        );
      })}
      
      {/* Line connecting elements */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--colors-neon-cyan)" />
            <stop offset="50%" stopColor="var(--colors-neon-blue)" />
            <stop offset="100%" stopColor="var(--colors-neon-magenta)" />
          </linearGradient>
        </defs>
        <path 
          d="M0,100 Q150,50 300,200 T600,100 T900,300" 
          fill="none" 
          stroke="url(#line-gradient)" 
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        <path 
          d="M100,300 Q250,150 400,250 T700,200 T1000,150" 
          fill="none" 
          stroke="url(#line-gradient)" 
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      </svg>
    </div>
  );
};

export default BackgroundInfographics;
