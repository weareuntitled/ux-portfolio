'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { EASE, DUR } from '@/lib/motion';
import { TECH_STACK, deviconUrl, type TechItem } from '@/lib/devicon';

function TechItemPill({ item, index }: { item: TechItem; index: number }) {
  const reduceMotion = useReducedMotion();
  const iconUrl = item.iconUrl ?? deviconUrl(item.slug ?? '', item.variant ?? 'original');

  return (
    <motion.div
      className="group flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-3 py-1.5 transition-colors hover:border-primary/30 hover:bg-accent/40"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: reduceMotion ? 0 : DUR.sm, delay: index * 0.03, ease: EASE }}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        <Image
          src={iconUrl}
          alt={item.name}
          width={16}
          height={16}
          className="object-contain brightness-0 opacity-70 transition-opacity group-hover:opacity-100"
          unoptimized
        />
      </div>
      <span className="text-xs font-medium text-foreground">{item.name}</span>
    </motion.div>
  );
}

export function TechStackSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-border bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {TECH_STACK.map((category, catIndex) => (
          <div key={category.title} className={catIndex > 0 ? 'mt-6' : ''}>
            <motion.h3
              className="mb-3 text-sm font-semibold tracking-wide text-foreground/80"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : DUR.sm, ease: EASE }}
            >
              {category.title}
            </motion.h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, idx) => (
                <TechItemPill key={item.name} item={item} index={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}