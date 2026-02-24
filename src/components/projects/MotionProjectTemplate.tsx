'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Film, Calendar, Briefcase, Sparkles } from 'lucide-react';

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

function GalleryGrid({ urls }: { urls: string[] }) {
  if (!urls?.length) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {urls.map((src) => (
        <div key={src} className="relative overflow-hidden rounded-2xl border border-border bg-muted">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              unoptimized={isGif(src)}
            />
          </div>
        </div>
      ))}
    </div>
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
            <Briefcase className="h-4 w-4" />
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
              {r}
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
          Video auf YouTube ansehen
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
            <GalleryGrid urls={project.galleryUrls} />
          </motion.section>
        ) : null}
      </div>
    </DashboardCV>
  );
}