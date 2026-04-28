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

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const reduceMotion = useReducedMotion();
  const cover = getProjectCoverImage(project);

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
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80">
                {project.category} · {project.year}
              </p>
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground/90">
                {project.oneLiner}
              </p>
            </div>
            <div className="hidden shrink-0 sm:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-background/80 backdrop-blur-sm transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                <ArrowUpRight className="h-5 w-5 text-foreground transition-colors group-hover:text-primary" />
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
