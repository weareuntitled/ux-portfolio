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
        <TrendingUp className="h-5 w-5 text-primary" />
        <span className="text-xs font-medium text-primary">+{delta}</span>
      </div>
    );
  }
  if (delta < 0) {
    return (
      <div className="flex flex-col items-center">
        <TrendingDown className="h-5 w-5 text-destructive" />
        <span className="text-xs font-medium text-destructive">{delta}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <Minus className="h-5 w-5 text-muted-foreground" />
      <span className="text-xs font-medium text-muted-foreground">0</span>
    </div>
  );
}

function TagPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">
      {text}
    </span>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export default function SagaPage() {
  const [activeTab, setActiveTab] = useState<"trending" | "lastIn">("trending");

  return (
    <DashboardShell>
      <main className="px-6 py-8 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <h1 className="animate-in fade-in slide-in-from-left-4 text-2xl font-bold text-foreground duration-500 md:text-3xl">
            SAGA-Overview
          </h1>
          <Button className="animate-in fade-in slide-in-from-right-4 gap-2 rounded-full bg-primary text-primary-foreground duration-500 hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            SAGA Zuordnung
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* ── Activity Section ────────────────────── */}
            <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 rounded-xl border border-border bg-background p-6 duration-500">
              {/* Activity header */}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-foreground">Activity</h2>
                <div className="relative flex items-center">
                  <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="h-9 w-48 pl-9 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>

              {/* Tabs + week selectors */}
              <div className="mb-6 flex flex-wrap items-center gap-6">
                <div className="flex overflow-hidden rounded-full border border-border">
                  <button
                    type="button"
                    onClick={() => setActiveTab("trending")}
                    className={cn(
                      "px-4 py-1.5 text-xs font-medium transition-colors",
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
                      "px-4 py-1.5 text-xs font-medium transition-colors",
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
              <div className="grid grid-cols-[1.4fr_1.4fr_1fr_1fr_1fr] items-center gap-4 border-b border-border pb-3 text-xs font-semibold text-primary">
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
                    className="animate-in fade-in slide-in-from-bottom-2 grid grid-cols-[1.4fr_1.4fr_1fr_1fr_1fr] items-center gap-4 py-4"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                  >
                    <div>
                      <a href="#" className="text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary/80">
                        {row.ffpId}
                      </a>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{row.name}</p>
                    </div>
                    <div className="hidden text-xs text-foreground md:block">
                      <p>
                        <span className="font-medium">Model 5 digit:</span> {row.model5}
                      </p>
                      <p>
                        <span className="font-medium">Model Year:</span> {row.modelYear}
                      </p>
                    </div>
                    <div className="text-sm text-foreground">
                      <span className="font-medium">Affected Vehicles CW12:</span> {row.cw12}
                    </div>
                    <div className="text-sm text-foreground">
                      <span className="font-medium">Affected Vehicles CW13:</span> {row.cw13}
                    </div>
                    <div className="flex items-center gap-3">
                      <DeltaIndicator delta={row.delta} />
                      <span className="text-xs text-muted-foreground">
                        Delta Affected Vehicles: {row.delta > 0 ? `+${row.delta}` : row.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DISS-tag Management ────────────────── */}
            <div className="animate-in fade-in slide-in-from-bottom-4 rounded-xl border border-border bg-background p-6 duration-700">
              <h2 className="mb-6 text-lg font-bold text-foreground md:text-xl">
                DISS-tag Management (FFP Recommendations)
              </h2>

              <div className="flex flex-col divide-y divide-border">
                {tagRows.map((row, i) => (
                  <div
                    key={row.id}
                    className="animate-in fade-in slide-in-from-bottom-2 flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                    style={{ animationDelay: `${300 + i * 80}ms`, animationFillMode: "both" }}
                  >
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      {row.tags.map((tag, j) => (
                        <TagPill key={`${row.id}-${j}`} text={tag} />
                      ))}
                      {row.extraCount && (
                        <span className="text-sm text-muted-foreground">
                          +{row.extraCount}
                        </span>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-6 text-sm text-foreground">
                      <span>{row.dissAffected} DISS affected</span>
                      <span className="font-medium">{row.year}</span>
                      <span className="font-medium">{row.country}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary"
                >
                  more Recommendations
                </button>
              </div>
            </div>
          </div>

          {/* Mentionings */}
          <div className="hidden animate-in fade-in slide-in-from-right-4 duration-500 xl:block">
            <MentioningsPanel />
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
