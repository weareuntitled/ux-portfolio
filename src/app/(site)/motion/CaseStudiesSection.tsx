'use client';

import React, { useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Lock, ArrowRight, PlayCircle } from 'lucide-react';

import { fadeUpVariant, staggerVariant, VP, STAGGER } from '@/lib/motion';
import { MOTION_PROJECTS, type MotionProject } from '@/content/motion-projects';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

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
  const [imageError, setImageError] = useState(false);
  const [currentThumbnail, setCurrentThumbnail] = useState(0);
  
  const handleEnter = useCallback(() => ref.current?.play().catch(() => {}), []);
  const handleLeave = useCallback(() => {
    if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
  }, []);
  const handleMetadata = useCallback(() => {
    if (ref.current && ref.current.duration > 0) {
      ref.current.currentTime = 0.1;
    }
  }, []);

  // YouTube thumbnail fallbacks
  const thumbnailOptions = youtubeThumb ? [
    `https://img.youtube.com/vi/${youtubeThumb}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${youtubeThumb}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${youtubeThumb}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${youtubeThumb}/default.jpg`,
  ] : [];
  
  const handleImageError = useCallback(() => {
    if (currentThumbnail < thumbnailOptions.length - 1) {
      setCurrentThumbnail(prev => prev + 1);
    } else {
      setImageError(true);
    }
  }, [currentThumbnail, thumbnailOptions.length]);
  
  const handleImageLoad = useCallback(() => {
    setImageError(false);
  }, []);

  return (
    <motion.div variants={fadeUpVariant(0)}>
      <Link
        href={`/motion/${slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-background/40 backdrop-blur-2xl transition-transform duration-400 ease-card-hover hover:translate-y-[-4px] hover:scale-[1.01] hover:shadow-[0_20px_40px_hsl(var(--shadow-color)/0.15)]"
      >
        {/* Thumbnail */}
        <div
          className="relative aspect-video w-full overflow-hidden bg-muted/40"
          onMouseEnter={video ? handleEnter : undefined}
          onMouseLeave={video ? handleLeave : undefined}
        >
          {youtubeThumb ? (
            <>
              {!imageError && thumbnailOptions[currentThumbnail] ? (
                <Image
                  src={thumbnailOptions[currentThumbnail]}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  unoptimized={shouldUnoptimizeImage(thumbnailOptions[currentThumbnail])}
                />
              ) : (
                // Fallback when all YouTube thumbnails fail
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted/60 to-muted/80">
                  <div className="text-center">
                    <PlayCircle className="mx-auto h-8 w-8 text-muted-foreground/60" />
                    <p className="mt-1 text-xs text-muted-foreground/80">Video</p>
                  </div>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
            </>
          ) : (
            <video
              ref={ref}
              src={video}
              preload="metadata"
              muted
              loop
              playsInline
              onLoadedMetadata={handleMetadata}
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
      <motion.div variants={fadeUpVariant(0)} initial="hidden" whileInView="show" viewport={VP} className="mb-12 space-y-1">
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
