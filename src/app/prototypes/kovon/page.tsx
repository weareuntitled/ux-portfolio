import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const modules = [
  {
    name: "Diagnose",
    description: "System health and gap scan.",
    href: "/prototypes/kovon/diagnose",
    cta: "Open module",
  },
  {
    name: "DISS",
    description: "Root-cause scoring and impact summary.",
    href: "/prototypes/kovon/diss",
    cta: "Review analysis",
  },
  {
    name: "SAGA",
    description: "Department-level tags and ownership checks.",
    href: "/prototypes/kovon/saga",
    cta: "Inspect tag handoff",
  },
];

export default function KovonHubPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Prototype / Kovon</p>
        <h1 className="text-3xl font-semibold tracking-tight">Workflow Hub</h1>
        <p className="text-sm text-muted-foreground">Select a module to continue the interactive mock flow.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.name} className="flex h-full flex-col justify-between">
            <CardHeader>
              <CardTitle>{module.name}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={module.href}>{module.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <div>
        <Button asChild variant="outline">
          <Link href="/prototypes/kovon/diagnose">Start guided flow</Link>
        </Button>
      </div>
    </main>
  );
}
