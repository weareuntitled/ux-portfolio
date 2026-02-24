// src/app/(site)/projects/[slug]/page.tsx
// FIX: draftMode() is async in your setup, so you must await it.

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

import { getCaseStudySections, portfolio } from '@/content/portfolio';
import { getProjectsForNav, getProjectsResolved } from '@/lib/cms/projects-nav';

import { CaseStudyTemplate } from '@/components/CaseStudyTemplate';
import { ProjectProblemWorkflowSolution } from '@/components/ProjectProblemWorkflowSolution';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectCard } from '@/components/ProjectCard';
import { CaseStudyTechnicalSpecs } from '@/components/CaseStudyTechnicalSpecs';
import { BrowserMockup } from '@/components/PortfolioKit';

import { ProjectHeaderLinks } from '@/components/project/ProjectHeaderLinks';

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 300;

type QuoteExtension = { quote?: string; footer?: string };
const projectQuoteBySlug: Record<string, QuoteExtension> = {
  kovon: {
    quote:
      'We had to bring people into task force mode to pass the audit. The tool pilot proved what a scalable, updatable verification system would need.',
    footer: 'Project reality',
  },
};

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

  // FIX: await draftMode()
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

  const projectExtensions: Record<string, { customSection?: ReactNode }> = {
    automation: { customSection: <AutomationProjectContent /> },
    'ffp-dashboard': { customSection: <FfpProjectContent project={project} /> },
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

  // KOVON role/setup should be AFTER the approach section
  const customBeforeApproach = slug === 'kovon' ? null : extension.customSection;
  const customAfterApproach = slug === 'kovon' ? extension.customSection : null;

  const quoteExt = projectQuoteBySlug[slug];
  const quoteFromCaseStudy = caseStudySections?.realProblem ?? project.problem ?? '';
  const footerFromCaseStudy = caseStudySections?.insightAuthor ?? 'Project team';

  const quote = (quoteExt?.quote || quoteFromCaseStudy).trim();
  const footer = (quoteExt?.footer || footerFromCaseStudy).trim();
  const shouldRenderQuote = Boolean(quote);

  const deliveryMerged = [
    ...(project.deliveryImpact?.delivery ?? []),
    ...(project.highlights ?? []),
  ].filter(Boolean);

  const impactMerged = [
    ...(project.deliveryImpact?.impact ?? []),
    ...(project.outcomes ?? []),
  ].filter(Boolean);

  const hasDeliveryImpact =
    deliveryMerged.length > 0 || impactMerged.length > 0 || Boolean(project.deliveryImpact?.document);

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
          {project.impactCards?.length ? <ProjectImpactCards cards={project.impactCards} /> : null}
        </ProjectCaseStudyHero>

        {/* 3) ABOVE THE FOLD: AUTO SCREENSHOT GALLERY */}
        {project.galleryUrls?.length ? (
          <section className="overflow-hidden rounded-2xl border border-border shadow-2xl">
            <BrowserMockup
              src={project.galleryUrls[0]!}
              alt={`${project.title} screenshot`}
              urlBar={`https://${project.slug ?? 'app'}.internal`}
              screens={project.galleryUrls.length > 1 ? project.galleryUrls : undefined}
              autoAdvanceMs={5000}
            />
          </section>
        ) : null}

        {/* 4) QUOTE AFTER screenshots */}
        {shouldRenderQuote ? (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <blockquote className="border-l-4 border-primary bg-primary/5 p-8 text-lg italic text-zinc-200">
              &ldquo;{quote}&rdquo;
              {footer ? (
                <footer className="mt-4 flex items-center gap-2 text-sm font-medium not-italic text-zinc-500">
                  <span className="h-px w-4 bg-zinc-600" aria-hidden />
                  {footer}
                </footer>
              ) : null}
            </blockquote>
          </section>
        ) : null}

        {/* 5) APPROACH */}
        <section className="space-y-10">
          <div className="max-w-3xl space-y-8">
            {caseStudySections ? (
              <CaseStudyTemplate sections={caseStudySections} />
            ) : (
              <ProjectProblemWorkflowSolution project={project} />
            )}
          </div>

          {customBeforeApproach ? <div className="space-y-16">{customBeforeApproach}</div> : null}
        </section>

        {/* 6) KOVON role/setup AFTER approach */}
        {customAfterApproach ? <section className="space-y-16">{customAfterApproach}</section> : null}

        {/* 7) TECHNICAL SPECS */}
        {slug !== 'kovon' ? <CaseStudyTechnicalSpecs slug={slug} /> : null}

        {/* 8) DELIVERY + IMPACT */}
        {hasDeliveryImpact ? (
          <ProjectDeliveryImpact
            delivery={deliveryMerged}
            impact={impactMerged}
            document={project.deliveryImpact?.document}
          />
        ) : null}

        {/* 9) FINAL GALLERY */}
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
      </div>
    </DashboardCV>
  );
}