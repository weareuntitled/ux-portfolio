import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

import { DashboardCV } from '@/components/DashboardCV';
import { ProjectPortfolioKit } from '@/components/PortfolioKit';
import { ProjectCaseStudyHero } from '@/components/project/ProjectCaseStudyHero';
import { ProjectImpactCards } from '@/components/project/ProjectImpactCards';
import { ProjectDeliveryImpact } from '@/components/project/ProjectDeliveryImpact';
import { ProjectLinks } from '@/components/project/ProjectLinks';
import { AutomationProjectContent } from '@/components/AutomationProjectContent';
import { FfpProjectContent } from '@/components/FfpProjectContent';
import { CaesarProjectContent } from '@/components/CaesarProjectContent';
import { RoleAndSetupSection } from '@/components/kovon/RoleAndSetupSection';
import { KovonWorkingCircle } from '@/components/kovon/KovonWorkingCircle';
import { getCaseStudySections, getPortfolioKit, portfolio } from '@/content/portfolio';
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
          <KovonWorkingCircle />
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
      showSearch={false}
    >
      <div className="mx-auto max-w-5xl space-y-24 px-4 py-8 md:px-8 md:py-12">
        {/* 1) Hero */}
        <ProjectCaseStudyHero project={project}>
          {project.impactCards && project.impactCards.length > 0 && (
            <ProjectImpactCards cards={project.impactCards} />
          )}
        </ProjectCaseStudyHero>

        <section id="case-study" className="space-y-16">
          {/* 2) Quote / Problem */}
          {extension.quoteProblem}
          <ProjectPortfolioKit
            project={project}
            caseStudy={caseStudySections}
            portfolioKit={portfolioKit ?? null}
            skipHero
          />

          {slug !== 'kovon' && (
            <>
              <div className="max-w-3xl space-y-8">
                {caseStudySections ? (
                  <CaseStudyTemplate sections={caseStudySections} />
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

          {/* 5) Workflow / Tooling */}
          {extension.workflowTooling}
          {slug !== 'kovon' && <CaseStudyTechnicalSpecs slug={slug} />}

          {/* 6) Impact */}
          {slug !== 'automation' && project.deliveryImpact && (project.deliveryImpact.delivery?.length > 0 || project.deliveryImpact.impact?.length > 0) && (
            <ProjectDeliveryImpact
              delivery={project.deliveryImpact.delivery ?? []}
              impact={project.deliveryImpact.impact ?? []}
              learned={project.deliveryImpact.learned}
            />
          )}

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
