'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { productFocusGroups, skillsRadarWhatItMeans } from '@/content/home';

export function ProductFocusSection() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl border border-border bg-card"
      aria-label="Product focus"
    >
      <Accordion type="single" collapsible className="w-full" defaultValue="">
        <AccordionItem value="product-focus" className="border-border px-4 md:px-6">
          <AccordionTrigger className="py-4 text-lg font-semibold hover:no-underline md:text-xl">
            Product focus
          </AccordionTrigger>
          <AccordionContent className="pb-6 pt-0">
            <p className="mb-4 text-sm text-muted-foreground">
              {skillsRadarWhatItMeans}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
              {productFocusGroups.map((group) => (
                <div key={group.label} className="flex flex-wrap items-center gap-2">
                  <span className="w-full text-xs font-medium uppercase tracking-wider text-muted-foreground sm:w-auto">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
