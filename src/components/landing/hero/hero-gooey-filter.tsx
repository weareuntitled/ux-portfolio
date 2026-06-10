/**
 * Off-screen SVG <filter> definition that produces a metaball merge:
 * 1. feGaussianBlur softens the source alpha edges.
 * 2. feColorMatrix with α' = 9α − 4 clamps low-alpha regions to 0 and
 *    saturates the interior, so adjacent blurred shapes merge into a single
 *    hard-edged blob where their alphas sum past the threshold.
 * #schema:
 * {
 *   type: "component",
 *   module: "hero/hero-gooey-filter.tsx"
 * }
 */

import React from 'react';

export function HeroGooeyFilterDef(): React.JSX.Element {
  return (
    <svg aria-hidden focusable="false" style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="hero-gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix
          in="blur" mode="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 9 -4"
          result="goo"
        />
      </filter>
    </svg>
  );
}
