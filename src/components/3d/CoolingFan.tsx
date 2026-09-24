import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getThemeMaterials } from './Materials';

interface CoolingFanProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const CoolingFan: React.FC<CoolingFanProps> = ({
  isDark,
  explosionProgress,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);
  const leftTurbineRef = useRef<THREE.Group>(null);
  const rightTurbineRef = useRef<THREE.Group>(null);

  // In explosion: moves backwards and upward
  const liftY = explosionProgress * 0.55;
  const backZ = -explosionProgress * 0.85;
  const lateralSpread = explosionProgress * 0.45;

  // Spin fan blades continuously (faster during explosion)
  useFrame((_, delta) => {
    const speed = 4.0 + explosionProgress * 8.0;
    if (leftTurbineRef.current) {
      leftTurbineRef.current.rotation.y += delta * speed;
    }
    if (rightTurbineRef.current) {
      rightTurbineRef.current.rotation.y -= delta * speed;
    }
  });

  return (
    <group
      position={[0, 0.02 + liftY, -0.65 + backZ]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Polished Dual Copper Heat Pipes bridging SoC to Fin Stacks */}
      <group position={[0, 0.02, 0.2]}>
        {/* Center Copper Vapor Plate */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.015, 0.3]} />
          <meshStandardMaterial
            color={colors.copper}
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

        {/* Left Copper Pipe routing to left radiator */}
        <mesh position={[-0.6, 0, -0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 16]} />
          <meshStandardMaterial
            color={colors.copper}
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

        {/* Right Copper Pipe routing to right radiator */}
        <mesh position={[0.6, 0, -0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 16]} />
          <meshStandardMaterial
            color={colors.copper}
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* LEFT CENTRIFUGAL COOLING FAN */}
      <group position={[-1.05 - lateralSpread, 0, -0.05]}>
        {/* Fan Housing Shroud */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.03, 32]} />
          <meshStandardMaterial
            color={isDark ? '#14161a' : '#94a3b8'}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* Radiator Exhaust Fins (Rear) */}
        <mesh position={[0, 0, -0.28]} castShadow>
          <boxGeometry args={[0.55, 0.03, 0.12]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Spinning Impeller Blades Group */}
        <group ref={leftTurbineRef} position={[0, 0.005, 0]}>
          {/* Fan Hub */}
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
            <meshStandardMaterial color="#0a0a0c" metalness={0.7} />
          </mesh>
          {/* 12 Curved Turbine Blades */}
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh
              key={i}
              rotation={[0, (i * Math.PI) / 6, 0.15]}
              position={[Math.cos((i * Math.PI) / 6) * 0.18, 0, Math.sin((i * Math.PI) / 6) * 0.18]}
            >
              <boxGeometry args={[0.12, 0.012, 0.02]} />
              <meshStandardMaterial color={colors.fanBlade} roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      {/* RIGHT CENTRIFUGAL COOLING FAN */}
      <group position={[1.05 + lateralSpread, 0, -0.05]}>
        {/* Fan Housing Shroud */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.03, 32]} />
          <meshStandardMaterial
            color={isDark ? '#14161a' : '#94a3b8'}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* Radiator Exhaust Fins (Rear) */}
        <mesh position={[0, 0, -0.28]} castShadow>
          <boxGeometry args={[0.55, 0.03, 0.12]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Spinning Impeller Blades Group */}
        <group ref={rightTurbineRef} position={[0, 0.005, 0]}>
          {/* Fan Hub */}
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
            <meshStandardMaterial color="#0a0a0c" metalness={0.7} />
          </mesh>
          {/* 12 Curved Turbine Blades */}
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh
              key={i}
              rotation={[0, (i * Math.PI) / 6, -0.15]}
              position={[Math.cos((i * Math.PI) / 6) * 0.18, 0, Math.sin((i * Math.PI) / 6) * 0.18]}
            >
              <boxGeometry args={[0.12, 0.012, 0.02]} />
              <meshStandardMaterial color={colors.fanBlade} roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};
