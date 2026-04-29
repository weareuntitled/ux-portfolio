'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[]; rightSlot?: React.ReactNode };

export function Breadcrumbs({ items, rightSlot }: Props) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
        style={{ fontFamily: "'Bitcount', var(--font-mono), monospace", fontWeight: 400, fontStyle: 'italic' }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1 text-xs sm:text-[11px]">
            {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 text-foreground/30" aria-hidden />}
            {item.href != null ? (
              <Link
                href={item.href}
                className="text-foreground/50 transition-colors hover:text-foreground hover:no-underline"
                style={{ fontStyle: 'normal' }}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/70" style={{ fontStyle: 'normal' }}>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
      {rightSlot ? <div className="flex items-center gap-2">{rightSlot}</div> : null}
    </div>
  );
}
