'use client';

import * as React from 'react';
import { motion, type Variants, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE, DUR, VP, STAGGER } from '@/lib/motion';

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.md,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DUR.md,
      ease: EASE,
    },
  },
};

type StaggerContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Parent wrapper that applies a staggered entrance to its motion children.
 * Use together with `StaggerItem` for a waterfall / cascade effect.
 */
export function StaggerContainer({ children, className }: StaggerContainerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainerVariants}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={VP}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={cn(className)} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
