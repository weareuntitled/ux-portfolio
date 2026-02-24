'use client';

import { cn } from '@/lib/utils';
import type { ResolvedProject } from '@/lib/cms/types';

type Props = { project: ResolvedProject; className?: string };

function pickRole(project: ResolvedProject) {
  return (
    project.roleLine ??
    (project.roles?.length ? project.roles.join(', ') : '') ??
    ''
  );
}

function pickStages(project: ResolvedProject) {
  const meta = project.metaCards ?? [];
  const stageCard = meta.find((m) => /stage|stages|timeline|phases/i.test(m.label));
  const raw = stageCard?.value ?? '';

  // split on common separators
  const stages = raw
    .split(/•|·|,|\/|→|->|\||>/g)
    .map((s) => s.trim())
    .filter(Boolean);

  return { stages, stageCard };
}

export function ProjectAtAGlanceBlock({ project, className }: Props) {
  const role = pickRole(project);
  const { stages, stageCard } = pickStages(project);

  // remove the stage meta card from the remaining meta cards
  const restMeta = (project.metaCards ?? []).filter((m) => m !== stageCard);

  const hasTools = (project.tools?.length ?? 0) > 0;
  const hasMethods = (project.methods?.length ?? 0) > 0;

  return (
    <section className={cn('space-y-6', className)}>
      <div className="grid gap-6 md:grid-cols-12">
        {/* FIRST CARD: Role + Timeline stages */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:col-span-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Project at a glance
          </p>

         
            )}

            {stages.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Timeline stages
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {stages.map((s, i) => (
                    <div key={`${s}-${i}`} className="flex items-center gap-2">
                      <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
                        {s}
                      </span>
                      {i < stages.length - 1 && (
                        <span className="text-xs text-muted-foreground">›</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Remaining meta cards */}
        {restMeta.length > 0 && (
          <div className="grid gap-6 md:col-span-6 md:grid-cols-2">
            {restMeta.slice(0, 4).map((m, idx) => (
              <div key={`${m.label}-${idx}`} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
                <p className="mt-2 text-2xl font-mono font-bold tracking-tight text-primary">
                  {m.value}
                </p>
                {m.hint ? (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.hint}</p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tools + Methods BELOW the first card */}
      {(hasTools || hasMethods) && (
        <div className="rounded-xl border border-border bg-card/50 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {hasTools && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools!.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hasMethods && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Methods
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.methods!.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}