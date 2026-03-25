'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import manifest from '@/content/kontrast-manifest.json';

const INTERVAL_MS = 1500;
const GRID_SLOTS = 6;

/** Uniform grid: slightly taller than square by default (clearer crop), snaps to 1:1 on hover. */
const CELL_CLASS =
  'group/cell relative col-span-1 overflow-hidden rounded-2xl border border-border/80 bg-muted/30 ' +
  'aspect-[5/6] transition-[aspect-ratio,border-radius,box-shadow] duration-300 ease-out ' +
  'hover:aspect-square hover:rounded-lg hover:shadow-lg hover:ring-2 hover:ring-primary/20 hover:z-10';

function postSrc(filename: string): string {
  return `/api/kontrast/post?f=${encodeURIComponent(filename)}`;
}

export function KontrastPostsBento() {
  const files = manifest.files;
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  // State holds the current file index for each of the 6 slots
  const [slots, setSlots] = useState<number[]>(() => {
    if (files.length === 0) return [];
    return Array.from({ length: GRID_SLOTS }, (_, i) => i % files.length);
  });

  useEffect(() => {
    if (reduceMotion || files.length === 0 || paused) return;
    
    let currentSlot = 0;
    let currentFile = GRID_SLOTS % files.length;

    const id = window.setInterval(() => {
      setSlots((prevSlots) => {
        const newSlots = [...prevSlots];
        newSlots[currentSlot] = currentFile;
        return newSlots;
      });
      
      currentSlot = (currentSlot + 1) % GRID_SLOTS;
      currentFile = (currentFile + 1) % files.length;
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [files.length, reduceMotion, paused]);

  if (files.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-12 w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-foreground">Social Media Archive</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Campaign & social posts —{' '}
            <span className="text-foreground/80">auto-rotating gallery</span>
            {reduceMotion ? ' (motion reduced).' : ' (pauses on hover).'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {slots.map((fileIdx, i) => {
          const filename = files[fileIdx];
          return (
            <div key={i} className={CELL_CLASS}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={filename}
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={postSrc(filename)}
                    alt={`Kontrast Festival post`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover/cell:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/cell:opacity-100" />
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
