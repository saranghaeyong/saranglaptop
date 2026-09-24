import React from 'react';
import { getThemeMaterials } from './Materials';

interface SSDProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const SSD: React.FC<SSDProps> = ({
  isDark,
  explosionProgress,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);

  // In explosion: moves outward right and lifts up
  const liftY = explosionProgress * 0.75;
  const spreadX = explosionProgress * 1.55;
  const spreadZ = explosionProgress * 0.35;
  const rotZ = explosionProgress * 0.15;

  return (
    <group
      position={[0.7 + spreadX, 0.01 + liftY, 0.1 + spreadZ]}
      rotation={[0, 0, rotZ]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* NVMe M.2 PCB Stick */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.01, 0.65]} />
        <meshStandardMaterial
          color={colors.pcb}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Gold Edge Connector Pins */}
      <mesh position={[0, 0, -0.32]}>
        <boxGeometry args={[0.18, 0.012, 0.04]} />
        <meshStandardMaterial color={colors.gold} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Controller IC Chip */}
      <mesh position={[0, 0.01, -0.15]} castShadow>
        <boxGeometry args={[0.14, 0.015, 0.14]} />
        <meshStandardMaterial color={colors.silicon} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* NAND Flash Storage Package 1 */}
      <mesh position={[0, 0.01, 0.06]} castShadow>
        <boxGeometry args={[0.16, 0.015, 0.18]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* NAND Flash Storage Package 2 */}
      <mesh position={[0, 0.01, 0.25]} castShadow>
        <boxGeometry args={[0.16, 0.015, 0.18]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Mounting Notch at tail */}
      <mesh position={[0, 0, 0.33]}>
        <cylinderGeometry args={[0.02, 0.02, 0.012, 12]} />
        <meshStandardMaterial color="#050507" />
      </mesh>
    </group>
  );
};
