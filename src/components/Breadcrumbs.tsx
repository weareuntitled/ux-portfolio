'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[]; rightSlot?: React.ReactNode };

export function Breadcrumbs({ items, rightSlot }: Props) {
  if (!items?.length) return null;
  return (
    <nav
      className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground font-mono"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 text-sm">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-foreground/40" aria-hidden />}
          {item.href != null ? (
            <Link
              href={item.href}
              className="font-medium text-foreground/80 transition-colors hover:text-foreground hover:no-underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground/80">{item.label}</span>
          )}
        </span>
      ))}
      {rightSlot ? <span className="ml-auto flex items-center gap-2">{rightSlot}</span> : null}
    </nav>
  );
}
