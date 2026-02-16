'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[] };

export function Breadcrumbs({ items }: Props) {
  if (!items?.length) return null;
  return (
    <nav
      className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />}
          {item.href != null ? (
            <Link
              href={item.href}
              className="hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
