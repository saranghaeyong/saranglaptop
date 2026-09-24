import React from 'react';
import { getThemeMaterials } from './Materials';

interface HingesProps {
  isDark: boolean;
  explosionProgress: number;
}

export const Hinges: React.FC<HingesProps> = ({ isDark, explosionProgress }) => {
  const colors = getThemeMaterials(isDark);
  // In explosion, hinges separate slightly laterally
  const spread = explosionProgress * 0.4;

  return (
    <group position={[0, 0.05, -1.0]}>
      {/* Left Hinge */}
      <mesh position={[-1.1 - spread, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.35, 24]} />
        <meshStandardMaterial
          color={colors.hinge}
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>
      
      {/* Right Hinge */}
      <mesh position={[1.1 + spread, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.35, 24]} />
        <meshStandardMaterial
          color={colors.hinge}
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
};
