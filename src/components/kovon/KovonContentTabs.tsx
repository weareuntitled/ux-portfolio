'use client';

import {
  ListOrdered,
  FileText,
  Activity,
  UserCheck,
  Copy,
  type LucideIcon,
} from 'lucide-react';

const INSIGHTS: Array<{
  id: string;
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
}> = [
  {
    id: 'update-algorithm',
    title: 'Insights via Update Algorithm',
    description: (
      <>
        Legal updates used to be a black box. We engineered a &quot;White
        Matching&quot; algorithm that ingests new PDF regulations and exposes
        exactly which paragraphs changed, translating dense legal text into
        actionable data.
      </>
    ),
    icon: ListOrdered,
  },
  {
    id: 'work-deltas',
    title: 'Work Deltas',
    description: (
      <>
        Engineers no longer re-evaluate the entire vehicle. They only assess
        the specific <em>delta</em> (the gap) between the old regulation and
        the new one, immediately saving thousands of hours.
      </>
    ),
    icon: FileText,
  },
  {
    id: 'live-status',
    title: 'Live Status Transparency',
    description: (
      <>
        Replaced scattered spreadsheets with a single
        &quot;Gesamtzusammenschau.&quot; Management can instantly see if a
        vehicle is audit-ready based on real-time evidence uploads.
      </>
    ),
    icon: Activity,
  },
  {
    id: 'responsibilities',
    title: 'Clear Responsibilities',
    description: (
      <>
        Implemented a strict Role-Based Access model. Tasks are routed via 1:1
        assignment or bulk System responsibility, ensuring every legal
        requirement has a clear, accountable owner.
      </>
    ),
    icon: UserCheck,
  },
  {
    id: 'multiplicable',
    title: 'Multiplicable Process',
    description: (
      <>
        Every solved problem becomes a template. When starting the next vehicle
        project, teams clone the setup. Previously approved parts inherit their
        status automatically, creating a compound effect of saved time year
        over year.
      </>
    ),
    icon: Copy,
  },
];

export function KovonContentTabs() {
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
        {INSIGHTS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
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
