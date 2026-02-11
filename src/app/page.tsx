'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FileText, FolderKanban, Globe, LayoutDashboard } from 'lucide-react';
import { FiltersBar } from '@/components/FiltersBar';
import { ProjectCard } from '@/components/ProjectCard';
import { DashboardCV } from '@/components/DashboardCV';
import { projects } from '@/content/projects';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | 'Enterprise' | 'Side'>('All');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'title'>('newest');

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return projects
      .filter((project) => {
        const matchesCategory = category === 'All' ? true : project.category === category;
        const text = [project.title, project.category, ...project.roles].join(' ').toLowerCase();
        const matchesQuery = normalizedQuery ? text.includes(normalizedQuery) : true;
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sort === 'title') return a.title.localeCompare(b.title);
        return sort === 'newest' ? Number(b.year) - Number(a.year) : Number(a.year) - Number(b.year);
      });
  }, [category, query, sort]);

  const enterprise = filteredProjects.filter((project) => project.category === 'Enterprise');
  const side = filteredProjects.filter((project) => project.category === 'Side');
  const years = projects.map((project) => Number(project.year));

  const stats = [
    { label: 'Projects', value: projects.length.toString() },
    { label: 'Enterprise', value: projects.filter((project) => project.category === 'Enterprise').length.toString() },
    { label: 'Side projects', value: projects.filter((project) => project.category === 'Side').length.toString() },
    { label: 'Latest year', value: Math.max(...years).toString() }
  ];

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 p-6 md:grid-cols-[240px_1fr]">
      <aside className="hidden h-fit rounded-xl border bg-card p-4 text-card-foreground md:flex md:flex-col md:sticky md:top-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Portfolio Dashboard</p>
        <h1 className="mt-2 text-xl font-semibold">Product + Engineering</h1>
        <p className="mt-2 text-sm text-muted-foreground">CV style overview with project outcomes, methods, and links.</p>
        <nav className="mt-6 space-y-1 text-sm" aria-label="Dashboard sections">
          <a href="#overview" className="block rounded-md px-3 py-2 hover:bg-accent">
            Overview
          </a>
          <a href="#enterprise-projects" className="block rounded-md px-3 py-2 hover:bg-accent">
            Enterprise
          </a>
          <a href="#side-projects" className="block rounded-md px-3 py-2 hover:bg-accent">
            Side projects
          </a>
        </nav>
      </aside>

      <section className="space-y-6" id="overview">
        <DashboardCV />

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Profile statistics">
          {stats.map((item) => (
            <article key={item.label} className="rounded-xl border bg-card p-4">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold">{item.value}</p>
            </article>
          ))}
        </section>

        <FiltersBar
          query={query}
          category={category}
          sort={sort}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />

        <section className="rounded-xl border bg-card p-4" aria-labelledby="projects-table">
          <h3 id="projects-table" className="text-xl font-semibold">
            Projects table
          </h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="px-2 py-2 font-medium">Name</th>
                  <th className="px-2 py-2 font-medium">Type</th>
                  <th className="px-2 py-2 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={`${project.id}-row`} className="border-b last:border-b-0">
                    <td className="px-2 py-2">{project.title}</td>
                    <td className="px-2 py-2">{project.category}</td>
                    <td className="px-2 py-2">{project.roles.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="enterprise-projects">
          <h3 id="enterprise-projects" className="mb-4 text-2xl font-semibold">
            Enterprise Products
          </h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {enterprise.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section aria-labelledby="side-projects">
          <h3 id="side-projects" className="mb-4 text-2xl font-semibold">
            Side Projects
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {side.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
