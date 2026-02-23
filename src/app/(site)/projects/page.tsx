import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { DashboardCV } from '@/components/DashboardCV';
import { ProjectCard } from '@/components/ProjectCard';
import { getProjectsForNav, getProjectsResolved } from '@/lib/cms/projects-nav';

export const metadata: Metadata = {
  title: 'Projects | Daniel Peters',
  description: 'Selected enterprise case studies, prototypes, and product design work.',
};

export const revalidate = 300;

export default async function ProjectsIndexPage() {
  const draft = await draftMode();
  const isDraft = draft.isEnabled;

  const [projects, navProjects] = await Promise.all([
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
      variant="project"
    >
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 md:px-8 md:py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Projects</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Enterprise workflow tools, compliance platforms, diagnostic dashboards, and automation.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </section>
      </div>
    </DashboardCV>
  );
}