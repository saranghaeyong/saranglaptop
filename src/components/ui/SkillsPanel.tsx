import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Code, Database, Globe, Wrench } from 'lucide-react';

interface SkillsPanelProps {
  isDark: boolean;
}

export const SkillsPanel: React.FC<SkillsPanelProps> = ({ isDark }) => {
  const { skills } = PORTFOLIO_DATA;

  const categories = [
    {
      title: 'PROGRAMMING',
      icon: Code,
      items: skills.programming
    },
    {
      title: 'DATABASE SYSTEMS',
      icon: Database,
      items: skills.database
    },
    {
      title: 'WEB TECHNOLOGIES',
      icon: Globe,
      items: skills.webTechnologies
    },
    {
      title: 'DEVELOPMENT & CREATIVE TOOLS',
      icon: Wrench,
      items: skills.tools
    }
  ];

  return (
    <div className="space-y-6">
      {/* Component Anchor Tag */}
      <div className="flex items-center gap-2 text-xs font-mono-tech tracking-widest text-indigo-400">
        <span>HARDWARE ANCHOR</span>
        <span aria-hidden="true">·</span>
        <span>KEYBOARD INTERFACE & INPUT DECK</span>
      </div>

      <div>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight font-editorial ${isDark ? 'text-white' : 'text-slate-900'}`}>
          TECHNICAL CAPABILITIES
        </h2>
        <p className="text-xs sm:text-sm font-mono-tech text-slate-400 mt-1">
          Core engineering competencies, languages, environments, and toolchains.
        </p>
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded border ${
                isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-blue-400" />
                <span className="font-mono-tech text-xs tracking-wider font-semibold text-slate-300">
                  {cat.title}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className={`px-2.5 py-1 text-xs font-mono-tech rounded border ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-slate-200'
                        : 'bg-white border-slate-300 text-slate-800 shadow-xs'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
