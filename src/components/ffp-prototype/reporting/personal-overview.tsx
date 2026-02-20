"use client";

import { BarChart3, LayoutGrid, List, Maximize2 } from "lucide-react";

const data = [40, 55, 91, 70, 65, 80, 75, 60, 85];

export function PersonalOverview() {
  const max = Math.max(...data);

  return (
    <section>
      <div className="mb-1.5 flex items-center justify-between">
        <h2 className="text-xs font-bold text-foreground">Personal overview</h2>
        <div className="flex items-center gap-1">
          <button type="button" className="rounded p-1 text-muted-foreground hover:bg-secondary" aria-label="List view"><List className="h-3.5 w-3.5" /></button>
          <button type="button" className="rounded p-1 text-muted-foreground hover:bg-secondary" aria-label="Grid view"><LayoutGrid className="h-3.5 w-3.5" /></button>
          <button type="button" className="rounded bg-secondary p-1 text-foreground" aria-label="Chart view"><BarChart3 className="h-3.5 w-3.5" /></button>
          <button type="button" className="rounded p-1 text-muted-foreground hover:bg-secondary" aria-label="Expand"><Maximize2 className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background p-2.5">
        <div className="mb-1 flex items-baseline gap-1.5">
          <span className="text-base font-bold text-foreground">24</span>
          <span className="text-[10px] text-muted-foreground">Actual FFPs</span>
        </div>
        <div className="mb-1 text-sm font-bold text-foreground">6</div>

        <div className="flex h-20 items-end gap-0.5">
          {data.map((value, i) => (
            <div key={i} className="flex-1 rounded-sm bg-primary/70" style={{ height: `${(value / max) * 100}%` }} />
          ))}
        </div>

        <div className="mt-1.5 flex gap-0.5 overflow-hidden rounded-full">
          <div className="flex h-2.5 flex-[25] items-center justify-center rounded-l-full bg-accent text-[7px] font-bold text-accent-foreground">25</div>
          <div className="flex h-2.5 flex-[34] items-center justify-center bg-primary/70 text-[7px] font-bold text-primary-foreground">59</div>
          <div className="flex h-2.5 flex-[12] items-center justify-center bg-primary/50 text-[7px] font-bold text-primary-foreground">71</div>
          <div className="flex h-2.5 flex-[20] items-center justify-center rounded-r-full bg-primary text-[7px] font-bold text-primary-foreground">91</div>
        </div>
      </div>
    </section>
  );
}
