'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { contact, identityRolePrimary } from '@/content/home';

export function HeroSection() {
  const reduceMotion = useReducedMotion();

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

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
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

        {/* Main Headline */}
        <motion.div
          className="mb-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.3, ease: EASE }}
        >
          <h1 className="font-display text-[12vw] leading-[0.9] font-bold tracking-tighter text-foreground sm:text-[8vw] md:text-[7vw]">
            <span className="block">Solving &amp;</span>
            <span className="block">Simplifying</span>
            <span className="block">
              <span className="relative inline-block">
                <span className="italic text-muted-foreground line-through decoration-primary decoration-2">
                  complexity
                </span>
              </span>
            </span>
            <span className="block text-primary">by design.</span>
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
