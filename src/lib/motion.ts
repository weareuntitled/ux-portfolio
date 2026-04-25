/**
 * Unified motion design tokens
 * Single source of truth for all animations across the portfolio.
 */

// ---------------------------------------------------------------------------
// Easing
// ---------------------------------------------------------------------------
/** Primary ease — fast-in, smooth-out (expo-like). Use for all reveals. */
export const EASE = [0.16, 1, 0.3, 1] as const;
/** Ease-in-out — for elements that enter AND exit (modals, drawers). */
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

// ---------------------------------------------------------------------------
// Durations (seconds)
// ---------------------------------------------------------------------------
export const DUR = {
  /** 0.2s — micro: button press, tooltip */
  xs: 0.2,
  /** 0.35s — quick card/item reveal */
  sm: 0.35,
  /** 0.5s — standard section/card reveal */
  md: 0.5,
  /** 0.7s — hero text, page-level entrance */
  lg: 0.7,
  /** 0.9s — dramatic hero visuals (image, MacBook) */
  xl: 0.9,
} as const;

// ---------------------------------------------------------------------------
// Spring  (single signature — replaces the two conflicting configs)
// ---------------------------------------------------------------------------
export const SPRING = {
  type: 'spring',
  stiffness: 60,
  damping: 22,
  mass: 1,
} as const;

// ---------------------------------------------------------------------------
// Stagger delays (seconds between children)
// ---------------------------------------------------------------------------
export const STAGGER = {
  /** 0.06s — tight lists, tech strips */
  sm: 0.06,
  /** 0.10s — standard card grids */
  md: 0.10,
  /** 0.15s — loose section children */
  lg: 0.15,
} as const;

// ---------------------------------------------------------------------------
// Viewport trigger (whileInView)
// ---------------------------------------------------------------------------
/** Standard viewport config — triggers when 20% of element is visible, once. */
export const VP = { once: true, amount: 0.2 as const };

// ---------------------------------------------------------------------------
// Reusable variant factories
// ---------------------------------------------------------------------------

/** Fade up with optional blur — the standard reveal pattern. */
export const fadeUpVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DUR.md, ease: EASE, delay },
  },
});

/** Stagger container — wraps a list of fadeUpVariant children. */
export const staggerVariant = (stagger: number = STAGGER.md, delay: number = 0.05) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Slide in from left — for sidebar nav items. */
export const slideInLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.sm, ease: EASE, delay },
  },
});

/** Scale + blur entrance — for hero images, MacBook frame. */
export const scaleInVariant = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.97, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: DUR.xl, ease: EASE, delay },
  },
});

/** SVG path draw — animates strokeDashoffset via pathLength 0→1. */
export const drawPathVariant = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.8, ease: 'easeInOut' as const, delay },
  },
});
