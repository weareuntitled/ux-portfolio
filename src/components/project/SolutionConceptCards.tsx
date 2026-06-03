'use client';

import type { LucideIcon } from 'lucide-react';

export type SolutionConceptItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Props = {
  title: string;
  subtitle: string;
  items: SolutionConceptItem[];
  className?: string;
};

/**
 * Process chart / "Designing the Solution" style: section with heading + subtitle
 * and a list of concept cards (icon box + title + description). Hover scale on icon, border glow.
 */
export function SolutionConceptCards({ title, subtitle, items, className = '' }: Props) {
  if (!items?.length) return null;

  return (
    <section className={`w-full space-y-8 py-8 ${className}`}>
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group flex flex-col items-start gap-6 rounded-2xl border border-border/40 bg-card/60 p-6 transition-all hover:border-primary/50 hover:bg-card/80 sm:flex-row"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card shadow-sm transition-all group-hover:scale-105 group-hover:border-primary/50">
                <Icon
                  className="h-6 w-6 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
