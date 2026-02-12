"use client";

import { List, Maximize2 } from "lucide-react";

const ownData = [5, 7, 12, 50, 30, 25, 45];
const allData = [1854, 2109, 562, 3346, 2800, 2200, 3000];

const criticalFfps = [
  { name: "FFP 547", vehicles: "401 Vehicles", size: "lg" },
  { name: "FFP 003", vehicles: "1981 Vehicles", size: "md" },
  { name: "FFP 112", vehicles: "763 Vehicles", size: "md" },
  { name: "FFP 027", vehicles: "20 Vehicles", size: "sm" },
  { name: "FFP 157", vehicles: "416 Vehicles", size: "sm" },
  { name: "FFP 226", vehicles: "586 Vehicles", size: "sm" },
  { name: "FFP 234", vehicles: "416 Vehicles", size: "sm" },
  { name: "FFP 228", vehicles: "159 Vehicles", size: "sm" }
];

function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="mt-3 flex h-24 items-end gap-1">
      {values.map((value, index) => (
        <div key={index} className="flex-1 rounded-sm bg-primary/80" style={{ height: `${(value / max) * 100}%` }} />
      ))}
    </div>
  );
}

export function FfpActivitySection() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">FFP activity</h2>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="List view">
            <List className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Expand">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">7</span>
            <span className="text-sm text-muted-foreground">Own</span>
          </div>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">5</span>
            <span className="flex h-5 items-center rounded bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">50</span>
          </div>
          <MiniBars values={ownData} />
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">987</span>
            <span className="text-sm text-muted-foreground">FFPs</span>
            <span className="flex h-5 items-center rounded-full bg-primary/10 px-2 text-[10px] font-semibold text-primary">+35</span>
          </div>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">1</span>
            <span className="flex h-5 items-center rounded bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">3346</span>
          </div>
          <MiniBars values={allData} />
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Critical FFPs</h3>
          <div className="grid grid-cols-2 gap-2">
            {criticalFfps.map((item) => (
              <div key={item.name} className="rounded-lg bg-secondary/60 p-2">
                <p className="text-xs font-semibold text-foreground">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">{item.vehicles}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
