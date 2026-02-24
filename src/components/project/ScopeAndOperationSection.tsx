'use client';

import type { LucideIcon } from 'lucide-react';

export type ScopeSetupRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type ScopeSetup = {
  title: string;
  description: string;
  rows: ScopeSetupRow[];
};

export type ScopeFocusItem = {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
};

export type ScopeFocusGroup = {
  label: string;
  items: ScopeFocusItem[];
};

export type ScopeAndOperationSectionProps = {
  /** Icon in the section header (e.g. Bot, LayoutGrid) */
  headerIcon: LucideIcon;
  /** Main heading, e.g. "My Scope & Operation" */
  title: string;
  /** Subtitle under the heading */
  subtitle: string;
  /** Intro paragraph below the header */
  intro: string;
  /** Left card: "The Setup" with rows */
  setup: ScopeSetup;
  /** Right panel: one or more focus groups (label + grid of icon cards with tooltips) */
  focusGroups: ScopeFocusGroup[];
  /** Optional: icon for the setup card (defaults to LayoutGrid) */
  setupIcon?: LucideIcon;
};

function FocusCard({
  title,
  description,
  tags,
  icon: Icon,
}: ScopeFocusItem) {
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

/**
 * Reusable "My Scope & Operation" section: header (icon + title + subtitle),
 * intro paragraph, then a grid with left "Setup" card and right focus groups
 * (icon cards with hover tooltips). Use on automation, kovon, or any project
 * that has scope/setup/focus data.
 */
export function ScopeAndOperationSection({
  headerIcon: HeaderIcon,
  title,
  subtitle,
  intro,
  setup,
  focusGroups,
  setupIcon: SetupIcon,
}: ScopeAndOperationSectionProps) {
  const SetupIconNode = SetupIcon ?? HeaderIcon;

  return (
    <section className="space-y-14">
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <HeaderIcon className="h-5 w-5" strokeWidth={2} aria-hidden />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          {intro}
        </p>

        <section className="w-full max-w-6xl space-y-8 pt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: The Setup */}
            <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted/10 p-8 lg:col-span-4">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <SetupIconNode className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {setup.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {setup.description}
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-3">
                {setup.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between ${
                      i < setup.rows.length - 1
                        ? 'border-b border-border/50 pb-2'
                        : 'pb-2 pt-1'
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

            {/* Right: Focus groups (divider between groups) */}
            <div className="flex flex-col justify-center gap-10 rounded-2xl border border-border bg-muted/10 p-8 lg:col-span-8">
              {focusGroups.flatMap((group, i) => [
                ...(i > 0
                  ? [
                      <div
                        key={`divider-${i}`}
                        className="h-px w-full bg-border/50"
                        aria-hidden
                      />,
                    ]
                  : []),
                <div key={group.label} className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                    {group.label}
                  </h4>
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                    {group.items.map((item) => (
                      <FocusCard key={item.title} {...item} />
                    ))}
                  </div>
                </div>,
              ])}
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
