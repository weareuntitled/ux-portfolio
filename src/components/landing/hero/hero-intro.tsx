/**
 * White circle that scales up during the intro animation, then fades out.
 * Only rendered before `showContent` is true.
 * #schema:
 * {
 *   type: "component",
 *   module: "hero/hero-intro.tsx"
 * }
 */

import React from 'react';

export function HeroIntroCircle() {
  return (
    <div aria-hidden className="absolute left-1/2 top-1/2 z-40 h-[120vmax] w-[120vmax] rounded-full bg-white animate-hero-intro" />
  );
}
