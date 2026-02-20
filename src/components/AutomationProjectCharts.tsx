'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  pickSafeTooltipContentProps,
} from '@/components/ui/chart';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Lock, Zap, ArrowDown, GitMerge, ShieldAlert } from 'lucide-react';
import { KLevelStack } from '@/components/KLevelStack';

const volumeData = [
  { label: 'Parts pushed/mo', value: 15 },
  { label: 'Fabrications', value: 50 },
  { label: 'False %', value: 7 },
];

const chartConfig = {
  label: { label: 'Label' },
  value: { label: 'Value', color: 'hsl(var(--primary))' },
} satisfies ChartConfig;

export function AutomationProjectCharts() {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
        <Lock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">
            Highly confidential project
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Working with parts and confidential car-building processes. No screenshots available. Outcomes visualized below.
          </p>
        </div>
      </div>

      {/* Compare & Contrast: V-System vs K-Levels */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: The Cascade (V-System) */}
        <Card className="overflow-hidden border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <GitMerge className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">The Cascade</CardTitle>
                <p className="text-xs font-medium text-muted-foreground">Data flows down ↓</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              The &quot;Single Source of Truth.&quot; Changes at the top project level automatically overwrite specifications at the part level. This ensures everyone builds to the same current standard.
            </p>
            <p className="mt-3 text-xs text-muted-foreground/80">
              <strong className="text-foreground">Example:</strong> Parent changes brand color Blue → Red. Every business card, button, and flyer (Children) updates to Red. If a designer makes one card Blue, the Master overwrites it back. Parent always wins.
            </p>
          </CardContent>
        </Card>

        {/* Right: The Gatekeeper (K-Levels) */}
        <Card className="overflow-hidden border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                <ShieldAlert className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-base">The Gatekeeper</CardTitle>
                <p className="text-xs font-medium text-muted-foreground">Status flows up ↑</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              The &quot;Chain of Trust.&quot; Validation starts at the bottom. If a single screw fails its audit, the entire vehicle system above it is blocked from production. Quality is non-negotiable.
            </p>
            <p className="mt-3 text-xs text-muted-foreground/80">
              <strong className="text-foreground">Example:</strong> A $1 brake bolt is defective (FAILED). Even though the rest of the Brake System is perfect, the system is marked UNSAFE. The entire car cannot be sold—the line stops because of that one bolt.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* K-Level cascade: Dependency Stack */}
      <Card className="overflow-hidden border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">When both meet: the problem</CardTitle>
          <p className="text-sm text-muted-foreground">
            Parent pushes a part (Cascade overwrites Child). Status drops propagate up (Gatekeeper blocks the chain). 1) Operator pushes. 2) Wrong status drops. 3) Bot flags; support restores. Reduces risk of assembly line stop.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 py-8">
          <KLevelStack />
          <p className="text-center text-xs text-muted-foreground">
            Part (cause) → System (victim) → Vehicle (blocked). Failure propagates upwards.
          </p>
        </CardContent>
      </Card>

      {/* Volume & impact */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Volume & false rate</CardTitle>
            <p className="text-sm text-muted-foreground">
              ~10–20 parts pushed/month, ~50 fabrications; 5–10% wrongly reset (e.g. part swap not relevant to child project)
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={chartConfig} className="h-[180px] w-full">
              <BarChart data={volumeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={28} />
                <ChartTooltip
                  content={(props) => (
                    <ChartTooltipContent {...pickSafeTooltipContentProps(props ?? {})} />
                  )}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card p-6">
          <CardHeader className="p-0">
            <CardTitle className="text-lg">Impact (conservative)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Bot flags wrongly reset parts; support restores them. Saves hours of manual checks; reduces risk of assembly line stop.
            </p>
          </CardHeader>
          <CardContent className="mt-6 grid grid-cols-3 gap-4 p-0">
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-2xl font-bold text-primary">40–50</p>
              <p className="text-xs text-muted-foreground">Experts</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-2xl font-bold text-primary">2–4h</p>
              <p className="text-xs text-muted-foreground">Hours/week each</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-2xl font-bold text-primary">3 mo</p>
              <p className="text-xs text-muted-foreground">Delivery</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card p-6">
          <CardHeader className="p-0">
            <CardTitle className="text-lg">What the bot saves</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Flags wrongly reset parts; support restores them. Saves manual checks; reduces risk of assembly line stop.
            </p>
          </CardHeader>
          <CardContent className="mt-6 flex items-center justify-center p-0">
            <div className="flex items-center gap-2 rounded-lg border-2 border-primary/50 bg-primary/5 px-4 py-3">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-foreground">Flags wrongly reset parts; support restores</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
