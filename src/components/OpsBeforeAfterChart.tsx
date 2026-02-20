'use client';

import { Bar, BarChart, Cell, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { opsBeforeAfter } from '@/content/home';

const data = [
  { stage: 'Before', value: opsBeforeAfter.before },
  { stage: 'After', value: Math.max(opsBeforeAfter.after, 0.5) },
];

const chartConfig = {
  stage: { label: 'Stage' },
  value: { label: opsBeforeAfter.unit, color: 'hsl(var(--primary))' },
} satisfies ChartConfig;

export function OpsBeforeAfterChart() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Recurring troubleshooting effort (stakeholder estimate)
      </p>
      <ChartContainer config={chartConfig} className="h-[120px] w-full">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 8 }}>
          <XAxis type="number" domain={[0, 5]} hide />
          <YAxis type="category" dataKey="stage" width={52} tick={{ fontSize: 11 }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            <Cell fill="hsl(var(--muted-foreground))" />
            <Cell fill="hsl(var(--primary))" />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
