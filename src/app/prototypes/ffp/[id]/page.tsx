import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function FfpDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">FFP / Fingerprint Detail</p>
          <h1 className="text-3xl font-semibold tracking-tight">Fingerprint {id}</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/prototypes/ffp">Back to dashboard</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Full investigation summary</CardTitle>
          <CardDescription>Expanded view of timeline, signal confidence, and recommended actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="rounded-lg border p-4">
            <p className="font-medium">Timeline</p>
            <p className="mt-1 text-muted-foreground">
              Repeated anomaly signal detected across three cycles. Escalation was triggered after confidence exceeded 90%.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="font-medium">Action queue</p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-muted-foreground">
              <li>Confirm department owner and due date.</li>
              <li>Attach source notes to downstream alert.</li>
              <li>Review dashboard status after remediation.</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/prototypes/ffp">Return to dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/prototypes/kovon">Restart from Workflow Hub</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
