'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import {
  Film,
  ArrowRight,
  LayoutTemplate,
  Lightbulb,
  MonitorPlay,
  Box,
  Sparkles,
  Glasses,
} from 'lucide-react';

import adBannerData from '../../../../public/motion/ad_banner_final.json';
import explainerData from '../../../../public/motion/explainer_va.json';
import pitchData from '../../../../public/motion/pitch.json';
import threeDData from '../../../../public/motion/3D.json';
import vrData from '../../../../public/motion/VR.json';
import aiData from '../../../../public/motion/AI.json';

import DashboardCV from '@/components/DashboardCV';
import { cn } from '@/lib/utils';
import { EASE, DUR, VP, STAGGER, fadeUpVariant, staggerVariant, drawPathVariant } from '@/lib/motion';
import CaseStudiesSection from './CaseStudiesSection';
import { FaqSection } from '@/components/landing/FaqSection';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const VIDEO_SRC =
  '/66ba00bc3fb6963aa301559c_687e4d169cd611930c0bd6d7_Daniel Portfolio Hero-transcode.mp4';

const SHOWREELS = [
  {
    slug: '8020-portfolio',
    title: '8020 Showreel 2025',
    subtitle: '60/40 Logic vs. Creative.',
    youtubeId: '7U_PO2WGqFw',
  },
  {
    slug: '3dprojects',
    title: '3D Design Reel',
    subtitle: 'Recent 3D projects and event animations.',
    youtubeId: 'K7JhmqWGiZw',
  },
];

const SERVICES = [
  {
    icon: LayoutTemplate,
    label: 'AD Banners',
    description: 'Animierte Display- und Social-Ads für Paid-Kampagnen.',
  },
  {
    icon: Lightbulb,
    label: 'Explainer',
    description: 'Erklärvideos die komplexe Produkte verständlich machen.',
  },
  {
    icon: MonitorPlay,
    label: 'Pitch Videos',
    description: 'Bewegtbild für Präsentationen, Events und Pitches.',
  },
  {
    icon: Box,
    label: '3D Renderings',
    description: 'Produktvisualisierungen in Blender und Unreal Engine.',
  },
  {
    icon: Sparkles,
    label: 'AI Videos',
    description: 'KI-generierte Bewegtbild-Inhalte und Hybrid-Produktionen.',
  },
  {
    icon: Glasses,
    label: 'VR / AR',
    description: 'Immersive Erlebnisse für Events, Showrooms und Präsentationen.',
  },
];

// img logos: transparent/SVG PNGs use brightness(0)+invert(1) to force white.
// JPGs with white bg use invert(1) only — white bg → black (blends into dark page), black logo → white.
type ClientLogo =
  | { name: string; type: 'img'; src: string; heightPx: number; filter?: string }
  | { name: string; type: 'audi' }
  | { name: string; type: 'text'; label: string };

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'MAN',        type: 'img', src: '/motion/Logo_MAN.svg.png',                   heightPx: 26 },
  { name: 'Audi',       type: 'audi' },
  { name: 'Volkswagen', type: 'img', src: '/motion/Volkswagen_logo_2019.svg.png',        heightPx: 34 },
  { name: 'CARIAD',     type: 'img', src: '/motion/cariad-logo-twilight.svg',            heightPx: 22 },
  { name: 'Porsche',    type: 'img', src: '/motion/Porsche_Schriftzug.svg.png',          heightPx: 22 },
  // JPG with white bg: invert(1) turns black logo→white, white bg→black (hidden on dark page)
  { name: 'Ensinger',   type: 'img', src: '/motion/Ensinger-Logo-vorne-sw_black.jpg',   heightPx: 28, filter: 'invert(1)' },
  { name: '8020 Consulting', type: 'text', label: '8020' },
];

// ---------------------------------------------------------------------------
// OffsetLottie — starts the animation at a given frame to create time offset
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
      speed={speed}
      style={style}
      rendererSettings={assetsPath ? { assetsPath } : undefined}
    />
  );
}

// ---------------------------------------------------------------------------
// Bento card visuals — decorative micro-illustrations for each service
// ---------------------------------------------------------------------------

function BannerVisual() {
  return (
    <div className="flex flex-col gap-1.5 opacity-60">
      {[80, 55, 68].map((w, i) => (
        <motion.div
          key={i}
          className="h-2 rounded-full bg-primary/70"
          style={{ width: `${w}%` }}
          animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.96, 1, 0.96] }}
          transition={{ duration: 2.4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}
      <motion.div
        className="mt-1 flex gap-1.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {['16:9', '1:1', '9:16'].map((r) => (
          <span key={r} className="rounded border border-primary/40 px-1 py-0.5 text-[9px] font-mono text-primary/80">{r}</span>
        ))}
      </motion.div>
    </div>
  );
}

function WaveformVisual() {
  const bars = [3, 6, 4, 8, 5, 9, 4, 7, 3, 6, 8, 4];
  return (
    <div className="flex items-end gap-0.5 opacity-60">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-sm bg-primary/70"
          style={{ height: h * 4 }}
          animate={{ scaleY: [1, 0.4 + Math.random() * 0.6, 1] }}
          transition={{ duration: 0.6 + i * 0.07, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

function PresentationVisual() {
  return (
    <div className="w-full opacity-60">
      <div className="rounded border border-border/60 bg-muted/30 p-2">
        <div className="mb-1.5 h-1.5 w-1/2 rounded-full bg-primary/50" />
        {[100, 75, 85].map((w, i) => (
          <motion.div
            key={i}
            className="mb-1 h-px bg-foreground/20"
            style={{ width: `${w}%` }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.2, ease: EASE }}
          />
        ))}
      </div>
    </div>
  );
}

function CubeVisual() {
  return (
    <motion.div
      className="relative opacity-50"
      style={{ width: 40, height: 40, transformStyle: 'preserve-3d' }}
      animate={{ rotateY: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <polygon points="20,4 36,13 36,27 20,36 4,27 4,13" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" opacity="0.8"/>
        <line x1="20" y1="4" x2="20" y2="36" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.5"/>
        <line x1="4" y1="13" x2="36" y2="13" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.5"/>
        <line x1="4" y1="27" x2="36" y2="27" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.5"/>
      </svg>
    </motion.div>
  );
}

function SparkleVisual() {
  const sparks = [
    { x: 10, y: 20, d: 2.1 }, { x: 35, y: 10, d: 1.6 }, { x: 60, y: 25, d: 2.8 },
    { x: 80, y: 12, d: 1.9 }, { x: 50, y: 5,  d: 2.3 }, { x: 20, y: 35, d: 1.5 },
    { x: 70, y: 30, d: 2.0 }, { x: 45, y: 38, d: 1.7 },
  ];
  return (
    <div className="relative h-10 w-full opacity-70">
      {sparks.map((s, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary"
          style={{ left: `${s.x}%`, top: `${s.y * 2}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: s.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

function LensVisual() {
  return (
    <div className="flex items-center gap-1 opacity-60">
      <motion.div
        className="relative h-10 w-10"
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-primary/60" />
        <div className="absolute inset-[5px] rounded-full border border-primary/30" />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70" />
      </motion.div>
      <motion.div
        className="relative h-10 w-10"
        animate={{ x: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-primary/60" />
        <div className="absolute inset-[5px] rounded-full border border-primary/30" />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70" />
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AudiRings() {
  // 4 interlocked rings — proper Audi proportions
  return (
    <svg
      viewBox="0 0 124 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Audi"
      style={{ height: 26, width: 'auto' }}
    >
      <circle cx="17"  cy="17" r="15" stroke="white" strokeWidth="2.5" />
      <circle cx="45"  cy="17" r="15" stroke="white" strokeWidth="2.5" />
      <circle cx="73"  cy="17" r="15" stroke="white" strokeWidth="2.5" />
      <circle cx="101" cy="17" r="15" stroke="white" strokeWidth="2.5" />
    </svg>
  );
}

function ClientLogoItem({ logo }: { logo: ClientLogo }) {
  const wrap = 'opacity-40 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center';

  if (logo.type === 'audi') {
    return (
      <div className={wrap} title="Audi">
        <AudiRings />
      </div>
    );
  }

  if (logo.type === 'text') {
    return (
      <div className={wrap} title={logo.name}>
        <span
          className="font-bold text-white"
          style={{ fontSize: 17, letterSpacing: '-0.02em', fontFamily: 'system-ui, sans-serif' }}
        >
          {logo.label}
        </span>
      </div>
    );
  }

  return (
    <div className={wrap} title={logo.name}>
      <Image
        src={logo.src}
        alt={logo.name}
        width={140}
        height={logo.heightPx}
        className="w-auto object-contain"
        style={{
          height: logo.heightPx,
          filter: logo.filter ?? 'brightness(0) invert(1)',
        }}
        unoptimized
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ShowreelCard — YouTube facade with editorial layout
// ---------------------------------------------------------------------------

function ShowreelCard({ youtubeId, title, subtitle }: { youtubeId: string; title: string; subtitle: string }) {
  const [active, setActive] = React.useState(false);
  const thumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl bg-black" style={{ aspectRatio: '16/9' }}>
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          {/* Thumbnail */}
          <img
            src={thumb}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Play button */}
          <button
            onClick={() => setActive(true)}
            aria-label={`Play ${title}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-white"
          >
            <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7 translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-1">{subtitle}</p>
            <h3 className="text-2xl font-black tracking-tight text-white leading-tight">{title}</h3>
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MotionPage() {
  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Motion', href: '/motion' },
  ];

  return (
    <DashboardCV variant="default" breadcrumbs={breadcrumbs} pageTitle="Motion" showSearch={false}>
      <div className="space-y-16 pb-16">

        {/* ------------------------------------------------------------------ */}
        {/* 1 · VIDEO HERO                                                      */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          className="relative -mx-4 overflow-hidden rounded-2xl sm:-mx-6 lg:mx-0"
          style={{ minHeight: '60vh' }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DUR.xl, ease: EASE }}
        >
          <video
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            style={{ minHeight: '60vh', maxHeight: '75vh' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          {/* Ambient floating orb — always moving */}
          <motion.div
            className="pointer-events-none absolute right-12 top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
            animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-6 left-6 right-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.md, ease: EASE, delay: 0.4 }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
              Motion Design
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl">
              Motion Work
            </h1>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------------------------ */}
        {/* 2 · SERVICES                                                        */}
        {/* ------------------------------------------------------------------ */}
        <motion.section
          variants={staggerVariant(STAGGER.sm, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="space-y-6"
        >
          <motion.div variants={fadeUpVariant(0)} className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Was ich mache</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Von der Konzeption bis zur fertigen Datei — end-to-end Motion Design.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid auto-rows-[200px] grid-cols-3 gap-3">

            {/* AD Banners — col-span-2 */}
            <motion.div
              variants={fadeUpVariant(0.05)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: DUR.xs }}
              className="group relative col-span-2 overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 p-5 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
                <div className="w-36 opacity-90" style={{ filter: 'brightness(1.3) saturate(1.2) drop-shadow(0 0 10px rgba(130,210,50,0.45))' }}>
                  <OffsetLottie animationData={adBannerData} targetDuration={5.2} startFrame={0} />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="text-sm font-semibold leading-snug">AD Banners</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">Animierte Display- und Social-Ads für Paid-Kampagnen.</p>
              </div>
            </motion.div>

            {/* Explainer — row-span-2 */}
            <motion.div
              variants={fadeUpVariant(0.08)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: DUR.xs }}
              className="group relative row-span-2 overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 p-5 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-x-4 top-2 h-2/3">
                <OffsetLottie animationData={explainerData} speed={0.9} startFrame={18}
                  style={{ width: '100%', height: '100%', filter: 'brightness(1.6) saturate(1.5) drop-shadow(0 0 12px rgba(130,210,50,0.5))' }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="text-sm font-semibold leading-snug">Explainer</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">Erklärvideos die komplexe Produkte verständlich machen.</p>
              </div>
            </motion.div>

            {/* Pitch Videos */}
            <motion.div
              variants={fadeUpVariant(0.1)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: DUR.xs }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 p-5 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-70"
                style={{ filter: 'brightness(1.5) saturate(1.4) drop-shadow(0 0 10px rgba(130,210,50,0.45))' }}>
                <div className="w-28"><OffsetLottie animationData={pitchData} speed={1.15} startFrame={36} /></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="text-sm font-semibold leading-snug">Pitch Videos</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">Bewegtbild für Präsentationen, Events und Pitches.</p>
              </div>
            </motion.div>

            {/* 3D Renderings */}
            <motion.div
              variants={fadeUpVariant(0.12)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: DUR.xs }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 p-5 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-65"
                style={{ filter: 'brightness(1.6) saturate(1.5) drop-shadow(0 0 10px rgba(130,210,50,0.45))' }}>
                <div className="w-32"><OffsetLottie animationData={threeDData} speed={0.75} startFrame={12} /></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="text-sm font-semibold leading-snug">3D Renderings</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">Produktvisualisierungen in Blender und Unreal Engine.</p>
              </div>
            </motion.div>

            {/* AI Videos — col-span-2 */}
            <motion.div
              variants={fadeUpVariant(0.14)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: DUR.xs }}
              className="group relative col-span-2 overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 p-5 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-70"
                style={{ filter: 'brightness(1.6) saturate(1.5) drop-shadow(0 0 12px rgba(130,210,50,0.5))' }}>
                <div className="w-36"><OffsetLottie animationData={aiData} speed={1.2} startFrame={30} /></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="text-sm font-semibold leading-snug">AI Videos</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">KI-generierte Bewegtbild-Inhalte und Hybrid-Produktionen.</p>
              </div>
            </motion.div>

            {/* VR / AR */}
            <motion.div
              variants={fadeUpVariant(0.16)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: DUR.xs }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-muted/30 p-5 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-65"
                style={{ filter: 'brightness(1.6) saturate(1.5) drop-shadow(0 0 10px rgba(130,210,50,0.45))' }}>
                <div className="w-28"><OffsetLottie animationData={vrData} speed={0.85} startFrame={48} /></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <p className="text-sm font-semibold leading-snug">VR / AR</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">Immersive Erlebnisse für Events, Showrooms und Präsentationen.</p>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* ------------------------------------------------------------------ */}
        {/* 3 · CLIENT LOGOS — infinite marquee                                */}
        {/* ------------------------------------------------------------------ */}
        <motion.section
          variants={staggerVariant(STAGGER.sm, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="space-y-4"
        >
          <motion.p
            variants={fadeUpVariant(0)}
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70"
          >
            Kunden &amp; Marken
          </motion.p>

          <motion.div
            variants={fadeUpVariant(0.1)}
            className="relative overflow-hidden rounded-xl bg-black/20 py-5"
          >
            <div className="animate-marquee items-center gap-12 px-6">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                <ClientLogoItem key={i} logo={logo} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/20 to-transparent" />
          </motion.div>
        </motion.section>

        {/* ------------------------------------------------------------------ */}
        {/* 4 · FEATURED SHOWREELS                                              */}
        {/* ------------------------------------------------------------------ */}
        <motion.section
          variants={staggerVariant(STAGGER.md, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="space-y-8"
        >
          <motion.div variants={fadeUpVariant(0)} className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">Showreels</p>
            <h2 className="text-4xl font-black tracking-tight leading-none">Featured Work</h2>
          </motion.div>

          <div className="space-y-4">
            {SHOWREELS.map((reel, idx) => (
              <motion.div key={reel.slug} variants={fadeUpVariant(idx * 0.1)}>
                <ShowreelCard youtubeId={reel.youtubeId} title={reel.title} subtitle={reel.subtitle} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ------------------------------------------------------------------ */}
        {/* 5 · CASE STUDIES                                                    */}
        {/* ------------------------------------------------------------------ */}
        <CaseStudiesSection />

        {/* ------------------------------------------------------------------ */}
        {/* 6 · FAQ                                                              */}
        {/* ------------------------------------------------------------------ */}
        <FaqSection />

      </div>
    </DashboardCV>
  );
}
