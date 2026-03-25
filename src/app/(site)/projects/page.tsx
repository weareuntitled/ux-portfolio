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

  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Projects', href: '/projects' },
  ];

  return (
    <DashboardCV
      variant="default"
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
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, idx) => {
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
                    'group block overflow-hidden rounded-2xl border border-border bg-background/40 backdrop-blur-2xl',
                    'hover:bg-background/60 transition-colors'
                  )}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
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
                      <div className="absolute bottom-2 left-2 rounded-md border border-white/25 bg-black/45 p-1.5 shadow-sm backdrop-blur-sm">
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
      </div>
    </DashboardCV>
  );
}