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
      { z: -0.44, count: 12, offset: 0 },
      { z: -0.25, count: 12, offset: 0.08 },
      { z: -0.06, count: 11, offset: 0.12 },
      { z: 0.13, count: 11, offset: 0.12 },
    ];
    return rows.flatMap((row, rowIndex) => {
      const keyWidth = 0.17;
      const gap = 0.05;
      const totalWidth = row.count * keyWidth + (row.count - 1) * gap;
      const startX = -totalWidth / 2 + row.offset;
      return Array.from({ length: row.count }, (_, i) => ({
        x: startX + i * (keyWidth + gap),
        z: row.z,
        key: rowIndex * 100 + i
      }));
    });
  }, []);

  return (
    <group position={[0, 0.015 + liftY, 0]} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      <RoundedBox args={[3.1, 0.06, 1.25]} radius={0.1} smoothness={4} position={[0, -0.02, -0.18]} receiveShadow>
        <meshStandardMaterial color={colors.keyboardDeck} roughness={colors.chassisRoughness} metalness={colors.chassisMetalness} />
      </RoundedBox>
      {keyRows.map((k) => (
        <RoundedBox key={k.key} args={[0.17, 0.035, 0.13]} radius={0.02} smoothness={3} position={[k.x, 0.035, k.z]} castShadow receiveShadow>
          <meshStandardMaterial
            color={colors.keycap}
            roughness={0.35}
            metalness={0.1}
            emissive={isDark ? '#050609' : '#000000'}
            emissiveIntensity={0.35}
          />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.8, 0.035, 0.13]} radius={0.02} smoothness={3} position={[0, 0.035, 0.34]} castShadow>
        <meshStandardMaterial color={colors.keycap} roughness={0.4} metalness={0.1} />
      </RoundedBox>
    </group>
  );
};
