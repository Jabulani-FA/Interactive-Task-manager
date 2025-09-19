import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { TaskStats } from '@/types/task';

interface FloatingCubeProps {
  stats: TaskStats;
}

export const FloatingCube = ({ stats }: FloatingCubeProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  // Change color based on completion rate
  const getColor = () => {
    if (stats.completionRate >= 100) return '#a855f7'; // Purple for complete
    if (stats.completionRate >= 75) return '#22c55e'; // Green for high progress
    if (stats.completionRate >= 50) return '#eab308'; // Yellow for medium progress
    if (stats.completionRate >= 25) return '#f97316'; // Orange for low progress
    return '#6366f1'; // Blue for just started
  };

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={stats.total > 0 ? 1 + (stats.completionRate / 100) * 0.5 : 1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={getColor()}
        metalness={0.3}
        roughness={0.4}
        emissive={getColor()}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};