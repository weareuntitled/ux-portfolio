'use client';

import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      mass: 1,
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
  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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

