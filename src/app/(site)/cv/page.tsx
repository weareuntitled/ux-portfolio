import type { Metadata } from 'next';
import { CvBrandLogo } from '@/components/cv/CvBrandLogo';
import { DashboardCV } from '@/components/DashboardCV';
import { CvDownloadButton } from '@/components/CvDownloadButton';
import { contact } from '@/content/home';
// Central CV copy lives in src/content/cv-copy.json
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
  const navProjects = await getProjectsForNav({ draftMode: isDraft });

  return (
    <DashboardCV
      navProjects={navProjects}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'CV' },
      ]}
      pageTitle="CV"
    >
      <main className="flex min-w-0 flex-1 flex-col bg-background">
        <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-8 md:py-20">
          <header className="flex flex-col gap-6 border-b border-white/5 pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
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

            <div className="flex shrink-0 flex-col items-start gap-1 text-sm text-muted-foreground sm:items-end">
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-primary"
              >
                {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className="transition-colors hover:text-primary">
                {contact.phone}
              </a>
              <span>{cvCopy.header.location}</span>
              <a
                href={cvCopy.header.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 transition-colors hover:text-primary"
              >
                {cvCopy.header.linkedinLabel}
              </a>
              <CvDownloadButton className="mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-semibold text-background shadow transition-colors hover:bg-foreground/80" />
            </div>
          </header>

          <section>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {cvCopy.coreCompetenciesTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvCopy.coreCompetencies.map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-white/5 bg-card/50 px-3 py-1 text-xs font-medium text-foreground/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-6 border-b border-white/5 pb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {cvCopy.professionalExperienceTitle}
            </h3>

            <div className="space-y-10">
              {cvCopy.experience.map((entry) => (
                <article key={`${entry.title}-${entry.period}`}>
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

          <section>
            <h3 className="mb-6 border-b border-white/5 pb-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {cvCopy.educationTitle}
            </h3>

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
              )})}
            </div>
          </section>
        </div>
      </main>
    </DashboardCV>
  );
}
