'use client';

import type { LucideIcon } from 'lucide-react';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ResultImpactMetric = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** When true, uses primary border/bg/text (e.g. highlight card). */
  highlight?: boolean;
};

export type ResultImpactCardProps = {
  title: string;
  description: string;
  metrics: ResultImpactMetric[];
  /** Icon in the top-left box. Defaults to FileText. */
  icon?: LucideIcon;
};

export function ResultImpactCard({
  title,
  description,
  metrics,
  icon: Icon = FileText,
}: ResultImpactCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_40px_-15px_rgba(var(--primary),0.2)] sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 max-w-3xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-primary/10">
            <Icon
              className="h-7 w-7 text-primary"
              strokeWidth={1.5}
              aria-hidden
            />
          </div>
          <h3 className="cursor-help text-2xl font-bold tracking-tight text-foreground underline decoration-dotted decoration-muted-foreground/50 underline-offset-2 hover:decoration-primary/70 sm:text-3xl">
            {title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <div
        className={cn(
          'mt-10 grid gap-4',
          'grid-cols-1 sm:grid-cols-2',
          metrics.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-2'
        )}
      >
        {metrics.map((m, i) => {
          const IconMetric = m.icon;
          const isHighlight = m.highlight === true;
          return (
            <div
              key={i}
              className={cn(
                'flex flex-col gap-2 rounded-xl border p-6 transition-colors',
                isHighlight
                  ? 'border-primary/20 bg-primary/5 hover:bg-primary/10'
                  : 'border-border bg-muted/20 hover:bg-muted/40'
              )}
            >
              <IconMetric
                className={cn(
                  'mb-2 h-5 w-5',
                  isHighlight ? 'text-primary' : 'text-muted-foreground'
                )}
                strokeWidth={2}
                aria-hidden
              />
              <span
                className={cn(
                  'text-2xl font-mono font-bold',
                  isHighlight ? 'text-primary' : 'text-foreground'
                )}
              >
                {m.value}
              </span>
              <span
                className={cn(
                  'text-xs font-medium uppercase tracking-wider',
                  isHighlight ? 'text-primary/80' : 'text-muted-foreground'
                )}
              >
                {m.label}
              </span>
              <p
                className={cn(
                  'mt-1 text-[11px]',
                  isHighlight ? 'text-primary/60' : 'text-muted-foreground'
                )}
              >
                {m.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
