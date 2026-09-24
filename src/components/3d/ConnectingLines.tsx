import React, { useMemo } from 'react';
import * as THREE from 'three';

interface ConnectingLinesProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
}

export const ConnectingLines: React.FC<ConnectingLinesProps> = ({
  isDark,
  explosionProgress
}) => {
  // Only show when partially exploded
  if (explosionProgress < 0.05) return null;

  const opacity = Math.min(1, explosionProgress * 1.5) * (isDark ? 0.45 : 0.3);
  const lineColor = isDark ? '#60a5fa' : '#2563eb';

  // Base positions vs Exploded positions
  const linePairs = useMemo(() => {
    // [Start [x,y,z], End [x,y,z]]
    const pairs: [number, number, number, number, number, number][] = [
      // Screen hinge link
      [0, -explosionProgress * 1.5, -1.0, 0, 0.08 + explosionProgress * 1.8, -1.02 - explosionProgress * 0.9],
      // Keyboard deck link
      [0, -explosionProgress * 1.5, 0, 0, 0.015 + explosionProgress * 1.35, 0],
      // Motherboard link
      [0, -explosionProgress * 1.5, -0.1, 0, -0.01 + explosionProgress * 0.45, -0.1 + explosionProgress * 0.75],
      // Battery link
      [0, -explosionProgress * 1.5, 0.5, 0, -0.02 - explosionProgress * 0.95, 0.5 + explosionProgress * 0.55],
      // SSD link
      [0.7, -explosionProgress * 1.5, 0.1, 0.7 + explosionProgress * 1.55, 0.01 + explosionProgress * 0.75, 0.1 + explosionProgress * 0.35],
      // RAM link
      [-0.7, -explosionProgress * 1.5, 0.1, -0.7 - explosionProgress * 1.45, 0.01 + explosionProgress * 0.7, 0.1 + explosionProgress * 0.25],
      // Cooling fans link
      [0, -explosionProgress * 1.5, -0.65, 0, 0.02 + explosionProgress * 0.55, -0.65 - explosionProgress * 0.85]
    ];

    const positions = new Float32Array(pairs.length * 6);
    pairs.forEach((p, idx) => {
      positions[idx * 6 + 0] = p[0];
      positions[idx * 6 + 1] = p[1];
      positions[idx * 6 + 2] = p[2];
      positions[idx * 6 + 3] = p[3];
      positions[idx * 6 + 4] = p[4];
      positions[idx * 6 + 5] = p[5];
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [explosionProgress]);

  return (
    <lineSegments geometry={linePairs}>
      <lineBasicMaterial
        color={lineColor}
        transparent
        opacity={opacity}
        linewidth={1}
      />
    </lineSegments>
  );
};
