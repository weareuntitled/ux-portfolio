'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

interface Slide {
  src: string;
  label?: string;
}

interface SimpleGalleryProps {
  slides: Slide[];
}

export function SimpleGallery({ slides }: SimpleGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = useCallback((dir: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    if (dir === 'prev') {
      setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : slides.length - 1);
    } else {
      setLightboxIndex(lightboxIndex < slides.length - 1 ? lightboxIndex + 1 : 0);
    }
  }, [lightboxIndex, slides.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, navigateLightbox]);

  if (slides.length === 0) return null;

  return (
    <>
      <div className="relative">
        {/* Navigation buttons */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 disabled:opacity-0 ${
            canScrollLeft ? 'cursor-pointer' : 'pointer-events-none'
          }`}
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 disabled:opacity-0 ${
            canScrollRight ? 'cursor-pointer' : 'pointer-events-none'
          }`}
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
        >
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="group relative aspect-[4/3] w-[80vw] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0f0f12] md:w-[45vw] lg:w-[600px]"
            >
              <Image
                src={slide.src}
                alt={slide.label ?? `Slide ${i + 1}`}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 45vw, 600px"
                unoptimized={shouldUnoptimizeImage(slide.src)}
              />
              <div className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-4 w-4 text-white" />
              </div>
              {slide.label && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-sm font-medium text-white">{slide.label}</p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Dots indicator */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            {slides.map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-white/30" />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation */}
          {slides.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={slides[lightboxIndex].src}
              alt={slides[lightboxIndex].label ?? `Slide ${lightboxIndex + 1}`}
              width={1920}
              height={1080}
              className="max-h-[90vh] w-auto object-contain"
              unoptimized={shouldUnoptimizeImage(slides[lightboxIndex].src)}
              priority
            />
            {slides[lightboxIndex].label && (
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center text-sm font-medium text-white">
                {slides[lightboxIndex].label}
              </p>
            )}
          </div>

          {/* Counter */}
          {slides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {lightboxIndex + 1} / {slides.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}