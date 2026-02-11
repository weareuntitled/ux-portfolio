import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const rows = [
  { id: "INV-103", stream: "Intake", score: "91", owner: "Ops Core", next: "/prototypes/kovon/saga" },
  { id: "FUL-208", stream: "Fulfillment", score: "84", owner: "Warehouse", next: "/prototypes/kovon/saga" },
  { id: "RET-051", stream: "Returns", score: "78", owner: "Support", next: "/prototypes/kovon/saga" },
];

export default function DissPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Kovon / DISS</p>
          <h1 className="text-3xl font-semibold tracking-tight">Analysis Table</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/prototypes/kovon/diagnose">Back to module overview</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Impact-ranked records</CardTitle>
          <CardDescription>Each row action moves to the department-tag review step.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Case</th>
                  <th className="px-4 py-3 font-medium">Stream</th>
                  <th className="px-4 py-3 font-medium">Risk score</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{row.id}</td>
                    <td className="px-4 py-3">{row.stream}</td>
                    <td className="px-4 py-3">{row.score}</td>
                    <td className="px-4 py-3">{row.owner}</td>
                    <td className="px-4 py-3">
                      <Button asChild size="sm" variant="secondary">
                        <Link href={row.next}>Review tags</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
