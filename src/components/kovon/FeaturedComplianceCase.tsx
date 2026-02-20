'use client';

import * as React from 'react';
import {
  Building2,
  Scale,
  ShieldCheck,
  Landmark,
  BadgeCheck,
  FolderTree,
  FileText,
  ListChecks,
  Car,
  GitMerge,
  Users,
  Table2,
  FileStack,
  Network,
  Layers3,
  Wrench,
  CircleDot,
  Settings,
  type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FadeIn } from '@/components/motion';

import { glossary, featuredVisuals, raciMini } from '@/content/kovon/featuredCase.config';

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Scale,
  ShieldCheck,
  Landmark,
  BadgeCheck,
  FolderTree,
  FileText,
  ListChecks,
  Car,
  GitMerge,
  Users,
  Table2,
  FileStack,
  Network,
  Layers3,
  Wrench,
  CircleDot,
  Settings,
};

type IconName = keyof typeof iconMap;

function Icon({ name, className }: { name: IconName | string; className?: string }) {
  const Cmp = iconMap[name];
  if (!Cmp) return <span className={className} aria-hidden>◻</span>;
  return <Cmp className={className} />;
}

type GlossaryKey = keyof typeof glossary;

const GLOSSARY_PATTERN = /\[\[([^\]]+)\]\]/g;

function GlossaryTerm({ term, showTooltip }: { term: GlossaryKey; showTooltip: boolean }) {
  const entry = glossary[term];
  if (!entry) return <>{term}</>;
  const label = entry.label;
  if (!showTooltip) {
    return <span className="text-foreground">{term}</span>;
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="cursor-help underline decoration-muted-foreground/50 underline-offset-2 text-foreground"
          aria-label={label}
        >
          {term}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-sm border-border bg-popover p-3 text-popover-foreground">
        <div className="flex gap-2">
          <div className="mt-0.5 shrink-0">
            <Icon name={entry.icon} className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <div className="font-medium">{label}</div>
            <div className="text-sm text-muted-foreground">{entry.short}</div>
            <div className="text-xs text-muted-foreground/90">{entry.detail}</div>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

/** Precompute first-occurrence-per-term across header (OE, UN-ECE) then all bullets. */
function useFirstOccurrenceByBullet(): Record<string, boolean[]> {
  return React.useMemo(() => {
    const re = /\[\[([^\]]+)\]\]/g;
    const seen = new Set<string>(['OE', 'UN-ECE']);
    const out: Record<string, boolean[]> = {};
    featuredVisuals.forEach((v) => {
      v.bullets.forEach((text, bi) => {
        const key = `${v.id}-${bi}`;
        const first: boolean[] = [];
        let m: RegExpExecArray | null;
        re.lastIndex = 0;
        while ((m = re.exec(text))) {
          const term = m[1];
          const isFirst = !seen.has(term);
          if (isFirst) seen.add(term);
          first.push(isFirst);
        }
        out[key] = first;
      });
    });
    return out;
  }, []);
}

function renderWithGlossary(
  text: string,
  firstOccurrenceForThisBullet?: boolean[]
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = GLOSSARY_PATTERN;
  re.lastIndex = 0;
  let last = 0;
  let matchIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text))) {
    const before = text.slice(last, match.index);
    if (before) parts.push(before);

    const term = match[1] as GlossaryKey;
    const showTooltip =
      firstOccurrenceForThisBullet === undefined
        ? true
        : firstOccurrenceForThisBullet[matchIndex++] ?? false;
    if (glossary[term]) {
      parts.push(
        <GlossaryTerm key={`${term}-${match.index}`} term={term} showTooltip={showTooltip} />
      );
    } else {
      parts.push(match[0]);
    }

    last = match.index + match[0].length;
  }

  const tail = text.slice(last);
  if (tail) parts.push(tail);

  return <>{parts}</>;
}

type DiagramType = (typeof featuredVisuals)[number]['diagram']['type'];

const Diagram = React.memo(function Diagram({ type }: { type: DiagramType }) {
  if (type === 'chaos') {
    const sources = [
      { icon: 'FileText', label: 'PDFs' },
      { icon: 'FileStack', label: 'Spreadsheets' },
      { icon: 'FolderTree', label: 'SharePoint' },
      { icon: 'Users', label: 'Mail threads' },
    ];
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="mb-3 text-xs text-muted-foreground">
          Before. Work is distributed and status is not reliable.
        </div>
        <div className="grid grid-cols-2 gap-3">
          {sources.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 rounded-lg border border-border bg-card p-3"
            >
              <Icon name={s.icon} className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{s.label}</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                unknown
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'orgVsVehicle') {
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="mb-3 text-xs text-muted-foreground">
          Many to many mapping between OE teams and vehicle scope.
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 flex items-center gap-2">
              <Icon name="Building2" className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm font-medium text-foreground">OE teams</div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>OE 12</span>
                <Badge variant="secondary">Brakes</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>OE 18</span>
                <Badge variant="secondary">Software</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>OE 21</span>
                <Badge variant="secondary">Body</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-lg border border-border bg-card p-3">
            <div className="text-center">
              <Icon name="Network" className="mx-auto h-6 w-6 text-muted-foreground" />
              <div className="mt-2 text-sm font-medium text-foreground">Mapping layer</div>
              <div className="mt-1 text-xs text-muted-foreground">Assignments and dependencies</div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-3">
            <div className="mb-2 flex items-center gap-2">
              <Icon name="Car" className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm font-medium text-foreground">Vehicle projects</div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Q7</span>
                <Badge variant="secondary">derivatives</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Q8</span>
                <Badge variant="secondary">variants</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Q8 Sport</span>
                <Badge variant="secondary">delta</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'regTree') {
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="mb-3 text-xs text-muted-foreground">
          Regulatory hierarchy becomes tasks and verdicts.
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <Icon name="FolderTree" className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Annex</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">A1, A2, A3</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <Icon name="FileText" className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Regulation</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">R13, R79, R155</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <Icon name="ListChecks" className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Chapter</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">5.1, 5.2, 6.3</div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-card p-3">
          <Icon name="BadgeCheck" className="h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="text-sm text-foreground">
            Each mapping produces a <span className="font-medium">Verdict</span> with status, evidence, and
            ownership.
          </div>
          <Badge className="ml-auto">creates tasks</Badge>
        </div>
      </div>
    );
  }

  if (type === 'granularity') {
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="mb-3 text-xs text-muted-foreground">
          Different teams work at different levels, reporting stays consistent.
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <Icon name="ListChecks" className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm font-medium text-foreground">Chapter mode</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">Split by expertise per chapter.</div>
            <div className="mt-3 flex gap-2">
              <Badge variant="secondary">5.1</Badge>
              <Badge variant="secondary">5.2</Badge>
              <Badge variant="secondary">6.3</Badge>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <Icon name="FileText" className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm font-medium text-foreground">Package mode</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">One deliverable for a full regulation.</div>
            <div className="mt-3">
              <Badge variant="secondary">R13 package</Badge>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'raciMini') {
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Compact ownership map, simplified for HR readability.
          </div>
          <div className="flex gap-2">
            {raciMini.legend.map((l) => (
              <Badge key={l.key} variant="secondary" className="text-xs">
                {l.key} {l.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Task</th>
                {raciMini.roles.map((r) => (
                  <th key={r.id} className="whitespace-nowrap px-2 py-2 font-medium">
                    <div className="flex items-center gap-2">
                      <Icon name={r.icon} className="h-4 w-4 text-muted-foreground" />
                      {r.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {raciMini.tasks.map((t) => (
                <tr key={t.id} className="border-t border-border">
                  <td className="py-2 pr-3 text-foreground">{t.label}</td>
                  {raciMini.roles.map((r) => {
                    const v = (t.cells as Record<string, string>)[r.id] as 'R' | 'A' | 'S' | undefined;
                    return (
                      <td key={r.id} className="px-2 py-2">
                        {v ? (
                          <span
                            className={
                              v === 'R'
                                ? 'inline-flex h-7 w-7 items-center justify-center rounded-md border border-primary bg-primary text-xs font-medium text-primary-foreground'
                                : v === 'A'
                                  ? 'inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-xs font-medium text-foreground'
                                  : 'inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted text-xs font-medium text-foreground'
                            }
                          >
                            {v}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/40">·</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
});
Diagram.displayName = 'Diagram';

export function FeaturedComplianceCase() {
  const firstByBullet = useFirstOccurrenceByBullet();

  return (
    <FadeIn>
      <TooltipProvider delayDuration={300}>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Featured case</p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Holistic compliance documentation platform
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Aligns <GlossaryTerm term="OE" showTooltip /> ownership, vehicle scope, and{' '}
              <GlossaryTerm term="UN-ECE" showTooltip /> requirements into one operational workflow.
            </p>
          </div>

          <Tabs defaultValue={featuredVisuals[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4">
              {featuredVisuals.map((v) => (
                <TabsTrigger key={v.id} value={v.id} className="gap-2">
                  <Icon name={v.icon} className="h-4 w-4 shrink-0" />
                  <span className="hidden truncate sm:inline">{v.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {featuredVisuals.map((v) => (
              <TabsContent key={v.id} value={v.id} className="mt-4">
                <Card className="border-border">
                  <CardHeader className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
                        <Icon name={v.icon} className="h-4 w-4 text-muted-foreground" />
                      </span>
                      {v.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{v.subtitle}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm text-foreground">
                      {v.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                          <span>
                            {renderWithGlossary(b, firstByBullet[`${v.id}-${idx}`])}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Diagram type={v.diagram.type} />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </TooltipProvider>
    </FadeIn>
  );
}
