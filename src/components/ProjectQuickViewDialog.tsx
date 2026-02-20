'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ResolvedProject } from '@/lib/cms/types';
import { PrototypeShell } from './PrototypeShell';

type ProjectQuickViewDialogProps = {
  project: ResolvedProject;
  triggerLabel?: string;
  iconOnly?: boolean;
};

export function ProjectQuickViewDialog({ project, triggerLabel = 'Quick view', iconOnly = false }: ProjectQuickViewDialogProps) {
  const [open, setOpen] = useState(false);
  const [showPrototype, setShowPrototype] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const hasPrototype = Boolean(project.prototype?.figmaEmbedUrl);
  const coverUrl = project.moodImageUrl ?? null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          iconOnly ? 'px-2 py-2' : 'px-3 py-2'
        }`}
        aria-haspopup="dialog"
        aria-label={iconOnly ? triggerLabel : undefined}
      >
        {iconOnly ? (
          <span aria-hidden="true" className="block leading-none">
            ⋯
          </span>
        ) : (
          triggerLabel
        )}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className={`w-full rounded-lg bg-white shadow-xl dark:bg-card ${fullscreen ? 'h-full max-w-none' : 'max-w-4xl'}`}>
            {showPrototype ? (
              <div className="h-full min-h-[80vh]">
                <PrototypeShell
                  project={project}
                  onBack={() => setShowPrototype(false)}
                  onToggleFullscreen={() => setFullscreen((current) => !current)}
                  isFullscreen={fullscreen}
                />
              </div>
            ) : (
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">{project.title}</h2>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setShowPrototype(false);
                      setFullscreen(false);
                    }}
                    className="rounded-md border border-border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Close quick view"
                  >
                    Close
                  </button>
                </div>
                {coverUrl ? (
                  <div className="relative mb-4 w-full overflow-hidden rounded-lg border border-border bg-muted aspect-video">
                    <Image
                      src={coverUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 896px) 100vw, 896px"
                      priority
                    />
                  </div>
                ) : null}
                <p className="mb-4 text-muted-foreground">{project.oneLiner}</p>
                <p className="mb-6 text-sm text-muted-foreground">{project.context}</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowPrototype(true)}
                    disabled={!hasPrototype}
                    className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    Try prototype
                  </button>
                  {!hasPrototype ? <span className="self-center text-sm text-muted-foreground">Prototype available on request.</span> : null}
                  {project.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
