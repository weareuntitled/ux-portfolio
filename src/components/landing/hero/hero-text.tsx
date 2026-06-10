/**
 * Text content for the hero: h1 with RGB ghosts, rotating word, subtitle.
 * All wrapped in a single motion.div that fades in.
 * #schema:
 * {
 *   type: "component",
 *   args: "showContent, reduceMotion, wordIndex: number",
 *   module: "hero/hero-text.tsx"
 * }
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { HERO_WORDS, type HeroWord } from '@/lib/hero-words';
import {
  RGB_DIRS, RGB_OPACITY, TEXT_OPACITY_SCALE,
  RGB_MAGNITUDE, RGB_BLUR, SMEAR_BLUR, MAIN_BLUR,
} from './gradients';

function PrismaticWord({ word }: { word: HeroWord }) {
  return (
    <span className="relative inline-block">
      {(['red', 'blue'] as const).map((key) => {
        const g = RGB_DIRS[key];
        return (
          <span key={key} aria-hidden className="absolute inset-0 inline-block align-baseline font-light italic"
            style={{ color: g.color, filter: `blur(${RGB_BLUR.word}px)`, transform: `translate(${g.dx * RGB_MAGNITUDE.word}px, ${g.dy * RGB_MAGNITUDE.word}px)`, opacity: RGB_OPACITY[key] * TEXT_OPACITY_SCALE, mixBlendMode: 'multiply', pointerEvents: 'none' }}>
            {word.label}
          </span>
        );
      })}
      <span aria-hidden className="absolute inset-0 inline-block align-baseline text-black font-light italic"
        style={{ filter: `blur(${SMEAR_BLUR.word}px)`, transform: 'translate(2px, 2px)', opacity: 0.25, pointerEvents: 'none' }}>
        {word.label}
      </span>
      <span className="relative inline-block align-baseline text-black font-light italic"
        style={{ filter: `blur(${MAIN_BLUR.word}px) drop-shadow(0 0 4px rgba(40, 60, 140, 0.25))` }}>
        {word.label}
      </span>
    </span>
  );
}

export function HeroText({
  showContent, reduceMotion, wordIndex,
}: {
  showContent: boolean;
  reduceMotion: boolean;
  wordIndex: number;
}) {
  const currentWord = HERO_WORDS[wordIndex];

  return (
    <motion.div initial={false} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }} className="relative z-30 mx-auto w-full max-w-6xl">
      <motion.p className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.22em] text-foreground"
        style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))' }}
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.5, ease: EASE }}>
        Hey! I&apos;m
      </motion.p>

      <div className="relative">
        {(['red', 'blue'] as const).map((key) => {
          const g = RGB_DIRS[key];
          return (
            <motion.h1 key={`h1-rgb-${key}`} aria-hidden
              className="font-display text-[9vw] leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[4.8vw]"
              style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif', color: g.color, filter: `blur(${RGB_BLUR.h1}px)`, position: 'absolute', top: 0, left: 0, transform: `translate(${g.dx * RGB_MAGNITUDE.h1}px, ${g.dy * RGB_MAGNITUDE.h1}px)`, opacity: RGB_OPACITY[key] * TEXT_OPACITY_SCALE, mixBlendMode: 'multiply', pointerEvents: 'none', whiteSpace: 'nowrap' }}
              initial={{ opacity: 0, x: g.dx * 10 }} animate={{ opacity: RGB_OPACITY[key] * TEXT_OPACITY_SCALE, x: 0 }}
              transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.6, ease: EASE }}>
              Daniel Peters,
            </motion.h1>
          );
        })}
        <motion.h1 aria-hidden
          className="font-display text-[9vw] leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[4.8vw] text-black"
          style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif', filter: `blur(${SMEAR_BLUR.h1}px)`, position: 'absolute', top: '3px', left: '3px', opacity: 0.3, pointerEvents: 'none', whiteSpace: 'nowrap' }}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.6, ease: EASE }}>
          Daniel Peters,
        </motion.h1>
        <motion.h1
          className="relative font-display text-[9vw] leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[4.8vw]"
          style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif', filter: `blur(${MAIN_BLUR.h1}px) drop-shadow(0 0 4px rgba(40, 60, 140, 0.3))` }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.6, ease: EASE }}>
          Daniel Peters,
        </motion.h1>
      </div>

      <motion.div
        className="mt-1 font-display text-[14vw] leading-[1.0] font-light tracking-[-0.045em] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5vw]"
        style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif' }}
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.7, ease: EASE }}>
        <span className="relative inline-block min-h-[1em]">
          <AnimatePresence mode="wait">
            <motion.span key={wordIndex} initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="inline-block">
              <PrismaticWord word={currentWord} />
            </motion.span>
          </AnimatePresence>
          <span className="sr-only" role="text">Daniel Peters is a Product Designer, UX/UI Designer, Product Owner, UX Strategist, Design Lead, AI-Native Builder, Full-Stack Designer, Motion Designer.</span>
        </span>
      </motion.div>

      <motion.p className="mt-1.5 font-mono text-xs font-medium uppercase tracking-[0.22em] text-foreground"
        style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))' }}
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.9, ease: EASE }}>
        livin&apos; in augsburg.
      </motion.p>
    </motion.div>
  );
}
