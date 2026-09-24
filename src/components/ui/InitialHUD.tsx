import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2, Move3d } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface InitialHUDProps {
  isDark: boolean;
  isVisible: boolean;
  isHovered: boolean;
  onEnter: () => void;
}

export const InitialHUD: React.FC<InitialHUDProps> = ({
  isDark,
  isVisible,
  isHovered,
  onEnter
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-12 z-20"
        >
          {/* Top Title Block (Subtly above the laptop) */}
          <div className="pt-16 sm:pt-20 text-center flex flex-col items-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className={`font-mono-tech text-xs tracking-[0.35em] uppercase mb-2 ${isDark ? 'text-blue-400/80' : 'text-blue-600'}`}>
                INTERACTIVE 3D MONOGRAPH
              </span>
              <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight font-editorial ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {PORTFOLIO_DATA.identity.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <span className={`h-px w-8 ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />
                <span className={`font-mono-tech text-xs sm:text-sm tracking-[0.25em] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  MCA GRADUATE
                </span>
                <span className={`h-px w-8 ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />
              </div>
            </motion.div>
          </div>

          {/* Bottom Disciplines & Interaction Prompt */}
          <div className="pb-8 sm:pb-12 text-center flex flex-col items-center">
            {/* Disciplines */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-8"
            >
              {['SOFTWARE DEVELOPMENT', 'PYTHON', 'MACHINE LEARNING'].map((d, idx) => (
                <span
                  key={idx}
                  className={`font-mono-tech text-xs sm:text-sm tracking-[0.2em] font-medium ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {d}
                  {idx < 2 && <span className="ml-3 sm:ml-6 opacity-30">/</span>}
                </span>
              ))}
            </motion.div>

            {/* Prompts: Drag to Rotate & Click to Enter */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pointer-events-auto"
            >
              <div className={`flex items-center gap-2 font-mono-tech text-xs tracking-widest px-4 py-2 rounded-full border ${
                isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-white/60 border-slate-200 text-slate-600'
              }`}>
                <Move3d className="w-3.5 h-3.5 opacity-60" />
                <span>DRAG TO ROTATE & WHEEL TO ZOOM</span>
              </div>

              <button
                onClick={onEnter}
                className={`group flex items-center gap-2 font-mono-tech text-xs tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? isDark
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-blue-600 text-white border-blue-500 shadow-md scale-105'
                    : isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700'
                }`}
              >
                <MousePointer2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">CLICK LAPTOP TO ENTER // EXPLODE</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
