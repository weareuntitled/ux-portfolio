import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type Props = {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'muted';
  className?: string;
};

export function ModularImpactHighlight({
  value,
  label,
  description,
  icon: Icon,
  variant = 'primary',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-start md:items-center gap-6 rounded-2xl border p-8 shadow-sm',
        variant === 'primary' 
          ? 'border-primary/20 bg-primary/5' 
          : 'border-border bg-card/40',
        className
      )}
    >
      <div className="flex shrink-0 items-center justify-center rounded-2xl bg-background p-6 shadow-sm ring-1 ring-border/50">
        <span className="text-4xl md:text-5xl font-mono font-bold tracking-tighter text-primary">
          {value}
        </span>
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {Icon && <Icon className="h-4 w-4" aria-hidden />}
          {label}
        </div>
        {description && (
          <p className="text-base text-foreground/90 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}