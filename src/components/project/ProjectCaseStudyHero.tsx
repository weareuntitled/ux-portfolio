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
  children?: React.ReactNode;
};

export function ProjectCaseStudyHero({ project, children }: ProjectCaseStudyHeroProps) {
  const heroSrc = project.coverUrl ?? project.moodImageUrl ?? null;
  const hasImage = Boolean(heroSrc);
  const roleLine = project.roleLine ?? (project.roles?.length ? project.roles.join(', ') : '—');
  const tags = project.tags?.slice(0, 5) ?? [];

  return (
    <FadeIn className="relative overflow-hidden rounded-3xl border border-border/50 shadow-sm">
      <div className="absolute inset-0 -z-10 min-h-[400px]">
        {hasImage ? (
          <>
            <Image
              src={heroSrc!}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
              quality={80}
            />
            {/* Ein sanfterer Overlay, damit Text auch auf hellen Bildern knallt */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted via-muted/90 to-muted/50" />
        )}
      </div>

      <div className="relative flex flex-col justify-end min-h-[400px] px-6 py-10 md:px-12 md:py-16">
        
        {/* Back Button (Mit mehr Abstand nach unten) */}
        <div className="mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-background"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            Back to projects
          </Link>
        </div>

        <div className="max-w-4xl space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border-border/50 bg-background/60 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md"
              >
                {tag}
              </Badge>
            ))}
            <Badge variant="outline" className="border-border/50 bg-background/60 font-mono text-xs text-muted-foreground backdrop-blur-md">
              {project.year}
            </Badge>
          </div>

          {/* Titel & Subtitel */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="max-w-2xl text-xl text-foreground/80 leading-relaxed md:text-2xl">
                {project.subtitle}
              </p>
            )}
          </div>

          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {project.oneLiner}
          </p>

          {/* Role & Button */}
          <div className="pt-4 flex flex-wrap items-center gap-8">
            <div>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Role
              </div>
              <div className="font-medium text-foreground">{roleLine}</div>
            </div>
            <ProjectPrototypeButton project={project} />
          </div>
        </div>

        {/* Die neuen Impact Cards (werden hier nahtlos eingebunden) */}
        {children && (
          <div className="mt-16 w-full pt-8">
            {children}
          </div>
        )}
      </div>
    </FadeIn>
  );
}