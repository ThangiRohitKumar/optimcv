
import React from 'react';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface AtsScoreCardProps {
  originalScore: number; // 0-100
  optimizedScore: number; // 0-100
  matches: {
    found: number;
    total: number;
  };
  className?: string;
}

const AtsScoreCard: React.FC<AtsScoreCardProps> = ({ 
  originalScore, 
  optimizedScore,
  matches,
  className 
}) => {
  const scoreDifference = optimizedScore - originalScore;
  const scoreData = [
    { name: 'Score', value: optimizedScore },
    { name: 'Remaining', value: 100 - optimizedScore }
  ];
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-neon-green';
    if (score >= 60) return 'text-neon-cyan';
    if (score >= 40) return 'text-neon-yellow';
    return 'text-neon-magenta';
  };
  
  const getPieColor = (score: number) => {
    if (score >= 80) return '#39FF14';
    if (score >= 60) return '#00FFFF';
    if (score >= 40) return '#FFFF00';
    return '#FF00FF';
  };

  return (
    <div className={cn("glass-card rounded-lg p-5", className)}>
      <h2 className="text-white text-lg font-medium mb-6">ATS Compatibility Score</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="w-52 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  strokeWidth={0}
                >
                  <Cell key="score" fill={getPieColor(optimizedScore)} />
                  <Cell key="remaining" fill="#1e293b" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="relative -mt-[6.5rem] flex flex-col items-center justify-center">
              <span className={cn(
                "text-4xl font-bold", 
                getScoreColor(optimizedScore)
              )}>
                {Math.round(optimizedScore)}%
              </span>
              {scoreDifference > 0 && (
                <span className="text-neon-green text-sm mt-1">
                  +{scoreDifference.toFixed(1)}%
                </span>
              )}
            </div>
          </div>
          
          <div className="flex justify-between w-full mt-4">
            <div className="text-center">
              <p className="text-white/50 text-xs">Original</p>
              <p className={cn(
                "text-lg font-medium",
                getScoreColor(originalScore)
              )}>
                {Math.round(originalScore)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/50 text-xs">Optimized</p>
              <p className={cn(
                "text-lg font-medium",
                getScoreColor(optimizedScore)
              )}>
                {Math.round(optimizedScore)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <h3 className="text-white text-base font-medium mb-3">Keyword Matches</h3>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white/70 text-sm">Found in Resume</span>
              <span className="text-white/90 text-sm font-medium">{matches.found} / {matches.total}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-value bg-neon-cyan"
                style={{ width: `${(matches.found / matches.total) * 100}%` }}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-base font-medium mb-2">What This Means</h3>
            <ul className="space-y-2">
              {optimizedScore >= 80 ? (
                <li className="text-white/80 text-sm flex items-start gap-2">
                  <span className="text-neon-green">●</span>
                  <span>Excellent match for this position. Your optimized resume is highly likely to pass ATS screening.</span>
                </li>
              ) : optimizedScore >= 60 ? (
                <li className="text-white/80 text-sm flex items-start gap-2">
                  <span className="text-neon-cyan">●</span>
                  <span>Good match for this position. Your resume has a good chance of passing ATS screening.</span>
                </li>
              ) : optimizedScore >= 40 ? (
                <li className="text-white/80 text-sm flex items-start gap-2">
                  <span className="text-neon-yellow">●</span>
                  <span>Moderate match. Consider adding more relevant keywords to improve your chances.</span>
                </li>
              ) : (
                <li className="text-white/80 text-sm flex items-start gap-2">
                  <span className="text-neon-magenta">●</span>
                  <span>Low match. Your resume may not pass ATS filters. Significant optimization recommended.</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtsScoreCard;
