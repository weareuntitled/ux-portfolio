import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';

import { DashboardCV } from '@/components/DashboardCV';
import { ProjectCaseStudyHero } from '@/components/project/ProjectCaseStudyHero';
import { ProjectImpactCards } from '@/components/project/ProjectImpactCards';
import { ProjectDeliveryImpact } from '@/components/project/ProjectDeliveryImpact';
import { AutomationProjectContent } from '@/components/AutomationProjectContent';
import { FfpProjectContent } from '@/components/FfpProjectContent';

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
import { BrowserMockup } from '@/components/PortfolioKit';

import { ProjectPatchesAboveFold } from '@/components/project/ProjectPatchesAboveFold';
import { ProjectHeaderLinks } from '@/components/project/ProjectHeaderLinks';

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
      customSection: <FfpProjectContent project={project} hideScreenshots />,
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

  // KOVON should show role/setup after "approach" not before
  const customBeforeApproach = slug === 'kovon' ? null : extension.customSection;
  const customAfterApproach = slug === 'kovon' ? extension.customSection : null;

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
      headerRight={<ProjectHeaderLinks project={project} />}
    >
      <div className="mx-auto max-w-5xl space-y-24 px-4 py-8 md:px-8 md:py-12">
        {/* 1) HERO */}
        <ProjectCaseStudyHero project={project}>
          {project.impactCards && project.impactCards.length > 0 && (
            <ProjectImpactCards cards={project.impactCards} />
          )}
        </ProjectCaseStudyHero>

        {/* 2) PROJECT AT A GLANCE (first card includes role + stages), then tools/methods */}
        <ProjectPatchesAboveFold project={project} />

        {/* 3) ABOVE THE FOLD: AUTO SCREENSHOT GALLERY */}
        {project?.galleryUrls && project.galleryUrls.length > 0 && (
          <section className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
            <div className="my-12">
              <BrowserMockup
                src={project.galleryUrls[0]!}
                alt={`${project.title} screenshot`}
                urlBar={`https://${project.slug ?? 'app'}.internal`}
                screens={project.galleryUrls.length > 1 ? project.galleryUrls : undefined}
                autoAdvanceMs={5000}
              />
            </div>
          </section>
        )}

        {/* 4) QUOTES + PROJECT-SPECIFIC STORY (after screenshots) */}
        {customBeforeApproach ? <section className="space-y-16">{customBeforeApproach}</section> : null}

        {/* 5) APPROACH I CHOSE (text) */}
        <section className="space-y-8">
          {caseStudySections ? (
            <div className="max-w-3xl">
              {/* You can later restrict which sections render if you want. For now: full template */}
              <CaseStudyTemplate sections={caseStudySections} />
            </div>
          ) : (
            <div className="max-w-3xl">
              <ProjectProblemWorkflowSolution project={project} />
            </div>
          )}
        </section>

        {/* 6) ROLE SETUP / WORKING CYCLE (KOVON) */}
        {customAfterApproach ? <section className="space-y-16">{customAfterApproach}</section> : null}

        {/* 7) OPTIONAL WORKFLOW / TOOLING */}
        {extension.workflowTooling}
        {slug !== 'kovon' && <CaseStudyTechnicalSpecs slug={slug} />}

        {/* 8) DELIVERY + IMPACT (MERGED WITH OUTCOMES + HIGHLIGHTS) */}
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
              outcomes={project.outcomes ?? []}
              highlights={project.highlights ?? []}
            />
          )}

        {/* 9) GALLERY */}
        <section>
          <ProjectGallery project={project} />
        </section>

        {/* 10) RELATED */}
        {related.length ? (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Related projects</h2>
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