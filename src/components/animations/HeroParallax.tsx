'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

type HeroParallaxProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Scroll-linked wrapper for large hero visuals.
 * - Subtle parallax (y) so image moves slower than scroll.
 * - Scale down from 1.1 → 1.0 as the user scrolls past.
 */
export function HeroParallax({ children, className }: HeroParallaxProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <motion.div ref={ref} style={{ scale, y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

