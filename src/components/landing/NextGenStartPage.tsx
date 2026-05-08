'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Film, FolderKanban, ArrowUpRight, Mail, Phone } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';

import { HeroSection } from '@/components/landing/HeroSection';
import { ClientLogos } from '@/components/landing/ClientLogos';
import { KontrastBanner } from '@/components/landing/KontrastBanner';
import { AboutToolsSection } from '@/components/landing/AboutToolsSection';
import { TextMarqueeSection } from '@/components/landing/TextMarqueeSection';
import { getAllProjects, getProjectCoverImage } from '@/content/portfolio';
import type { PortfolioProject } from '@/content/portfolio.types';
import { shouldUnoptimizeImage } from '@/lib/project-assets';
import { cn } from '@/lib/utils';
import { contact } from '@/content/home';

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

// Enterprise projects to show on homepage
const ENTERPRISE_SLUGS = ['kovon', 'ffp-dashboard', 'automation', 'emission-compliance'];

function ProjectCard({ project }: { project: PortfolioProject }) {
  const reduceMotion = useReducedMotion();
  const isMotion = project.category === 'Motion';
  const Icon = isMotion ? Film : FolderKanban;
  const cover = getProjectCoverImage(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE, delay: Math.min(0.03, 0.25) }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          'group block overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f12] backdrop-blur-2xl',
          'transition-all duration-400 ease-card-hover',
          'hover:border-primary/40 hover:translate-y-[-4px] hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} cover`}
              fill
              className="object-cover transition-transform duration-400 ease-card-hover group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized={shouldUnoptimizeImage(cover)}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-muted-foreground">
              <Icon className="h-6 w-6" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 ease-card-hover group-hover:opacity-100">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Icon className="h-4 w-4" />
            <span>{project.category}</span>
            {project.year ? <span className="ml-auto font-normal tracking-normal">{project.year}</span> : null}
          </div>

          <h3 className="mt-2 text-base font-semibold tracking-[-0.04em]">{project.title}</h3>
          {project.subtitle ? <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p> : null}
          {project.oneLiner ? <p className="mt-2 text-sm text-muted-foreground">{project.oneLiner}</p> : null}
        </div>
      </Link>
    </motion.div>
  );
}

function ContactFooterSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0f0f12]">
      {/* Inner padding container */}
      <div className="mx-auto max-w-2xl py-20 px-4 text-white md:py-28 md:px-6">
        {/* Gradient wash */}
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>

        {/* Noise overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 text-center">
          <motion.div
          className="mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, ease: EASE }}
        >
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-white/5 bg-muted ring-2 ring-primary/20 md:h-28 md:w-28">
            <Image
              src={contact.profileImage}
              alt={contact.name}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
        </motion.div>

        <motion.h2
          className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          Let&apos;s build something.
        </motion.h2>

        <motion.p
          className="mb-8 text-base leading-relaxed text-white/60"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
        >
          {contact.tagline}
        </motion.p>

        <motion.div
          className="mb-8 space-y-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.15, ease: EASE }}
        >
          <a
            href={`mailto:${contact.email}`}
            className="group mx-auto inline-flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-primary"
          >
            {contact.email}
            <ArrowUpRight className="h-4 w-4 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
          <div className="flex items-center justify-center gap-6 text-sm text-white/50">
            <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone className="h-3.5 w-3.5" /> {contact.phone}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.2, ease: EASE }}
        >
          <a
            href={`mailto:${contact.email}?subject=Hello%20%E2%80%94%20project%20inquiry`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send a message
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

export function NextGenStartPage() {
  const reduceMotion = useReducedMotion();
  const allProjects = getAllProjects();
  const enterpriseProjects = allProjects.filter(p => ENTERPRISE_SLUGS.includes(p.slug));

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* 1. Hero — Full width */}
      <HeroSection />

      {/* 2. Client Logos — Full width, seamless from hero */}
      <ClientLogos />

      {/* 3. Selected Work — Enterprise project thumbnails */}
      <section className="py-20 md:py-28">
        <div className="w-full px-4 sm:px-6">
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
                Enterprise Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              View all →
            </Link>
          </motion.div>

          {/* Project thumbnails grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {enterpriseProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
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

      {/* 7. Contact Footer */}
      <ContactFooterSection />
    </main>
  );
}
