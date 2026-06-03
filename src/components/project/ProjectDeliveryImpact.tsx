// src/components/project/ProjectDeliveryImpact.tsx
import React from 'react';

export type ProjectDeliveryImpactProps = {
  delivery: string[];
  impact: string[];
  document?: { label: string; href: string };

  // falls du die schon nutzt, lass sie drin
  outcomes?: string[];
  highlights?: string[];

  // ✅ neu
  learned?: string[];
};

export function ProjectDeliveryImpact({
  delivery,
  impact,
  document,
  outcomes,
  highlights,
  learned,
}: ProjectDeliveryImpactProps) {
  const deliveryItems = (delivery ?? []).filter(Boolean);
  const impactItems = (impact ?? []).filter(Boolean);
  const outcomeItems = (outcomes ?? []).filter(Boolean);
  const highlightItems = (highlights ?? []).filter(Boolean);
  const learnedItems = (learned ?? []).filter(Boolean);

  return (
    <section className="space-y-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Delivery</h2>
          {deliveryItems.length ? (
            <ul className="space-y-2 text-sm text-foreground/80">
              {deliveryItems.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Impact</h2>
          {impactItems.length ? (
            <ul className="space-y-2 text-sm text-foreground/80">
              {impactItems.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {/* optional: outcomes + highlights (wenn du es nutzt) */}
      {(outcomeItems.length || highlightItems.length) ? (
        <div className="grid gap-8 md:grid-cols-2">
          {outcomeItems.length ? (
            <div className="space-y-4">
              <h3 className="text-base font-semibold tracking-tight text-foreground">Outcomes</h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                {outcomeItems.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {highlightItems.length ? (
            <div className="space-y-4">
              <h3 className="text-base font-semibold tracking-tight text-foreground">Highlights</h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                {highlightItems.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* ✅ neu: learned */}
      {learnedItems.length ? (
        <div className="space-y-4">
          <h3 className="text-base font-semibold tracking-tight text-foreground">Learnings</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            {learnedItems.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {document?.href ? (
        <div>
          <a
            href={document.href}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            {document.label ?? 'Open document'}
          </a>
        </div>
      ) : null}
    </section>
  );
}