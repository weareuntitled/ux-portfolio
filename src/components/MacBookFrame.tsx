'use client';

import type { ReactNode } from 'react';

type Props = { children: ReactNode };

/**
 * CSS-only MacBook-style frame: lid, notch, 16/10 screen area, base.
 * Use design tokens where possible; dark neutrals for hardware look.
 */
export function MacBookFrame({ children }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Lid */}
      <div className="relative rounded-[2rem] bg-[#0d0d0d] p-3 shadow-2xl ring-1 ring-white/10">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 h-4 w-32 -translate-x-1/2 rounded-b-xl bg-black" />
        {/* Screen */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/5 bg-neutral-900">
          {children}
          {/* Screen reflection gradient */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20"
            aria-hidden
          />
        </div>
      </div>
      {/* Base */}
      <div className="relative -mt-1 mx-auto h-4 w-[95%] max-w-[95%] rounded-b-xl bg-[#1a1a1a] shadow-lg">
        <div className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 rounded-b-md bg-[#2a2a2a]" />
      </div>
    </div>
  );
}
