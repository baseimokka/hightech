'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds before the reveal animates in. */
  delay?: number;
  /** Initial vertical offset in pixels. */
  y?: number;
  className?: string;
}

/**
 * Subtle scroll-into-view reveal. Quick and mechanical (no bounce), and fully
 * disabled when the user prefers reduced motion.
 */
export function Reveal({ children, delay = 0, y = 16, className }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
