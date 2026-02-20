'use client';

import { trustTickerItems } from '@/content/home';

export function TrustTickerSection() {
  const items = [...trustTickerItems, ...trustTickerItems];

  return (
    <section className="py-8" aria-label="Trusted by and tools">
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-lg font-semibold uppercase tracking-wider text-muted-foreground grayscale"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
