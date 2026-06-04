'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { experienceTimelineDetailed, type ExperienceEntry } from '@/content/home';

/**
 * One row in the career list. Three stacked lines: period / headline / company · location.
 * No logos, no expand, no summary — Matt-style flat list (decision #10).
 * #schema:
 * {
 *   type: "component",
 *   args: "entry: ExperienceEntry",
 *   module: "CareerSection.tsx"
 * }
 */
function CareerRow({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const reduceMotion = useReducedMotion();
  const isPrimary = entry.id === 'untitled-ux';

  return (
    <motion.li
      className={`group border-b border-white/10 transition-colors duration-300 hover:bg-white/5 ${
        isPrimary ? 'border-l-2 border-l-accent pl-4 -ml-4' : ''
      }`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: reduceMotion ? 0 : DUR.md,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: EASE,
      }}
    >
      <div className="flex flex-col gap-1.5 py-5 md:flex-row md:items-baseline md:gap-8 md:py-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 md:w-44 md:shrink-0">
          {entry.period}
        </span>
        <div className="flex-1">
          <h3
            className={`text-base font-semibold tracking-[-0.015em] md:text-lg ${
              isPrimary ? 'text-accent' : 'text-white'
            }`}
          >
            {entry.headline}
          </h3>
          <p
            className={`mt-1 text-sm ${isPrimary ? 'text-accent/80' : 'text-white/60'}`}
          >
            {entry.company} · {entry.location}
            {isPrimary && (
              <span className="ml-2 inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-accent">
                Primary
              </span>
            )}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

/**
 * Matt-style flat career list rendered on the home page (decision #14 "Experience",
 * decision #15 "after Hero, before ClientLogos"). Renders one row per
 * `experienceTimelineDetailed` entry — no logos, no expand, no summary.
 * #schema:
 * {
 *   type: "component",
 *   returns: "JSX.Element",
 *   module: "CareerSection.tsx"
 * }
 */
export function CareerSection(): React.JSX.Element {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-black w-full px-6 py-16 text-white md:px-10 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <motion.h2
          className="font-display mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          Experience
        </motion.h2>

        <ul className="border-t border-white/10">
          {experienceTimelineDetailed.map((entry, idx) => (
            <CareerRow key={entry.id} entry={entry} index={idx} />
          ))}
        </ul>
      </div>
    </section>
  );
}
