export default function SiteLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 md:px-8 md:py-12">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="space-y-2">
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />
        <div className="h-4 max-w-xl animate-pulse rounded bg-muted" style={{ width: '80%' }} />
        <div className="h-4 max-w-lg animate-pulse rounded bg-muted" style={{ width: '60%' }} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
