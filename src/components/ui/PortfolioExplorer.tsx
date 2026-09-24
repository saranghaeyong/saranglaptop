import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Layers, RotateCcw } from 'lucide-react';
import { COMPONENT_ANNOTATIONS, ComponentSectionId } from '../../data/portfolioData';
import { IdentityPanel } from './IdentityPanel';
import { ProjectPanel } from './ProjectPanel';
import { SkillsPanel } from './SkillsPanel';
import { EducationPanel } from './EducationPanel';
import { CertificationsPanel } from './CertificationsPanel';
import { ContactPanel } from './ContactPanel';
import { audioService } from '../../utils/audio';

interface PortfolioExplorerProps {
  isDark: boolean;
  isExploded: boolean;
  activeSection: ComponentSectionId;
  onSelectSection: (id: ComponentSectionId) => void;
  onReassemble: () => void;
}

export const PortfolioExplorer: React.FC<PortfolioExplorerProps> = ({
  isDark,
  isExploded,
  activeSection,
  onSelectSection,
  onReassemble
}) => {
  if (!isExploded) return null;

  const currentIndex = COMPONENT_ANNOTATIONS.findIndex((a) => a.id === activeSection);

  const handlePrev = () => {
    audioService.playClick();
    const prevIndex = (currentIndex - 1 + COMPONENT_ANNOTATIONS.length) % COMPONENT_ANNOTATIONS.length;
    onSelectSection(COMPONENT_ANNOTATIONS[prevIndex].id);
  };

  const handleNext = () => {
    audioService.playClick();
    const nextIndex = (currentIndex + 1) % COMPONENT_ANNOTATIONS.length;
    onSelectSection(COMPONENT_ANNOTATIONS[nextIndex].id);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-6 md:p-8">
      {/* Top spacer for header */}
      <div className="h-16" />

      {/* Main Content Overlay Area (Floating editorial panel on right on desktop, modal on mobile) */}
      <div className="flex-1 flex justify-end items-center max-w-7xl mx-auto w-full">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full md:w-[500px] lg:w-[540px] max-h-[75vh] flex flex-col rounded-lg border backdrop-blur-xl shadow-2xl overflow-hidden ${
            isDark
              ? 'bg-black/80 border-white/10 text-white shadow-black/80'
              : 'bg-white/90 border-slate-200 text-slate-900 shadow-slate-300/50'
          }`}
        >
          {/* Panel Header */}
          <div className={`p-4 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-slate-50/50'
          }`}>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span className="font-mono-tech text-xs tracking-widest uppercase font-semibold">
                COMPONENT {currentIndex + 1} / {COMPONENT_ANNOTATIONS.length}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
                title="Previous Component"
                aria-label="Previous section"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
                title="Next Component"
                aria-label="Next section"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className={`h-4 w-px mx-1 ${isDark ? 'bg-white/15' : 'bg-slate-300'}`} />
              <button
                onClick={() => {
                  audioService.playClick();
                  onReassemble();
                }}
                className={`p-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black'
                }`}
                title="Reassemble Laptop (ESC)"
                aria-label="Reassemble laptop"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Panel Scrollable Body */}
          <div className="p-6 overflow-y-auto overscroll-contain flex-1">
            {activeSection === 'identity' && <IdentityPanel isDark={isDark} />}
            {activeSection === 'skills' && <SkillsPanel isDark={isDark} />}
            {activeSection === 'project' && <ProjectPanel isDark={isDark} />}
            {activeSection === 'education' && <EducationPanel isDark={isDark} />}
            {activeSection === 'certifications' && <CertificationsPanel isDark={isDark} />}
            {activeSection === 'contact' && <ContactPanel isDark={isDark} />}
          </div>

          {/* Panel Footer: Quick next action */}
          <div className={`p-3 px-6 border-t flex items-center justify-between text-xs font-mono-tech ${
            isDark ? 'border-white/10 bg-white/[0.01] text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}>
            <span>DRAG 3D TO ROTATE</span>
            <button
              onClick={handleNext}
              className="hover:underline flex items-center gap-1 text-blue-400 font-semibold cursor-pointer"
            >
              <span>NEXT COMPONENT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Component Navigation Dock (Interactive hardware switcher) */}
      <div className="pointer-events-auto flex flex-col items-center gap-2 pb-2">
        <div className={`flex flex-wrap justify-center items-center gap-1 sm:gap-2 p-1.5 rounded-lg border backdrop-blur-md max-w-full overflow-x-auto ${
          isDark ? 'bg-black/60 border-white/10' : 'bg-white/80 border-slate-200 shadow-md'
        }`}>
          {COMPONENT_ANNOTATIONS.map((anno) => {
            const isActive = activeSection === anno.id;
            return (
              <button
                key={anno.id}
                onClick={() => {
                  audioService.playClick();
                  onSelectSection(anno.id);
                }}
                onMouseEnter={() => audioService.playHover()}
                className={`px-2.5 sm:px-3 py-1.5 rounded text-left transition-all duration-200 cursor-pointer font-mono-tech text-[11px] whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? isDark
                      ? 'bg-blue-500/25 text-white border border-blue-400 font-semibold'
                      : 'bg-blue-50 text-blue-700 border border-blue-300 font-semibold'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-400' : 'bg-slate-500 opacity-40'}`} />
                <span>{anno.label}</span>
              </button>
            );
          })}

          <div className={`h-4 w-px mx-1 hidden sm:block ${isDark ? 'bg-white/15' : 'bg-slate-300'}`} />

          {/* Quick Reassemble Action */}
          <button
            onClick={() => {
              audioService.playClick();
              onReassemble();
            }}
            className={`px-3 py-1.5 rounded text-left transition-all duration-200 cursor-pointer font-mono-tech text-[11px] whitespace-nowrap flex items-center gap-1.5 ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>REASSEMBLE</span>
          </button>
        </div>

        {/* Keyboard accessibility helper */}
        <div className="hidden md:flex items-center gap-4 text-[10px] font-mono-tech opacity-40">
          <span>SPACE: Explode/Reassemble</span>
          <span>·</span>
          <span>ARROWS: Rotate 3D</span>
          <span>·</span>
          <span>+/-: Zoom</span>
          <span>·</span>
          <span>ESC: Reassemble</span>
        </div>
      </div>
    </div>
  );
};
