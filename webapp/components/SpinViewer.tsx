'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center } from '@react-three/drei';

function LotusPetals() {
  const outerPetals = 12;
  const innerPetals = 8;
  
  return (
    <group position={[0, 1.05, 0]}>
      {/* Outer Petals */}
      {Array.from({ length: outerPetals }).map((_, i) => {
        const angle = (i / outerPetals) * Math.PI * 2;
        return (
          <group key={`outer-${i}`} rotation={[0, -angle, 0]}>
            <mesh 
              position={[0, 0, 0.22]} 
              rotation={[Math.PI / 3, 0, 0]} 
              scale={[1, 2.2, 0.3]} 
              castShadow receiveShadow
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshPhysicalMaterial color="#D4AF37" metalness={1} roughness={0.1} envMapIntensity={1.5} />
            </mesh>
          </group>
        );
      })}

      {/* Inner Petals */}
      {Array.from({ length: innerPetals }).map((_, i) => {
        const angle = (i / innerPetals) * Math.PI * 2;
        return (
          <group key={`inner-${i}`} rotation={[0, -angle + (Math.PI / innerPetals), 0]}>
            <mesh 
              position={[0, 0.08, 0.12]} 
              rotation={[Math.PI / 6, 0, 0]} 
              scale={[1, 1.8, 0.3]} 
              castShadow receiveShadow
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshPhysicalMaterial color="#D4AF37" metalness={1} roughness={0.1} envMapIntensity={1.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function JewelryModel() {
  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      {/* Realistic Golden Band */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1, 0.08, 64, 128]} />
        <meshPhysicalMaterial 
          color="#D4AF37"
          metalness={1}
          roughness={0.05}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Procedural Lotus Petals */}
      <LotusPetals />

      {/* Diamond Centerpiece */}
      <mesh castShadow receiveShadow position={[0, 1.15, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial 
          color="#FFFFFF"
          metalness={0.1}
          roughness={0}
          transmission={0.95}
          ior={2.4}
          thickness={0.5}
          envMapIntensity={2}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

export default function SpinViewer({ sku, totalFrames = 36 }) {
  const [isActive, setIsActive] = useState(false);
  const [isARMode, setIsARMode] = useState(false);
  const videoRef = useRef(null);

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Prefer rear camera on mobile
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsARMode(true);
      setIsActive(true); // Stop auto-rotate when in AR
    } catch (err) {
      console.error("Error accessing webcam: ", err);
      alert("Camera access denied or unavailable. Please enable camera permissions to use AR Try-On.");
    }
  };

  const stopAR = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARMode(false);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopAR();
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* 3D Canvas / AR Wrapper */}
      <div 
        style={{...styles.canvasWrapper, backgroundColor: isARMode ? '#000' : '#FAFAFA'}} 
        onMouseEnter={() => !isARMode && setIsActive(true)}
        onClick={() => !isARMode && setIsActive(true)}
      >
        {/* Hidden Video element for AR background */}
        <video 
          ref={videoRef}
          playsInline
          style={{
            ...styles.videoFeed,
            display: isARMode ? 'block' : 'none'
          }}
        />

        {/* 3D Overlay */}
        <Canvas 
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }} // Alpha true allows video to show behind canvas!
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
        >
          <Environment preset="city" />
          
          <ambientLight intensity={isARMode ? 1.0 : 0.6} /> {/* Brighter ambient in AR to match real world better */}
          <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
          
          <Center>
            <JewelryModel />
          </Center>

          {/* Only show floor shadow if NOT in AR mode */}
          {!isARMode && (
            <ContactShadows 
              position={[0, -1.2, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2.5} 
              far={4} 
              color="#1B2A3A" 
            />
          )}

          {/* 360 Drag Controls */}
          <OrbitControls 
            enableZoom={isARMode} // Allow zoom only in AR mode to size ring to finger
            enablePan={isARMode}  // Allow panning only in AR mode to position ring over finger
            autoRotate={!isActive && !isARMode}
            autoRotateSpeed={1.5}
            minPolarAngle={isARMode ? 0 : Math.PI / 3} // Unrestrict angles in AR
            maxPolarAngle={isARMode ? Math.PI : Math.PI / 2}
          />
        </Canvas>

        {/* Interaction Hint Overlay (Only when not active and not AR) */}
        {!isActive && !isARMode && (
          <div style={styles.overlay}>
            <div style={styles.hintPill}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <path d="M18 8L22 12L18 16" />
                <path d="M6 8L2 12L6 16" />
                <path d="M2 12H22" />
              </svg>
              Drag to Rotate 3D Model
            </div>
          </div>
        )}
        
        {/* AR Mode Instructions */}
        {isARMode && (
          <div style={styles.arInstructions}>
            Drag and pinch to position the ring perfectly over your finger!
          </div>
        )}
      </div>

      {/* AR Try-On Action Bar */}
      <div style={styles.actionBar}>
        {isARMode ? (
          <button style={styles.arBtnStop} onClick={stopAR}>
            Close AR Try-On
          </button>
        ) : (
          <button style={styles.arBtnStart} onClick={startAR}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
              <path d="M15 3h6v6" />
              <path d="M9 21H3v-6" />
              <path d="M21 3l-7 7" />
              <path d="M3 21l7-7" />
            </svg>
            Click Here To Try On (AR)
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  canvasWrapper: {
    width: '100%',
    aspectRatio: '1 / 1',
    position: 'relative',
    cursor: 'grab',
    overflow: 'hidden',
    borderRadius: '8px 8px 0 0',
  },
  videoFeed: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 'var(--space-5)',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 20,
  },
  hintPill: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-neutral)',
    padding: '12px 24px',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem',
    fontWeight: '600',
    boxShadow: '0 10px 30px rgba(27, 42, 58, 0.2)',
    animation: 'pulse 2s infinite',
  },
  arInstructions: {
    position: 'absolute',
    top: 'var(--space-4)',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(27, 42, 58, 0.8)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '100px',
    fontSize: '0.85rem',
    zIndex: 20,
    textAlign: 'center',
    width: 'max-content',
    maxWidth: '90%',
  },
  actionBar: {
    width: '100%',
    padding: 'var(--space-3)',
    backgroundColor: '#EBEBEB',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0 0 8px 8px',
  },
  arBtnStart: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
    padding: '10px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
  },
  arBtnStop: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-neutral)',
    border: 'none',
    padding: '10px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
  }
};
