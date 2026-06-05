'use client';

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { HERO_WORDS, type HeroWord } from '@/lib/hero-words';

// ---------------------------------------------------------------------------
// 6 SVG Repo icons (knight, gem, face-laugh, dna, code, bee)
// Source: www.svgrepo.com — free for commercial and non-commercial use,
// no attribution required. The 6 shapes use viewBox="0 0 16 16" (mobile
// optical weight reads as a stylistic choice against the 24x24 desktop set).
// ---------------------------------------------------------------------------

type IconComp = (props: { className?: string; style?: React.CSSProperties }) => React.JSX.Element;

const KnightIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.68328 9.36656L4 12L2 14V16H14V14L10 9H14L15 5L9 2V0H8.47214C4.89767 0 2 2.89767 2 6.47214C2 7.4769 2.23394 8.46787 2.68328 9.36656ZM10 5C10 5.55228 9.55228 6 9 6C8.44772 6 8 5.55228 8 5C8 4.44772 8.44772 4 9 4C9.55228 4 10 4.44772 10 5Z"
    />
  </svg>
);

const GemIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 7L7 16H9L16 7V5L13 1H3L0 5V7ZM8 14H8.02183L13.4663 7H10.625L8 14ZM10.25 5H13.5L12 3H8.75L10.25 5Z"
    />
  </svg>
);

const FaceLaughIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7 5.5C7 6.32843 6.32843 7 5.5 7C4.67157 7 4 6.32843 4 5.5C4 4.67157 4.67157 4 5.5 4C6.32843 4 7 4.67157 7 5.5ZM10.5 7C11.3284 7 12 6.32843 12 5.5C12 4.67157 11.3284 4 10.5 4C9.67157 4 9 4.67157 9 5.5C9 6.32843 9.67157 7 10.5 7ZM4 9C4 11.2091 5.79086 13 8 13C10.2091 13 12 11.2091 12 9H4Z"
    />
  </svg>
);

const DnaIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.01717 9.33332C8.23022 9.1387 8.44783 8.94232 8.66896 8.74329L8.90839 8.5279C9.07797 8.37529 9.24931 8.22081 9.42128 8.06407L9.49147 8C11.7057 5.9758 14 3.57105 14 0H12C12 0.719834 11.8779 1.38003 11.6565 2H4.34354C4.1221 1.38003 4 0.719834 4 0H2C2 3.57105 4.29434 5.9758 6.50853 8C4.29434 10.0242 2 12.429 2 16H4C4 15.2802 4.1221 14.62 4.34354 14H11.6565C11.8779 14.62 12 15.2802 12 16H14C14 13.2115 12.6011 11.1342 10.9337 9.39389C10.7174 9.59149 10.5068 9.78069 10.3049 9.962L10.0069 10.2299C9.81254 10.4048 9.62552 10.5742 9.44577 10.7388C9.84726 11.1544 10.2154 11.5718 10.5397 12H5.46033C6.14452 11.0966 7.0241 10.2411 8 9.349L8.01717 9.33332ZM5.46033 4H10.5397C9.85548 4.90345 8.97591 5.75894 8 6.651C7.0241 5.75894 6.14452 4.90345 5.46033 4Z"
    />
  </svg>
);

const CodeIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
    <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z" />
    <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z" />
    <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z" />
  </svg>
);

const BeeIcon: IconComp = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 3V4L15.3436 8.77793C15.766 9.24255 16 9.85471 16 10.4826C16 11.8633 14.8807 13 13.5 13C12.1193 13 11 11.8807 11 10.5V9.68629C11 9.79109 10.9979 9.89568 10.9939 10H5.00615C5.00206 9.89568 5 9.79109 5 9.68629V10.5C5 11.8807 3.88071 13 2.5 13C1.11929 13 0 11.8633 0 10.4826C0 9.85471 0.234044 9.24255 0.65643 8.77793L5 4V3C5 1.34315 6.34315 0 8 0C9.65685 0 11 1.34315 11 3ZM5 8H11V6H5V8Z"
    />
    <path d="M8.65685 15.3431C9.59779 14.4022 10.2801 13.251 10.6581 12H5.34187C5.71987 13.251 6.40221 14.4022 7.34315 15.3431L8 16L8.65685 15.3431Z" />
  </svg>
);

const TICKER_ICONS: readonly IconComp[] = [
  KnightIcon, GemIcon, FaceLaughIcon, DnaIcon, CodeIcon, BeeIcon,
];

// ---------------------------------------------------------------------------
// Design config — MONOCHROMATIC blue + black (single color, washed out)
// ---------------------------------------------------------------------------

// ============================================================================
// HERO CONTROLS — tweak these to tune the look
// ============================================================================
//
// PRISM_CONIC    — the conic gradient used on each circle's burn ring.
//                  Sweeps black→blue→white→blue→black for the liquid edge.
//
// RGB_DIRS       — direction of each colored ghost.
//                  Direction must stay consistent across ALL elements:
//                    red  → top-left
//                    blue → bottom-right
//                  Change `color` to shift hue, keep `dx/dy` locked.
//
// RGB_OPACITY    — color mix. Bump blue, drop red, to fight pink.
//                  Pink happens when red + blue overlap with contrast(120).
//
// RGB_MAGNITUDE  — per-element offset multiplier (3:1 ratio: large : small).
//   h1Mag        — h1 "Daniel Peters,"  (~200px tall → ±7px)
//   wordMag      — rotating word         (~200px tall → ±5px)
//   iconMag      — ticker icons          (~320px square → ±4px)
//   circleMag    — center circle inner   (~560px → ±6px)
//
// RGB_BLUR       — per-element blur on the colored ghost (in px).
//   h1Blur       — h1 ghost
//   wordBlur     — rotating word ghost
//   iconBlur     — icon ghost
//   circleBlur   — center circle inner ghost
//
// GHOST_BLUR     — black "smear" ghost behind text for depth.
//   h1Smear, wordSmear
//
// MAIN_BLUR      — main text blur (keep low so it stays readable).
//   h1Main, wordMain
//
// CONTRAST       — `filter: 'contrast(N)'` on the section in HeroSection return.
//                  High values aggressively melt overlapping ghosts together.
//                  <40 = subtle merge, 80-120 = strong liquid burn, 150+ = chaos.
// ============================================================================

const PRISM_CONIC =
  'conic-gradient(from 0deg, #000 0%, #15152a 16%, #3a3a78 36%, #c8c8d4 56%, #2a2a5a 76%, #000 100%)';

// Direction must stay locked. Change color only.
const RGB_DIRS = {
  red:  { dx: -1, dy: -1, color: 'rgb(200, 40, 50)' },   // top-left
  blue: { dx:  1, dy:  1, color: 'rgb(40, 110, 230)' },  // bottom-right
} as const;

// Color mix — favor blue, keep red subtle to avoid pink.
const RGB_OPACITY = { red: 0.3, blue: 0.7 };

// Per-element magnitude (proportional 3:1 large:small)
const h1Mag = 4;          // was 7 — less text effect
const wordMag = 3;        // was 5 — less text effect
const iconMag = 4;
const circleMag = 9;      // was 6 — 1.5x more effect on circles

// Per-element blur (in px) on the RGB ghosts
const h1Blur = 1.2;       // was 2 — less text blur
const wordBlur = 0.8;     // was 1.5 — less text blur
const iconBlur = 2;
const circleBlur = 32;    // was 22 — 1.5x more circle blur

// Black "smear" ghost behind text for depth
const h1Smear = 5;        // was 8 — less smear
const wordSmear = 4;      // was 7 — less smear

// Main text blur (low — keep readable)
const h1Main = 0.8;       // was 1.4 — less text blur
const wordMain = 0.8;     // was 1.6 — less text blur

// Text-only opacity scale — keeps the color palette (blue > red) but quieter
const textOpacityScale = 0.5;

// Left, Center, Right — each slightly offset on Y for an organic stagger
const LEFT_CIRCLE = { size: 540, left: '-480px', top: '62%' };
const CENTER_CIRCLE = { size: 560, top: '65%' };
const RIGHT_CIRCLE = { size: 540, right: '-480px', top: '68%' };

const OUTLINE = 60;

// Visual elements pushed down to 65% Y to prevent overlapping with top text (decision #3)
const VISUAL_Y = '65%';

// ---------------------------------------------------------------------------
// HeroGooeyFilterDef — inline SVG filter primitive chain for the mobile
// metaball merge. Hidden off-screen via inline style so it never takes
// layout space; the filter id is referenced by CSS `filter: url(#hero-gooey)`
// from a scoped parent in the mobile `lite` branch.
// ---------------------------------------------------------------------------

/**
 * Off-screen SVG <filter> definition that produces a metaball merge:
 * 1. `feGaussianBlur` softens the source alpha edges.
 * 2. `feColorMatrix` with `α' = 9·α − 4` clamps low-alpha regions to 0
 *    and saturates the interior, so adjacent blurred shapes merge into
 *    a single hard-edged blob where their alphas sum past the threshold.
 * #schema:
 * {
 *   type: "component",
 *   module: "HeroSection.tsx"
 * }
 */
function HeroGooeyFilterDef(): React.JSX.Element {
  return (
    <svg
      aria-hidden
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0 }}
    >
      <filter id="hero-gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
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

// ---------------------------------------------------------------------------
// BurnCircles — 3 outlined circles, white center, burny prism corners
// ---------------------------------------------------------------------------

/**
 * Three outlined circles.
 * - Left & Right circles pushed further left/right (decision #1).
 * - Center circle is white in the middle, not colorish (decision #2).
 * - Burn prism effect on every circle's corners/outlines via masked conic-gradients.
 * #schema:
 * {
 *   type: "component",
 *   module: "HeroSection.tsx"
 * }
 */
// Burn ghost layers — duplicate copies with offset, blur, opacity, color variation
// These get stacked on top of each main circle to create the multi-layered liquid burn
const BURN_GHOSTS = [
  { dx: 6, dy: -4, blur: 8, opacity: 0.7 },
  { dx: -5, dy: 6, blur: 14, opacity: 0.55 },
  { dx: 3, dy: 8, blur: 22, opacity: 0.4 },
  { dx: -8, dy: -3, blur: 32, opacity: 0.28 },
  { dx: 10, dy: 5, blur: 44, opacity: 0.18 },
  { dx: -12, dy: 4, blur: 56, opacity: 0.14 },
  { dx: 7, dy: -10, blur: 70, opacity: 0.1 },
] as const;

// Solid dark melt layers — pure black heavy blobs that contrast(120) melts with the conic ghosts
const MELT_LAYERS = [
  { dx: -4, dy: 3, size: 0.95, opacity: 0.55 },
  { dx: 5, dy: -2, size: 0.9, opacity: 0.45 },
  { dx: -2, dy: -5, size: 0.85, opacity: 0.35 },
  { dx: 6, dy: 6, size: 0.78, opacity: 0.3 },
  { dx: -7, dy: 1, size: 0.92, opacity: 0.4 },
] as const;

function BurnCircle({
  size,
  top,
  left,
  right,
  stage,
  splitOffset = 0,
  lite = false,
}: {
  size: number;
  top: string;
  left?: string;
  right?: string;
  stage: number;
  splitOffset?: number;
  lite?: boolean;
}) {
  const isSide = left !== undefined || right !== undefined;
  const isVisible = isSide ? stage >= 2 : stage >= 1;
  const isOutlined = stage >= 3;

  const positionStyle = right !== undefined
    ? { right, top, width: size, height: size }
    : { left: left!, top, width: size, height: size };

  // Split-from-center transform — side circles start at center, slide out
  const splitTransform = isSide
    ? `translateY(-50%) translateX(${isVisible ? 0 : splitOffset}px) scale(${isVisible ? 1 : 0.5})`
    : 'translateY(-50%)';
  const splitOpacity = isVisible ? 1 : 0;

  // Mask: full for filled state, ring for outlined state
  const ringMask = `radial-gradient(circle, transparent ${size / 2 - OUTLINE}px, black ${size / 2 - OUTLINE + 5}px)`;
  const fullMask = 'radial-gradient(circle, black 0%, black 100%)';
  const activeMask = isOutlined ? ringMask : fullMask;

  // Mobile lite: one CSS-animated ghost layer + outline + white interior.
  // No blur, no mix-blend, no mask, no JS state machine, no framer-motion.
  // Pure CSS @keyframes prismatic-shift on a single element.
  if (lite) {
    return (
      <div
        className="absolute"
        style={{
          ...positionStyle,
          opacity: splitOpacity,
          transform: splitTransform,
          transition: 'opacity 0.5s ease, transform 0.7s ease',
        }}
      >
        {/* One ghost layer with CSS-only prismatic sweep, no blur, no blend */}
        <div
          className="absolute inset-0 rounded-full animate-prismatic-shift"
          style={{
            background: PRISM_CONIC,
            opacity: 0.4,
          }}
        />
        {/* Outline (solid, no animation) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid #000',
            background: isOutlined ? '#fff' : 'transparent',
            opacity: isOutlined ? 1 : 0.85,
            transition: 'opacity 0.4s ease, background 0.4s ease',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute"
      style={{
        ...positionStyle,
        opacity: splitOpacity,
        transform: splitTransform,
        transition: 'opacity 0.7s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Ghost layers — full-circle duplicates with offset, blur, opacity for liquid burn merge */}
      {BURN_GHOSTS.map((g, i) => (
        <div
          key={`ghost-${i}`}
          className={`absolute inset-0 rounded-full animate-prismatic-shift animate-burn-glitch-${(i % 3) + 1}`}
          style={{
            background: PRISM_CONIC,
            filter: `blur(${g.blur}px)`,
            transform: `translate(${g.dx}px, ${g.dy}px)`,
            opacity: g.opacity,
            maskImage: activeMask,
            WebkitMaskImage: activeMask,
            transition: 'mask-image 0.7s ease, -webkit-mask-image 0.7s ease',
          }}
        />
      ))}
      {/* Solid dark melt blobs — pure black heavy blobs that contrast(120) melts with the conic ghosts */}
      {MELT_LAYERS.map((m, i) => (
        <div
          key={`melt-${i}`}
          className={`absolute rounded-full animate-burn-glitch-${(i % 3) + 1}`}
          style={{
            inset: 0,
            background: '#000',
            filter: 'blur(28px)',
            transform: `translate(${m.dx}px, ${m.dy}px) scale(${m.size})`,
            opacity: m.opacity,
            mixBlendMode: 'darken',
            maskImage: activeMask,
            WebkitMaskImage: activeMask,
            transition: 'mask-image 0.7s ease, -webkit-mask-image 0.7s ease',
          }}
        />
      ))}
      {/* Main prismatic outline — the visible black ring */}
      <div
        className="absolute inset-0 rounded-full animate-prismatic-shift"
        style={{
          background: PRISM_CONIC,
          filter: `blur(14px)`,
          maskImage: activeMask,
          WebkitMaskImage: activeMask,
          transition: 'mask-image 0.7s ease, -webkit-mask-image 0.7s ease',
        }}
      />
      {/* White interior + black outline ring (only when outlined) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: '#fff',
          border: `${OUTLINE}px solid #000`,
          filter: 'blur(10px)',
          opacity: isOutlined ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}
      />
    </div>
  );
}

function BurnCircles({ stage, lite = false }: { stage: number; lite?: boolean }) {
  const isOutlined = stage >= 3;
  const centerVisible = stage >= 1;
  const ringMask = `radial-gradient(circle, transparent ${CENTER_CIRCLE.size / 2 - OUTLINE}px, black ${CENTER_CIRCLE.size / 2 - OUTLINE + 5}px)`;
  const fullMask = 'radial-gradient(circle, black 0%, black 100%)';
  const activeMask = isOutlined ? ringMask : fullMask;

  // Mobile lite: one CSS-animated ghost + outline + white interior.
  // No satellite blobs, no melt layers, no RGB ghosts, no glass glare.
  if (lite) {
    const centerSize = 240;
    return (
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2"
          style={{
            top: CENTER_CIRCLE.top,
            width: centerSize,
            height: centerSize,
            transform: 'translate(-50%, -50%)',
            opacity: centerVisible ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          {/* Inner wrapper: scoped gooey filter, separated from the
              transform above to avoid compositor edge cases. */}
          <div
            data-hero-gooey-parent=""
            className="absolute inset-0"
            style={{ filter: 'url(#hero-gooey)' }}
          >
          {/* Ghost A — primary conic ghost, prismatic shift + glitch-1 */}
          <div
            data-ghost-layer=""
            className="absolute inset-0 rounded-full animate-prismatic-shift animate-burn-glitch-1"
            style={{
              background: PRISM_CONIC,
              opacity: 0.6,
            }}
          />
          {/* Ghost B — offset (-3px, 4px), glitch-2, lower opacity */}
          <div
            data-ghost-layer=""
            className="absolute inset-0 rounded-full animate-prismatic-shift animate-burn-glitch-2"
            style={{
              background: PRISM_CONIC,
              transform: 'translate(-3px, 4px)',
              opacity: 0.45,
            }}
          />
          {/* Ghost C — offset (4px, -2px), glitch-3, lowest opacity */}
          <div
            data-ghost-layer=""
            className="absolute inset-0 rounded-full animate-prismatic-shift animate-burn-glitch-3"
            style={{
              background: PRISM_CONIC,
              transform: 'translate(4px, -2px)',
              opacity: 0.3,
            }}
          />
          {/* Outline + white interior */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid #000',
              background: isOutlined ? '#fff' : 'transparent',
              opacity: isOutlined ? 1 : 0.85,
              transition: 'opacity 0.4s ease, background 0.4s ease',
            }}
          />
          {/* RGB chromatic split — red TL, blue BR, light blur, no mix-blend.
              Sits inside the white interior so the tint lands on a clean white. */}
          <div
            data-rgb-ghost="red"
            className="absolute rounded-full animate-burn-glitch-1"
            style={{
              inset: `${OUTLINE + 8}px`,
              background: RGB_DIRS.red.color,
              filter: 'blur(2px)',
              transform: `translate(${RGB_DIRS.red.dx * 1.5}px, ${RGB_DIRS.red.dy * 1.5}px)`,
              opacity: 0.3,
            }}
          />
          <div
            data-rgb-ghost="blue"
            className="absolute rounded-full animate-burn-glitch-2"
            style={{
              inset: `${OUTLINE + 8}px`,
              background: RGB_DIRS.blue.color,
              filter: 'blur(2px)',
              transform: `translate(${RGB_DIRS.blue.dx * 1.5}px, ${RGB_DIRS.blue.dy * 1.5}px)`,
              opacity: 0.55,
            }}
          />
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* LEFT — outer corner peeking in. Splits from center at stage 2. */}
      <BurnCircle
        size={LEFT_CIRCLE.size}
        top={LEFT_CIRCLE.top}
        left={LEFT_CIRCLE.left}
        stage={stage}
        splitOffset={700}
      />

      {/* CENTER — white in the middle, burny prism edges + glass lens glare */}
      <div
        className="absolute left-1/2"
        style={{
          top: CENTER_CIRCLE.top,
          width: CENTER_CIRCLE.size,
          height: CENTER_CIRCLE.size,
          transform: 'translate(-50%, -50%)',
          opacity: centerVisible ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}
      >
        <div className="relative h-full w-full">
          {/* Organic-edge satellite blobs — merge via contrast(22) into irregular liquid protrusions */}
          {[
            { dx: 220, dy: -80, size: 85 },
            { dx: 140, dy: -200, size: 70 },
            { dx: -80, dy: -220, size: 100 },
            { dx: -220, dy: -60, size: 80 },
            { dx: -180, dy: 180, size: 90 },
            { dx: 60, dy: 230, size: 75 },
            { dx: 230, dy: 120, size: 95 },
            { dx: 250, dy: 30, size: 65 },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: b.size,
                height: b.size,
                left: `calc(50% + ${b.dx}px - ${b.size / 2}px)`,
                top: `calc(50% + ${b.dy}px - ${b.size / 2}px)`,
                background: PRISM_CONIC,
                filter: `blur(26px)`,
                opacity: stage >= 2 ? 1 : 0,
                transition: 'opacity 0.7s ease',
              }}
            />
          ))}
          {/* Ghost layers on center — full-circle duplicates, no mask, contrast(120) merges them */}
          {BURN_GHOSTS.map((g, i) => (
            <div
              key={`c-ghost-${i}`}
              className={`absolute inset-0 rounded-full animate-prismatic-shift animate-burn-glitch-${(i % 3) + 1}`}
              style={{
                background: PRISM_CONIC,
                filter: `blur(${g.blur}px)`,
                transform: `translate(${g.dx}px, ${g.dy}px)`,
                opacity: g.opacity,
                maskImage: activeMask,
                WebkitMaskImage: activeMask,
                transition: 'mask-image 0.7s ease, -webkit-mask-image 0.7s ease',
              }}
            />
          ))}
          {/* Solid dark melt blobs on center — pure black, contrast(120) aggressively merges them with ghosts */}
          {MELT_LAYERS.map((m, i) => (
            <div
              key={`c-melt-${i}`}
              className={`absolute rounded-full animate-burn-glitch-${(i % 3) + 1}`}
              style={{
                inset: 0,
                background: '#000',
                filter: 'blur(28px)',
                transform: `translate(${m.dx}px, ${m.dy}px) scale(${m.size})`,
                opacity: m.opacity,
                mixBlendMode: 'darken',
                maskImage: activeMask,
                WebkitMaskImage: activeMask,
                transition: 'mask-image 0.7s ease, -webkit-mask-image 0.7s ease',
              }}
            />
          ))}
          {/* Prismatic burn outline overlay */}
          <div
            className="absolute inset-0 rounded-full animate-prismatic-shift"
            style={{
              background: PRISM_CONIC,
              filter: `blur(14px)`,
              maskImage: activeMask,
              WebkitMaskImage: activeMask,
              transition: 'mask-image 0.7s ease, -webkit-mask-image 0.7s ease',
            }}
          />
          {/* White interior / black border circle (only when outlined) */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: '#fff',
              border: `${OUTLINE}px solid #000`,
              filter: 'blur(10px)',
              opacity: isOutlined ? 1 : 0,
              transition: 'opacity 0.7s ease',
            }}
          />
          {/* RGB ghosts INSIDE the white center — color shows through via multiply blend */}
          {(['red', 'blue'] as const).map((key, i) => {
            const g = RGB_DIRS[key];
            return (
              <div
                key={`c-rgb-inside-${key}`}
                className={`absolute rounded-full animate-burn-glitch-${(i % 3) + 1}`}
                style={{
                  inset: `${OUTLINE + 8}px`,
                  background: g.color,
                  filter: `blur(${circleBlur}px)`,
                  transform: `translate(${g.dx * circleMag}px, ${g.dy * circleMag}px)`,
                  opacity: RGB_OPACITY[key] * 0.6,
                  mixBlendMode: 'multiply',
                }}
              />
            );
          })}
          {/* Glass lens glare overlay for that realistic "brennglass" look */}
          <div
            className="absolute rounded-full"
            style={{
              inset: `${OUTLINE + 4}px`,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 45%, rgba(0,0,0,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: 'inset 0 0 16px rgba(255,255,255,0.4)',
              filter: 'blur(1px)',
              opacity: isOutlined ? 1 : 0,
              transition: 'opacity 0.7s ease',
            }}
          />
        </div>
      </div>

      {/* RIGHT — outer corner peeking in. Splits from center at stage 2. */}
      <BurnCircle
        size={RIGHT_CIRCLE.size}
        top={RIGHT_CIRCLE.top}
        right={RIGHT_CIRCLE.right}
        stage={stage}
        splitOffset={-700}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// IconTicker — 4x larger icons, zoomed and more burnt in the middle
// ---------------------------------------------------------------------------

/**
 * Lens-marquee for the center circle.
 * - Icons start in the center, slide to the sides, and fade out at the edges (horizontal linear mask).
 * - The whole lens breathes (subtle scale 1 → 1.035 → 1 over 5s) on the lite branch.
 * - The marquee is clipped to a circle via `overflow-hidden rounded-full` so there's no
 *   ugly top/bottom crop from a radial mask (lite only).
 * - Icons are way bigger (h-96 w-96 = 384px on heavy, h-16 w-16 on lite) with prismatic
 *   text-clip and a soft blue burn halo.
 * - Cycle easing: `marquee-eased` keyframe (ease-out → ease-in) makes the marquee
 *   fast at the cycle boundaries and slow in the middle. 60s base duration
 *   so the easing reads as motion, not stutter.
 * #schema:
 * {
 *   type: "component",
 *   module: "HeroSection.tsx"
 * }
 */
function IconTicker({ stage = 0, lite = false }: { stage?: number; lite?: boolean }) {
  // Only show icons AFTER circles are fully visible (stage 4, which fires 600ms after stage 3).
  // Black icons need the white interior to be visible, AND the circles need to be settled
  // so the icons merge with a stable visual context, not a moving one.
  const visible = stage >= 4;

  // Mobile lite: marquee preserved, scaled for mobile. Wrapper matches the
  // 240px BurnCircles.lite center circle so `overflow-hidden rounded-full`
  // clips icons to the circle's bounding box (no icons in page margins).
  // 6 unique icons × 2 clones = 12 cells in DOM, 24s marquee duration,
  // lens-breathe scale on the wrapper. No drop-shadow, no mix-blend.
  if (lite) {
    const mobileSize = 240;
    return (
      <div
        aria-hidden
        data-icon-marquee=""
        className="pointer-events-none absolute z-10 overflow-hidden rounded-full animate-lens-breathe"
        style={{
          top: VISUAL_Y,
          left: '50%',
          width: mobileSize,
          height: mobileSize,
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <div
          className="animate-marquee items-center"
          style={{
            gap: '48px',
            animationDuration: '24s',
          } as React.CSSProperties}
        >
          {[...TICKER_ICONS, ...TICKER_ICONS].map((Icon, i) => (
            <div key={i} data-icon-cell={i} className="relative shrink-0">
              {/* RGB red — top-left offset, no blur, no mix-blend. Color set on wrapper
                  so the SVG's `fill="currentColor"` inherits the hue. */}
              <div
                data-rgb-ghost="red"
                className="absolute inset-0 text-[rgb(200,40,50)]"
                style={{
                  transform: `translate(${RGB_DIRS.red.dx * 2}px, ${RGB_DIRS.red.dy * 2}px)`,
                  opacity: 0.5,
                }}
              >
                <Icon className="h-16 w-16" />
              </div>
              {/* RGB blue — bottom-right offset, no blur, no mix-blend */}
              <div
                data-rgb-ghost="blue"
                className="absolute inset-0 text-[rgb(40,110,230)]"
                style={{
                  transform: `translate(${RGB_DIRS.blue.dx * 2}px, ${RGB_DIRS.blue.dy * 2}px)`,
                  opacity: 0.5,
                }}
              >
                <Icon className="h-16 w-16" />
              </div>
              {/* Main icon — solid black, watermark opacity, on top of the RGB split */}
              <div data-icon-main="" className="relative h-16 w-16 text-black" style={{ opacity: 0.2 }}>
                <Icon className="h-full w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-x-0 z-10"
      style={{
        top: VISUAL_Y,
        transform: 'translateY(-50%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div
        className="animate-marquee-eased items-center"
        style={{
          gap: '56px',
          animationDuration: '60s',
          filter:
            'drop-shadow(0 0 6px rgba(0,0,0,0.55)) ' +
            'drop-shadow(0 0 16px rgba(0,0,0,0.35)) ' +
            'drop-shadow(0 0 32px rgba(40, 60, 140, 0.32)) ' +
            'drop-shadow(0 0 56px rgba(40, 60, 140, 0.18))',
        } as React.CSSProperties}
      >
        {[...TICKER_ICONS, ...TICKER_ICONS, ...TICKER_ICONS, ...TICKER_ICONS, ...TICKER_ICONS].map((Icon, i) => (
          <div key={i} className="relative shrink-0">
            {/* Wide haze layer — very large blur, low opacity. Creates the soft merge halo
                that bleeds each icon into the surrounding burn rings. */}
            <div
              className="absolute inset-0"
              style={{ transform: 'translate(6px, -4px)' }}
            >
              <Icon
                className="h-96 w-96 text-black"
                style={{ filter: 'blur(22px)', opacity: 0.35 }}
              />
            </div>
            {/* Colored ghost — wrapped in a positioned div so the inline transform doesn't conflict
                with anything. Heavier blur now so the color bleeds into the merge halo. */}
            {(['red', 'blue'] as const).map((key) => {
              const g = RGB_DIRS[key];
              return (
                <div
                  key={key}
                  className="absolute inset-0"
                  style={{ transform: `translate(${g.dx * iconMag}px, ${g.dy * iconMag}px)` }}
                >
                  <Icon
                    className="h-96 w-96"
                    style={{
                      color: g.color,
                      filter: `blur(${iconBlur + 4}px)`,
                      opacity: 0.55,
                    }}
                  />
                </div>
              );
            })}
            {/* Black ghost — gives the icon solid mass. Now heavier (more blur + opacity)
                so it merges aggressively with the conic rings. */}
            <div
              className="absolute inset-0"
              style={{ transform: 'translate(3px, -2px)' }}
            >
              <Icon
                className="h-96 w-96 text-black"
                style={{ filter: 'blur(10px)', opacity: 0.55 }}
              />
            </div>
            {/* Main icon — solid black, no blend mode, no blur. Renders as a stable shape
                that doesn't flicker against the animated conic background. */}
            <Icon className="relative h-96 w-96 text-black" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PrismaticWord — clean text using shared prism gradient + liquid-burn edge
// ---------------------------------------------------------------------------

/**
 * Two-layer prismatic text using the shared PRISM_LINEAR gradient.
 * #schema:
 * {
 *   type: "component",
 *   args: "word: HeroWord",
 *   module: "HeroSection.tsx"
 * }
 */
function PrismaticWord({ word }: { word: HeroWord }) {
  return (
    <span className="relative inline-block">
      {/* RGB chromatic aberration ghosts — red TL, blue BR */}
      {(['red', 'blue'] as const).map((key) => {
        const g = RGB_DIRS[key];
        return (
          <span
            key={key}
            aria-hidden
            className="absolute inset-0 inline-block align-baseline font-light italic"
            style={{
              color: g.color,
              filter: `blur(${wordBlur}px)`,
              transform: `translate(${g.dx * wordMag}px, ${g.dy * wordMag}px)`,
              opacity: RGB_OPACITY[key] * textOpacityScale,
              mixBlendMode: 'multiply',
              pointerEvents: 'none',
            }}
          >
            {word.label}
          </span>
        );
      })}
      {/* Soft black ghost behind for depth */}
      <span
        aria-hidden
        className="absolute inset-0 inline-block align-baseline text-black font-light italic"
        style={{
          filter: `blur(${wordSmear}px)`,
          transform: 'translate(2px, 2px)',
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      >
        {word.label}
      </span>
      {/* Main text on top */}
      <span
        className="relative inline-block align-baseline text-black font-light italic"
        style={{
          filter: `blur(${wordMain}px) drop-shadow(0 0 4px rgba(40, 60, 140, 0.25))`,
        }}
      >
        {word.label}
      </span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------

type HeroTier = 'heavy' | 'lite';

/**
 * Decides whether the heavy (desktop) hero version can run on this device,
 * or if the lite fallback must kick in to stay under the GPU budget.
 *
 * The heavy version stacks: `contrast(110)` on the section, `mix-blend: darken`
 * + `blur(28px)` melt layers, `blur(10-14px)` on the prismatic ring + white
 * interior, `mix-blend: multiply` RGB ghosts, an SVG `<filter>` (feGaussianBlur
 * + feColorMatrix) on the center circle, and a 30-cell icon marquee with
 * 4-stack drop-shadows. That's a lot for a phone GPU.
 *
 * Detection layers (any match → lite):
 * 1. `navigator.deviceMemory ≤ 2` — Chromium reports this on Android/Chrome.
 * 2. `navigator.hardwareConcurrency ≤ 2` — last-resort low-CPU signal.
 * 3. iOS major version < 16 — A11/A12/A13 phones ship with iOS 16 only as
 *    a stretch; iOS 15 and below is the realistic floor for those chips and
 *    Safari there struggles with stacked `filter` + `mix-blend-mode`.
 * 4. Coarse pointer + viewport ≤ 480px — small phone, touch-first.
 *
 * Returns 'heavy' if none of those match (capable desktop, modern flagship
 * phone, modern iPad).
 * #schema:
 * {
 *   type: "function",
 *   args: "",
 *   returns: "HeroTier",
 *   module: "HeroSection.tsx"
 * }
 */
function detectHeroTier(): HeroTier {
  if (typeof window === 'undefined') return 'heavy';

  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) return 'lite';
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return 'lite';

  const ua = navigator.userAgent;
  const iosMatch = ua.match(/OS (\d+)_/);
  if (iosMatch && parseInt(iosMatch[1], 10) < 16) return 'lite';

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const smallScreen = window.matchMedia('(max-width: 480px)').matches;
  if (coarse && smallScreen) return 'lite';

  return 'heavy';
}

// ---------------------------------------------------------------------------

/**
 * Editorial hero in the style of mattahrens.design.
 * - Section bg animates from black → white on mount.
 * - 3 dark burny circles (left/center/right) inside a contrast(110) container.
 * - Font is at top of section, not vertically centered (decision #3).
 * - Zoom lens marquee inside the center white circle.
 * - Tiered rendering: `heroTier` decides between the full heavy version
 *   (default) and a lite fallback (no blur, no mix-blend, no satellite
 *   blobs) for devices that can't hold 60fps with the filter chain.
 *   `reduceMotion` short-circuits the intro and snaps to the final state.
 * #schema:
 * {
 *   type: "component",
 *   returns: "JSX.Element",
 *   module: "HeroSection.tsx"
 * }
 */
export function HeroSection(): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = HERO_WORDS[wordIndex];
  const [bgColor, setBgColor] = useState('#000');
  const [textColor, setTextColor] = useState('#fff');
  const [showContent, setShowContent] = useState(false);
  // 0=hidden, 1=single filled center, 2=three filled, 3=outlined, 4=icons appear
  const [circleStage, setCircleStage] = useState(0);
  // Default 'heavy' so SSR + first client paint are identical. Detection runs
  // in a useEffect after mount and degrades to 'lite' on low-end devices.
  const [heroTier, setHeroTier] = useState<HeroTier>('heavy');

  useEffect(() => {
    setHeroTier(detectHeroTier());
  }, []);

  // Force scroll to top on mount — without this, the browser keeps the last scroll
  // position from the previous page (e.g. /projects), which makes the hero appear scrolled.
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  const cycleWord = useCallback(() => {
    setWordIndex((prev) => {
      if (HERO_WORDS.length <= 1) return prev;
      let next = prev;
      while (next === prev) next = Math.floor(Math.random() * HERO_WORDS.length);
      return next;
    });
  }, []);

  useEffect(() => {
    if (reduceMotion || HERO_WORDS.length <= 1) return;
    const interval = setInterval(cycleWord, 4500);
    return () => clearInterval(interval);
  }, [cycleWord, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      setBgColor('rgb(195, 205, 210)');
      setTextColor('#000');
      setShowContent(true);
      setCircleStage(4);
      return;
    }
    // Compressed intro sequence (~2400ms total):
    // 700ms  — white intro circle finished scaling, bg flips to white
    // 900ms  — text flips to black
    // 1100ms — content container ready
    // 1200ms — single filled center circle
    // 1600ms — three filled circles
    // 2000ms — outlined circles (end state)
    // 2400ms — icons appear AFTER circles are done
    const t1 = setTimeout(() => setBgColor('rgb(195, 205, 210)'), 700);
    const t2 = setTimeout(() => setTextColor('#000'), 900);
    const t3 = setTimeout(() => setShowContent(true), 1100);
    const t4 = setTimeout(() => setCircleStage(1), 1200);
    const t5 = setTimeout(() => setCircleStage(2), 1600);
    const t6 = setTimeout(() => setCircleStage(3), 2200);
    const t7 = setTimeout(() => setCircleStage(4), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [reduceMotion]);

  const flipDur = reduceMotion ? 0 : 1.2;

  return (
    <>
      <HeroGooeyFilterDef />
      <motion.section
      className="relative flex min-h-screen flex-col justify-start px-6 pt-16 pb-8 text-left md:px-12 md:pt-20 md:pb-12"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        filter: showContent ? 'contrast(110)' : 'none',
        // During intro: clip everything (so the white circle doesn't extend the body).
        // After intro: allow vertical overflow (so the icons/burn can flow below if needed).
        overflow: showContent ? 'visible' : 'hidden',
        transition: `background-color ${flipDur}s cubic-bezier(0.16, 1, 0.3, 1), color ${flipDur}s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      {/* Intro: white circle scales up from center, then fades. Only shows during intro.
          Size is 120vmax — covers the hero without extending the body to cause scroll. */}
      {!showContent && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 z-40 h-[120vmax] w-[120vmax] rounded-full bg-white animate-hero-intro"
        />
      )}

      {/* Heavy decorative layers (burn circles + icon marquee). The lite
          branch kicks in on devices that can't hold 60fps with the filter
          chain (see `detectHeroTier` above). */}
      <motion.div
        initial={false}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="contents"
      >
        <BurnCircles stage={circleStage} lite={heroTier === 'lite'} />
        <IconTicker stage={circleStage} lite={heroTier === 'lite'} />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 transition-opacity duration-700"
        style={{ opacity: showContent ? 1 : 0 }}
      >
        <div className="mx-auto h-px w-full max-w-[1400px] bg-gradient-to-r from-transparent via-black/15 to-transparent" />
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="relative z-30 mx-auto w-full max-w-6xl"
      >
        <motion.p
          className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.22em] text-foreground"
          style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))' }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.5, ease: EASE }}
        >
          Hey! I&apos;m
        </motion.p>

        {/* H1 with RGB chromatic aberration ghosts + black smear ghost */}
        <div className="relative">
          {(['red', 'blue'] as const).map((key) => {
            const g = RGB_DIRS[key];
            return (
              <motion.h1
                key={`h1-rgb-${key}`}
                aria-hidden
                className="font-display text-[9vw] leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[4.8vw]"
                style={{
                  fontFamily: 'var(--font-display), var(--font-sans), sans-serif',
                  color: g.color,
                  filter: `blur(${h1Blur}px)`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: `translate(${g.dx * h1Mag}px, ${g.dy * h1Mag}px)`,
                  opacity: RGB_OPACITY[key] * textOpacityScale,
                  mixBlendMode: 'multiply',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
                initial={{ opacity: 0, x: g.dx * 10 }}
                animate={{ opacity: RGB_OPACITY[key] * textOpacityScale, x: 0 }}
                transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.6, ease: EASE }}
              >
                Daniel Peters,
              </motion.h1>
            );
          })}
          <motion.h1
            aria-hidden
            className="font-display text-[9vw] leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[4.8vw] text-black"
            style={{
              fontFamily: 'var(--font-display), var(--font-sans), sans-serif',
              filter: `blur(${h1Smear}px)`,
              position: 'absolute',
              top: '3px',
              left: '3px',
              opacity: 0.3,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.6, ease: EASE }}
          >
            Daniel Peters,
          </motion.h1>
          <motion.h1
            className="relative font-display text-[9vw] leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-[6.5vw] md:text-[5.5vw] lg:text-[4.8vw]"
            style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif', filter: `blur(${h1Main}px) drop-shadow(0 0 4px rgba(40, 60, 140, 0.3))` }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.6, ease: EASE }}
          >
            Daniel Peters,
          </motion.h1>
        </div>

        <motion.div
          className="mt-1 font-display text-[14vw] leading-[1.0] font-light tracking-[-0.045em] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5vw]"
          style={{ fontFamily: 'var(--font-display), var(--font-sans), sans-serif' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: reduceMotion ? 0 : 0.7, ease: EASE }}
        >
          <span className="relative inline-block min-h-[1em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                <PrismaticWord word={currentWord} />
              </motion.span>
            </AnimatePresence>
            <span className="sr-only" role="text">
              Daniel Peters is a Product Designer, UX/UI Designer, Product Owner, UX Strategist, Design Lead, AI-Native Builder, Full-Stack Designer, Motion Designer.
            </span>
          </span>
        </motion.div>

        <motion.p
          className="mt-1.5 font-mono text-xs font-medium uppercase tracking-[0.22em] text-foreground"
          style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))' }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: reduceMotion ? 0 : 0.9, ease: EASE }}
        >
          livin&apos; in augsburg.
        </motion.p>
      </motion.div>
    </motion.section>
    </>
  );
}
