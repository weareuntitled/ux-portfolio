'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const MARQUEE_WORDS = [
  'Behind the Screens',
  'Motion',
  'Projects',
  'Design',
  'Systems',
  'Product',
  'Strategy',
  'Ship',
];

function MarqueeRow({ reverse = false, speed = 20 }: { reverse?: boolean; speed?: number }) {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex shrink-0 gap-8 py-2"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-8 font-display text-4xl font-bold tracking-tighter text-foreground/10 sm:text-5xl md:text-6xl"
          >
            {word}
            <span className="inline-block h-2 w-2 rounded-full bg-primary/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function TextMarqueeSection() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <section className="overflow-hidden border-y border-border/30 bg-background py-6 md:py-8">
      <MarqueeRow speed={30} />
      <MarqueeRow reverse speed={25} />
      <MarqueeRow speed={35} />
    </section>
  );
}
