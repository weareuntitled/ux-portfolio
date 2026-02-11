'use client';

import { useState } from 'react';
import type { Project } from '@/content/projects';
import { PrototypeShell } from './PrototypeShell';

type Props = { project: Project };

export function ProjectPrototypePanel({ project }: Props) {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const hasPrototype = Boolean(project.prototype?.figmaEmbedUrl);

  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="mb-3 text-xl font-semibold">Prototype</h2>
      <p className="mb-4 text-slate-700">Explore the interactive flow in a focused shell.</p>
      <button
        onClick={() => setOpen(true)}
        disabled={!hasPrototype}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Try prototype
      </button>
      {!hasPrototype ? <p className="mt-2 text-sm text-slate-500">Prototype available on request.</p> : null}

      {open ? (
        <div className="fixed inset-0 z-50 bg-white" role="dialog" aria-modal="true">
          <PrototypeShell
            project={project}
            onBack={() => {
              setOpen(false);
              setFullscreen(false);
            }}
            onToggleFullscreen={() => setFullscreen((current) => !current)}
            isFullscreen={fullscreen}
          />
        </div>
      ) : null}
    </section>
  );
}
