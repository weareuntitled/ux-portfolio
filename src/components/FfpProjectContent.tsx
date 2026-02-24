'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown, LayoutDashboard, LayoutGrid, Search } from 'lucide-react';
import { BrowserMockup } from '@/components/PortfolioKit';
import { SolutionConceptCards } from '@/components/project/SolutionConceptCards';
import { MethodologyTimeline } from '@/components/project/MethodologyTimeline';
import type { ResolvedProject } from '@/lib/cms/types';

const FFP_SOLUTION_CONCEPTS = [
  {
    icon: ChevronDown,
    title: 'The GitHub-Style Merge',
    description:
      "Merging duplicate cases was previously the biggest bottleneck. By modeling the dashboard's merge UI after GitHub (a paradigm these engineers already deeply understood), we turned a confusing chore into a confident, lightning-fast workflow.",
  },
  {
    icon: LayoutGrid,
    title: 'Progressive Disclosure',
    description:
      'Users were drowning in raw data because they were shown everything at once. We designed an adaptive UI: clean, guided entry points to onboard beginners, with high-density data tables just one click away for the power users.',
  },
  {
    icon: Search,
    title: 'Symptom-First Architecture',
    description:
      'We abandoned the legacy "Database-First" layout. Engineers do not search for a part number. They search for an "Engine Whine." By realigning the taxonomy to the actual human symptom, triage time plummeted.',
  },
];

const FFP_METHODOLOGY_STEPS = [
  {
    number: '01',
    title: 'Context Shadowing',
    description:
      'Observed experts in-situ to understand how they work with returns, diagnosis data, and existing fingerprints.',
  },
  {
    number: '02',
    title: 'Role Alignment',
    description:
      'Aligned tasks with a new role model. Identified exactly who assesses incoming cases, who merges them, and what info they need at each stage.',
  },
  {
    number: '03',
    title: 'Iterative Screen Design',
    description:
      'Built Figma prototypes iteratively while development ran in parallel. The prototype became the living concept document.',
  },
  {
    number: '04',
    title: 'Live Prototype Handoff',
    description:
      'Delivered a comprehensive navigation concept, from tagging to diagnosis to reporting, packaged cleanly for the dev team.',
    highlight: true,
  },
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

export type FfpProjectContentProps = {
  project?: ResolvedProject | null;
  hideScreenshots?: boolean;
};

export function FfpProjectContent({ project, hideScreenshots }: FfpProjectContentProps) {
  return (
    <div className="space-y-24">
      {/* Quote */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <blockquote className="border-l-4 border-primary bg-primary/5 p-8 text-lg italic text-zinc-200">
          &quot;Finding similarities in massive tables was a nightmare. The UI never surfaced the right
          context, creating a massive bottleneck. When we showed them the new GitHub-style merge flow,
          it clicked instantly. It finally fit their mental model.&quot;
          <footer className="mt-4 flex items-center gap-2 text-sm font-medium not-italic text-zinc-500">
            <span className="h-px w-4 bg-zinc-600" />
            The Breakthrough Moment
          </footer>
        </blockquote>
      </div>

      {/* Designing the Solution */}
      <SolutionConceptCards
        title="Designing the Solution"
        subtitle="Untangling data silos with progressive disclosure and familiar mental models."
        items={FFP_SOLUTION_CONCEPTS}
      />

      {/* Screenshot (optional) */}
      {!hideScreenshots && (
        <section className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
          <BrowserMockup
            src={project?.galleryUrls?.[0] ?? '/projects/ffp_gallery_01.png'}
            alt="FFP Dashboard"
            urlBar="https://ffp-dashboard.internal"
          />
        </section>
      )}

      {/* UX Methodology */}
      <MethodologyTimeline title="UX Methodology" steps={FFP_METHODOLOGY_STEPS} />

      {/* Experience the Dashboard CTA */}
      <section className="space-y-12 py-12">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-zinc-900/50 p-1 shadow-[0_0_40px_-15px_rgba(var(--primary),0.2)]">
          <div className="relative flex flex-col items-center rounded-[22px] border border-zinc-800/80 bg-zinc-950 p-10 text-center sm:p-16">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-inner">
              <LayoutDashboard className="h-10 w-10 text-primary" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="mb-4 text-3xl font-bold tracking-tight text-zinc-100">
              Experience the Dashboard
            </h3>
            <p className="mb-8 max-w-lg leading-relaxed text-zinc-400">
              Words only go so far. Explore the interactive prototype to see the symptom-first navigation
              and GitHub-style merge flow in action.
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
      </section>
    </div>
  );
}
