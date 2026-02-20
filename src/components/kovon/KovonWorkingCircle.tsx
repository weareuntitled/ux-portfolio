'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const CIRCLE_SIZE = 280;

const floatTransition = {
  duration: 5,
  repeat: Infinity,
  ease: 'easeInOut' as const,
};

export function KovonWorkingCircle() {
  return (
    <Card className="border-border p-6 shadow-sm lg:col-span-2">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
        Working Circle
      </h3>

      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-muted/10">
        {/* Desktop: 3-circle Venn — larger, spread out, hover-to-reveal rhythm */}
        <motion.div
          className="relative hidden min-h-[520px] w-full items-center justify-center p-6 lg:flex"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div
            className="relative mx-auto w-full max-w-[720px]"
            style={{ minHeight: 460 }}
          >
            {/* Top center circle — Tech & Delivery: Process-style fill, hover = rhythm tooltip */}
            <motion.div
              className="group absolute cursor-default rounded-full border-2 border-border bg-muted/30 backdrop-blur-[2px] transition-all duration-300 ease-out hover:scale-105 hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg"
              style={{
                left: `calc(50% - ${CIRCLE_SIZE / 2}px)`,
                top: 0,
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={floatTransition}
            >
              <div className="flex h-full flex-col items-center pt-6 text-center">
                <div className="rounded-full border border-border bg-primary/10 px-3 py-1.5 text-xs font-semibold text-foreground">
                  Tech &amp; Delivery
                </div>
                <p className="mt-3 px-4 text-sm leading-relaxed text-muted-foreground">
                  Tech Lead · Devs (x3–5)
                </p>
                <p className="mt-1 px-4 text-xs leading-tight text-muted-foreground/90">
                  Backlog, Planning, Reviews
                </p>

                {/* Hover-to-reveal rhythm tooltip — right of circle */}
                <div
                  className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[100] w-[220px] -translate-y-1/2 rounded-lg border border-border bg-popover/95 p-3 shadow-xl backdrop-blur-sm transition-all duration-300 ease-out opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  aria-hidden
                >
                  <div className="absolute left-3 top-3 bottom-3 w-px bg-border" />
                  <div className="relative mb-2 pl-5">
                    <div className="absolute left-[10px] top-1.5 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" />
                    <div className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Week 1
                    </div>
                    <ul className="space-y-0.5 text-[10px] text-foreground">
                      <li className="flex items-center gap-1.5">
                        <span className="h-0.5 w-0.5 rounded-full bg-border" />
                        Daily Sync (x2)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-0.5 w-0.5 rounded-full bg-border" />
                        Tech Lead Sync
                      </li>
                    </ul>
                  </div>
                  <div className="relative pl-5">
                    <div className="absolute left-[10px] top-1.5 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" />
                    <div className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Week 2
                    </div>
                    <ul className="space-y-0.5 text-[10px] text-foreground">
                      <li className="flex items-center gap-1.5">
                        <span className="h-0.5 w-0.5 rounded-full bg-border" />
                        Sprint Planning
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-0.5 w-0.5 rounded-full bg-border" />
                        Daily Sync (x2) · Sprint Review
                      </li>
                    </ul>
                  </div>
                  <p className="mt-2 border-t border-border pt-2 text-center text-[9px] italic text-muted-foreground">
                    Day-to-day alignment w/ TL
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom left circle — Design (Process-style) */}
            <motion.div
              className="absolute rounded-full border-2 border-border bg-muted/30 backdrop-blur-[2px] transition-all duration-300 ease-out hover:scale-105 hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg"
              style={{
                left: `calc(18% - ${CIRCLE_SIZE / 2}px)`,
                top: `calc(62% - ${CIRCLE_SIZE / 2}px)`,
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ ...floatTransition, delay: 0.5 }}
            >
              <div className="flex h-full flex-col items-start justify-end pb-6 pl-6 text-left">
                <div className="rounded-full border border-border bg-primary/10 px-3 py-1.5 text-xs font-semibold text-foreground">
                  Design
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  2 Designers
                </p>
                <p className="text-xs leading-tight text-muted-foreground/90">
                  Prioritization, Validation &amp; Narrative
                </p>
              </div>
            </motion.div>

            {/* Bottom right circle — Requirements (Process-style) */}
            <motion.div
              className="absolute rounded-full border-2 border-border bg-muted/30 backdrop-blur-[2px] transition-all duration-300 ease-out hover:scale-105 hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg"
              style={{
                left: `calc(82% - ${CIRCLE_SIZE / 2}px)`,
                top: `calc(62% - ${CIRCLE_SIZE / 2}px)`,
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ ...floatTransition, delay: 1 }}
            >
              <div className="flex h-full flex-col items-end justify-end pb-6 pr-6 text-right">
                <div className="rounded-full border border-border bg-primary/10 px-3 py-1.5 text-xs font-semibold text-foreground">
                  Requirements
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Req Manager · Customer PO
                </p>
                <p className="text-xs leading-tight text-muted-foreground/90">
                  Slicing, Acceptance Criteria &amp; Audit
                </p>
              </div>
            </motion.div>

            {/* Center node — You (intersection) */}
            <div
              className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ top: '60%' }}
            >
              <div className="rounded-full border-2 border-slate-700 bg-slate-900 px-5 py-3 text-center shadow-xl">
                <div className="text-sm font-bold text-white">You</div>
                <div className="mt-0.5 text-[10px] font-medium text-slate-300">
                  PO &amp; Scrum Master
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile fallback — Process-style */}
        <div className="grid gap-3 p-4 lg:hidden">
          <div className="rounded-xl border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
            <div className="text-sm font-medium text-foreground">
              Tech &amp; Delivery
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Tech Lead, Devs (x3–5)
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
            <div className="text-sm font-medium text-foreground">Design</div>
            <div className="mt-1 text-sm text-muted-foreground">
              2 Designers
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
            <div className="text-sm font-medium text-foreground">
              Requirements
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Req Manager, Customer PO
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        You sit at the intersection of delivery, requirements, and product
        direction. Flow is kept tight through Tech Lead sync, structured
        ceremonies, and evidence-based stakeholder decisions.
      </p>
    </Card>
  );
}
