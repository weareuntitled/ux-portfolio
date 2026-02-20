'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  pickSafeTooltipContentProps,
} from '@/components/ui/chart';

const chartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--chart-1))',
  },
  fullMark: {
    label: 'Max',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

type Datum = { subject: string; value: number; fullMark: number };

export function SkillsRadarProductChart({
  data,
  className,
}: {
  data: Datum[];
  className?: string;
}) {
  const chartData = data.map((d) => ({ ...d, score: d.value }));
  return (
    <ChartContainer
      config={chartConfig}
      className={className ?? 'mx-auto aspect-square max-h-[320px] w-full md:max-h-[360px]'}
    >
      <RechartsRadarChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
        <ChartTooltip
          cursor={false}
          content={(props) => (
            <ChartTooltipContent {...pickSafeTooltipContentProps(props ?? {})} />
          )}
        />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 13, fill: 'hsl(var(--foreground))', fontWeight: 500 }}
        />
        <PolarGrid
          stroke="hsl(var(--muted-foreground))"
          strokeOpacity={0.4}
        />
        <Radar
          name="Product focus"
          dataKey="score"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.25}
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ChartContainer>
  );
}
