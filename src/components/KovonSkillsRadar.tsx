'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  pickSafeTooltipContentProps,
} from '@/components/ui/chart';

const kovonRadarData = [
  { subject: 'Motion', enterprise: 75, fullMark: 100 },
  { subject: 'Web', enterprise: 85, fullMark: 100 },
  { subject: 'Product', enterprise: 90, fullMark: 100 },
  { subject: 'UX', enterprise: 88, fullMark: 100 },
  { subject: 'UI', enterprise: 85, fullMark: 100 },
  { subject: 'AI Consulting', enterprise: 70, fullMark: 100 },
  { subject: 'Design systems', enterprise: 82, fullMark: 100 },
  { subject: 'Research', enterprise: 80, fullMark: 100 },
];

const chartConfig = {
  enterprise: {
    label: 'Enterprise focus',
    color: 'hsl(var(--chart-1))',
  },
  fullMark: {
    label: 'Max',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

export function KovonSkillsRadar() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Skills &amp; focus for this engagement</CardTitle>
        <p className="text-sm text-muted-foreground">
          Relative emphasis across motion, web, product, UX/UI, AI, design systems, and research.
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px] w-full"
        >
          <RechartsRadarChart
            data={kovonRadarData}
            margin={{ top: -20, bottom: -10 }}
          >
            <ChartTooltip
              cursor={false}
              content={(props) => (
                <ChartTooltipContent {...pickSafeTooltipContentProps(props ?? {})} indicator="line" />
              )}
            />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
            <PolarGrid stroke="hsl(var(--border))" />
            <Radar
              name="Enterprise focus"
              dataKey="enterprise"
              fill="var(--color-enterprise)"
              fillOpacity={0.5}
              stroke="var(--color-enterprise)"
              strokeWidth={1.5}
            />
            <ChartLegend className="mt-6" content={<ChartLegendContent />} />
          </RechartsRadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
