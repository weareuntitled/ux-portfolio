'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { EASE, DUR } from '@/lib/motion';
import { TECH_STACK, deviconUrl, type TechItem } from '@/lib/devicon';

function TechItemCard({ item, index }: { item: TechItem; index: number }) {
  const reduceMotion = useReducedMotion();
  const iconUrl = deviconUrl(item.slug, item.variant ?? 'original');

  const levelColor =
    item.level === 'Advanced'
      ? 'text-emerald-400'
      : item.level === 'Intermediate'
      ? 'text-amber-400'
      : 'text-muted-foreground';

  return (
    <motion.div
      className="group relative flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent/50"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: reduceMotion ? 0 : DUR.md, delay: index * 0.05, ease: EASE }}
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        <Image
          src={iconUrl}
          alt={item.name}
          width={40}
          height={40}
          className="object-contain brightness-0 opacity-70 transition-opacity group-hover:opacity-100 dark:invert"
          unoptimized
        />
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-foreground">{item.name}</p>
        <p className={`mt-0.5 font-mono text-[10px] uppercase tracking-wider ${levelColor}`}>{item.level}</p>
      </div>
    </motion.div>
  );
}

export function TechStackSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {TECH_STACK.map((category, catIndex) => (
          <div key={category.title} className={catIndex > 0 ? 'mt-16' : ''}>
            {/* Pre-title */}
            <motion.div
              className="mb-4 flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
            >
              <span className="font-mono text-xs text-muted-foreground/60">{category.preTitle}</span>
            </motion.div>

            {/* Category title */}
            <motion.h3
              className="mb-6 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
            >
              {category.title}
            </motion.h3>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {category.items.map((item, idx) => (
                <TechItemCard key={item.name} item={item} index={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
