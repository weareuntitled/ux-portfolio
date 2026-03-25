'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  educationAcademicTheses,
  educationCertificationBody,
  educationModuleProjects,
  educationTimelineDetailed,
} from '@/content/home';
import { brandLogos } from '@/lib/brand-logos';

function detailWithEmphasis(detail: string, terms: readonly string[]): ReactNode[] {
  const out: ReactNode[] = [];
  let remaining = detail;
  for (const term of terms) {
    const i = remaining.indexOf(term);
    if (i === -1) continue;
    if (i > 0) out.push(remaining.slice(0, i));
    out.push(
      <strong key={`${term}-${i}`} className="font-medium text-foreground">
        {term}
      </strong>,
    );
    remaining = remaining.slice(i + term.length);
  }
  if (remaining) out.push(remaining);
  return out;
}

export function EducationSection() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Education</h2>
        <Image
          src={brandLogos.thi}
          alt="Technische Hochschule Ingolstadt"
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 object-contain opacity-90"
          unoptimized
        />
      </div>
      <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-3 text-sm text-foreground">
          {educationTimelineDetailed.map((entry) => (
            <div
              key={`${entry.degree}-${entry.period}`}
              className="rounded-xl border border-border bg-muted/30 p-3"
            >
              <p className="font-medium text-foreground">{entry.degree}</p>
              <p className="text-muted-foreground">{entry.school}</p>
              <p className="text-xs text-muted-foreground">
                {entry.period}
                {'grade' in entry && entry.grade ? ` | Final Grade: ${entry.grade}` : ''}
              </p>
            </div>
          ))}
        </div>

        <Accordion type="single" collapsible defaultValue="certification" className="w-full">
          <AccordionItem value="theses" className="border-border">
            <AccordionTrigger className="text-sm font-medium">
              Academic Theses
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-muted-foreground">
              {educationAcademicTheses.map((t) => (
                <div key={t.label}>
                  <p className="font-medium text-foreground">
                    {t.label}
                    {'grade' in t && t.grade ? ` (Grade: ${t.grade})` : ''}
                  </p>
                  <p className="italic text-foreground/90">&ldquo;{t.title}&rdquo;</p>
                  <p className="mt-1 leading-relaxed">{t.body}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="modules" className="border-border">
            <AccordionTrigger className="text-sm font-medium">
              Module Highlights & Projects
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                {educationModuleProjects.map((item) => (
                  <li key={item.lead}>
                    <strong className="font-medium text-foreground">{item.lead}</strong>
                    {' — '}
                    {'emphasize' in item && item.emphasize
                      ? detailWithEmphasis(item.detail, item.emphasize)
                      : item.detail}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="certification" className="border-border">
            <AccordionTrigger className="text-sm font-medium">
              Certification
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="font-medium text-foreground">Certified SAFe 6 Scrum Master</strong>
                {' — '}
                {educationCertificationBody}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
