import React from 'react';
import { getThemeMaterials } from './Materials';

interface LaptopBaseProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const LaptopBase: React.FC<LaptopBaseProps> = ({
  isDark,
  explosionProgress,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);
  // Base sinks downward in exploded view
  const baseSinkY = -explosionProgress * 1.5;

  return (
    <group
      position={[0, baseSinkY, 0]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Main Bottom Aluminum Enclosure */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.08, 2.1]} />
        <meshStandardMaterial
          color={colors.chassis}
          roughness={colors.chassisRoughness}
          metalness={colors.chassisMetalness}
        />
      </mesh>

      {/* Internal Hollow Cavity Bed (Visible when exploded) */}
      <mesh position={[0, -0.015, 0]} receiveShadow>
        <boxGeometry args={[3.06, 0.015, 1.96]} />
        <meshStandardMaterial
          color={isDark ? '#0c0d10' : '#c8cbd0'}
          roughness={0.7}
          metalness={0.6}
        />
      </mesh>

      {/* Rubber Feet (4 corners under the bottom) */}
      {[
        [-1.3, -0.095, -0.85],
        [1.3, -0.095, -0.85],
        [-1.3, -0.095, 0.85],
        [1.3, -0.095, 0.85]
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.012, 16]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}

      {/* Side I/O Ports Left: Dual USB-C / Thunderbolt */}
      <group position={[-1.602, -0.04, -0.3]}>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[0.005, 0.02, 0.05]} />
          <meshStandardMaterial color="#050507" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[0.005, 0.02, 0.05]} />
          <meshStandardMaterial color="#050507" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Side I/O Ports Right: HDMI & 3.5mm Audio */}
      <group position={[1.602, -0.04, -0.3]}>
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[0.005, 0.025, 0.07]} />
          <meshStandardMaterial color="#050507" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.005, 16]} />
          <meshStandardMaterial color="#050507" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};
