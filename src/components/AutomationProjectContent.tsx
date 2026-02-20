'use client';

import {
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUp,
  Car,
  Layers,
  Circle,
  Lock,
  ShieldAlert,
  AlertCircle,
  FileText,
  Globe,
  Clock,
  Bot,
  LayoutGrid,
  Map,
  Search,
  Scissors,
  GitBranch,
  UsersRound,
  FileJson,
  Zap,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const DISCOVERY_STEPS = [
  {
    step: '01',
    title: 'Framing & Workshops',
    description:
      'The client provided two standard processes. Through a focused 2-hour deep dive workshop, we established the technical and business boundaries of what could be automated.',
    isLast: false,
  },
  {
    step: '02',
    title: 'In-Situ Shadowing',
    description:
      'Shadowed two Subject Matter Experts in real-time. We mapped every SAP menu click, ID check, and Excel cross-reference in FigJam to expose the exact mechanical friction points.',
    isLast: false,
  },
  {
    step: '03',
    title: 'Trimming the Fat',
    description:
      'Defined 5 distinct Use Cases. Due to strict budget limitations, we aggressively cut out edge-cases to isolate Use Case 1 (UC1)—the most reliable, high-impact "low-hanging fruit."',
    isLast: false,
  },
  {
    step: '04',
    title: 'Documentation & Handoff',
    description:
      'Consolidated the entire optimized workflow into a comprehensive technical spec sheet, ready for the SAP developers to code.',
    isLast: true,
  },
];

export function AutomationProjectContent() {
  return (
    <div className="space-y-24">
      {/* Quote */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          <blockquote className="border-l-4 border-primary bg-primary/5 p-8 italic text-lg text-zinc-200">
            &ldquo;Operator pushes a part (e.g. new brake component) → K-level
            drops across the chain. Support uses bot-set IDs to find wrongly
            reset items and restores them. The bot saves manual checks and
            reduces the risk of an assembly line stop.&rdquo;
            <footer className="mt-4 not-italic text-sm text-zinc-500">
              — Project Core Logic
            </footer>
          </blockquote>
        </div>

        {/* Impact cards */}
        <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-lg">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Experts Relieved
            </p>
            <p className="mt-2 text-2xl font-mono font-bold tracking-tight text-primary">
              40–50
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-lg">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Recovered Time
            </p>
            <p className="mt-2 text-2xl font-mono font-bold tracking-tight text-primary">
              2–4h / week
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-lg">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Delivery Timeline
            </p>
            <p className="mt-2 text-2xl font-mono font-bold tracking-tight text-primary">
              3 Months
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-lg">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Accuracy (UC1)
            </p>
            <p className="mt-2 text-2xl font-mono font-bold tracking-tight text-primary">
              100%
            </p>
          </div>
        </div>

        {/* V-System vs K-Levels — CSS architectural diagram */}
        <section className="rounded-3xl border border-zinc-800/80 bg-zinc-950/40 p-6 shadow-2xl md:p-10">
          <div className="mb-10 flex flex-col gap-4 sm:gap-6">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary/80">
                The Core Conflict
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
                V-Systems vs. K-Levels
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400">
              This is the architectural clash the bot resolves. Top-down
              V-System templates overwrite local data; bottom-up K-Levels block
              entire vehicle releases if a single overwritten part fails. The
              bot automatically restores these deleted K-level reviews,
              preventing massive manual rework.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* V-System: Top-Down Data Cascade */}
            <div className="group rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 transition-all hover:bg-zinc-900/50">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                    V-System
                  </p>
                  <p className="text-sm font-semibold text-zinc-200">
                    Top-Down Data Cascade
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                  <ArrowDownRight className="h-4 w-4" strokeWidth={2} />
                </div>
              </div>

              <div className="flex flex-col items-stretch px-2">
                <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                      <Car className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        Vehicle
                      </p>
                      <p className="text-sm font-medium text-zinc-200">
                        SUV Platform
                      </p>
                    </div>
                  </div>
                  <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                    Push Template
                  </span>
                </div>
                <div className="mx-auto h-6 w-px bg-gradient-to-b from-zinc-700 to-zinc-800/10" />
                <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 opacity-80 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                      <Layers className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        System
                      </p>
                      <p className="text-sm font-medium text-zinc-300">
                        Braking
                      </p>
                    </div>
                  </div>
                  <span className="rounded bg-zinc-800/50 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                    Inherits
                  </span>
                </div>
                <div className="mx-auto h-6 w-px bg-gradient-to-b from-zinc-700 to-zinc-800/10" />
                <div className="flex items-center justify-between rounded-xl border border-blue-900/30 bg-blue-950/10 px-4 py-3 shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900/50 text-blue-400">
                      <Circle className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
                        Part
                      </p>
                      <p className="text-sm font-medium text-zinc-200">
                        Caliper Variant
                      </p>
                    </div>
                  </div>
                  <span className="rounded border border-blue-800 bg-blue-900/30 px-2 py-0.5 font-mono text-[10px] text-blue-300">
                    Overwritten
                  </span>
                </div>
              </div>
            </div>

            {/* K-Levels: Bottom-Up Blockers */}
            <div className="group rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 transition-all hover:bg-zinc-900/50">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                    K-Levels
                  </p>
                  <p className="text-sm font-semibold text-zinc-200">
                    Bottom-Up Blockers
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <ArrowUpLeft className="h-4 w-4" strokeWidth={2} />
                </div>
              </div>

              <div className="flex flex-col items-center px-2">
                <div className="relative w-full overflow-hidden rounded-t-xl border border-b-0 border-zinc-800 bg-zinc-950 px-4 py-3 opacity-60">
                  <div className="absolute inset-y-0 left-0 w-1 bg-red-500/50" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        Project
                      </p>
                      <p className="text-sm font-medium text-zinc-300">
                        Vehicle SOP
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded border border-red-900/50 bg-red-950/40 px-2 py-1 font-mono text-[10px] font-bold text-red-400">
                      <Lock className="h-3 w-3" strokeWidth={2} />
                      BLOCKED
                    </div>
                  </div>
                </div>
                <div className="h-5 w-px bg-gradient-to-t from-red-500 to-red-900/20" />
                <div className="relative w-full overflow-hidden border-x border-zinc-800 bg-zinc-950 px-4 py-3 opacity-80">
                  <div className="absolute inset-y-0 left-0 w-1 bg-red-500" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        System
                      </p>
                      <p className="text-sm font-medium text-zinc-300">
                        Braking
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded border border-orange-900/50 bg-orange-950/30 px-2 py-1 font-mono text-[10px] font-bold text-orange-400">
                      <ShieldAlert className="h-3 w-3" strokeWidth={2} />
                      REVOKED
                    </div>
                  </div>
                </div>
                <div className="h-5 w-px bg-red-500" />
                <div className="relative w-full overflow-hidden rounded-b-xl border border-red-500/70 border-t-red-500 bg-red-950/20 px-4 py-3 shadow-[0_0_30px_-10px_rgba(239,68,68,0.4)]">
                  <div className="absolute inset-y-0 left-0 w-1 bg-red-500" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-red-300">
                        Part
                      </p>
                      <p className="text-sm font-medium text-zinc-100">
                        Brake Caliper
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded bg-red-600 px-2 py-1 font-mono text-[10px] font-bold text-white">
                      <AlertCircle className="h-3 w-3" strokeWidth={2} />
                      FAILED
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 font-medium text-[11px] text-zinc-400">
                  <ArrowUp className="h-3.5 w-3.5 animate-bounce text-red-500" />
                  <span>
                    Failure at Part level instantly blocks the entire chain.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Scope & Operation */}
        <section className="space-y-14">
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bot className="h-5 w-5" strokeWidth={2} aria-hidden />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  My Scope & Operation
                </h2>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  Process Analyst & Automation Concept Owner
                </p>
              </div>
            </div>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              I led the discovery and automation strategy, acting as the bridge
              between 40+ subject matter experts and the SAP development team. I
              deconstructed manual workflows to deliver a flawless technical
              blueprint.
            </p>

            <section className="w-full max-w-6xl space-y-8 pt-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* The Setup — left panel */}
                <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted/10 p-8 lg:col-span-4">
                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <LayoutGrid className="h-6 w-6" strokeWidth={2} aria-hidden />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      The Setup
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Operating in agile sprints, we moved from an initial
                      business pain point to a fully documented, unblocked SAP
                      development handoff in just 3 months.
                    </p>
                  </div>
                  <div className="mt-10 flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-muted-foreground">Roles</span>
                      <span className="text-sm font-medium text-foreground">
                        Process, UX, Automation
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-muted-foreground">Cadence</span>
                      <span className="text-sm font-medium text-foreground">
                        2-Week Sprints
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-muted-foreground">Timeline</span>
                      <span className="text-sm font-medium text-foreground">
                        3 Months (Idea to PDD)
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-muted-foreground">Team</span>
                      <span className="text-sm font-medium text-foreground">
                        1 Biz, 1 Consultant, 2 SMEs
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-2 pt-1">
                      <span className="text-sm text-muted-foreground">
                        Deliverable
                      </span>
                      <span className="text-sm font-medium text-primary">
                        Technical SAP PDD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Focus areas — right panel */}
                <div className="flex flex-col justify-center gap-10 rounded-2xl border border-border bg-muted/10 p-8 lg:col-span-8">
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                      Discovery & UX Research
                    </h4>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                      <div className="group relative flex cursor-help flex-col items-start gap-3 transition-all hover:z-[100]">
                        <div
                          className="invisible absolute bottom-full left-0 z-50 mb-2 w-56 opacity-0 transition-all duration-300 group-hover:visible group-hover:mb-4 group-hover:opacity-100"
                          role="tooltip"
                        >
                          <div className="rounded-xl border border-border bg-popover/95 p-4 shadow-xl backdrop-blur-md">
                            <p className="mb-3 text-xs leading-relaxed text-popover-foreground">
                              Mapped the exact manual workflow in FigJam before
                              writing any technical rules.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                FigJam
                              </span>
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                As-Is Flow
                              </span>
                            </div>
                          </div>
                        </div>
                        <Map
                          className="h-12 w-12 text-primary transition-transform duration-300 group-hover:-translate-y-1"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <h3 className="text-sm font-semibold text-foreground">
                          Process Mapping
                        </h3>
                      </div>

                      <div className="group relative flex cursor-help flex-col items-start gap-3 transition-all hover:z-[100]">
                        <div
                          className="invisible absolute bottom-full left-0 z-50 mb-2 w-56 opacity-0 transition-all duration-300 group-hover:visible group-hover:mb-4 group-hover:opacity-100"
                          role="tooltip"
                        >
                          <div className="rounded-xl border border-border bg-popover/95 p-4 shadow-xl backdrop-blur-md">
                            <p className="mb-3 text-xs leading-relaxed text-popover-foreground">
                              Sat with 2 experts to observe exact clicks, Excel
                              usage, and mechanical friction.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                Interviews
                              </span>
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                Observation
                              </span>
                            </div>
                          </div>
                        </div>
                        <Search
                          className="h-12 w-12 text-primary transition-transform duration-300 group-hover:-translate-y-1"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <h3 className="text-sm font-semibold text-foreground">
                          In-Situ Shadowing
                        </h3>
                      </div>

                      <div className="group relative flex cursor-help flex-col items-start gap-3 transition-all hover:z-[100]">
                        <div
                          className="invisible absolute bottom-full left-0 z-50 mb-2 w-56 opacity-0 transition-all duration-300 group-hover:visible group-hover:mb-4 group-hover:opacity-100"
                          role="tooltip"
                        >
                          <div className="rounded-xl border border-border bg-popover/95 p-4 shadow-xl backdrop-blur-md">
                            <p className="mb-3 text-xs leading-relaxed text-popover-foreground">
                              Aggressively cut edge-cases to isolate the most
                              reliable &quot;low-hanging fruit.&quot;
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                Scope Trimming
                              </span>
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                Prioritization
                              </span>
                            </div>
                          </div>
                        </div>
                        <Scissors
                          className="h-12 w-12 text-primary transition-transform duration-300 group-hover:-translate-y-1"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <h3 className="text-sm font-semibold text-foreground">
                          Scope Definition
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-border/50" aria-hidden />

                  <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                      Automation Architecture
                    </h4>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                      <div className="group relative flex cursor-help flex-col items-start gap-3 transition-all hover:z-[100]">
                        <div
                          className="invisible absolute bottom-full left-0 z-50 mb-2 w-56 opacity-0 transition-all duration-300 group-hover:visible group-hover:mb-4 group-hover:opacity-100"
                          role="tooltip"
                        >
                          <div className="rounded-xl border border-border bg-popover/95 p-4 shadow-xl backdrop-blur-md">
                            <p className="mb-3 text-xs leading-relaxed text-popover-foreground">
                              Defined the deterministic logic: if a part has
                              historical K-levels, safely restore it.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                Bot Logic
                              </span>
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                ID Matching
                              </span>
                            </div>
                          </div>
                        </div>
                        <GitBranch
                          className="h-12 w-12 text-primary transition-transform duration-300 group-hover:-translate-y-1"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <h3 className="text-sm font-semibold text-foreground">
                          Deterministic Rules
                        </h3>
                      </div>

                      <div className="group relative flex cursor-help flex-col items-start gap-3 transition-all hover:z-[100]">
                        <div
                          className="invisible absolute bottom-full left-0 z-50 mb-2 w-56 opacity-0 transition-all duration-300 group-hover:visible group-hover:mb-4 group-hover:opacity-100"
                          role="tooltip"
                        >
                          <div className="rounded-xl border border-border bg-popover/95 p-4 shadow-xl backdrop-blur-md">
                            <p className="mb-3 text-xs leading-relaxed text-popover-foreground">
                              Established routing for edge cases so the bot
                              hands complex issues back to humans.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                Exceptions
                              </span>
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                Routing
                              </span>
                            </div>
                          </div>
                        </div>
                        <UsersRound
                          className="h-12 w-12 text-primary transition-transform duration-300 group-hover:-translate-y-1"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <h3 className="text-sm font-semibold text-foreground">
                          Human-in-the-Loop
                        </h3>
                      </div>

                      <div className="group relative flex cursor-help flex-col items-start gap-3 transition-all hover:z-[100]">
                        <div
                          className="invisible absolute bottom-full left-0 z-50 mb-2 w-56 opacity-0 transition-all duration-300 group-hover:visible group-hover:mb-4 group-hover:opacity-100"
                          role="tooltip"
                        >
                          <div className="rounded-xl border border-border bg-popover/95 p-4 shadow-xl backdrop-blur-md">
                            <p className="mb-3 text-xs leading-relaxed text-popover-foreground">
                              Authored the 36-page PDD, aligning the exact scope
                              for SAP backend developers.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                PDD Specs
                              </span>
                              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                                Handoff
                              </span>
                            </div>
                          </div>
                        </div>
                        <FileJson
                          className="h-12 w-12 text-primary transition-transform duration-300 group-hover:-translate-y-1"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <h3 className="text-sm font-semibold text-foreground">
                          Technical Blueprint
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>

        {/* Discovery to Blueprint: Process (KoVoN-style) → Output */}
        <section className="mx-auto w-full max-w-5xl space-y-12 py-12">
          <div className="mb-4 flex flex-col items-center gap-2 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Discovery to Blueprint
            </h2>
            <p className="text-muted-foreground">
              How we translated manual friction into executable RPA logic in 3
              months.
            </p>
          </div>

          <div className="relative flex flex-col gap-6">
            <div
              className="absolute bottom-10 left-[40px] top-10 w-px border-l-2 border-dashed border-border/60 sm:left-[56px]"
              aria-hidden
            />
            {DISCOVERY_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="group relative flex items-stretch overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_40px_-15px_rgba(var(--primary),0.2)]"
              >
                <div
                  className={
                    item.isLast
                      ? 'relative z-10 flex w-20 shrink-0 flex-col items-center justify-center border-r border-border bg-primary/10 transition-colors duration-500 sm:w-28'
                      : 'relative z-10 flex w-20 shrink-0 flex-col items-center justify-center border-r border-border bg-muted/30 transition-colors duration-500 group-hover:bg-primary/10 sm:w-28'
                  }
                >
                  <span className="absolute top-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 transition-colors group-hover:text-primary/70">
                    Step
                  </span>
                  <span
                    className={
                      item.isLast
                        ? 'text-5xl font-black tracking-tighter text-primary sm:text-7xl'
                        : 'text-5xl font-black tracking-tighter text-muted-foreground/30 transition-colors duration-500 group-hover:text-primary sm:text-7xl'
                    }
                  >
                    {index + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                  <h3
                    className={
                      item.isLast
                        ? 'text-xl font-semibold tracking-tight text-primary transition-colors group-hover:text-primary'
                        : 'text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary'
                    }
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* The 36-Page PDD output */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_40px_-15px_rgba(var(--primary),0.2)] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1 max-w-3xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-primary/10">
                  <FileText
                    className="h-7 w-7 text-primary"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3 className="cursor-help text-2xl font-bold tracking-tight text-foreground underline decoration-dotted decoration-muted-foreground/50 underline-offset-2 hover:decoration-primary/70 sm:text-3xl">
                        The 36-Page PDD
                      </h3>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-sm p-4 text-left"
                      sideOffset={8}
                    >
                      <p className="text-xs font-medium text-popover-foreground">
                        Process Design Document (PDD)
                      </p>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                        A critical RPA document that details the &quot;As-Is&quot;
                        (current) and &quot;To-Be&quot; (automated) states of a
                        process. It maps steps, rules, exceptions, and data
                        requirements—acting as a blueprint for developers.
                        PDD = what the process does; SDD = how the robot
                        implements it.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Instead of handing over vague user stories, we delivered a
                  comprehensive 36-page PDD for Use Case 1. It eliminated all
                  guesswork for the IT team, detailing the &quot;As-Is&quot;
                  manual state and the &quot;To-Be&quot; automated logic.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
                <FileText
                  className="mb-2 h-5 w-5 text-muted-foreground"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-2xl font-mono font-bold text-foreground">
                  36 Pages
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Technical Spec
                </span>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  A complete architectural blueprint bridging business needs
                  and SAP execution.
                </p>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
                <Globe
                  className="mb-2 h-5 w-5 text-muted-foreground"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-2xl font-mono font-bold text-foreground">
                  100%
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Clicks & Screens
                </span>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Documented every single click, edge-case, and SAP screenshot
                  required for UC1.
                </p>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-6 transition-colors hover:bg-muted/40">
                <Clock
                  className="mb-2 h-5 w-5 text-muted-foreground"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-2xl font-mono font-bold text-foreground">
                  1 Hour
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Dev Handoff
                </span>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  The document was so precise, we aligned and overhanded the
                  entire logic to SAP devs in a single 60-minute appointment.
                </p>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/5 p-6 transition-colors hover:bg-primary/10">
                <Zap
                  className="mb-2 h-5 w-5 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-2xl font-mono font-bold text-primary">
                  ~7,000h
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
                  Saved Annually
                </span>
                <p className="mt-1 text-[11px] text-primary/60">
                  Calculated ROI: 45 experts recovering ~3 hours per week over
                  a 52-week production cycle.
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
