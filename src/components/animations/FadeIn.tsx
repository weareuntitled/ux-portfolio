'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  /** Optional delay in seconds for sequencing multiple FadeIn blocks */
  delay?: number;
};

/**
 * Blur-in, spring-based reveal inspired by Apple product pages.
 *
 * Initial:   opacity 0, y 20px, blur(10px)
 * Final:     opacity 1, y 0,   blur(0px)
 * Transition: spring { stiffness: 50, damping: 20, mass: 1 }
 */
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

