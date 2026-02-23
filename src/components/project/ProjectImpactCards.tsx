'use client';

/**
 * Unified impact cards block: 4-card metric grid used on every project page.
 * Data comes from project.impactCards (single source: portfolio or CMS).
 * Replaces automation hardcoded block, FfpHeroStats, CaesarHeroStats, and hero ProjectMetaCards for impact.
 */

import { cn } from '@/lib/utils';

export type ImpactCard = { label: string; value: string };

export function ProjectImpactCards({
  cards,
  className,
}: {
  cards: ImpactCard[];
  className?: string;
}) {
  if (!cards?.length) return null;

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {cards.map((card, idx) => (
        <div
          key={`${card.label}-${idx}`}
          className="rounded-xl border border-border bg-card p-6 shadow-lg"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {card.label}
          </p>
          <p className="mt-2 text-2xl font-mono font-bold tracking-tight text-primary">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
