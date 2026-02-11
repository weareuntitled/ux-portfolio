'use client';

import { useMemo, useState } from 'react';
import { FiltersBar } from '@/components/FiltersBar';
import { ProjectCard } from '@/components/ProjectCard';
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
        const text = [project.title, project.oneLiner, ...project.tags].join(' ').toLowerCase();
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

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Product + Engineering Portfolio</h1>
        <p className="text-slate-600">Enterprise products and engineering-led side projects.</p>
      </header>

      <FiltersBar
        query={query}
        category={category}
        sort={sort}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />

      <section aria-labelledby="enterprise-projects">
        <h2 id="enterprise-projects" className="mb-4 text-2xl font-semibold">
          Enterprise Products
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enterprise.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section aria-labelledby="side-projects">
        <h2 id="side-projects" className="mb-4 text-2xl font-semibold">
          Side Projects
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {side.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
