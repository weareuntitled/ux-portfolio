'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Users,
  Calendar,
  Layers,
  UserCircle2,
  Timer,
  Wrench,
  FileText,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type MetaCard = {
  label: string;
  value: string;
  hint?: string;
};

function iconForLabel(label: string) {
  const key = label.toLowerCase();
  if (key.includes('user') || key.includes('expert')) return Users;
  if (key.includes('time') || key.includes('timeline') || key.includes('duration')) return Timer;
  if (key.includes('stage') || key.includes('poc') || key.includes('mvp')) return Layers;
  if (key.includes('role')) return UserCircle2;
  if (key.includes('deliver') || key.includes('pdd') || key.includes('doc')) return FileText;
  if (key.includes('sap') || key.includes('automation')) return Zap;
  if (key.includes('compliance') || key.includes('audit')) return ShieldCheck;
  if (key.includes('stack') || key.includes('tools') || key.includes('tech')) return Wrench;
  return Calendar;
}

export function ProjectMetaCards({ cards }: { cards: MetaCard[] }) {
  const reduceMotion = useReducedMotion();
  const EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      className="grid grid-cols-2 gap-3 md:grid-cols-4"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={reduceMotion ? undefined : { duration: 0.35, ease: EASE }}
    >
      {cards.map((c, idx) => {
        const Icon = iconForLabel(c.label);
        return (
          <motion.div
            key={`${c.label}-${idx}`}
            className={cn(
              'group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm',
              'transition-all hover:border-primary/40 hover:bg-muted/30 hover:shadow-md'
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.45, ease: EASE, delay: 0.05 * idx }}
          >
            {/* subtle lime glow on hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
            </div>

            <div className="relative flex items-start justify-between gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>

              {c.hint ? (
                <div className="group/hint relative">
                  <Info className="h-4 w-4 text-muted-foreground/60" />
                  <div className="pointer-events-none invisible absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground opacity-0 shadow-xl transition-all duration-200 group-hover/hint:visible group-hover/hint:opacity-100">
                    {c.hint}
                  </div>
                </div>
              ) : null}
            </div>

            <p className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              {c.label}
            </p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {c.value}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}