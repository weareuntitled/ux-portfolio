'use client';

type FiltersBarProps = {
  query: string;
  category: 'All' | 'Enterprise' | 'Side';
  sort: 'newest' | 'oldest' | 'title';
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: 'All' | 'Enterprise' | 'Side') => void;
  onSortChange: (value: 'newest' | 'oldest' | 'title') => void;
};

const categories: Array<FiltersBarProps['category']> = ['All', 'Enterprise', 'Side'];

export function FiltersBar({ query, category, sort, onQueryChange, onCategoryChange, onSortChange }: FiltersBarProps) {
  return (
    <section className="rounded-lg border bg-white p-4" aria-label="Project filters">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="flex flex-col gap-1 text-sm">
          Search
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search projects"
            className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search projects"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Sort
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as FiltersBarProps['sort'])}
            className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Sort projects"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Category tabs">
        {categories.map((item) => (
          <button
            key={item}
            role="tab"
            aria-selected={category === item}
            onClick={() => onCategoryChange(item)}
            className={`rounded-full border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              category === item ? 'bg-slate-900 text-white' : 'bg-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
