export function DashboardCV() {
  return (
    <header className="rounded-xl border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Dashboard resume</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight">Building reliable digital products end to end</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            I design and ship enterprise dashboards, then apply the same product rigor to side projects. Use filters below to
            browse by category, year, or keyword.
          </p>
        </div>
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground"
          aria-label="Profile avatar"
          title="DP"
        >
          DP
        </div>
      </div>
    </header>
  );
}
