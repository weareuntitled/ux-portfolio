/**
 * Main hero orchestration — tier detection, intro sequence, layout selection.
 * Renders the decorated section with BurnCircles, IconTicker, HeroText,
 * and wraps everything in HeroErrorBoundary.
 * #schema:
 * {
 *   type: "component",
 *   returns: "JSX.Element",
 *   module: "hero/hero-section.tsx"
 * }
 */

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './hero.css';
import { EASE } from '@/lib/motion';
import { HERO_WORDS } from '@/lib/hero-words';
import { getLayout, type HeroTier } from './layout';
import { detectHeroTier } from './detect-tier';
import { useFpsWatchdog } from './use-fps-watchdog';
import { HeroErrorBoundary } from './error-boundary';
import { HeroGooeyFilterDef } from './hero-gooey-filter';
import { HeroIntroCircle } from './hero-intro';
import { BurnCircles } from './burn-circles';
import { IconTicker } from './icon-ticker';
import { HeroText } from './hero-text';

export function HeroSection(): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [bgColor, setBgColor] = useState('#000');
  const [textColor, setTextColor] = useState('#fff');
  const [showContent, setShowContent] = useState(false);
  const [circleStage, setCircleStage] = useState(0);
  const [heroTier, setHeroTier] = useState<HeroTier>('heavy');

  useEffect(() => { setHeroTier(detectHeroTier()); }, []);
  useFpsWatchdog(heroTier, reduceMotion === true, () => setHeroTier('lite'));

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
    const t1 = setTimeout(() => setBgColor('rgb(195, 205, 210)'), 700);
    const t2 = setTimeout(() => setTextColor('#000'), 900);
    const t3 = setTimeout(() => setShowContent(true), 1100);
    const t4 = setTimeout(() => setCircleStage(1), 1200);
    const t5 = setTimeout(() => setCircleStage(2), 1600);
    const t6 = setTimeout(() => setCircleStage(3), 2200);
    const t7 = setTimeout(() => setCircleStage(4), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); };
  }, [reduceMotion]);

  const layout = getLayout(heroTier);
  const flipDur = reduceMotion ? 0 : 1.2;

  return (
    <HeroErrorBoundary>
      <HeroGooeyFilterDef />
      <motion.section
        className="relative flex min-h-screen w-full flex-col justify-start px-6 pt-16 pb-8 text-left md:px-12 md:pt-20 md:pb-12"
        style={{
          backgroundColor: bgColor, color: textColor,
          filter: showContent ? `contrast(${layout.effects.sectionContrast * 100})` : 'none',
          overflow: showContent ? 'visible' : 'hidden',
          transition: `background-color ${flipDur}s cubic-bezier(0.16, 1, 0.3, 1), color ${flipDur}s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        {!showContent && <HeroIntroCircle />}

        <motion.div initial={false} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE }} className="contents">
          <BurnCircles stage={circleStage} layout={layout} />
          <IconTicker stage={circleStage} layout={layout} />
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 transition-opacity duration-700" style={{ opacity: showContent ? 1 : 0 }}>
          <div className="mx-auto h-px w-full max-w-[1400px] bg-gradient-to-r from-transparent via-black/15 to-transparent" />
        </div>

        <HeroText showContent={showContent} reduceMotion={reduceMotion === true} wordIndex={wordIndex} />
      </motion.section>
    </HeroErrorBoundary>
  );
}
