"use client"

import * as React from "react"
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, pickSafeTooltipContentProps, type ChartConfig } from "@/components/ui/chart"

type ScoreDatum = { label: string; score: number }

// ------------------------------------------------------------------
// Daniel Peters, product design profile tuned for enterprise UX
// Scale: 0 to 100 (self rating, tweak anytime)
// ------------------------------------------------------------------

const skillsData: ScoreDatum[] = [
  { label: "Enterprise UX", score: 92 },
  { label: "Requirements, User Flows", score: 90 },
  { label: "HiFi Prototyping", score: 92 },
  { label: "Data Viz UX", score: 86 },
  { label: "Stakeholder Alignment", score: 90 },
  { label: "Agile Facilitation", score: 82 },
  { label: "Design Systems", score: 78 },
  { label: "AI Use Case Design", score: 76 },
  { label: "Motion, Micro Interactions", score: 84 },
]

const toolsData: ScoreDatum[] = [
  { label: "Figma", score: 95 },
  { label: "FigJam", score: 88 },
  { label: "Jira", score: 82 },
  { label: "Confluence", score: 78 },
  { label: "After Effects", score: 86 },
  { label: "Illustrator", score: 82 },
  { label: "Photoshop", score: 80 },
  { label: "Webflow", score: 80 },
  { label: "Miro", score: 72 },
  { label: "n8n, Automations", score: 68 },
]

const programmingData: ScoreDatum[] = [
  { label: "HTML + CSS", score: 86 },
  { label: "JavaScript", score: 78 },
  { label: "TypeScript", score: 72 },
  { label: "Angular", score: 70 },
  { label: "React", score: 68 },
  { label: "Python", score: 64 },
  { label: "Docker", score: 62 },
  { label: "SQL Basics", score: 55 },
]

const radarConfig = {
  score: { label: "Score", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig

function RadarTooltipContent({ active, payload }: { active?: boolean; payload?: readonly { payload?: ScoreDatum; value?: number }[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload ?? { label: String(payload[0].value), score: payload[0].value ?? 0 }
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-sm shadow-md">
      <div className="font-medium text-foreground">{d.label}</div>
      <div className="text-muted-foreground">
        Score: <span className="font-medium tabular-nums text-foreground">{d.score}</span>
      </div>
    </div>
  )
}

export function CelonisSkillsPresentation() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Designer Skill Snapshot</CardTitle>
          <CardDescription>
            Enterprise product design profile, strong in complex workflows, UX prototyping, data visualization,
            and cross functional delivery.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Scale is 0 to 100. Use this as a visual, not a promise of certification level.
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Skills Radar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>What you bring to product teams</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={radarConfig} className="min-h-[280px] w-full">
              <RadarChart data={skillsData} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
                <ChartTooltip cursor={false} content={(props) => <ChartTooltipContent {...pickSafeTooltipContentProps(props ?? {})} />} />
                <PolarGrid />
                <PolarAngleAxis dataKey="label" tick={{ fontSize: 10 }} />
                <Radar
                  dataKey="score"
                  stroke="var(--color-score)"
                  fill="var(--color-score)"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ChartContainer>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-muted px-3 py-1 text-xs">Enterprise Tools</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs">Complex Workflows</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs">Data UX</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs">AI Thinking</span>
            </div>
          </CardContent>
        </Card>

        {/* Tools Radar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Tools</CardTitle>
            <CardDescription>Your daily toolkit</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={radarConfig} className="min-h-[280px] w-full">
              <RadarChart data={toolsData} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
                <ChartTooltip cursor={false} content={(props) => <RadarTooltipContent active={props?.active} payload={props?.payload} />} />
                <PolarGrid />
                <PolarAngleAxis dataKey="label" tick={{ fontSize: 10 }} />
                <Radar
                  dataKey="score"
                  stroke="var(--color-score)"
                  fill="var(--color-score)"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ChartContainer>

            <p className="mt-4 text-xs text-muted-foreground">
              This mix reads as product designer plus motion design and delivery tooling.
            </p>
          </CardContent>
        </Card>

        {/* Programming Radar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Programming</CardTitle>
            <CardDescription>Prototype and collaborate with engineering</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={radarConfig} className="min-h-[280px] w-full">
              <RadarChart data={programmingData} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
                <ChartTooltip cursor={false} content={(props) => <RadarTooltipContent active={props?.active} payload={props?.payload} />} />
                <PolarGrid />
                <PolarAngleAxis dataKey="label" tick={{ fontSize: 10 }} />
                <Radar
                  dataKey="score"
                  stroke="var(--color-score)"
                  fill="var(--color-score)"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ChartContainer>

            <p className="mt-4 text-xs text-muted-foreground">
              Focused on UI implementation context, automation, and building credible prototypes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
