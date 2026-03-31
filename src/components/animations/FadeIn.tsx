'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE, DUR, VP } from '@/lib/motion';

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Optional delay in seconds for sequencing multiple FadeIn blocks */
  delay?: number;
};

/**
 * Blur-in, ease-out reveal.
 *
 * Initial:    opacity 0, y 20px, blur(6px)
 * Final:      opacity 1, y 0,   blur(0px)
 * Transition: 0.5s EASE (expo-out), respects prefers-reduced-motion
 */
export function FadeIn({ children, className, style, delay = 0 }: FadeInProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      style={style}
      initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VP}
      transition={{ duration: reduce ? 0 : DUR.md, ease: EASE, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
