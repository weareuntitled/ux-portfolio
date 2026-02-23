'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { ResolvedProject } from '@/lib/cms/types';
import { Badge } from '@/components/ui/badge';

type Props = {
  project: ResolvedProject;
  children?: React.ReactNode; // meta cards slot
};

export function ProjectCaseStudyHero({ project, children }: Props) {
  const reduceMotion = useReducedMotion();
  const coverUrl = project.coverUrl ?? project.moodImageUrl ?? null;

  const EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="space-y-6">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-border bg-card"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={reduceMotion ? undefined : { duration: 0.55, ease: EASE }}
      >
        {/* Backdrop layer: removes harsh edges and integrates into background */}
        {coverUrl && !reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-35"
            initial={{ opacity: 0.12, scale: 1.06 }}
            animate={{ opacity: 0.35, scale: 1.02 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <Image
              src={coverUrl}
              alt=""
              fill
              className="object-cover blur-3xl"
              sizes="100vw"
              priority
            />
          </motion.div>
        )}

        {/* Cover image: no padding, no gap, always overflow hidden */}
        <div className="relative h-[320px] w-full md:h-[420px]">
          {coverUrl ? (
            <motion.div
              className="absolute inset-0"
              initial={reduceMotion ? false : { scale: 1.04, x: -8 }}
              animate={reduceMotion ? undefined : { scale: 1, x: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.9, ease: EASE }}
            >
              <Image
                src={coverUrl}
                alt={`${project.title} cover`}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 1100px"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/90 to-muted/70" />
          )}

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_25%_20%,rgba(132,204,22,0.18),transparent_60%)]" />

          {/* Text */}
          <motion.div
            className="relative z-10 flex h-full flex-col justify-end p-6 md:p-10"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.55, delay: 0.12, ease: EASE }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[10px] uppercase tracking-widest">
                {project.category}
              </Badge>
              {project.year && (
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {project.year}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              {project.title}
            </h1>

            {project.roles?.length ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Role: {project.roles.join(', ')}
              </p>
            ) : null}

            {project.oneLiner ? (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {project.oneLiner}
              </p>
            ) : null}
          </motion.div>
        </div>
      </motion.div>

      {/* Meta cards slot, animated as a group */}
      {children ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.45, delay: 0.18, ease: EASE }}
        >
          {children}
        </motion.div>
      ) : null}
    </section>
  );
}