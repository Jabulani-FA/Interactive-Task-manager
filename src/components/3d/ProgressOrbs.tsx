import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import { TaskStats } from '@/types/task';

interface ProgressOrbsProps {
  stats: TaskStats;
}

export const ProgressOrbs = ({ stats }: ProgressOrbsProps) => {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const orbCount = 8;
  const completedOrbs = Math.round((stats.completionRate / 100) * orbCount);

  return (
    <group ref={groupRef}>
      {Array.from({ length: orbCount }, (_, i) => {
        const angle = (i / orbCount) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isCompleted = i < completedOrbs;

        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color={isCompleted ? '#a855f7' : '#374151'}
              metalness={0.5}
              roughness={0.3}
              emissive={isCompleted ? '#a855f7' : '#000000'}
              emissiveIntensity={isCompleted ? 0.3 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
};