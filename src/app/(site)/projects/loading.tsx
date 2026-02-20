export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 md:px-8 md:py-12">
      <div className="h-9 w-56 animate-pulse rounded bg-muted" />
      <div className="grid gap-6 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col rounded-xl border border-border bg-card">
            <div className="aspect-video animate-pulse rounded-t-xl bg-muted" />
            <div className="space-y-2 p-5">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-6 w-3/4 max-w-[75%] animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 max-w-[66%] animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
