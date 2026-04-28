'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { contact } from '@/content/home';

const HEADLINE_LINES = [
  { prefix: 'Solving &', target: 'Simplifying', suffix: 'by design.' },
  { prefix: 'Designing', target: 'complexity', suffix: 'away.' },
  { prefix: 'Building', target: 'systems', suffix: 'that scale.' },
];

const COMPLEXITY_STYLES = [
  { font: "'Bitcount', monospace", decoration: 'line-through', label: 'chaos' },
  { font: "'Bitcount', monospace", decoration: 'underline', label: 'noise' },
  { font: "'Bitcount', monospace", decoration: 'overline', label: 'mess' },
  { font: "'Bitcount', monospace", decoration: 'line-through', label: 'complexity' },
];

function ScrambleText({ text, isActive, onComplete }: { text: string; isActive: boolean; onComplete?: () => void }) {
  const [display, setDisplay] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  useEffect(() => {
    if (!isActive) {
      setDisplay('');
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (idx < iteration) return text[idx];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iteration >= text.length) {
        clearInterval(interval);
        setTimeout(() => onComplete?.(), 500);
      }
      iteration += 1 / 2;
    }, 40);
    return () => clearInterval(interval);
  }, [isActive, text, onComplete]);

  return <span className="inline-block min-w-[1ch]">{display}</span>;
}

function FlipWord3D({ style }: { style: typeof COMPLEXITY_STYLES[0] }) {
  return (
    <span
      className="inline-block transition-all duration-500"
      style={{
        fontFamily: style.font,
        textDecoration: style.decoration,
        textDecorationColor: 'hsl(var(--primary))',
        textDecorationThickness: '2px',
        fontStyle: 'italic',
      }}
    >
      {style.label}
    </span>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing');
  const [styleIndex, setStyleIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const currentLine = HEADLINE_LINES[lineIndex];

  const cycleLine = useCallback(() => {
    setPhase('typing');
    setLineIndex((prev) => (prev + 1) % HEADLINE_LINES.length);
  }, []);

  const cycleStyle = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setStyleIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * COMPLEXITY_STYLES.length);
        } while (next === prev);
        return next;
      });
      setIsFlipping(false);
    }, 300);
  }, []);

  // Auto-cycle styles every 3 seconds
  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(cycleStyle, 3000);
    return () => clearInterval(interval);
  }, [cycleStyle, reduceMotion]);

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-8 text-center">
      {/* Ambient light orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-white/5 blur-[100px] animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-[10%] left-[30%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px] animate-pulse-slow"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Profile photo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, ease: EASE }}
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-muted ring-2 ring-primary/20">
            <Image
              src={contact.profileImage}
              alt={contact.name}
              fill
              priority
              className="object-cover"
              sizes="96px"
            />
          </div>
        </motion.div>

        {/* Availability pill */}
        <motion.div
          className="mb-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
        >
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-white/5 px-4 py-2 backdrop-blur-md">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </div>
            <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
              Available to work
            </span>
          </div>
        </motion.div>

        {/* Handle + Location */}
        <motion.div
          className="mb-10 flex items-center gap-3 text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.2, ease: EASE }}
        >
          <span className="font-mono text-xs">@danielpeters</span>
          <span className="text-xs opacity-40">·</span>
          <span className="font-mono text-xs">Augsburg / Munich</span>
        </motion.div>

        {/* Main Headline with typewriter/scramble */}
        <motion.div
          className="mb-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.3, ease: EASE }}
        >
          <h1 className="font-display text-[12vw] leading-[0.9] font-bold tracking-tighter text-foreground sm:text-[8vw] md:text-[7vw]">
            <span className="block">
              <ScrambleText text={currentLine.prefix} isActive={phase === 'typing'} />
            </span>
            <span className="block" style={{ perspective: '1000px' }}>
              <span
                className="inline-block transition-transform duration-300"
                style={{
                  transform: isFlipping ? 'rotateX(-90deg)' : 'rotateX(0deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <FlipWord3D style={COMPLEXITY_STYLES[styleIndex]} />
              </span>
            </span>
            <span className="block text-primary">{currentLine.suffix}</span>
          </h1>
        </motion.div>

        {/* Body copy */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.5, ease: EASE }}
        >
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Currently at <span className="text-foreground font-medium">Untitled-ux</span>, bridging design and engineering for enterprise teams. Certified Scrum Master with 7+ years shipping complex products.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
