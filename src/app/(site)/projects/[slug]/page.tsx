// src/app/(site)/projects/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';

import { DashboardCV } from '@/components/DashboardCV';
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
import { BrowserMockup } from '@/components/PortfolioKit';

import { ProjectAtAGlanceBlock } from '@/components/project/ProjectAtAGlanceBlock';
import { ProjectHeaderLinks } from '@/components/project/ProjectHeaderLinks';

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 300;

type QuoteExtension = { quote?: string; footer?: string };
const projectQuoteBySlug: Record<string, QuoteExtension> = {
  // optional overrides
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
  void portfolioKit;

  const related = resolvedProjects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 2);

  const projectExtensions: Record<string, Partial<Record<'customSection', ReactNode>>> = {
    automation: {
      customSection: <AutomationProjectContent />,
    },
    'ffp-dashboard': {
      customSection: <FfpProjectContent project={project} hideScreenshots />,
    },
    'emission-compliance': {
      customSection: <CaesarProjectContent project={project} hideScreenshots />,
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

  // KOVON should show role/setup after "approach"
  const customBeforeApproach = slug === 'kovon' ? null : extension.customSection;
  const customAfterApproach = slug === 'kovon' ? extension.customSection : null;

  const quoteExt = projectQuoteBySlug[slug];
  const quoteFromCaseStudy = caseStudySections?.realProblem ?? '';
  const footerFromCaseStudy = caseStudySections?.insightAuthor ?? 'Project team';

  const quote = (quoteExt?.quote || quoteFromCaseStudy).trim();
  const footer = (quoteExt?.footer || footerFromCaseStudy).trim();

  const embeddedQuoteSlugs = new Set(['automation', 'ffp-dashboard', 'emission-compliance']);
  const shouldRenderGlobalQuote = !embeddedQuoteSlugs.has(slug) && Boolean(quote);

  const deliveryMerged = [
    ...(project.deliveryImpact?.delivery ?? []),
    ...(project.highlights ?? []),
  ].filter(Boolean);

  const impactMerged = [
    ...(project.deliveryImpact?.impact ?? []),
    ...(project.outcomes ?? []),
  ].filter(Boolean);

  const hasDeliveryImpact =
    slug !== 'automation' &&
    (deliveryMerged.length > 0 ||
      impactMerged.length > 0 ||
      Boolean(project.deliveryImpact?.document));

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
          {project.impactCards && project.impactCards.length > 0 ? (
            <ProjectImpactCards cards={project.impactCards} />
          ) : null}
        </ProjectCaseStudyHero>

       {/* 4) QUOTE (only when not already embedded in custom sections) */}
       {shouldRenderGlobalQuote ? (
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

        {/* 3) ABOVE THE FOLD: AUTO SCREENSHOT GALLERY */}
        {project.galleryUrls && project.galleryUrls.length > 0 ? (
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

      

     

        {/* 6) APPROACH I CHOSE */}
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

   


        {/* 9) DELIVERY + IMPACT (merged with highlights + outcomes) */}
        {hasDeliveryImpact ? (
          <ProjectDeliveryImpact
            delivery={deliveryMerged}
            impact={impactMerged}
            document={project.deliveryImpact?.document}
          />
        ) : null}

        {/* 10) GALLERY */}
        <ProjectGallery project={project} />

        {/* 11) RELATED */}
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