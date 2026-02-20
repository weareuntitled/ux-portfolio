'use client';

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  pickSafeTooltipContentProps,
} from '@/components/ui/chart';
import { growthChartData } from '@/content/home';

const chartConfig = {
  year: { label: 'Year' },
  scope: {
    label: 'Scope',
    color: 'hsl(var(--chart-1))',
  },
  responsibility: {
    label: 'Responsibility',
    color: 'hsl(var(--chart-2))',
  },
  impact: {
    label: 'Impact',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

const data = growthChartData.map((d) => ({ ...d }));

export function GrowthChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[320px] w-full md:h-[360px]">
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }}
        />
        <YAxis
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 10 }}
          width={28}
        />
        <ChartTooltip
          content={(props) => (
            <ChartTooltipContent {...pickSafeTooltipContentProps(props ?? {})} />
          )}
          cursor={false}
        />
        <Line
          type="monotone"
          dataKey="scope"
          stroke="var(--color-scope)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-scope)', r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="responsibility"
          stroke="var(--color-responsibility)"
          strokeWidth={2}
          strokeDasharray="4 2"
          dot={{ fill: 'var(--color-responsibility)', r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="impact"
          stroke="var(--color-impact)"
          strokeWidth={2}
          strokeDasharray="6 3"
          dot={{ fill: 'var(--color-impact)', r: 3 }}
          activeDot={{ r: 5 }}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </RechartsLineChart>
    </ChartContainer>
  );
}
