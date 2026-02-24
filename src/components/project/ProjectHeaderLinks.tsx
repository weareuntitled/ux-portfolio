'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResolvedProject } from '@/lib/cms/types';

type Props = { project: ResolvedProject };

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export function ProjectHeaderLinks({ project }: Props) {
  const links = project.links ?? [];
  if (!links.length) return null;

  // Priority order, then fallback
  const priority = ['Live demo', 'Prototype', 'GitHub', 'Case study'];
  const sorted = [...links].sort((a, b) => {
    const ia = priority.indexOf(a.label);
    const ib = priority.indexOf(b.label);
    const pa = ia === -1 ? 999 : ia;
    const pb = ib === -1 ? 999 : ib;
    return pa - pb;
  });

  const visible = sorted.slice(0, 3);

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {visible.map((l) => {
        const external = isExternal(l.href);
        if (external) {
          return (
            <Button key={l.href} variant="secondary" size="sm" asChild>
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
                <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-70" aria-hidden />
              </a>
            </Button>
          );
        }

        return (
          <Button key={l.href} variant="secondary" size="sm" asChild>
            <Link href={l.href}>{l.label}</Link>
          </Button>
        );
      })}
    </div>
  );
}