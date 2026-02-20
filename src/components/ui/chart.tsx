'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/lib/utils';

const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }
  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex min-w-0 min-h-[120px] aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {mounted ? (
          <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        ) : (
          <div className="min-h-[120px] w-full" aria-hidden />
        )}
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'Chart';

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join('\n')}
}
`,
          )
          .join('\n'),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartLegend = RechartsPrimitive.Legend;

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }
  const payloadPayload =
    'payload' in payload &&
    typeof payload.payload === 'object' &&
    payload.payload !== null
      ? payload.payload
      : undefined;
  let configLabelKey: string = key;
  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }
  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

type LegendPayloadItem = { value?: string; dataKey?: string; color?: string };

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    payload?: LegendPayloadItem[];
    verticalAlign?: 'top' | 'bottom';
    hideIcon?: boolean;
    nameKey?: string;
  }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey },
    ref,
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-4',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className,
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={String(item.value)}
              className={cn(
                'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground',
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  },
);
ChartLegendContent.displayName = 'ChartLegend';

type TooltipPayloadItem = {
  name?: string;
  value?: number | string;
  dataKey?: string;
  color?: string;
  payload?: Record<string, unknown>;
};

type ChartTooltipContentProps = React.ComponentProps<'div'> & {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  hideLabel?: boolean;
  indicator?: 'line' | 'dot';
  nameKey?: string;
  axisId?: string;
  contentStyle?: React.CSSProperties;
  cursor?: boolean | string | object;
  allowEscapeViewBox?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  filterNull?: boolean;
  viewBox?: object;
  coordinate?: object;
  formatter?: (...args: unknown[]) => unknown;
  itemStyle?: object;
  itemSorter?: (...args: unknown[]) => unknown;
  separator?: React.ReactNode;
  wrapperStyle?: object;
  isAnimationActive?: boolean;
  includeHidden?: boolean;
  labelStyle?: object;
  reverseDirection?: boolean;
  activeIndex?: number;
  accessibilityLayer?: boolean;
};

/** Safe prop keys to pass to ChartTooltipContent when using content as a function (avoids Recharts cloning and injecting labelStyle, itemStyle, etc. onto DOM). */
const SAFE_TOOLTIP_CONTENT_PROPS = [
  'active',
  'payload',
  'label',
  'hideLabel',
  'indicator',
  'nameKey',
  'className',
  'id',
  'style',
] as const;

export function pickSafeTooltipContentProps(
  props: Record<string, unknown>
): Pick<
  ChartTooltipContentProps,
  (typeof SAFE_TOOLTIP_CONTENT_PROPS)[number]
> {
  const out: Record<string, unknown> = {};
  SAFE_TOOLTIP_CONTENT_PROPS.forEach((key) => {
    if (props[key] !== undefined) out[key] = props[key];
  });
  return out as Pick<
    ChartTooltipContentProps,
    (typeof SAFE_TOOLTIP_CONTENT_PROPS)[number]
  >;
}

/** Renders a div with only safe props. Explicitly destructure so no Recharts props (wrapperStyle, etc.) can reach the DOM. */
const SafeTooltipDiv = React.forwardRef<
  HTMLDivElement,
  Record<string, unknown> & { children?: React.ReactNode }
>((props, ref) => {
  const { id, style, className, children, ..._ignored } = props;
  return (
    <div
      ref={ref}
      id={typeof id === 'string' ? id : undefined}
      style={typeof style === 'object' && style != null ? (style as React.CSSProperties) : undefined}
      className={typeof className === 'string' ? className : undefined}
    >
      {children as React.ReactNode}
    </div>
  );
});
SafeTooltipDiv.displayName = 'SafeTooltipDiv';

const ChartTooltipContentInner = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      label,
      hideLabel = false,
      indicator = 'dot',
      nameKey,
      className,
      id,
      style,
      axisId: _axisId,
      contentStyle: _contentStyle,
      cursor: _cursor,
      allowEscapeViewBox: _allowEscapeViewBox,
      animationDuration: _animationDuration,
      animationEasing: _animationEasing,
      filterNull: _filterNull,
      viewBox: _viewBox,
      coordinate: _coordinate,
      formatter: _formatter,
      itemStyle: _itemStyle,
      itemSorter: _itemSorter,
      separator: _separator,
      wrapperStyle: _wrapperStyle,
      isAnimationActive: _isAnimationActive,
      includeHidden: _includeHidden,
      labelStyle: _labelStyle,
      reverseDirection: _reverseDirection,
      activeIndex: _activeIndex,
      accessibilityLayer: _accessibilityLayer,
      ..._restRechartsProps
    },
    ref,
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) {
      return null;
    }

    return (
      <SafeTooltipDiv
        ref={ref}
        id={id}
        style={style}
        className={cn(
          'rounded-xl border border-border bg-popover/95 px-3 py-2.5 text-sm shadow-lg backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200',
          className,
        )}
      >
        {!hideLabel && label != null && (
          <div className="mb-1.5 font-medium text-foreground">{label}</div>
        )}
        <div className="flex flex-col gap-1.5">
          {payload.map((item, index) => {
            const key = nameKey || item.dataKey || item.name || `payload-${index}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const displayLabel = itemConfig?.label ?? item.name ?? key;
            const displayValue = item.value;

            return (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground"
              >
                {indicator === 'line' ? (
                  <div
                    className="h-0.5 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                ) : (
                  <div
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                <span className="flex-1 capitalize text-foreground">
                  {displayLabel}
                </span>
                {displayValue != null && (
                  <span className="font-medium tabular-nums text-foreground">
                    {typeof displayValue === 'number'
                      ? displayValue.toLocaleString()
                      : String(displayValue)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </SafeTooltipDiv>
    );
  },
);
ChartTooltipContentInner.displayName = 'ChartTooltipContentInner';

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (props, ref) => {
    const { active, payload } = props;
    if (!active || !payload?.length) {
      return null;
    }
    return <ChartTooltipContentInner ref={ref} {...pickSafeTooltipContentProps(props)} />;
  },
);
ChartTooltipContent.displayName = 'ChartTooltipContent';

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
