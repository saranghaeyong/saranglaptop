import React from 'react';
import { getThemeMaterials } from './Materials';

interface TrackpadProps {
  isDark: boolean;
  explosionProgress: number;
}

export const Trackpad: React.FC<TrackpadProps> = ({ isDark, explosionProgress }) => {
  const colors = getThemeMaterials(isDark);
  // Trackpad rises with keyboard deck during explosion
  const liftY = explosionProgress * 1.15;

  return (
    <group position={[0, 0.016 + liftY, 0.55]}>
      {/* Trackpad Glass Surface */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.008, 0.72]} />
        <meshPhysicalMaterial
          color={isDark ? '#1a1c22' : '#e2e5eb'}
          roughness={0.2}
          metalness={0.1}
          reflectivity={0.5}
          clearcoat={0.3}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Subtle Chamfer Outline Border */}
      <mesh position={[0, 0.004, 0]}>
        <boxGeometry args={[1.06, 0.002, 0.73]} />
        <meshStandardMaterial
          color={isDark ? '#2e333d' : '#cbd5e1'}
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
};
