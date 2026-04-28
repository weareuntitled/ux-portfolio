'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Film, Layers3, FolderKanban } from 'lucide-react';

import { BrandLogoMark } from '@/components/brand/BrandLogoMark';
import DashboardCV from '@/components/DashboardCV';
import { getAllProjects, getProjectCoverImage } from '@/content/portfolio';
import { shouldUnoptimizeImage } from '@/lib/project-assets';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const ENTERPRISE_SLUGS = ['kovon', 'automation', 'emission-compliance', 'ffp-dashboard'];

const OUTCOMES_BY_SLUG: Record<string, string[]> = {
  'kovon': ['Eliminated Excel tracking chaos', '100% audit-ready visibility', '200 active users'],
  'automation': ['Ended manual rework cycles', 'Integrity restored', '4h/week saved per expert'],
  'emission-compliance': ['Faster anomaly detection', 'Adjustable thresholds', 'Zero overlooked breaches'],
  'ffp-dashboard': ['Symptom-first triage flow', 'Modular reusable patterns', 'Consolidated 6 months of input'],
};

export default function ProjectsPage() {
  const [q, setQ] = useState('');

  const all = useMemo(() => getAllProjects(), []);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter((p) => {
      return (
        p.title.toLowerCase().includes(s) ||
        (p.subtitle ?? '').toLowerCase().includes(s) ||
        (p.oneLiner ?? '').toLowerCase().includes(s) ||
        (p.category ?? '').toLowerCase().includes(s)
      );
    });
  }, [all, q]);

  const enterpriseProjects = filtered.filter((p) => ENTERPRISE_SLUGS.includes(p.slug));
  const otherProjects = filtered.filter((p) => !ENTERPRISE_SLUGS.includes(p.slug));

  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Projects', href: '/projects' },
  ];

  return (
    <DashboardCV
      variant="fullwidth"
      breadcrumbs={breadcrumbs}
      pageTitle="Projects"
      searchQuery={q}
      onSearchChange={setQ}
      showSearch={true}
      headerRight={
        <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
          <Search className="h-4 w-4" />
          <span className="tabular-nums">{filtered.length}</span>
        </div>
      }
    >
      <div className="space-y-20">
        {/* Tier 1 — Enterprise Projects (full-width cards) */}
        {enterpriseProjects.length > 0 && (
          <section>
            <h2 className="mb-8 text-xl font-bold tracking-[-0.04em] text-foreground">
              Enterprise ({enterpriseProjects.length})
            </h2>
            <div className="space-y-8">
              {enterpriseProjects.map((p, idx) => {
                const cover = getProjectCoverImage(p);
                const outcomes = OUTCOMES_BY_SLUG[p.slug] ?? [];

                return (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/projects/${p.slug}`}
                      className={cn(
                        'group block overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f12]',
                        'transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
                        'hover:translate-y-[-4px] hover:scale-[1.005] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
                      )}
                    >
                      <div className="relative aspect-[21/9] w-full overflow-hidden">
                        {cover ? (
                          <Image
                            src={cover}
                            alt={`${p.title} cover`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            sizes="100vw"
                            unoptimized={shouldUnoptimizeImage(cover)}
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center text-muted-foreground">
                            <Layers3 className="h-6 w-6" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-white/5 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
                            {p.category}
                          </span>
                          {p.year && (
                            <span className="rounded-full border border-white/5 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
                              {p.year}
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl">
                          {p.title}
                        </h3>

                        {p.oneLiner && (
                          <p className="mt-2 max-w-3xl text-base leading-relaxed text-foreground/90">
                            {p.oneLiner}
                          </p>
                        )}

                        {outcomes.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {outcomes.map((outcome, i) => (
                              <span
                                key={i}
                                className="rounded-full border border-white/5 bg-background/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-primary/80 backdrop-blur-sm"
                              >
                                {outcome}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Tier 2 — Other Projects (3-col grid) */}
        {otherProjects.length > 0 && (
          <section>
            <h2 className="mb-8 text-xl font-bold tracking-[-0.04em] text-foreground">
              Everything Else ({otherProjects.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((p, idx) => {
                const isMotion = p.category === 'Motion';
                const Icon = isMotion ? Film : FolderKanban;
                const cover = getProjectCoverImage(p);

                return (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: Math.min(idx * 0.03, 0.25) }}
                  >
                    <Link
                      href={`/projects/${p.slug}`}
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
                            alt={`${p.title} cover`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            unoptimized={shouldUnoptimizeImage(cover)}
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center text-muted-foreground">
                            <Layers3 className="h-6 w-6" />
                          </div>
                        )}

                        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
                          <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
                        </div>

                        {p.slug === 'kontrast-festival' ? (
                          <div className="absolute bottom-2 left-2 rounded-md border border-white/5 bg-black/45 p-1.5 shadow-sm backdrop-blur-sm">
                            <BrandLogoMark
                              id="kontrastFestival"
                              label="Kontrast Festival"
                              size={56}
                              className="h-7 w-auto max-w-[100px] drop-shadow-sm"
                            />
                          </div>
                        ) : null}
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          <Icon className="h-4 w-4" />
                          <span>{p.category}</span>
                          {p.year ? <span className="ml-auto font-normal tracking-normal">{p.year}</span> : null}
                        </div>

                        <h3 className="mt-2 text-base font-semibold tracking-tight">{p.title}</h3>
                        {p.subtitle ? <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p> : null}
                        {p.oneLiner ? <p className="mt-2 text-sm text-muted-foreground">{p.oneLiner}</p> : null}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </DashboardCV>
  );
}
