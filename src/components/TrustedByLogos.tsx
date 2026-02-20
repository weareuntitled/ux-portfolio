'use client';

import { clients } from '@/content/home';

function LogoPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="flex h-12 w-24 shrink-0 items-center justify-center rounded-lg border border-border bg-card/80 text-xs font-semibold text-primary"
      title={name}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

export function TrustedByLogos() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {clients.map((client) => (
        <LogoPlaceholder key={client} name={client} />
      ))}
    </div>
  );
}
