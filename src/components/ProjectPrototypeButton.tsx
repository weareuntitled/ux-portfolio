'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { ResolvedProject } from '@/lib/cms/types';
import { PrototypeShell } from './PrototypeShell';

type Props = { project: ResolvedProject };

export function ProjectPrototypeButton({ project }: Props) {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const proto = project.prototype;
  const hasInApp = proto?.prototypeType === 'in-app' && proto?.inAppPrototypeHref;
  const hasFigma = Boolean(proto?.figmaEmbedUrl);
  const hasPrototype = hasInApp || hasFigma;
  const label = project.prototypeButtonLabel ?? 'View prototype';

  if (!hasPrototype) return null;

  const buttonClass =
    'inline-flex h-11 w-[219px] items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

  if (hasInApp) {
    return (
      <Link href={proto!.inAppPrototypeHref!} className={buttonClass}>
        {label}
      </Link>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={buttonClass}>
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
  );
}
