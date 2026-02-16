import type { Metadata } from 'next';
import Link from 'next/link';
import { DashboardCV } from '@/components/DashboardCV';
import { ProofStripWithCharts } from '@/components/ProofStripWithCharts';
import { CelonisSkillsPresentation } from '@/components/CelonisSkillsPresentation';
import { LeadershipCardWithTrend } from '@/components/LeadershipCardWithTrend';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  roleHeadline,
  proofLine,
  experienceLine,
  ctaPrimary,
  ctaSecondary,
  experienceChips,
  clients,
  publication,
  certification,
  aiAutomationCard,
  practical,
  contact,
  additionalDelivery,
  productCardBadges,
} from '@/content/home';
import { getEnterpriseProjectsForNav, getEnterpriseProjectsResolved } from '@/lib/cms/projects-nav';
import { draftMode } from 'next/headers';

export const metadata: Metadata = {
  title: 'CV | Daniel Peters',
  description:
    'CV and resume for Daniel Peters, Product Designer (UX/UI), enterprise workflow tools.',
};

export const dynamic = 'force-dynamic';

export default async function CVPage() {
  const draft = await draftMode();
  const isDraft = draft.isEnabled;
  const [enterpriseProjectsNav, enterpriseProjects] = await Promise.all([
    getEnterpriseProjectsForNav({ draftMode: isDraft }),
    getEnterpriseProjectsResolved({ draftMode: isDraft }),
  ]);

  return (
    <DashboardCV
      enterpriseProjects={enterpriseProjectsNav}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'CV' },
      ]}
      pageTitle="CV"
    >
      <article className="cv-document max-w-3xl space-y-8">
        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {roleHeadline}
          </h1>
          <p className="mt-2 text-muted-foreground">{proofLine}</p>
          <p className="mt-1 text-sm text-muted-foreground">{experienceLine}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
            </Button>
            {ctaSecondary.map((cta) => (
              <Button key={cta.href} variant="outline" size="sm" asChild>
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ))}
          </div>
        </header>

        {/* Proof metrics */}
        <section aria-label="Proof metrics">
          <ProofStripWithCharts />
        </section>

        {/* Experience */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Experience</h2>
          <p className="text-sm text-muted-foreground">{experienceLine}</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {experienceChips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by
          </p>
          <p className="text-sm text-muted-foreground">
            {clients.join(', ')}
          </p>
        </section>

        {/* Skills — skill snapshot */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Skills</h2>
          <CelonisSkillsPresentation />
        </section>

        {/* Products — hierarchical list */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Products</h2>
          <ul className="space-y-6">
            {enterpriseProjects.map((project) => (
              <li key={project.slug} className="list-none border-l-2 border-primary/30 pl-4">
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.oneLiner}</p>
                <p className="text-xs text-muted-foreground">
                  {project.roles.join(', ')} · {project.year}
                </p>
                <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                  {project.metrics.slice(0, 3).map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-1">
                  {productCardBadges.map((b) => (
                    <Badge key={b} variant="secondary" className="text-xs">
                      {b}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{additionalDelivery.label}:</span>{' '}
            {additionalDelivery.items.join(', ')}
          </p>
        </section>

        {/* AI & Automation */}
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            {aiAutomationCard.title}
          </h2>
          <p className="text-sm text-muted-foreground">{aiAutomationCard.oneLiner}</p>
          <Badge variant="secondary" className="mt-2">
            {aiAutomationCard.badge}
          </Badge>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {aiAutomationCard.highlights.map((h) => (
              <li key={h.slice(0, 40)}>{h}</li>
            ))}
          </ul>
        </section>

        {/* Leadership */}
        <section>
          <LeadershipCardWithTrend />
        </section>

        {/* Publication & Certification */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Publication &amp; Certification
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Badge variant="secondary" className="mr-2">
                {publication.title}
              </Badge>
            </li>
            <li>
              <Badge variant="secondary" className="mr-2">
                {certification.name}
              </Badge>
              <span> (valid {certification.validFrom}–{certification.validTo})</span>
            </li>
          </ul>
        </section>

        {/* Practical */}
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Practical</h2>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            <li>{practical.location}</li>
            <li>{practical.languages}</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="border-t border-border pt-6">
          <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
          <p className="font-medium text-foreground">{contact.name}</p>
          <p className="text-sm text-muted-foreground">{contact.tagline}</p>
          <p className="mt-2">
            <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
              {contact.email}
            </a>
          </p>
          <p>
            <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
              {contact.phone}
            </a>
          </p>
        </section>

        <p className="pt-4">
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Back to Home
          </Link>
        </p>
      </article>
    </DashboardCV>
  );
}
