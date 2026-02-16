'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { ResolvedProject } from '@/lib/cms/types';
import { PrototypeShell } from './PrototypeShell';

type Props = { project: ResolvedProject };

export function ProjectPrototypePanel({ project }: Props) {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const proto = project.prototype;
  const hasInApp = proto?.prototypeType === 'in-app' && proto?.inAppPrototypeHref;
  const hasFigma = Boolean(proto?.figmaEmbedUrl);

  if (!hasInApp && !hasFigma) return null;

  const label = project.prototypeButtonLabel ?? 'View prototype';

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-3 text-xl font-semibold text-foreground">Prototype</h2>
      <p className="mb-4 text-muted-foreground">
        Explore the interactive flow in a focused shell.
      </p>
      {hasInApp ? (
        <Link
          href={proto!.inAppPrototypeHref!}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {label}
        </Link>
      ) : hasFigma ? (
        <>
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {label}
          </button>
          {open ? (
            <div className="fixed inset-0 z-50 bg-background" role="dialog" aria-modal="true">
              <PrototypeShell
                project={project}
                onBack={() => {
                  setOpen(false);
                  setFullscreen(false);
                }}
                onToggleFullscreen={() => setFullscreen((c) => !c)}
                isFullscreen={fullscreen}
              />
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
