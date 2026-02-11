import React from "react"
import Link from "next/link";
import { Star, Fingerprint, Monitor, Headphones, MessageCircle } from "lucide-react";

interface GlassCardProps {
  icon: React.ReactNode;
  title: string;
  starred?: boolean;
  badge?: boolean;
  href?: string;
}

function GlassCard({ icon, title, starred, badge, href }: GlassCardProps) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};
  return (
    <Wrapper {...wrapperProps as Record<string, string>} className="group relative flex h-44 cursor-pointer items-center justify-center rounded-2xl border border-foreground/[0.06] bg-background/50 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] ring-1 ring-foreground/[0.03] backdrop-blur-xl transition-all hover:bg-background/70 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
      {starred && (
        <Star
          className="absolute left-3 top-3 h-4 w-4 fill-accent text-accent"
          aria-label="Favorisiert"
        />
      )}
      {badge && (
        <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
      )}
      <div className="flex flex-col items-center gap-3">
        <div className="text-primary/80">{icon}</div>
        <span className="text-xs font-semibold text-primary/80">{title}</span>
      </div>
    </Wrapper>
  );
}

export function WorkflowCards() {
  return (
    <section aria-labelledby="workflow-heading">
      <h2
        id="workflow-heading"
        className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl"
      >
        Workflow Auswahl
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* FFP Dashboard - glass card with blue outline */}
        <Link
          href="/reporting"
          className="group relative flex h-44 cursor-pointer items-center justify-center rounded-2xl border-2 border-primary bg-background/50 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all hover:bg-primary/[0.04] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
        >
          <Star
            className="absolute left-3 top-3 h-4 w-4 fill-accent text-accent"
            aria-label="Favorisiert"
          />
          <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary">
            7
          </span>
          <div className="flex flex-col items-center gap-3">
            <Fingerprint className="h-12 w-12 text-primary" strokeWidth={1.2} />
            <span className="text-xs font-semibold text-primary">FFP-Dashboard</span>
          </div>
        </Link>

        {/* Diagnose - glass card */}
        <GlassCard
          icon={<Monitor className="h-12 w-12" strokeWidth={1.2} />}
          title="Diagnose-Overview"
          starred
          badge
        />

        {/* Diss - glass card */}
        <GlassCard
          icon={<Headphones className="h-12 w-12" strokeWidth={1.2} />}
          title="Diss-Overview"
          href="/diss"
          starred
        />

        {/* Saga - glass card */}
        <GlassCard
          icon={<MessageCircle className="h-12 w-12" strokeWidth={1.2} />}
          title="Saga-Overview"
          href="/saga"
          starred
        />
      </div>
    </section>
  );
}
