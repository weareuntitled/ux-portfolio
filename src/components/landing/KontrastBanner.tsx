'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, ArrowUpRight, Users, Sparkles, Calendar } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';
import { getProjectBySlug, getProjectCoverImage } from '@/content/portfolio';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

const KONTRAST_YOUTUBE_ID = 'Ufrnt73JJDU';

export function KontrastBanner() {
  const reduceMotion = useReducedMotion();
  const kontrast = getProjectBySlug('kontrast-festival');
  const cover = kontrast ? getProjectCoverImage(kontrast) : null;

  if (!kontrast) return null;

  return (
    <section className="bg-muted/30 py-16 md:py-24">
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
              <span className="text-primary">Kontrast</span> Festival
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Co-founded a regional cultural festival and led visual identity, digital experience, and team operations. Grew it from zero to 3,000+ attendees over three editions.
            </p>

            {/* Quick stats */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-card/50 px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">3,000+ Attendees</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Over 3 editions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-card/50 px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">360° Brand Direction</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Digital + physical touchpoints</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-card/50 px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">2021 – 2024</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Three successful editions</p>
                </div>
              </div>
            </div>

            <Link
              href="/projects/kontrast-festival"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              View Case Study
              <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
            </Link>
          </motion.div>

          {/* Right: Visual with play button */}
          <motion.div
            className="relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-muted"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
          >
            {cover ? (
              <Image
                src={cover}
                alt="Kontrast Festival"
                fill
                quality={80}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={shouldUnoptimizeImage(cover)}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/20 to-muted" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Play button overlay */}
            <a
              href={`https://www.youtube.com/watch?v=${KONTRAST_YOUTUBE_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-white"
            >
              <Play className="h-6 w-6 fill-white text-white" />
            </a>

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Aftermovie
              </p>
              <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                Kontrast Festival
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
