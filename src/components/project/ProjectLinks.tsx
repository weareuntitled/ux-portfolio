'use client';

import { ExternalLink } from 'lucide-react';

export type ProjectLinksProps = {
  links: Array<{ label: string; href: string }>;
};

export function ProjectLinks({ links }: ProjectLinksProps) {
  if (!links?.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {link.label}
          <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </a>
      ))}
    </div>
  );
}
