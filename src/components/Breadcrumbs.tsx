'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[]; rightSlot?: React.ReactNode };

export function Breadcrumbs({ items, rightSlot }: Props) {
  if (!items?.length) return null;
  return (
    <nav
      className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground font-mono"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 text-xs sm:text-[11px]">
          {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 text-foreground/30" aria-hidden />}
          {item.href != null ? (
            <Link
              href={item.href}
              className="text-foreground/50 transition-colors hover:text-foreground hover:no-underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground/70">{item.label}</span>
          )}
        </span>
      ))}
      {rightSlot ? <span className="ml-auto flex items-center gap-2">{rightSlot}</span> : null}
    </nav>
  );
}
