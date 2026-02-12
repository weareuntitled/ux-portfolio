'use client';

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
  PolarRadiusAxis,
} from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { skillsData } from '@/content/dashboard';

const chartConfig = {
  value: {
    label: 'Score',
    color: 'hsl(var(--chart-1))',
  },
  fullMark: {
    label: 'Max',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

export function SkillsRadarChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[320px] min-h-[240px] w-full">
      <RechartsRadarChart data={skillsData}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 150]}
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Legend />
      </RechartsRadarChart>
    </ChartContainer>
  );
}
