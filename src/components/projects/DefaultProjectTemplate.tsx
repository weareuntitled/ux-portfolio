'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Wrench, Sparkles, Target } from 'lucide-react';

import DashboardCV from '@/components/DashboardCV';

type DefaultProject = {
  slug: string;
  title: string;
  subtitle?: string;
  oneLiner?: string;
  year?: string;
  client?: string;
  roles?: string[];
  teamSize?: string;
  problem?: string;
  solution?: string;
  outcomes?: string[];
  impactCards?: { label: string; value: string }[];
  links?: { label: 'Live demo' | 'Case study' | 'GitHub'; href: string }[];
  prototypeButtonLabel?: string;
  galleryUrls?: string[];
  moodImageUrl?: string | null;
  category?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

function isGif(url: string) {
  return url.toLowerCase().endsWith('.gif');
}

function GalleryGrid({ urls }: { urls: string[] }) {
  if (!urls?.length) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {urls.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: Math.min(i * 0.03, 0.25) }}
          className="relative overflow-hidden rounded-2xl border border-border bg-muted"
        >
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
        </motion.div>
      ))}
    </div>
  );
}

export default function DefaultProjectTemplate({ project }: { project: DefaultProject }) {
  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title, href: `/projects/${project.slug}` },
  ];

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  const rightRail = (
    <motion.aside
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="space-y-3 rounded-2xl border border-border bg-background/40 p-4 backdrop-blur-2xl"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Meta</p>

      {project.year ? <p className="text-sm text-muted-foreground">Year: {project.year}</p> : null}
      {project.client ? <p className="text-sm text-muted-foreground">Client: {project.client}</p> : null}
      {project.teamSize ? <p className="text-sm text-muted-foreground">Team: {project.teamSize}</p> : null}

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
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {project.category || 'Project'}
            </p>

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

        {(project.problem || project.solution || project.outcomes?.length) ? (
          <section className="grid gap-4 lg:grid-cols-3">
            {project.problem ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
                className="rounded-2xl border border-border bg-background/40 p-5 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Problem
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{project.problem}</p>
              </motion.div>
            ) : null}

            {project.solution ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
                className="rounded-2xl border border-border bg-background/40 p-5 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <Wrench className="h-4 w-4" />
                  Solution
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{project.solution}</p>
              </motion.div>
            ) : null}

            {project.outcomes?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.11 }}
                className="rounded-2xl border border-border bg-background/40 p-5 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  Outcomes
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {project.outcomes.map((o) => <li key={o}>{o}</li>)}
                </ul>
              </motion.div>
            ) : null}
          </section>
        ) : null}

        {project.impactCards?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            className="rounded-2xl border border-border bg-background/40 p-5 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Facts</h2>
              <span className="text-xs text-muted-foreground">Bento badges</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {project.impactCards.slice(0, 3).map((card) => (
                <div key={card.label} className="rounded-xl border border-border bg-background/60 p-4">
                  <p className="text-lg font-semibold tracking-tight">{card.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{card.label}</p>
                </div>
              ))}
            </div>
          </motion.section>
        ) : null}

        {project.links?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            className="flex flex-wrap gap-3"
          >
            {project.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background/50 px-4 text-sm font-medium hover:bg-background"
              >
                {link.label === 'Live demo' ? project.prototypeButtonLabel ?? 'Live demo' : link.label}
              </Link>
            ))}
          </motion.section>
        ) : null}

        {project.galleryUrls?.length ? (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Gallery</h2>
            </div>
            <GalleryGrid urls={project.galleryUrls} />
          </motion.section>
        ) : null}
      </div>
    </DashboardCV>
  );
}
