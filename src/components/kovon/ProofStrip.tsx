'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export type ProofItem = {
  label: string;
  value: string;
  note?: string;
  /** When set, value is rendered as separate badges (e.g. POC · MVP · Beta) */
  valueAsBadges?: string[];
};

const defaultProofItems: ProofItem[] = [
  { label: 'Pilot', value: 'POC to Beta', valueAsBadges: ['POC', 'MVP', 'Beta'], note: '10 to 1,000 users' },
  { label: 'Adoption', value: 'Enterprise wide', note: '500 to 1,000 users' },
  { label: 'Audit prep', value: 'Faster readiness', note: 'Documentation & visibility' },
  { label: 'Visibility', value: 'End-to-end', note: 'Scale learnings' },
  { label: 'Scalability insights', value: 'Bottlenecks identified', note: 'Responsibility, update cycles' },
  { label: 'Rollout', value: 'Started then paused', note: 'Strategy change' },
];

type ProofStripProps = {
  items?: ProofItem[];
  className?: string;
};

export function ProofStrip({ items = defaultProofItems, className }: ProofStripProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-3 md:grid-cols-3',
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-border bg-muted/30 px-4 py-3"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {item.label}
          </p>
          {item.valueAsBadges ? (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {item.valueAsBadges.map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="border-border bg-muted/50 font-normal text-foreground"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="mt-1 font-semibold text-foreground">{item.value}</p>
          )}
          {item.note && (
            <p className="mt-0.5 text-sm text-muted-foreground">{item.note}</p>
          )}
        </div>
      ))}
    </div>
  );
}
