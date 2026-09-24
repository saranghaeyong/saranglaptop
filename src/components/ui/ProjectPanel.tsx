import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Award, Cpu, ShieldCheck } from 'lucide-react';

interface ProjectPanelProps {
  isDark: boolean;
}

export const ProjectPanel: React.FC<ProjectPanelProps> = ({ isDark }) => {
  const { project } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6">
      {/* Component Anchor Tag */}
      <div className="flex items-center gap-2 text-xs font-mono-tech tracking-widest text-emerald-400">
        <span>HARDWARE ANCHOR</span>
        <span aria-hidden="true">·</span>
        <span>MOTHERBOARD & NEURAL PROCESSING UNIT</span>
      </div>

      {/* Project Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-mono-tech text-slate-400">
          <span>{project.institution}</span>
          <span aria-hidden="true">·</span>
          <span>{project.date}</span>
        </div>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight font-editorial leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {project.title}
        </h2>
      </div>

      {/* Academic Honors Metrics */}
      <div className="grid grid-cols-2 gap-3 font-mono-tech">
        <div className={`p-3 rounded border flex items-center gap-3 ${
          isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          <Award className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="text-[10px] uppercase opacity-70">ACADEMIC GRADE</div>
            <div className="text-sm font-bold">{project.grade}</div>
          </div>
        </div>

        <div className={`p-3 rounded border flex items-center gap-3 ${
          isDark ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-900'
        }`}>
          <Cpu className="w-5 h-5 text-blue-400 shrink-0" />
          <div>
            <div className="text-[10px] uppercase opacity-70">CREDITS ALLOCATED</div>
            <div className="text-sm font-bold">{project.credits} Credits</div>
          </div>
        </div>
      </div>

      {/* Project Description Paragraphs */}
      <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
        {project.description.map((para, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded border ${
              isDark ? 'bg-white/[0.02] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <p>{para}</p>
          </div>
        ))}
      </div>

      {/* Key Focus Disciplines */}
      <div>
        <div className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>KEY RESEARCH & APPLICATION DOMAINS</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-mono-tech text-slate-300">
          {project.keyAreas.map((area, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>{area}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <div className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 mb-2">
          COMPUTATIONAL TOOLSET & ARCHITECTURE
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono-tech">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded border ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
