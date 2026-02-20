export default function ProjectDetailLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-24 px-4 py-8 md:px-8 md:py-12">
      <div className="space-y-6 rounded-xl">
        <div className="aspect-video max-h-[400px] animate-pulse rounded-xl bg-muted" />
        <div className="space-y-4 px-2">
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="h-10 w-3/4 animate-pulse rounded bg-muted md:w-1/2" aria-hidden />
          <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        <div className="grid gap-6 rounded-xl border border-border bg-card/50 p-6 md:grid-cols-2">
          <div className="h-20 animate-pulse rounded bg-muted" />
          <div className="h-20 animate-pulse rounded bg-muted" />
        </div>
        <div className="max-w-3xl space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
