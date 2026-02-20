'use client';

import type { CaseStudySections } from '@/content/caseStudies';

type Props = { sections: CaseStudySections };

const sectionOrder: (keyof CaseStudySections)[] = [
  'summary',
  'contextWhyMattered',
  'realProblem',
  'constraints',
  'myRole',
  'approach',
  'solutionConcept',
  'outcome',
  'whatILearned',
  'whatToShowVisually',
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

function Section({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  if (!content?.trim()) return null;
  const paragraphs = content.split(/\n\n+/).filter(Boolean);
  return (
    <article className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
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
          />
        );
      })}
    </section>
  );
}
