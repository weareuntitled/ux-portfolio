'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { experienceTimelineDetailed } from '@/content/home';
import { cn } from '@/lib/utils';

export function ExperienceTimelineSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Experience
      </h2>
      <div className="grid gap-4 md:grid-cols-1">
        {experienceTimelineDetailed.map((entry, i) => (
          <Card
            key={entry.company}
            className={cn(
              'overflow-hidden border-border bg-card',
              i === 0 && 'md:col-span-1',
            )}
          >
            <CardHeader className="pb-2">
              <p className="font-semibold text-foreground">{entry.company}</p>
              <p className="text-sm text-muted-foreground">{entry.role}</p>
              <p className="text-xs tabular-nums text-muted-foreground">{entry.period}</p>
              <p className="text-xs text-muted-foreground">{entry.location}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">{entry.summary}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {entry.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
