"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/ffp-prototype/dashboard-shell";
import { MentioningsPanel } from "@/components/ffp-prototype/mentionings-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { activityFFPs, dissRecommendations } from "@/lib/diagnose-dashboard/mock-data";
import type { ActivityFFP } from "@/lib/diagnose-dashboard/types";
import { cn } from "@/lib/utils";

function getTrendIcon(trend: ActivityFFP["trend"]) {
  if (trend === "up")
    return <TrendingUp className="h-3.5 w-3.5 text-green-500" />;
  if (trend === "down")
    return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
}

export default function DiagnosePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [startWeek, setStartWeek] = useState("CW11");
  const [endWeek, setEndWeek] = useState("CW13");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const next = new Set(expandedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedRows(next);
  };

  const filteredFFPs = activityFFPs.filter(
    (ffp) =>
      ffp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ffp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ffp.diagnoseData.dtc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardShell>
      <main className="px-4 py-4 lg:px-6">
        {/* Header - same style as other FFP pages */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <h1 className="text-xl font-bold text-foreground md:text-2xl">
            Diagnose-Overview
          </h1>
          <Button className="shrink-0 gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90">
            <Plus className="h-3.5 w-3.5" />
            Diagnose Clustering
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            {/* Activity Section - compact */}
            <div className="mb-4 rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-foreground">Activity</h2>
                <div className="relative flex items-center">
                  <Search className="absolute left-2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="h-7 w-36 pl-7 text-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-muted-foreground">Start Week</span>
                <Button variant="outline" size="sm" className="h-7 gap-1 px-2 text-xs">
                  {startWeek}
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <span className="text-[11px] text-muted-foreground">End Week</span>
                <Button variant="outline" size="sm" className="h-7 gap-1 px-2 text-xs">
                  {endWeek}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[900px] text-[11px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/50 text-left font-semibold text-foreground">
                      <th className="w-7 p-2" />
                      <th className="min-w-[140px] p-2">FFP</th>
                      <th className="min-w-[120px] p-2">Diagnose Data</th>
                      <th className="min-w-[70px] p-2">CW12</th>
                      <th className="min-w-[70px] p-2">CW13</th>
                      <th className="min-w-[100px] p-2">Delta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFFPs.map((ffp, index) => (
                      <React.Fragment key={`${ffp.id}-${index}`}>
                        <tr
                          className="cursor-pointer border-b border-border hover:bg-secondary/30 transition-colors"
                          onClick={() => toggleRow(ffp.id)}
                        >
                          <td className="p-2">
                            <ChevronRight
                              className={cn(
                                "h-3.5 w-3.5 text-muted-foreground transition-transform",
                                expandedRows.has(ffp.id) && "rotate-90"
                              )}
                            />
                          </td>
                          <td className="p-2">
                            <div className="font-medium text-primary">{ffp.id}</div>
                            <div className="truncate max-w-[130px] text-muted-foreground">{ffp.name}</div>
                          </td>
                          <td className="p-2 text-muted-foreground">
                            <div className="font-mono">DTC: {ffp.diagnoseData.dtc}</div>
                            <div className="font-mono">DFCC: {ffp.diagnoseData.dfcc}</div>
                          </td>
                          <td className="p-2 font-medium text-foreground">{ffp.cw12AffectedVehicles}</td>
                          <td className="p-2 font-medium text-foreground">{ffp.cw13AffectedVehicles}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                                {getTrendIcon(ffp.trend)}
                              </div>
                              <span
                                className={cn(
                                  "font-semibold",
                                  ffp.trend === "up" && "text-green-600 dark:text-green-400",
                                  ffp.trend === "down" && "text-destructive",
                                  ffp.trend === "stable" && "text-muted-foreground"
                                )}
                              >
                                {ffp.trend === "up" ? "+" : ffp.trend === "down" ? "" : ""}
                                {ffp.deltaAffectedVehicles}
                              </span>
                            </div>
                          </td>
                        </tr>
                        {expandedRows.has(ffp.id) && (
                          <tr className="border-b border-border bg-muted/20">
                            <td colSpan={6} className="p-3">
                              <div className="grid grid-cols-2 gap-3 text-[11px]">
                                <div>
                                  <div className="text-muted-foreground">Project Number</div>
                                  <div className="font-mono text-foreground">{ffp.diagnoseData.projectNumber}</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground">Model Year</div>
                                  <div className="text-foreground">{ffp.diagnoseData.modelYear}</div>
                                </div>
                                <div className="col-span-2">
                                  <div className="text-muted-foreground">Full Description</div>
                                  <div className="text-foreground">{ffp.name}</div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DISS-tag Management - compact */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-bold text-foreground">
                DISS-tag Management (FFP Recommendations)
              </h3>
              <div className="space-y-2">
                {dissRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/40 p-2 hover:bg-muted/60 transition-colors"
                  >
                    <div className="flex flex-1 flex-wrap gap-1.5">
                      {rec.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex rounded bg-primary px-2 py-0.5 text-[10px] text-primary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex shrink-0 items-center gap-3 text-[11px] text-muted-foreground">
                      <span>{rec.dissAffected} DISS</span>
                      <span>{rec.modelYear}</span>
                      <span>{rec.country}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-3 text-xs font-medium text-primary underline underline-offset-2 hover:text-primary/80"
              >
                more Recommendations
              </button>
            </div>
          </div>

          <div className="hidden xl:block">
            <MentioningsPanel />
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
