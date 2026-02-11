import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectPrototypePanel } from '@/components/ProjectPrototypePanel';
import { findProjectBySlug, projects } from '@/content/projects';

type Props = { params: { slug: string } };

export default function ProjectDetailPage({ params }: Props) {
  const project = findProjectBySlug(params.slug);
  if (!project) notFound();

  const related = projects.filter((item) => item.slug !== project.slug && item.category === project.category).slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <Link href="/" className="text-sm text-blue-700 hover:underline">
        ← Back to projects
      </Link>

      <section className="rounded-xl border bg-white p-6">
        <p className="text-sm text-slate-500">
          {project.category} · {project.year} {project.client ? `· ${project.client}` : ''}
        </p>
        <h1 className="mt-2 text-3xl font-bold">{project.title}</h1>
        <p className="mt-3 text-lg text-slate-700">{project.oneLiner}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border bg-white p-6 md:col-span-1">
          <h2 className="mb-2 font-semibold">Context</h2>
          <p className="text-slate-700">{project.context}</p>
        </article>
        <article className="rounded-xl border bg-white p-6 md:col-span-1">
          <h2 className="mb-2 font-semibold">Problem</h2>
          <p className="text-slate-700">{project.problem}</p>
        </article>
        <article className="rounded-xl border bg-white p-6 md:col-span-1">
          <h2 className="mb-2 font-semibold">Solution</h2>
          <p className="text-slate-700">{project.solution}</p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border bg-white p-6">
          <h2 className="mb-3 text-xl font-semibold">Outcomes</h2>
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            {project.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border bg-white p-6">
          <h2 className="mb-3 text-xl font-semibold">Metrics</h2>
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            {project.metrics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border bg-white p-6">
          <h2 className="mb-3 text-xl font-semibold">Tools</h2>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                {item}
              </span>
            ))}
          </div>
        </article>
        <article className="rounded-xl border bg-white p-6">
          <h2 className="mb-3 text-xl font-semibold">Methods</h2>
          <div className="flex flex-wrap gap-2">
            {project.methods.map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-xl border bg-white p-6">
        <h2 className="mb-3 text-xl font-semibold">Artifacts</h2>
        <div className="flex flex-wrap gap-2">
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6">
        <h2 className="mb-3 text-xl font-semibold">Media</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {project.media.map((item) => (
            <figure key={item.src} className="space-y-2">
              <img src={item.src} alt={item.title} className="h-56 w-full rounded-lg object-cover" />
              <figcaption>
                <strong className="block">{item.title}</strong>
                <span className="text-sm text-slate-600">{item.description}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ProjectPrototypePanel project={project} />

      <section>
        <h2 className="mb-4 text-xl font-semibold">Related projects</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {related.map((item) => (
            <ProjectCard key={item.id} project={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
