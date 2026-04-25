'use client';

import React, { useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import DashboardCV from '@/components/DashboardCV';
import { fadeUpVariant, staggerVariant, scaleInVariant, STAGGER } from '@/lib/motion';
import { MOTION_PROJECTS, type MotionProject } from '@/content/motion-projects';

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------

type Project = MotionProject;

const PROJECTS: Project[] = MOTION_PROJECTS;

// ---------------------------------------------------------------------------
// YouTubeFacade
// ---------------------------------------------------------------------------

function YouTubeFacade({ videoId }: { videoId: string }) {
  const [active, setActive] = useState(false);
  if (active) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube video"
      />
    );
  }
  return (
    <button
      className="group relative block h-full w-full overflow-hidden"
      onClick={() => setActive(true)}
      aria-label="Video abspielen"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/15" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-2xl ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110">
          <Play className="h-6 w-6 translate-x-0.5 fill-black text-black" />
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// ReelGrid
// ---------------------------------------------------------------------------

function ReelCard({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-muted ring-1 ring-border/60 transition-all duration-300 hover:ring-primary/50"
      style={{ aspectRatio: '9/16' }}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
    >
      <video ref={ref} src={src} preload="none" muted loop playsInline className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          <Play className="h-3.5 w-3.5 translate-x-0.5 fill-white text-white" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VideoBlock
// ---------------------------------------------------------------------------

function VideoBlock({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-muted"
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
      }}
    >
      <video ref={ref} src={src} preload="none" muted loop playsInline className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-500 group-hover:opacity-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          <Play className="h-4 w-4 translate-x-0.5 fill-white text-white" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MotionProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Motion', href: '/motion' },
    { label: project.title, href: `/motion/${project.slug}` },
  ];

  return (
    <DashboardCV variant="default" breadcrumbs={breadcrumbs} pageTitle={project.title} showSearch={false}>
      <div className="space-y-12 pb-24">

        {/* Back link */}
        <motion.div variants={fadeUpVariant(0)} initial="hidden" animate="show">
          <Link href="/motion" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            Zurück zu Motion
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          variants={staggerVariant(STAGGER.md)}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <motion.div variants={fadeUpVariant(0)} className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">{project.label}</span>
            {project.year && (
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted-foreground">{project.year}</span>
            )}
            {project.nda && (
              <span className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
                <Lock className="h-3 w-3" /> NDA
              </span>
            )}
          </motion.div>
          <motion.h1 variants={fadeUpVariant(0.05)} className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {project.title}
          </motion.h1>
          <motion.p variants={fadeUpVariant(0.1)} className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.body}
          </motion.p>
          <motion.div variants={fadeUpVariant(0.15)} className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Media */}
        <div className="space-y-8">
          {project.youtubeId && (
            <motion.div
              variants={scaleInVariant(0.1)}
              initial="hidden"
              animate="show"
              className="aspect-video w-full overflow-hidden rounded-2xl border border-border/50"
            >
              <YouTubeFacade videoId={project.youtubeId} />
            </motion.div>
          )}

          {project.videos && project.youtubeId && (
            <motion.div variants={fadeUpVariant(0.1)} initial="hidden" animate="show" className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80">Reels</span>
                <span className="h-px flex-1 bg-border/50" />
                <span className="text-[10px] tabular-nums text-muted-foreground">{project.videos.length} Videos</span>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {project.videos.map((src) => <ReelCard key={src} src={src} />)}
              </div>
            </motion.div>
          )}

          {project.videos && !project.youtubeId && (
            <motion.div
              variants={staggerVariant(STAGGER.md)}
              initial="hidden"
              animate="show"
              className="grid gap-4 sm:grid-cols-2"
            >
              {project.videos.map((src) => (
                <motion.div key={src} variants={scaleInVariant(0)}>
                  <VideoBlock src={src} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {project.video && !project.youtubeId && (
            <motion.div variants={scaleInVariant(0.1)} initial="hidden" animate="show">
              <VideoBlock src={project.video} />
            </motion.div>
          )}
        </div>

      </div>
    </DashboardCV>
  );
}

