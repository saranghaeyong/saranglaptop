import React, { useMemo } from 'react';
import { getThemeMaterials } from './Materials';

interface MotherboardProps {
  isDark: boolean;
  explosionProgress: number; // 0 to 1
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const Motherboard: React.FC<MotherboardProps> = ({
  isDark,
  explosionProgress,
  onPointerOver,
  onPointerOut
}) => {
  const colors = getThemeMaterials(isDark);

  // In explosion: moves forward and lifts up
  const liftY = explosionProgress * 0.45;
  const forwardZ = explosionProgress * 0.75;

  // Generate micro SMT capacitors and chips
  const microComponents = useMemo(() => {
    const list: { x: number; z: number; w: number; d: number; h: number; type: 'ic' | 'cap' | 'res' }[] = [];
    
    // Near CPU socket
    list.push({ x: -0.35, z: -0.35, w: 0.18, d: 0.18, h: 0.02, type: 'ic' });
    list.push({ x: 0.35, z: -0.35, w: 0.16, d: 0.16, h: 0.02, type: 'ic' });
    list.push({ x: -0.4, z: -0.1, w: 0.12, d: 0.12, h: 0.018, type: 'ic' });
    list.push({ x: 0.45, z: -0.08, w: 0.14, d: 0.2, h: 0.018, type: 'ic' });
    
    // Row of tantalum / electrolytic capacitors
    for (let i = -0.5; i <= 0.5; i += 0.12) {
      list.push({ x: i, z: -0.62, w: 0.04, d: 0.06, h: 0.03, type: 'cap' });
    }
    
    // Auxiliary I/O controller ICs
    list.push({ x: -0.85, z: -0.3, w: 0.15, d: 0.2, h: 0.015, type: 'ic' });
    list.push({ x: 0.85, z: -0.25, w: 0.18, d: 0.18, h: 0.015, type: 'ic' });

    return list;
  }, []);

  return (
    <group
      position={[0, -0.01 + liftY, -0.1 + forwardZ]}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* 1. Main Motherboard PCB Substrate */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.7, 0.012, 1.25]} />
        <meshStandardMaterial
          color={colors.pcb}
          roughness={0.65}
          metalness={0.2}
        />
      </mesh>

      {/* Gold Solder Mask Traces (Subtle geometric patterns on board) */}
      <mesh position={[0, 0.007, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.65, 1.2]} />
        <meshStandardMaterial
          color={colors.gold}
          roughness={0.3}
          metalness={0.9}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* 2. Central Neural Engine / SoC Processor (ML & LLM Anchor) */}
      <group position={[0, 0.015, -0.25]}>
        {/* Silicon Interposer / Substrate */}
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.015, 0.55]} />
          <meshStandardMaterial
            color="#18181b"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        {/* Laser-Etched Polished Metal Heat Spreader */}
        <mesh position={[0, 0.012, 0]} castShadow>
          <boxGeometry args={[0.42, 0.01, 0.42]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.98}
            roughness={0.15}
          />
        </mesh>

        {/* Subtle glowing core indicator */}
        <mesh position={[0, 0.018, 0]}>
          <boxGeometry args={[0.1, 0.002, 0.1]} />
          <meshBasicMaterial color={colors.accent} />
        </mesh>
      </group>

      {/* 3. Surface Mounted Components (ICs & Capacitors) */}
      {microComponents.map((comp, idx) => (
        <mesh
          key={idx}
          position={[comp.x, 0.01 + comp.h / 2, comp.z]}
          castShadow
        >
          <boxGeometry args={[comp.w, comp.h, comp.d]} />
          <meshStandardMaterial
            color={comp.type === 'cap' ? '#e2e8f0' : colors.silicon}
            metalness={comp.type === 'cap' ? 0.9 : 0.4}
            roughness={comp.type === 'cap' ? 0.2 : 0.6}
          />
        </mesh>
      ))}

      {/* Mounting Screws at Board Corners */}
      {[
        [-1.25, 0.008, -0.55],
        [1.25, 0.008, -0.55],
        [-1.25, 0.008, 0.55],
        [1.25, 0.008, 0.55]
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]}>
          <cylinderGeometry args={[0.02, 0.02, 0.008, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};
