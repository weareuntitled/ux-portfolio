'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getTechnicalSpecs } from '@/content/caseStudies';
import { cn } from '@/lib/utils';

type Props = {
  slug: string;
  className?: string;
};

export function CaseStudyTechnicalSpecs({ slug, className }: Props) {
  const specs = getTechnicalSpecs(slug);
  if (specs.length === 0) return null;

  return (
    <section
      className={cn(
        'border-t border-neutral-900 bg-[#0a0a0a] py-20',
        className
      )}
    >
      <div className="mx-auto max-w-3xl px-6">
        <h3 className="mb-8 text-sm font-semibold uppercase tracking-widest text-neutral-500">
          Technical Specifications
        </h3>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {specs.map((item, i) => (
            <AccordionItem
              key={item.title}
              value={`item-${i}`}
              className="border-none rounded-xl bg-neutral-900/20 px-4"
            >
              <AccordionTrigger className="py-5 hover:no-underline">
                <span className="text-lg font-medium text-neutral-200">{item.title}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 leading-relaxed text-neutral-400">
                <p>{item.body}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
