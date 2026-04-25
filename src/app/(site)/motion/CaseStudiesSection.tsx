'use client';

import React, { useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Lock, ArrowRight } from 'lucide-react';

import { fadeUpVariant, staggerVariant, VP, STAGGER } from '@/lib/motion';
import { MOTION_PROJECTS, type MotionProject } from '@/content/motion-projects';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ProjectCard {
  slug: string;
  label: string;
  title: string;
  description: string;
  video?: string;
  youtubeThumb?: string;
  nda?: boolean;
}

function toCard(p: MotionProject): ProjectCard {
  // NDA badge folds into the label so the card communicates restrictions before opening.
  const label = p.nda ? `${p.label} · NDA` : p.label;
  return {
    slug: p.slug,
    label,
    title: p.title,
    description: p.teaser,
    video: p.video ?? p.videos?.[0],
    youtubeThumb: p.youtubeId,
    nda: p.nda,
  };
}

const PROJECT_CARDS: ProjectCard[] = MOTION_PROJECTS.map(toCard);

// ---------------------------------------------------------------------------
// ProjectCard
// ---------------------------------------------------------------------------

function ProjectCard({ slug, label, title, description, video, youtubeThumb, nda }: ProjectCard) {
  const ref = useRef<HTMLVideoElement>(null);
  const handleEnter = useCallback(() => ref.current?.play().catch(() => {}), []);
  const handleLeave = useCallback(() => {
    if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
  }, []);

  return (
    <motion.div variants={fadeUpVariant(0)}>
      <Link
        href={`/motion/${slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/40 backdrop-blur-2xl transition-colors duration-300 hover:border-primary/30 hover:bg-background/60"
      >
        {/* Thumbnail */}
        <div
          className="relative aspect-video w-full overflow-hidden bg-muted/40"
          onMouseEnter={video ? handleEnter : undefined}
          onMouseLeave={video ? handleLeave : undefined}
        >
          {youtubeThumb ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${youtubeThumb}/maxresdefault.jpg`}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
            </>
          ) : (
            <video
              ref={ref}
              src={video}
              preload="none"
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          )}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-500 group-hover:opacity-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
              <Play className="h-4 w-4 translate-x-0.5 fill-white text-white" />
            </div>
          </div>
          {nda && (
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 backdrop-blur-sm">
              <Lock className="h-3 w-3 text-muted-foreground" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">NDA</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between gap-2 px-4 py-3">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
            <h3 className="mt-0.5 text-sm font-bold tracking-tight">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground/80">{description}</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 self-end text-muted-foreground transition-colors group-hover:text-foreground" />
        </div>
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// CaseStudiesSection
// ---------------------------------------------------------------------------

export default function CaseStudiesSection() {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUpVariant(0)} initial="hidden" whileInView="show" viewport={VP} className="space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/70">Case Studies</p>
        <h2 className="text-xl font-semibold tracking-tight">Ausgewählte Projekte</h2>
      </motion.div>

      <motion.div
        variants={staggerVariant(STAGGER.md)}
        initial="hidden"
        whileInView="show"
        viewport={VP}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECT_CARDS.map((p) => <ProjectCard key={p.slug} {...p} />)}
      </motion.div>
    </div>
  );
}
