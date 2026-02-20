'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'text-2xl font-semibold tracking-tight text-foreground',
        className
      )}
    >
      {title}
    </h2>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-muted/30 p-6',
        className
      )}
    >
      {children}
    </div>
  );
}

export function HoverCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-transparent p-6 transition-colors hover:border-border hover:bg-muted/30',
        className
      )}
    >
      {children}
    </div>
  );
}

export function IconSquare({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary',
        className
      )}
    >
      {children}
    </div>
  );
}

export function FadeItem({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
}
