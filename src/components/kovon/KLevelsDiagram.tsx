'use client';

import { ShieldAlert, Lock, ArrowUp } from 'lucide-react';
import { FadeIn } from '@/components/motion';

type KLevelsDiagramProps = {
  status?: 'ok' | 'blocked';
};

/**
 * K-Levels view: bottom-up blockers.
 * If Part fails, System and Vehicle are effectively blocked.
 */
export function KLevelsDiagram({ status = 'blocked' }: KLevelsDiagramProps) {
  const isBlocked = status === 'blocked';

  return (
    <FadeIn>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
              K-Levels
            </p>
            <p className="text-sm font-semibold text-zinc-100">
              Bottom-up blockers
            </p>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-mono"
            style={
              isBlocked
                ? { backgroundColor: 'rgba(248,113,113,0.16)', color: '#fecaca' }
                : { backgroundColor: 'rgba(173,255,47,0.10)', color: '#ADFF2F' }
            }
          >
            {isBlocked ? 'Blocked' : 'Clear'}
          </span>
        </div>

        <div className="flex flex-col items-center space-y-0 w-full max-w-sm mx-auto">
          {/* VEHICLE (top) */}
          <div className="relative w-full overflow-hidden rounded-t-xl border border-zinc-800 border-b-0 bg-zinc-900/60">
            <div
              className={
                isBlocked
                  ? 'absolute inset-y-0 left-0 w-1 bg-red-500/70'
                  : 'absolute inset-y-0 left-0 w-1 bg-[rgba(173,255,47,0.6)]'
              }
              aria-hidden
            />
            <div className="flex items-center justify-between p-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Project level
                </div>
                <div className="text-sm font-semibold text-zinc-100">
                  Vehicle project
                </div>
              </div>
              <div
                className={
                  isBlocked
                    ? 'flex items-center gap-1.5 rounded-full border border-red-500/70 bg-red-950/50 px-2.5 py-1 text-[10px] font-bold text-red-200'
                    : 'flex items-center gap-1.5 rounded-full border border-[rgba(173,255,47,0.5)] bg-[rgba(12,21,5,0.9)] px-2.5 py-1 text-[10px] font-bold'
                }
              >
                <Lock size={12} className="shrink-0" />
                <span>{isBlocked ? 'BLOCKED' : 'OK'}</span>
              </div>
            </div>
          </div>

          {/* Connection */}
          <div
            className={
              isBlocked
                ? 'h-4 w-px bg-gradient-to-t from-red-500 to-red-900/20'
                : 'h-4 w-px bg-gradient-to-t from-[rgba(173,255,47,0.8)] to-transparent'
            }
            aria-hidden
          />

          {/* SYSTEM (middle) */}
          <div className="relative w-full overflow-hidden border-x border-zinc-800 bg-zinc-900/70">
            <div
              className={
                isBlocked
                  ? 'absolute inset-y-0 left-0 w-1 bg-red-500'
                  : 'absolute inset-y-0 left-0 w-1 bg-[rgba(173,255,47,0.7)]'
              }
              aria-hidden
            />
            <div className="flex items-center justify-between p-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  System level
                </div>
                <div className="text-sm font-semibold text-zinc-100">
                  Braking module
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-orange-500/60 bg-orange-950/40 px-2.5 py-1 text-[10px] font-bold text-orange-100">
                <ShieldAlert size={12} className="shrink-0" />
                <span>{isBlocked ? 'REVOKED' : 'UNDER REVIEW'}</span>
              </div>
            </div>
          </div>

          {/* Connection */}
          <div
            className={
              isBlocked
                ? 'h-4 w-px bg-red-500'
                : 'h-4 w-px bg-[rgba(173,255,47,0.7)]'
            }
            aria-hidden
          />

          {/* PART (bottom) */}
          <div
            className={
              isBlocked
                ? 'relative w-full overflow-hidden rounded-b-xl border border-red-500/70 border-t-red-500 bg-red-950/25 shadow-[0_0_32px_-12px_rgba(248,113,113,0.7)]'
                : 'relative w-full overflow-hidden rounded-b-xl border border-[rgba(173,255,47,0.6)] border-t-[rgba(173,255,47,0.8)] bg-[rgba(12,21,5,0.9)] shadow-[0_0_32px_-16px_rgba(173,255,47,0.8)]'
            }
          >
            <div
              className={
                isBlocked
                  ? 'absolute inset-y-0 left-0 w-1 bg-red-500'
                  : 'absolute inset-y-0 left-0 w-1 bg-[rgba(173,255,47,0.9)]'
              }
              aria-hidden
            />
            <div className="flex items-center justify-between p-3">
              <div>
                <div
                  className={
                    isBlocked
                      ? 'text-[10px] font-mono uppercase tracking-wider text-red-200'
                      : 'text-[10px] font-mono uppercase tracking-wider text-[rgba(173,255,47,0.9)]'
                  }
                >
                  Part level
                </div>
                <div className="text-sm font-semibold text-zinc-100">
                  Brake caliper
                </div>
              </div>
              <div
                className={
                  isBlocked
                    ? 'flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white'
                    : 'flex items-center gap-1.5 rounded-full bg-[rgba(173,255,47,1)] px-2.5 py-1 text-[10px] font-bold text-black'
                }
              >
                <ShieldAlert size={12} className="shrink-0" />
                <span>{isBlocked ? 'FAILED' : 'PASSED'}</span>
              </div>
            </div>
          </div>

          {/* Annotation */}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-400">
            <ArrowUp
              size={12}
              className={isBlocked ? 'text-red-500 animate-pulse' : 'text-[rgba(173,255,47,0.9)]'}
              aria-hidden
            />
            <span>
              {isBlocked
                ? 'Failure at Part level blocks the entire chain.'
                : 'All K-levels cleared — chain is ready to move.'}
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

