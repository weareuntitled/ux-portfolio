'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ResolvedProject } from '@/lib/cms/types';
import { MacBookFrame } from '@/components/MacBookFrame';

type Props = { project: ResolvedProject };

export function ProjectGallery({ project }: Props) {
  const urls = project.galleryUrls ?? [];

  return (
    <section aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        Gallery
      </h2>
      {urls.length > 0 ? (
        <div className="grid gap-10 sm:grid-cols-1 lg:grid-cols-2">
          {urls.map((url, i) => (
            <MacBookFrame key={i}>
              <div className="relative h-full w-full bg-neutral-900">
                <Image
                  src={url}
                  alt={`${project.title} — screenshot ${i + 1}`}
                  fill
                  className="object-contain object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </MacBookFrame>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center text-sm text-muted-foreground">
          No screenshots for this project yet.
        </p>
      )}
    </section>
  );
}
