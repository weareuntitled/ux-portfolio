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
        className="flex shrink-0 gap-8 py-1.5 md:gap-10"
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
            className="flex items-center gap-8 font-display text-[6vw] font-bold uppercase leading-none tracking-tighter text-foreground/[0.06] md:gap-10 md:text-[5vw]"
          >
            {word}
            <span className="inline-block h-2 w-2 rounded-full bg-primary/20" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function TextMarqueeSection({ words, speed = 50 }: TextMarqueeSectionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <section className="overflow-hidden border-y border-white/5 bg-background py-3">
      <MarqueeRow words={words} speed={speed} />
    </section>
  );
}
