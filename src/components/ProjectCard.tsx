import Link from 'next/link';
import type { Project } from '@/content/projects';
import { ProjectQuickViewDialog } from './ProjectQuickViewDialog';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const liveDemoLink = project.links?.find((link) => link.label === 'Live demo');

  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm">
      <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
        {project.category} · {project.year}
      </p>
      <h3 className="mb-2 text-xl font-semibold">
        <Link href={`/projects/${project.slug}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring">
          {project.title}
        </Link>
      </h3>
      <p className="mb-4 text-muted-foreground">{project.oneLiner}</p>
      <ul className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2">
        <Link
          href={`/projects/${project.slug}`}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          View details
        </Link>
        {liveDemoLink ? (
          <Link
            href={liveDemoLink.href}
            className="rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Live demo
          </Link>
        ) : null}
        <ProjectQuickViewDialog project={project} />
      </div>
    </article>
  );
}
