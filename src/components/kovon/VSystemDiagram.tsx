'use client';

import { ArrowDownRight, Layers, CarFront, Cog } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

/**
 * V-System view: Vehicle → System → Part
 * Top-down cascade, parent overwrites child.
 */
export function VSystemDiagram() {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
              V-System
            </p>
            <p className="text-sm font-semibold text-zinc-100">
              Top-down cascade
            </p>
          </div>
          <ArrowDownRight className="h-4 w-4 text-zinc-500" aria-hidden />
        </div>

        <StaggerContainer className="flex flex-col items-stretch gap-4">
          {/* Vehicle */}
          <StaggerItem>
            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-100">
                  <CarFront className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-500">
                    Vehicle
                  </p>
                  <p className="text-sm font-semibold text-zinc-100">
                    Product line (e.g. SUV platform)
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                K-template
              </span>
            </div>
          </StaggerItem>

          {/* Connector */}
          <div className="mx-auto h-5 w-px bg-gradient-to-b from-zinc-700 to-zinc-800/10" aria-hidden />

          {/* System */}
          <StaggerItem>
            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-100">
                  <Layers className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-500">
                    System
                  </p>
                  <p className="text-sm font-semibold text-zinc-100">
                    Brake system
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-zinc-900/80 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                Inherits Vehicle
              </span>
            </div>
          </StaggerItem>

          {/* Connector */}
          <div className="mx-auto h-5 w-px bg-gradient-to-b from-zinc-700 to-zinc-800/10" aria-hidden />

          {/* Part */}
          <StaggerItem>
            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-100">
                  <Cog className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-500">
                    Part
                  </p>
                  <p className="text-sm font-semibold text-zinc-100">
                    Brake caliper variant
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-zinc-900/80 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
                Overwritten last
              </span>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <p className="mt-4 text-[11px] leading-relaxed text-zinc-400">
          Settings flow from Vehicle → System → Part. If you change the Vehicle
          template, it cascades down and overwrites defaults below unless a
          local override exists.
        </p>
      </div>
    </FadeIn>
  );
}

