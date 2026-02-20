"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/ffp-prototype/dashboard-shell";
import { MentioningsPanel } from "@/components/ffp-prototype/mentionings-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  ChevronRight,
  ChevronDown,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Activity data ─────────────────────────────────────── */
interface ActivityRow {
  ffpId: string;
  name: string;
  model5: string;
  modelYear: string;
  cw12: number;
  cw13: number;
  delta: number;
}

const activityData: ActivityRow[] = [
  {
    ffpId: "FFP-055",
    name: "Name of FFP might be quite long",
    model5: "A4B57C9D2",
    modelYear: "2023XYZW",
    cw12: 20,
    cw13: 22,
    delta: 2,
  },
  {
    ffpId: "FFP-041",
    name: "Brake sensor intermittent failure",
    model5: "E8F32G1H7",
    modelYear: "2022ABCD",
    cw12: 24,
    cw13: 22,
    delta: 0,
  },
  {
    ffpId: "FFP-098",
    name: "ECU software calibration drift",
    model5: "K2L91M5N3",
    modelYear: "2024QRST",
    cw12: 21,
    cw13: 25,
    delta: -4,
  },
  {
    ffpId: "FFP-017",
    name: "Transmission fluid leak detected",
    model5: "P6Q48R0S9",
    modelYear: "2023EFGH",
    cw12: 20,
    cw13: 21,
    delta: 1,
  },
];

/* ── Tag data ──────────────────────────────────────────── */
interface TagRow {
  id: string;
  tags: string[];
  extraCount?: number;
  dissAffected: number;
  year: number;
  country: string;
}

const tagRows: TagRow[] = [
  {
    id: "1",
    tags: [
      "Schwarzer Bildschirm | auto",
      "Motorsteuerung | auto",
      "Bremssensor Fehler | auto",
      "Getriebe Leck | auto",
    ],
    extraCount: 2,
    dissAffected: 16,
    year: 2014,
    country: "UK",
  },
  {
    id: "2",
    tags: [
      "Kalibrierung drift | auto",
      "Software Update | auto",
      "ECU Ausfall | auto",
    ],
    dissAffected: 12,
    year: 2014,
    country: "DEU",
  },
  {
    id: "3",
    tags: [
      "Sensorik Ausfall | auto",
      "Klimaanlage defekt | auto",
      "Steuergerät | auto",
      "Airbag Warnung | auto",
    ],
    extraCount: 1,
    dissAffected: 11,
    year: 2014,
    country: "CHI",
  },
];

/* ── Delta icon helper ─────────────────────────────────── */
function DeltaIndicator({ delta }: { delta: number }) {
  if (delta > 0) {
    return (
      <div className="flex flex-col items-center">
        <TrendingUp className="h-3.5 w-3.5 text-primary" />
        <span className="text-[10px] font-medium text-primary">+{delta}</span>
      </div>
    );
  }
  if (delta < 0) {
    return (
      <div className="flex flex-col items-center">
        <TrendingDown className="h-3.5 w-3.5 text-destructive" />
        <span className="text-[10px] font-medium text-destructive">{delta}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <Minus className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-[10px] font-medium text-muted-foreground">0</span>
    </div>
  );
}

function TagPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
      {text}
    </span>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export default function SagaPage() {
  const [activeTab, setActiveTab] = useState<"trending" | "lastIn">("trending");

  return (
    <DashboardShell>
      <main className="px-4 py-4 lg:px-6">
        {/* Header - compact for above-the-fold */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <h1 className="text-xl font-bold text-foreground md:text-2xl">
            SAGA-Overview
          </h1>
          <Button className="shrink-0 gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90">
            <Plus className="h-3.5 w-3.5" />
            SAGA Zuordnung
          </Button>
        </div>

        <div className="flex gap-4">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* ── Activity Section ────────────────────── */}
            <div className="mb-4 rounded-lg border border-border bg-background p-4">
              {/* Activity header */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-foreground">Activity</h2>
                <div className="relative flex items-center">
                  <Search className="absolute left-2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="h-7 w-36 pl-7 text-xs focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>

              {/* Tabs + week selectors */}
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <div className="flex overflow-hidden rounded-full border border-border">
                  <button
                    type="button"
                    onClick={() => setActiveTab("trending")}
                    className={cn(
                      "px-3 py-1 text-xs font-medium transition-colors",
                      activeTab === "trending"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-secondary"
                    )}
                  >
                    Trending
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("lastIn")}
                    className={cn(
                      "px-3 py-1 text-xs font-medium transition-colors",
                      activeTab === "lastIn"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-secondary"
                    )}
                  >
                    Last In
                  </button>
                </div>

                <div className="flex items-center gap-1 text-sm text-foreground">
                  <span className="font-medium">Start Week</span>
                  <button type="button" className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-secondary">
                    CW12 <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-sm text-foreground">
                  <span className="font-medium">End Week</span>
                  <button type="button" className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-secondary">
                    CW13 <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-[1.4fr_1.4fr_1fr_1fr_1fr] items-center gap-2 border-b border-border pb-2 text-[11px] font-semibold text-primary">
                <span>FFP</span>
                <span className="hidden md:block" />
                <span>CW12</span>
                <span>CW13</span>
                <span>{"Affected Vehicles (delta)"}</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-border">
                {activityData.map((row, i) => (
                  <div
                    key={row.ffpId + i}
                    className="grid grid-cols-[1.4fr_1.4fr_1fr_1fr_1fr] items-center gap-2 py-2"
                  >
                    <div>
                      <a href="#" className="text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80">
                        {row.ffpId}
                      </a>
                      <p className="truncate text-[11px] text-muted-foreground">{row.name}</p>
                    </div>
                    <div className="hidden text-[11px] text-foreground md:block">
                      <p>
                        <span className="font-medium">Model 5 digit:</span> {row.model5}
                      </p>
                      <p>
                        <span className="font-medium">Model Year:</span> {row.modelYear}
                      </p>
                    </div>
                    <div className="text-xs text-foreground">
                      <span className="font-medium">CW12:</span> {row.cw12}
                    </div>
                    <div className="text-xs text-foreground">
                      <span className="font-medium">CW13:</span> {row.cw13}
                    </div>
                    <div className="flex items-center gap-2">
                      <DeltaIndicator delta={row.delta} />
                      <span className="text-[11px] text-muted-foreground">
                        Delta Affected Vehicles: {row.delta > 0 ? `+${row.delta}` : row.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DISS-tag Management ────────────────── */}
            <div className="rounded-lg border border-border bg-background p-4">
              <h2 className="mb-3 text-sm font-bold text-foreground">
                DISS-tag Management (FFP Recommendations)
              </h2>

              <div className="flex flex-col divide-y divide-border">
                {tagRows.map((row) => (
                  <div
                    key={row.id}
                    className="flex items-center gap-3 py-2 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-1 flex-wrap items-center gap-1.5">
                      {row.tags.map((tag, j) => (
                        <TagPill key={`${row.id}-${j}`} text={tag} />
                      ))}
                      {row.extraCount && (
                        <span className="text-xs text-muted-foreground">
                          +{row.extraCount}
                        </span>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-4 text-xs text-foreground">
                      <span>{row.dissAffected} DISS</span>
                      <span className="font-medium">{row.year}</span>
                      <span className="font-medium">{row.country}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-center">
                <button
                  type="button"
                  className="text-xs font-medium text-foreground underline underline-offset-2 hover:text-primary"
                >
                  more Recommendations
                </button>
              </div>
            </div>
          </div>

          {/* Mentionings */}
          <div className="hidden xl:block">
            <MentioningsPanel />
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
