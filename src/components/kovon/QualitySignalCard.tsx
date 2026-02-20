'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Level = 'low' | 'med' | 'high';

export type QualitySignalCardProps = {
  icon: LucideIcon;
  title: string;
  summary: string;
  chips?: string[];
  scaleLabel: string;
  level?: Level;
  highMeans: string[];
};

export function QualitySignalCard({
  icon: Icon,
  title,
  summary,
  chips = [],
  scaleLabel,
  level = 'high',
  highMeans,
}: QualitySignalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
    >
      <Card className="group rounded-2xl border-border/70 bg-card/70 backdrop-blur">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-muted/40 text-foreground transition-colors group-hover:bg-muted/60">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-tight text-foreground">
                  {title}
                </div>
                <div className="text-xs text-muted-foreground">{summary}</div>
              </div>
            </div>

            <TooltipProvider>
              <Tooltip delayDuration={120}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background/50 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="What high means"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[320px] rounded-xl p-3">
                  <div className="text-xs font-semibold">High means</div>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                    {highMeans.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <Badge
                  key={c}
                  variant="secondary"
                  className="rounded-full px-2 py-0.5 text-[11px] font-normal"
                >
                  {c}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-medium text-muted-foreground">
              {scaleLabel}
            </div>
            <div className="text-[10px] text-muted-foreground">
              Low, Med, High
            </div>
          </div>

          <ToggleGroup
            type="single"
            value={level}
            className="grid grid-cols-3 rounded-xl border bg-background/40 p-1"
            onValueChange={() => {}}
          >
            <ToggleGroupItem
              value="low"
              className={cn(
                'h-9 rounded-lg text-xs',
                'data-[state=on]:bg-muted data-[state=on]:text-foreground',
                'data-[state=off]:text-muted-foreground'
              )}
              aria-label="Low"
            >
              Low
            </ToggleGroupItem>
            <ToggleGroupItem
              value="med"
              className={cn(
                'h-9 rounded-lg text-xs',
                'data-[state=on]:bg-muted data-[state=on]:text-foreground',
                'data-[state=off]:text-muted-foreground'
              )}
              aria-label="Med"
            >
              Med
            </ToggleGroupItem>
            <ToggleGroupItem
              value="high"
              className={cn(
                'h-9 rounded-lg text-xs',
                'data-[state=on]:bg-muted data-[state=on]:text-foreground',
                'data-[state=off]:text-muted-foreground'
              )}
              aria-label="High"
            >
              High
            </ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>
    </motion.div>
  );
}
