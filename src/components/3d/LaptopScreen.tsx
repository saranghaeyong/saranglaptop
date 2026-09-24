import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { getThemeMaterials } from './Materials';
import { createScreenTexture } from './ScreenTexture';

const createCheetahLogo = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.55, 0.02);
  shape.bezierCurveTo(-0.28, 0.22, 0.08, 0.16, 0.28, 0.05);
  shape.bezierCurveTo(0.48, -0.06, 0.62, 0.02, 0.76, 0.16);
  shape.lineTo(0.60, -0.02);
  shape.lineTo(0.82, -0.22);
  shape.lineTo(0.52, -0.15);
  shape.bezierCurveTo(0.34, -0.34, 0.08, -0.30, -0.12, -0.20);
  shape.lineTo(-0.38, -0.28);
  shape.lineTo(-0.62, -0.18);
  shape.lineTo(-0.46, -0.06);
  shape.lineTo(-0.72, 0.14);
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth: 0.018, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2 });
};

interface LaptopScreenProps {
  isDark: boolean;
  explosionProgress: number;
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
  const screenTexture = useMemo(() => createScreenTexture(isDark, activeSection), [isDark, activeSection]);

  const lidSeparation = explosionProgress * 0.35;
  const screenLiftY = explosionProgress * 1.8;
  const screenLiftZ = -explosionProgress * 0.9;
  const screenRotX = -0.35 - explosionProgress * 0.1;

  return (
    <group
      position={[0, 0.08 + screenLiftY, -1.02 + screenLiftZ]}
      rotation={[screenRotX, 0, 0]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* One-piece anodized display lid */}
      <RoundedBox
        args={[3.28, 2.14, 0.065]}
        radius={0.11}
        smoothness={5}
        position={[0, 1.05, -0.045 - lidSeparation]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={colors.chassis}
          roughness={colors.chassisRoughness}
          metalness={colors.chassisMetalness}
        />
      </RoundedBox>

      {/* Subtle centered brand mark on the rear lid */}
      <mesh position={[0, 1.05, -0.083]} rotation={[0, Math.PI, 0]} geometry={createCheetahLogo()} scale={[0.58, 0.58, 0.58]}>
        <meshStandardMaterial color={isDark ? '#d9dde5' : '#f6f7f9'} roughness={0.2} metalness={0.9} emissive={isDark ? '#15171b' : '#000000'} emissiveIntensity={0.15} />
      </mesh>

      {/* Inner black display mask */}
      <RoundedBox
        args={[3.14, 2.02, 0.035]}
        radius={0.085}
        smoothness={5}
        position={[0, 1.05, 0.002]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={colors.screenBezel} roughness={0.48} metalness={0.12} />
      </RoundedBox>

      {/* Edge-to-edge display glass */}
      <mesh position={[0, 1.03, 0.026]}>
        <planeGeometry args={[2.94, 1.82]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      {/* Realistic glass reflection layer */}
      <mesh position={[0, 1.03, 0.031]}>
        <planeGeometry args={[2.94, 1.82]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.09}
          roughness={0.035}
          transmission={0.94}
          thickness={0.012}
          reflectivity={0.98}
          clearcoat={1}
          clearcoatRoughness={0.08}
          color={isDark ? '#b7cfff' : '#ffffff'}
        />
      </mesh>

      {/* Small centered webcam + sensor cluster */}
      <group position={[0, 1.955, 0.034]}>
        <mesh>
          <circleGeometry args={[0.018, 24]} />
          <meshStandardMaterial color="#020305" roughness={0.15} metalness={0.7} />
        </mesh>
        <mesh position={[0.055, 0, 0]}>
          <circleGeometry args={[0.006, 16]} />
          <meshStandardMaterial color="#111820" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
};
