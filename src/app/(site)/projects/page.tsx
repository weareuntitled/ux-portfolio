import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { DashboardCV } from '@/components/DashboardCV';
import { ProjectCard } from '@/components/ProjectCard';
import { getProjectsForNav, getProjectsResolved } from '@/lib/cms/projects-nav';

export const metadata: Metadata = {
  title: 'Projects | Daniel Peters',
  description: 'Enterprise tools and side projects by Daniel Peters.',
};

export const revalidate = 300;

export default async function ProjectsListPage() {
  const draft = await draftMode();
  const isDraft = draft.isEnabled;

  const [resolvedProjects, navProjects] = await Promise.all([
    getProjectsResolved({ draftMode: isDraft }),
    getProjectsForNav({ draftMode: isDraft }),
  ]);

  return (
    <DashboardCV
      navProjects={navProjects}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'Projects' },
      ]}
      pageTitle="Projects"
    >
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Projects
        </h1>
        <p className="text-muted-foreground">
          Enterprise tools and side projects. Each card links to the full case study.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resolvedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </DashboardCV>
  );
}
