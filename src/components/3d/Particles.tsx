import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  isDark: boolean;
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ isDark, count = 160 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      spd[i * 3 + 0] = (Math.random() - 0.5) * 0.05;
      spd[i * 3 + 1] = Math.random() * 0.08 + 0.02;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return [pos, spd];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += speeds[i * 3 + 1] * delta;
      posArray[i * 3 + 0] += speeds[i * 3 + 0] * delta;

      // Wrap around bounds
      if (posArray[i * 3 + 1] > 4.5) {
        posArray[i * 3 + 1] = -4.0;
        posArray[i * 3 + 0] = (Math.random() - 0.5) * 12;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.035 : 0.03}
        color={isDark ? '#93c5fd' : '#475569'}
        transparent
        opacity={isDark ? 0.45 : 0.25}
        sizeAttenuation
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
};
