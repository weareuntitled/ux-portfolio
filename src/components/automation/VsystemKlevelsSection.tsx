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
} from 'lucide-react';

/**
 * V-Systems vs. K-Levels diagram for SAP process automation.
 * Matches the reference design exactly: two-column layout (top-down cascade vs bottom-up blockers).
 */
export function VsystemKlevelsSection() {
  return (
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
          This is the architectural clash the bot resolves. Top-down V-System
          templates overwrite local data; bottom-up K-Levels block entire
          vehicle releases if a single overwritten part fails. The bot
          automatically restores these deleted K-level reviews, preventing
          massive manual rework.
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
                  <p className="text-sm font-medium text-zinc-300">Braking</p>
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
                  <p className="text-sm font-medium text-zinc-300">Braking</p>
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
  );
}
