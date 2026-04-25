'use client';

import React, { useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import DashboardCV from '@/components/DashboardCV';
import { fadeUpVariant, staggerVariant, scaleInVariant, STAGGER } from '@/lib/motion';

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------

interface Project {
  slug: string;
  label: string;
  title: string;
  year?: string;
  description: string;
  body: string;
  tags: string[];
  video?: string;
  videos?: string[];
  youtubeId?: string;
  nda?: boolean;
}

const SAMANI_REELS = [
  '/motion/SAMANI/SnapInsta.to_AQMySAYDcKNmXzrN5Ku986kRFIUfwUC-s77KuyCqCk9wF3w5OayIMCFH2t23zcYpNPJeAIOQTDT6_sK2V92U2Mlen2bcLmnS13W5Y8A.mp4',
  '/motion/SAMANI/SnapInsta.to_AQO-Ns7OrZgpftppuzPXgofG5BCV6Zg6jtatIIh-WVTp1OBAHvDthHJd3K0SGVgUrkUZvSnYi-_gfNzKUu_ry54YA08_kn8N2NEPs7A.mp4',
  '/motion/SAMANI/SnapInsta.to_AQPAvN5pqG2-SFZRne34AeGxZQAbilBknn4ZFa4I40VQP9udNnFRgRR-5IhInFPYG0SLol0SBc8z6PnssV98prjK8j4OpYDOhcbKvWQ.mp4',
  '/motion/SAMANI/SnapInsta.to_AQPKSKVo0VuxX_kTth0PlKkmjQU2W6Gape_YdMwRTQBGXAR9yesrf2w14z0gvDYBT7_sNN497y-Mf5PIpXzQaCjdSD7AmwLEWp1Pw1E.mp4',
  '/motion/SAMANI/SnapInsta.to_AQPVAc4ezaPVdtps3Y0iQVR7cBL_ofprCJpPfSUrJsAqyjP8H8oCQpqkmePttyekF_FWbrtHNZhlWgTNsqQqFNnnpRvgyLqZ1k2pzY.mp4',
];

const KONTRAST_REELS = [
  '/motion/Kontrast/SnapInsta.to_AQMu8_U-IMRTUstDok30PRrRwMX3wABEcBXSS5VcwQVW2WY0Tb-mKTAv1v2qVW3esEkzoUUCy7gATf-HHwC9R1gGy9FKz4A0-JpGDlI.mp4',
  '/motion/Kontrast/SnapInsta.to_AQMzzGPGUYeGmOWBv3SfV25gDz4Olak5_50qeGGxZfMPKmRdEYlAIzNu52xeqxN3VR6QS_8pSDSjfFryaNp3TlPEHiSrrh3hYi6K_jM.mp4',
  '/motion/Kontrast/SnapInsta.to_AQNVMhPfCdYgN6PY-2me8fnsJLSJWd1r8-eJd_G0imqlZXBvdZJQpD9IrrSkn2klrdd17vuozAkHKwtd3H93Agpv4Y-u8jDGIU5NOo4.mp4',
  '/motion/Kontrast/SnapInsta.to_AQNZ-9EZpHuU7M2EfI6QzFMUCJp9UfUDKc9NMjTPRqbcH3fq1mQfxQK9bhbmtjyhr4uczP01TGj5237ugQ6_aeO1U8T-MV0hgdilXHE.mp4',
  '/motion/Kontrast/SnapInsta.to_AQOAXy-uu-zUaLAh2En9C9VZ0hbuZ9zF2KCRc18iOFgBSa3vBXKg7jC5bcEdlKknYehvRwBBiDLJMQKbPmvF6J8uBqqydaDAxxl6Q8c.mp4',
  '/motion/Kontrast/SnapInsta.to_AQP68o_O2jLYVYWcPPr9xtkwXgz3rtcNIdjruN2EjHqdlqxyCRREMuHlanwYdKopofH1g6qs_k35lbaXCl7sKO4mBRceBb9Oa2TaRp8.mp4',
  '/motion/Kontrast/SnapInsta.to_AQPMjjhkJnFTvXIQLnmAxy2nLv8GBKbrRVd5RXFEB4XdJrNfPD9LLCO5WcWGY-cCusFK-s-3KxJM07mJBsRFjGaRzT2Ihp6XdW9mnts.mp4',
  '/motion/Kontrast/SnapInsta.to_AQPjw2_dJvowBLAXWHL_dpoOcAPbDEU_7FBliNboJlaiO4o3RUCzgVd7fBnweX_BtToJRgDUXYQRxbVd7wWp9getcv6mZzj5fJ_YxRs.mp4',
  '/motion/Kontrast/SnapInsta.to_AQPtoqULCInkJUbVaPwPn-v9yc-osIy3GJ3m5XjVRwQue8shtXHtcqDE72PnDJHy48P4A9IoHXcXLUMjIqz3Jt03JRQ9hbgyvxPovmw.mp4',
];

const PROJECTS: Project[] = [
  {
    slug: 'samani',
    label: 'Music Label · Social Content',
    title: 'Samani Music Label',
    year: '2023–2024',
    description: 'Modulares Content-System für ein Music Label — Social-First Templates und skalierbare AE-Animation.',
    body: 'Das Label musste für jedes Release extern designen lassen. Meine Lösung: Ein modulares System aus Figma-Templates und AE-Baukastenanmationen. Das Ergebnis: Unendliche Variationen, konsistenter Markenlook und alle Formate auf Knopfdruck.',
    tags: ['Social Media', 'Motion Design', 'Figma', 'After Effects', 'Template System'],
    youtubeId: 'vw8GUemVEH8',
    videos: SAMANI_REELS,
  },
  {
    slug: 'kontrast',
    label: 'Festival · Aftermovie',
    title: 'Kontrast Festival',
    year: '2022–2024',
    description: 'Kompletter visueller Auftritt des Festivals: Social Reels, 3D-Ads, Line-up-Content und Aftermovie.',
    body: 'Als Social-Media-Verantwortlicher habe ich den visuellen Auftritt des Festivals geprägt: klassische Videos, 3D-Werbevideos, Line-up-Reels und Ad-Banner. Das Highlight: die Director-Rolle für das offizielle Aftermovie.',
    tags: ['Social Media', 'Aftermovie', '3D Motion', 'After Effects', 'Direction'],
    youtubeId: 'Ufrnt73JJDU',
    videos: KONTRAST_REELS,
  },
  {
    slug: 'ensinger',
    label: '3D Motion & Webdesign',
    title: 'Ensinger Mineralbrunnen',
    year: '2024',
    description:
      'Premium Hero-Shot für den Launch eines Maracuja-Drinks mit akkuraten 3D-Renderings von Flüssigkeiten.',
    body: 'Für die Einführung des neuen Maracuja-Drinks brauchte es einen Premium-Look via 80/20. Das Herzstück: Ein aufwendiger Hero-Shot mit extrem akkuraten 3D-Renderings. Zudem habe ich die Produkt-Features konzipiert und nahtlos ins Webdesign integriert. Der Rollout erfolgte großflächig in performanten HTML5-Werbebannern und Google Ads.',
    tags: ['3D Motion', 'HTML5 Banner', 'Webdesign', 'After Effects', 'Blender'],
    videos: [
      '/motion/Ensinger/FINAL_Ensinger_hero_landscape_1080p.mp4',
      '/motion/Ensinger/Ensinger_slideshow_final.mp4',
    ],
  },
  {
    slug: 'audi',
    label: 'Illustration & Motion',
    title: 'Audi – Digitaler Adventskalender',
    year: '2021–2025',
    description:
      'Illustration und Motion Design für den digitalen Audi Adventskalender — seit 2021 jedes Jahr.',
    body: 'Komplette Eigenillustration und Animation für den digitalen Audi Adventskalender. Jedes Jahr ein neues visuelles Konzept mit hochwertiger, täglicher Output-Qualität. Die Bandbreite reicht von weihnachtlichen Charakteren über Fahrzeuganimationen bis zu interaktiven Kalendertürchen.',
    tags: ['Illustration', 'Motion Design', 'Automotive', 'After Effects'],
    video: '/motion/AUDI_christmacalender/Audi_Digitaler_Adventskalender_Video3_rentier02.mp4',
  },
  {
    slug: 'explainer-automotive',
    label: 'Erklärvideo',
    title: 'Automotive Software',
    year: '2023',
    description:
      'Konzeption und Animation eines internen Erklärvideos für einen großen Automobilkunden.',
    body: 'Ziel: Ein hochkomplexes Software-Tool für Zertifizierungsprozesse verständlich aufzubereiten. Das Projekt umfasste die komplette Konzeptionsphase — von der Zielgruppenanalyse über Skript und Storyboard bis zur finalen Animation. Details auf Anfrage.',
    tags: ['Konzept', 'Skript', 'Animation', 'Automotive'],
    video: '/motion/Explainer_automotive/20220721_MAIN_EV@LUTION.mp4',
    nda: true,
  },
  {
    slug: 'explainer-schooling',
    label: 'Video Series',
    title: 'Corporate Schooling',
    year: '2023',
    description:
      'Skalierbare Erklärvideo-Reihe für die Schnellschulung neu ausgebauter Rollen in einem Großkonzern.',
    body: 'Vom Skript über Storyboard direkt in die Animation — mit fast null Korrekturschleifen. Das modulare System erlaubt es dem Kunden, neue Episoden mit minimalem Aufwand zu produzieren. Die Reihe skaliert über verschiedene Abteilungen und Schulungsinhalte. Details auf Anfrage.',
    tags: ['Skript', 'Storyboard', 'Animation', 'Corporate'],
    video: '/motion/Explainer_Schooling/MAN_TPL-CSM_Revision01.mp4',
    nda: true,
  },
  {
    slug: 'pitch-videos',
    label: 'Pitch Video',
    title: 'Townhall Pitch',
    year: '2022',
    description:
      'Visuelle Konzeption für den Pitch eines neuen Tools auf einem großen Townhall-Event.',
    body: 'Das Projekt umfasst intensive Konzept- und Styleframe-Phasen sowie die Ausarbeitung der visuellen Sprache. Ziel war es, ein komplexes Tool verständlich und überzeugend vor einem großen internen Publikum zu präsentieren. Details auf Anfrage.',
    tags: ['Concept', 'Styleframes', 'Pitch', 'Corporate'],
    video: '/motion/Pitch%20videos/Animation_AI_01.mp4',
    nda: true,
  },
];

// ---------------------------------------------------------------------------
// YouTubeFacade
// ---------------------------------------------------------------------------

function YouTubeFacade({ videoId }: { videoId: string }) {
  const [active, setActive] = useState(false);
  if (active) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube video"
      />
    );
  }
  return (
    <button
      className="group relative block h-full w-full overflow-hidden"
      onClick={() => setActive(true)}
      aria-label="Video abspielen"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/15" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-2xl ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110">
          <Play className="h-6 w-6 translate-x-0.5 fill-black text-black" />
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// ReelGrid
// ---------------------------------------------------------------------------

function ReelCard({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-muted ring-1 ring-border/60 transition-all duration-300 hover:ring-primary/50"
      style={{ aspectRatio: '9/16' }}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
    >
      <video ref={ref} src={src} preload="none" muted loop playsInline className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          <Play className="h-3.5 w-3.5 translate-x-0.5 fill-white text-white" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VideoBlock
// ---------------------------------------------------------------------------

function VideoBlock({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-muted"
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
      }}
    >
      <video ref={ref} src={src} preload="none" muted loop playsInline className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-500 group-hover:opacity-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          <Play className="h-4 w-4 translate-x-0.5 fill-white text-white" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MotionProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Motion', href: '/motion' },
    { label: project.title, href: `/motion/${project.slug}` },
  ];

  return (
    <DashboardCV variant="default" breadcrumbs={breadcrumbs} pageTitle={project.title} showSearch={false}>
      <div className="space-y-12 pb-24">

        {/* Back link */}
        <motion.div variants={fadeUpVariant(0)} initial="hidden" animate="show">
          <Link href="/motion" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            Zurück zu Motion
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          variants={staggerVariant(STAGGER.md)}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <motion.div variants={fadeUpVariant(0)} className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">{project.label}</span>
            {project.year && (
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted-foreground">{project.year}</span>
            )}
            {project.nda && (
              <span className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
                <Lock className="h-3 w-3" /> NDA
              </span>
            )}
          </motion.div>
          <motion.h1 variants={fadeUpVariant(0.05)} className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {project.title}
          </motion.h1>
          <motion.p variants={fadeUpVariant(0.1)} className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.body}
          </motion.p>
          <motion.div variants={fadeUpVariant(0.15)} className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Media */}
        <div className="space-y-8">
          {project.youtubeId && (
            <motion.div
              variants={scaleInVariant(0.1)}
              initial="hidden"
              animate="show"
              className="aspect-video w-full overflow-hidden rounded-2xl border border-border/50"
            >
              <YouTubeFacade videoId={project.youtubeId} />
            </motion.div>
          )}

          {project.videos && project.youtubeId && (
            <motion.div variants={fadeUpVariant(0.1)} initial="hidden" animate="show" className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80">Reels</span>
                <span className="h-px flex-1 bg-border/50" />
                <span className="text-[10px] tabular-nums text-muted-foreground">{project.videos.length} Videos</span>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {project.videos.map((src) => <ReelCard key={src} src={src} />)}
              </div>
            </motion.div>
          )}

          {project.videos && !project.youtubeId && (
            <motion.div
              variants={staggerVariant(STAGGER.md)}
              initial="hidden"
              animate="show"
              className="grid gap-4 sm:grid-cols-2"
            >
              {project.videos.map((src) => (
                <motion.div key={src} variants={scaleInVariant(0)}>
                  <VideoBlock src={src} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {project.video && !project.youtubeId && (
            <motion.div variants={scaleInVariant(0.1)} initial="hidden" animate="show">
              <VideoBlock src={project.video} />
            </motion.div>
          )}
        </div>

      </div>
    </DashboardCV>
  );
}

