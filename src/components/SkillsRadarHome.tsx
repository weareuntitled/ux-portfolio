'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
} from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { skillsRadarData } from '@/content/home';

const chartConfig = {
  value: { label: 'Level', color: 'hsl(var(--chart-1))' },
  fullMark: { label: 'Max', color: 'hsl(var(--muted-foreground))' },
} satisfies ChartConfig;

export function SkillsRadarHome() {
  const data = [...skillsRadarData];
  return (
    <div className="h-[280px] w-full min-w-[260px]">
      <ChartContainer config={chartConfig} className="h-full w-full aspect-square max-h-full">
        <RechartsRadarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ChartContainer>
    </div>
  );
}
