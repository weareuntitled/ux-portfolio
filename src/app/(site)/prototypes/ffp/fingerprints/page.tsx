"use client";

import { useState, useMemo } from "react";
import { DashboardShell } from "@/components/ffp-prototype/dashboard-shell";
import { FFPTable } from "@/components/ffp-dashboard/FFPTable";
import { FFPDetailPanel } from "@/components/ffp-dashboard/FFPDetailPanel";
import { mockFFPs } from "@/lib/ffp-dashboard/mock-data";
import type { FFP } from "@/lib/ffp-dashboard/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function FingerprintsDashboardPage() {
  const [selectedFFP, setSelectedFFP] = useState<FFP | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFFPSelect = (ffp: FFP) => {
    setSelectedFFP(ffp);
    setDetailPanelOpen(true);
  };

  const filteredFFPs = useMemo(() => {
    return mockFFPs.filter(
      (ffp) =>
        ffp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ffp.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const watchedFFPs = filteredFFPs.slice(0, 1);
  const allFFPs = filteredFFPs;

  return (
    <DashboardShell>
      <main className="px-4 py-4 lg:px-6">
        {/* Page title, search, and Create new FFP - compact for above-the-fold */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold text-foreground md:text-2xl">
            Failure Fingerprints dashboard
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 max-w-xs sm:max-w-sm">
              <input
                type="search"
                placeholder="Search FFPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                aria-label="Search FFPs"
              />
            </div>
            <Button className="gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Create new FFP
            </Button>
          </div>
        </div>

        {/* Content: tables + detail panel */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <FFPTable
              title="Watched FFPs"
              ffps={watchedFFPs}
              onFFPSelect={handleFFPSelect}
            />
            <FFPTable
              title="All FFPs"
              ffps={allFFPs}
              onFFPSelect={handleFFPSelect}
            />
          </div>
          <FFPDetailPanel
            ffp={selectedFFP}
            isOpen={detailPanelOpen}
            onClose={() => setDetailPanelOpen(false)}
          />
        </div>
      </main>
    </DashboardShell>
  );
}
