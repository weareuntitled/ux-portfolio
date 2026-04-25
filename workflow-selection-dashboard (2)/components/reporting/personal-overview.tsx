"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, LayoutGrid, List, Maximize2 } from "lucide-react";

const data = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 91 },
  { month: "Apr", value: 70 },
  { month: "May", value: 65 },
  { month: "Jun", value: 80 },
  { month: "Jul", value: 75 },
  { month: "Aug", value: 60 },
  { month: "Sep", value: 85 },
];

const teal = "#1e4d5c";

export function PersonalOverview() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">Personal overview</h2>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="List view">
            <List className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-md bg-secondary p-1.5 text-foreground" aria-label="Chart view">
            <BarChart3 className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Expand">
            <Maximize2 className="h-4 w-4" />
          </button>
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

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={teal} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="value" stroke={teal} strokeWidth={2} fill="url(#tealGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Progress bar */}
        <div className="mt-4 flex gap-0.5 overflow-hidden rounded-full">
          <div className="flex h-4 flex-[25] items-center justify-center rounded-l-full bg-accent text-[9px] font-bold text-accent-foreground">
            25
          </div>
          <div className="flex h-4 flex-[34] items-center justify-center bg-primary/70 text-[9px] font-bold text-primary-foreground">
            59
          </div>
          <div className="flex h-4 flex-[12] items-center justify-center bg-primary/50 text-[9px] font-bold text-primary-foreground">
            71
          </div>
          <div className="flex h-4 flex-[20] items-center justify-center rounded-r-full bg-primary text-[9px] font-bold text-primary-foreground">
            91
          </div>
        </div>
      </div>
    </section>
  );
}
