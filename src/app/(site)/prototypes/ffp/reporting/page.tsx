"use client";

import { DashboardShell } from "@/components/ffp-prototype/dashboard-shell";
import { FfpActivitySection } from "@/components/ffp-prototype/reporting/ffp-activity";
import { LastEditedFfps } from "@/components/ffp-prototype/reporting/last-edited-ffps";
import { NewsSidebar } from "@/components/ffp-prototype/reporting/news-sidebar";
import { PersonalOverview } from "@/components/ffp-prototype/reporting/personal-overview";
import { OwnFfpsTable } from "@/components/ffp-prototype/reporting/own-ffps-table";

export default function ReportingPage() {
  return (
    <DashboardShell>
      <main className="px-4 py-4 lg:px-6">
        {/* Header - compact so charts/sections fit above the fold */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-foreground md:text-2xl">
            Reporting dashboard
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {"Reporting, Stand 15.03.2023 -> Exportbutton"}
          </p>
        </div>

        <div className="flex gap-3">
          {/* Main column - tight spacing so Own FFPs fits above the fold */}
          <div className="flex-1 space-y-3 overflow-hidden">
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
