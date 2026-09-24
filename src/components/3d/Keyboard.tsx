import React, { useMemo } from 'react';
import { getThemeMaterials } from './Materials';

interface KeyboardProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  isDark,
  explosionProgress,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);
  // In explosion, keyboard deck moves upward
  const liftY = explosionProgress * 1.35;

  // Key rows definition
  const keyRows = useMemo(() => {
    // 5 rows: Function, Number, QWERTY, ASDF, ZXCV/Space
    const rows: { x: number; z: number; w: number }[] = [];
    const startZ = -0.75;
    const rowGap = 0.145;
    const colGap = 0.17;

    // Row 0: Function row (14 small keys)
    for (let c = -6.5; c <= 6.5; c++) {
      rows.push({ x: c * colGap * 0.98, z: startZ, w: 0.14 });
    }

    // Row 1: Number row (14 keys)
    for (let c = -6.5; c <= 6.5; c++) {
      rows.push({ x: c * colGap * 0.98, z: startZ + rowGap, w: 0.145 });
    }

    // Row 2: QWERTY (Tab + 12 keys + Return)
    for (let c = -6.2; c <= 6.2; c += 1.05) {
      rows.push({ x: c * colGap, z: startZ + rowGap * 2, w: 0.145 });
    }

    // Row 3: ASDF (Caps + 11 keys + Enter)
    for (let c = -6.0; c <= 6.0; c += 1.05) {
      rows.push({ x: c * colGap, z: startZ + rowGap * 3, w: 0.145 });
    }

    // Row 4: ZXCV (Shift + 10 keys + Shift)
    for (let c = -5.8; c <= 5.8; c += 1.08) {
      rows.push({ x: c * colGap, z: startZ + rowGap * 4, w: 0.145 });
    }

    // Row 5: Spacebar row
    // Ctrl, Opt, Cmd left
    rows.push({ x: -1.0, z: startZ + rowGap * 5, w: 0.16 });
    rows.push({ x: -0.78, z: startZ + rowGap * 5, w: 0.16 });
    rows.push({ x: -0.56, z: startZ + rowGap * 5, w: 0.18 });
    // Spacebar
    rows.push({ x: 0.05, z: startZ + rowGap * 5, w: 0.72 });
    // Cmd, Opt, Arrows right
    rows.push({ x: 0.65, z: startZ + rowGap * 5, w: 0.18 });
    rows.push({ x: 0.88, z: startZ + rowGap * 5, w: 0.16 });
    rows.push({ x: 1.08, z: startZ + rowGap * 5, w: 0.15 });

    return rows;
  }, []);

  return (
    <group
      position={[0, 0.015 + liftY, 0]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Upper Aluminum Palm Rest / Unibody Top Deck */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.02, 2.1]} />
        <meshStandardMaterial
          color={colors.keyboardDeck}
          roughness={colors.chassisRoughness}
          metalness={colors.chassisMetalness}
        />
      </mesh>

      {/* Recessed Keyboard Well / Tray */}
      <mesh position={[0, 0.006, -0.4]} receiveShadow>
        <boxGeometry args={[2.55, 0.01, 0.96]} />
        <meshStandardMaterial
          color={isDark ? '#0a0b0d' : '#cbd5e1'}
          roughness={0.7}
          metalness={0.4}
        />
      </mesh>

      {/* Subtle Backlight glow plane beneath keycaps */}
      <mesh position={[0, 0.011, -0.4]}>
        <planeGeometry args={[2.52, 0.94]} />
        <meshBasicMaterial
          color={colors.keycapEmissive}
          transparent
          opacity={isDark ? 0.25 : 0.12}
        />
      </mesh>

      {/* Left Speaker Grille Perforation Band */}
      <mesh position={[-1.42, 0.011, -0.4]}>
        <planeGeometry args={[0.15, 0.9]} />
        <meshStandardMaterial
          color={isDark ? '#0f1115' : '#94a3b8'}
          roughness={0.8}
        />
      </mesh>

      {/* Right Speaker Grille Perforation Band */}
      <mesh position={[1.42, 0.011, -0.4]}>
        <planeGeometry args={[0.15, 0.9]} />
        <meshStandardMaterial
          color={isDark ? '#0f1115' : '#94a3b8'}
          roughness={0.8}
        />
      </mesh>

      {/* Individual Keycaps */}
      {keyRows.map((k, idx) => (
        <mesh
          key={idx}
          position={[k.x, 0.018, k.z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[k.w, 0.015, 0.12]} />
          <meshStandardMaterial
            color={colors.keycap}
            roughness={0.65}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};
