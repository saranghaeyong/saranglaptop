import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Mail, MapPin, Film } from 'lucide-react';

interface ContactPanelProps {
  isDark: boolean;
}

export const ContactPanel: React.FC<ContactPanelProps> = ({ isDark }) => {
  const { contact, credits } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6">
      {/* Component Anchor Tag */}
      <div className="flex items-center gap-2 text-xs font-mono-tech tracking-widest text-purple-400">
        <span>HARDWARE ANCHOR</span>
        <span aria-hidden="true">·</span>
        <span>UNIBODY BASE CHASSIS & FOUNDATIONAL STAMP</span>
      </div>

      <div>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight font-editorial ${isDark ? 'text-white' : 'text-slate-900'}`}>
          COMMUNICATIONS & INQUIRIES
        </h2>
        <p className="text-xs sm:text-sm font-mono-tech text-slate-400 mt-1">
          Direct channels for professional opportunities and technical collaboration.
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="space-y-3 font-mono-tech text-xs sm:text-sm">
        <a
          href={`mailto:${contact.email}`}
          className={`p-4 rounded border flex items-center justify-between transition-all group ${
            isDark
              ? 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 hover:border-purple-400/50 text-slate-200'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-purple-500 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">EMAIL ADDRESS</div>
              <div className="font-semibold text-sm">{contact.email}</div>
            </div>
          </div>
          <span className="text-xs opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
            SEND MESSAGE →
          </span>
        </a>

        <div
          className={`p-4 rounded border flex items-center gap-3 ${
            isDark ? 'bg-white/[0.02] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">PHYSICAL LOCATION</div>
            <div className="font-semibold text-sm">{contact.location}</div>
          </div>
        </div>
      </div>

      {/* FINAL CINEMATIC TITLE & CREDITS */}
      <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2 mb-3 text-xs font-mono-tech tracking-widest text-slate-400">
          <Film className="w-3.5 h-3.5" />
          <span>CINEMATIC COLOPHON & DISCIPLINES</span>
        </div>

        <div className="space-y-4">
          <h3 className={`text-2xl font-bold font-editorial tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {credits.name}
          </h3>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono-tech tracking-widest text-slate-300">
            {credits.disciplines.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span>{item}</span>
                {idx < credits.disciplines.length - 1 && <span className="opacity-30">·</span>}
              </span>
            ))}
          </div>

          <div className={`p-4 rounded border font-mono-tech text-xs space-y-1 ${
            isDark ? 'bg-white/[0.01] border-white/5 text-slate-400' : 'bg-slate-100/50 border-slate-200 text-slate-600'
          }`}>
            <div className="font-semibold tracking-wider text-slate-300">{credits.byline}</div>
            <div>{credits.copyright}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
