import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

interface CameraControllerProps {
  explosionProgress: number; // 0 to 1
  isExploded: boolean;
  onToggleExplode: () => void;
  onResetAssembled: () => void;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  explosionProgress,
  isExploded,
  onToggleExplode,
  onResetAssembled
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  // Handle keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const controls = controlsRef.current;
      if (!controls) return;

      const rotStep = 0.08;
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          onToggleExplode();
          return;
        case 'Escape':
          e.preventDefault();
          onResetAssembled();
          return;
        case 'ArrowLeft':
          spherical.theta -= rotStep;
          break;
        case 'ArrowRight':
          spherical.theta += rotStep;
          break;
        case 'ArrowUp':
          spherical.phi = Math.max(controls.minPolarAngle + 0.01, Math.min(controls.maxPolarAngle - 0.01, spherical.phi - rotStep));
          break;
        case 'ArrowDown':
          spherical.phi = Math.max(controls.minPolarAngle + 0.01, Math.min(controls.maxPolarAngle - 0.01, spherical.phi + rotStep));
          break;
        case '+':
        case '=':
          spherical.radius = Math.max(controls.minDistance, spherical.radius * 0.94);
          break;
        case '-':
        case '_':
          spherical.radius = Math.min(controls.maxDistance, spherical.radius * 1.06);
          break;
        default:
          return;
      }

      offset.setFromSpherical(spherical);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleExplode, onResetAssembled, camera]);

  // Adjust distance and slight pull-back smoothly based on explosionProgress
  const prevExplosionRef = useRef(explosionProgress);
  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    // During transition between assembled and exploded, smoothly pull camera back / restore
    const diff = explosionProgress - prevExplosionRef.current;
    if (Math.abs(diff) > 0.001) {
      // If expanding, gently nudge camera outward
      if (diff > 0) {
        camera.position.addScaledVector(camera.position.clone().normalize(), diff * 0.9);
      }
      prevExplosionRef.current = explosionProgress;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
      minDistance={3.8}
      maxDistance={9.8}
      minPolarAngle={Math.PI * 0.12} // Prevent extreme top-down
      maxPolarAngle={Math.PI * 0.54} // Prevent going beneath ground floor
      target={[0, 0, 0]}
    />
  );
};
