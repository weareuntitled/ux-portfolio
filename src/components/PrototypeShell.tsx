'use client';

import type { Project } from '@/content/projects';

type PrototypeShellProps = {
  project: Project;
  onBack: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
};

export function PrototypeShell({ project, onBack, onToggleFullscreen, isFullscreen }: PrototypeShellProps) {
  const hasPrototype = Boolean(project.prototype?.figmaEmbedUrl);

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b bg-white p-3">
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onBack}
            aria-label="Back to project details"
          >
            Back
          </button>
          <strong>{project.title}</strong>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={project.prototype?.figmaFileUrl}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!project.prototype?.figmaFileUrl}
            className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            Open in Figma
          </a>
          <button
            className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onToggleFullscreen}
            aria-pressed={isFullscreen}
          >
            {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 border-b bg-slate-50 p-3">
        {project.prototype?.hints.map((hint) => (
          <span key={hint} className="rounded-full bg-slate-200 px-3 py-1 text-xs" role="note">
            {hint}
          </span>
        ))}
      </div>

      <main className="flex-1 bg-slate-100">
        {hasPrototype ? (
          <iframe
            title={`${project.title} prototype`}
            src={project.prototype?.figmaEmbedUrl}
            className="h-full w-full"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-slate-600">
            Prototype available on request.
          </div>
        )}
      </main>
    </div>
  );
}
