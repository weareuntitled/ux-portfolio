'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  if (slides.length === 0) return null;

  return (
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
          <div
            key={i}
            className="relative aspect-[4/3] w-[80vw] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0f0f12] md:w-[45vw] lg:w-[600px]"
          >
            <Image
              src={slide.src}
              alt={slide.label ?? `Slide ${i + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 45vw, 600px"
              unoptimized={shouldUnoptimizeImage(slide.src)}
            />
            {slide.label && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-sm font-medium text-white">{slide.label}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-white/30"
            />
          ))}
        </div>
      )}
    </div>
  );
}