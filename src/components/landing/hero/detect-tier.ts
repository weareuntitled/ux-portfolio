/**
 * Decides whether the heavy (desktop) or lite (mobile) hero can run.
 *
 * The heavy version stacks `contrast(110)` on the section, `mix-blend: darken`
 * + `blur(28px)` melt layers, 4-stack drop-shadows on a 30-cell marquee. The
 * 560px center circle and 384px icons are sized for ≥1080px viewports — on
 * smaller widths they overflow and the heavy chain breaks.
 *
 * Detection layers (any match → lite, first hit wins):
 * 1. Viewport ≤ 1079px — primary trigger.
 * 2. `navigator.deviceMemory ≤ 2` — Android/Chrome signal.
 * 3. `navigator.hardwareConcurrency ≤ 2` — last-resort low-CPU signal.
 * 4. iOS major version < 16 — old Safari struggles with stacked filter chains.
 *
 * #schema:
 * {
 *   type: "function",
 *   args: "",
 *   returns: "HeroTier",
 *   module: "hero/detect-tier.ts"
 * }
 */

import type { HeroTier } from './layout';

export function detectHeroTier(): HeroTier {
  if (typeof window === 'undefined') return 'heavy';

  try {
    if (window.matchMedia('(max-width: 1079px)').matches) return 'lite';

    const nav = navigator as Navigator & { deviceMemory?: number };
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) return 'lite';
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return 'lite';

    const iosMatch = navigator.userAgent.match(/OS (\d+)_/);
    if (iosMatch && parseInt(iosMatch[1], 10) < 16) return 'lite';

    return 'heavy';
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.warn('[HeroSection] detectHeroTier failed, defaulting to heavy:', e);
    }
    return 'heavy';
  }
}
