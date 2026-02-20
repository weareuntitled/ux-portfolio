'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Database,
  UserCog,
  RefreshCw,
  FileBadge,
  Copy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionTitle } from '@/components/portfolio/PortfolioPrimitives';

const steps = [
  { n: '01', icon: Database, title: 'Setup', caption: 'Config + regs' },
  { n: '02', icon: UserCog, title: 'Assign', caption: 'Bulk routing' },
  { n: '03', icon: RefreshCw, title: 'Resolve', caption: 'Evidence upload' },
  { n: '04', icon: FileBadge, title: 'Approve', caption: 'Audit snapshot' },
  { n: '05', icon: Copy, title: 'Reuse', caption: 'Clone + inherit' },
];

export function KovonProcessStrip({ className }: { className?: string }) {
  return (
    <section className={cn('space-y-4', className)}>
      <SectionTitle title="The process" />

      <div className="rounded-xl border border-border bg-muted/30 p-4 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 rounded-xl border border-transparent bg-card/40 px-3 py-2 transition-colors hover:border-border hover:bg-muted/30"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="leading-tight">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">
                        {s.n}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {s.title}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.caption}</p>
                  </div>
                </motion.div>

                {i < steps.length - 1 && (
                  <div className="mx-2 hidden md:flex">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
