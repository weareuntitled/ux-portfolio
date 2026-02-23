import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

import { DashboardCV } from '@/components/DashboardCV';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectGallery } from '@/components/ProjectGallery';
import { CaseStudyFooterCta } from '@/components/CaseStudyFooterCta';

import { AutomationProjectContent } from '@/components/AutomationProjectContent';
import { FfpProjectContent } from '@/components/FfpProjectContent';
import { CaesarProjectContent } from '@/components/CaesarProjectContent';
import { RoleAndSetupSection } from '@/components/kovon/RoleAndSetupSection';
import { WorkingCircle } from '@/components/kovon/WorkingCircle';

import { CaseStudyTemplate } from '@/components/CaseStudyTemplate';
import { ProjectProblemWorkflowSolution } from '@/components/ProjectProblemWorkflowSolution';

import { getCaseStudySections, portfolio } from '@/content/portfolio';
import { getProjectsForNav, getProjectsResolved } from '@/lib/cms/projects-nav';

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 300;

function pickHeroImage(project: any): string | null {
  return (
    project.heroImageUrl ??
    project.heroImage ??
    project.moodImageUrl ??
    project.coverImageUrl ??
    null
  );
}

function StatRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card/40 px-3 py-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold text-foreground text-right">{value}</span>
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      {children}
    </span>
  );
}

export async function generateStaticParams() {
  try {
    const projects = await getProjectsResolved({ draftMode: false });
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return Object.keys(portfolio).map((slug) => ({ slug }));
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const draft = await draftMode();
  const isDraft = draft.isEnabled;

  const [resolvedProjects, navProjects] = await Promise.all([
    getProjectsResolved({ draftMode: isDraft }),
    getProjectsForNav({ draftMode: isDraft }),
  ]);

  const project = resolvedProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const caseStudySections = getCaseStudySections(slug);

  const related = resolvedProjects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 2);

  const projectExtensions: Record<
    string,
    Partial<Record<'customSection', ReactNode>>
  > = {
    automation: {
      customSection: <AutomationProjectContent />,
    },
    'ffp-dashboard': {
      customSection: <FfpProjectContent project={project} />,
    },
    'emission-compliance': {
      customSection: <CaesarProjectContent project={project} />,
    },
    kovon: {
      customSection: (
        <>
          <RoleAndSetupSection />
          <WorkingCircle />
        </>
      ),
    },
  };

  const extension = projectExtensions[slug] ?? {};
  const heroImage = pickHeroImage(project);

  return (
    <DashboardCV
      navProjects={navProjects}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: project.title },
      ]}
      pageTitle={project.title}
      variant="project"
    >
      <div className="mx-auto max-w-5xl space-y-16 px-4 py-8 md:px-8 md:py-12">
        {/* HERO: Fix für deinen Gap, Bild sitzt top aligned zur Textspalte */}
        <section className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Tag>{project.category ?? 'Project'}</Tag>
              {project.year ? <Tag>{String(project.year)}</Tag> : null}
              {project.client ? <Tag>{project.client}</Tag> : null}
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {project.title}
              </h1>

              {project.subtitle ? (
                <p className="text-base text-muted-foreground">{project.subtitle}</p>
              ) : project.description ? (
                <p className="text-base text-muted-foreground">{project.description}</p>
              ) : null}
            </div>

            {project.role ? (
              <div className="rounded-xl border border-border bg-card/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Role
                </p>
                <p className="mt-1 text-sm text-foreground">{project.role}</p>
              </div>
            ) : null}

            <div className="grid gap-2 sm:grid-cols-2">
              <StatRow label="Client" value={project.client ?? null} />
              <StatRow label="Year" value={project.year ? String(project.year) : null} />
              <StatRow label="Team" value={project.teamSize ?? null} />
              <StatRow label="Scope" value={project.scope ?? null} />
            </div>

            {project.links?.length ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {project.links.slice(0, 3).map((l: any) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[16/10] w-full bg-muted">
                {heroImage ? (
                  <Image
                    src={heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>

              {project.customerAbout ? (
                <div className="border-t border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Customer
                  </p>
                  <p className="mt-2 text-sm text-foreground">{project.customerAbout}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* CONTENT: Kein PortfolioKit Placeholder mehr */}
        <section className="space-y-8">
          {caseStudySections ? (
            <div className="max-w-3xl">
              <CaseStudyTemplate sections={caseStudySections} />
            </div>
          ) : (
            <div className="max-w-3xl">
              <ProjectProblemWorkflowSolution project={project} />
            </div>
          )}
        </section>

        {/* OPTIONAL: Projektspezifische echte Sektion, aber nur wenn du sie bewusst setzt */}
        {extension.customSection ? (
          <section className="space-y-6">
            {extension.customSection}
          </section>
        ) : null}

        {/* GALLERY: bleibt, weil das echte Evidence ist */}
        <section>
          <ProjectGallery project={project} />
        </section>

        {/* RELATED */}
        {related.length ? (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Related projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </section>
        ) : null}

        <CaseStudyFooterCta />
      </div>
    </DashboardCV>
  );
}