import React from 'react';

interface LightingProps {
  isDark: boolean;
}

export const Lighting: React.FC<LightingProps> = ({ isDark }) => {
  if (isDark) {
    return (
      <>
        {/* Soft atmospheric ambient */}
        <ambientLight intensity={0.45} color="#cbd5e1" />

        {/* Primary Key Light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          color="#f8fafc"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Cool Rim Light from rear left (accentuating metallic edges) */}
        <directionalLight
          position={[-6, 4, -5]}
          intensity={1.2}
          color="#60a5fa"
        />

        {/* Subtle violet backlight */}
        <pointLight
          position={[0, -2, -3]}
          intensity={0.8}
          color="#818cf8"
          distance={8}
        />

        {/* Subtle floor contact bounce */}
        <pointLight
          position={[0, -2, 2]}
          intensity={0.3}
          color="#38bdf8"
          distance={6}
        />
      </>
    );
  }

  return (
    <>
      {/* Warm studio ambient */}
      <ambientLight intensity={0.85} color="#ffffff" />

      {/* Crisp overhead studio key */}
      <directionalLight
        position={[4, 9, 4]}
        intensity={1.6}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Soft fill light */}
      <directionalLight
        position={[-5, 5, -4]}
        intensity={0.7}
        color="#f1f5f9"
      />

      {/* Under-glow fill */}
      <pointLight
        position={[0, -3, 0]}
        intensity={0.4}
        color="#e2e8f0"
        distance={8}
      />
    </>
  );
};
