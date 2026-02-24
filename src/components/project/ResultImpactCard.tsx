'use client';

import * as React from 'react';
import Link from 'next/link';
import { ExternalLink, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ResultImpactMetric = {
  label: string;
  value: string;
  /** Short headline shown big. If omitted, `value` is used. */
  displayValue?: string;
  /** Supporting text shown small. */
  description?: string;
  icon?: LucideIcon;
  highlight?: boolean;
  /** Makes the headline larger. Use for the main deliverable tile. */
  primary?: boolean;
};

type Props = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  metrics: ResultImpactMetric[];

  /** Optional condensed lists under the metrics row */
  leftTitle?: string;
  rightTitle?: string;
  leftItems?: string[];
  rightItems?: string[];
  listMaxItems?: number;

  /** Optional doc link (PDD etc.) */
  document?: { label: string; href: string };

  className?: string;
};

export function ResultImpactCard({
  title,
  description,
  icon: HeaderIcon,
  metrics,
  leftTitle = 'Delivery and highlights',
  rightTitle = 'Impact and outcomes',
  leftItems,
  rightItems,
  listMaxItems = 3,
  document,
  className,
}: Props) {
  const hasLists = Boolean((leftItems && leftItems.length) || (rightItems && rightItems.length));
  const [showAll, setShowAll] = React.useState(false);

  const renderList = (items: string[] | undefined) => {
    const all = items ?? [];
    const visible = showAll ? all : all.slice(0, listMaxItems);
    return { all, visible };
  };

  const left = renderList(leftItems);
  const right = renderList(rightItems);

  return (
    <section className={cn('rounded-2xl border border-border bg-card/40 p-6', className)}>
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {HeaderIcon ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <HeaderIcon className="h-5 w-5" aria-hidden />
            </div>
          ) : null}

          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>

        {document?.href ? (
          <Link
            href={document.href}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {document.label}
            <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
          </Link>
        ) : null}
      </header>

      {/* Top metrics */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          const headline = (m.displayValue ?? m.value).trim();
          const desc = (m.description ?? '').trim();

          return (
            <div
              key={`${m.label}-${idx}`}
              className={cn(
                'rounded-xl border border-border bg-background/30 p-5',
                m.highlight && 'border-primary/30 bg-primary/5'
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
                {Icon ? <Icon className="h-4 w-4 text-muted-foreground/70" aria-hidden /> : null}
              </div>

              <p
                className={cn(
                  'mt-3 font-mono font-bold tracking-tight text-foreground',
                  m.primary ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
                  m.highlight && 'text-primary'
                )}
              >
                {headline}
              </p>

              {/* Only show description if it adds info (no duplicates) */}
              {desc && desc.toLowerCase() !== headline.toLowerCase() ? (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Condensed lists */}
      {hasLists ? (
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="min-w-0">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {leftTitle}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {left.visible.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" aria-hidden />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {rightTitle}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {right.visible.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" aria-hidden />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {(left.all.length > listMaxItems || right.all.length > listMaxItems) ? (
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="mt-2 text-xs font-medium text-primary hover:underline"
              >
                {showAll ? 'Show less' : `Show all (${Math.max(left.all.length, right.all.length)})`}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}