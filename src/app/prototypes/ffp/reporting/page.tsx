"use client";

import { DashboardShell } from "@/components/ffp-prototype/dashboard-shell";
import { FfpActivitySection } from "@/components/ffp-prototype/reporting/ffp-activity";
import { LastEditedFfps } from "@/components/ffp-prototype/reporting/last-edited-ffps";
import { NewsSidebar } from "@/components/ffp-prototype/reporting/news-sidebar";
import { PersonalOverview } from "@/components/ffp-prototype/reporting/personal-overview";
import { OwnFfpsTable } from "@/components/ffp-prototype/reporting/own-ffps-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ReportingPage() {
  return (
    <DashboardShell showLeftSidebar>
      <main className="px-6 py-8 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Reporting dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {"Reporting, Stand 15.03.2023 -> Exportbutton"}
            </p>
          </div>
          <Button className="gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Create new FFP
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Main column */}
          <div className="flex-1 space-y-8 overflow-hidden">
            <FfpActivitySection />
            <LastEditedFfps />
            <PersonalOverview />
            <OwnFfpsTable />
          </div>

          {/* News sidebar */}
          <div className="hidden xl:block">
            <NewsSidebar />
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
