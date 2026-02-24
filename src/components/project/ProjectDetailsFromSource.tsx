'use client';

import Link from 'next/link';
import { ExternalLink, CheckCircle2, Sparkles, Wrench, BookOpen } from 'lucide-react';
import type { ResolvedProject } from '@/lib/cms/types';
import { ProjectMetaCards } from './ProjectMetaCards';

type Props = { project: ResolvedProject };

/**
 * Renders project data that comes from the single source (portfolio.ts):
 * metaCards, outcomes, highlights, tools, methods, links.
 * Use on project detail pages so everything in the portfolio entry is visible.
 */
export function ProjectDetailsFromSource({ project }: Props) {
  const hasMetaCards = project.metaCards && project.metaCards.length > 0;
  const hasOutcomes = project.outcomes && project.outcomes.length > 0;
  const hasHighlights = project.highlights && project.highlights.length > 0;
  const hasTools = project.tools && project.tools.length > 0;
  const hasMethods = project.methods && project.methods.length > 0;
  const hasLinks = project.links && project.links.length > 0;
  const hasCircumstances = Boolean(
    project.client || project.teamSize || project.year
  );

  if (
    !hasMetaCards &&
    !hasOutcomes &&
    !hasHighlights &&
    !hasTools &&
    !hasMethods &&
    !hasLinks &&
    !hasCircumstances
  ) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* Circumstances: client, team size, year from portfolio */}
      {hasCircumstances && (
        <div className="grid gap-6 rounded-xl border border-border bg-card/50 p-6 md:grid-cols-2">
          <article>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Circumstances
            </h2>
            <p className="text-foreground">
              {[project.teamSize, project.client, project.year]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </article>
          {project.customerAbout && (
            <article>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Customer
              </h2>
              <p className="text-foreground">{project.customerAbout}</p>
            </article>
          )}
        </div>
      )}

      {/* Meta cards (Experts, Duration, Deliverable, etc.) */}
      {hasMetaCards && (
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Project at a glance
          </h2>
          <ProjectMetaCards
            cards={project.metaCards!.map((m) => ({
              label: m.label,
              value: m.value,
              hint: m.hint,
            }))}
          />
        </section>
      )}

      {/* Outcomes + Highlights */}
      {(hasOutcomes || hasHighlights) && (
        <section className="grid gap-8 md:grid-cols-2">
          {hasOutcomes && (
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
                Outcomes
              </h3>
              <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                {project.outcomes!.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {hasHighlights && (
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Sparkles className="h-5 w-5 text-primary" aria-hidden />
                Highlights
              </h3>
              <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
                {project.highlights!.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Tools & methods */}
      {(hasTools || hasMethods) && (
        <section className="rounded-xl border border-border bg-card/50 p-6">
          <div className="flex flex-wrap items-start gap-6">
            {hasTools && (
              <div>
                <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Wrench className="h-4 w-4" aria-hidden />
                  Tools
                </h3>
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
                <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <BookOpen className="h-4 w-4" aria-hidden />
                  Methods
                </h3>
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
        </section>
      )}

      {/* Links (Live demo, Case study, GitHub) */}
      {hasLinks && (
        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
            Links
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.links!.map((link) => {
              const isExternal = link.href.startsWith('http');
              const className =
                'inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
              if (isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
                  </a>
                );
              }
              return (
                <Link key={link.href} href={link.href} className={className}>
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
