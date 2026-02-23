'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { BarChart3, ImageIcon, Search, ShieldCheck, Star, Zap } from 'lucide-react';
import type { ResolvedProject } from '@/lib/cms/types';
import { Badge } from '@/components/ui/badge';
import { ProjectQuickViewDialog } from './ProjectQuickViewDialog';
import { cn } from '@/lib/utils';

const featuredSlugs = ['kovon', 'ffp-dashboard'] as const;

const slugToIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  kovon: ShieldCheck,
  'emission-compliance': BarChart3,
  automation: Zap,
  'ffp-dashboard': Search,
};

type ProjectCardProps = {
  project: ResolvedProject;
  displayTitle?: string;
};

export function ProjectCard({ project, displayTitle }: ProjectCardProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const liveDemoLink = project.links?.find((link) => link.label === 'Live demo');
  const coverUrl = project.cardCoverUrl ?? project.coverUrl ?? project.moodImageUrl ?? null;

  const displayTags = (project.tags ?? []).slice(0, 3);
  const title = displayTitle ?? project.title;
  const roleLine = project.roles?.length ? project.roles.join(', ') : '—';

  const outcomeLine = project.impact?.[0]
    ? `${project.impact[0].value}: ${project.impact[0].label}`
    : (() => {
        const o = project.outcomes?.[0];
        if (!o) return null;
        return o.length > 90 ? `${o.slice(0, 90).replace(/\s+\S*$/, '')}…` : o;
      })();

  const PlaceholderIcon = slugToIcon[project.slug] ?? ImageIcon;

  const initials =
    project.coverFallback === 'initials' && title
      ? title
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || title.slice(0, 2).toUpperCase()
      : null;

  const projectHref = `/projects/${project.slug}`;

  const handleTryPrototype = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!liveDemoLink?.href) return;
    if (liveDemoLink.href.startsWith('http')) {
      window.open(liveDemoLink.href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(liveDemoLink.href);
    }
  };

  const isFeatured = featuredSlugs.includes(project.slug as (typeof featuredSlugs)[number]);

  return (
    <Link
      href={projectHref}
      className={cn(
        'group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      )}
    >
      <motion.article
        className={cn(
          'flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm',
          'transition-shadow hover:shadow-md'
        )}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={reduceMotion ? undefined : { duration: 0.18 }}
      >
        {/* Cover */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {coverUrl ? (
            <>
              <motion.div
                className="absolute inset-0"
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                transition={reduceMotion ? undefined : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={coverUrl}
                  alt={`${title} cover`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
                  loading="lazy"
                  quality={75}
                  decoding="async"
                />
              </motion.div>

              {/* subtle overlay for consistency */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
            </>
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted via-muted/90 to-muted/70"
              aria-hidden
            >
              {initials ? (
                <span className="text-2xl font-bold tracking-tighter text-muted-foreground/60">
                  {initials}
                </span>
              ) : (
                <PlaceholderIcon className="h-11 w-11 text-muted-foreground/45" />
              )}
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
                {project.category ?? 'Project'}
              </span>
            </div>
          )}

          {/* Featured badge pinned to cover for visual consistency */}
          {isFeatured && (
            <div className="absolute left-3 top-3">
              <Badge variant="secondary" className="gap-1 text-[10px] font-medium">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          {/* Meta row */}
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {(project.category ?? 'Project')}{project.year ? ` · ${project.year}` : ''}
            </p>

            {/* quick actions only on desktop, consistent placement */}
            <div className="hidden sm:block" onClick={(e) => e.stopPropagation()}>
              <ProjectQuickViewDialog
                project={project}
                triggerLabel={`Open quick actions for ${project.title}`}
                iconOnly
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold leading-snug text-foreground sm:text-xl line-clamp-2">
            {title}
          </h3>

          {/* Role */}
          <p className="text-xs text-muted-foreground line-clamp-1">
            Role: {roleLine}
          </p>

          {/* One-liner */}
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.oneLiner}
          </p>

          {/* Outcome line (optional), keep it tight */}
          {outcomeLine && (
            <p className="text-xs text-muted-foreground/90 line-clamp-2">
              {outcomeLine}
            </p>
          )}

          {/* Tags */}
          {displayTags.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-1">
              {displayTags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-muted px-2 py-1 text-[11px] leading-none text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {/* Actions: stacked on mobile, inline on desktop */}
          <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
            {/* Visual CTA, card is already the link */}
            <span className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground sm:w-auto">
              Case study
            </span>

            {liveDemoLink?.href && (
              <button
                type="button"
                onClick={handleTryPrototype}
                className="h-10 w-full rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
              >
                Try prototype
              </button>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}