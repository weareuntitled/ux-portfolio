'use client';

import { ShieldAlert, Lock, ArrowUp } from 'lucide-react';

/**
 * "Dependency Stack" / "Maturity Cascade" visualization.
 * Bottom-up: Part → System → Vehicle. If the bottom is Red, the top cannot be Green.
 * The chain is only as strong as its weakest link.
 */
export function KLevelStack() {
  return (
    <div className="flex flex-col items-center space-y-0 w-full max-w-sm mx-auto">
      {/* LEVEL 3: VEHICLE (The Consequence) */}
      <div className="w-full relative overflow-hidden rounded-t-xl border border-red-900/40 border-b-0 bg-card/50 opacity-60">
        <div className="absolute inset-y-0 left-0 w-1 bg-red-500/60" aria-hidden />
        <div className="p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Project level
            </div>
            <div className="text-sm font-semibold text-foreground">Vehicle project</div>
          </div>
          <div className="flex items-center gap-1.5 text-red-400 bg-red-950/40 px-2.5 py-1 rounded-full border border-red-900/50">
            <Lock size={12} className="shrink-0" />
            <span className="text-[10px] font-bold">BLOCKED</span>
          </div>
        </div>
      </div>

      {/* Connection: propagation */}
      <div className="h-4 w-px bg-gradient-to-t from-red-500 to-red-900/20" aria-hidden />

      {/* LEVEL 2: SYSTEM (The Victim) */}
      <div className="w-full relative overflow-hidden border-x border-red-900/40 bg-card/75 opacity-80">
        <div className="absolute inset-y-0 left-0 w-1 bg-red-500" aria-hidden />
        <div className="p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              System level
            </div>
            <div className="text-sm font-semibold text-foreground">Braking module</div>
          </div>
          <div className="flex items-center gap-1.5 text-orange-400 bg-orange-950/30 px-2.5 py-1 rounded-full border border-orange-900/50">
            <ShieldAlert size={12} className="shrink-0" />
            <span className="text-[10px] font-bold">REVOKED</span>
          </div>
        </div>
      </div>

      {/* Connection */}
      <div className="h-4 w-px bg-red-500" aria-hidden />

      {/* LEVEL 1: PART (The Cause) */}
      <div className="w-full relative overflow-hidden rounded-b-xl border border-red-500/70 border-t-red-500 bg-red-950/20 shadow-[0_0_24px_-8px_rgba(239,68,68,0.25)]">
        <div className="absolute inset-y-0 left-0 w-1 bg-red-500" aria-hidden />
        <div className="p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-red-300 uppercase tracking-wider">
              Part level
            </div>
            <div className="text-sm font-semibold text-foreground">Brake caliper</div>
          </div>
          <div className="flex items-center gap-1.5 text-white bg-red-600 px-2.5 py-1 rounded-full shadow-sm">
            <ShieldAlert size={12} className="shrink-0" />
            <span className="text-[10px] font-bold">FAILED</span>
          </div>
        </div>
      </div>

      {/* Annotation */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-3">
        <ArrowUp size={12} className="text-red-500 animate-pulse" aria-hidden />
        <span>Failure propagates upwards</span>
      </div>
    </div>
  );
}
