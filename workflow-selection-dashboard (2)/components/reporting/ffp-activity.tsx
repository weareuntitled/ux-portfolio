"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { List, Maximize2 } from "lucide-react";

const ownData = [
  { month: "Jan'22", value: 5 },
  { month: "Feb'22", value: 7 },
  { month: "Mar'22", value: 12 },
  { month: "Apr'22", value: 50 },
  { month: "May'22", value: 30 },
  { month: "Jun'22", value: 25 },
  { month: "Jul'22", value: 45 },
];

const allData = [
  { month: "Jan'22", value: 1854 },
  { month: "Feb'22", value: 2109 },
  { month: "Mar'22", value: 562 },
  { month: "Apr'22", value: 3346 },
  { month: "May'22", value: 2800 },
  { month: "Jun'22", value: 2200 },
  { month: "Jul'22", value: 3000 },
];

const criticalFfps = [
  { name: "FFP 547", vehicles: "401 Vehicles", size: "lg" },
  { name: "FFP 003", vehicles: "1981 Vehicles", size: "md" },
  { name: "FFP 112", vehicles: "763 Vehicles", size: "md" },
  { name: "FFP 027", vehicles: "20 Vehicles", size: "sm" },
  { name: "FFP 157", vehicles: "416 Vehicles", size: "sm" },
  { name: "FFP 226", vehicles: "586 Vehicles", size: "sm" },
  { name: "FFP 234", vehicles: "416 Vehicles", size: "sm" },
  { name: "FFP 228", vehicles: "159 Vehicles", size: "sm" },
];

const teal = "#1e4d5c";
const tealLight = "#3a7a8c";
const gold = "#d4a843";

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
        {/* Own FFPs chart */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">7</span>
            <span className="text-sm text-muted-foreground">Own</span>
          </div>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">5</span>
            <span className="flex h-5 items-center rounded bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">
              50
            </span>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ownData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line type="monotone" dataKey="value" stroke={teal} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Bottom bar */}
          <div className="mt-3 flex gap-1 overflow-hidden rounded-full">
            <div className="h-3 flex-[5] rounded-l-full bg-primary/30 text-center text-[8px] leading-3 text-primary-foreground">5</div>
            <div className="h-3 flex-[7] bg-primary/50 text-center text-[8px] leading-3 text-primary-foreground">7</div>
            <div className="h-3 flex-[12] bg-primary/70 text-center text-[8px] leading-3 text-primary-foreground">12</div>
            <div className="h-3 flex-[50] rounded-r-full bg-accent text-center text-[8px] leading-3 text-accent-foreground">50</div>
          </div>
        </div>

        {/* All FFPs chart */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">987</span>
            <span className="text-sm text-muted-foreground">FFPs</span>
            <span className="flex h-5 items-center rounded-full bg-primary/10 px-2 text-[10px] font-semibold text-primary">
              +35
            </span>
          </div>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">1</span>
            <span className="flex h-5 items-center rounded bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
              3346
            </span>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={allData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#999" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="value" fill={teal} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Bottom bar */}
          <div className="mt-3 flex gap-1 overflow-hidden rounded-full">
            <div className="h-3 flex-[1854] rounded-l-full bg-primary text-center text-[8px] leading-3 text-primary-foreground">1854</div>
            <div className="h-3 flex-[2109] bg-primary/80 text-center text-[8px] leading-3 text-primary-foreground">2109</div>
            <div className="h-3 flex-[562] bg-accent text-center text-[8px] leading-3 text-accent-foreground">562</div>
            <div className="h-3 flex-[3346] rounded-r-full bg-primary/60 text-center text-[8px] leading-3 text-primary-foreground">3346</div>
          </div>
        </div>

        {/* Critical FFPs */}
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="mb-4 text-sm font-bold text-foreground">Critical FFPs</h3>
          <div className="flex flex-wrap gap-2">
            {criticalFfps.map((ffp) => (
              <div
                key={ffp.name}
                className="rounded-lg border border-border bg-muted/50 px-3 py-2"
              >
                <p className="text-xs font-semibold text-foreground">
                  {ffp.name}
                  <span className="ml-1 inline-block h-2 w-2 rounded-full bg-primary" />
                </p>
                <p className="text-[10px] text-muted-foreground">{ffp.vehicles}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-6 rounded-full bg-destructive" /> {"High risk > 500"}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-6 rounded-full bg-accent" /> {"Medium risk > 100"}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-6 rounded-full bg-primary/40" /> {"Low risk < 100"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
