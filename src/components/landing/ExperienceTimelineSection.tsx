'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { experienceSnapshot, experience8020Accordion } from '@/content/home';
import { cn } from '@/lib/utils';

export function ExperienceTimelineSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Experience
      </h2>
      <div className="grid gap-4 md:grid-cols-1">
        {experienceSnapshot.map((entry, i) => (
          <Card
            key={entry.company}
            className={cn(
              'overflow-hidden border-border bg-card',
              i === 0 && 'md:col-span-1',
            )}
          >
            <CardHeader className="pb-2">
              <p className="font-semibold text-foreground">{entry.company}</p>
              <p className="text-sm text-muted-foreground">{entry.titleOrProgression}</p>
              <p className="text-xs tabular-nums text-muted-foreground">{entry.dates}</p>
              <p className="text-sm text-muted-foreground">{entry.scopeOneLine}</p>
            </CardHeader>
            {entry.company.startsWith('Achtzig20') && (
              <CardContent className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="selected-projects" className="border-border">
                    <AccordionTrigger className="text-sm font-medium">
                      Selected enterprise projects
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {experience8020Accordion.selectedProjects}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="responsibilities" className="border-border">
                    <AccordionTrigger className="text-sm font-medium">
                      Responsibilities
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {experience8020Accordion.responsibilities}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="methods" className="border-border">
                    <AccordionTrigger className="text-sm font-medium">
                      Methods
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {experience8020Accordion.methods}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
