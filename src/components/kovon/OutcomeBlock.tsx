'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type OutcomeBlockProps = {
  title: string;
  items: string[];
  className?: string;
};

export function OutcomeBlock({ title, items, className }: OutcomeBlockProps) {
  return (
    <Card
      className={cn(
        'border-border bg-card/50 p-6',
        className
      )}
    >
      <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
