'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { servicesGrid } from '@/content/home';
import { cn } from '@/lib/utils';

export function ServicesGridSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        What I do
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {servicesGrid.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              'group relative flex min-h-[140px] flex-col justify-between rounded-2xl border p-6 transition-colors',
              'featured' in item && item.featured
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-card hover:bg-muted/50'
            )}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <span
              className={cn(
                'absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                'featured' in item && item.featured ? 'bg-background/20 text-background' : 'bg-muted text-foreground'
              )}
              aria-hidden
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
