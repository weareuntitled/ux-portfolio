"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Fingerprint = {
  id: string;
  title: string;
  department: string;
  confidence: string;
  status: string;
};

const fingerprints: Fingerprint[] = [
  { id: "A-107", title: "Late Fulfillment Cluster", department: "Operations", confidence: "94%", status: "Open" },
  { id: "B-220", title: "Cost Variance Spike", department: "Finance", confidence: "87%", status: "Monitoring" },
  { id: "C-019", title: "SLA Drift Pattern", department: "Support", confidence: "90%", status: "Escalated" },
];

export default function FfpDashboardPage() {
  const [activeFingerprint, setActiveFingerprint] = useState<Fingerprint | null>(null);

  return (
    <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Prototype / FFP</p>
          <h1 className="text-3xl font-semibold tracking-tight">Fingerprint Dashboard</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/prototypes/kovon/tags">Back to department tags</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and segment active fingerprints.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Search by ID or title" defaultValue="A-107" />
          <Input placeholder="Department" defaultValue="Operations" />
          <Input placeholder="Status" defaultValue="Open + Escalated" />
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-3">
        <TabsList>
          <TabsTrigger value="all">All fingerprints</TabsTrigger>
          <TabsTrigger value="priority">Priority queue</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">ID</th>
                      <th className="px-4 py-3 font-medium">Pattern</th>
                      <th className="px-4 py-3 font-medium">Department</th>
                      <th className="px-4 py-3 font-medium">Confidence</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fingerprints.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-3 font-medium">{item.id}</td>
                        <td className="px-4 py-3">{item.title}</td>
                        <td className="px-4 py-3">{item.department}</td>
                        <td className="px-4 py-3">{item.confidence}</td>
                        <td className="flex flex-wrap gap-2 px-4 py-3">
                          <Button size="sm" variant="secondary" onClick={() => setActiveFingerprint(item)}>
                            Open drawer
                          </Button>
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/prototypes/ffp/${item.id}`}>Open detail</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="priority" className="mt-0">
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Priority fingerprints include items with confidence above 90% and escalated status.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {activeFingerprint && (
        <aside className="fixed inset-y-0 right-0 z-20 flex w-full max-w-md flex-col border-l bg-background p-6 shadow-lg">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Detail drawer</p>
              <h2 className="text-xl font-semibold">{activeFingerprint.id}</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setActiveFingerprint(null)}>
              Close
            </Button>
          </div>
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-muted-foreground">Pattern:</span> {activeFingerprint.title}
            </p>
            <p>
              <span className="text-muted-foreground">Department:</span> {activeFingerprint.department}
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span> {activeFingerprint.status}
            </p>
            <p>
              <span className="text-muted-foreground">Confidence:</span> {activeFingerprint.confidence}
            </p>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            <Button asChild>
              <Link href={`/prototypes/ffp/${activeFingerprint.id}`}>Open full detail</Link>
            </Button>
            <Button variant="outline" onClick={() => setActiveFingerprint(null)}>
              Done
            </Button>
          </div>
        </aside>
      )}
    </main>
  );
}
