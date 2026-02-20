'use client';

import Image from 'next/image';
import type { ResolvedProject } from '@/lib/cms/types';
import { StaggerContainer, StaggerItem } from '@/components/animations';

type Props = { project: ResolvedProject };

export function ProjectGallery({ project }: Props) {
  const urls = project.galleryUrls;
  if (!urls?.length) return null;
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        Gallery
      </h2>
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {urls.map((url, i) => (
          <StaggerItem key={i}>
            <div className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src={url}
                alt=""
                fill
                className="object-cover transition-opacity group-hover:opacity-95"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
