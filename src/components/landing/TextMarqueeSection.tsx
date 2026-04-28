'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TextMarqueeSectionProps {
  words: string[];
  reverse?: boolean;
  speed?: number;
}

function MarqueeRow({ words, reverse = false, speed = 20 }: { words: string[]; reverse?: boolean; speed?: number }) {
  const allWords = [...words, ...words, ...words, ...words];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex shrink-0 gap-8 py-2 md:gap-12"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {allWords.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-8 font-display text-3xl font-bold uppercase tracking-tighter text-foreground/10 sm:text-4xl md:text-5xl md:gap-12"
          >
            {word}
            <span className="inline-block h-2 w-2 rounded-full bg-primary/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function TextMarqueeSection({ words, speed = 25 }: TextMarqueeSectionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <section className="overflow-hidden border-y border-border/30 bg-background py-4 md:py-6">
      <MarqueeRow words={words} speed={speed} />
      <MarqueeRow words={words} reverse speed={speed * 0.8} />
      <MarqueeRow words={words} speed={speed * 1.2} />
    </section>
  );
}
