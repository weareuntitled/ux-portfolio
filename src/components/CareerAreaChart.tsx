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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { careerAreaData } from '@/content/home';

const chartConfig = {
  phase: { label: 'Phase' },
  graphicDesign: {
    label: 'Graphic design',
    color: 'hsl(var(--chart-1))',
  },
  motionWeb: {
    label: 'Motion / Web',
    color: 'hsl(var(--chart-2))',
  },
  productUx: {
    label: 'Product / UX',
    color: 'hsl(var(--chart-3))',
  },
  aiSystems: {
    label: 'AI / Design systems',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

const data = careerAreaData.map((d) => ({ ...d }));

export function CareerAreaChart() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Career transition</CardTitle>
        <p className="text-sm text-muted-foreground">
          From graphic designer to product, UX, and AI/design systems focus.
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="phase"
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
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
            <Area
              type="monotone"
              dataKey="graphicDesign"
              stackId="a"
              fill="var(--color-graphicDesign)"
              fillOpacity={0.4}
              stroke="var(--color-graphicDesign)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="motionWeb"
              stackId="a"
              fill="var(--color-motionWeb)"
              fillOpacity={0.4}
              stroke="var(--color-motionWeb)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="productUx"
              stackId="a"
              fill="var(--color-productUx)"
              fillOpacity={0.4}
              stroke="var(--color-productUx)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="aiSystems"
              stackId="a"
              fill="var(--color-aiSystems)"
              fillOpacity={0.4}
              stroke="var(--color-aiSystems)"
              strokeWidth={1.5}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
