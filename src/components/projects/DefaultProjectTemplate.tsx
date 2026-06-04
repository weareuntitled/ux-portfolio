'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR, STAGGER, VP } from '@/lib/motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  Sparkles,
  Zap,
  GitBranch,
  Layout,
  Server,
  Cloud,
  ClipboardList,
  Workflow,
  CreditCard,
  Calculator,
  Mic,
  Database,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

import { BrandLogoMark } from '@/components/brand/BrandLogoMark';
import DashboardCV from '@/components/DashboardCV';
import { AccountRequestBand } from '@/components/project/AccountRequestBand';
import { getProjectCoverImage, getAdjacentProjects } from '@/content/portfolio';
import { KontrastPostsBento } from '@/components/kontrast/KontrastPostsBento';
import { shouldUnoptimizeImage } from '@/lib/project-assets';
import { BeforeAfterSlider } from '@/components/PortfolioKit';
import type { CaseStudySections, ProcessStepItem, FeatureItemData, TechnicalSpecItem } from '@/content/portfolio.types';

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
  description?: string;
  prototypeIframeUrl?: string;
  tags?: string[];
  galleryUrls?: string[];
  moodImageUrl?: string | null;
  youtubeUrl?: string;
  category?: string;
  impactCards?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  prototypeButtonLabel?: string;
  processDiagramUrl?: string | null;
  processDiagramLabel?: string;
  ribbonLabel?: string;
  caseStudy?: CaseStudySections;
  portfolioKit?: {
    beforeAfter?: { oldImg: string; newImg: string };
    technicalSpecs?: TechnicalSpecItem[];
    processSteps?: ProcessStepItem[];
    featureItems?: FeatureItemData[];
    insightAuthor?: string;
  };
  ermAnimation?: {
    beforeCount: number;
    afterCount: number;
    label?: string;
  };
  timelineDonut?: {
    segments: { label: string; value: number; color: string }[];
  };
  outcomeHighlight?: { value: string; label: string; description: string; icon: string };
  accountRequestEndpoint?: string;
};

const processIconMap: Record<string, LucideIcon> = {
  ClipboardList,
  GitBranch,
  Sparkles,
  Workflow,
  Layout,
  Server,
  Cloud,
  Cpu,
  Database,
  Zap,
};

const featureIconMap: Record<string, LucideIcon> = {
  CreditCard,
  Calculator,
  Mic,
  Sparkles,
  Zap,
  Workflow,
};

// ---------------------------------------------------------------------------
// Lightbox gallery
// ---------------------------------------------------------------------------
function LightboxGallery({ urls, title }: { urls: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowLeft') setActiveIndex((p) => (p === null ? null : p > 0 ? p - 1 : urls.length - 1));
      if (e.key === 'ArrowRight') setActiveIndex((p) => (p === null ? null : p < urls.length - 1 ? p + 1 : 0));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [activeIndex, urls.length]);

  if (!urls?.length) return null;

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {urls.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={VP}
            transition={{ duration: DUR.md, ease: EASE, delay: Math.min(i * STAGGER.sm, 0.3) }}
            className="group relative overflow-hidden rounded-md bg-muted text-left transition-transform duration-500 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => setActiveIndex(i)}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={src}
                alt={`${title} screen ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                unoptimized={shouldUnoptimizeImage(src)}
              />
            </div>
          </motion.button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm">
          <button type="button" onClick={() => setActiveIndex(null)}
            className="absolute right-5 top-5 z-[101] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>
          {urls.length > 1 && (
            <>
              <button type="button"
                onClick={() => setActiveIndex(activeIndex > 0 ? activeIndex - 1 : urls.length - 1)}
                className="absolute left-4 top-1/2 z-[101] -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button type="button"
                onClick={() => setActiveIndex(activeIndex < urls.length - 1 ? activeIndex + 1 : 0)}
                className="absolute right-4 top-1/2 z-[101] -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}
          <div className="flex h-full w-full items-center justify-center p-6 md:p-12" onClick={() => setActiveIndex(null)}>
            <div className="relative h-[80vh] w-full max-w-7xl" onClick={(e) => e.stopPropagation()} role="presentation">
              <Image src={urls[activeIndex]} alt={`${title} screen ${activeIndex + 1}`} fill
                className="object-contain" sizes="100vw" quality={100} priority
                unoptimized={shouldUnoptimizeImage(urls[activeIndex])} />
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

// ---------------------------------------------------------------------------
// ERM Consolidation Animation (135 → 1)
// ---------------------------------------------------------------------------
function ErmConsolidation({ beforeCount, afterCount }: { beforeCount: number; afterCount: number }) {
  const reduce = useReducedMotion();
  const dots = Math.min(beforeCount, 60);

  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-background via-background to-muted/30 p-8 md:p-12">
      <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
        {/* BEFORE — scattered DBs */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">Before</p>
          <div className="relative h-48 overflow-hidden rounded-lg border border-destructive/30 bg-destructive/5 p-3">
            <div className="grid h-full grid-cols-8 gap-1.5">
              {Array.from({ length: dots }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VP}
                  transition={{ duration: 0.3, delay: i * 0.008, ease: EASE }}
                  className="aspect-square rounded-sm bg-destructive/40"
                />
              ))}
              {beforeCount > dots && (
                <div className="col-span-8 mt-1 text-center font-mono text-[10px] text-muted-foreground/60">
                  +{beforeCount - dots} more
                </div>
              )}
            </div>
            <div className="absolute right-2 top-2 rounded-full border border-destructive/40 bg-destructive/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-destructive">
              {beforeCount} DBs
            </div>
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: DUR.md, ease: EASE, delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="flex flex-col items-center gap-1 text-primary">
            <div className="font-mono text-[10px] uppercase tracking-widest">consolidate</div>
            <div className="text-2xl">→</div>
          </div>
        </motion.div>

        {/* AFTER — single ERM */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">After</p>
          <div className="relative flex h-48 items-center justify-center rounded-lg border border-primary/30 bg-primary/5 p-3">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
              className="grid h-32 w-32 place-items-center rounded-full border-2 border-primary/50 bg-primary/10"
            >
              <div className="text-center">
                <Database className="mx-auto h-6 w-6 text-primary" />
                <div className="mt-1 font-mono text-xs font-semibold text-primary">ERM</div>
              </div>
            </motion.div>
            <div className="absolute right-2 top-2 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">
              {afterCount} DB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline Donut (7-Tage Verteilung)
// ---------------------------------------------------------------------------
function TimelineDonut({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const reduce = useReducedMotion();
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const size = 220;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let offset = 0;
  const arcs = segments.map((s) => {
    const fraction = s.value / total;
    const dashArray = `${fraction * circumference} ${circumference}`;
    const dashOffset = -offset;
    offset += fraction * circumference;
    return { ...s, dashArray, dashOffset, fraction };
  });

  return (
    <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 md:grid-cols-2 md:items-center">
      <div className="flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />
          {arcs.map((a, i) => (
            <motion.circle
              key={a.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={a.color}
              strokeWidth={strokeWidth}
              strokeDasharray={a.dashArray}
              strokeDashoffset={a.dashOffset}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: i * 0.15, ease: EASE }}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute flex flex-col items-center" style={{ width: size }}>
          <div className="font-mono text-3xl font-semibold text-foreground">{total}</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">Tage</div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center justify-between gap-3 border-b border-border/40 pb-2 last:border-0">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: s.color }} />
              <span className="text-sm font-medium text-foreground">{s.label}</span>
            </div>
            <span className="font-mono text-sm tabular-nums text-muted-foreground">
              {s.value} Tag{s.value === 1 ? '' : 'e'} · {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main template
// ---------------------------------------------------------------------------
/**
 * Default project detail page template. Used by every project that does not
 * have a custom template (e.g. Kontrast, GSwin, Tracklistify). Renders:
 *   - Full-bleed hero (image, or empty-state strip when project is image-light)
 *   - AccountRequestBand slot for projects with accountRequestEndpoint
 *   - Meta + narrative grid
 *   - Impact cards, gallery, related projects
 * #schema:
 * {
 *   type: "component",
 *   args: "project: DefaultProject",
 *   returns: "JSX.Element",
 *   module: "DefaultProjectTemplate.tsx"
 * }
 */
export default function DefaultProjectTemplate({ project }: { project: DefaultProject }) {
  const heroCoverRaw = getProjectCoverImage(project);
  const useEmptyStateHero =
    !project.moodImageUrl &&
    !project.youtubeUrl &&
    !project.processDiagramUrl &&
    (project.galleryUrls?.length ?? 0) < 3;
  const heroCover = useEmptyStateHero ? null : heroCoverRaw;
  const galleryThumbs =
    project.galleryUrls?.filter((u) => {
      const low = u.toLowerCase();
      if (low.includes('_hero')) return false;
      if (project.processDiagramUrl && low.includes('gallery_08_process')) return false;
      return true;
    }) ?? [];

  const { prev, next } = getAdjacentProjects(project.slug);
  const reduce = useReducedMotion();

  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title, href: `/projects/${project.slug}` },
  ];

  return (
    <DashboardCV
      variant="project"
      breadcrumbs={breadcrumbs}
      pageTitle={project.title}
      showSearch={false}
    >
      <div>

        {/* ── Hero: full-bleed image, title overlaid at bottom ─────────── */}
        <motion.section
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.lg, ease: EASE }}
          className="relative -mx-4 -mt-4 overflow-hidden md:-mx-8 md:-mt-8"
          style={{ height: 'clamp(260px, 38vw, 480px)' }}
        >
          {heroCover ? (
            <Image
              src={heroCover}
              alt={`${project.title} hero`}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
              unoptimized={shouldUnoptimizeImage(heroCover)}
            />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}

          {/* Gradient: fade image into background at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          {/* Title overlay — bottom-left */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-10 md:pb-10">
            {project.slug === 'kontrast-festival' ? (
              <div className="mb-3">
                <BrandLogoMark id="kontrastFestival" label="Kontrast Festival wordmark" size={140} className="h-10 w-auto max-w-[180px] brightness-0 invert" />
              </div>
            ) : (
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {project.ribbonLabel && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
                    <Sparkles className="h-3 w-3" />
                    {project.ribbonLabel}
                  </span>
                )}
                <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/60">
                  {project.category || 'Project'}
                </p>
              </div>
            )}
            <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="mt-2 max-w-2xl text-base leading-snug text-foreground/70">{project.subtitle}</p>
            )}
          </div>
        </motion.section>

        {/* ── Empty-state hero strip — for image-light projects (e.g. SAP Automation).
            Promotes impactCards + outcomeHighlight as the visual anchor. ────── */}
        {useEmptyStateHero && project.outcomeHighlight && (
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.md, ease: EASE, delay: 0.08 }}
            className="mt-12 rounded-2xl border border-border/40 bg-card/50 px-8 py-10"
          >
            {project.outcomeHighlight && (
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-mono text-lg font-bold tracking-tight text-foreground">
                    {project.outcomeHighlight.value}
                  </span>
                  <span className="ml-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">
                    {project.outcomeHighlight.label}
                  </span>
                  <p className="text-sm text-muted-foreground">{project.outcomeHighlight.description}</p>
                </div>
              </div>
            )}
            {project.impactCards && project.impactCards.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-3">
                {project.impactCards.slice(0, 3).map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: DUR.md, ease: EASE, delay: 0.1 + i * 0.06 }}
                    className="flex flex-col"
                  >
                    <span className="text-4xl font-light tracking-tighter text-primary md:text-5xl">{card.value}</span>
                    <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/70">{card.label}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* ── Account Request Band — for projects with access-request flow ──
            e.g. Tracklistify. Slot anchors at #request-access so the home card
            chip can deep-link here. */}
        {project.accountRequestEndpoint && (
          <div id="request-access" className="mt-12 scroll-mt-24">
            <AccountRequestBand
              variant="full"
              endpoint={project.accountRequestEndpoint}
              coverUrl={getProjectCoverImage(project) ?? undefined}
              projectUrl={`/projects/${project.slug}`}
            />
          </div>
        )}

        {/* ── Main grid: meta left (3) + narrative right (9) ───────────── */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-20">

          {/* ── Meta column ────────────────────────────────────────────── */}
          <motion.aside
            initial={reduce ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: DUR.md, ease: EASE, delay: 0.1 }}
            className="flex flex-col gap-8 lg:col-span-3 lg:sticky lg:top-8 lg:self-start"
          >
            {project.year && (
              <div>
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Timeline</p>
                <p className="text-sm font-medium text-foreground">{project.year}</p>
              </div>
            )}
            {project.client && (
              <div>
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Client</p>
                <p className="text-sm font-medium text-foreground">{project.client}</p>
              </div>
            )}
            {project.roles?.length ? (
              <div>
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Role</p>
                <div className="space-y-0.5">
                  {project.roles.map((r) => (
                    <p key={r} className="text-sm font-medium text-foreground">{r}</p>
                  ))}
                </div>
              </div>
            ) : null}
            {project.tags?.length ? (
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            ) : null}
            {project.links?.length ? (
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Links</p>
                <div className="flex flex-col gap-2">
                  {project.links.map((link) => {
                    const external = /^https?:\/\//i.test(link.href);
                    const label = link.label === 'Live demo' ? project.prototypeButtonLabel ?? 'Live demo' : link.label;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-2 hover:underline"
                      >
                        {label}
                        {external && <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </motion.aside>

          {/* ── Narrative column ────────────────────────────────────────── */}
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.md, ease: EASE, delay: 0.14 }}
            className="space-y-16 lg:col-span-9"
          >

            {/* Description / oneLiner intro */}
            {(project.oneLiner || project.description) && (
              <div className="space-y-4">
                {project.oneLiner && (
                  <p className="text-lg font-light leading-relaxed text-muted-foreground">{project.oneLiner}</p>
                )}
                {project.description && project.description !== project.oneLiner && (
                  <p className="text-base leading-relaxed text-muted-foreground/80">{project.description}</p>
                )}
              </div>
            )}

            {/* Challenge / Problem */}
            {project.problem && (
              <div>
                <p className="mb-5 text-[10px] font-medium uppercase tracking-widest text-primary">The Challenge</p>
                <p className="text-base font-light leading-relaxed text-muted-foreground">{project.problem}</p>
              </div>
            )}

            {/* Impact numbers — inline, between challenge and solution */}
            {project.impactCards?.length ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: DUR.md, ease: EASE }}
                className="border-y border-border/40 py-10"
              >
                <div className="grid gap-10 sm:grid-cols-3">
                  {project.impactCards.slice(0, 3).map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VP}
                      transition={{ duration: DUR.md, ease: EASE, delay: i * 0.1 }}
                      className="flex flex-col"
                    >
                      <span className="text-5xl font-light tracking-tighter text-primary md:text-6xl">{card.value}</span>
                      <span className="mt-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/70">{card.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {/* Solution */}
            {project.solution && (
              <div>
                <p className="mb-5 text-[10px] font-medium uppercase tracking-widest text-primary">The Solution</p>
                <p className="text-base font-light leading-relaxed text-muted-foreground">{project.solution}</p>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes?.length ? (
              <div>
                <p className="mb-5 text-[10px] font-medium uppercase tracking-widest text-primary">Outcomes</p>
                <ul className="space-y-4">
                  {project.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <p className="text-base font-light leading-relaxed text-muted-foreground">{o}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* ── Case Study: Context, Constraints, Role, Approach (long-form) ── */}
            {project.caseStudy && (
              <div className="space-y-12 border-t border-border/40 pt-12">
                {project.caseStudy.contextWhyMattered && (
                  <div>
                    <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-primary">Context — Why It Mattered</p>
                    <p className="text-base font-light leading-relaxed text-muted-foreground">{project.caseStudy.contextWhyMattered}</p>
                  </div>
                )}
                {project.caseStudy.constraints && (
                  <div>
                    <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-primary">Constraints</p>
                    <p className="text-base font-light leading-relaxed text-muted-foreground">{project.caseStudy.constraints}</p>
                  </div>
                )}
                {project.caseStudy.myRole && (
                  <div>
                    <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-primary">My Role</p>
                    <p className="text-base font-light leading-relaxed text-muted-foreground">{project.caseStudy.myRole}</p>
                  </div>
                )}
                {project.caseStudy.approach && (
                  <div>
                    <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-primary">Approach &amp; Process</p>
                    <p className="text-base font-light leading-relaxed text-muted-foreground">{project.caseStudy.approach}</p>
                  </div>
                )}
              </div>
            )}

            {/* ── Before / After Slider ─────────────────────────────────── */}
            {project.portfolioKit?.beforeAfter && (
              <motion.section
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: DUR.md, ease: EASE }}
                className="border-t border-border/40 pt-12"
              >
                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-primary">Transformation</p>
                <h2 className="mb-6 text-xl font-semibold leading-tight tracking-tight text-foreground">Legacy ⇔ Modern</h2>
                <BeforeAfterSlider
                  oldImg={project.portfolioKit.beforeAfter.oldImg}
                  newImg={project.portfolioKit.beforeAfter.newImg}
                />
              </motion.section>
            )}

            {/* ── ERM Animation (Vorher/Nachher) ──────────────────────── */}
            {project.ermAnimation && (
              <motion.section
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: DUR.md, ease: EASE }}
                className="border-t border-border/40 pt-12"
              >
                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-primary">Data Architecture</p>
                <h2 className="mb-6 text-xl font-semibold leading-tight tracking-tight text-foreground">From {project.ermAnimation.beforeCount} isolated DBs to one clean ERM</h2>
                <ErmConsolidation
                  beforeCount={project.ermAnimation.beforeCount}
                  afterCount={project.ermAnimation.afterCount}
                />
              </motion.section>
            )}

            {/* ── Timeline Donut ──────────────────────────────────────── */}
            {project.timelineDonut && project.timelineDonut.segments.length > 0 && (
              <motion.section
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: DUR.md, ease: EASE }}
                className="border-t border-border/40 pt-12"
              >
                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-primary">Timeline</p>
                <h2 className="mb-6 text-xl font-semibold leading-tight tracking-tight text-foreground">7 Days, 4 Phases</h2>
                <TimelineDonut segments={project.timelineDonut.segments} />
              </motion.section>
            )}

            {/* ── What I Learned ──────────────────────────────────────── */}
            {project.caseStudy?.whatILearned && (
              <motion.section
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: DUR.md, ease: EASE }}
                className="border-t border-border/40 pt-12"
              >
                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-chart-4">What I Learned</p>
                <blockquote className="border-l-2 border-chart-4/80 pl-6 text-lg font-light italic leading-relaxed text-foreground/90">
                  {project.caseStudy.whatILearned}
                </blockquote>
                {project.caseStudy.insightAuthor && (
                  <p className="mt-3 text-sm text-muted-foreground/70">— {project.caseStudy.insightAuthor}</p>
                )}
              </motion.section>
            )}

          </motion.article>
        </div>

        {/* ── Process Steps (full-bleed band) ──────────────────────── */}
        {project.portfolioKit?.processSteps && project.portfolioKit.processSteps.length > 0 && (
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: DUR.md, ease: EASE }}
            className="-mx-4 mt-16 bg-muted/20 px-4 py-14 md:-mx-8 md:px-8 md:py-16"
          >
            <div className="mb-8">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-primary">Process</p>
              <h2 className="text-xl font-semibold leading-tight tracking-tight text-foreground">7-Day Workflow</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {project.portfolioKit.processSteps.map((step, i) => {
                const Icon = step.icon ? processIconMap[step.icon] ?? Sparkles : Sparkles;
                return (
                  <motion.div
                    key={step.number}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP}
                    transition={{ duration: DUR.md, ease: EASE, delay: i * 0.05 }}
                    className="relative flex flex-col gap-2 rounded-lg border border-border bg-background/40 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-primary">{step.number}</span>
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* ── Technical Specs ──────────────────────────────────────── */}
        {project.portfolioKit?.technicalSpecs && project.portfolioKit.technicalSpecs.length > 0 && (
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: DUR.md, ease: EASE }}
            className="mt-16"
          >
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-primary">Tech Stack</p>
            <h2 className="mb-6 text-xl font-semibold leading-tight tracking-tight text-foreground">Tools &amp; Infrastructure</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.portfolioKit.technicalSpecs.map((spec, i) => (
                <motion.div
                  key={spec.title}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: DUR.md, ease: EASE, delay: i * 0.04 }}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-primary">{spec.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{spec.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Feature Items (Roadmap) ─────────────────────────────── */}
        {project.portfolioKit?.featureItems && project.portfolioKit.featureItems.length > 0 && (
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: DUR.md, ease: EASE }}
            className="-mx-4 mt-16 bg-gradient-to-b from-muted/10 to-muted/30 px-4 py-14 md:-mx-8 md:px-8 md:py-16"
          >
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-primary">Roadmap</p>
                <h2 className="text-xl font-semibold leading-tight tracking-tight text-foreground">What&apos;s Next</h2>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline">Coming next</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {project.portfolioKit.featureItems.map((item, i) => {
                const Icon = featureIconMap[item.icon] ?? Sparkles;
                return (
                  <motion.div
                    key={item.title}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP}
                    transition={{ duration: DUR.md, ease: EASE, delay: i * 0.08 }}
                    className="flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="rounded-full border border-chart-4/30 bg-chart-4/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-chart-4">Coming next</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    {item.impact && (
                      <p className="mt-auto border-t border-border/40 pt-3 text-xs italic leading-relaxed text-primary/80">
                        ↳ {item.impact}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* ── Kontrast social archive ──────────────────────────────────── */}
        {project.slug === 'kontrast-festival' && (
          <div className="mt-16">
            <KontrastPostsBento />
          </div>
        )}

        {/* ── Gallery: full-bleed band ─────────────────────────────────── */}
        {galleryThumbs.length > 0 && (
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: DUR.md, ease: EASE }}
            className="-mx-4 mt-16 bg-muted/20 px-4 py-14 md:-mx-8 md:px-8 md:py-16"
          >
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-primary">Gallery</p>
                <h2 className="text-xl font-semibold leading-tight tracking-tight text-foreground">Selected Screens</h2>
              </div>
            </div>
            <LightboxGallery urls={galleryThumbs} title={project.title} />
          </motion.section>
        )}

        {/* ── Process diagram ──────────────────────────────────────────── */}
        {project.processDiagramUrl && (
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: DUR.md, ease: EASE }}
            className="mt-16"
          >
            <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
              {project.processDiagramLabel ?? 'Process architecture'}
            </p>
            <div className="overflow-hidden rounded-xl border border-border bg-muted/20 p-2">
              <Image
                src={project.processDiagramUrl}
                alt={project.processDiagramLabel ?? `${project.title} process`}
                width={2800}
                height={1600}
                className="mx-auto h-auto max-h-[min(78vh,1100px)] w-full object-contain"
                sizes="(max-width: 1200px) 100vw, 1100px"
                unoptimized={shouldUnoptimizeImage(project.processDiagramUrl)}
              />
            </div>
          </motion.section>
        )}

        {/* ── Prototype iframe ─────────────────────────────────────────── */}
        {project.prototypeIframeUrl && (
          <section className="mt-16">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Live prototype</p>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={project.prototypeIframeUrl}
                title={`${project.title} prototype`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </section>
        )}

        {/* ── Project navigation ───────────────────────────────────────── */}
        {(prev || next) && (
          <nav
            aria-label="Project navigation"
            className="mt-16 flex items-start justify-between border-t border-border pt-8"
          >
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group flex max-w-[45%] flex-col gap-1">
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </span>
                <span className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="group flex max-w-[45%] flex-col items-end gap-1 text-right">
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </nav>
        )}

      </div>
    </DashboardCV>
  );
}
