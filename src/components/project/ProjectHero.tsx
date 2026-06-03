'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProjectHeroProps = {
  coverUrl?: string | null;
  subtitle?: string;
  title: string;
  roleLine?: string;
  tags?: string[];
  year?: string;
  children?: ReactNode;
};

export function ProjectHero({
  coverUrl,
  subtitle,
  title,
  roleLine,
  tags = [],
  year,
  children,
}: ProjectHeroProps) {
  const hasCover = Boolean(coverUrl && coverUrl.length > 0);
  const reduceMotion = useReducedMotion();
  const EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.section
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-border bg-card',
        'shadow-sm'
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.55, ease: EASE }}
    >
      {/* Backdrop: Apple-like "depth" and seamless integration */}
      <div className="absolute inset-0 -z-10">
        {hasCover ? (
          <>
            {/* blurred backdrop reuse, gives premium depth */}
            {!reduceMotion && (
              <motion.div
                className="absolute inset-0 opacity-35"
                initial={{ opacity: 0.15, scale: 1.08 }}
                animate={{ opacity: 0.35, scale: 1.03 }}
                transition={{ duration: 1.0, ease: EASE }}
              >
                <Image
                  src={coverUrl!}
                  alt=""
                  fill
                  className="object-cover blur-3xl"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                  quality={60}
                />
              </motion.div>
            )}

            {/* main cover */}
            <motion.div
              className="absolute inset-0"
              initial={reduceMotion ? false : { scale: 1.05, x: -10 }}
              animate={reduceMotion ? undefined : { scale: 1, x: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.9, ease: EASE }}
            >
              <Image
                src={coverUrl!}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
                quality={80}
              />
            </motion.div>

            {/* Apple-like overlays: soft top haze + strong bottom for text */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/35 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_25%,hsl(var(--foreground)/0.06),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_30%_20%,hsl(var(--primary)/0.18),transparent_60%)]" />
          </>
        ) : (
          <>
            {/* No cover fallback: still premium */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/90 to-muted/70" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_25%_20%,hsl(var(--primary)/0.16),transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/25 to-transparent" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative px-6 py-10 md:px-10 md:py-14">
        {/* Top meta row (Apple-like, light and minimal) */}
        <motion.div
          className="flex flex-wrap items-center gap-2"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.45, delay: 0.05, ease: EASE }}
        >
          {/* tiny spark icon chip for premium touch */}
          <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 opacity-70" />
            Case study
          </span>

          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/60 bg-background/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur"
            >
              {tag}
            </span>
          ))}

          {year && (
            <span className="rounded-full border border-border/60 bg-background/30 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur">
              {year}
            </span>
          )}
        </motion.div>

        {/* Title block */}
        <motion.div
          className="mt-6 max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.6, delay: 0.10, ease: EASE }}
        >
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Role row, minimal and Apple-like */}
        {roleLine && (
          <motion.div
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.5, delay: 0.16, ease: EASE }}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Role
            </span>
            <span className="text-foreground/90">{roleLine}</span>
          </motion.div>
        )}

        {/* Slot for meta cards or stats */}
        {children && (
          <motion.div
            className="mt-8"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.5, delay: 0.22, ease: EASE }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}