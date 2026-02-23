'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ResolvedProject } from '@/lib/cms/types';
import { StaggerContainer, StaggerItem } from '@/components/animations';

type Props = { project: ResolvedProject };

export function ProjectGallery({ project }: Props) {
  const urls = project.galleryUrls;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      }
      if (!urls?.length || urls.length < 2) return;
      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => {
          if (current === null) return current;
          return (current + 1) % urls.length;
        });
      }
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => {
          if (current === null) return current;
          return (current - 1 + urls.length) % urls.length;
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, urls]);

  if (!urls?.length) return null;

  const hasMultipleImages = urls.length > 1;

  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">Gallery</h2>
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {urls.map((url, i) => (
          <StaggerItem key={i}>
            <button
              type="button"
              onClick={() => setSelectedIndex(i)}
              className="group relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted text-left transition-transform duration-300 hover:scale-[1.02]"
              aria-label={`Open gallery image ${i + 1}`}
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover transition-opacity group-hover:opacity-95"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {selectedIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-2 top-2 z-10 rounded-md bg-black/60 px-3 py-1 text-sm text-white"
              aria-label="Close gallery lightbox"
            >
              Close
            </button>
            {hasMultipleImages ? (
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex((current) =>
                    current === null ? current : (current - 1 + urls.length) % urls.length,
                  )
                }
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-md bg-black/60 px-3 py-2 text-sm text-white"
                aria-label="Previous image"
              >
                Prev
              </button>
            ) : null}
            {hasMultipleImages ? (
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex((current) =>
                    current === null ? current : (current + 1) % urls.length,
                  )
                }
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-md bg-black/60 px-3 py-2 text-sm text-white"
                aria-label="Next image"
              >
                Next
              </button>
            ) : null}
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
              <Image
                src={urls[selectedIndex]}
                alt=""
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
