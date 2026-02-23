'use client';

import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/motion';

export type ProjectDeliveryImpactProps = {
  delivery: string[];
  impact: string[];
  learned?: string[];
};

export function ProjectDeliveryImpact({
  delivery,
  impact,
  learned,
}: ProjectDeliveryImpactProps) {
  const hasDelivery = delivery?.length > 0;
  const hasImpact = impact?.length > 0;
  const hasLearned = (learned?.length ?? 0) > 0;

  if (!hasDelivery && !hasImpact && !hasLearned) return null;

  return (
    <FadeIn className="space-y-6">
      <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Delivery and Impact
      </h2>
      <Card className="overflow-hidden border-border bg-card/50">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          {hasDelivery && (
            <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:pr-8">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground">
                Delivery
              </h3>
              <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground">
                {delivery.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {hasImpact && (
            <div className="p-6 lg:pl-8">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground">
                Impact
              </h3>
              <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground">
                {impact.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {hasLearned && (
          <div className="border-t border-border bg-muted/20 p-6">
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              What I learned
            </h3>
            <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              {(learned ?? []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
      </section>
    </FadeIn>
  );
}
