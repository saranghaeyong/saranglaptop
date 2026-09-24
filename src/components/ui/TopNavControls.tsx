import React from 'react';
import { Volume2, VolumeX, Moon, Sun, RotateCcw } from 'lucide-react';
import { audioService } from '../../utils/audio';

interface TopNavControlsProps {
  isDark: boolean;
  onToggleTheme: () => void;
  isAudioMuted: boolean;
  onToggleMute: () => void;
  isAmbientActive: boolean;
  onToggleAmbient: () => void;
  isExploded: boolean;
  onReassemble: () => void;
}

export const TopNavControls: React.FC<TopNavControlsProps> = ({
  isDark,
  onToggleTheme,
  isAudioMuted,
  onToggleMute,
  isAmbientActive,
  onToggleAmbient,
  isExploded,
  onReassemble
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 flex justify-between items-center pointer-events-none">
      {/* Brand Identity / Corner Stamp */}
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="flex flex-col">
          <span className={`font-mono-tech text-xs tracking-[0.25em] font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            SARANG R N
          </span>
          <span className={`font-mono-tech text-[10px] tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            PORTFOLIO ARCHIVE // 2026
          </span>
        </div>
      </div>

      {/* Control Actions */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {/* Reassemble Button (visible when exploded) */}
        {isExploded && (
          <button
            onClick={() => {
              audioService.playClick();
              onReassemble();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono-tech text-xs tracking-wider border transition-all duration-200 cursor-pointer ${
              isDark
                ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
            }`}
            title="Reassemble Laptop (ESC)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">REASSEMBLE</span>
          </button>
        )}

        {/* Ambient Sound Toggle */}
        <button
          onClick={() => {
            audioService.playClick();
            onToggleAmbient();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono-tech text-xs tracking-wider border transition-all duration-200 cursor-pointer ${
            isAmbientActive
              ? isDark
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : isDark
              ? 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/10'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300'
          }`}
          title="Toggle Ambient Drone"
        >
          <span className="text-xs">♪</span>
          <span>{isAmbientActive ? 'SOUND ON' : 'SOUND OFF'}</span>
          {isAmbientActive && (
            <span className="flex items-center gap-0.5 ml-1">
              <span className="w-0.5 h-2 bg-current animate-pulse" />
              <span className="w-0.5 h-3 bg-current animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-current animate-pulse delay-150" />
            </span>
          )}
        </button>

        {/* SFX Mute Toggle */}
        <button
          onClick={() => {
            audioService.playClick();
            onToggleMute();
          }}
          className={`p-2 rounded-sm border transition-all duration-200 cursor-pointer ${
            isDark
              ? 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          }`}
          title={isAudioMuted ? 'Unmute SFX' : 'Mute SFX'}
          aria-label="Toggle SFX Mute"
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Dark / Light Mode Switch */}
        <button
          onClick={() => {
            audioService.playClick();
            onToggleTheme();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono-tech text-xs tracking-wider border transition-all duration-200 cursor-pointer ${
            isDark
              ? 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
          }`}
          title="Toggle Theme"
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>LIGHT</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-blue-600" />
              <span>DARK</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
