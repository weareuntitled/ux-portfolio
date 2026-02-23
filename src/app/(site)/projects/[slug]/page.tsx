import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { DashboardCV } from '@/components/DashboardCV';
// FIX: Geschweifte Klammern entfernt (Default Import)
import ProjectPortfolioKit from '@/components/ProjectPortfolioKit';
import { ProjectCaseStudyHero } from '@/components/project/ProjectCaseStudyHero';
import { ProjectImpactCards } from '@/components/project/ProjectImpactCards';
import { ProjectDeliveryImpact } from '@/components/project/ProjectDeliveryImpact';
import { ProjectLinks } from '@/components/project/ProjectLinks';
import { AutomationProjectContent } from '@/components/AutomationProjectContent';
import { FfpProjectContent } from '@/components/FfpProjectContent';
import { CaesarProjectContent } from '@/components/CaesarProjectContent';
import { CaseStudyTechnicalSpecs } from '@/components/CaseStudyTechnicalSpecs';
import { CaseStudyFooterCta } from '@/components/CaseStudyFooterCta';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectPrototypePanel } from '@/components/ProjectPrototypePanel';
import { ProjectProblemWorkflowSolution } from '@/components/ProjectProblemWorkflowSolution';
import { CaseStudyTemplate } from '@/components/CaseStudyTemplate';
import { RoleAndSetupSection } from '@/components/kovon/RoleAndSetupSection';
import { WorkingCircle } from '@/components/kovon/WorkingCircle';
import { getCaseStudySections, getPortfolioKit, portfolio } from '@/content/portfolio';
import { getProjectsForNav, getProjectsResolved } from '@/lib/cms/projects-nav';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

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
  const portfolioKit = getPortfolioKit(slug);
  const related = resolvedProjects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 2);

  const projectExtensions: Record<
    string,
    Partial<Record<'quoteProblem' | 'coreInsights' | 'workflowTooling', ReactNode>>
  > = {
    automation: {
      coreInsights: <AutomationProjectContent />,
    },
    'ffp-dashboard': {
      coreInsights: <FfpProjectContent project={project} />,
    },
    'emission-compliance': {
      coreInsights: <CaesarProjectContent project={project} />,
    },
    kovon: {
      workflowTooling: (
        <>
          <RoleAndSetupSection />
          <WorkingCircle />
        </>
      ),
    },
  };

  const extension = projectExtensions[slug] ?? {};

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
              {project.client && (
                <p className="text-sm text-muted-foreground">
                  Active project · {project.client}
                </p>
              )}

              <div className="grid gap-6 rounded-xl border border-border bg-card/50 p-6 md:grid-cols-2">
                <article>
                  <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Circumstances
                  </h2>
                  <p className="text-foreground">
                    {[
                      project.teamSize && `Team: ${project.teamSize}`,
                      project.client && `Customer: ${project.client}`,
                      project.year && `Year: ${project.year}`,
                      project.category,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </article>
                {project.customerAbout && (
                  <article>
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Customer
                    </h2>
                    <p className="text-foreground">{project.customerAbout}</p>
                  </article>
                )}
              </div>

              <div className="max-w-3xl space-y-8">
                {caseStudySections ? (
                  <CaseStudyTemplate sections={caseStudySections} />
                ) : (
                  <ProjectProblemWorkflowSolution project={project} />
                )}
              </div>
            </>
          )}

          {/* 3) Screenshot / Gallery */}
          <ProjectGallery project={project} />

          <div id="prototype">
            <ProjectPrototypePanel project={project} />
          </div>

          {/* 4) Core insights */}
          {extension.coreInsights}

          {project.notes && (
            <section className="max-w-3xl rounded-xl border border-border bg-card/50 p-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Notes
              </h2>
              <p className="text-muted-foreground">{project.notes}</p>
            </section>
          )}

          {/* 5) Workflow / Tooling */}
          {extension.workflowTooling}
          {slug !== 'kovon' && <CaseStudyTechnicalSpecs slug={slug} />}

          {/* 6) Impact */}
          {project.deliveryImpact && (project.deliveryImpact.delivery?.length > 0 || project.deliveryImpact.impact?.length > 0) && (
            <ProjectDeliveryImpact
              delivery={project.deliveryImpact.delivery ?? []}
              impact={project.deliveryImpact.impact ?? []}
              learned={project.deliveryImpact.learned}
            />
          )}

          {/* 7) Links */}
          {project.links && project.links.length > 0 && (
            <section>
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground">Links</h2>
              <ProjectLinks links={project.links.map((l) => ({ label: l.label, href: l.href }))} />
            </section>
          )}

          {/* 8) Related */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              Related projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </section>
        </section>

        {/* 9) Footer CTA */}
        <CaseStudyFooterCta />
      </div>
    </DashboardCV>
  );
}