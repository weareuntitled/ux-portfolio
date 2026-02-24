'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ResolvedProject } from '@/lib/cms/types';
import { MacBookFrame } from '@/components/MacBookFrame';

type Props = { project: ResolvedProject };

export function ProjectGallery({ project }: Props) {
  const urls = project.galleryUrls ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Tastatursteuerung für die Lightbox (Esc, Links, Rechts)
  useEffect(() => {
    if (lightboxIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : urls.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev! < urls.length - 1 ? prev! + 1 : 0));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, urls.length]);

  // Hintergrund-Scrollen deaktivieren, wenn die Lightbox offen ist
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [lightboxIndex]);

  if (urls.length === 0) {
    return (
      <section aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
          Gallery
        </h2>
        <p className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center text-sm text-muted-foreground">
          No screenshots for this project yet.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        Gallery
      </h2>
      
      <div className="grid gap-10 sm:grid-cols-1 lg:grid-cols-2">
        {urls.map((url, i) => (
          <button 
            key={i} 
            onClick={() => setLightboxIndex(i)}
            className="group relative block w-full text-left transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-xl"
          >
            <MacBookFrame>
              <div className="relative h-full w-full bg-neutral-900 cursor-zoom-in">
                <Image
                  src={url}
                  alt={`${project.title} — screenshot ${i + 1}`}
                  fill
                  className="object-contain object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Sanfter Hover-Effekt, um zu zeigen, dass es klickbar ist */}
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-white/5" />
              </div>
            </MacBookFrame>
          </button>
        ))}
      </div>

      {/* Die Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
          
          {/* Schließen Button */}
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute right-6 top-6 z-[110] rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white focus:outline-none"
            title="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Vorheriges Bild Button */}
          {urls.length > 1 && (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : urls.length - 1); 
              }}
              className="absolute left-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/70 transition-colors hover:bg-white/20 hover:text-white focus:outline-none md:left-8"
              title="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Nächstes Bild Button */}
          {urls.length > 1 && (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex(lightboxIndex < urls.length - 1 ? lightboxIndex + 1 : 0); 
              }}
              className="absolute right-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/70 transition-colors hover:bg-white/20 hover:text-white focus:outline-none md:right-8"
              title="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Klickbarer Hintergrund & Bild */}
          <div 
            className="relative flex h-full w-full items-center justify-center p-4 md:p-16" 
            onClick={() => setLightboxIndex(null)}
          >
            <div className="relative h-full w-full max-w-7xl cursor-zoom-out">
              <Image
                src={urls[lightboxIndex]}
                alt="Fullscreen screenshot"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
                priority
              />
            </div>
          </div>
          
          {/* Fotozähler (z.B. 1 / 4) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/80 backdrop-blur-md pointer-events-none">
             {lightboxIndex + 1} / {urls.length}
          </div>
        </div>
      )}
    </section>
  );
}