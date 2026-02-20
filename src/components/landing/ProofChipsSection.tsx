'use client';

import { Building2, Clock, Layers, Package, Search, ShieldCheck, Users, Workflow } from 'lucide-react';
import { proofChips } from '@/content/home';
import { cn } from '@/lib/utils';
import { StaggerContainer, StaggerItem } from '@/components/motion';

const iconMap = {
  layers: Layers,
  building: Building2,
  shield: ShieldCheck,
  search: Search,
  workflow: Workflow,
  package: Package,
  users: Users,
  clock: Clock,
} as const;

export function ProofChipsSection() {
  return (
    <section className="space-y-3 py-3 md:py-2" aria-label="Proof">
      <StaggerContainer className="flex flex-wrap justify-center gap-2 md:gap-3">
        {proofChips.map(({ label, icon }) => {
          const Icon = iconMap[icon] ?? Layers;
          return (
            <StaggerItem key={label}>
              <div
                className={cn(
                  'flex min-w-0 flex-1 basis-36 items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm',
                  'transition-colors hover:border-primary/30 hover:bg-card/90 sm:basis-40 md:py-2.5'
                )}
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="text-center">{label}</span>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
