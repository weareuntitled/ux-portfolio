import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DiagnosePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Kovon / Diagnose</p>
          <h1 className="text-3xl font-semibold tracking-tight">Module Overview</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/prototypes/kovon">Back to Workflow Hub</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Signal Snapshot</CardTitle>
          <CardDescription>Use quick filters and jump to analysis for flagged rows.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <Input defaultValue="Q1 Fulfillment Variance" aria-label="Workflow name" />
            <Input defaultValue="North Region" aria-label="Region" />
            <Input defaultValue="Critical + Warning" aria-label="Severity filter" />
          </div>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground">Monitored pipelines</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground">Critical deltas</p>
              <p className="text-2xl font-semibold text-amber-600">3</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground">Assigned teams</p>
              <p className="text-2xl font-semibold">7</p>
            </div>
          </div>
          <Button asChild>
            <Link href="/prototypes/kovon/diss">Open analysis table</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
