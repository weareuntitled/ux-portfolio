'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';
import { getProjectBySlug, getProjectCoverImage, type PortfolioProject } from '@/content/portfolio';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

const SHOWCASE_SLUGS = ['kovon', 'ffp-dashboard', 'emission-compliance'] as const;

const projects = SHOWCASE_SLUGS
  .map((slug) => getProjectBySlug(slug))
  .filter((p): p is PortfolioProject => p != null);

// Outcomes/deliverables mapping by slug (aligned with portfolio.ts case studies)
const PROJECT_OUTCOMES: Record<string, string> = {
  'kovon': 'Eliminated Excel tracking chaos · 100% audit-ready visibility · 200 active users',
  'ffp-dashboard': 'Consolidated 6 months of fragmented input · Symptom-first triage flow · Modular reusable patterns',
  'emission-compliance': 'Faster anomaly detection in dense tables · Adjustable thresholds · Zero overlooked breaches',
};

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const reduceMotion = useReducedMotion();
  const cover = getProjectCoverImage(project);
  const outcome = PROJECT_OUTCOMES[project.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: index * 0.1, ease: EASE }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border/50 bg-card"
      >
        {/* Full-width image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[2.4/1]">
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} cover`}
              fill
              quality={80}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
              unoptimized={shouldUnoptimizeImage(cover)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted via-muted/90 to-muted/70">
              <span className="font-mono text-sm text-muted-foreground">No preview</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Content overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-3xl">
              {/* Category badge — hidden on mobile */}
              <span className="mb-1 hidden rounded-full border border-border/50 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm sm:mb-2 sm:inline-block">
                {project.category}
              </span>

              <h3 className="font-display text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl md:text-2xl lg:text-3xl">
                {project.title}
              </h3>

              {/* One-liner — hidden on mobile */}
              <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground/90 sm:block">
                {project.oneLiner}
              </p>

              {/* Outcomes / deliverables */}
              {outcome && (
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-primary/80 sm:mt-2 sm:text-[10px]">
                  {outcome}
                </p>
              )}
            </div>
            <div className="hidden shrink-0 sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/80 backdrop-blur-sm transition-colors group-hover:border-primary/50 group-hover:bg-primary/10 md:h-12 md:w-12">
                <ArrowUpRight className="h-4 w-4 text-foreground transition-colors group-hover:text-primary md:h-5 md:w-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="mb-10 flex items-end justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
              {'<!-- Featured Work -->'}
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Selected Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            View all →
          </Link>
        </motion.div>

        {/* Cards stack */}
        <div className="space-y-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
