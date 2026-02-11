"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const departments = ["Operations", "Finance", "Support", "Legal"];

export default function TagsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Kovon / Tags</p>
          <h1 className="text-3xl font-semibold tracking-tight">Department Tag Matrix</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/prototypes/kovon/saga">Back to SAGA</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Finalize routing</CardTitle>
          <CardDescription>Assign ownership and move to fingerprint dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Primary department</p>
              <Select defaultValue="Operations">
                <SelectTrigger>
                  <SelectValue placeholder="Choose department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Escalation department</p>
              <Select defaultValue="Support">
                <SelectTrigger>
                  <SelectValue placeholder="Choose escalation" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department} value={`Esc-${department}`}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">FFP target</p>
              <Select defaultValue="A-107">
                <SelectTrigger>
                  <SelectValue placeholder="Choose fingerprint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A-107">Fingerprint A-107</SelectItem>
                  <SelectItem value="B-220">Fingerprint B-220</SelectItem>
                  <SelectItem value="C-019">Fingerprint C-019</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button asChild>
            <Link href="/prototypes/ffp">Open FFP dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
