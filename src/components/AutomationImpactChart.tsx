'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  pickSafeTooltipContentProps,
} from '@/components/ui/chart';

const automationImpactData = [
  { quarter: 'Q1 2023', manual: 100, automated: 10 },
  { quarter: 'Q2 2023', manual: 85, automated: 25 },
  { quarter: 'Q3 2023', manual: 65, automated: 45 },
  { quarter: 'Q4 2023', manual: 45, automated: 65 },
  { quarter: 'Q1 2024', manual: 30, automated: 80 },
  { quarter: 'Q2 2024', manual: 20, automated: 90 },
];

const chartConfig = {
  quarter: { label: 'Quarter' },
  manual: { label: 'Manual effort (%)', color: 'hsl(var(--muted-foreground))' },
  automated: { label: 'Automated (%)', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

export function AutomationImpactChart() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Automation impact over time</CardTitle>
        <p className="text-sm text-muted-foreground">
          Shift from manual ops effort to automated workflows (relative %).
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart
            data={automationImpactData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="quarter"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
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
                <ChartTooltipContent {...pickSafeTooltipContentProps(props ?? {})} indicator="line" />
              )}
              cursor={false}
            />
            <Area
              type="monotone"
              dataKey="manual"
              stackId="a"
              fill="hsl(var(--muted-foreground))"
              fillOpacity={0.3}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="automated"
              stackId="a"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
              strokeWidth={1.5}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
