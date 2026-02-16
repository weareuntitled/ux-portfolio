import Link from 'next/link';
import { draftMode } from 'next/headers';
import { DashboardCV } from '@/components/DashboardCV';
import { CareerAreaChart } from '@/components/CareerAreaChart';
import { ProofStripWithCharts } from '@/components/ProofStripWithCharts';
import { CelonisSkillsPresentation } from '@/components/CelonisSkillsPresentation';
import { TrustedByLogos } from '@/components/TrustedByLogos';
import { ProjectCard } from '@/components/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  roleHeadline,
  proofLine,
  experienceLine,
  ctaSecondary,
  publication,
  certification,
  practical,
  contact,
  visionStatement,
  principles,
  whatIDo,
} from '@/content/home';
import { getEnterpriseProjectsForNav, getEnterpriseProjectsResolved } from '@/lib/cms/projects-nav';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const draft = await draftMode();
  const isDraft = draft.isEnabled;
  const [enterpriseProjects, enterpriseProjectsResolved] = await Promise.all([
    getEnterpriseProjectsForNav({ draftMode: isDraft }),
    getEnterpriseProjectsResolved({ draftMode: isDraft }),
  ]);
  const featuredProjects = enterpriseProjectsResolved.slice(0, 6);

  return (
    <DashboardCV enterpriseProjects={enterpriseProjects}>
      {/* 1) Role + 2) Proof (above the fold) */}
      <section className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-start sm:gap-6">
        <div className="min-w-0 flex-1 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {roleHeadline}
          </h1>
          <p className="text-muted-foreground">{proofLine}</p>
          <div className="flex flex-wrap gap-3">
            {ctaSecondary.filter((cta) => cta.href === '/contact').map((cta) => (
              <Button key={cta.href} variant="outline" asChild>
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Proof strip — 5 tiles with micro charts */}
      <ProofStripWithCharts />

      {/* Career transition — graphic designer to now */}
      <section className="space-y-6">
        <CareerAreaChart />
      </section>

      {/* Experience — skill snapshot + Trusted by */}
      <Card className="overflow-hidden border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Experience &amp; skills</CardTitle>
          <p className="text-sm text-muted-foreground">{experienceLine}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <CelonisSkillsPresentation />
          <p className="mt-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by
          </p>
          <div className="mt-2">
            <TrustedByLogos />
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <section className="space-y-6 rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-foreground">Projects</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">View all</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Enterprise tools and side projects. Each card links to the full case study.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Vision & principles */}
      <section className="rounded-xl border border-border bg-card p-6 md:p-8">
        <div className="mb-6 border-b border-border pb-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Vision</h2>
          <p className="mt-2 text-muted-foreground">{visionStatement}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.number}
              className="rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
            >
              <span className="text-xs font-bold tabular-nums text-primary">{p.number}</span>
              <h3 className="mt-2 font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What I Do */}
      <section className="space-y-6 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">What I Do</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {whatIDo.map((item) => (
            <div key={item.number} className="rounded-lg border border-border bg-card/80 p-4">
              <p className="text-xs font-bold tabular-nums text-primary">{item.number}</p>
              <h3 className="mt-1 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Publication and Certification */}
      <section className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card/80 p-4 shadow-sm">
        <Badge variant="secondary" className="px-3 py-1.5 font-medium">
          {publication.title}
        </Badge>
        <Badge variant="secondary" className="px-3 py-1.5 font-medium">
          {certification.name} (valid {certification.validFrom}–{certification.validTo})
        </Badge>
      </section>

      <Separator className="my-4" />

      {/* 9) Practical */}
      <section className="text-sm text-muted-foreground">
        <p>{practical.location}</p>
        <p>{practical.languages}</p>
      </section>

      {/* 10) Contact */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6">
          <div>
            <p className="font-semibold text-foreground">{contact.name}</p>
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
          </div>
        </CardContent>
      </Card>
    </DashboardCV>
  );
}
