'use client';

import { motion } from 'framer-motion';
import { Cpu, Layers, Search, ShieldCheck, Zap } from 'lucide-react';
import { getBentoCards, type BentoCardVisual } from '@/content/caseStudies';
import { BentoCard } from '@/components/BentoCard';
import { cn } from '@/lib/utils';

const iconMap = {
  Layers,
  Zap,
  Search,
  ShieldCheck,
  Cpu,
} as const;

function BentoVisual({ visual, value, items }: { visual?: BentoCardVisual; value?: string; items?: string[] }) {
  if (!visual) return null;
  if (visual === 'switcher') {
    return (
      <div className="flex items-center justify-center">
        <div className="flex gap-2 rounded-xl border border-border bg-muted/50 p-3">
          <div className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Supplier
          </div>
          <div className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            Production
          </div>
          <div className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            Root Cause
          </div>
        </div>
      </div>
    );
  }
  if (visual === 'metric') {
    return (
      <div className="text-center">
        <span className="text-4xl font-bold tracking-tighter text-primary md:text-5xl">
          {value ?? '1:1'}
        </span>
        <p className="mt-2 font-mono text-xs uppercase text-muted-foreground">
          Latency
        </p>
      </div>
    );
  }
  if (visual === 'bars') {
    return (
      <div className="relative w-3/4 space-y-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80%' }}
            transition={{ duration: 1.5 }}
            className="h-full bg-primary"
          />
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '40%' }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="h-full bg-primary/70"
          />
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60%' }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="h-full bg-primary/50"
          />
        </div>
      </div>
    );
  }
  if (visual === 'chips') {
    const chipItems = items ?? ['Supplier Quality', 'Production Testing', 'Root Cause Synthesis'];
    const chipIcons = [Cpu, ShieldCheck, Layers];
    return (
      <div className="flex flex-wrap gap-2">
        {chipItems.map((item, idx) => {
          const IconComponent = chipIcons[idx % chipIcons.length];
          return (
            <div
              key={item}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2"
            >
              <IconComponent className="h-4 w-4 shrink-0 text-primary" size={16} />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

type Props = {
  slug: string;
  heading?: string;
  intro?: string;
};

export function CaseStudyBentoSection({ slug, heading, intro }: Props) {
  const cards = getBentoCards(slug);
  if (cards.length === 0) return null;

  const defaultHeading = 'Designed for the speed of production.';
  const defaultIntro =
    'We moved from a "Database-First" to a "Workflow-First" architecture. The result is a system that adapts to the user\'s immediate intent.';

  return (
    <section className="space-y-12">
      <div>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {heading ?? defaultHeading}
        </h2>
        <p className="max-w-2xl text-muted-foreground">{intro ?? defaultIntro}</p>
      </div>

      <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = card.icon ? iconMap[card.icon as keyof typeof iconMap] : undefined;
          return (
            <BentoCard
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              icon={Icon}
              delay={i * 0.1}
              className={cn(card.colSpan === 2 && 'md:col-span-2')}
            >
              <BentoVisual visual={card.visual} value={card.value} items={card.items} />
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
}
