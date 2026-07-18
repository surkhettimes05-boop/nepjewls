'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TheSignet from './TheSignet';

export default function DigitalVitrine() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-luxury-bg pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]} // Support retina displays
      >
        {/* Absolute Darkness with precise lighting */}
        <color attach="background" args={['#0A0A0A']} />
        
        {/* Dramatic Chiaroscuro Lighting */}
        <ambientLight intensity={0.1} />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#FFF8E7" // Warm spotlight
        />
        <spotLight 
          position={[-5, -5, -5]} 
          angle={0.5} 
          penumbra={1} 
          intensity={0.5} 
          color="#8C857B" // Cool fill light
        />

        {/* Scroll Controls tie the canvas animation to the document scroll */}
        <TheSignet />

        {/* Environment map for realistic reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
