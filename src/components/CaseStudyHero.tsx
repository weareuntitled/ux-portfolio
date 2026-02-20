'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import type { ResolvedProject } from '@/lib/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MacBookFrame } from '@/components/MacBookFrame';

type Props = {
  project: ResolvedProject;
  /** Optional muted second line under the main title (e.g. "Clarity in chaos.") */
  heroTagline?: string;
};

export function CaseStudyHero({ project, heroTagline }: Props) {
  const proto = project.prototype;
  const hasInApp = proto?.prototypeType === 'in-app' && proto?.inAppPrototypeHref;
  const hasFigma = Boolean(proto?.figmaEmbedUrl);
  const hasPrototype = hasInApp || hasFigma;
  const label = project.prototypeButtonLabel ?? 'View Prototype';
  const moodUrl = project.moodImageUrl;

  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden pt-32 pb-20 px-6 text-center">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-[-20%] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden
      />

      <motion.div
        className="z-10 max-w-4xl space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Badge
          variant="outline"
          className="rounded-full border-border bg-background/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur-md"
        >
          Project {project.year} · {project.category}
        </Badge>

        <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-7xl">
          {project.title}.
          {heroTagline && (
            <>
              <br />
              <span className="text-muted-foreground">{heroTagline}</span>
            </>
          )}
        </h1>

        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
          {project.oneLiner}
        </p>

        <div className="flex justify-center gap-4 pt-8">
          {hasPrototype ? (
            hasInApp ? (
              <Button asChild className="rounded-full bg-primary px-8 py-6 text-lg font-medium text-primary-foreground transition-transform hover:bg-primary/90 active:scale-95">
                <Link href={proto!.inAppPrototypeHref!}>{label}</Link>
              </Button>
            ) : (
              <Button
                className="rounded-full bg-primary px-8 py-6 text-lg font-medium text-primary-foreground transition-transform hover:bg-primary/90 active:scale-95"
                onClick={() => document.getElementById('prototype')?.scrollIntoView({ behavior: 'smooth' })}
                type="button"
              >
                {label}
              </Button>
            )
          ) : (
            <Button asChild variant="secondary" className="rounded-full px-8 py-6 text-lg font-medium">
              <Link href="#case-study">Read Case Study</Link>
            </Button>
          )}
        </div>
      </motion.div>

      {/* MacBook hero image */}
      <motion.div
        className="mt-20 w-full px-4"
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: 'circOut' }}
      >
        <MacBookFrame>
          <div className="relative flex h-full w-full items-center justify-center bg-[#111]">
            {moodUrl ? (
              <Image
                src={moodUrl}
                alt=""
                fill
                className="object-cover opacity-90 transition-opacity duration-700 hover:opacity-100"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            ) : (
              <div className="flex flex-col items-center justify-center pointer-events-none">
                <span className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Interface Preview
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border animate-pulse">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </MacBookFrame>
      </motion.div>
    </section>
  );
}
