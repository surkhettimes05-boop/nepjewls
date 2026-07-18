'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      setIsTouchDevice(true);
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      
      if (cursorType === 'view') {
        setCursorVariant('view');
        setCursorText('View');
      } else if (cursorType === 'button' || target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'A' || target.closest('a')) {
        setCursorVariant('button');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  const variants: Variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      width: 12,
      height: 12,
      backgroundColor: 'rgba(27, 27, 27, 1)', // luxury-text
      mixBlendMode: 'normal' as any,
      transition: { type: 'spring' as any, mass: 0.1, stiffness: 800, damping: 50, duration: 0.1 }
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: 'rgba(27, 27, 27, 0.1)',
      border: '1px solid rgba(27, 27, 27, 0.2)',
      mixBlendMode: 'normal' as any,
      transition: { type: 'spring' as any, mass: 0.1, stiffness: 800, damping: 50, duration: 0.1 }
    },
    view: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: 'rgba(248, 245, 241, 0.95)', // luxury-bg
      color: '#1B1B1B',
      mixBlendMode: 'normal' as any,
      transition: { type: 'spring' as any, mass: 0.1, stiffness: 800, damping: 50, duration: 0.1 }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center font-sans uppercase tracking-[0.18em] text-[10px]"
      variants={variants}
      animate={cursorVariant}
    >
      {cursorText && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-luxury-text block"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
