'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';
import { contact } from '@/content/home';
import { EASE, DUR } from '@/lib/motion';

import { HeroSection } from '@/components/landing/HeroSection';
import { TopNav } from '@/components/landing/TopNav';
import { ClientLogos } from '@/components/landing/ClientLogos';
import { ProjectShowcase } from '@/components/landing/ProjectShowcase';
import { KontrastBanner } from '@/components/landing/KontrastBanner';
import { TechStackSection } from '@/components/landing/TechStackSection';
import { MotionPortfolioSection } from '@/components/landing/MotionPortfolioSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { TextMarqueeSection } from '@/components/landing/TextMarqueeSection';

/** Below-fold sections: separate JS chunks + defer parse on slow connections */
function BelowFoldSkeleton() {
  return (
    <div
      className="min-h-[200px] animate-pulse rounded-2xl border border-border bg-muted/20"
      aria-hidden
    />
  );
}

const ExperienceTimelineSection = dynamic(
  () =>
    import('@/components/landing/ExperienceTimelineSection').then((m) => ({
      default: m.ExperienceTimelineSection,
    })),
  { loading: () => <BelowFoldSkeleton /> },
);

const EducationSection = dynamic(
  () => import('@/components/landing/EducationSection').then((m) => ({ default: m.EducationSection })),
  { loading: () => <BelowFoldSkeleton /> },
);

const MOTION_PORTFOLIO_URL = 'https://daniels-portfolio-b20cfa.webflow.io/';

export function NextGenStartPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* Top Navigation — Desktop only */}
      <TopNav />

      {/* 1. Hero — Full width */}
      <HeroSection />

      {/* 2. Client Logos — Full width */}
      <div className="pb-8">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <ClientLogos />
        </div>
      </div>

      {/* 3. Featured Projects — Full width */}
      <ProjectShowcase />

      {/* 4. Kontrast Festival — Light emphasis */}
      <KontrastBanner />

      {/* 5. Staggered text marquee */}
      <TextMarqueeSection />

      {/* 6. Motion Portfolio — Light */}
      <MotionPortfolioSection />

      {/* 6. Tech Stack — Compact */}
      <TechStackSection />

      {/* 7. About — Dark */}
      <AboutSection />

      {/* 8. Experience Timeline — Dark */}
      <motion.section
        className="scroll-mt-24 space-y-16 py-20 md:py-28"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <ExperienceTimelineSection />
          <EducationSection />
        </div>
      </motion.section>

      {/* 9. Footer CTA — Accent/Inverse */}
      <motion.footer
        className="bg-primary px-6 py-20 text-center md:px-12 md:py-28"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
      >
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-primary-foreground md:text-4xl">
            Let&apos;s connect
          </h2>
          <p className="text-sm leading-relaxed text-primary-foreground/80">
            Complex system, tight deadline, difficult stakeholders? That&apos;s when I&apos;m most useful.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary-foreground px-8 text-sm font-semibold text-primary shadow transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              {contact.email}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm font-medium text-primary-foreground/70">
            <a
              className="transition-colors hover:text-primary-foreground"
              href="https://linkedin.com/in/daniel-peters-055296203/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/contrastfestival.archive"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-primary-foreground"
            >
              Instagram
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
            <a
              href={MOTION_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 transition-colors hover:text-primary-foreground"
            >
              Motion Portfolio
              <ExternalLink className="h-3 w-3 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
