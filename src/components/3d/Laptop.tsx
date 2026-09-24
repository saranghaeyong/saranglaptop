import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LaptopScreen } from './LaptopScreen';
import { LaptopBase } from './LaptopBase';
import { Keyboard } from './Keyboard';
import { Trackpad } from './Trackpad';
import { Motherboard } from './Motherboard';
import { Battery } from './Battery';
import { CoolingFan } from './CoolingFan';
import { SSD } from './SSD';
import { RAM } from './RAM';
import { Speakers } from './Speakers';
import { Hinges } from './Hinges';
import { ConnectingLines } from './ConnectingLines';
import { ComponentLabels } from './ComponentLabels';
import { ComponentSectionId } from '../../data/portfolioData';

interface LaptopProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  isExploded: boolean;
  isAnimating: boolean;
  activeSection: ComponentSectionId | null;
  onLaptopClick: () => void;
  onSelectSection: (id: ComponentSectionId) => void;
  onHoverStateChange: (isHovered: boolean) => void;
}

export const Laptop: React.FC<LaptopProps> = ({
  isDark,
  explosionProgress,
  isExploded,
  isAnimating,
  activeSection,
  onLaptopClick,
  onSelectSection,
  onHoverStateChange
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const hoverHighlightRef = useRef(false);
  const keyboardRotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  // Arrow keys rotate the entire laptop model for keyboard-based inspection.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const step = 0.25;
      if (event.key === 'ArrowLeft') targetRotationRef.current.y -= step;
      if (event.key === 'ArrowRight') targetRotationRef.current.y += step;
      if (event.key === 'ArrowUp') targetRotationRef.current.x -= step;
      if (event.key === 'ArrowDown') targetRotationRef.current.x += step;
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Idle floating animation
  useFrame((state) => {
    if (!rootGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    // In assembled state: subtle calm vertical floating and micro pitch/yaw bobbing
    // In exploded state: gentle stable hover with minimal bobbing so inspection is rock-steady
    const floatAmplitude = isExploded ? 0.04 : 0.08;
    const rotAmplitude = isExploded ? 0.015 : 0.03;

    rootGroupRef.current.position.y = Math.sin(t * 0.8) * floatAmplitude;

    // Smoothly follow the arrow-key target so every press visibly rotates the whole model.
    keyboardRotationRef.current.y = THREE.MathUtils.lerp(
      keyboardRotationRef.current.y,
      targetRotationRef.current.y,
      0.18
    );
    keyboardRotationRef.current.x = THREE.MathUtils.lerp(
      keyboardRotationRef.current.x,
      targetRotationRef.current.x,
      0.18
    );

    rootGroupRef.current.rotation.y = Math.sin(t * 0.4) * rotAmplitude + keyboardRotationRef.current.y;
    rootGroupRef.current.rotation.x = Math.cos(t * 0.6) * (rotAmplitude * 0.5) + keyboardRotationRef.current.x;
  });

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    hoverHighlightRef.current = true;
    onHoverStateChange(true);
    document.body.style.cursor = isAnimating ? 'wait' : 'pointer';
  };

  const handlePointerOut = () => {
    hoverHighlightRef.current = false;
    onHoverStateChange(false);
    document.body.style.cursor = 'default';
  };

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isAnimating) return;
    onLaptopClick();
  };

  return (
    <group
      ref={rootGroupRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* 1. SCREEN ASSEMBLY */}
      <LaptopScreen
        isDark={isDark}
        explosionProgress={explosionProgress}
        activeSection={activeSection}
      />

      {/* 2. HINGES */}
      <Hinges
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 3. KEYBOARD DECK */}
      <Keyboard
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 4. TRACKPAD */}
      <Trackpad
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 5. MOTHERBOARD & CHIPS */}
      <Motherboard
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 6. DUAL COOLING FANS & HEAT SINKS */}
      <CoolingFan
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 7. NVME M.2 SSD */}
      <SSD
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 8. RAM MODULES */}
      <RAM
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 9. STEREO SPEAKERS */}
      <Speakers
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 10. LITHIUM BATTERY PACK */}
      <Battery
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 11. BASE CHASSIS SHELL */}
      <LaptopBase
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 12. HOLOGRAPHIC CONNECTING LINES */}
      <ConnectingLines
        isDark={isDark}
        explosionProgress={explosionProgress}
      />

      {/* 13. 3D COMPONENT ANNOTATION LABELS */}
      <ComponentLabels
        isDark={isDark}
        explosionProgress={explosionProgress}
        activeSection={activeSection}
        onSelectSection={onSelectSection}
      />
    </group>
  );
};
