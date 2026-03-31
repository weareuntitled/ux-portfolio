'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE, DUR, VP } from '@/lib/motion';

type Props = {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  children?: ReactNode;
  className?: string;
  delay?: number;
};

export function BentoCard({ title, subtitle, icon: Icon, children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VP}
      transition={{ duration: reduce ? 0 : DUR.md, ease: EASE, delay: reduce ? 0 : delay }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:bg-card',
        className
      )}
    >
      <div className="absolute right-0 top-0 p-4 opacity-40 transition-opacity group-hover:opacity-100">
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </div>
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex min-h-[100px] flex-1 items-center justify-center">{children}</div>
      </div>
    </motion.div>
  );
}
