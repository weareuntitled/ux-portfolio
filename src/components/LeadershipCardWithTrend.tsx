'use client';

import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { leadershipCard, marginTrendPoints } from '@/content/home';

const chartConfig = {
  year: { label: 'Year' },
  margin: { label: 'Margin (k€)', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

export function LeadershipCardWithTrend() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">{leadershipCard.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{leadershipCard.shortCopy}</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {leadershipCard.metrics.map((m) => (
            <div key={m.label}>
              <p className="text-xl font-semibold tabular-nums text-foreground">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 text-xs text-muted-foreground">Margin trend (k€)</p>
          <ChartContainer config={chartConfig} className="h-[80px] w-full">
            <AreaChart data={[...marginTrendPoints]} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fontSize: 10 }} width={28} />
              <Area
                type="monotone"
                dataKey="margin"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
