'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Film, Play, ExternalLink } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';

const MOTION_PORTFOLIO_URL = 'https://daniels-portfolio-b20cfa.webflow.io/';

const REELS = [
  { title: '8020 Showreel 2025', label: 'Corporate' },
  { title: '3D Design Reel', label: 'Motion' },
  { title: 'Kontrast Aftermovie', label: 'Festival' },
];

export function MotionPortfolioSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
              {'<!-- Motion Portfolio -->'}
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Also, I make things <span className="text-primary">move</span>.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              From corporate explainers to festival aftermovies — motion design, 3D animation, and video production for brands that need to stand out.
            </p>

            {/* Reel list */}
            <div className="mt-6 space-y-2">
              {REELS.map((reel) => (
                <div
                  key={reel.title}
                  className="flex items-center gap-3 rounded-lg border border-border/30 bg-card/50 px-4 py-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Play className="h-3.5 w-3.5 fill-primary text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{reel.title}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{reel.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={MOTION_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <Film className="h-4 w-4" />
              View Motion Portfolio
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </a>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            className="relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-muted"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-muted via-muted/90 to-background">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Film className="h-8 w-8 text-primary" />
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Motion & 3D Reel
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
