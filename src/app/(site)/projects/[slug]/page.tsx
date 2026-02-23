import Image from 'next/image';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';

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
import { CaseStudyTemplate } from '@/components/CaseStudyTemplate';
import { ProjectProblemWorkflowSolution } from '@/components/ProjectProblemWorkflowSolution';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectCard } from '@/components/ProjectCard';
import { CaseStudyTechnicalSpecs } from '@/components/CaseStudyTechnicalSpecs';

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 300;

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
  const portfolioKit = getPortfolioKit(slug);

  const related = resolvedProjects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 2);

  const projectExtensions: Record<
    string,
    Partial<Record<'toolsMethods' | 'quote' | 'narrative' | 'delivery', ReactNode>>
  > = {
    automation: {
      narrative: <AutomationProjectContent />,
    },
    'ffp-dashboard': {
      narrative: <FfpProjectContent project={project} />,
    },
    'emission-compliance': {
      narrative: <CaesarProjectContent project={project} />,
    },
    kovon: {
      narrative: (
        <>
          <RoleAndSetupSection />
          <KovonWorkingCircle />
        </>
      ),
    },
  };

  const extension = projectExtensions[slug] ?? {};
  const projectLinks = (project.links ?? []).filter((link) => Boolean(link?.href?.trim()));
  const mockupImage = project.galleryUrls?.[0] ?? project.coverUrl ?? project.moodImageUrl;
  const hasToolsMethods = Boolean(project.tools?.length || project.methods?.length || extension.toolsMethods);
  const hasNarrative = Boolean(caseStudySections || extension.narrative);
  const hasDeliveryImpact =
    slug !== 'automation' &&
    Boolean(
      extension.delivery ||
        project.deliveryImpact?.delivery?.length ||
        project.deliveryImpact?.impact?.length ||
        project.deliveryImpact?.learned?.length
    );

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
        {/* 1) Hero / first card */}
        <ProjectCaseStudyHero project={project}>
          <ProjectLinks
            links={(project.links ?? []).map((link) => ({
              label: link.label,
              href: link.href,
            }))}
          />
          {project.impactCards && project.impactCards.length > 0 && (
            <ProjectImpactCards cards={project.impactCards} />
          )}
        </ProjectCaseStudyHero>

        {/* 2) Project links row */}
        {projectLinks.length > 0 ? (
          <section className="-mt-12 border-t border-border/60 pt-4">
            <ProjectLinks links={projectLinks} />
          </section>
        ) : null}

        {/* 3) Tools & Methods */}
        {hasToolsMethods ? (
          <section className="space-y-5" aria-label="Tools and methods">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Tools &amp; Methods</h2>
            {extension.toolsMethods}
            <div className="grid gap-6 md:grid-cols-2">
              {project.tools?.length ? (
                <div className="space-y-3 rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <Tag key={tool}>{tool}</Tag>
                    ))}
                  </div>
                </div>
              ) : null}
              {project.methods?.length ? (
                <div className="space-y-3 rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Methods
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.methods.map((method) => (
                      <Tag key={method}>{method}</Tag>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            {slug !== 'kovon' && <CaseStudyTechnicalSpecs slug={slug} />}
          </section>
        ) : null}

        {/* 4) Screenshot / mockup gallery block */}
        {mockupImage ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Screenshot / Mockup</h2>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-card">
              <Image
                src={mockupImage}
                alt={`${project.title} mockup`}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </section>
        ) : null}

        {/* 5) Quote block */}
        <section id="case-study" className="space-y-8">
          {extension.quote}
          <ProjectPortfolioKit
            project={project}
            caseStudy={caseStudySections}
            portfolioKit={portfolioKit ?? null}
            skipHero
          />
        </section>

        {/* 6) Main narrative blocks */}
        {hasNarrative ? (
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
            {extension.narrative}
          </section>
        ) : null}

        {/* 7) Delivery & impact */}
        {hasDeliveryImpact ? (
          <section className="space-y-6">
            {project.customerAbout ? (
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer
                </p>
                <p className="mt-2 text-sm text-foreground">{project.customerAbout}</p>
              </div>
            ) : null}
            {extension.delivery}
            {project.deliveryImpact ? (
              <ProjectDeliveryImpact
                delivery={project.deliveryImpact.delivery ?? []}
                impact={project.deliveryImpact.impact ?? []}
                learned={project.deliveryImpact.learned}
              />
            ) : null}
          </section>
        ) : null}

        {/* 8) Final gallery */}
        <section>
          <ProjectGallery project={project} />
        </section>

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
