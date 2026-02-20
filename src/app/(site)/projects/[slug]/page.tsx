import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { ProjectCard } from '@/components/ProjectCard';
import { DashboardCV } from '@/components/DashboardCV';
import { ProjectPortfolioKit } from '@/components/ProjectPortfolioKit';
import { ProjectCaseStudyHero } from '@/components/ProjectCaseStudyHero';
import { AutomationProjectContent } from '@/components/AutomationProjectContent';
import { FfpProjectContent, FfpHeroStats } from '@/components/FfpProjectContent';
import { CaesarProjectContent, CaesarHeroStats } from '@/components/CaesarProjectContent';
import { CaseStudyTechnicalSpecs } from '@/components/CaseStudyTechnicalSpecs';
import { CaseStudyFooterCta } from '@/components/CaseStudyFooterCta';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectPrototypePanel } from '@/components/ProjectPrototypePanel';
import { ProjectProblemWorkflowSolution } from '@/components/ProjectProblemWorkflowSolution';
import { CaseStudyTemplate } from '@/components/CaseStudyTemplate';
import { getCaseStudySections, getPortfolioKit } from '@/content/caseStudies';
import { projects as staticProjects } from '@/content/projects';
import { getProjectsForNav, getProjectsResolved } from '@/lib/cms/projects-nav';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const projects = await getProjectsResolved({ draftMode: false });
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return staticProjects.map((p) => ({ slug: p.slug }));
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
        <ProjectCaseStudyHero project={project}>
          {slug === 'ffp-dashboard' && <FfpHeroStats />}
          {slug === 'emission-compliance' && <CaesarHeroStats />}
        </ProjectCaseStudyHero>

        {slug === 'automation' ? (
          <>
            <AutomationProjectContent />
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
            <CaseStudyFooterCta />
          </>
        ) : slug === 'ffp-dashboard' ? (
          <>
            <FfpProjectContent project={project} />
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
            <CaseStudyFooterCta />
          </>
        ) : slug === 'emission-compliance' ? (
          <>
            <CaesarProjectContent project={project} />
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
            <CaseStudyFooterCta />
          </>
        ) : (
          <>
        <ProjectPortfolioKit
          project={project}
          caseStudy={caseStudySections}
          portfolioKit={portfolioKit ?? null}
          skipHero
        />

        <section id="case-study" className="space-y-12">
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

          {project.notes && (
            <section className="max-w-3xl rounded-xl border border-border bg-card/50 p-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Notes
              </h2>
              <p className="text-muted-foreground">{project.notes}</p>
            </section>
          )}

          <ProjectGallery project={project} />

          <div id="prototype">
            <ProjectPrototypePanel project={project} />
          </div>

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

        {slug !== 'kovon' && <CaseStudyTechnicalSpecs slug={slug} />}
        <CaseStudyFooterCta />
          </>
        )}
      </div>
    </DashboardCV>
  );
}
