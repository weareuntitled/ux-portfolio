'use client';

import { User, FileCheck, Code } from 'lucide-react';

/** Working Circle: Design, Requirements, Development with Daniel Peters at center (Alignment) */
export function WorkingCircle() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Working Circle
      </h2>

      <div className="relative mt-10 flex flex-col items-center rounded-xl border border-border bg-muted/10 p-8 sm:p-12">
        <div className="relative flex w-full max-w-3xl justify-between">
          <div
            className="absolute left-[15%] right-[15%] top-[30px] -z-10 h-[2px] bg-amber-200/70"
            aria-hidden
          />
          <div
            className="absolute left-1/2 top-[30px] -z-10 h-[55px] w-[2px] -translate-x-1/2 bg-amber-200/70"
            aria-hidden
          />

          <div className="group relative z-20 flex w-[110px] cursor-help hover:z-[100] flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm transition-colors hover:border-primary/50 sm:w-[140px]">
            <div
              className="invisible absolute left-1/2 top-full z-[100] mt-2 w-48 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:mt-3 group-hover:opacity-100"
              role="tooltip"
            >
              <div className="rounded-lg border border-border bg-popover/95 p-3 text-popover-foreground shadow-xl backdrop-blur-sm">
                <h4 className="mb-2 border-b border-border/50 pb-1 text-xs font-semibold text-foreground">
                  Design Focus
                </h4>
                <ul className="space-y-1.5 text-[11px] leading-tight text-muted-foreground">
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Figma & Prototypes
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Monthly User Testings
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Angular Components
                  </li>
                </ul>
              </div>
            </div>
            <User
              className="h-5 w-5 text-primary transition-transform group-hover:scale-110"
              aria-hidden
            />
            <span className="text-xs font-semibold text-foreground">Design</span>
            <span className="text-center text-[10px] leading-tight text-muted-foreground">
              2 Designers
            </span>
          </div>

          <div className="group relative z-20 flex w-[110px] cursor-help hover:z-[100] flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm transition-colors hover:border-primary/50 sm:w-[140px]">
            <div
              className="invisible absolute left-1/2 top-full z-[100] mt-2 w-52 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:mt-3 group-hover:opacity-100"
              role="tooltip"
            >
              <div className="rounded-lg border border-border bg-popover/95 p-3 text-popover-foreground shadow-xl backdrop-blur-sm">
                <h4 className="mb-2 border-b border-border/50 pb-1 text-xs font-semibold text-foreground">
                  Requirements Focus
                </h4>
                <ul className="space-y-1.5 text-[11px] leading-tight text-muted-foreground">
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Dailys, Pitches &
                    Trainings
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Powerpoint
                    Presentations
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Standardized ARIS
                    Processes
                  </li>
                </ul>
              </div>
            </div>
            <FileCheck
              className="h-5 w-5 text-primary transition-transform group-hover:scale-110"
              aria-hidden
            />
            <span className="text-xs font-semibold text-foreground">
              Requirements
            </span>
            <span className="text-center text-[10px] leading-tight text-muted-foreground">
              Req Mgr, PO
            </span>
          </div>

          <div className="group relative z-20 flex w-[110px] cursor-help hover:z-[100] flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm transition-colors hover:border-primary/50 sm:w-[140px]">
            <div
              className="invisible absolute left-1/2 top-full z-[100] mt-2 w-48 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:mt-3 group-hover:opacity-100"
              role="tooltip"
            >
              <div className="rounded-lg border border-border bg-popover/95 p-3 text-popover-foreground shadow-xl backdrop-blur-sm">
                <h4 className="mb-2 border-b border-border/50 pb-1 text-xs font-semibold text-foreground">
                  Development Focus
                </h4>
                <ul className="space-y-1.5 text-[11px] leading-tight text-muted-foreground">
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Security Audits
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Iterative
                    Development
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Scrum Methodology
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary">›</span> Capacity Planning
                  </li>
                </ul>
              </div>
            </div>
            <Code
              className="h-5 w-5 text-primary transition-transform group-hover:scale-110"
              aria-hidden
            />
            <span className="text-xs font-semibold text-foreground">
              Development
            </span>
            <span className="text-center text-[10px] leading-tight text-muted-foreground">
              Tech Lead, Devs
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-12 flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-primary bg-background p-4 text-center shadow-[0_0_30px_-10px_rgba(var(--primary),0.2)]">
          <div
            className="absolute left-1/2 top-full -z-10 h-[50px] w-[2px] -translate-x-1/2 bg-amber-200/70"
            aria-hidden
          />
          <span className="text-sm font-bold text-foreground">
            Daniel Peters
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-primary">
            Alignment
          </span>
        </div>

        <div className="mt-12 flex w-full max-w-xl justify-between border-t border-border pt-6 text-center">
          <span className="flex-1 text-sm font-medium text-foreground">
            Strategy
          </span>
          <span className="flex-1 text-sm font-medium text-foreground">
            Organisational Task
          </span>
          <span className="flex-1 text-sm font-medium text-foreground">
            Delivery
          </span>
        </div>

        <p className="mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          I connected delivery, product direction, and stakeholder decisions,
          keeping execution unblocked through tight Tech Lead alignment.
        </p>
      </div>
    </section>
  );
}
