import Link from 'next/link';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { ProjectCard } from '@/components/ProjectCard';
import { DashboardCV } from '@/components/DashboardCV';
import { ProjectHeroCard } from '@/components/ProjectHeroCard';
import { ProjectPrototypeButton } from '@/components/ProjectPrototypeButton';
import { ProjectImpactCards } from '@/components/ProjectImpactCards';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectPrototypePanel } from '@/components/ProjectPrototypePanel';
import {
  getProjectDefaults,
  getProjectBySlug,
  getProjects,
  resolveProject,
} from '@/lib/cms/payload';
import { getEnterpriseProjectsForNav } from '@/lib/cms/projects-nav';

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const draft = await draftMode();
  const isDraft = draft.isEnabled;

  const [defaults, cmsProject, allCmsProjects, enterpriseProjects] = await Promise.all([
    getProjectDefaults({ draftMode: isDraft }),
    getProjectBySlug(slug, { draftMode: isDraft }),
    getProjects({ draftMode: isDraft }),
    getEnterpriseProjectsForNav({ draftMode: isDraft }),
  ]);

  if (!cmsProject) notFound();

  const project = resolveProject(defaults, cmsProject);
  const resolvedAll = allCmsProjects.map((p) => resolveProject(defaults, p));
  const related = resolvedAll
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 2);

  return (
    <DashboardCV
      enterpriseProjects={enterpriseProjects}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: project.title },
      ]}
      pageTitle={project.title}
    >
      <section className="space-y-6">
        <Link href="/projects" className="text-sm text-primary hover:underline">
          ← Back to projects
        </Link>

        <ProjectPrototypeButton project={project} />

        <ProjectHeroCard project={project} />

        {project.client && (
          <p className="text-sm text-muted-foreground">
            Active project · {project.client}
          </p>
        )}

        <section className="grid gap-4 rounded-xl border border-border bg-card p-6 md:grid-cols-2">
          <article>
            <h2 className="mb-2 font-semibold text-foreground">Circumstances</h2>
            <p className="text-muted-foreground">
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
              <h2 className="mb-2 font-semibold text-foreground">Customer</h2>
              <p className="text-muted-foreground">{project.customerAbout}</p>
            </article>
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-6 md:col-span-1">
            <h2 className="mb-2 font-semibold text-foreground">Problem</h2>
            <p className="text-muted-foreground">{project.problem}</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-6 md:col-span-1">
            <h2 className="mb-2 font-semibold text-foreground">Workflow</h2>
            <p className="text-muted-foreground">{project.workflow ?? project.context}</p>
          </article>
          <article className="rounded-xl border border-border bg-card p-6 md:col-span-1">
            <h2 className="mb-2 font-semibold text-foreground">Solution</h2>
            <p className="text-muted-foreground">{project.solution}</p>
          </article>
        </section>

        {project.notes && (
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-2 font-semibold text-foreground">Notes</h2>
            <p className="text-muted-foreground">{project.notes}</p>
          </section>
        )}

        {project.impact && project.impact.length > 0 && (
          <ProjectImpactCards impact={project.impact} />
        )}

        <ProjectGallery project={project} />

        <ProjectPrototypePanel project={project} />

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Related projects</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <ProjectCard key={item.id} project={item} />
            ))}
          </div>
        </section>
      </section>
    </DashboardCV>
  );
}