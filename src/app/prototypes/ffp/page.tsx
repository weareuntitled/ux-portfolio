"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/ffp-prototype/dashboard-shell";
import { WorkflowCards } from "@/components/ffp-prototype/workflow-cards";
import { RecentItemsTable } from "@/components/ffp-prototype/recent-items-table";

export default function FfpDashboardPage() {
  return (
    <DashboardShell showLeftSidebar={false}>
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-6 flex items-center justify-center gap-6 text-sm font-medium">
          <span className="border-b-2 border-primary pb-1 text-primary">Workflow</span>
          <Link
            href="/prototypes/ffp/reporting"
            className="border-b-2 border-transparent pb-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Reporting
          </Link>
        </div>

        <WorkflowCards />
        <div className="mt-14">
          <RecentItemsTable />
        </div>
      </main>
    </DashboardShell>
  );
}
