'use client';

import Link from 'next/link';
import {
  ChevronDown,
  LayoutGrid,
  Search,
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react';
import { BrowserMockup } from '@/components/PortfolioKit';
import type { ResolvedProject } from '@/lib/cms/types';

/** Default FFP gallery images when project.galleryUrls is not set. */
const FFP_GALLERY_URLS = [
  '/projects/ffp_gallery_01.png',
  '/projects/ffp_gallery_02.png',
  '/projects/ffp_gallery_03.png',
  '/projects/ffp_gallery_04.png',
  '/projects/ffp_gallery_05.png',
  '/projects/ffp_gallery_06.png',
  '/projects/ffp_gallery_07.png',
  '/projects/ffp_gallery_08.png',
  '/projects/ffp_gallery_09.png',
  '/projects/ffp_gallery_10.png',
  '/projects/ffp_gallery_11.png',
  '/projects/ffp_gallery_12.png',
];

/** Stats grid for FFP hero (used as ProjectCaseStudyHero children). */
export function FfpHeroStats() {
  return (
    <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
      <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
        <span className="text-2xl font-mono font-bold text-primary">1:1</span>
        <span className="text-xs font-medium text-zinc-400">Correlation Latency</span>
      </div>
      <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
        <span className="text-2xl font-mono font-bold text-primary">Eliminated</span>
        <span className="text-xs font-medium text-zinc-400">Merge Bottlenecks</span>
      </div>
      <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
        <span className="text-2xl font-mono font-bold text-primary">Adaptive</span>
        <span className="text-xs font-medium text-zinc-400">Beginner to Expert UI</span>
      </div>
    </div>
  );
}

type FfpProjectContentProps = { project?: ResolvedProject | null };

export function FfpProjectContent({ project }: FfpProjectContentProps) {
  const galleryUrls = project?.galleryUrls?.length ? project.galleryUrls : FFP_GALLERY_URLS;

  return (
    <div className="space-y-24">
      {/* Quote */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <blockquote className="border-l-4 border-primary bg-primary/5 p-8 text-lg italic text-zinc-200">
            &quot;Finding similarities in massive tables was a nightmare. The UI
            never surfaced the right context, creating a massive bottleneck.
            When we showed them the new GitHub-style merge flow, it clicked
            instantly. It finally fit their mental model.&quot;
            <footer className="mt-4 flex items-center gap-2 text-sm font-medium not-italic text-zinc-500">
              <span className="h-px w-4 bg-zinc-600" />
              The Breakthrough Moment
            </footer>
          </blockquote>
        </div>

        {/* Designing the Solution */}
        <section className="w-full space-y-8 py-8">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
              Designing the Solution
            </h2>
            <p className="text-zinc-400">
              Untangling data silos with progressive disclosure and familiar
              mental models.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="group flex flex-col items-start gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-primary/50 hover:bg-zinc-900/60 sm:flex-row">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 shadow-sm transition-all group-hover:scale-105 group-hover:border-primary/50">
                <ChevronDown
                  className="h-6 w-6 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-primary">
                  The GitHub-Style Merge
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Merging duplicate cases was previously the biggest bottleneck.
                  By modeling the dashboard&apos;s merge UI after GitHub (a
                  paradigm these engineers already deeply understood), we turned
                  a confusing chore into a confident, lightning-fast workflow.
                </p>
              </div>
            </div>

            <div className="group flex flex-col items-start gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-primary/50 hover:bg-zinc-900/60 sm:flex-row">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 shadow-sm transition-all group-hover:scale-105 group-hover:border-primary/50">
                <LayoutGrid
                  className="h-6 w-6 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-primary">
                  Progressive Disclosure
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Users were drowning in raw data because they were shown
                  everything at once. We designed an adaptive UI: clean, guided
                  entry points to onboard beginners, with high-density data
                  tables just one click away for the power users.
                </p>
              </div>
            </div>

            <div className="group flex flex-col items-start gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-primary/50 hover:bg-zinc-900/60 sm:flex-row">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 shadow-sm transition-all group-hover:scale-105 group-hover:border-primary/50">
                <Search
                  className="h-6 w-6 text-primary"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-primary">
                  Symptom-First Architecture
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  We abandoned the legacy &quot;Database-First&quot; layout.
                  Engineers don&apos;t search for a part number; they search for
                  an &quot;Engine Whine.&quot; By realigning the taxonomy to the
                  actual human symptom, triage time plummeted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mockup — browser frame below concepts */}
        <section className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
          <BrowserMockup
            src={galleryUrls[0] ?? '/projects/ffp_gallery_01.png'}
            alt="FFP Dashboard"
            urlBar="https://ffp-dashboard.internal"
            useNextImage={true}
            screens={galleryUrls}
            autoAdvanceMs={5000}
            className="border-0 shadow-none"
          />
        </section>

        {/* UX Methodology */}
        <section className="max-w-3xl space-y-12 py-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
              UX Methodology
            </h2>
          </div>

          <div className="relative pl-4 sm:pl-6">
            <div
              className="absolute left-[27px] top-4 bottom-4 w-px bg-zinc-800 sm:left-[35px]"
              aria-hidden
            />

            <div className="space-y-10">
              <div className="relative flex items-start gap-6">
                <div className="absolute -left-4 flex h-7 w-7 items-center justify-center rounded-full border-4 border-zinc-950 bg-zinc-800 text-[10px] font-bold text-zinc-300 sm:-left-3.5 sm:h-9 sm:w-9 sm:text-xs">
                  01
                </div>
                <div className="ml-8 pt-1 sm:ml-10 sm:pt-1.5">
                  <h4 className="text-lg font-semibold text-zinc-200">
                    Context Shadowing
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Observed experts in-situ to understand how they work with
                    returns, diagnosis data, and existing fingerprints.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="absolute -left-4 flex h-7 w-7 items-center justify-center rounded-full border-4 border-zinc-950 bg-zinc-800 text-[10px] font-bold text-zinc-300 sm:-left-3.5 sm:h-9 sm:w-9 sm:text-xs">
                  02
                </div>
                <div className="ml-8 pt-1 sm:ml-10 sm:pt-1.5">
                  <h4 className="text-lg font-semibold text-zinc-200">
                    Role Alignment
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Aligned tasks with a new role model. Identified exactly who
                    assesses incoming cases, who merges them, and what info they
                    need at each stage.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="absolute -left-4 flex h-7 w-7 items-center justify-center rounded-full border-4 border-zinc-950 bg-zinc-800 text-[10px] font-bold text-zinc-300 sm:-left-3.5 sm:h-9 sm:w-9 sm:text-xs">
                  03
                </div>
                <div className="ml-8 pt-1 sm:ml-10 sm:pt-1.5">
                  <h4 className="text-lg font-semibold text-zinc-200">
                    Iterative Screen Design
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Built Figma prototypes iteratively while development ran in
                    parallel. The prototype became the living concept document.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="absolute -left-4 flex h-7 w-7 items-center justify-center rounded-full border-4 border-zinc-950 bg-primary/20 text-[10px] font-bold text-primary shadow-[0_0_15px_rgba(var(--primary),0.4)] sm:-left-3.5 sm:h-9 sm:w-9 sm:text-xs">
                  04
                </div>
                <div className="ml-8 pt-1 sm:ml-10 sm:pt-1.5">
                  <h4 className="text-lg font-semibold text-primary">
                    Live Prototype Handoff
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Delivered a comprehensive navigation concept—from tagging to
                    diagnosis to reporting—packaged perfectly for the dev team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience the Dashboard CTA + Gallery */}
        <section className="space-y-12 py-12">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-zinc-900/50 p-1 shadow-[0_0_40px_-15px_rgba(var(--primary),0.2)]">
            <div className="relative flex flex-col items-center rounded-[22px] border border-zinc-800/80 bg-zinc-950 p-10 text-center sm:p-16">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-inner">
                <LayoutDashboard
                  className="h-10 w-10 text-primary"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <h3 className="mb-4 text-3xl font-bold tracking-tight text-zinc-100">
                Experience the Dashboard
              </h3>
              <p className="mb-8 max-w-lg leading-relaxed text-zinc-400">
                Words only go so far. Explore the interactive prototype to see
                the symptom-first navigation and GitHub-style merge flow in
                action.
              </p>
              <Link
                href="/prototypes/ffp/fingerprints"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-1 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Open Live Prototype
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-100">
              Gallery
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" />
          </div>
        </section>
    </div>
  );
}
