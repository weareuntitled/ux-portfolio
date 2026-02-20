'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BarChart3, ImageIcon, Search, ShieldCheck, Star, Zap } from 'lucide-react';
import type { ResolvedProject } from '@/lib/cms/types';
import { Badge } from '@/components/ui/badge';
import { ProjectQuickViewDialog } from './ProjectQuickViewDialog';

const featuredSlugs = ['kovon', 'ffp-dashboard'] as const;

const slugToIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  kovon: ShieldCheck,
  'emission-compliance': BarChart3,
  automation: Zap,
  'ffp-dashboard': Search,
};

type ProjectCardProps = {
  project: ResolvedProject;
  /** Optional display title (e.g. KoVoN, CAESAR) for featured home grid */
  displayTitle?: string;
};

export function ProjectCard({ project, displayTitle }: ProjectCardProps) {
  const router = useRouter();
  const liveDemoLink = project.links?.find((link) => link.label === 'Live demo');
  const coverUrl = project.moodImageUrl ?? null;
  const displayTags = project.tags.slice(0, 3);
  const title = displayTitle ?? project.title;
  const roleLine = project.roles?.length ? project.roles.join(', ') : '—';
  const outcomeLine = project.impact?.[0]
    ? `${project.impact[0].value}: ${project.impact[0].label}`
    : (() => {
        const o = project.outcomes?.[0];
        if (!o) return null;
        return o.length > 70 ? `${o.slice(0, 70).replace(/\s+\S*$/, '')}…` : o;
      })();
  const PlaceholderIcon = slugToIcon[project.slug] ?? ImageIcon;

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

  return (
    <Link
      href={projectHref}
      className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl"
    >
      <motion.article
        className="flex h-full cursor-pointer flex-col rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
      {/* Cover image slot — standardized aspect-video */}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-xl bg-muted">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            loading="lazy"
            quality={75}
            decoding="async"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted via-muted/90 to-muted/70"
            aria-hidden
          >
            <PlaceholderIcon className="h-12 w-12 text-muted-foreground/50" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
              {project.category}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {project.category} · {project.year}
            </p>
            {featuredSlugs.includes(project.slug as (typeof featuredSlugs)[number]) && (
              <Badge variant="secondary" className="gap-1 text-[10px] font-medium">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </Badge>
            )}
          </div>
          <div className="hidden sm:block" onClick={(e) => e.stopPropagation()}>
            <ProjectQuickViewDialog
              project={project}
              triggerLabel={`Open quick actions for ${project.title}`}
              iconOnly
            />
          </div>
        </div>
        <h3 className="mb-1 text-xl font-semibold text-foreground">{title}</h3>
        <p className="mb-2 text-xs text-muted-foreground">
          Role: {roleLine}
        </p>
        <p className={`flex-1 text-sm text-muted-foreground ${outcomeLine ? 'mb-2' : 'mb-4'}`}>
          {project.oneLiner}
        </p>
        {outcomeLine && (
          <p className="mb-4 text-xs text-muted-foreground/90">{outcomeLine}</p>
        )}
        <ul className="mb-4 flex flex-wrap gap-2">
          {displayTags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2">
          <span className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Case study
          </span>
          {liveDemoLink?.href && (
            <button
              type="button"
              onClick={handleTryPrototype}
              className="cursor-pointer rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
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
