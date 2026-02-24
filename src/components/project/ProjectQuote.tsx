// src/components/project/ProjectQuote.tsx
'use client';

import { cn } from '@/lib/utils';

type ProjectQuoteProps = {
  quote: string;
  footer?: string;
  className?: string;
};

export function ProjectQuote({ quote, footer, className }: ProjectQuoteProps) {
  if (!quote?.trim()) return null;

  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both',
        className
      )}
    >
      <blockquote className="border-l-4 border-primary bg-primary/5 p-8 text-lg italic text-zinc-200">
        &ldquo;{quote}&rdquo;
        {footer ? (
          <footer className="mt-4 text-sm not-italic text-zinc-500">{footer}</footer>
        ) : null}
      </blockquote>
    </div>
  );
}