'use client';

import {
  LayoutGrid,
  Lightbulb,
  CalendarRange,
  ListChecks,
  BarChart3,
  ShieldCheck,
  Handshake,
  type LucideIcon,
} from 'lucide-react';

const SETUP_ROWS = [
  { label: 'Role', value: 'PO & Scrum Master' },
  { label: 'Cadence', value: '2-Week Sprints' },
  { label: 'Dailies', value: '2x per week' },
  { label: 'Team', value: '3–5 Devs + Req Mgr' },
  { label: 'Key Sync', value: 'Tech Lead Alignment', highlight: true },
] as const;

const PRODUCT_OWNERSHIP: Array<{
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
}> = [
  {
    id: 'strategic',
    title: 'Strategic Analysis',
    description:
      'Collaborative SWOT analysis to identify opportunities and facilitate decisions.',
    tags: ['SWOT', 'Market Fit'],
    icon: Lightbulb,
  },
  {
    id: 'milestones',
    title: 'Milestones',
    description:
      'Translating strategy into pilot phases, rollout steps, and roadmaps.',
    tags: ['Forecasting', 'Roadmap'],
    icon: CalendarRange,
  },
  {
    id: 'scope',
    title: 'Scope Definition',
    description:
      'Slicing complex compliance constraints into clear acceptance criteria.',
    tags: ['Slicing', 'Criteria'],
    icon: ListChecks,
  },
];

const SCRUM_MASTERY: Array<{
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
}> = [
  {
    id: 'capacity',
    title: 'Capacity & Flow',
    description:
      'Jira workflow optimization and capacity planning to match team velocity.',
    tags: ['Jira', 'Velocity'],
    icon: BarChart3,
  },
  {
    id: 'risk',
    title: 'Risk Management',
    description:
      'Defining validation goals early to minimize risks and ensure audit trails.',
    tags: ['Mitigation', 'Audit'],
    icon: ShieldCheck,
  },
  {
    id: 'stakeholder',
    title: 'Stakeholder Sync',
    description:
      'Continuous alignment with the Tech Lead to unblock paths and expectations.',
    tags: ['Sync', 'Unblocking'],
    icon: Handshake,
  },
];

function FocusCard({
  title,
  description,
  tags,
  icon: Icon,
}: {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
}) {
  return (
    <div className="group relative flex cursor-help flex-col items-start gap-3 transition-all hover:z-[100]">
      <div
        className="invisible absolute bottom-full left-0 z-50 mb-2 w-56 opacity-0 transition-all duration-300 group-hover:visible group-hover:mb-4 group-hover:opacity-100"
        role="tooltip"
      >
        <div className="rounded-xl border border-border bg-popover/95 p-4 shadow-xl backdrop-blur-md">
          <p className="mb-3 text-xs leading-relaxed text-popover-foreground">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Icon
        className="h-12 w-12 text-primary transition-transform duration-300 group-hover:-translate-y-1"
        strokeWidth={1.5}
        aria-hidden
      />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
  );
}

export function RoleAndSetupSection() {
  return (
    <section className="w-full max-w-6xl space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Role & Setup
        </h2>
        <p className="text-muted-foreground">
          Bridging product strategy and agile delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: The Setup (Spec Sheet) */}
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted/10 p-8 lg:col-span-4">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LayoutGrid className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              The Setup
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              I built the delivery setup and led product direction, balancing
              stakeholder inputs while keeping execution unblocked in a dual
              PO/Scrum Master role.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {SETUP_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between pb-2 ${
                  i < SETUP_ROWS.length - 1
                    ? 'border-b border-border/50'
                    : 'pt-1'
                }`}
              >
                <span className="text-sm text-muted-foreground">
                  {row.label}
                </span>
                <span
                  className={`text-sm font-medium ${
                    row.highlight ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Focus Areas — Product Ownership + Scrum Mastery */}
        <div className="flex flex-col justify-center gap-10 rounded-2xl border border-border bg-muted/10 p-8 lg:col-span-8">
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
              Product Ownership
            </h4>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {PRODUCT_OWNERSHIP.map((item) => (
                <FocusCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-border/50" aria-hidden />

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
              Scrum Mastery
            </h4>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {SCRUM_MASTERY.map((item) => (
                <FocusCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
