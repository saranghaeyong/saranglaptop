import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { getThemeMaterials } from './Materials';

interface KeyboardProps {
  isDark: boolean;
  explosionProgress: number;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ isDark, explosionProgress, onPointerOver, onPointerOut }) => {
  const colors = getThemeMaterials(isDark);
  const liftY = explosionProgress * 1.35;

  const keyRows = useMemo(() => {
    const rows = [
      { z: -0.73, count: 14, width: 0.135, gap: 0.045, offset: 0 },
      { z: -0.57, count: 14, width: 0.135, gap: 0.045, offset: 0.015 },
      { z: -0.41, count: 13, width: 0.145, gap: 0.047, offset: 0.02 },
      { z: -0.25, count: 13, width: 0.145, gap: 0.047, offset: 0.02 },
      { z: -0.09, count: 12, width: 0.145, gap: 0.047, offset: 0.04 },
    ];
    return rows.flatMap((row, rowIndex) => {
      const total = row.count * row.width + (row.count - 1) * row.gap;
      const start = -total / 2 + row.offset;
      return Array.from({ length: row.count }, (_, i) => ({
        x: start + i * (row.width + row.gap),
        z: row.z,
        width: row.width,
        key: rowIndex * 100 + i
      }));
    });
  }, []);

  return (
    <group position={[0, 0.015 + liftY, 0]} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Deep inset keyboard well */}
      <RoundedBox args={[2.72, 0.035, 1.03]} radius={0.075} smoothness={4} position={[0, 0.002, -0.395]} receiveShadow>
        <meshStandardMaterial color={isDark ? '#090b0f' : '#2c3036'} roughness={0.55} metalness={0.5} />
      </RoundedBox>

      {/* Precision unibody deck */}
      <RoundedBox args={[3.28, 0.07, 2.14]} radius={0.12} smoothness={5} position={[0, -0.025, 0]} castShadow receiveShadow>
        <meshStandardMaterial
          color={colors.keyboardDeck}
          roughness={colors.chassisRoughness}
          metalness={colors.chassisMetalness}
        />
      </RoundedBox>

      {/* Individual low-profile keycaps */}
      {keyRows.map((k) => (
        <RoundedBox key={k.key} args={[k.width, 0.035, 0.115]} radius={0.018} smoothness={3} position={[k.x, 0.035, k.z]} castShadow receiveShadow>
          <meshStandardMaterial
            color={colors.keycap}
            roughness={0.32}
            metalness={0.12}
            emissive={isDark ? '#070a10' : '#000000'}
            emissiveIntensity={0.5}
          />
        </RoundedBox>
      ))}

      {/* Separate spacebar, visually heavier like a real laptop keyboard */}
      <RoundedBox args={[0.76, 0.035, 0.115]} radius={0.018} smoothness={3} position={[0.02, 0.035, 0.07]} castShadow>
        <meshStandardMaterial color={colors.keycap} roughness={0.42} metalness={0.12} />
      </RoundedBox>

      {/* Speaker perforation fields */}
      {[-1.37, 1.37].map((x) => (
        <group key={x} position={[x, 0.036, -0.4]}>
          {Array.from({ length: 30 }, (_, i) => (
            <mesh key={i} position={[0, 0, -0.43 + i * 0.03]}>
              <cylinderGeometry args={[0.006, 0.006, 0.006, 12]} />
              <meshStandardMaterial color={isDark ? '#050609' : '#8d949d'} roughness={0.72} metalness={0.3} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};
