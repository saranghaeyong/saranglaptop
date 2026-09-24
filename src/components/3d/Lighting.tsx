import React from 'react';

interface LightingProps {
  isDark: boolean;
}

export const Lighting: React.FC<LightingProps> = ({ isDark }) => {
  return (
    <>
      <ambientLight intensity={isDark ? 0.32 : 0.62} color={isDark ? '#dbe7ff' : '#ffffff'} />

      <directionalLight
        position={[4.5, 8, 5]}
        intensity={isDark ? 2.15 : 2.0}
        color={isDark ? '#ffffff' : '#fffdf8'}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00008}
      />

      <directionalLight
        position={[-5, 4, -4]}
        intensity={isDark ? 1.15 : 0.75}
        color={isDark ? '#8eb5ff' : '#d9e2ef'}
      />

      <directionalLight
        position={[4, 2, -6]}
        intensity={isDark ? 0.7 : 0.45}
        color={isDark ? '#d6baff' : '#ffffff'}
      />

      <pointLight
        position={[0, -1.5, 2.8]}
        intensity={isDark ? 0.34 : 0.22}
        color={isDark ? '#79a9ff' : '#dfe7f0'}
        distance={7}
        decay={2}
      />
    </>
  );
};
