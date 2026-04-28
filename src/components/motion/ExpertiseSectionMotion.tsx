'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import adBannerData from '../../../public/motion/ad_banner_final.json';
import explainerData from '../../../public/motion/explainer_va.json';
import pitchData from '../../../public/motion/pitch.json';
import threeDData from '../../../public/motion/3D.json';
import aiData from '../../../public/motion/AI.json';

import { DUR, VP, STAGGER, fadeUpVariant, staggerVariant } from '@/lib/motion';

// ---------------------------------------------------------------------------
// OffsetLottie
// ---------------------------------------------------------------------------

function OffsetLottie({ animationData, speed = 1, startFrame = 0, targetDuration, style, assetsPath }: { animationData: unknown; speed?: number; startFrame?: number; targetDuration?: number; style?: React.CSSProperties; assetsPath?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;
    if (targetDuration) {
      const native = player.getDuration(false) as number;
      if (native > 0) player.setSpeed(native / targetDuration);
    } else if (speed !== 1) {
      player.setSpeed(speed);
    }
    if (startFrame > 0) player.goToAndPlay(startFrame, true);
  }, [startFrame, targetDuration, speed]);

  return (
    <Lottie
      lottieRef={lottieRef}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      animationData={animationData as any}
      autoplay
      loop
      style={style}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rendererSettings={assetsPath ? ({ assetsPath } as any) : undefined}
    />
  );
}

// ---------------------------------------------------------------------------
// ExpertiseSectionMotion
// ---------------------------------------------------------------------------

export default function ExpertiseSectionMotion() {
  return (
    <motion.section
      variants={staggerVariant(STAGGER.md, 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={VP}
      className="space-y-0"
    >
      {/* Hero block */}
      <motion.div variants={fadeUpVariant(0)} className="mb-16 space-y-6">
        <p className="text-xs font-mono uppercase tracking-widest text-primary">Expertise</p>
        <h2 className="text-4xl font-light tracking-tight leading-none text-foreground md:text-6xl lg:text-7xl">
          Motion & Beyond
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Ich gestalte Animationsprojekte und visuelle Welten, bei denen Konzept und Umsetzung in
          einer Hand liegen. Kein Briefing verschwindet in der Agentur-Mühle, kein Zwischenstand
          landet wochenlang in der Warteschleife. Was ich anfange, liefere ich aus — und zwar so,
          dass es auf Anhieb funktioniert.
        </p>
      </motion.div>

      <motion.div variants={fadeUpVariant(0.1)} className="border-b border-border/50 my-12" />

      {/* Bento grid */}
      <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">

        {/* 01 Explainer — col-span-2 */}
        <motion.div
          variants={fadeUpVariant(0.12)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: DUR.xs }}
          className="group relative col-span-1 overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 backdrop-blur-md md:col-span-2"
        >
          <div
            className="pointer-events-none absolute inset-x-4 top-2 h-2/3"
            style={{ filter: 'brightness(1.6) saturate(1.5) drop-shadow(0 0 12px rgba(130,210,50,0.5))' }}
          >
            <OffsetLottie
              animationData={explainerData}
              speed={0.9}
              startFrame={18}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/98 via-background/60 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
            <p className="text-xs font-mono tracking-widest text-primary mb-3">01</p>
            <p className="text-base font-medium leading-snug">Explainer</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Komplexe Produkte haben es verdient, gut erklärt zu werden — nicht nur aufgelistet.
              Ich übersetze trockene Briefings in Animationen, die sofort klicken, weil Skript und
              Animation aus derselben Hand kommen. Keine endlosen Schleifen, keine
              Übersetzungsverluste zwischen Konzept und Umsetzung.
            </p>
          </div>
        </motion.div>

        {/* 02 3D Renderings */}
        <motion.div
          variants={fadeUpVariant(0.16)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: DUR.xs }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 backdrop-blur-md"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-65"
            style={{ filter: 'brightness(1.6) saturate(1.5) drop-shadow(0 0 10px rgba(130,210,50,0.45))' }}
          >
            <div className="w-32">
              <OffsetLottie animationData={threeDData} speed={0.75} startFrame={12} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
            <p className="text-xs font-mono tracking-widest text-primary mb-3">02</p>
            <p className="text-base font-medium leading-snug">3D Renderings</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Produktvisualisierungen und visuelle Welten für Kampagnen, die nach echten Shots
              aussehen — weil die Physik stimmt und die Pipeline es zulässt. In Blender und Unreal
              arbeite ich so, dass Renderings nicht zum Bottleneck werden, sondern zum Argument.
            </p>
          </div>
        </motion.div>

        {/* 03 Pitch Videos */}
        <motion.div
          variants={fadeUpVariant(0.2)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: DUR.xs }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 backdrop-blur-md"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-70"
            style={{ filter: 'brightness(1.5) saturate(1.4) drop-shadow(0 0 10px rgba(130,210,50,0.45))' }}
          >
            <div className="w-28">
              <OffsetLottie animationData={pitchData} speed={1.15} startFrame={36} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
          <div className="relative z-10 flex h-full flex-col justify-end p-5">
            <p className="text-xs font-mono tracking-widest text-primary mb-2">03</p>
            <p className="text-sm font-semibold leading-snug">Pitch Videos</p>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">
              Wer eine Idee vor großem Publikum pitchen will, braucht mehr als Folien. Ich entwickle
              Styleframes und Bewegtbild, das eine Idee nicht erklärt, sondern erfahrbar macht —
              für Townhalls, Kampagnenlaunchs und Präsentationen, bei denen der erste Eindruck
              entscheidet.
            </p>
          </div>
        </motion.div>

        {/* 04 AD Banners & Social */}
        <motion.div
          variants={fadeUpVariant(0.24)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: DUR.xs }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 backdrop-blur-md"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
            <div
              className="w-36 opacity-90"
              style={{ filter: 'brightness(1.3) saturate(1.2) drop-shadow(0 0 10px rgba(130,210,50,0.45))' }}
            >
              <OffsetLottie animationData={adBannerData} targetDuration={5.2} startFrame={0} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
          <div className="relative z-10 flex h-full flex-col justify-end p-5">
            <p className="text-xs font-mono tracking-widest text-primary mb-2">04</p>
            <p className="text-sm font-semibold leading-snug">AD Banners & Social</p>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">
              Animierte Banner und Social-Assets, die beim Rollout über Dutzende Formate und Kanäle
              nicht auseinanderfallen. Das setzt ein modulares Konzept von Anfang an voraus — keinen
              Umbau am Ende. Ich baue beides zusammen, damit das Ergebnis in jedem Format stimmt.
            </p>
          </div>
        </motion.div>

        {/* 05 AI Videos & Workflows */}
        <motion.div
          variants={fadeUpVariant(0.28)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: DUR.xs }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 backdrop-blur-md"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-70"
            style={{ filter: 'brightness(1.6) saturate(1.5) drop-shadow(0 0 12px rgba(130,210,50,0.5))' }}
          >
            <div className="w-36">
              <OffsetLottie animationData={aiData} speed={1.2} startFrame={30} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
          <div className="relative z-10 flex h-full flex-col justify-end p-5">
            <p className="text-xs font-mono tracking-widest text-primary mb-2">05</p>
            <p className="text-sm font-semibold leading-snug">AI Videos & Workflows</p>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">
              KI ist kein Trend, den man im Portfolio erwähnt — sie ist fester Teil meiner täglichen
              Arbeit. Mit ComfyUI, Kling und eigenen Skripten automatisiere ich das, was andere
              manuell lösen, und gewinne so Zeit für die Frames, auf die es wirklich ankommt.
            </p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
