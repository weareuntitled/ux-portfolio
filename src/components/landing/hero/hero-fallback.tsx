/**
 * Text-only hero used when the ErrorBoundary catches a throw from the
 * decorated section. No framer-motion, no SVG filter, no JS state — just
 * the static copy on the same bg color so the page is never blank.
 * #schema:
 * {
 *   type: "component",
 *   returns: "JSX.Element",
 *   module: "hero/hero-fallback.tsx"
 * }
 */

import React from 'react';

export function HeroFallback(): React.JSX.Element {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-start px-6 pt-16 pb-8 text-left md:px-12 md:pt-20 md:pb-12"
      style={{ backgroundColor: 'rgb(195, 205, 210)' }}
    >
      <div className="relative z-30 mx-auto w-full max-w-6xl">
        <p className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.22em] text-black">
          Hey! I&apos;m
        </p>
        <h1 className="font-display text-[9vw] leading-[0.92] font-extrabold tracking-[-0.045em] text-black sm:text-[6.5vw] md:text-[5.5vw] lg:text-[4.8vw]">
          Daniel Peters,
        </h1>
        <p className="mt-1.5 font-mono text-xs font-medium uppercase tracking-[0.22em] text-black">
          livin&apos; in augsburg.
        </p>
      </div>
    </section>
  );
}
