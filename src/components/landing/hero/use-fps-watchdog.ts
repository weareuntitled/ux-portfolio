/**
 * One-shot FPS watchdog. After the intro animation settles (~3s), samples
 * 2s of frames. If the average drops below 30fps, calls `onDowngrade` so the
 * user gets the lite path instead of a janky hero. No-op when already on
 * lite, under reduce-motion, or during SSR.
 * #schema:
 * {
 *   type: "function",
 *   args: "tier: HeroTier, reduceMotion: boolean, onDowngrade: () => void",
 *   module: "hero/use-fps-watchdog.ts"
 * }
 */

import { useEffect } from 'react';
import type { HeroTier } from './layout';

export function useFpsWatchdog(
  tier: HeroTier,
  reduceMotion: boolean,
  onDowngrade: () => void,
): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (tier !== 'heavy') return;
    if (reduceMotion) return;

    let raf = 0;
    let frameCount = 0;
    let startTime = 0;
    let measuring = true;

    const startTimeout = window.setTimeout(() => {
      startTime = performance.now();
      const tick = (now: number): void => {
        if (!measuring) return;
        frameCount++;
        if (now - startTime < 2000) {
          raf = window.requestAnimationFrame(tick);
          return;
        }
        const fps = (frameCount * 1000) / (now - startTime);
        measuring = false;
        if (fps < 30) {
          if (typeof console !== 'undefined') {
            console.warn(`[HeroSection] FPS ${fps.toFixed(1)} below 30, downgrading to lite`);
          }
          onDowngrade();
        }
      };
      raf = window.requestAnimationFrame(tick);
    }, 3000);

    return () => {
      measuring = false;
      cancelAnimationFrame(raf);
      clearTimeout(startTimeout);
    };
  }, [tier, reduceMotion, onDowngrade]);
}
