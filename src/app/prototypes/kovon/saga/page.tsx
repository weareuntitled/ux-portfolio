"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SagaPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Kovon / SAGA</p>
          <h1 className="text-3xl font-semibold tracking-tight">Department Tag Handoff</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/prototypes/kovon/diss">Back to analysis table</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tag routing by function</CardTitle>
          <CardDescription>Switch tabs to see which team receives the flagged issue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="operations" className="space-y-3">
            <TabsList>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            <TabsContent value="operations" className="rounded-lg border p-4 text-sm">
              Priority tag <span className="font-medium">#handoff-delay</span> is assigned to Ops Core for same-day triage.
            </TabsContent>
            <TabsContent value="finance" className="rounded-lg border p-4 text-sm">
              Priority tag <span className="font-medium">#cost-spike</span> is assigned to FP&amp;A for variance approval.
            </TabsContent>
            <TabsContent value="support" className="rounded-lg border p-4 text-sm">
              Priority tag <span className="font-medium">#sla-drift</span> is assigned to Customer Support supervisors.
            </TabsContent>
          </Tabs>

          <div className="mt-4">
            <Button asChild>
              <Link href="/prototypes/kovon/tags">Continue to department tags</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
