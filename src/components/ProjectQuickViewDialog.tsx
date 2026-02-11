'use client';

import { useState } from 'react';
import type { Project } from '@/content/projects';
import { PrototypeShell } from './PrototypeShell';

type ProjectQuickViewDialogProps = {
  project: Project;
  triggerLabel?: string;
};

export function ProjectQuickViewDialog({ project, triggerLabel = 'Quick view' }: ProjectQuickViewDialogProps) {
  const [open, setOpen] = useState(false);
  const [showPrototype, setShowPrototype] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const hasPrototype = Boolean(project.prototype?.figmaEmbedUrl);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="dialog"
      >
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className={`w-full rounded-lg bg-white shadow-xl ${fullscreen ? 'h-full max-w-none' : 'max-w-4xl'}`}>
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
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setShowPrototype(false);
                      setFullscreen(false);
                    }}
                    className="rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Close quick view"
                  >
                    Close
                  </button>
                </div>
                <p className="mb-4 text-slate-700">{project.oneLiner}</p>
                <p className="mb-6 text-sm text-slate-600">{project.context}</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowPrototype(true)}
                    disabled={!hasPrototype}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Try prototype
                  </button>
                  {!hasPrototype ? <span className="self-center text-sm text-slate-500">Prototype available on request.</span> : null}
                  {project.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
