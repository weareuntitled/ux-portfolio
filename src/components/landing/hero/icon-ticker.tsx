/**
 * Icon marquee that scrolls horizontally.
 * - Lite: full-width strip, each icon scales up near viewport center.
 * - Heavy: full-width with drop-shadows and blur halos.
 * #schema:
 * {
 *   type: "component",
 *   args: "stage: number, layout: HeroLayout",
 *   module: "hero/icon-ticker.tsx"
 * }
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, type MotionValue } from 'framer-motion';
import type { HeroLayout } from './layout';
import { TICKER_ICONS } from './icons';
import { RGB_DIRS } from './gradients';

function IconCell({
  Icon, x, nativePos, copyWidth, containerWidth, lensScale, iconPx, mainOpacity,
}: {
  Icon: React.ComponentType<{ style?: React.CSSProperties; className?: string }>;
  x: MotionValue<number>;
  nativePos: number;
  copyWidth: number;
  containerWidth: number;
  lensScale: number;
  iconPx: number;
  mainOpacity: number;
}) {
  const iconScale = useTransform(x, (latestX) => {
    const screenPos = latestX + nativePos;
    const wrappedPos = ((screenPos % copyWidth) + copyWidth) % copyWidth;
    const viewportCenter = containerWidth / 2;
    const distFromCenter = Math.abs(wrappedPos - viewportCenter);
    const halfLens = viewportCenter * 0.35;
    const t = Math.max(0, 1 - distFromCenter / halfLens);
    return 1 + (lensScale - 1) * t;
  });

  return (
    <motion.div style={{ scale: iconScale, width: iconPx, height: iconPx }} className="relative shrink-0">
      <div data-rgb-ghost="red" className="absolute inset-0 text-[rgb(200,40,50)]" style={{ transform: `translate(${RGB_DIRS.red.dx * 2}px, ${RGB_DIRS.red.dy * 2}px)`, opacity: 0.5 }}>
        <Icon style={{ width: iconPx, height: iconPx }} />
      </div>
      <div data-rgb-ghost="blue" className="absolute inset-0 text-[rgb(40,110,230)]" style={{ transform: `translate(${RGB_DIRS.blue.dx * 2}px, ${RGB_DIRS.blue.dy * 2}px)`, opacity: 0.5 }}>
        <Icon style={{ width: iconPx, height: iconPx }} />
      </div>
      <div data-icon-main="" className="absolute inset-0 text-black" style={{ opacity: mainOpacity }}>
        <Icon style={{ width: iconPx, height: iconPx }} />
      </div>
    </motion.div>
  );
}

export function IconTicker({ stage, layout }: { stage: number; layout: HeroLayout }) {
  const visible = stage >= 4;
  const { icon } = layout;
  const isLite = layout.tier === 'lite';
  const iconPx = icon.size;
  const step = iconPx + icon.gap;
  const copyWidth = TICKER_ICONS.length * step;
  const rowRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(390);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!isLite) return;
    if (!rowRef.current?.parentElement) return;
    const parent = rowRef.current.parentElement;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    ro.observe(parent);
    setContainerWidth(parent.clientWidth);
    return () => ro.disconnect();
  }, [isLite]);

  useEffect(() => {
    if (!isLite) return;
    const controls = animate(x, -copyWidth, {
      ease: 'linear',
      duration: icon.durationSec,
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [isLite, copyWidth, icon.durationSec, x]);

  if (isLite) {
    return (
      <motion.div
        ref={rowRef}
        aria-hidden
        className="pointer-events-none absolute z-10"
        style={{ x, y: '-50%', top: icon.y, left: 0, width: '100%', height: iconPx }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.6, ease: 'easeOut' } }}>
        <div className="flex items-center" style={{ gap: `${icon.gap}px` }}>
          {[...TICKER_ICONS, ...TICKER_ICONS].map((Icon, i) => (
            <IconCell
              key={i}
              Icon={Icon}
              x={x}
              nativePos={i * step}
              copyWidth={copyWidth}
              containerWidth={containerWidth}
              lensScale={icon.lensScale}
              iconPx={iconPx}
              mainOpacity={icon.mainOpacity}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-x-0 z-10" style={{ top: icon.y, transform: 'translateY(-50%)', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      <div className="animate-marquee-eased items-center" style={{ gap: `${icon.gap}px`, animationDuration: `${icon.durationSec}s`, filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.55)) drop-shadow(0 0 16px rgba(0,0,0,0.35)) drop-shadow(0 0 32px rgba(40, 60, 140, 0.32)) drop-shadow(0 0 56px rgba(40, 60, 140, 0.18))' } as React.CSSProperties}>
        {[...TICKER_ICONS, ...TICKER_ICONS, ...TICKER_ICONS, ...TICKER_ICONS, ...TICKER_ICONS].map((Icon, i) => (
          <div key={i} className="relative shrink-0" style={{ width: iconPx, height: iconPx }}>
            <div className="absolute inset-0" style={{ transform: 'translate(6px, -4px)' }}>
              <Icon className="text-black" style={{ width: iconPx, height: iconPx, filter: 'blur(22px)', opacity: 0.35 }} />
            </div>
            {(['red', 'blue'] as const).map((key) => {
              const g = RGB_DIRS[key];
              return (
                <div key={key} className="absolute inset-0" style={{ transform: `translate(${g.dx * 4}px, ${g.dy * 4}px)` }}>
                  <Icon style={{ width: iconPx, height: iconPx, color: g.color, filter: 'blur(6px)', opacity: 0.55 }} />
                </div>
              );
            })}
            <div className="absolute inset-0" style={{ transform: 'translate(3px, -2px)' }}>
              <Icon className="text-black" style={{ width: iconPx, height: iconPx, filter: 'blur(10px)', opacity: 0.55 }} />
            </div>
            <Icon className="text-black" style={{ width: iconPx, height: iconPx }} />
          </div>
        ))}
      </div>
    </div>
  );
}
