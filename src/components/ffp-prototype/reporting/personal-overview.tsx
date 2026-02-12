"use client";

import { BarChart3, LayoutGrid, List, Maximize2 } from "lucide-react";

const data = [40, 55, 91, 70, 65, 80, 75, 60, 85];

export function PersonalOverview() {
  const max = Math.max(...data);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">Personal overview</h2>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="List view"><List className="h-4 w-4" /></button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></button>
          <button type="button" className="rounded-md bg-secondary p-1.5 text-foreground" aria-label="Chart view"><BarChart3 className="h-4 w-4" /></button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Expand"><Maximize2 className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background p-6">
        <div className="mb-4 flex items-baseline gap-3">
          <div>
            <span className="text-3xl font-bold text-foreground">24</span>
            <span className="ml-2 text-sm text-muted-foreground">Actual FFPs</span>
          </div>
        </div>
        <div className="mb-4 text-xl font-bold text-foreground">6</div>

        <div className="flex h-48 items-end gap-1">
          {data.map((value, i) => (
            <div key={i} className="flex-1 rounded-sm bg-primary/70" style={{ height: `${(value / max) * 100}%` }} />
          ))}
        </div>

        <div className="mt-4 flex gap-0.5 overflow-hidden rounded-full">
          <div className="flex h-4 flex-[25] items-center justify-center rounded-l-full bg-accent text-[9px] font-bold text-accent-foreground">25</div>
          <div className="flex h-4 flex-[34] items-center justify-center bg-primary/70 text-[9px] font-bold text-primary-foreground">59</div>
          <div className="flex h-4 flex-[12] items-center justify-center bg-primary/50 text-[9px] font-bold text-primary-foreground">71</div>
          <div className="flex h-4 flex-[20] items-center justify-center rounded-r-full bg-primary text-[9px] font-bold text-primary-foreground">91</div>
        </div>
      </div>
    </section>
  );
}
