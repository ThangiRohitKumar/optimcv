
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card rounded-lg p-12 max-w-md w-full text-center relative overflow-hidden animate-fade-in">
        <div className="absolute -inset-0.5 bg-neon-cyan/20 blur-xl opacity-50 rounded-lg"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full glass-card flex items-center justify-center border border-neon-cyan/30">
            <h1 className="text-6xl font-bold text-neon-cyan text-glow">404</h1>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-white/70 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <a 
            href="/" 
            className="px-6 py-3 rounded-md bg-neon-cyan text-black font-medium hover:bg-white transition-all duration-300 inline-block"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
