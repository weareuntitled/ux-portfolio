'use client';

import { FileText, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { FadeIn } from '@/components/motion';
import { ResultImpactCard, type ResultImpactMetric } from '@/components/project/ResultImpactCard';

export type ProjectDeliveryImpactProps = {
  delivery: string[];
  impact: string[];
  document?: { label: string; href: string };
};

function headlineFromText(input: string, maxChars = 34) {
  const s = (input ?? '').trim().replace(/\s+/g, ' ');
  if (!s) return '';
  const firstSentence = s.split(/[.!?]/)[0]!.trim();
  if (firstSentence.length <= maxChars) return firstSentence;

  const words = firstSentence.split(' ');
  let out = '';
  for (const w of words) {
    const next = out ? `${out} ${w}` : w;
    if (next.length > maxChars) break;
    out = next;
  }
  return out || firstSentence.slice(0, maxChars).trim();
}

export function ProjectDeliveryImpact({ delivery, impact, document }: ProjectDeliveryImpactProps) {
  const left = delivery ?? [];
  const right = impact ?? [];

  if (!left.length && !right.length && !document?.href) return null;

  const deliverable = left[0] ?? '';
  const highlight = left[1] ?? left[0] ?? '';
  const outcome = right[0] ?? '';
  const impactPoint = right[1] ?? right[0] ?? '';

  const metrics: ResultImpactMetric[] = [
    {
      label: 'Deliverable',
      value: deliverable,
      displayValue: headlineFromText(deliverable),
      description: deliverable,
      icon: FileText,
      primary: true,
    },
    {
      label: 'Highlight',
      value: highlight,
      displayValue: headlineFromText(highlight),
      description: highlight,
      icon: Sparkles,
    },
    {
      label: 'Outcome',
      value: outcome,
      displayValue: headlineFromText(outcome),
      description: outcome,
      icon: CheckCircle2,
    },
    {
      label: 'Impact',
      value: impactPoint,
      displayValue: headlineFromText(impactPoint),
      description: impactPoint,
      icon: Star,
      highlight: true,
    },
  ].filter((m) => (m.displayValue ?? '').trim().length > 0);

  const title = 'Delivery and impact';
  const description = outcome || deliverable || 'Key deliverables and outcomes from this project.';

  return (
    <FadeIn>
      <ResultImpactCard
        title={title}
        description={description}
        icon={Star}
        metrics={metrics}
        leftItems={left}
        rightItems={right}
        listMaxItems={3}
        document={document}
      />
    </FadeIn>
  );
}