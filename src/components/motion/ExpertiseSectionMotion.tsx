'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import adBannerData from '../../../public/motion/ad_banner_final.json';
import explainerData from '../../../public/motion/explainer_va.json';
import pitchData from '../../../public/motion/pitch.json';
import threeDData from '../../../public/motion/3D.json';
import aiData from '../../../public/motion/AI.json';

import { EASE, DUR, VP, STAGGER, fadeUpVariant, staggerVariant } from '@/lib/motion';

// ---------------------------------------------------------------------------
// OffsetLottie
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OffsetLottie({ animationData, speed = 1, startFrame = 0, targetDuration, style, assetsPath }: { animationData: unknown; speed?: number; startFrame?: number; targetDuration?: number; style?: React.CSSProperties; assetsPath?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;
    if (targetDuration) {
      const native = player.getDuration(false) as number;
      if (native > 0) player.setSpeed(native / targetDuration);
    }
    if (startFrame > 0) player.goToAndPlay(startFrame, true);
  }, [startFrame, targetDuration]);

  return (
    <Lottie
      lottieRef={lottieRef}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      animationData={animationData as any}
      autoplay
      loop
      style={style}
      rendererSettings={assetsPath ? { assetsPath } : undefined}
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
      <motion.div variants={fadeUpVariant(0)} className="space-y-4">
        <p className="text-xs font-mono uppercase tracking-widest text-primary">Expertise</p>
        <h2 className="text-5xl font-semibold tracking-tight leading-none md:text-7xl">
          Motion & Beyond
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Ich gestalte komplette Animationsprojekte und visuelle Welten für Marken und Kampagnen.
          Das ist Premium Motion Design, das direkt funktioniert. Ich verantworte den gesamten
          kreativen Prozess von der ersten Idee bis zur finalen Auslieferung. Es gibt keine halben
          Sachen und keinen Agentur Overhead. Das ist reines und durchdachtes Design von Anfang bis
          Ende.
        </p>
      </motion.div>

      <motion.div variants={fadeUpVariant(0.1)} className="border-b border-border/50 mt-10 mb-8" />

      {/* Bento grid */}
      <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 md:grid-cols-3">

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
          <div className="relative z-10 flex h-full flex-col justify-end p-5">
            <p className="text-xs font-mono tracking-widest text-primary mb-2">01</p>
            <p className="text-sm font-semibold leading-snug">Explainer</p>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">
              Ich produziere Erklärvideos für komplexe Produkte oder animierte Grafiken für
              Dokumentationen. Ich übersetze trockene Briefings in visuelles Storytelling, das sofort
              klickt. Der Weg führt vom Skript direkt in die Animation. Das spart Zeit und vermeidet
              endlose Korrekturschleifen.
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
          <div className="relative z-10 flex h-full flex-col justify-end p-5">
            <p className="text-xs font-mono tracking-widest text-primary mb-2">02</p>
            <p className="text-sm font-semibold leading-snug">3D Renderings</p>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">
              Das sind detaillierte Produktvisualisierungen und künstlerische Welten für Kampagnen.
              Statt ewigem Warten auf Renderings setze ich auf schlanke Pipelines in Blender und der
              Unreal Engine. Das Ergebnis ist lean, schnell und hochwertig.
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
              Für interne Townhalls oder große Marketing Kampagnen entwickle ich emotionale Videos.
              Ich liefere Bewegtbild und Styleframes, die Ideen verkaufen und Stakeholder sofort
              abholen. Genau das braucht man für wichtige Präsentationen und große Events.
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
              In diesem Bereich entstehen animierte Werbebanner und Assets für Social Media Werbung.
              Ich konzipiere die Kampagnen extrem modular. Dadurch bleiben sie auch beim massenhaften
              Rollout auf allen Kanälen immer strikt on brand.
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
              Clevere Prozess Pipelines und KI generierte Inhalte machen Projekte einfach deutlich
              schneller. KI ist für mich kein Buzzword, sondern Teil der täglichen Arbeit. Mit
              ComfyUI, Kling und eigenen Claude Skripten automatisiere ich lästige Prozesse. So hole
              ich Frame für Frame visuell das absolute Maximum heraus.
            </p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
