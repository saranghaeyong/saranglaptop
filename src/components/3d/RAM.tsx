import React from 'react';
import { getThemeMaterials } from './Materials';

interface RAMProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const RAM: React.FC<RAMProps> = ({
  isDark,
  explosionProgress,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);

  // In explosion: moves outward left and lifts up
  const liftY = explosionProgress * 0.7;
  const spreadX = -explosionProgress * 1.45;
  const spreadZ = explosionProgress * 0.25;
  const rotZ = -explosionProgress * 0.12;

  return (
    <group
      position={[-0.7 + spreadX, 0.01 + liftY, 0.1 + spreadZ]}
      rotation={[0, 0, rotZ]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Dual SO-DIMM / Unified Memory Modules */}
      {[-0.08, 0.08].map((offsetZ, idx) => (
        <group key={idx} position={[0, 0, offsetZ]}>
          {/* PCB */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.008, 0.14]} />
            <meshStandardMaterial
              color={colors.pcb}
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>

          {/* Gold Pin Edge */}
          <mesh position={[0, 0, -0.07]}>
            <boxGeometry args={[0.5, 0.01, 0.02]} />
            <meshStandardMaterial color={colors.gold} metalness={0.95} roughness={0.2} />
          </mesh>

          {/* 4 Memory Chips per module */}
          {[-0.18, -0.06, 0.06, 0.18].map((chipX, cIdx) => (
            <mesh key={cIdx} position={[chipX, 0.008, 0]} castShadow>
              <boxGeometry args={[0.09, 0.01, 0.08]} />
              <meshStandardMaterial color={colors.silicon} roughness={0.4} metalness={0.6} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};
