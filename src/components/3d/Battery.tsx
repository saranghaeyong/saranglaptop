import React from 'react';
import { getThemeMaterials } from './Materials';

interface BatteryProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const Battery: React.FC<BatteryProps> = ({
  isDark,
  explosionProgress,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);

  // In explosion: moves downward and forward
  const dropY = -explosionProgress * 0.95;
  const forwardZ = explosionProgress * 0.55;

  return (
    <group
      position={[0, -0.02 + dropY, 0.5 + forwardZ]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* 3 Large Lithium-Polymer Cells */}
      {[-0.85, 0, 0.85].map((cellX, idx) => (
        <group key={idx} position={[cellX, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.78, 0.024, 0.72]} />
            <meshStandardMaterial
              color={colors.battery}
              roughness={0.45}
              metalness={0.15}
            />
          </mesh>

          {/* Cell perimeter foil seams */}
          <mesh position={[0, 0.013, 0]}>
            <boxGeometry args={[0.76, 0.002, 0.7]} />
            <meshStandardMaterial
              color={isDark ? '#23252a' : '#3f3f46'}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
        </group>
      ))}

      {/* Battery Management System (BMS) Board & Ribbon at Top Edge */}
      <mesh position={[0, 0.008, -0.4]}>
        <boxGeometry args={[2.5, 0.01, 0.06]} />
        <meshStandardMaterial color={colors.pcb} roughness={0.6} />
      </mesh>

      {/* Gold Power Connector Terminal */}
      <mesh position={[0, 0.014, -0.42]}>
        <boxGeometry args={[0.18, 0.014, 0.04]} />
        <meshStandardMaterial color={colors.gold} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Technical Spec Label on Center Cell */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.4]} />
        <meshBasicMaterial
          color={isDark ? '#0f1115' : '#18181b'}
        />
      </mesh>
    </group>
  );
};
