'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import type { ResolvedProject } from '@/lib/cms/types';
import { Badge } from '@/components/ui/badge';
import { ProjectPrototypeButton } from '@/components/ProjectPrototypeButton';
import { FadeIn } from '@/components/motion';

type ProjectCaseStudyHeroProps = {
  project: ResolvedProject;
  /** Optional slot for stats or meta cards (e.g. ProjectMetaCards, FfpHeroStats). */
  children?: React.ReactNode;
};

export function ProjectCaseStudyHero({ project, children }: ProjectCaseStudyHeroProps) {
  const heroSrc = project.coverUrl ?? project.moodImageUrl ?? null;
  const hasImage = Boolean(heroSrc);
  const roleLine = project.roleLine ?? (project.roles?.length ? project.roles.join(', ') : '—');
  const tags = project.tags?.slice(0, 5) ?? [];

  return (
    <FadeIn className="relative space-y-6 overflow-hidden rounded-xl">
      <div className="absolute inset-0 -z-10 min-h-[280px]">
        {hasImage ? (
          <Image
            src={heroSrc!}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
            quality={80}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted via-muted/90 to-muted/70" />
        )}
      </div>
      <div
        className={
          'relative min-h-[280px] space-y-8 rounded-xl px-6 py-8 md:px-8 md:py-10' +
          (hasImage ? ' bg-background/80 bg-clip-padding' : '')
        }
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="border-border bg-muted/50 font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
          <Badge variant="outline" className="border-border font-mono text-xs text-muted-foreground">
            {project.year}
          </Badge>
        </div>
        <h1 className="pt-1 text-4xl font-bold tracking-tighter text-foreground md:pt-2 md:text-6xl">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="max-w-2xl pt-1 text-lg leading-relaxed text-muted-foreground">{project.subtitle}</p>
        )}
        <p className="max-w-2xl pt-1 text-xl leading-relaxed text-muted-foreground">{project.oneLiner}</p>
        <div className="flex flex-wrap items-start gap-x-8 gap-y-4 pt-2">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Role
            </div>
            <div className="font-medium text-foreground">{roleLine}</div>
          </div>
          <ProjectPrototypeButton project={project} />
        </div>
        {children}
      </div>
    </FadeIn>
  );
}
