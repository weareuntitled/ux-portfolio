'use client';

import {
  Legend,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
} from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { languagesData } from '@/content/dashboard';

const chartConfig = {
  German: { label: 'German', color: 'hsl(var(--chart-1))' },
  English: { label: 'English', color: 'hsl(var(--chart-2))' },
  Chinese: { label: 'Chinese', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

export function LanguagesRadialChart() {
  const data = languagesData.map((d) => ({
    ...d,
    fill: `var(--color-${d.name})`,
  }));
  return (
    <ChartContainer config={chartConfig} className="h-[280px] min-h-[200px] w-full">
      <RechartsRadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="90%"
        barCategoryGap="10%"
        data={data}
      >
        <RadialBar
          background={{ fill: 'hsl(var(--muted))' }}
          dataKey="value"
          cornerRadius={4}
        />
        <Legend
          layout="vertical"
          align="center"
          verticalAlign="middle"
          wrapperStyle={{ paddingLeft: 16 }}
        />
      </RechartsRadialBarChart>
    </ChartContainer>
  );
}
