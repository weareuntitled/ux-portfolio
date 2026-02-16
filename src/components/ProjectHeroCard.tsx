'use client';

import Image from 'next/image';
import type { ResolvedProject } from '@/lib/cms/types';

type Props = { project: ResolvedProject };

export function ProjectHeroCard({ project }: Props) {
  const moodUrl = project.moodImageUrl;
  return (
    <section className="relative overflow-hidden rounded-xl border border-border bg-card">
      {moodUrl && (
        <div className="absolute inset-0">
          <Image
            src={moodUrl}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}
      <div
        className={`relative z-10 p-6 ${moodUrl ? 'bg-background/60 backdrop-blur-sm' : ''}`}
      >
        <p className="text-sm text-muted-foreground">
          {project.category} · {project.year}
          {project.client ? ` · ${project.client}` : ''}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">{project.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{project.oneLiner}</p>
      </div>
    </section>
  );
}
