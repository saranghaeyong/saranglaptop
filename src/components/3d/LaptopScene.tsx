import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Laptop } from './Laptop';
import { Lighting } from './Lighting';
import { Particles } from './Particles';
import { CameraController } from './CameraController';
import { ComponentSectionId } from '../../data/portfolioData';

interface LaptopSceneProps {
  isDark: boolean;
  isExploded: boolean;
  isAnimating: boolean;
  activeSection: ComponentSectionId | null;
  onAnimationEnd: () => void;
  onLaptopClick: () => void;
  onSelectSection: (id: ComponentSectionId) => void;
  onHoverStateChange: (isHovered: boolean) => void;
  onResetAssembled: () => void;
}

// Inner canvas runner to interpolate explosionProgress smoothly at 60fps
const SceneContent: React.FC<{
  isDark: boolean;
  isExploded: boolean;
  isAnimating: boolean;
  activeSection: ComponentSectionId | null;
  onAnimationEnd: () => void;
  onLaptopClick: () => void;
  onSelectSection: (id: ComponentSectionId) => void;
  onHoverStateChange: (isHovered: boolean) => void;
  onResetAssembled: () => void;
}> = ({
  isDark,
  isExploded,
  isAnimating,
  activeSection,
  onAnimationEnd,
  onLaptopClick,
  onSelectSection,
  onHoverStateChange,
  onResetAssembled
}) => {
  const [explosionProgress, setExplosionProgress] = React.useState(0);
  const currentProgressRef = useRef(0);
  const targetProgress = isExploded ? 1 : 0;
  const isAnimatingRef = useRef(isAnimating);
  isAnimatingRef.current = isAnimating;

  useFrame((_, delta) => {
    const target = targetProgress;
    const current = currentProgressRef.current;
    const diff = target - current;

    if (Math.abs(diff) > 0.001) {
      // Smooth cinematic ease (reaches target smoothly in ~1.2s)
      const speed = 2.8;
      const step = diff * Math.min(1, delta * speed);
      const next = current + step;
      currentProgressRef.current = next;
      setExplosionProgress(next);
    } else if (current !== target) {
      currentProgressRef.current = target;
      setExplosionProgress(target);
      if (isAnimatingRef.current) {
        onAnimationEnd();
      }
    }
  });

  const bgColor = isDark ? '#060709' : '#eceff3';
  const fogColor = isDark ? '#060709' : '#eceff3';

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[fogColor, 7, 22]} />

      <Lighting isDark={isDark} />
      <Particles isDark={isDark} />

      <CameraController
        explosionProgress={explosionProgress}
        isExploded={isExploded}
        onToggleExplode={onLaptopClick}
        onResetAssembled={onResetAssembled}
      />

      <Laptop
        isDark={isDark}
        explosionProgress={explosionProgress}
        isExploded={isExploded}
        isAnimating={isAnimating}
        activeSection={activeSection}
        onLaptopClick={onLaptopClick}
        onSelectSection={onSelectSection}
        onHoverStateChange={onHoverStateChange}
      />
    </>
  );
};

export const LaptopScene: React.FC<LaptopSceneProps> = (props) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 1.8, 5.5], fov: 42 }}
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: props.isDark ? 1.05 : 1.15
        }}
      >
        <SceneContent {...props} />
      </Canvas>
    </div>
  );
};
