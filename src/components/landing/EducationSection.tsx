'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';
import { brandLogos } from '@/lib/brand-logos';

interface EduEntry {
  id: string;
  headline: string;
  subline: string;
  period: string;
  logoSrc?: string | typeof brandLogos.thi;
  logoAlt?: string;
  summary?: string;
  bullets?: string[];
}

const EDU_ENTRIES: EduEntry[] = [
  {
    id: 'msc',
    headline: 'M.Sc. User Experience Design',
    subline: 'TH Ingolstadt',
    period: '2020–2024',
    logoSrc: brandLogos.thi,
    logoAlt: 'TH Ingolstadt',
    summary: 'Grade: 1.3 · Master Thesis: "The Influence of Environment Design on Attention & Learning" (Grade 1.0)',
    bullets: [
      'Master Project for BSH — featured at ICC',
      'Emerging Interfaces & Prototyping (Grade 1.0)',
      'Design Strategy and Management (Grade 1.3)',
      'HCI & Interactive Systems (Grade 1.7)',
    ],
  },
  {
    id: 'bsc',
    headline: 'B.Sc. User Experience Design',
    subline: 'TH Ingolstadt',
    period: '2014–2019',
    logoSrc: brandLogos.thi,
    logoAlt: 'TH Ingolstadt',
    summary: 'Grade: 2.3 · Bachelor Thesis: "Talking Cars: Evaluation of an Auditory eHMI for Autonomous Vehicles"',
  },
  {
    id: 'cert',
    headline: 'Certified SAFe 6 Scrum Master',
    subline: 'Scaled Agile Framework',
    period: 'Valid until June 2026',
    summary: 'Certificate ID: 99773320-8851',
  },
];

function EduLogo({ src, alt }: { src?: string | typeof brandLogos.thi; alt?: string }) {
  if (!src) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-muted/40">
        <span className="font-mono text-[10px] font-bold text-muted-foreground">EDU</span>
      </div>
    );
  }
  return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-muted/40">
      <Image src={src} alt={alt ?? ''} width={40} height={40} className="h-full w-full object-contain p-1" unoptimized />
    </div>
  );
}

function EduItem({ entry, index }: { entry: EduEntry; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="border-b border-border/50 last:border-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: reduceMotion ? 0 : DUR.md, delay: index * 0.08, ease: EASE }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-accent/30"
      >
        <div className="flex items-center gap-4">
          <EduLogo src={entry.logoSrc} alt={entry.logoAlt} />
          <div>
            <h3 className="font-semibold tracking-tight text-foreground">{entry.headline}</h3>
            <p className="text-xs text-muted-foreground">{entry.subline} · {entry.period}</p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : DUR.sm, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-14">
              {entry.summary && (
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
              )}
              {entry.bullets && entry.bullets.length > 0 && (
                <ul className="space-y-1.5">
                  {entry.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function EducationSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <motion.h2
        className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
      >
        Education
      </motion.h2>

      <div>
        {EDU_ENTRIES.map((entry, idx) => (
          <EduItem key={entry.id} entry={entry} index={idx} />
        ))}
      </div>
    </section>
  );
}
