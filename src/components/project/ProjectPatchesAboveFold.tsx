'use client';

import type { ResolvedProject } from '@/lib/cms/types';
import { cn } from '@/lib/utils';

function pickRole(project: ResolvedProject) {
  return project.roleLine ?? (project.roles?.length ? project.roles.join(', ') : '');
}

function pickStages(project: ResolvedProject) {
  const meta = project.metaCards ?? [];
  const stageCard = meta.find((m) => /stage|stages|timeline|phases/i.test(m.label));
  const raw = stageCard?.value ?? '';

  const stages = raw
    .split(/•|·|,|\/|→|->|\||>/g)
    .map((s) => s.trim())
    .filter(Boolean);

  return { stages, stageCard };
}

function Patch({
  label,
  value,
  hint,
  className,
  children,
}: {
  label: string;
  value?: string;
  hint?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('rounded-xl border border-border bg-card/50 p-4', className)}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {value ? (
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      ) : null}
      {children}
      {hint ? (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function ProjectPatchesAboveFold({
  project,
  className,
}: {
  project: ResolvedProject;
  className?: string;
}) {
  const role = pickRole(project);
  const { stages, stageCard } = pickStages(project);

  const restMeta = (project.metaCards ?? []).filter((m) => m !== stageCard).slice(0, 3);

  const hasTools = (project.tools?.length ?? 0) > 0;
  const hasMethods = (project.methods?.length ?? 0) > 0;

  return (
    <section className={cn('space-y-4', className)}>
      {/* compact patches row */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* first patch: role + stages */}
        <Patch label="At a glance" className="sm:col-span-2">
          {role ? (
            <div className="mt-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Role
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">{role}</p>
            </div>
          ) : null}

          {stages.length > 0 ? (
            <div className="mt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Timeline stages
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {stages.map((s, i) => (
                  <span
                    key={`${s}-${i}`}
                    className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </Patch>

        {/* remaining meta patches */}
        {restMeta.map((m, idx) => (
          <Patch
            key={`${m.label}-${idx}`}
            label={m.label}
            value={m.value}
            hint={m.hint}
          />
        ))}
      </div>

      {/* tools / methods as compact chips below the patches */}
      {(hasTools || hasMethods) && (
        <div className="rounded-xl border border-border bg-card/50 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            {hasTools && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Tools
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tools!.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hasMethods && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Methods
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.methods!.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
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