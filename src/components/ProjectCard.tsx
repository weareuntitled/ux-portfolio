import Link from 'next/link';
import type { Project } from '@/content/projects';
import { ProjectQuickViewDialog } from './ProjectQuickViewDialog';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm">
      <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
        {project.category} · {project.year}
      </p>
      <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
      <p className="mb-4 text-slate-700">{project.oneLiner}</p>
      <ul className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2">
        <Link
          href={`/projects/${project.slug}`}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          View details
        </Link>
        <ProjectQuickViewDialog project={project} />
      </div>
    </article>
  );
}
