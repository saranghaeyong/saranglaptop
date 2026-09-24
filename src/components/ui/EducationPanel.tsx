import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

interface EducationPanelProps {
  isDark: boolean;
}

export const EducationPanel: React.FC<EducationPanelProps> = ({ isDark }) => {
  const { education } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6">
      {/* Component Anchor Tag */}
      <div className="flex items-center gap-2 text-xs font-mono-tech tracking-widest text-amber-400">
        <span>HARDWARE ANCHOR</span>
        <span aria-hidden="true">·</span>
        <span>LITHIUM POWER CELL & ENERGY SUBSTRATE</span>
      </div>

      <div>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight font-editorial ${isDark ? 'text-white' : 'text-slate-900'}`}>
          ACADEMIC FOUNDATION
        </h2>
        <p className="text-xs sm:text-sm font-mono-tech text-slate-400 mt-1">
          Chronological university degrees and secondary schooling.
        </p>
      </div>

      <div className="space-y-3.5">
        {education.map((edu, idx) => (
          <div
            key={idx}
            className={`p-4 rounded border transition-colors ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <h3 className={`font-mono-tech text-xs sm:text-sm font-bold tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {edu.degree}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono-tech text-slate-400 shrink-0 sm:self-center">
                <Calendar className="w-3.5 h-3.5" />
                <span>{edu.period}</span>
              </div>
            </div>

            <div className="ml-6 space-y-1">
              <p className="text-xs sm:text-sm text-slate-300">
                {edu.institution}
              </p>
              
              <div className="flex items-center gap-3 pt-1 text-xs font-mono-tech">
                <span className="text-amber-300 font-semibold">{edu.score}</span>
                <span className="opacity-40">·</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {edu.division}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
