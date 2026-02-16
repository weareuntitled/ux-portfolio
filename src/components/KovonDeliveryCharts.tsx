'use client';

import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { KovonUsersRadial } from '@/components/KovonUsersRadial';

const deliveryPieData = [
  { phase: 'poc', value: 15, fill: 'var(--color-poc)' },
  { phase: 'mvp', value: 35, fill: 'var(--color-mvp)' },
  { phase: 'production', value: 50, fill: 'var(--color-production)' },
];

const deliveryChartConfig = {
  poc: { label: 'POC', color: 'hsl(var(--chart-1))' },
  mvp: { label: 'MVP', color: 'hsl(var(--chart-2))' },
  production: { label: 'Production', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

const freelanceEnterpriseData = [
  { type: 'freelance', value: 30, fill: 'var(--color-freelance)' },
  { type: 'enterprise', value: 70, fill: 'var(--color-enterprise)' },
];

const freelanceChartConfig = {
  freelance: { label: 'Freelance', color: 'hsl(var(--chart-4))' },
  enterprise: { label: 'Enterprise', color: 'hsl(var(--chart-5))' },
} satisfies ChartConfig;

export function KovonDeliveryCharts() {
  return (
    <section className="space-y-6 rounded-xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold text-foreground">
        Delivery &amp; impact
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col rounded-xl border border-border shadow-sm">
          <CardHeader className="items-center pb-0 pt-5">
            <CardTitle className="text-base font-semibold">Delivery phases</CardTitle>
            <p className="text-center text-xs text-muted-foreground">
              POC / MVP / Production
            </p>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={deliveryChartConfig}
              className="mx-auto aspect-square max-h-[200px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={deliveryPieData}
                  dataKey="value"
                  nameKey="phase"
                  cx="50%"
                  cy="50%"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col rounded-xl border border-border shadow-sm">
          <CardHeader className="items-center pb-0 pt-5">
            <CardTitle className="text-base font-semibold">Freelance vs Enterprise</CardTitle>
            <p className="text-center text-xs text-muted-foreground">
              Engagement mix
            </p>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={freelanceChartConfig}
              className="mx-auto aspect-square max-h-[200px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={freelanceEnterpriseData}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:col-span-2 lg:col-span-1">
          <KovonUsersRadial />
        </div>
      </div>
    </section>
  );
}
