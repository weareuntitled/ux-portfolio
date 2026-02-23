'use client';

import {
  ListOrdered,
  FileText,
  Activity,
  UserCheck,
  Copy,
  Layout,
  Layers,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { getKovonConfig } from '@/content/portfolio';

const iconMap: Record<string, LucideIcon> = {
  Layout,
  FileText,
  Layers,
  Users,
  ListOrdered,
  Activity,
  UserCheck,
  Copy,
};

export function KovonContentTabs() {
  const config = getKovonConfig();
  const tabs = config?.contentTabs ?? [];
  if (tabs.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-4xl space-y-8 py-12">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Core Insights & Solutions
        </h2>
        <p className="text-muted-foreground">
          How we turned compliance from a manual bottleneck into a scalable
          engine.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {tabs.map((tab) => {
          const Icon = iconMap[tab.icon] ?? FileText;
          return (
            <div
              key={tab.id}
              className="group flex flex-col items-start gap-6 rounded-2xl border border-border bg-muted/10 p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-[0_8px_30px_-15px_rgba(var(--primary),0.2)] sm:flex-row"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_-5px_rgba(var(--primary),0.4)]">
                <Icon
                  className="h-6 w-6 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {tab.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {tab.body}
                </p>
                {tab.outcomeBullets?.length > 0 && (
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {tab.outcomeBullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
