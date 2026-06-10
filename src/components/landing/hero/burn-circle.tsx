/**
 * A single burn circle — ghost layers, optional melt layers, outline, RGB ghosts.
 * Behavior is driven by `layout.effects` (ghost count, blur range, etc.).
 * #schema:
 * {
 *   type: "component",
 *   args: "circle: CircleLayout, stage: number, layout: HeroLayout, isCenter?: boolean",
 *   module: "hero/burn-circle.tsx"
 * }
 */

import React from 'react';
import type { CircleLayout, HeroLayout } from './layout';
import { PRISM_CONIC, RGB_DIRS, RGB_OPACITY } from './gradients';

// BURN_GHOSTS — heavy: 7 layers, blur 8-70px
// Lite uses layout.effects.ghostLayerCount and interpolates within ghostBlurRange
const BURN_GHOSTS = [
  { dx: 6, dy: -4, blur: 8, opacity: 0.7 },
  { dx: -5, dy: 6, blur: 14, opacity: 0.55 },
  { dx: 3, dy: 8, blur: 22, opacity: 0.4 },
  { dx: -8, dy: -3, blur: 32, opacity: 0.28 },
  { dx: 10, dy: 5, blur: 44, opacity: 0.18 },
  { dx: -12, dy: 4, blur: 56, opacity: 0.14 },
  { dx: 7, dy: -10, blur: 70, opacity: 0.1 },
] as const;

// MELT_LAYERS — pure black heavy blobs that contrast(120) melts with ghosts
const MELT_LAYERS = [
  { dx: -4, dy: 3, size: 0.95, opacity: 0.55 },
  { dx: 5, dy: -2, size: 0.9, opacity: 0.45 },
  { dx: -2, dy: -5, size: 0.85, opacity: 0.35 },
  { dx: 6, dy: 6, size: 0.78, opacity: 0.3 },
  { dx: -7, dy: 1, size: 0.92, opacity: 0.4 },
] as const;

function buildGhostLayers(count: number, blurMin: number, blurMax: number) {
  return BURN_GHOSTS.slice(0, count).map((g) => {
    const blur = blurMin + (g.blur - 8) * (blurMax - blurMin) / (70 - 8);
    return { ...g, blur: Math.round(blur) };
  });
}

function ringMask(size: number, outlineWidth: number) {
  return `radial-gradient(circle, transparent ${size / 2 - outlineWidth}px, black ${size / 2 - outlineWidth + 5}px)`;
}

export function BurnCircle({
  circle,
  stage,
  layout,
  isCenter = false,
}: {
  circle: CircleLayout;
  stage: number;
  layout: HeroLayout;
  isCenter?: boolean;
}) {
  const isSide = circle.left !== undefined || circle.right !== undefined;
  const isVisible = isSide ? stage >= 2 : stage >= 1;
  const isOutlined = stage >= 3;
  const outlineW = layout.outline.width;

  const posStyle = circle.right !== undefined
    ? { right: circle.right, top: circle.top, width: circle.size, height: circle.size }
    : { left: circle.left!, top: circle.top, width: circle.size, height: circle.size };

  const splitTransform = isSide
    ? `translateY(-50%) translateX(${isVisible ? 0 : circle.splitOffset}px) scale(${isVisible ? 1 : 0.5})`
    : 'translateY(-50%)';

  const mask = isOutlined ? ringMask(circle.size, outlineW) : 'radial-gradient(circle, black 0%, black 100%)';
  const ghostCount = (!isCenter && layout.tier === 'lite') ? 1 : layout.effects.ghostLayerCount;
  const [blurMin, blurMax] = layout.effects.ghostBlurRange;
  const gl = buildGhostLayers(ghostCount, blurMin, blurMax);
  const showMelt = layout.effects.showSatelliteBlobs;
  const showGooey = isCenter && layout.effects.showGooeyFilter;

  const circleContent = (
    <>
      {gl.map((g, i) => (
        <div
          key={`g-${i}`}
          className={`absolute inset-0 rounded-full animate-prismatic-shift animate-burn-glitch-${(i % 3) + 1}`}
          style={{
            background: PRISM_CONIC,
            filter: `blur(${g.blur}px)`,
            transform: `translate(${g.dx}px, ${g.dy}px)`,
            opacity: g.opacity,
            maskImage: mask,
            WebkitMaskImage: mask,
            transition: 'mask-image 0.7s ease, -webkit-mask-image 0.7s ease',
          }}
        />
      ))}
      {showMelt && MELT_LAYERS.map((m, i) => (
        <div
          key={`m-${i}`}
          className={`absolute rounded-full animate-burn-glitch-${(i % 3) + 1}`}
          style={{
            inset: 0, background: '#000', filter: 'blur(28px)',
            transform: `translate(${m.dx}px, ${m.dy}px) scale(${m.size})`,
            opacity: m.opacity, mixBlendMode: 'darken',
            maskImage: mask, WebkitMaskImage: mask,
            transition: 'mask-image 0.7s ease, -webkit-mask-image 0.7s ease',
          }}
        />
      ))}
      {showMelt && satelliteBlobs(stage, mask)}
      <div className="absolute inset-0 rounded-full animate-prismatic-shift" style={{ background: PRISM_CONIC, filter: 'blur(14px)', maskImage: mask, WebkitMaskImage: mask, transition: 'mask-image 0.7s ease' }} />
      <div className="absolute inset-0 rounded-full" style={{ background: '#fff', border: `${outlineW}px solid ${layout.outline.color}`, filter: 'blur(10px)', opacity: isOutlined ? 1 : 0, transition: 'opacity 0.7s ease' }} />
      {isCenter && (['red', 'blue'] as const).map((key, i) => {
        const g = RGB_DIRS[key];
        return (
          <div key={`rgb-${key}`} className={`absolute rounded-full animate-burn-glitch-${(i % 3) + 1}`} style={{ inset: `${outlineW + 8}px`, background: g.color, filter: `blur(${layout.effects.ghostBlurRange[1]}px)`, transform: `translate(${g.dx * (layout.tier === 'heavy' ? 9 : 4)}px, ${g.dy * (layout.tier === 'heavy' ? 9 : 5)}px)`, opacity: RGB_OPACITY[key] * layout.outline.rgbGhostOpacity, mixBlendMode: showMelt ? 'multiply' : undefined }} />
        );
      })}
    </>
  );

  const wrapped = showGooey ? (
    <div className="absolute inset-0" style={{ filter: 'url(#hero-gooey)' }}>{circleContent}</div>
  ) : circleContent;

  return (
    <div className="absolute" style={{ ...posStyle, opacity: isVisible ? 1 : 0, transform: splitTransform, transition: 'opacity 0.7s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      {wrapped}
    </div>
  );
}

function satelliteBlobs(stage: number, mask: string): React.JSX.Element {
  const blobs = [
    { dx: 220, dy: -80, size: 85 },  { dx: 140, dy: -200, size: 70 },
    { dx: -80, dy: -220, size: 100 }, { dx: -220, dy: -60, size: 80 },
    { dx: -180, dy: 180, size: 90 },  { dx: 60, dy: 230, size: 75 },
    { dx: 230, dy: 120, size: 95 },   { dx: 250, dy: 30, size: 65 },
  ];
  return (
    <>
      {blobs.map((b, i) => (
        <div key={i} className="absolute rounded-full" style={{ width: b.size, height: b.size, left: `calc(50% + ${b.dx}px - ${b.size / 2}px)`, top: `calc(50% + ${b.dy}px - ${b.size / 2}px)`, background: PRISM_CONIC, filter: 'blur(26px)', opacity: stage >= 2 ? 1 : 0, transition: 'opacity 0.7s ease', maskImage: mask, WebkitMaskImage: mask }} />
      ))}
    </>
  );
}
