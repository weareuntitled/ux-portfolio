import type { Metadata } from 'next';
import { DashboardCV } from '@/components/DashboardCV';

export const metadata: Metadata = {
  title: 'Projects | Daniel Peters',
  description: 'Enterprise tools and side projects by Daniel Peters.',
};
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/content/projects';

export default function ProjectsListPage() {
  return (
    <DashboardCV>
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Projects
        </h1>
        <p className="text-muted-foreground">
          Enterprise tools and side projects. Each card links to the full case study.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </DashboardCV>
  );
}
