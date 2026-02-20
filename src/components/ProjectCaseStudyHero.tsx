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
  /** Optional slot for stats or extra hero content (e.g. FFP metrics grid, automation stats). */
  children?: React.ReactNode;
};

const FALLBACK_PLACEHOLDER =
  'https://placehold.co/1200x675/171717/404040?text=Project+Screenshot';

export function ProjectCaseStudyHero({ project, children }: ProjectCaseStudyHeroProps) {
  const role = project.roles?.[0] ?? '—';
  const tags = project.tags?.slice(0, 5) ?? [];
  const heroSrc = project.moodImageUrl ?? FALLBACK_PLACEHOLDER;
  const hasImage = Boolean(project.moodImageUrl);

  return (
    <FadeIn className="relative space-y-6 overflow-hidden rounded-xl">
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
          quality={80}
        />
      </div>
      <div
        className={
          'relative space-y-6 rounded-xl px-6 py-8 md:px-8 md:py-10' +
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
        <h1 className="text-5xl font-bold tracking-tighter text-foreground md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-muted-foreground">{project.oneLiner}</p>
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Role
            </div>
            <div className="font-medium text-foreground">{role}</div>
          </div>
          <ProjectPrototypeButton project={project} />
        </div>
        {children}
      </div>
    </FadeIn>
  );
}
