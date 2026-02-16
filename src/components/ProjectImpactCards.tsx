'use client';

import { Card } from '@/components/ui/card';
import type { ProjectImpactItem } from '@/content/projects';

type Props = { impact: ProjectImpactItem[] };

export function ProjectImpactCards({ impact }: Props) {
  if (!impact.length) return null;
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold text-foreground">Impact</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {impact.map((item) => (
          <Card
            key={item.label}
            className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <p className="text-2xl font-bold tabular-nums tracking-tight text-foreground sm:text-3xl">
              {item.value}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {item.label}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
