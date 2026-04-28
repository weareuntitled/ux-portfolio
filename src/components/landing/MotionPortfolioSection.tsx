'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Film, Play, ExternalLink } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';

const MOTION_PORTFOLIO_URL = 'https://daniels-portfolio-b20cfa.webflow.io/';

const SHOWREELS = [
  {
    slug: '8020-portfolio',
    title: '8020 Showreel 2025',
    subtitle: 'Corporate',
    youtubeId: '7U_PO2WGqFw',
  },
  {
    slug: '3dprojects',
    title: '3D Design Reel',
    subtitle: 'Motion',
    youtubeId: 'K7JhmqWGiZw',
  },
];

function YouTubeCard({ youtubeId, title, subtitle }: { youtubeId: string; title: string; subtitle: string }) {
  const [active, setActive] = React.useState(false);
  const thumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl bg-black" style={{ aspectRatio: '16/9' }}>
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Image
            src={thumb}
            alt={title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <button
            onClick={() => setActive(true)}
            aria-label={`Play ${title}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-white md:h-16 md:w-16"
          >
            <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6 translate-x-0.5 md:h-7 md:w-7">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{subtitle}</p>
            <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">{title}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export function MotionPortfolioSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
          >

            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Also, I make things <span className="text-primary">move</span>.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              From corporate explainers to festival aftermovies — motion design, 3D animation, and video production for brands that need to stand out.
            </p>

            {/* Reel list */}
            <div className="mt-6 space-y-2">
              {SHOWREELS.map((reel) => (
                <div
                  key={reel.slug}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-card/50 px-4 py-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Play className="h-3.5 w-3.5 fill-primary text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{reel.title}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{reel.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={MOTION_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <Film className="h-4 w-4" />
              View Motion Portfolio
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </a>
          </motion.div>

          {/* Right: Showreel video cards */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
          >
            {SHOWREELS.map((reel) => (
              <YouTubeCard
                key={reel.slug}
                youtubeId={reel.youtubeId}
                title={reel.title}
                subtitle={reel.subtitle}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
