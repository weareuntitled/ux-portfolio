'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

export interface ScrollLockSlide {
  src: string;
  caption?: string;
  label?: string;
}

interface ScrollLockGalleryProps {
  slides: ScrollLockSlide[];
  title?: string;
  subtitle?: string;
}

export function ScrollLockGallery({ slides, title, subtitle }: ScrollLockGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress 0→1 to slide index 0→(N-1)
  const slideIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, slides.length - 1]
  );

  if (!slides.length) return null;

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
      <div
        ref={containerRef}
        className="relative hidden md:block"
        style={{ height: `${slides.length * 100}vh` }}
      >
      {/* Sticky pane that stays locked */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full">
          {slides.map((slide, i) => {
            // Calculate opacity: fully visible when slideIndex matches this slide's index
            const opacity = useTransform(
              slideIndex,
              [i - 0.5, i, i + 0.5],
              [0, 1, 0]
            );

            const scale = useTransform(
              slideIndex,
              [i - 0.3, i, i + 0.3],
              [0.95, 1, 0.95]
            );

            return (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center px-8"
                style={{ opacity, scale }}
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
          })}
        </div>

        {/* Progress dots — right side vertical pill */}
        <div className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 rounded-full border border-white/5 bg-black/40 px-2 py-3 backdrop-blur-md">
          {slides.map((_, i) => {
            const isActive = useTransform(
              slideIndex,
              [i - 0.3, i, i + 0.3],
              [0, 1, 0]
            );

            return (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: useTransform(
                    isActive,
                    [0, 1],
                    ['rgba(255,255,255,0.2)', 'hsl(var(--primary))']
                  ),
                }}
              />
            );
          })}
        </div>

        {/* Optional: Scroll indicator at bottom center (first slide only) */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: useTransform(slideIndex, [0, 0.5], [1, 0]),
          }}
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
      </div>
    </>
  );
}
