'use client';

import Link from 'next/link';
import type { ResolvedProject } from '@/lib/cms/types';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { getProjectDisplayTitle } from '@/content/home';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

type Props = { projects: ResolvedProject[] };

export function PortfolioSection({ projects }: Props) {
  const featured = projects.slice(0, 6);

  return (
    <section className="space-y-8">
      <FadeIn>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Featured projects
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enterprise tools for compliance, diagnostics, and automation.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">View all</Link>
          </Button>
        </div>
      </FadeIn>
      <StaggerContainer className="grid gap-6 sm:grid-cols-2">
        {featured.map((project) => (
          <StaggerItem key={project.slug}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
              <ProjectCard
                project={project}
                displayTitle={getProjectDisplayTitle(project.slug)}
              />
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
