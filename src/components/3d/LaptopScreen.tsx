import React, { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { getThemeMaterials } from './Materials';
import { createScreenTexture } from './ScreenTexture';

const createAppleLogo = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.18, 0.02);
  shape.bezierCurveTo(-0.23, 0.16, -0.16, 0.31, -0.02, 0.33);
  shape.bezierCurveTo(0.11, 0.35, 0.22, 0.25, 0.24, 0.11);
  shape.bezierCurveTo(0.26, -0.04, 0.18, -0.19, 0.08, -0.27);
  shape.bezierCurveTo(0.03, -0.31, -0.04, -0.31, -0.09, -0.28);
  shape.bezierCurveTo(-0.17, -0.24, -0.25, -0.14, -0.18, 0.02);
  shape.moveTo(-0.01, 0.34);
  shape.bezierCurveTo(0.02, 0.48, 0.14, 0.52, 0.23, 0.46);
  shape.bezierCurveTo(0.20, 0.35, 0.11, 0.29, -0.01, 0.34);
  return new THREE.ShapeGeometry(shape);
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
      <mesh position={[0, 1.05, -0.083]} rotation={[0, Math.PI, 0]} geometry={createAppleLogo()} scale={[0.72, 0.72, 0.72]}>
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
