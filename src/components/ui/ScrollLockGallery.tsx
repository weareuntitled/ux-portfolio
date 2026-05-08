'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useTransform, useMotionValue, type MotionValue } from 'framer-motion';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

export interface ScrollLockSlide {
  src: string;
  caption?: string;
  label?: string;
}

interface ScrollLockGalleryProps {
  slides: ScrollLockSlide[];
}

function SlideItem({ slide, scrollProgress, totalSlides, i }: { slide: ScrollLockSlide; scrollProgress: number; totalSlides: number; i: number }) {
  const activeSlide = Math.floor(scrollProgress * totalSlides);
  const isActive = activeSlide === i;
  const opacity = isActive ? 1 : 0;
  const scale = isActive ? 1 : 0.95;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8"
      animate={{ opacity, scale }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-[4/3] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f12] shadow-[0_4px_12px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.1)]">
        <Image
          src={slide.src}
          alt={slide.caption ?? `Slide ${i + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1536px) 100vw, 1536px"
          unoptimized={shouldUnoptimizeImage(slide.src)}
        />
        {slide.label && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-8 py-6">
            <p className="text-sm font-medium text-white">{slide.label}</p>
            {slide.caption && (
              <p className="mt-1 text-xs text-white/70">{slide.caption}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function DotItem({ scrollProgress, totalSlides, i }: { scrollProgress: number; totalSlides: number; i: number }) {
  const activeSlide = Math.floor(scrollProgress * totalSlides);
  const isActive = activeSlide === i;

  return (
    <div
      className={`h-2 w-2 rounded-full transition-colors duration-200 ${
        isActive ? 'bg-primary' : 'bg-white/20'
      }`}
    />
  );
}

function ScrollControls({ totalSlides, scrollProgress, onSlideClick }: { totalSlides: number; scrollProgress: number; onSlideClick: (i: number) => void }) {
  const activeSlide = Math.floor(scrollProgress * totalSlides);

  return (
    <>
      {/* Progress dots — right side vertical pill */}
      <div className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 rounded-full border border-white/5 bg-black/40 px-2 py-3 backdrop-blur-md">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSlideClick(i)}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              activeSlide === i ? 'bg-primary' : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator at bottom center (first slide only) */}
      {activeSlide === 0 && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 1 }}
          animate={{ opacity: scrollProgress > 0.05 ? 0 : 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-6 w-0.5 rounded-full bg-white/20"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

export function ScrollLockGallery({ slides }: ScrollLockGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = container.offsetHeight;

      const start = 0;
      const end = containerHeight - windowHeight;
      const current = -rect.top;

      const progress = Math.max(0, Math.min(1, (current - start) / (end - start)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSlideClick = (i: number) => {
    const container = containerRef.current;
    if (!container) return;

    const windowHeight = window.innerHeight;
    const containerHeight = container.offsetHeight;
    const end = containerHeight - windowHeight;
    const targetProgress = i / Math.max(1, slides.length - 1);
    const targetScroll = targetProgress * end;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Mobile: standard horizontal carousel */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar md:hidden">
        {slides.map((slide, i) => (
          <div key={i} className="relative aspect-[4/3] w-[85vw] shrink-0 overflow-hidden rounded-2xl border border-white/5">
            <Image
              src={slide.src}
              alt={slide.caption ?? `Slide ${i + 1}`}
              fill
              className="object-cover"
              sizes="85vw"
              unoptimized={shouldUnoptimizeImage(slide.src)}
            />
            {slide.label && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-sm font-medium text-white">{slide.label}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: scroll-locked vertical progression */}
      {slides.length > 0 && (
        <div
          ref={containerRef}
          className="relative hidden md:block"
          style={{ height: `${Math.max(slides.length, 2) * 100}vh` }}
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div className="relative h-full w-full">
              {slides.map((slide, i) => (
                <SlideItem key={i} slide={slide} scrollProgress={scrollProgress} totalSlides={slides.length} i={i} />
              ))}
            </div>

            <ScrollControls totalSlides={slides.length} scrollProgress={scrollProgress} onSlideClick={handleSlideClick} />
          </div>
        </div>
      )}
    </>
  );
}
