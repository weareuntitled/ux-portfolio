import Link from 'next/link';
import type { ResolvedProject } from '@/lib/cms/types';
import { ProjectQuickViewDialog } from './ProjectQuickViewDialog';

type ProjectCardProps = {
  project: ResolvedProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const liveDemoLink = project.links?.find((link) => link.label === 'Live demo');

  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="py-3.5 text-xs uppercase tracking-wide text-muted-foreground">
          {project.category} · {project.year}
        </p>
        <ProjectQuickViewDialog project={project} triggerLabel={`Open quick actions for ${project.title}`} iconOnly />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
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
        {liveDemoLink?.href && (
          <Link
            href={liveDemoLink.href}
            {...(liveDemoLink.href.startsWith('http')
              ? { target: '_blank' as const, rel: 'noopener noreferrer' }
              : {})}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
          >
            Try prototype
          </Link>
        )}
      </div>
    </article>
  );
}
