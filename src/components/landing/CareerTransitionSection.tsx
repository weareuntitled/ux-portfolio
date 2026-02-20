'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const CareerAreaChart = dynamic(
  () => import('@/components/CareerAreaChart').then((m) => ({ default: m.CareerAreaChart })),
  { ssr: false }
);

function ChartFallback() {
  return (
    <div className="mx-auto max-w-2xl h-[280px] animate-pulse rounded-lg bg-muted/50" aria-hidden />
  );
}

export function CareerTransitionSection() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl border border-border bg-card/90 shadow-lg"
      aria-label="Career transition"
    >
      <Accordion type="single" collapsible className="w-full" defaultValue="">
        <AccordionItem value="career-transition" className="border-border px-4 md:px-6">
          <AccordionTrigger className="py-4 text-lg font-semibold hover:no-underline md:text-xl">
            Career transition
          </AccordionTrigger>
          <AccordionContent className="pb-6 pt-0">
            <Suspense fallback={<ChartFallback />}>
              <div className="mx-auto max-w-2xl">
                <CareerAreaChart />
              </div>
            </Suspense>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
