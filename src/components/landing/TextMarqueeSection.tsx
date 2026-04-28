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
        className="flex shrink-0 gap-12 py-2 md:gap-16"
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
            className="flex items-center gap-12 font-display text-[16vw] font-bold uppercase leading-none tracking-tighter text-foreground/10 md:gap-16"
          >
            {word}
            <span className="inline-block h-3 w-3 rounded-full bg-primary/30" />
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
    <section className="overflow-hidden border-y border-white/5 bg-background py-3">
      <MarqueeRow words={words} speed={speed} />
    </section>
  );
}
