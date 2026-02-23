import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';

import { DashboardCV } from '@/components/DashboardCV';
import { ProjectPortfolioKit } from '@/components/PortfolioKit';
import { ProjectCaseStudyHero } from '@/components/project/ProjectCaseStudyHero';
import { ProjectImpactCards } from '@/components/project/ProjectImpactCards';
import { ProjectDeliveryImpact } from '@/components/project/ProjectDeliveryImpact';
import { AutomationProjectContent } from '@/components/AutomationProjectContent';
import { FfpProjectContent } from '@/components/FfpProjectContent';
import { CaesarProjectContent } from '@/components/CaesarProjectContent';
import { RoleAndSetupSection } from '@/components/kovon/RoleAndSetupSection';
import { KovonWorkingCircle } from '@/components/kovon/KovonWorkingCircle';
import { getCaseStudySections, getPortfolioKit, portfolio } from '@/content/portfolio';
import { getProjectsForNav, getProjectsResolved } from '@/lib/cms/projects-nav';
import { CaseStudyTemplate } from '@/components/CaseStudyTemplate';
import { ProjectProblemWorkflowSolution } from '@/components/ProjectProblemWorkflowSolution';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectCard } from '@/components/ProjectCard';
import { CaseStudyFooterCta } from '@/components/CaseStudyFooterCta';
import { CaseStudyTechnicalSpecs } from '@/components/CaseStudyTechnicalSpecs';
import { ProjectDetailsFromSource } from '@/components/project/ProjectDetailsFromSource';
import { BrowserMockup } from '@/components/PortfolioKit';

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
    Partial<Record<'customSection' | 'quoteProblem' | 'workflowTooling', ReactNode>>
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

        {/* All portfolio-sourced data: metaCards, outcomes, highlights, tools, methods, links */}
        <ProjectDetailsFromSource project={project} />

        {/* 3) Browser mockup gallery — auto-flow screenshots, always 3rd place */}
        {project?.galleryUrls && project.galleryUrls.length > 0 && (
          <section className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
            <div className="my-12">
              <BrowserMockup
                src={project.galleryUrls[0]!}
                alt={`${project.title} — screenshot`}
                urlBar={`https://${project.slug ?? 'app'}.internal`}
                screens={project.galleryUrls.length > 1 ? project.galleryUrls : undefined}
                autoAdvanceMs={5000}
              />
            </div>
          </section>
        )}

        <section id="case-study" className="space-y-16">
          {/* 2) Quote / Problem */}
          {extension.quoteProblem}
          <ProjectPortfolioKit
            project={project}
            caseStudy={caseStudySections}
            portfolioKit={portfolioKit ?? null}
            skipHero
          />

          
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

          {/* 6) Result / Impact — same card + 4 metrics layout only; skip for automation (already in customSection) */}
          {slug !== 'automation' &&
            project.deliveryImpact &&
            (project.deliveryImpact.delivery?.length > 0 ||
              project.deliveryImpact.impact?.length > 0 ||
              project.deliveryImpact.document) && (
              <ProjectDeliveryImpact
                delivery={project.deliveryImpact.delivery ?? []}
                impact={project.deliveryImpact.impact ?? []}
                learned={project.deliveryImpact.learned}
                document={project.deliveryImpact.document}
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
