'use client';

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
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {cards.map((card, idx) => (
        <div
          key={`${card.label}-${idx}`}
          className="flex flex-col justify-center gap-2 rounded-2xl border border-border/40 bg-background/40 p-5 shadow-sm backdrop-blur-md transition-colors hover:bg-background/60"
        >
          <span className="text-xl md:text-2xl font-mono font-bold text-primary leading-tight">
            {card.value}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {card.label}
          </span>
        </div>
      ))}
    </div>
  );
}