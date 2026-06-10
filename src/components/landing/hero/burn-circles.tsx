/**
 * Three burn circles (left, center, right) driven by layout config.
 * #schema:
 * {
 *   type: "component",
 *   args: "stage: number, layout: HeroLayout",
 *   module: "hero/burn-circles.tsx"
 * }
 */

import React from 'react';
import type { HeroLayout } from './layout';
import { BurnCircle } from './burn-circle';

export function BurnCircles({ stage, layout }: { stage: number; layout: HeroLayout }) {
  if (layout.tier === 'lite') return null;

  const { center, left, right } = layout;

  return (
    <div className="pointer-events-none absolute inset-0">
      <BurnCircle circle={left} stage={stage} layout={layout} />
      <div className="absolute left-1/2" style={{ top: center.top, width: center.size, height: center.size, transform: 'translate(-50%, -50%)', opacity: stage >= 1 ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <div className="relative h-full w-full">
          <BurnCircle circle={center} stage={stage} layout={layout} isCenter />
        </div>
      </div>
      <BurnCircle circle={right} stage={stage} layout={layout} />
    </div>
  );
}
