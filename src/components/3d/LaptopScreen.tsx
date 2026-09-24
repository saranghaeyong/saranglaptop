import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getThemeMaterials } from './Materials';
import { createScreenTexture } from './ScreenTexture';

interface LaptopScreenProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  activeSection: string | null;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const LaptopScreen: React.FC<LaptopScreenProps> = ({
  isDark,
  explosionProgress,
  activeSection,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);

  const screenTexture = useMemo(() => {
    return createScreenTexture(isDark, activeSection);
  }, [isDark, activeSection]);

  // Screen opening angle: ~105 degrees (1.83 rad)
  // During explosion:
  // Screen moves upward/backward
  // Top lid separates further backward
  const lidSeparation = explosionProgress * 0.35;
  const screenLiftY = explosionProgress * 1.8;
  const screenLiftZ = -explosionProgress * 0.9;
  const screenRotX = -0.35 - (explosionProgress * 0.1);

  return (
    <group
      position={[0, 0.08 + screenLiftY, -1.02 + screenLiftZ]}
      rotation={[screenRotX, 0, 0]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* 1. TOP LID (Exterior Back Aluminum Shell) */}
      <mesh
        position={[0, 1.05, -0.02 - lidSeparation]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3.2, 2.1, 0.03]} />
        <meshStandardMaterial
          color={colors.chassis}
          roughness={colors.chassisRoughness}
          metalness={colors.chassisMetalness}
        />
      </mesh>

      {/* Deadpool-style mask emblem on the exterior back of the lid */}
      <group position={[0, 1.05, -0.043 - lidSeparation]} rotation={[0, 0, 0]}>
        {/* Red circular mask */}
        <mesh rotation={[0, 0, 0]}>
          <circleGeometry args={[0.43, 48]} />
          <meshStandardMaterial
            color={isDark ? '#b91c1c' : '#dc2626'}
            roughness={0.3}
            metalness={0.35}
          />
        </mesh>

        {/* Black mask patches */}
        <mesh position={[-0.16, 0.06, 0.006]} scale={[1, 1.2, 1]}>
          <circleGeometry args={[0.17, 32]} />
          <meshStandardMaterial color="#090909" roughness={0.45} metalness={0.25} />
        </mesh>
        <mesh position={[0.16, 0.06, 0.006]} scale={[1, 1.2, 1]}>
          <circleGeometry args={[0.17, 32]} />
          <meshStandardMaterial color="#090909" roughness={0.45} metalness={0.25} />
        </mesh>

        {/* Stylized white eye slits */}
        <mesh position={[-0.16, 0.065, 0.012]} rotation={[0, 0, -0.22]} scale={[1.05, 0.42, 1]}>
          <circleGeometry args={[0.105, 24]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.3} metalness={0.05} />
        </mesh>
        <mesh position={[0.16, 0.065, 0.012]} rotation={[0, 0, 0.22]} scale={[1.05, 0.42, 1]}>
          <circleGeometry args={[0.105, 24]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.3} metalness={0.05} />
        </mesh>
      </group>

      {/* 2. DISPLAY BEZEL / FRAME */}
      <group position={[0, 1.05, 0.002]}>
        {/* Bezel frame outer plate */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.18, 2.08, 0.015]} />
          <meshStandardMaterial
            color={colors.screenBezel}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>

        {/* 3. HIGH-RESOLUTION ACTIVE DISPLAY PANEL */}
        <mesh position={[0, 0.02, 0.01]}>
          <planeGeometry args={[2.98, 1.88]} />
          <meshBasicMaterial
            map={screenTexture}
            toneMapped={false}
          />
        </mesh>

        {/* 4. PROTECTIVE GLASS SPECULAR OVERLAY */}
        <mesh position={[0, 0.02, 0.012]}>
          <planeGeometry args={[2.98, 1.88]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.12}
            roughness={0.05}
            transmission={0.9}
            thickness={0.02}
            reflectivity={0.9}
            color={isDark ? '#93c5fd' : '#ffffff'}
          />
        </mesh>

        {/* Webcam Lens Dot */}
        <mesh position={[0, 0.99, 0.01]}>
          <circleGeometry args={[0.015, 16]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>

        {/* Mic pinhole */}
        <mesh position={[0.06, 0.99, 0.01]}>
          <circleGeometry args={[0.005, 8]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
      </group>
    </group>
  );
};
