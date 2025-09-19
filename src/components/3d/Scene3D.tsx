import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { FloatingCube } from './FloatingCube';
import { ProgressOrbs } from './ProgressOrbs';
import { TaskStats } from '@/types/task';

interface Scene3DProps {
  stats: TaskStats;
  className?: string;
}

export const Scene3D = ({ stats, className = '' }: Scene3DProps) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas className="rounded-xl">
        <PerspectiveCamera makeDefault position={[5, 3, 5]} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        
        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        
        {/* 3D Components */}
        <FloatingCube stats={stats} />
        <ProgressOrbs stats={stats} />
      </Canvas>
      
      {/* Overlay stats */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 text-sm">
        <div className="text-muted-foreground">Tasks: {stats.completed}/{stats.total}</div>
        <div className="text-primary font-medium">{stats.completionRate.toFixed(1)}% Complete</div>
      </div>
    </div>
  );
};