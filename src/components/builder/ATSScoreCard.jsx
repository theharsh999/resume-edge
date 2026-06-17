import React, { useEffect, useState } from 'react';

export function ATSScoreCard({ score = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Score counter animation
  useEffect(() => {
    let start = animatedScore;
    const end = score;
    if (start === end) return;
    
    const duration = 500; // ms
    const range = end - start;
    if (range === 0) return;
    
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const ease = progress * (2 - progress);
      const current = Math.round(start + range * ease);
      
      setAnimatedScore(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  // Color selection
  const getColorClasses = (val) => {
    if (val <= 40) return {
      stroke: 'stroke-red-500',
      text: 'text-red-500',
      bg: 'bg-red-500/10 border-red-500/20 text-red-400',
      label: 'Poor Compatibility'
    };
    if (val <= 70) return {
      stroke: 'stroke-amber-500',
      text: 'text-amber-500',
      bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      label: 'Average Match'
    };
    return {
      stroke: 'stroke-success',
      text: 'text-success',
      bg: 'bg-success/10 border-success/20 text-success',
      label: 'Excellent Match'
    };
  };

  const currentTheme = getColorClasses(score);
  const radius = 30;
  const circumference = 2 * Math.PI * radius; // ~188.495
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl border border-slate-800 bg-surface/40 text-center space-y-4 shadow-sm">
      <div className="text-left w-full">
        <h3 className="text-xs font-bold text-text uppercase tracking-wider">ATS Score</h3>
      </div>
      
      {/* Circle Ring */}
      <div className="relative flex items-center justify-center">
        <svg className="h-28 w-28 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            fill="none"
            stroke="#1e293b"
            strokeWidth="5"
          />
          {/* Progress circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            fill="none"
            className={`${currentTheme.stroke} transition-all duration-500 ease-out`}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-text leading-none">{animatedScore}</span>
          <span className="text-[10px] text-muted font-bold mt-0.5">/100</span>
        </div>
      </div>

      <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${currentTheme.bg}`}>
        {currentTheme.label}
      </div>
    </div>
  );
}
