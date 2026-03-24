'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Briefcase, Building2, Calendar, ChevronLeft, ChevronRight, ExternalLink, Film, Sparkles, X } from 'lucide-react';

import DashboardCV from '@/components/DashboardCV';
import { cn } from '@/lib/utils';

type MotionProject = {
  slug: string;
  title: string;
  subtitle?: string;
  oneLiner?: string;
  year?: string;
  client?: string;
  roles?: string[];
  description?: string;
  tags?: string[];
  galleryUrls?: string[];
  moodImageUrl?: string | null;
  category?: string;
  youtubeUrl?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

function toWatchUrl(youtubeUrl?: string) {
  if (!youtubeUrl) return null;
  if (youtubeUrl.includes('youtu.be/')) return youtubeUrl;
  if (youtubeUrl.includes('/embed/')) {
    const id = youtubeUrl.split('/embed/')[1]?.split('?')[0];
    if (id) return `https://youtu.be/${id}`;
  }
  return youtubeUrl;
}

function isGif(url: string) {
  return url.toLowerCase().endsWith('.gif');
}

function LightboxGallery({ urls, title }: { urls: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => {
          if (prev === null) return null;
          return prev > 0 ? prev - 1 : urls.length - 1;
        });
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => {
          if (prev === null) return null;
          return prev < urls.length - 1 ? prev + 1 : 0;
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, urls.length]);

  if (!urls?.length) return null;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {urls.map((src, i) => (
          <button
            key={src}
            type="button"
            className="group relative overflow-hidden rounded-2xl border border-border bg-muted text-left transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => setActiveIndex(i)}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={src}
                alt={`${title} visual ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                unoptimized={isGif(src)}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-5 top-5 z-[101] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          {urls.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActiveIndex(activeIndex > 0 ? activeIndex - 1 : urls.length - 1)}
                className="absolute left-4 top-1/2 z-[101] -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex(activeIndex < urls.length - 1 ? activeIndex + 1 : 0)}
                className="absolute right-4 top-1/2 z-[101] -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}
          <div className="flex h-full w-full items-center justify-center p-6 md:p-12" onClick={() => setActiveIndex(null)}>
            <div
              className="relative h-[80vh] w-full max-w-7xl"
              onClick={(e) => e.stopPropagation()}
              role="presentation"
            >
              <Image
                src={urls[activeIndex]}
                alt={`${title} expanded visual ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
                priority
                unoptimized={isGif(urls[activeIndex])}
              />
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-xs tracking-widest text-white">
            {activeIndex + 1} / {urls.length}
          </div>
        </div>
      )}
    </>
  );
}

export default function MotionProjectTemplate({ project }: { project: MotionProject }) {
  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title, href: `/projects/${project.slug}` },
  ];

  const watchUrl = useMemo(() => toWatchUrl(project.youtubeUrl), [project.youtubeUrl]);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const rightRail = (
    <motion.aside
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="space-y-3 rounded-2xl border border-border bg-background/40 p-4 backdrop-blur-2xl"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Meta</p>

      <div className="space-y-2 text-sm text-muted-foreground">
        {project.year ? (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{project.year}</span>
          </div>
        ) : null}

        {project.client ? (
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>{project.client}</span>
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          <Film className="h-4 w-4" />
          <span>Motion</span>
        </div>
      </div>

      {project.roles?.length ? (
        <div className="flex flex-wrap gap-2 pt-2">
          {project.roles.map((r) => (
            <span
              key={r}
              className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground"
            >
              <Briefcase className="mr-1 inline h-3 w-3" />
              {r}
            </span>
          ))}
        </div>
      ) : null}

      {project.tags?.length ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {watchUrl ? (
        <Link
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-2 text-sm',
            'hover:bg-background/80 transition-colors'
          )}
        >
          <ExternalLink className="h-4 w-4" />
          Watch on YouTube
        </Link>
      ) : null}
    </motion.aside>
  );

  return (
    <DashboardCV variant="project" breadcrumbs={breadcrumbs} pageTitle={project.title} showSearch={false} rightRail={rightRail}>
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative overflow-hidden rounded-2xl border border-border bg-background/40 p-6 backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
          </div>

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Motion</p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h1>

            {project.subtitle ? <p className="mt-2 text-base text-muted-foreground">{project.subtitle}</p> : null}
            {project.oneLiner ? <p className="mt-3 text-sm text-muted-foreground">{project.oneLiner}</p> : null}

            {project.moodImageUrl ? (
              <motion.div style={{ y: heroY }} className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-muted">
                <div className="relative aspect-[16/8] w-full">
                  <Image src={project.moodImageUrl} alt="" fill className="object-cover" sizes="100vw" />
                </div>
              </motion.div>
            ) : null}
          </div>
        </motion.section>

        {project.description ? (
          <section className="rounded-2xl border border-border bg-background/40 p-5 backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              Description
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </section>
        ) : null}

        {project.youtubeUrl ? (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            className="rounded-2xl border border-border bg-background/40 p-6 backdrop-blur-2xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Showreel</h2>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={project.youtubeUrl}
                  title={`${project.title} YouTube`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.section>
        ) : null}

        {project.galleryUrls?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Gallery</h2>
            <LightboxGallery urls={project.galleryUrls} title={project.title} />
          </motion.section>
        ) : null}
      </div>
    </DashboardCV>
  );
}