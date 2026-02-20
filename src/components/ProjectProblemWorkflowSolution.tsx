'use client';

import { AlertCircle, GitBranch, Lightbulb } from 'lucide-react';
import type { ResolvedProject } from '@/lib/cms/types';

function splitIntoParagraphs(text: string): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function parseWorkflowSteps(text: string): string[] {
  if (!text?.trim()) return [];
  // Split by "1) ", "2) ", "1. ", "2. " (lookahead so we keep content after number)
  const stepChunks = text.split(/(?=\d+[).]\s*)/).map((s) => s.trim()).filter(Boolean);
  if (stepChunks.length > 1) {
    return stepChunks.map((chunk) => chunk.replace(/^\d+[).]\s*/, '').trim());
  }
  return splitIntoParagraphs(text);
}

type Props = { project: ResolvedProject };

export function ProjectProblemWorkflowSolution({ project }: Props) {
  const problemContent = project.problem ?? '';
  const workflowContent = project.workflow ?? project.context ?? '';
  const solutionContent = project.solution ?? '';

  const problemParagraphs = splitIntoParagraphs(problemContent);
  const workflowSteps = parseWorkflowSteps(workflowContent);
  const solutionParagraphs = splitIntoParagraphs(solutionContent);

  return (
    <section className="space-y-8">
      {problemContent && (
        <article className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="font-semibold text-foreground">Problem</h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            {problemParagraphs.length > 0 ? (
              problemParagraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))
            ) : (
              <p className="leading-relaxed">{problemContent}</p>
            )}
          </div>
        </article>
      )}

      {workflowContent && (
        <article className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <GitBranch className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="font-semibold text-foreground">Workflow</h2>
          </div>
          {workflowSteps.length > 1 ? (
            <ol className="list-none space-y-3 pl-0">
              {workflowSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="space-y-3 text-muted-foreground">
              {workflowSteps.length === 1 ? (
                <p className="leading-relaxed">{workflowSteps[0]}</p>
              ) : (
                <p className="leading-relaxed">{workflowContent}</p>
              )}
            </div>
          )}
        </article>
      )}

      {solutionContent && (
        <article className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Lightbulb className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="font-semibold text-foreground">Solution</h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            {solutionParagraphs.length > 0 ? (
              solutionParagraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))
            ) : (
              <p className="leading-relaxed">{solutionContent}</p>
            )}
          </div>
        </article>
      )}
    </section>
  );
}
