'use client';

import Image from 'next/image';
import type { ResolvedProject } from '@/lib/cms/types';

type Props = { project: ResolvedProject };

export function ProjectGallery({ project }: Props) {
  const urls = project.galleryUrls;
  if (!urls?.length) return null;
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold text-foreground">Gallery</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {urls.map((url, i) => (
          <div
            key={i}
            className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted"
          >
            <Image
              src={url}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
