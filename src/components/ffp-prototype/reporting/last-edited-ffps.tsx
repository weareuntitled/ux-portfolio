"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, LayoutGrid, List, Maximize2 } from "lucide-react";

interface FfpCard {
  name: string;
  status: string;
  statusColor: string;
  affectedVehicles: string;
  ffpId: string;
  created: string;
  updated: string;
  type: string;
  editor: string;
  tags: string[];
  chartData: { v: number }[];
}

const cards: FfpCard[] = [
  { name: "FFP Name", status: "Pre analysis", statusColor: "bg-accent text-accent-foreground", affectedVehicles: "0142", ffpId: "000457", created: "20.10.2021", updated: "21.10.2021", type: "Failure", editor: "Martin M.", tags: ["black monitor", "+2"], chartData: [{ v: 20 }, { v: 35 }, { v: 25 }, { v: 40 }, { v: 30 }] },
  { name: "FFP Name", status: "In draft", statusColor: "bg-primary/20 text-primary", affectedVehicles: "0042", ffpId: "000461", created: "20.10.2021", updated: "21.10.2021", type: "Failure", editor: "Martin M.", tags: ["Gear Shift broken", "+3"], chartData: [{ v: 15 }, { v: 25 }, { v: 20 }, { v: 45 }, { v: 35 }] },
  { name: "FFP Name", status: "Closed", statusColor: "bg-muted text-muted-foreground", affectedVehicles: "0025", ffpId: "000537", created: "20.10.2021", updated: "21.10.2021", type: "Failure", editor: "Martin M.", tags: ["burned wires"], chartData: [{ v: 30 }, { v: 20 }, { v: 35 }, { v: 25 }, { v: 40 }] },
  { name: "Multiple cou...", status: "Action defined", statusColor: "bg-primary text-primary-foreground", affectedVehicles: "0247", ffpId: "000861", created: "20.10.2021", updated: "21.10.2021", type: "Failure", editor: "Martin M.", tags: [], chartData: [{ v: 25 }, { v: 40 }, { v: 30 }, { v: 20 }, { v: 45 }] }
];

function TinyBars({ values }: { values: { v: number }[] }) {
  const max = Math.max(...values.map((x) => x.v));
  return (
    <div className="mt-1 flex h-6 items-end gap-0.5">
      {values.map((item, index) => (
        <div key={index} className="flex-1 rounded-sm bg-primary/70" style={{ height: `${(item.v / max) * 100}%` }} />
      ))}
    </div>
  );
}

export function LastEditedFfps() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -210 : 210, behavior: "smooth" });
  }

  return (
    <section>
      <div className="mb-1.5 flex items-center justify-between">
        <h2 className="text-xs font-bold text-foreground">Last edited FFPs</h2>
        <div className="flex items-center gap-1">
          <button type="button" className="rounded bg-secondary p-1 text-foreground" aria-label="Grid view"><LayoutGrid className="h-3.5 w-3.5" /></button>
          <button type="button" className="rounded p-1 text-muted-foreground hover:bg-secondary" aria-label="List view"><List className="h-3.5 w-3.5" /></button>
          <button type="button" className="rounded p-1 text-muted-foreground hover:bg-secondary" aria-label="Expand"><Maximize2 className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      <div className="relative">
        <button type="button" onClick={() => scroll("left")} className="absolute -left-2 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-background text-muted-foreground shadow hover:bg-secondary" aria-label="Scroll left"><ChevronLeft className="h-3 w-3" /></button>
        <div ref={scrollRef} className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth pb-1">
          {cards.map((card) => (
            <div key={card.ffpId} className="min-w-[170px] rounded-lg border border-border bg-background p-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-semibold text-foreground truncate">{card.name}</h3>
                <button type="button" className="shrink-0 text-muted-foreground hover:text-foreground" aria-label="More options"><MoreHorizontal className="h-3 w-3" /></button>
              </div>
              <span className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${card.statusColor}`}>{card.status}</span>
              <TinyBars values={card.chartData} />
              <div className="mt-1.5 space-y-0.5 text-[8px]">
                <div className="flex justify-between"><span className="text-muted-foreground">FFP-ID</span><span className="font-bold text-foreground">{card.ffpId}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Affected</span><span className="font-bold text-foreground">{card.affectedVehicles}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Updated</span><span className="font-bold text-foreground">{card.updated}</span></div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => scroll("right")} className="absolute -right-2 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-background text-muted-foreground shadow hover:bg-secondary" aria-label="Scroll right"><ChevronRight className="h-3 w-3" /></button>
      </div>
    </section>
  );
}
