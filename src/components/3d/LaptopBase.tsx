import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { getThemeMaterials } from './Materials';

interface LaptopBaseProps {
  isDark: boolean;
  explosionProgress: number;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const LaptopBase: React.FC<LaptopBaseProps> = ({
  isDark,
  explosionProgress,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);
  const baseSinkY = -explosionProgress * 1.5;

  return (
    <group
      position={[0, baseSinkY, 0]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <RoundedBox
        args={[3.28, 0.10, 2.14]}
        radius={0.12}
        smoothness={5}
        position={[0, -0.055, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={colors.chassis}
          roughness={colors.chassisRoughness}
          metalness={colors.chassisMetalness}
        />
      </RoundedBox>

      <RoundedBox
        args={[3.02, 0.035, 1.88]}
        radius={0.07}
        smoothness={4}
        position={[0, 0.005, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color={isDark ? '#111419' : '#c0c5cc'}
          roughness={0.48}
          metalness={0.72}
        />
      </RoundedBox>

      {[
        [-1.28, -0.145, -0.82],
        [1.28, -0.145, -0.82],
        [-1.28, -0.145, 0.82],
        [1.28, -0.145, 0.82]
      ].map(([x, y, z], idx) => (
        <RoundedBox key={idx} args={[0.28, 0.035, 0.075]} radius={0.018} smoothness={3} position={[x, y, z]}>
          <meshStandardMaterial color="#08090b" roughness={0.82} metalness={0.05} />
        </RoundedBox>
      ))}

      <group position={[-1.645, -0.045, -0.28]}>
        {[-0.11, 0.11].map((z) => (
          <RoundedBox key={z} args={[0.012, 0.028, 0.075]} radius={0.012} smoothness={3} position={[0, 0, z]}>
            <meshStandardMaterial color="#07080a" roughness={0.22} metalness={0.92} />
          </RoundedBox>
        ))}
      </group>

      <group position={[1.645, -0.045, -0.28]}>
        <RoundedBox args={[0.012, 0.034, 0.105]} radius={0.012} smoothness={3}>
          <meshStandardMaterial color="#07080a" roughness={0.22} metalness={0.92} />
        </RoundedBox>
        <mesh position={[0, 0, 0.18]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.012, 24]} />
          <meshStandardMaterial color="#07080a" roughness={0.22} metalness={0.92} />
        </mesh>
      </group>
    </group>
  );
};
