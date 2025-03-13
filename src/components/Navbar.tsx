
import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-black/30 border-b border-white/10',
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="text-xl font-bold text-white text-glow">
              Optim<span className="text-neon-cyan">CV</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/70 hover:text-white transition-colors">How It Works</a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">About</a>
          <button className="px-4 py-2 bg-black/30 border border-neon-cyan rounded-md text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
