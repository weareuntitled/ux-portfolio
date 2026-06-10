/**
 * Shared visual constants — gradients, RGB direction vectors, magnitudes.
 * Used by BurnCircle, IconTicker, and HeroText (h1 RGB ghosts).
 * #schema:
 * {
 *   type: "module",
 *   module: "hero/gradients.ts"
 * }
 */

// Conic gradient for the prismatic burn ring — sweeps black→blue→white→blue→black.
export const PRISM_CONIC =
  'conic-gradient(from 0deg, #000 0%, #15152a 16%, #3a3a78 36%, #c8c8d4 56%, #2a2a5a 76%, #000 100%)';

// Direction must stay consistent across all elements: red=TL, blue=BR.
// Change color only — keep dx/dy locked.
export const RGB_DIRS = {
  red:  { dx: -1, dy: -1, color: 'rgb(200, 40, 50)' },
  blue: { dx:  1, dy:  1, color: 'rgb(40, 110, 230)' },
} as const;

// Color mix — favor blue, keep red subtle to avoid pink.
export const RGB_OPACITY = { red: 0.3, blue: 0.7 } as const;

// Per-element offset multiplier for chromatic split (px).
export const RGB_MAGNITUDE = {
  h1: 4,
  word: 3,
  icon: 4,
  circle: 9,
} as const;

// Per-element blur (px) on the colored ghost layer.
export const RGB_BLUR = {
  h1: 1.2,
  word: 0.8,
  icon: 2,
  circle: 32,
} as const;

// Black "smear" ghost blur (px) — depth layer behind text.
export const SMEAR_BLUR = { h1: 5, word: 4 } as const;

// Main text blur (low — keep readable).
export const MAIN_BLUR = { h1: 0.8, word: 0.8 } as const;

// Text-only opacity scale — keeps the color palette (blue > red) but quieter.
export const TEXT_OPACITY_SCALE = 0.5;
