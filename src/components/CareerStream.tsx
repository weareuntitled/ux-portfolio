'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

// Data Refined to match your specific narrative
const streamData = [
  { year: '2014', label: 'Bachelor Start', academic: 60, visual: 20, product: 0, tech: 0 },
  { year: '2016', label: 'Internships', academic: 50, visual: 40, product: 5, tech: 0 },
  { year: '2019', label: 'Graduation', academic: 40, visual: 50, product: 10, tech: 5 },
  { year: '2020', label: 'Freelance & Research', academic: 30, visual: 70, product: 15, tech: 10 },
  { year: '2021', label: 'Lead & Co-Founder', academic: 20, visual: 80, product: 30, tech: 15 },
  { year: '2022', label: 'Master & 8020', academic: 40, visual: 50, product: 60, tech: 20 },
  { year: '2023', label: 'Enterprise & Systems', academic: 20, visual: 30, product: 80, tech: 30 },
  { year: '2024', label: 'AI & Automation', academic: 10, visual: 20, product: 70, tech: 60 },
  { year: '2025', label: 'Full Convergence', academic: 5, visual: 15, product: 60, tech: 80 },
];

// Custom Colors aligned with Shadcn CSS Variables
const colors = {
  tech: '#f97316', // Orange-500 (Focus/Energy)
  product: '#10b981', // Emerald-500 (Growth/Stability)
  visual: '#8b5cf6', // Violet-500 (Creativity)
  academic: '#64748b', // Slate-500 (Foundation/Bedrock)
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length && label) {
    const currentData = streamData.find((d) => d.year === label);
    return (
      <div className="min-w-[200px] rounded-lg border border-zinc-800 bg-zinc-950/80 p-3 shadow-xl backdrop-blur-md">
        <div className="mb-2 flex items-baseline justify-between border-b border-zinc-800 pb-2">
          <span className="text-sm font-semibold text-zinc-100">{label}</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500">
            {currentData?.label}
          </span>
        </div>
        <div className="space-y-1.5">
          {payload
            .slice()
            .reverse()
            .map((entry, index) => (
              <div
                key={index}
                className="group flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-1.5 w-1.5 rounded-full ring-1 ring-inset ring-white/10"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="capitalize text-zinc-400 transition-colors group-hover:text-zinc-200">
                    {entry.name}
                  </span>
                </div>
                <span className="font-mono tabular-nums text-zinc-500">
                  {entry.value}%
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  }
  return null;
};

export function CareerStream() {
  return (
    <div className="flex h-full w-full flex-col rounded-xl border border-zinc-800 bg-zinc-950 p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">Career Volume</h3>
          <p className="text-sm text-zinc-500">
            Relative focus and skill application over time.
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-4">
          {[
            { label: 'AI & Tech', color: colors.tech },
            { label: 'Product', color: colors.product },
            { label: 'Visual', color: colors.visual },
            { label: 'Academic', color: colors.academic },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-zinc-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="min-h-[300px] w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={streamData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            stackOffset="silhouette"
          >
            <defs>
              <linearGradient id="fillTech" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.tech} stopOpacity={0.5} />
                <stop offset="95%" stopColor={colors.tech} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillProduct" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colors.product}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={colors.product}
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="fillVisual" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colors.visual}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={colors.visual}
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="fillAcademic" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colors.academic}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={colors.academic}
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#27272a"
              strokeDasharray="3 3"
              vertical={true}
              horizontal={false}
            />

            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#71717a',
                fontSize: 11,
                fontFamily: 'sans-serif',
              }}
              dy={10}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: '#52525b',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
            />

            <ReferenceLine
              x="2025"
              stroke="#3f3f46"
              strokeDasharray="3 3"
            />

            <Area
              type="monotone"
              dataKey="academic"
              name="Academic Base"
              stackId="1"
              stroke={colors.academic}
              fill="url(#fillAcademic)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="visual"
              name="Visual Craft"
              stackId="1"
              stroke={colors.visual}
              fill="url(#fillVisual)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="product"
              name="Product Strategy"
              stackId="1"
              stroke={colors.product}
              fill="url(#fillProduct)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="tech"
              name="AI & Automation"
              stackId="1"
              stroke={colors.tech}
              fill="url(#fillTech)"
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
