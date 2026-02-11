"use client";

import { useRef } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight, MoreHorizontal, LayoutGrid, List, Maximize2 } from "lucide-react";

interface FfpCard {
  name: string;
  status: string;
  statusColor: string;
  affectedVehicles: string;
  ffpId: string;
  dffpId: string;
  created: string;
  updated: string;
  type: string;
  editor: string;
  tags: string[];
  chartData: { v: number }[];
}

const cards: FfpCard[] = [
  {
    name: "FFP Name",
    status: "Pre analysis",
    statusColor: "bg-accent text-accent-foreground",
    affectedVehicles: "0142",
    ffpId: "000457",
    dffpId: "",
    created: "20.10.2021",
    updated: "21.10.2021",
    type: "Failure",
    editor: "Martin M.",
    tags: ["black monitor", "+2"],
    chartData: [{ v: 20 }, { v: 35 }, { v: 25 }, { v: 40 }, { v: 30 }],
  },
  {
    name: "FFP Name",
    status: "In draft",
    statusColor: "bg-primary/20 text-primary",
    affectedVehicles: "0042",
    ffpId: "000461",
    dffpId: "",
    created: "20.10.2021",
    updated: "21.10.2021",
    type: "Failure",
    editor: "Martin M.",
    tags: ["Gear Shift broken", "+3"],
    chartData: [{ v: 15 }, { v: 25 }, { v: 20 }, { v: 45 }, { v: 35 }],
  },
  {
    name: "FFP Name",
    status: "Closed",
    statusColor: "bg-muted text-muted-foreground",
    affectedVehicles: "0025",
    ffpId: "000537",
    dffpId: "",
    created: "20.10.2021",
    updated: "21.10.2021",
    type: "Failure",
    editor: "Martin M.",
    tags: ["burned wires"],
    chartData: [{ v: 30 }, { v: 20 }, { v: 35 }, { v: 25 }, { v: 40 }],
  },
  {
    name: "Multiple cou...",
    status: "Action defined",
    statusColor: "bg-primary text-primary-foreground",
    affectedVehicles: "0247",
    ffpId: "000861",
    dffpId: "",
    created: "20.10.2021",
    updated: "21.10.2021",
    type: "Failure",
    editor: "Martin M.",
    tags: [],
    chartData: [{ v: 25 }, { v: 40 }, { v: 30 }, { v: 20 }, { v: 45 }],
  },
  {
    name: "FFP Name",
    status: "Pre analysis",
    statusColor: "bg-accent text-accent-foreground",
    affectedVehicles: "0142",
    ffpId: "000864",
    dffpId: "",
    created: "20.10.2021",
    updated: "21.10.2021",
    type: "Failure",
    editor: "Martin M.",
    tags: [],
    chartData: [{ v: 10 }, { v: 30 }, { v: 20 }, { v: 35 }, { v: 25 }],
  },
];

const teal = "#1e4d5c";

export function LastEditedFfps() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">Last edited FFPs</h2>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-md bg-secondary p-1.5 text-foreground" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="List view">
            <List className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Expand">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute -left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background text-muted-foreground shadow-md hover:bg-secondary"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="w-52 shrink-0 rounded-xl border border-border bg-background p-4"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <span className="text-sm font-bold text-foreground">{card.name}</span>
                <button type="button" className="text-muted-foreground" aria-label="More options">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              {/* Status */}
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${card.statusColor}`}>
                {card.status}
              </span>
              {/* Affected */}
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Affected Vehicles</span>
                <span className="font-bold text-foreground">{card.affectedVehicles}</span>
              </div>
              {/* Mini chart */}
              <div className="my-3 h-14">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={card.chartData}>
                    <Line type="monotone" dataKey="v" stroke={teal} strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Details */}
              <div className="space-y-1 border-t border-border pt-3 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">FFP-ID</span>
                  <span className="font-bold text-destructive">{card.ffpId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-bold text-foreground">{card.created}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="font-bold text-foreground">{card.updated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-bold text-foreground">{card.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Editor</span>
                  <span className="font-bold text-foreground">{card.editor}</span>
                </div>
              </div>
              {/* Tags */}
              <div className="mt-3 border-t border-border pt-3">
                <p className="mb-1 text-[10px] text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {card.tags.length > 0 ? (
                    card.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="rounded bg-primary px-2 py-0.5 text-[9px] text-primary-foreground"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-muted-foreground/50">no tags</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute -right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background text-muted-foreground shadow-md hover:bg-secondary"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="mt-2 flex justify-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
      </div>
    </section>
  );
}
