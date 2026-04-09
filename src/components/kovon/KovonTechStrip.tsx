'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR, STAGGER, VP } from '@/lib/motion';
import { FileDiff, GitFork, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionTitle } from '@/components/portfolio/PortfolioPrimitives';

const items = [
  {
    icon: FileDiff,
    title: 'Delta',
    impact:
      'Highlights changes only. Cuts review scope fast.',
  },
  {
    icon: GitFork,
    title: 'Inherit',
    impact: 'Reuses approvals. Teams validate only the gap.',
  },
  {
    icon: ShieldCheck,
    title: 'Roles',
    impact: 'Clear ownership. Audit trail per chapter.',
  },
];

export function KovonTechStrip({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <section className={cn('space-y-4', className)}>
      <SectionTitle title="Tech" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={it.title}
              initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={VP}
              transition={{ duration: reduce ? 0 : DUR.sm, ease: EASE, delay: reduce ? 0 : i * STAGGER.sm }}
              whileHover={reduce ? undefined : { y: -2 }}
              className="flex items-center gap-4 rounded-xl border border-transparent bg-card/40 p-6 transition-colors hover:border-border hover:bg-muted/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {it.title}
                </p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                  {it.impact}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
