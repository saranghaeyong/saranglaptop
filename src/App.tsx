/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { LaptopScene } from './components/3d/LaptopScene';
import { TopNavControls } from './components/ui/TopNavControls';
import { InitialHUD } from './components/ui/InitialHUD';
import { PortfolioExplorer } from './components/ui/PortfolioExplorer';
import { ComponentSectionId } from './data/portfolioData';
import { audioService } from './utils/audio';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState<ComponentSectionId>('identity');
  const [isHovered, setIsHovered] = useState(false);
  const [isAmbientActive, setIsAmbientActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Trigger explosion / reassembly safely
  const handleToggleExplode = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsExploded((prev) => {
      const nextState = !prev;
      if (nextState) {
        audioService.playExplosion();
        // Gently start ambient sound on first user explosion if user hasn't muted
        if (!isAmbientActive) {
          audioService.startAmbient();
          setIsAmbientActive(true);
        }
      } else {
        audioService.playReassemble();
      }
      return nextState;
    });
  }, [isAnimating, isAmbientActive]);

  const handleReassemble = useCallback(() => {
    if (isAnimating || !isExploded) return;
    setIsAnimating(true);
    setIsExploded(false);
    audioService.playReassemble();
  }, [isAnimating, isExploded]);

  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const handleSelectSection = useCallback((id: ComponentSectionId) => {
    setActiveSection(id);
  }, []);

  const handleToggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const handleToggleAmbient = useCallback(() => {
    const next = audioService.toggleAmbient();
    setIsAmbientActive(next);
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      audioService.setMuted(next);
      return next;
    });
  }, []);

  return (
    <main
      className={`relative w-screen h-screen overflow-hidden select-none transition-colors duration-700 ${
        isDark ? 'bg-[#060709] text-white' : 'bg-[#eceff3] text-slate-900'
      }`}
    >
      {/* 3D WebGL Canvas Layer */}
      <LaptopScene
        isDark={isDark}
        isExploded={isExploded}
        isAnimating={isAnimating}
        activeSection={activeSection}
        onAnimationEnd={handleAnimationEnd}
        onLaptopClick={handleToggleExplode}
        onSelectSection={handleSelectSection}
        onHoverStateChange={setIsHovered}
        onResetAssembled={handleReassemble}
      />

      {/* Top Header & Theme / Audio Navigation Controls */}
      <TopNavControls
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        isAudioMuted={isAudioMuted}
        onToggleMute={handleToggleMute}
        isAmbientActive={isAmbientActive}
        onToggleAmbient={handleToggleAmbient}
        isExploded={isExploded}
        onReassemble={handleReassemble}
      />

      {/* Cinematic HUD shown in Assembled Initial State */}
      <InitialHUD
        isDark={isDark}
        isVisible={!isExploded}
        isHovered={isHovered}
        onEnter={handleToggleExplode}
      />

      {/* Interactive Portfolio Explorer shown in Exploded State */}
      <PortfolioExplorer
        isDark={isDark}
        isExploded={isExploded}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onReassemble={handleReassemble}
      />
    </main>
  );
}
