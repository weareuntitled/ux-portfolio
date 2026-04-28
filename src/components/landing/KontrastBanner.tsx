'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';
import { getProjectBySlug, getProjectCoverImage } from '@/content/portfolio';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

export function KontrastBanner() {
  const reduceMotion = useReducedMotion();
  const kontrast = getProjectBySlug('kontrast-festival');
  const cover = kontrast ? getProjectCoverImage(kontrast) : null;

  if (!kontrast) return null;

  return (
    <section className="border-y border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          <Link
            href="/projects/kontrast-festival"
            className="group relative block w-full overflow-hidden rounded-2xl border border-border/50"
          >
            {/* Background image */}
            <div className="relative aspect-[3/1] w-full overflow-hidden">
              {cover ? (
                <Image
                  src={cover}
                  alt="Kontrast Festival"
                  fill
                  quality={80}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="100vw"
                  unoptimized={shouldUnoptimizeImage(cover)}
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-primary/20 to-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12">
              <div className="max-w-lg">
                <span className="mb-2 inline-block rounded-full border border-border/50 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
                  Side Project
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl md:text-4xl">
                  Kontrast Festival
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Co-founded a regional cultural festival. Led visual identity, digital experience, and team operations. Grew from zero to 3,000+ attendees.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                  View case study
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
