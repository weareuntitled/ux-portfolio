'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { WebGLGradientBackground } from './WebGLGradientBackground';
import { contact } from '@/content/home';

const COMPLEXITY_WORDS = [
  { label: 'chaos', color: '#ef4444' },
  { label: 'noise', color: '#f97316' },
  { label: 'mess', color: '#eab308' },
  { label: 'complexity', color: '#22c55e' },
];

/** Animated hand-drawn strikethrough line using SVG */
function HandDrawnStrikethrough({ 
  isVisible, 
  width = 120,
  color = 'hsl(var(--primary))' 
}: { 
  isVisible: boolean; 
  width?: number;
  color?: string;
}) {
  return (
    <svg
      className="absolute left-0 top-1/2 pointer-events-none overflow-visible"
      style={{ 
        width: `${width}px`, 
        height: '12px',
        transform: 'translateY(-40%)',
      }}
      viewBox={`0 0 ${width} 12`}
      preserveAspectRatio="none"
    >
      <motion.path
        d={`M0,6 Q${width * 0.25},2 ${width * 0.5},6 T${width},6`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isVisible ? 1 : 0, 
          opacity: isVisible ? 0.7 : 0 
        }}
        transition={{ 
          pathLength: { duration: 0.4, ease: "easeOut" },
          opacity: { duration: 0.2 }
        }}
      />
    </svg>
  );
}

function FlipWord3D({ 
  word, 
  isFlipping,
  showStrikethrough 
}: { 
  word: typeof COMPLEXITY_WORDS[0]; 
  isFlipping: boolean;
  showStrikethrough: boolean;
}) {
  return (
    <span className="relative inline-block">
      <span
        className="inline-block transition-all duration-300"
        style={{
          fontFamily: "'Bitcount', var(--font-mono), monospace",
          fontWeight: 100,
          fontStyle: 'italic',
          transform: isFlipping ? 'rotateX(-90deg)' : 'rotateX(0deg)',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {word.label}
      </span>
      <HandDrawnStrikethrough 
        isVisible={showStrikethrough && !isFlipping} 
        width={word.label.length * 16 + 8}
        color={word.color}
      />
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
    // Hide strikethrough first
    setShowStrikethrough(false);
    
    // Start flip
    setTimeout(() => {
      setIsFlipping(true);
      
      // Change word mid-flip
      setTimeout(() => {
        setWordIndex((prev) => {
          let next;
          do {
            next = Math.floor(Math.random() * COMPLEXITY_WORDS.length);
          } while (next === prev);
          return next;
        });
        
        // End flip
        setTimeout(() => {
          setIsFlipping(false);
          
          // Show strikethrough after flip completes
          setTimeout(() => {
            setShowStrikethrough(true);
          }, 100);
        }, 150);
      }, 150);
    }, 200);
  }, []);

  // Auto-cycle every 4 seconds
  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(cycleWord, 4000);
    return () => clearInterval(interval);
  }, [cycleWord, reduceMotion]);

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-8 text-center">
      {/* WebGL animated gradient background */}
      <WebGLGradientBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        {/* Profile photo — right side with soft wash */}
        <motion.div
          className="pointer-events-none absolute -right-6 top-1/2 hidden h-[50vh] w-[40vw] max-w-[400px] -translate-y-1/2 opacity-60 md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: 0.4, ease: EASE }}
        >
          <div
            className="relative h-full w-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 70%, transparent 100%)',
            }}
          >
            <Image
              src={contact.profileImage}
              alt={contact.name}
              fill
              priority
              className="object-cover object-center"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Availability pill */}
        <motion.div
          className="mb-4 flex items-center justify-center gap-3"
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

        {/* Title / Credentials */}
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.15, ease: EASE }}
        >
          <p 
            className="font-mono text-xs tracking-wide text-muted-foreground/80"
            style={{ fontFamily: "'Bitcount', var(--font-mono), monospace", fontWeight: 100 }}
          >
            <span className="text-foreground font-semibold">M.Sc. UX Designer</span>
            <span className="mx-2 text-muted-foreground/40">|</span>
            <span>3 years agency</span>
            <span className="mx-2 text-muted-foreground/40">|</span>
            <span>8 years freelance</span>
          </p>
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

        {/* Main Headline */}
        <motion.div
          className="mb-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.3, ease: EASE }}
        >
          <h1 
            className="text-[12vw] leading-[0.9] font-bold tracking-tighter text-foreground sm:text-[8vw] md:text-[7vw]"
            style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif' }}
          >
            <span className="block">Solving &amp;</span>
            <span className="block" style={{ perspective: '1000px' }}>
              <FlipWord3D 
                word={currentWord} 
                isFlipping={isFlipping}
                showStrikethrough={showStrikethrough}
              />
            </span>
            <span className="block text-primary">by design.</span>
          </h1>
        </motion.div>

        {/* Body copy */}
        <motion.div
          className="max-w-2xl"
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
