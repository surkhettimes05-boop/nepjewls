'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TheSignet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1) based on page height
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollY(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Base rotation to keep it alive even without scroll
    meshRef.current.rotation.y += delta * 0.1;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

    // Native scroll-tied rotation
    const targetRotY = scrollY * Math.PI * 4;
    const targetRotZ = scrollY * Math.PI * 0.2;
    const targetPosY = -scrollY * 1.5;
    const targetPosZ = scrollY * 3;

    // Smoothly interpolate current rotation/position towards targets
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.1;
    meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.1;
    meshRef.current.position.y += (targetPosY - meshRef.current.position.y) * 0.1;
    meshRef.current.position.z += (targetPosZ - meshRef.current.position.z) * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      {/* Procedural architectural geometry substituting a signet ring */}
      <torusKnotGeometry args={[1.2, 0.4, 256, 64, 2, 3]} />
      
      {/* Patan Gold PBR Material */}
      <meshPhysicalMaterial 
        color="#D4AF37" 
        metalness={1.0} 
        roughness={0.15} 
        clearcoat={0.8} 
        clearcoatRoughness={0.1}
        envMapIntensity={2.0} 
      />
    </mesh>
  );
}
