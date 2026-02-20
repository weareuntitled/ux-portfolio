'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { educationSnapshot, educationDetail } from '@/content/home';

export function EducationSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Education
      </h2>
      <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-2 text-sm text-foreground">
          {educationSnapshot.map((line, i) => (
            <p key={i}>{line}</p>
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
