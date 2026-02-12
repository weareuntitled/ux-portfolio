"use client";

import { DashboardShell } from "@/components/ffp-workflow/dashboard-shell";
import { WorkflowCards } from "@/components/ffp-workflow/workflow-cards";
import { RecentItemsTable } from "@/components/ffp-workflow/recent-items-table";
import { OwnFfpsTable } from "@/components/ffp-workflow/reporting/own-ffps-table";

export default function FfpPage() {
  return (
    <DashboardShell showLeftSidebar>
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <WorkflowCards />
        <div className="mt-14 space-y-10">
          <RecentItemsTable />
          <OwnFfpsTable />
        </div>
      </main>
    </DashboardShell>
  );
}
