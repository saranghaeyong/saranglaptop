import React from 'react';
import { getThemeMaterials } from './Materials';

interface SpeakersProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const Speakers: React.FC<SpeakersProps> = ({
  isDark,
  explosionProgress,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);

  // In explosion: speakers separate left/right
  const spreadX = explosionProgress * 0.95;
  const liftY = explosionProgress * 0.15;

  return (
    <group
      position={[0, 0.01 + liftY, 0.1]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* LEFT STEREO SPEAKER ENCLOSURE */}
      <group position={[-1.38 - spreadX, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.02, 0.85]} />
          <meshStandardMaterial
            color={colors.battery}
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>
        {/* Speaker driver dome 1 */}
        <mesh position={[0, 0.011, -0.2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.005, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Speaker driver dome 2 */}
        <mesh position={[0, 0.011, 0.2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.005, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
      </group>

      {/* RIGHT STEREO SPEAKER ENCLOSURE */}
      <group position={[1.38 + spreadX, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.02, 0.85]} />
          <meshStandardMaterial
            color={colors.battery}
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>
        {/* Speaker driver dome 1 */}
        <mesh position={[0, 0.011, -0.2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.005, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Speaker driver dome 2 */}
        <mesh position={[0, 0.011, 0.2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.005, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
};
