import React from "react";
import Link from "next/link";
import { Star, Fingerprint, Monitor, Headphones, MessageCircle } from "lucide-react";

interface GlassCardProps {
  icon: React.ReactNode;
  title: string;
  starred?: boolean;
  badge?: boolean;
  href?: string;
}

function GlassCardContent({ icon, title, starred, badge }: Omit<GlassCardProps, 'href'>) {
  return (
    <>
      {starred && <Star className="absolute left-2 top-2 h-3.5 w-3.5 fill-accent text-accent" aria-label="Favorisiert" />}
      {badge && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />}
      <div className="flex flex-col items-center gap-2">
        <div className="text-primary/80 [&>svg]:h-9 [&>svg]:w-9">{icon}</div>
        <span className="text-[11px] font-semibold text-primary/80">{title}</span>
      </div>
    </>
  );
}

function GlassCard({ icon, title, starred, badge, href }: GlassCardProps) {
  const classes =
    "group relative flex h-32 cursor-pointer items-center justify-center rounded-xl border border-foreground/[0.06] bg-background/50 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] ring-1 ring-foreground/[0.03] backdrop-blur-xl transition-all hover:bg-background/70 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)]";

  if (href) {
    return (
      <Link href={href} className={classes}>
        <GlassCardContent icon={icon} title={title} starred={starred} badge={badge} />
      </Link>
    );
  }

  return (
    <div className={classes}>
      <GlassCardContent icon={icon} title={title} starred={starred} badge={badge} />
    </div>
  );
}

export function WorkflowCards() {
  return (
    <section aria-labelledby="workflow-heading">
      <h2 id="workflow-heading" className="mb-4 text-center text-xl font-bold text-foreground md:text-2xl">
        Workflow Auswahl
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/prototypes/ffp/fingerprints"
          className="group relative flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-primary bg-background/50 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all hover:bg-primary/[0.04] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)]"
        >
          <Star className="absolute left-2 top-2 h-3.5 w-3.5 fill-accent text-accent" aria-label="Favorisiert" />
          <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-primary">
            7
          </span>
          <div className="flex flex-col items-center gap-2">
            <Fingerprint className="h-9 w-9 text-primary" strokeWidth={1.2} />
            <span className="text-[11px] font-semibold text-primary">FFP-Dashboard</span>
          </div>
        </Link>
        <GlassCard icon={<Monitor className="h-12 w-12" strokeWidth={1.2} />} title="Diagnose-Overview" href="/prototypes/ffp/diagnose" starred badge />
        <GlassCard icon={<Headphones className="h-12 w-12" strokeWidth={1.2} />} title="Diss-Overview" href="/prototypes/ffp/diss" starred />
        <GlassCard icon={<MessageCircle className="h-12 w-12" strokeWidth={1.2} />} title="Saga-Overview" href="/prototypes/ffp/saga" starred />
      </div>
    </section>
  );
}
