import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MetricCardProps = {
  title: string;
  value: string;
  sub: string;
  trend: string;
  className?: string;
};

export function MetricCard({ title, value, sub, trend, className }: MetricCardProps) {
  return (
    <Card className={cn('border-border bg-card', className)}>
      <CardHeader className="p-5 pb-1">
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
        <p className="mt-2 text-xs font-medium text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  );
}
