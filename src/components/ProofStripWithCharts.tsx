'use client';

import { Card } from '@/components/ui/card';
import { proofStrip } from '@/content/home';

const tiles = proofStrip.map((item) => ({
  label: item.label,
  value: item.value,
}));

export function ProofStripWithCharts() {
  return (
    <section
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 sm:gap-6"
      aria-label="Proof metrics"
    >
      {tiles.map((tile) => (
        <Card
          key={tile.label}
          className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
        >
          <p className="text-2xl font-bold tabular-nums tracking-tight text-white sm:text-3xl">
            {tile.value}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {tile.label}
          </p>
        </Card>
      ))}
    </section>
  );
}
