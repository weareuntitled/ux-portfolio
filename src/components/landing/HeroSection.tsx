'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { WebGLGradientBackground } from './WebGLGradientBackground';
import { contact } from '@/content/home';

const COMPLEXITY_WORDS = [
  { label: 'Complexity' },
  { label: 'Mess' },
  { label: 'Friction' },
  { label: 'Fragmentation' },
];

function HandDrawnStrikethrough({ isVisible }: { isVisible: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute left-0 top-1/2 overflow-visible"
      style={{ width: '100%', height: '12px', transform: 'translateY(-40%)' }}
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,6 Q25,2 50,6 T100,6"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isVisible ? 1 : 0,
          opacity: isVisible ? 0.7 : 0,
        }}
        transition={{
          pathLength: { duration: 0.4, ease: 'easeOut' },
          opacity: { duration: 0.2 },
        }}
      />
    </svg>
  );
}

function FlipWord3D({
  word,
  isFlipping,
  showStrikethrough,
}: {
  word: (typeof COMPLEXITY_WORDS)[0];
  isFlipping: boolean;
  showStrikethrough: boolean;
}) {
  return (
    <span className="relative inline-block">
      <span
        className="inline-block transition-all duration-300"
        style={{
          fontFamily: "'Bitcount', var(--font-mono), monospace",
          fontWeight: 400,
          fontStyle: 'italic',
          transform: isFlipping ? 'rotateX(-90deg)' : 'rotateX(0deg)',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {word.label}
      </span>
      <HandDrawnStrikethrough isVisible={showStrikethrough && !isFlipping} />
    </span>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showStrikethrough, setShowStrikethrough] = useState(true);

  const currentWord = COMPLEXITY_WORDS[wordIndex];

  const cycleWord = useCallback(() => {
    setShowStrikethrough(false);
    setTimeout(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setWordIndex((prev) => {
          let next;
          do {
            next = Math.floor(Math.random() * COMPLEXITY_WORDS.length);
          } while (next === prev);
          return next;
        });
        setTimeout(() => {
          setIsFlipping(false);
          setTimeout(() => {
            setShowStrikethrough(true);
          }, 100);
        }, 150);
      }, 150);
    }, 200);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(cycleWord, 4000);
    return () => clearInterval(interval);
  }, [cycleWord, reduceMotion]);

  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-12 text-center md:px-10 md:pb-16">
      <WebGLGradientBackground />

      {/* Refined bottom edge — gradient fade + subtle border */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto h-px w-full max-w-[1400px] bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Profile photo — subtle, right side */}
        <motion.div
          className="pointer-events-none absolute right-0 top-0 bottom-0 hidden w-[30vw] max-w-[400px] translate-x-1/3 md:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{
            opacity: 0.22,
            x: 0,
            y: [0, -6, 0, 3, 0],
          }}
          transition={{
            opacity: { duration: reduceMotion ? 0 : DUR.lg, delay: 0.4, ease: EASE },
            x: { duration: reduceMotion ? 0 : DUR.lg, delay: 0.4, ease: EASE },
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div
            className="relative h-full w-full"
            style={{
              maskImage:
                'radial-gradient(ellipse at center, black 0%, black 35%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 0%, black 35%, transparent 100%)',
            }}
          >
            <Image
              src={contact.profileImage}
              alt={contact.name}
              fill
              priority
              className="object-cover object-top opacity-80"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Availability pill — more refined */}
        <motion.div
          className="mb-5 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
        >
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
            <div className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <span className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-widest text-primary/90">
              Available to work
            </span>
          </div>
        </motion.div>

        {/* Handle + Location */}
        <motion.div
          className="mb-8 flex items-center gap-3 text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.18, ease: EASE }}
        >
          <span className="font-mono text-xs tracking-wide">@danielpeters</span>
          <span className="text-[10px] opacity-30">·</span>
          <span className="font-mono text-xs tracking-wide">Augsburg / Munich</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className="mb-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.25, ease: EASE }}
        >
          <h1
            className="text-[10vw] leading-[0.9] font-bold tracking-[-0.04em] text-foreground sm:text-[7vw] md:text-[6vw] lg:text-[5.5vw]"
            style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif' }}
          >
            <span className="block">Solving</span>
            <span className="block" style={{ perspective: '1000px' }}>
              <FlipWord3D
                word={currentWord}
                isFlipping={isFlipping}
                showStrikethrough={showStrikethrough}
              />
            </span>
            <span className="block text-primary">with Structure.</span>
          </h1>
        </motion.div>

        {/* Body copy */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.4, ease: EASE }}
        >
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            <span className="font-medium text-foreground/80">Product Designer</span> with AI
            expertise. Designing interfaces, systems, and workflows for enterprise teams.{' '}
            <span className="font-medium text-foreground/80">UX Designer</span> ·{' '}
            <span className="font-medium text-foreground/80">Certified Scrum Master</span> ·{' '}
            <span className="font-medium text-foreground/80">Motion</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
