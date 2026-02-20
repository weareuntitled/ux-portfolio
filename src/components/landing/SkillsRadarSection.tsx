'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { skillsRadarProductData, skillsRadarWhatItMeans } from '@/content/home';

const SkillsRadarChart = dynamic(
  () =>
    import('@/components/SkillsRadarProductChart').then((m) => ({
      default: m.SkillsRadarProductChart,
    })),
  { ssr: false }
);

function ChartFallback() {
  return (
    <div className="mx-auto max-w-2xl h-[320px] animate-pulse rounded-lg bg-muted/50" aria-hidden />
  );
}

export function SkillsRadarSection() {
  const data = [...skillsRadarProductData];
  return (
    <section
      className="w-full overflow-hidden rounded-2xl border border-border bg-card px-4 py-8 md:px-8 md:py-12"
      aria-label="Skills"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Product focus
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground md:text-base">
          Spider net across Product Design, UX UI, Scrum, Automation, and Process Management.
        </p>
        <Suspense fallback={<ChartFallback />}>
          <SkillsRadarChart data={data} />
        </Suspense>
        <p className="mt-6 text-center text-sm font-medium text-foreground/90 md:text-base">
          {skillsRadarWhatItMeans}
        </p>
      </div>
    </section>
  );
}
