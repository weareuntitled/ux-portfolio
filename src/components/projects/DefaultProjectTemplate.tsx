'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR, VP } from '@/lib/motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { BrandLogoMark } from '@/components/brand/BrandLogoMark';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import DashboardCV from '@/components/DashboardCV';
import { ScrollLockGallery, type ScrollLockSlide } from '@/components/ui/ScrollLockGallery';
import { getProjectCoverImage, getAdjacentProjects } from '@/content/portfolio';
import { KontrastPostsBento } from '@/components/kontrast/KontrastPostsBento';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

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
  category?: string;
  impactCards?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  prototypeButtonLabel?: string;
  processDiagramUrl?: string | null;
  processDiagramLabel?: string;
};

// ---------------------------------------------------------------------------
// Main template
// ---------------------------------------------------------------------------
export default function DefaultProjectTemplate({ project }: { project: DefaultProject }) {
  const heroCover = getProjectCoverImage(project);
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
        {/* ── Hero: full-bleed image, title overlaid at bottom ─────────── */}
        <motion.section
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.lg, ease: EASE }}
          className="relative -mx-4 -mt-4 overflow-hidden md:-mx-8 md:-mt-8"
          style={{ minHeight: '60vh', maxHeight: '80vh' }}
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

          {/* Breadcrumbs overlay — top-left */}
          <div className="absolute top-20 left-6 md:left-10 z-10 rounded-lg border border-white/5 bg-background/80 px-3 py-2 backdrop-blur-md">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Title overlay — bottom-left */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-10 md:pb-10">
            {project.slug === 'kontrast-festival' ? (
              <div className="mb-3">
                <BrandLogoMark id="kontrastFestival" label="Kontrast Festival wordmark" size={140} className="h-10 w-auto max-w-[180px] brightness-0 invert" />
              </div>
            ) : (
              <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-foreground/60">
                {project.category || 'Project'}
              </p>
            )}
            <h1 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="mt-2 max-w-2xl text-base leading-snug text-foreground/70">{project.subtitle}</p>
            )}
          </div>
        </motion.section>

        {/* ── Meta strip: full-width horizontal band ─────────────────── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.md, ease: EASE, delay: 0.1 }}
          className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-white/5 py-6"
        >
          {project.year && (
            <div>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Year</span>
              <p className="text-sm font-medium text-foreground">{project.year}</p>
            </div>
          )}
          {project.client && (
            <>
              <span className="text-white/20">·</span>
              <div>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Client</span>
                <p className="text-sm font-medium text-foreground">{project.client}</p>
              </div>
            </>
          )}
          {project.roles?.length ? (
            <>
              <span className="text-white/20">·</span>
              <div>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">Role</span>
                <p className="text-sm font-medium text-foreground">{project.roles.join(' · ')}</p>
              </div>
            </>
          ) : null}
          {project.tags?.length ? (
            <>
              <span className="text-white/20">·</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>
                ))}
              </div>
            </>
          ) : null}
        </motion.div>

        {/* ── Narrative: centered single column ───────────────────────── */}
        <motion.article
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.md, ease: EASE, delay: 0.14 }}
          className="mx-auto mt-16 max-w-3xl space-y-16"
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

          {/* Impact numbers */}
          {project.impactCards?.length ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: DUR.md, ease: EASE }}
              className="border-y border-white/5 py-12"
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
                    <span className="text-6xl font-light tracking-[-0.04em] text-primary md:text-7xl">{card.value}</span>
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

        </motion.article>

        {/* ── Kontrast social archive ──────────────────────────────────── */}
        {project.slug === 'kontrast-festival' && (
          <div className="mt-16">
            <KontrastPostsBento />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
          GALLERY SECTION — WARNING: Do NOT simplify/remove the inner
          ScrollLockGallery component. It is the ONLY content that renders
          the gallery images. Removing it leaves only the header visible.
          If you need to debug, check galleryThumbs.length > 0 is truthy first.
        ═══════════════════════════════════════════════════════════════════ */}
        {galleryThumbs.length > 0 && (
          <section className="-mx-4 mt-20 bg-muted/10 px-4 py-14 md:-mx-8 md:px-8 md:py-16">
            {/* Header */}
            <div className="mx-auto max-w-7xl mb-8 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-primary">Gallery</p>
                <h2 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-foreground">Selected Screens</h2>
              </div>
            </div>
            {/* Gallery Content - REQUIRED for images to render */}
            <div className="min-h-[400vh]">
              <ScrollLockGallery
                slides={galleryThumbs.map((src, i): ScrollLockSlide => ({
                  src,
                  label: `${project.title} — Screen ${i + 1}`,
                }))}
              />
            </div>
          </section>
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
            <div className="overflow-hidden">
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
            <div className="relative aspect-video w-full overflow-hidden">
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
            className="mt-16 flex items-start justify-between border-t border-white/5 pt-8"
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

      </DashboardCV>
  );
}
