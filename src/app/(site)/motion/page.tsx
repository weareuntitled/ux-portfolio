'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import DashboardCV from '@/components/DashboardCV';
import { EASE, DUR, VP, STAGGER, fadeUpVariant, staggerVariant } from '@/lib/motion';
import CaseStudiesSection from './CaseStudiesSection';
import { FaqSection } from '@/components/landing/FaqSection';
import ExpertiseSectionMotion from '@/components/motion/ExpertiseSectionMotion';
import { ScrollLockGallery, type ScrollLockSlide } from '@/components/ui/ScrollLockGallery';

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
    subtitle: '3D-Projekte und Event-Animationen aus den letzten Monaten.',
    youtubeId: 'K7JhmqWGiZw',
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
// Page
// ---------------------------------------------------------------------------

export default function MotionPage() {
  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Motion', href: '/motion' },
  ];

  return (
    <DashboardCV variant="fullwidth" breadcrumbs={breadcrumbs} pageTitle="Motion" showSearch={false}>
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
        {/* 2 · EXPERTISE                                                       */}
        {/* ------------------------------------------------------------------ */}
        <ExpertiseSectionMotion />

        {/* ------------------------------------------------------------------ */}
        {/* 3 · CLIENT LOGOS — infinite marquee                                */}
        {/* ------------------------------------------------------------------ */}
        <motion.section
          variants={staggerVariant(STAGGER.sm, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          className="mt-8"
        >
          <motion.div
            variants={fadeUpVariant(0.1)}
            className="relative w-full overflow-hidden py-8"
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
        {/* 4 · FEATURED SHOWREELS — scroll-lock gallery                       */}
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

          {/* Scroll-locked gallery with YouTube thumbnails */}
          <div className="min-h-[200vh]">
            <ScrollLockGallery
              slides={SHOWREELS.map((reel): ScrollLockSlide => ({
                src: `https://img.youtube.com/vi/${reel.youtubeId}/maxresdefault.jpg`,
                label: reel.title,
                caption: reel.subtitle,
              }))}
            />
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
