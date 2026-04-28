'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ExternalLink, ArrowUpRight } from 'lucide-react';
import { contact } from '@/content/home';
import { EASE, DUR } from '@/lib/motion';

import { HeroSection } from '@/components/landing/HeroSection';
import { ClientLogos } from '@/components/landing/ClientLogos';
import { KontrastBanner } from '@/components/landing/KontrastBanner';
import { AboutToolsSection } from '@/components/landing/AboutToolsSection';
import { TextMarqueeSection } from '@/components/landing/TextMarqueeSection';
import { getProjectBySlug } from '@/content/portfolio';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

/** Below-fold sections: separate JS chunks + defer parse on slow connections */
function BelowFoldSkeleton() {
  return (
    <div
      className="min-h-[200px] animate-pulse rounded-2xl border border-white/5 bg-muted/20"
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

// Featured projects for scroll-lock treatment
const FEATURED_PROJECTS = [
  { slug: 'kovon', title: 'KoVoN COP Pilot', outcome: 'Eliminated Excel tracking chaos · 100% audit-ready visibility · 200 active users' },
  { slug: 'ffp-dashboard', title: 'FFP Dashboard', outcome: 'Consolidated 6 months of fragmented input · Symptom-first triage flow · Modular reusable patterns' },
];

function FeaturedProjectSection({ slug, title, outcome }: { slug: string; title: string; outcome: string }) {
  const project = getProjectBySlug(slug);
  const reduceMotion = useReducedMotion();

  if (!project || !project.galleryUrls?.length) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
      {/* Left: Sticky meta */}
      <motion.div
        className="lg:sticky lg:top-24 lg:self-start space-y-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">Case Study</p>
          <h3 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-foreground md:text-4xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.oneLiner}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {outcome.split(' · ').map((item, i) => (
            <span key={i} className="rounded-full border border-white/5 bg-[#0f0f12] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-primary/80">
              {item}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View case study
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>

      {/* Right: Card-style gallery grid */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.galleryUrls.slice(0, 6).map((src, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f12] backdrop-blur-2xl transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:translate-y-[-4px] hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE, delay: Math.min(i * 0.03, 0.25) }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={src}
                  alt={`${title} — Screen ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={shouldUnoptimizeImage(src)}
                />
                
                {/* Hover effect overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
                  <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function NextGenStartPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* 1. Hero — Full width */}
      <HeroSection />

      {/* 2. Client Logos — Full width, seamless from hero */}
      <ClientLogos />

      {/* 3. Featured Projects — Scroll-lock galleries */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section header */}
          <motion.div
            className="mb-16 flex items-end justify-between"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">Selected Work</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                2 / 4 Enterprise Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              View all →
            </Link>
          </motion.div>

          {/* Project 1 — KoVoN */}
          <div className="mb-32">
            <FeaturedProjectSection {...FEATURED_PROJECTS[0]} />
          </div>

          {/* Project 2 — FFP Dashboard */}
          <div>
            <FeaturedProjectSection {...FEATURED_PROJECTS[1]} />
          </div>
        </div>
      </section>

      {/* 4. Kontrast Festival — Light emphasis */}
      <KontrastBanner />

      {/* 5. Marquee — Motion */}
      <TextMarqueeSection
        words={['MOTION', 'PROJECTS', 'SYSTEMS', 'DESIGN', 'PRODUCT', 'STRATEGY', 'SHIP', 'BUILD']}
        speed={30}
      />

      {/* 6. About + Tools — Inverse dark */}
      <AboutToolsSection />

      {/* 9. Experience Timeline */}
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

      {/* 10. Footer CTA — Accent/Inverse */}
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
