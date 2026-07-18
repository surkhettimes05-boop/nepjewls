'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInReveal({ children, delay = 0, className = '' }: FadeInRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 1.2, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
