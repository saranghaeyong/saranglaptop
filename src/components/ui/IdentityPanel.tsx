import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Mail, MapPin } from 'lucide-react';

interface IdentityPanelProps {
  isDark: boolean;
}

export const IdentityPanel: React.FC<IdentityPanelProps> = ({ isDark }) => {
  const { identity, summary } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6">
      {/* Component Anchor Tag */}
      <div className="flex items-center gap-2 text-xs font-mono-tech tracking-widest text-blue-400">
        <span>HARDWARE ANCHOR</span>
        <span aria-hidden="true">·</span>
        <span>RETINA DISPLAY ASSEMBLY</span>
      </div>

      {/* Main Heading */}
      <div>
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight font-editorial ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {identity.name}
        </h2>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs sm:text-sm font-mono-tech tracking-wider text-slate-400">
          {identity.tagline.map((tag, idx) => (
            <React.Fragment key={idx}>
              <span>{tag}</span>
              {idx < identity.tagline.length - 1 && <span className="opacity-40">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Narrative Summary */}
      <div className={`p-4 rounded border text-sm sm:text-base leading-relaxed ${
        isDark ? 'bg-white/[0.03] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}>
        <p>{summary}</p>
      </div>

      {/* Quick Credentials / Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech text-xs">
        <div className={`p-3 rounded border flex items-center gap-3 ${
          isDark ? 'bg-white/[0.02] border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <Mail className="w-4 h-4 text-blue-400 shrink-0" />
          <a href={`mailto:${identity.email}`} className="hover:underline truncate">
            {identity.email}
          </a>
        </div>

        <div className={`p-3 rounded border flex items-center gap-3 sm:col-span-2 ${
          isDark ? 'bg-white/[0.02] border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{identity.location}</span>
        </div>
      </div>
    </div>
  );
};
