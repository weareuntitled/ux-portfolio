'use client';

import Image from 'next/image';
import { experienceTimelineDetailed } from '@/content/home';
import { brandLogos, type BrandLogoId } from '@/lib/brand-logos';

function ExperienceLogo({ logoId, alt }: { logoId: BrandLogoId; alt: string }) {
  const src = brandLogos[logoId];

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/40">
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        className="h-full w-full object-contain p-1"
        unoptimized
      />
    </div>
  );
}

export function ExperienceTimelineSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 font-sans antialiased sm:px-6 md:py-16">
      <h2 className="mb-12 text-3xl font-semibold tracking-tight text-foreground md:mb-16">Experience</h2>

      <div className="space-y-16 md:space-y-20">
        {experienceTimelineDetailed.map((entry) => (
          <div key={entry.id} className="flex flex-col md:flex-row md:gap-10">
            <div className="mb-3 shrink-0 md:mb-0 md:w-1/4">
              <p className="text-sm font-medium tabular-nums text-muted-foreground">{entry.period}</p>
              <p className="mt-1 text-sm text-muted-foreground/80">{entry.location}</p>
            </div>

            <div className="md:w-3/4">
              <div className="mb-5 flex items-center gap-4">
                <ExperienceLogo logoId={entry.logoId} alt={entry.logoAlt} />
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{entry.headline}</h3>
                  <p className="mt-0.5 text-sm font-medium text-muted-foreground">{entry.subline}</p>
                </div>
              </div>

              <p className="mb-5 text-base leading-relaxed text-foreground/90">{entry.summary}</p>
              <ul className="list-disc space-y-2.5 pl-5 text-base leading-relaxed text-foreground/90 marker:text-muted-foreground/40">
                {entry.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
