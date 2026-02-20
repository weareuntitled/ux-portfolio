'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { aboutHeading, aboutStats, experienceLine } from '@/content/home';
import { CareerAreaChart, CelonisSkillsPresentation } from '@/components/HomeCharts';
import { Button } from '@/components/ui/button';

function ChartFallback() {
  return (
    <div className="h-[280px] w-full animate-pulse rounded-lg bg-muted/50" aria-hidden />
  );
}

export function AboutStatsSection() {
  return (
    <section className="space-y-10 rounded-2xl border border-border bg-card p-8 md:p-12">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {aboutHeading}
            </h2>
            <p className="mt-4 text-muted-foreground" style={{ lineHeight: 1.6 }}>
              {experienceLine}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {aboutStats.map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-2xl font-bold tabular-nums text-foreground md:text-3xl">{value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/cv">View full CV</Link>
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          <Suspense fallback={<ChartFallback />}>
            <CareerAreaChart />
          </Suspense>
        </div>
      </div>
      <div className="border-t border-border pt-10">
        <Suspense fallback={<ChartFallback />}>
          <CelonisSkillsPresentation />
        </Suspense>
      </div>
    </section>
  );
}
