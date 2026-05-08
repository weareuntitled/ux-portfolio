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

/** Animated hand-drawn strikethrough line using SVG */
function HandDrawnStrikethrough({ 
  isVisible 
}: { 
  isVisible: boolean;
}) {
  return (
    <svg
      className="absolute left-0 top-1/2 pointer-events-none overflow-visible"
      style={{ 
        width: '100%', 
        height: '12px',
        transform: 'translateY(-40%)',
      }}
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
          fontWeight: 400,
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
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 md:px-8 pt-12 pb-8 text-center">
      {/* WebGL animated gradient background */}
      <WebGLGradientBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        {/* Profile photo — right side, full section height with soft wash + floating animation */}
        {/* Profile photo — pushed far right, very subtle */}
        <motion.div
          className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-[35vw] max-w-[440px] translate-x-1/4 md:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{
            opacity: 0.26,
            x: 0,
            y: [0, -8, 0, 4, 0],
          }}
          transition={{
            opacity: { duration: reduceMotion ? 0 : DUR.lg, delay: 0.4, ease: EASE },
            x: { duration: reduceMotion ? 0 : DUR.lg, delay: 0.4, ease: EASE },
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div
            className="relative h-full w-full"
            style={{
              maskImage:
                'radial-gradient(circle at center, black 0%, black 40%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(circle at center, black 0%, black 40%, transparent 100%)',
            }}
          >
            <Image
              src={contact.profileImage}
              alt={contact.name}
              fill
              priority
              className="object-cover object-top blur-[1px]"
              sizes="440px"
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
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-accent/10 px-4 py-2 backdrop-blur-md">
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

        {/* Main Headline */}
        <motion.div
          className="mb-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.3, ease: EASE }}
        >
          <h1 
            className="text-[12vw] leading-[0.9] font-bold tracking-[-0.04em] text-foreground sm:text-[8vw] md:text-[7vw]"
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
          className="max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.5, ease: EASE }}
        >
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            <span className="text-primary">Product Designer</span> with AI expertise. Designing interfaces, systems, and workflows for enterprise teams. <span className="text-primary">UX Designer</span> · <span className="text-primary">Certified Scrum Master</span> · <span className="text-primary">Motion</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
