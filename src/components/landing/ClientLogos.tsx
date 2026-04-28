import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

type ClientLogo =
  | { name: string; type: 'img'; src: string; heightPx: number; filter?: string }
  | { name: string; type: 'audi' }
  | { name: string; type: 'text'; label: string };

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'MAN', type: 'img', src: '/motion/Logo_MAN.svg.png', heightPx: 26 },
  { name: 'Audi', type: 'audi' },
  { name: 'Volkswagen', type: 'img', src: '/motion/Volkswagen_logo_2019.svg.png', heightPx: 34 },
  { name: 'CARIAD', type: 'img', src: '/motion/cariad-logo-twilight.svg', heightPx: 22 },
  { name: 'Porsche', type: 'img', src: '/motion/Porsche_Schriftzug.svg.png', heightPx: 22 },
  {
    name: 'Ensinger',
    type: 'img',
    src: '/motion/Ensinger-Logo-vorne-sw_black.jpg',
    heightPx: 28,
    filter: 'invert(1)',
  },
  { name: '8020 Consulting', type: 'text', label: '8020' },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AudiRings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 124 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Audi"
      className={className}
      style={{ height: 26, width: 'auto' }}
    >
      <circle cx="17" cy="17" r="15" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="45" cy="17" r="15" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="73" cy="17" r="15" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="101" cy="17" r="15" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function ClientLogoItem({ logo }: { logo: ClientLogo }) {
  const wrap =
    'opacity-60 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center';

  if (logo.type === 'audi') {
    return (
      <div className={wrap} title="Audi">
        <AudiRings className="text-foreground" />
      </div>
    );
  }

  if (logo.type === 'text') {
    return (
      <div className={wrap} title={logo.name}>
        <span
          className="font-bold text-foreground"
          style={{
            fontSize: 17,
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {logo.label}
        </span>
      </div>
    );
  }

  return (
    <div className={wrap} title={logo.name}>
      <Image
        src={logo.src}
        alt={logo.name}
        width={140}
        height={logo.heightPx}
        className={cn(
          'w-auto object-contain',
          !logo.filter && 'brightness-0 dark:invert',
          logo.filter === 'invert(1)' && 'dark:invert'
        )}
        style={{ height: logo.heightPx }}
        unoptimized
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exported section
// ---------------------------------------------------------------------------

export function ClientLogos() {
  return (
    <section className="space-y-6">
      <p className="px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 sm:px-6 md:px-8">
        Brands &amp; Clients
      </p>

      <div className="relative w-full overflow-hidden bg-muted/30 py-6 dark:bg-black/20">
        <div className="animate-marquee flex items-center gap-16 px-6 md:gap-20">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <ClientLogoItem key={i} logo={logo} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
