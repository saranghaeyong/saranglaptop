import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { getThemeMaterials } from './Materials';

interface TrackpadProps {
  isDark: boolean;
  explosionProgress: number;
}

export const Trackpad: React.FC<TrackpadProps> = ({ isDark, explosionProgress }) => {
  const colors = getThemeMaterials(isDark);
  const liftY = explosionProgress * 1.15;

  return (
    <group position={[0, 0.018 + liftY, 0.57]}>
      <RoundedBox args={[1.08, 0.018, 0.72]} radius={0.045} smoothness={5} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={isDark ? '#191c22' : '#c7ccd3'}
          roughness={0.16}
          metalness={0.16}
          reflectivity={0.82}
          clearcoat={0.9}
          clearcoatRoughness={0.06}
        />
      </RoundedBox>
      <RoundedBox args={[1.13, 0.008, 0.77]} radius={0.052} smoothness={5} position={[0, -0.006, 0]}>
        <meshStandardMaterial color={isDark ? '#303640' : '#8f969f'} roughness={0.34} metalness={0.7} />
      </RoundedBox>
    </group>
  );
};
