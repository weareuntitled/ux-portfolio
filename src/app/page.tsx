import Link from 'next/link';
import { DashboardCV } from '@/components/DashboardCV';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  roleHeadline,
  proofLine,
  experienceLine,
  proofStrip,
  ctaPrimary,
  ctaSecondary,
  experienceChips,
  clients,
  leadershipCard,
  publication,
  certification,
  aiAutomationCard,
  skillsGroups,
  practical,
  contact,
  additionalDelivery,
  productCardBadges,
} from '@/content/home';
import { getEnterpriseProjects } from '@/content/projects';

export default function HomePage() {
  const enterpriseProjects = getEnterpriseProjects();

  return (
    <DashboardCV>
      {/* 1) Role + 2) Proof (above the fold) */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {roleHeadline}
        </h1>
        <p className="text-muted-foreground">{proofLine}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
          </Button>
          {ctaSecondary.map((cta) => (
            <Button key={cta.href} variant="outline" asChild>
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          ))}
        </div>
      </section>

      {/* Proof strip — 5 tiles */}
      <section
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        aria-label="Proof metrics"
      >
        {proofStrip.map((tile) => (
          <Card key={tile.label} className="border-border bg-card p-4">
            <p className="text-2xl font-semibold tabular-nums text-foreground">
              {tile.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{tile.label}</p>
          </Card>
        ))}
      </section>

      {/* 3) Experience */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Experience</CardTitle>
          <p className="text-sm text-muted-foreground">{experienceLine}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {experienceChips.map((chip) => (
              <Badge key={chip} variant="secondary">
                {chip}
              </Badge>
            ))}
          </div>
          <p className="pt-2 text-xs text-muted-foreground">Trusted by</p>
          <div className="flex flex-wrap gap-2">
            {clients.map((client) => (
              <Badge key={client} variant="outline">
                {client}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* 4) Products — 3 cards + Centus chip */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Products</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enterpriseProjects.map((project) => {
            const tryLink = project.links?.find((l) => l.label === 'Live demo');
            const highlights = project.metrics.slice(0, 3);
            return (
              <Card key={project.slug} className="flex flex-col border-border bg-card">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-1">
                    {productCardBadges.map((b) => (
                      <Badge key={b} variant="secondary" className="text-xs">
                        {b}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="mt-2 text-base">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.oneLiner}</p>
                  <p className="text-xs text-muted-foreground">
                    {project.roles.join(', ')} · {project.year}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 space-y-2 pt-0">
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    {highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  {tryLink && (
                    <Button asChild size="sm" className="mt-2 w-full sm:w-auto">
                      <Link href={tryLink.href}>Try prototype</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{additionalDelivery.label}:</span>{' '}
          {additionalDelivery.items.join(', ')}
        </p>
      </section>

      {/* 5) AI and Automation */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">{aiAutomationCard.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{aiAutomationCard.oneLiner}</p>
          <Badge variant="secondary" className="mt-2 w-fit">
            {aiAutomationCard.badge}
          </Badge>
          <div className="flex flex-wrap gap-2 pt-2">
            {aiAutomationCard.chips.map((chip) => (
              <Badge key={chip} variant="outline">
                {chip}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {aiAutomationCard.highlights.map((h) => (
              <li key={h.slice(0, 40)}>{h}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 6) Leadership */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">{leadershipCard.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{leadershipCard.shortCopy}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {leadershipCard.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  {m.value}
                </p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 7) Publication and Certification */}
      <section className="flex flex-wrap gap-3">
        <Badge variant="secondary" className="px-3 py-1">
          {publication.title}
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          {certification.name} (valid {certification.validFrom}–{certification.validTo})
        </Badge>
      </section>

      {/* 8) Skills — chips only */}
      <section>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Skills</h2>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {skillsGroups.productDesign.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsGroups.tools.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsGroups.techBasics.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsGroups.aiWorkflows.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-4" />

      {/* 9) Practical */}
      <section className="text-sm text-muted-foreground">
        <p>{practical.location}</p>
        <p>{practical.languages}</p>
      </section>

      {/* 10) Contact */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <p className="font-semibold text-foreground">{contact.name}</p>
          <p className="text-sm text-muted-foreground">{contact.tagline}</p>
          <p className="mt-2">
            <a
              href={`mailto:${contact.email}`}
              className="text-primary hover:underline"
            >
              {contact.email}
            </a>
          </p>
          <p>
            <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
              {contact.phone}
            </a>
          </p>
        </CardContent>
      </Card>
    </DashboardCV>
  );
}
