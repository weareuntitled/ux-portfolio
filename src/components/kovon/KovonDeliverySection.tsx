'use client';

import {
  Compass,
  ListChecks,
  Handshake,
  Workflow,
  CheckCircle2,
  ClipboardSignature,
  Presentation,
  MessageCircle,
  GitMerge,
  Repeat2,
  Target,
  FileBadge,
  SlidersHorizontal,
  BadgeCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { FadeIn } from '@/components/motion';
import { SectionTitle, IconSquare } from '@/components/portfolio/PortfolioPrimitives';
import { Card } from '@/components/ui/card';
import { WorkingCircle } from '@/components/kovon/WorkingCircle';
import { RoleAndSetupSection } from '@/components/kovon/RoleAndSetupSection';
import {
  kovonWhereItLandedBullets,
  kovonWhyRolloutStoppedBullets,
} from '@/content/kovon/kovonPage.config';

const icon = (name: string): LucideIcon | null => {
  const map: Record<string, LucideIcon> = {
    Compass,
    ListChecks,
    Handshake,
    Workflow,
    CheckCircle2,
    ClipboardSignature,
    Presentation,
    MessageCircle,
    GitMerge,
    Repeat2,
    Target,
    FileBadge,
    SlidersHorizontal,
    BadgeCheck,
    Users,
  };
  return map[name] ?? null;
};

/** Impact (where it landed) + Why rollout stopped — Impact prominent, Why as side note */
function WhereItLandedAndWhyStopped() {
  return (
    <Card className="overflow-hidden border-border bg-card/50">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        <div className="border-b border-border p-6 lg:border-b-0 lg:border-r lg:pr-8">
          <h3 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
            Impact
          </h3>
          <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground">
            {kovonWhereItLandedBullets.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="border-l-0 border-border bg-muted/20 p-6 lg:pl-8">
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Why rollout stopped
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            {kovonWhyRolloutStoppedBullets.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

export function KovonDeliverySection() {
  const WorkflowIcon = icon('Workflow');
  return (
    <FadeIn className="space-y-14">
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          {WorkflowIcon && (
            <IconSquare>
              <WorkflowIcon className="h-5 w-5" />
            </IconSquare>
          )}
          <div>
            <SectionTitle title="My Scope and Bereiche" />
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              My Scope as Product Designer / Scrum
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          I built the delivery setup and led product strategy while balancing
          customer and stakeholder inputs. I acted as Scrum Master and Product
          Owner in the working circle.
        </p>

        <RoleAndSetupSection />

        <WorkingCircle />
      </section>

      <WhereItLandedAndWhyStopped />
    </FadeIn>
  );
}
