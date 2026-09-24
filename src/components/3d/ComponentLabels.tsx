import React from 'react';
import { Html } from '@react-three/drei';
import { COMPONENT_ANNOTATIONS, ComponentSectionId } from '../../data/portfolioData';
import { audioService } from '../../utils/audio';

interface ComponentLabelsProps {
  isDark: boolean;
  explosionProgress: number;
  activeSection: ComponentSectionId | null;
  onSelectSection: (id: ComponentSectionId) => void;
}

export const ComponentLabels: React.FC<ComponentLabelsProps> = ({
  isDark,
  explosionProgress,
  activeSection,
  onSelectSection
}) => {
  // Only reveal labels when significantly exploded (> 0.4)
  if (explosionProgress < 0.35) return null;

  const fadeOpacity = Math.min(1, (explosionProgress - 0.35) / 0.4);

  return (
    <group>
      {COMPONENT_ANNOTATIONS.map((anno) => {
        const isActive = activeSection === anno.id;

        return (
          <group
            key={anno.id}
            position={anno.targetPosition}
          >
            <Html
              center
              distanceFactor={8}
              zIndexRange={[100, 0]}
              style={{
                opacity: fadeOpacity,
                transition: 'opacity 0.4s ease-out, transform 0.3s ease-out',
                pointerEvents: explosionProgress > 0.6 ? 'auto' : 'none'
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audioService.playClick();
                  onSelectSection(anno.id);
                }}
                onMouseEnter={() => audioService.playHover()}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded text-left transition-all duration-300 backdrop-blur-md cursor-pointer border ${
                  isActive
                    ? isDark
                      ? 'bg-blue-500/20 border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-105'
                      : 'bg-blue-600/15 border-blue-600 text-slate-950 shadow-md scale-105'
                    : isDark
                    ? 'bg-black/60 hover:bg-slate-900/80 border-white/10 hover:border-blue-400/50 text-slate-300 hover:text-white'
                    : 'bg-white/80 hover:bg-white border-slate-300 hover:border-blue-600 text-slate-700 hover:text-slate-950'
                }`}
                style={{ whiteSpace: 'nowrap' }}
              >
                {/* Status Dot / Target reticle */}
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-400 ring-2 ring-blue-400/40 animate-ping'
                      : 'bg-slate-400 group-hover:bg-blue-400'
                  }`}
                />
                
                <div className="flex flex-col">
                  <span className="font-mono-tech text-[9px] uppercase tracking-widest opacity-60">
                    {anno.hardwarePart}
                  </span>
                  <span className="font-mono-tech text-xs font-semibold tracking-wider">
                    {anno.label}
                  </span>
                </div>

                <span className="text-[10px] opacity-40 ml-1 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
