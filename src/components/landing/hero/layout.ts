/**
 * Hero layout config — single source of truth for both heavy (desktop) and
 * lite (mobile) tiers. Components read this; tier is selected by the parent
 * based on viewport + device signals.
 *
 * To tweak the visual: change values here. To support a new tier: add a new
 * constant of the same shape and a new tier value in `HeroTier`.
 * #schema:
 * {
 *   type: "module",
 *   module: "hero/layout.ts"
 * }
 */

export type HeroTier = 'heavy' | 'lite';

export type CircleLayout = {
  size: number;
  top: string;
  left?: string;
  right?: string;
  splitOffset: number;
};

export type IconLayout = {
  size: number;
  gap: number;
  y: string;
  mainOpacity: number;
  durationSec: number;
  easing: 'linear' | 'eased';
  lensScale: number;
};

export type OutlineSpec = {
  width: number;
  color: string;
  rgbGhostOpacity: number;
};

export type EffectsSpec = {
  sectionContrast: number;
  ghostLayerCount: number;
  ghostBlurRange: readonly [number, number];
  showGooeyFilter: boolean;
  showSatelliteBlobs: boolean;
};

export type HeroLayout = {
  tier: HeroTier;
  center: CircleLayout;
  left: CircleLayout;
  right: CircleLayout;
  outline: OutlineSpec;
  icon: IconLayout;
  effects: EffectsSpec;
};

// Heavy (desktop ≥1080px) — 540/560/540 circles, 60px outline, marquee full-width
export const HEAVY_LAYOUT: HeroLayout = {
  tier: 'heavy',
  center: { size: 560, top: '65%', splitOffset: 0 },
  left: { size: 540, top: '62%', left: '-480px', splitOffset: 700 },
  right: { size: 540, top: '68%', right: '-480px', splitOffset: -700 },
  outline: { width: 60, color: '#000', rgbGhostOpacity: 0.6 },
  icon: {
    size: 384, gap: 56, y: '65%',
    mainOpacity: 1, durationSec: 60, easing: 'eased',
    lensScale: 1,
  },
  effects: {
    sectionContrast: 1.1,
    ghostLayerCount: 7,
    ghostBlurRange: [8, 70],
    showGooeyFilter: false,
    showSatelliteBlobs: true,
  },
};

// Lite (mobile <1080px / low-end) — 160/300/160 circles, 3px outline, contained marquee
export const LITE_LAYOUT: HeroLayout = {
  tier: 'lite',
  center: { size: 300, top: '65%', splitOffset: 0 },
  left: { size: 160, top: '58%', left: '-60px', splitOffset: 0 },
  right: { size: 160, top: '72%', right: '-60px', splitOffset: 0 },
  outline: { width: 3, color: '#000', rgbGhostOpacity: 0.3 },
  icon: {
    size: 80, gap: 60, y: '65%',
    mainOpacity: 0.55, durationSec: 24, easing: 'linear',
    lensScale: 2.5,
  },
  effects: {
    sectionContrast: 1.1,
    ghostLayerCount: 5,
    ghostBlurRange: [2, 6],
    showGooeyFilter: true,
    showSatelliteBlobs: false,
  },
};

export function getLayout(tier: HeroTier): HeroLayout {
  return tier === 'heavy' ? HEAVY_LAYOUT : LITE_LAYOUT;
}
