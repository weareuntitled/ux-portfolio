'use client';

import {
  AlertCircle,
  GitBranch,
  Lightbulb,
  TrendingUp,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import type { CaseStudySections } from '@/content/portfolio.types';
import { cn } from '@/lib/utils';

type Props = { sections: CaseStudySections };

const sectionOrder: (keyof CaseStudySections)[] = [
  'realProblem',
  'approach',
  'solutionConcept',
  'outcome',
  'whatILearned',
  // insightAuthor excluded — used for quote attribution, not as a section
];

const sectionTitles: Record<keyof CaseStudySections, string> = {
  summary: 'Summary',
  contextWhyMattered: 'Context and why it mattered',
  realProblem: 'The real problem',
  constraints: 'Constraints and complexity',
  myRole: 'My role and collaboration',
  approach: 'Approach and process',
  solutionConcept: 'Solution and interaction concept',
  outcome: 'Outcome and impact',
  whatILearned: 'What I learned',
  whatToShowVisually: 'What to show visually',
  insightAuthor: 'Quote by',
};

const sectionIcons: Record<keyof CaseStudySections, LucideIcon> = {
  summary: BookOpen,
  contextWhyMattered: BookOpen,
  realProblem: AlertCircle,
  constraints: AlertCircle,
  myRole: GitBranch,
  approach: GitBranch,
  solutionConcept: Lightbulb,
  outcome: TrendingUp,
  whatILearned: BookOpen,
  whatToShowVisually: Lightbulb,
  insightAuthor: BookOpen,
};

const sectionAccent: Record<keyof CaseStudySections, string> = {
  summary: 'border-l-primary',
  contextWhyMattered: 'border-l-primary',
  realProblem: 'border-l-destructive/70',
  constraints: 'border-l-destructive/70',
  myRole: 'border-l-primary',
  approach: 'border-l-primary',
  solutionConcept: 'border-l-emerald-500/80',
  outcome: 'border-l-emerald-500/80',
  whatILearned: 'border-l-amber-500/80',
  whatToShowVisually: 'border-l-emerald-500/80',
  insightAuthor: 'border-l-muted-foreground/50',
};

function Section({
  title,
  content,
  icon: Icon,
  accent,
}: {
  title: string;
  content: string;
  icon: LucideIcon;
  accent: string;
}) {
  if (!content?.trim()) return null;
  const paragraphs = content.split(/\n\n+/).filter(Boolean);
  return (
    <article
      className={cn(
        'rounded-xl border border-border bg-card p-6 pl-6 shadow-sm',
        'border-l-4',
        accent
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="space-y-3 text-muted-foreground">
        {paragraphs.length > 1 ? (
          paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))
        ) : (
          <p className="leading-relaxed">{content}</p>
        )}
      </div>
    </article>
  );
}

export function CaseStudyTemplate({ sections }: Props) {
  return (
    <section className="space-y-8" aria-label="Case study">
      {sectionOrder.map((key) => {
        const content = sections[key];
        if (typeof content !== 'string' || !content.trim()) return null;
        return (
          <Section
            key={key}
            title={sectionTitles[key]}
            content={content}
            icon={sectionIcons[key]}
            accent={sectionAccent[key]}
          />
        );
      })}
    </section>
  );
}
