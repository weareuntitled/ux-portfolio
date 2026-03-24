'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { educationDetail, educationTimelineDetailed } from '@/content/home';

export function EducationSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Education
      </h2>
      <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-3 text-sm text-foreground">
          {educationTimelineDetailed.map((entry) => (
            <div key={`${entry.degree}-${entry.period}`} className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="font-medium text-foreground">{entry.degree}</p>
              <p className="text-muted-foreground">{entry.school}</p>
              <p className="text-xs text-muted-foreground">
                {entry.period}
                {'grade' in entry && entry.grade ? ` | Grade: ${entry.grade}` : ''}
              </p>
            </div>
          ))}
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="thesis" className="border-border">
            <AccordionTrigger className="text-sm font-medium">
              Master thesis
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {educationDetail.thesisTitle}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="modules" className="border-border">
            <AccordionTrigger className="text-sm font-medium">
              Module highlights
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {educationDetail.moduleHighlights}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="certs" className="border-border">
            <AccordionTrigger className="text-sm font-medium">
              Certification
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {educationDetail.certification}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
