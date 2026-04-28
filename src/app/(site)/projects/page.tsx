'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Film, Layers3, FolderKanban, SlidersHorizontal } from 'lucide-react';

import { BrandLogoMark } from '@/components/brand/BrandLogoMark';
import DashboardCV from '@/components/DashboardCV';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getAllProjects, getProjectCoverImage } from '@/content/portfolio';
import { shouldUnoptimizeImage } from '@/lib/project-assets';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Enterprise', value: 'Enterprise' },
  { label: 'Motion', value: 'Motion' },
  { label: 'Branding', value: 'Branding' },
  { label: 'Web', value: 'Web' },
  { label: 'Side', value: 'Side' },
  { label: 'Archive', value: 'Archive' },
];

export default function ProjectsPage() {
  const [q, setQ] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const all = useMemo(() => getAllProjects(), []);

  const filtered = useMemo(() => {
    let result = all;
    const s = q.trim().toLowerCase();
    if (s) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(s) ||
        (p.subtitle ?? '').toLowerCase().includes(s) ||
        (p.oneLiner ?? '').toLowerCase().includes(s) ||
        (p.category ?? '').toLowerCase().includes(s)
      );
    }
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    return result;
  }, [all, q, activeCategory]);

  const breadcrumbs = [
    { label: 'Daniel Peters', href: '/' },
    { label: 'Projects', href: '/projects' },
  ];

  return (
    <DashboardCV
      variant="fullwidth"
      breadcrumbs={breadcrumbs}
      showSearch={false}
    >
      <div className="w-full">
        {/* Page header */}
        <div className="mb-12 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Projects
          </h1>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''} across design, engineering, and strategy.
            </p>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-10 w-full rounded-full border border-white/5 bg-[#0f0f12] pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/50">
                Filter
              </p>
              {CATEGORIES.map((cat) => {
                const count = cat.value === 'all' ? all.length : all.filter((p) => p.category === cat.value).length;
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <span>{cat.label}</span>
                    <span className="text-xs text-muted-foreground/50">{count}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Mobile filter toggle */}
          <div className="mb-4 flex items-center gap-3 lg:hidden">
            <Sheet>
              <SheetTrigger className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-[#0f0f12] px-3 py-2 text-sm text-foreground">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] border-border bg-background p-5">
                <div className="mt-8 space-y-1">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/50">
                    Filter
                  </p>
                  {CATEGORIES.map((cat) => {
                    const count = cat.value === 'all' ? all.length : all.filter((p) => p.category === cat.value).length;
                    const isActive = activeCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        onClick={() => setActiveCategory(cat.value)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <span>{cat.label}</span>
                        <span className="text-xs text-muted-foreground/50">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
            {activeCategory !== 'all' && (
              <span className="text-sm text-primary">
                {activeCategory} ({filtered.length})
              </span>
            )}
          </div>

          {/* Project grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <p className="text-sm">No projects match your search.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            )}
          </div>
        </div>
      </div>
    </DashboardCV>
  );
}
