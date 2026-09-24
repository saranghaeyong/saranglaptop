import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Award, Calendar, Building2 } from 'lucide-react';

interface CertificationsPanelProps {
  isDark: boolean;
}

export const CertificationsPanel: React.FC<CertificationsPanelProps> = ({ isDark }) => {
  const { certifications } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6">
      {/* Component Anchor Tag */}
      <div className="flex items-center gap-2 text-xs font-mono-tech tracking-widest text-cyan-400">
        <span>HARDWARE ANCHOR</span>
        <span aria-hidden="true">·</span>
        <span>HIGH-SPEED NVME M.2 STORAGE</span>
      </div>

      <div>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight font-editorial ${isDark ? 'text-white' : 'text-slate-900'}`}>
          CERTIFICATIONS & DIPLOMAS
        </h2>
        <p className="text-xs sm:text-sm font-mono-tech text-slate-400 mt-1">
          Technical accreditations and professional computer training diplomas.
        </p>
      </div>

      <div className="space-y-3.5">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className={`p-4 rounded border ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h3 className={`font-mono-tech text-xs sm:text-sm font-bold tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {cert.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs font-mono-tech text-slate-400">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{cert.issuer}</span>
                  </span>
                  <span className="opacity-40">·</span>
                  <span className="flex items-center gap-1 text-cyan-300">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.year}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
