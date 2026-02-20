'use client';

import Image from 'next/image';
import { CircleDot, LayoutGrid } from 'lucide-react';
import type { ResolvedProject } from '@/lib/cms/types';
import { BrowserMockup } from '@/components/PortfolioKit';

/** Default CAESAR gallery images when project.galleryUrls is not set. */
const CAESAR_GALLERY_URLS = [
  '/projects/ceasar_gallery_01.png',
  '/projects/ceasar_gallery_02.png',
  '/projects/ceasar_gallery_03.png',
  '/projects/ceasar_gallery_04.png',
  '/projects/ceasar_gallery_05.png',
  '/projects/ceasar_gallery_06.png',
  '/projects/ceasar_gallery_07.png',
  '/projects/ceasar_gallery_08.png',
  '/projects/ceasar_gallery_09.png',
  '/projects/ceasar_gallery_10.png',
  '/projects/ceasar_gallery_11.png',
];

/** Stats grid for CAESAR hero (used as ProjectCaseStudyHero children). */
export function CaesarHeroStats() {
  return (
    <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-4">
      <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
        <span className="text-2xl font-mono font-bold text-primary">Pre-Report</span>
        <span className="text-xs font-medium text-zinc-400">Anomaly Detection</span>
      </div>
      <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
        <span className="text-2xl font-mono font-bold text-primary">Clear</span>
        <span className="text-xs font-medium text-zinc-400">Threshold Visibility</span>
      </div>
      <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
        <span className="text-2xl font-mono font-bold text-primary">Bulk</span>
        <span className="text-xs font-medium text-zinc-400">Lasso Adjustments</span>
      </div>
      <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
        <span className="text-2xl font-mono font-bold text-primary">Higher</span>
        <span className="text-xs font-medium text-zinc-400">Reporting Quality</span>
      </div>
    </div>
  );
}

type CaesarProjectContentProps = {
  project?: ResolvedProject;
};

export function CaesarProjectContent({ project }: CaesarProjectContentProps) {
  const galleryUrls = project?.galleryUrls?.length ? project.galleryUrls : CAESAR_GALLERY_URLS;

  return (
    <div className="space-y-24">
      {/* Quote */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <blockquote className="border-l-4 border-primary bg-primary/5 p-8 text-lg italic text-zinc-200">
            &quot;Too many tables created aggressive visual clutter. Experts couldn&apos;t easily spot critical outliers in the test data before pushing reports to compliance, meaning quality suffered. The anomalies were literally buried in flat data.&quot;
            <footer className="mt-4 flex items-center gap-2 not-italic text-sm font-medium text-zinc-500">
              <span className="h-px w-4 bg-zinc-600" aria-hidden />
              The Legacy Pain Point
            </footer>
          </blockquote>
        </div>

        {/* Project Context */}
        <section className="w-full space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">Project Context</h2>
            <p className="text-zinc-400">Protecting automotive compliance through data visualization.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 lg:col-span-4">
              <div>
                <h3 className="text-xl font-semibold text-zinc-100">The Operation</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Operating as the UX Designer, I led a rapid exploration phase to find the right visual metaphor to replace the legacy tables. The goal was to build an explorative UI that naturally draws the expert&apos;s eye to threshold breaches.
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-sm text-zinc-500">Client</span>
                  <span className="text-sm font-medium text-zinc-200">Automotive Konzern</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm text-zinc-500">Output</span>
                  <span className="text-sm font-medium text-primary">UI/UX Implementation</span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all hover:border-primary/50 hover:shadow-[0_10px_30px_-15px_rgba(var(--primary),0.2)] lg:col-span-8">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" aria-hidden />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-100">Visualizing the Outliers</h3>
                  <p className="mt-2 max-w-md text-sm text-zinc-400">
                    By moving away from strict row/column layouts, we introduced list-wise color coding and spatial thresholds, making it impossible for a user to accidentally report a failing test.
                  </p>
                </div>
                <div className="mt-8 flex h-32 w-full items-end gap-2 border-b border-zinc-800 pb-2 pl-2">
                  <div className="h-[20%] w-full rounded-t-sm bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
                  <div className="h-[35%] w-full rounded-t-sm bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
                  <div className="h-[15%] w-full rounded-t-sm bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
                  <div className="h-[45%] w-full rounded-t-sm bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
                  <div className="relative h-[95%] w-full rounded-t-sm bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded border border-red-900/50 bg-red-950 px-2 py-0.5 text-[9px] font-bold text-red-400">
                      BREACH
                    </div>
                  </div>
                  <div className="h-[25%] w-full rounded-t-sm bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
                  <div className="h-[40%] w-full rounded-t-sm bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
                  <div className="h-[20%] w-full rounded-t-sm bg-zinc-800 transition-colors group-hover:bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interaction Concepts */}
        <section className="w-full space-y-8 py-8">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">Interaction Concepts</h2>
            <p className="text-zinc-400">Advanced controls built for expert-level data manipulation.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="group flex flex-col items-start gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-primary/50 hover:bg-zinc-900/60 sm:flex-row">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 shadow-sm transition-all group-hover:scale-105 group-hover:border-primary/50">
                <CircleDot className="h-6 w-6 text-primary" strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-primary">
                  Lasso-Selection & Bulk Overrides
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Experts don&apos;t want to adjust anomalies one by one. I introduced a lasso-selection tool allowing users to drag and select multiple data points at once, instantly applying Global vs. Local threshold overrides in bulk.
                </p>
              </div>
            </div>

            <div className="group flex flex-col items-start gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-primary/50 hover:bg-zinc-900/60 sm:flex-row">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 shadow-sm transition-all group-hover:scale-105 group-hover:border-primary/50">
                <LayoutGrid className="h-6 w-6 text-primary" strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-primary">
                  De-cluttering the Hierarchy
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  By removing redundant table borders and introducing strict typographical hierarchy and list-wise color coding, the interface naturally guides the user&apos;s eye to the most critical, actionable data first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mockup — browser frame below concepts */}
        <section className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
          <BrowserMockup
            src={galleryUrls[0] ?? '/projects/ceasar_gallery_01.png'}
            alt="CAESAR Dashboard"
            urlBar="https://caesar-emission-dashboard.internal"
            useNextImage={true}
            screens={galleryUrls}
            autoAdvanceMs={5000}
            className="border-0 shadow-none"
          />
        </section>

        {/* Design Methodology */}
        <section className="max-w-3xl space-y-12 py-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">Design Methodology</h2>
          </div>

          <div className="relative pl-4 sm:pl-6">
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-zinc-800 sm:left-[35px]" aria-hidden />

            <div className="space-y-10">
              <div className="relative flex items-start gap-6">
                <div className="absolute -left-4 flex h-7 w-7 items-center justify-center rounded-full border-4 border-zinc-950 bg-zinc-800 text-[10px] font-bold text-zinc-300 sm:-left-3.5 sm:h-9 sm:w-9 sm:text-xs">
                  01
                </div>
                <div className="ml-8 pt-1 sm:ml-10 sm:pt-1.5">
                  <h4 className="text-lg font-semibold text-zinc-200">Data Exploration</h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Began with an initial exploration of raw emission values, mapping out how the current table clutter was obscuring the data story.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="absolute -left-4 flex h-7 w-7 items-center justify-center rounded-full border-4 border-zinc-950 bg-zinc-800 text-[10px] font-bold text-zinc-300 sm:-left-3.5 sm:h-9 sm:w-9 sm:text-xs">
                  02
                </div>
                <div className="ml-8 pt-1 sm:ml-10 sm:pt-1.5">
                  <h4 className="text-lg font-semibold text-zinc-200">Rapid Prototyping</h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Executed two high-speed, high-fidelity design iterations to test and find the perfect visual metaphor for the experts.
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="absolute -left-4 flex h-7 w-7 items-center justify-center rounded-full border-4 border-zinc-950 bg-primary/20 text-[10px] font-bold text-primary shadow-[0_0_15px_rgba(var(--primary),0.4)] sm:-left-3.5 sm:h-9 sm:w-9 sm:text-xs">
                  03
                </div>
                <div className="ml-8 pt-1 sm:ml-10 sm:pt-1.5">
                  <h4 className="text-lg font-semibold text-primary">Implementation Handover</h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Delivered the finalized, de-cluttered UI specs, ensuring anomalies surface clearly before reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery — always last on every project */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-100">Gallery</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryUrls.map((url) => (
              <div
                key={url}
                className="group relative aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-all hover:scale-[1.02] hover:border-primary/50"
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover transition-opacity group-hover:opacity-95"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}
