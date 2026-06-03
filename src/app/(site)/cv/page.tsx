import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

import { CvBrandLogo } from '@/components/cv/CvBrandLogo';
import { PageLayout } from '@/components/PageLayout';
import { CvDownloadButton } from '@/components/CvDownloadButton';
import { contact } from '@/content/home';
import cvCopy from '@/content/cv-copy.json';
import { getProjectsForNav } from '@/lib/cms/projects-nav';
import type { BrandLogoId } from '@/lib/brand-logos';
import { draftMode } from 'next/headers';

export const metadata: Metadata = {
  title: cvCopy.meta.title,
  description: cvCopy.meta.description,
};

export const revalidate = 300;

export default async function CVPage() {
  const draft = await draftMode();
  const isDraft = draft.isEnabled;
  await getProjectsForNav({ draftMode: isDraft });

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'CV' },
      ]}
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <section className="overflow-hidden rounded-2xl border border-border/10 bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                Curriculum Vitae
              </p>
              <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
                {cvCopy.header.name}
              </h1>
              <h2 className="mt-2 text-xl font-medium text-primary">
                {cvCopy.header.role}
              </h2>
              <p className="mt-2 text-sm font-medium text-foreground/80">
                {cvCopy.header.coreRoles}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {cvCopy.header.summary}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 text-sm text-muted-foreground">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 transition-colors hover:text-primary">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {cvCopy.header.location}
              </span>
              <a
                href={cvCopy.header.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Linkedin className="h-4 w-4" /> {cvCopy.header.linkedinLabel}
              </a>
              <CvDownloadButton className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]" />
            </div>
          </div>
        </section>

        {/* Core Competencies Card */}
        <section className="rounded-2xl border border-border/10 bg-card p-6 sm:p-8">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
            Core Competencies
          </p>
          <div className="flex flex-wrap gap-2">
            {cvCopy.coreCompetencies.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border/10 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/20 hover:text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Card */}
        <section className="rounded-2xl border border-border/10 bg-card p-6 sm:p-8">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
            {cvCopy.professionalExperienceTitle}
          </p>

          <div className="relative space-y-0">
            {/* Timeline rail */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-primary/20" />

            {cvCopy.experience.map((entry) => (
              <article key={`${entry.title}-${entry.period}`} className="relative pb-10 pl-6">
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-primary/40 bg-card" />

                <header className="mb-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                    <CvBrandLogo id={entry.logoId as BrandLogoId} label={(entry as unknown as { logoLabel?: string }).logoLabel ?? ''} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                        <h4 className="text-lg font-bold text-foreground">{entry.title}</h4>
                        <span className="font-mono text-sm text-muted-foreground">{entry.period}</span>
                      </div>
                      <p className="text-sm font-medium text-primary">{entry.companyLine}</p>
                    </div>
                  </div>
                </header>
                <ul className="list-outside list-disc space-y-2 pl-4 text-sm text-foreground/80 marker:text-muted-foreground">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Education Card */}
        <section className="rounded-2xl border border-border/10 bg-card p-6 sm:p-8">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
            {cvCopy.educationTitle}
          </p>

          <div className="space-y-6">
            {cvCopy.educationCredentials.map((entry) => {
              const eduEntry = entry as unknown as { logoId?: string; logoLabel?: string; title: string; subtitle?: string; period: string; details?: string };
              return (
                <article key={`${entry.title}-${entry.period}`} className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className={eduEntry.logoId ? 'flex min-w-0 flex-1 items-start gap-3' : ''}>
                    {eduEntry.logoId ? (
                      <CvBrandLogo id={eduEntry.logoId as BrandLogoId} label={eduEntry.logoLabel ?? ''} />
                    ) : null}
                    <div>
                      <h4 className="text-base font-bold text-foreground">{entry.title}</h4>
                      {entry.subtitle ? <p className="text-sm text-muted-foreground">{entry.subtitle}</p> : null}
                    </div>
                  </div>
                  <span className="mt-1 font-mono text-sm text-muted-foreground/60 sm:mt-0">{entry.period}</span>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
