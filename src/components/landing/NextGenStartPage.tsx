'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Film, FolderKanban } from 'lucide-react';
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

// Selected projects to show on homepage
const SELECTED_PROJECT_SLUGS = ['kovon', 'ffp-dashboard', 'automation', 'kontrast-festival'];

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
          'transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          'hover:translate-y-[-4px] hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} cover`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized={shouldUnoptimizeImage(cover)}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-muted-foreground">
              <Icon className="h-6 w-6" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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

          <h3 className="mt-2 text-base font-semibold tracking-tight">{project.title}</h3>
          {project.subtitle ? <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p> : null}
          {project.oneLiner ? <p className="mt-2 text-sm text-muted-foreground">{project.oneLiner}</p> : null}
        </div>
      </Link>
    </motion.div>
  );
}

export function NextGenStartPage() {
  const reduceMotion = useReducedMotion();
  const allProjects = getAllProjects();
  const selectedProjects = allProjects.filter(p => SELECTED_PROJECT_SLUGS.includes(p.slug));

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* 1. Hero — Full width */}
      <HeroSection />

      {/* 2. Client Logos — Full width, seamless from hero */}
      <ClientLogos />

      {/* 3. Selected Work — Project thumbnails */}
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
                What are my projects
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
            {selectedProjects.map((project) => (
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

      {/* 7. Beyond: Dynamic sections, skeleton-loaded, post-LCP */}
      <BelowFoldSkeleton />
    </main>
  );
}
