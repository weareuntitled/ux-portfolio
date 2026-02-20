'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { kovonUsabilityWaterfall } from '@/content/home';

const chartConfig = {
  stage: { label: 'Stage' },
  value: { label: 'Index', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

export function UsabilityWaterfall() {
  return (
    <div className="mt-3 space-y-1 rounded-md border border-border bg-muted/30 p-3">
      <p className="text-xs font-medium text-foreground">Usability findings reduction (index)</p>
      <p className="text-[10px] text-muted-foreground">
        POC baseline → MVP → later testing (relative, not absolute counts)
      </p>
      <ChartContainer config={chartConfig} className="h-[100px] w-full">
        <BarChart data={[...kovonUsabilityWaterfall]} margin={{ top: 4, right: 4, bottom: 4, left: 0 }}>
          <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} width={24} />
          <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
