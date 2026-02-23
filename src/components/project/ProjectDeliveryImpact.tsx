'use client';

import { FileText, PackageCheck, Zap } from 'lucide-react';
import { FadeIn } from '@/components/motion';
import { ResultImpactCard } from '@/components/project/ResultImpactCard';
import type { ResultImpactMetric } from '@/components/project/ResultImpactCard';

export type ProjectDeliveryImpactProps = {
  delivery: string[];
  impact: string[];
  learned?: string[];
  /** Optional document (e.g. PDD) — used as card title when provided. */
  document?: { label: string; href: string };
};

export function ProjectDeliveryImpact({
  delivery,
  impact,
  document: documentLink,
}: ProjectDeliveryImpactProps) {
  const hasDelivery = delivery?.length > 0;
  const hasImpact = impact?.length > 0;
  const hasDocument = Boolean(documentLink?.href && documentLink?.label);

  if (!hasDelivery && !hasImpact && !hasDocument) return null;

  const title = documentLink?.label ?? 'Delivery and Impact';
  const description =
    delivery[0] ?? impact[0] ?? 'Key deliverables and outcomes from this project.';

  const metrics: ResultImpactMetric[] = [];
  const maxDelivery = Math.min(delivery.length, 2);
  const maxImpact = Math.min(impact.length, 2);
  for (let i = 0; i < maxDelivery; i++) {
    const d = delivery[i];
    metrics.push({
      value: d.length > 18 ? `${d.slice(0, 15).trim()}…` : d,
      label: 'Deliverable',
      description: d,
      icon: FileText,
    });
  }
  for (let i = 0; i < maxImpact; i++) {
    const im = impact[i];
    metrics.push({
      value: im.length > 18 ? `${im.slice(0, 15).trim()}…` : im,
      label: 'Outcome',
      description: im,
      icon: i === maxImpact - 1 ? Zap : PackageCheck,
      highlight: i === maxImpact - 1,
    });
  }
  if (metrics.length === 0 && hasDocument) {
    metrics.push({
      value: documentLink!.label,
      label: 'Document',
      description: 'View the deliverable document.',
      icon: FileText,
      highlight: true,
    });
  }

  if (metrics.length === 0) return null;

  return (
    <FadeIn>
      <section>
        <ResultImpactCard
          title={title}
          description={description}
          metrics={metrics}
          icon={PackageCheck}
        />
      </section>
    </FadeIn>
  );
}
