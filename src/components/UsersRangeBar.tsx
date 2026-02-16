'use client';

import { usersRange } from '@/content/home';

export function UsersRangeBar() {
  const pct = (usersRange.max - usersRange.min) / usersRange.trackMax;
  const start = usersRange.min / usersRange.trackMax;
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">Internal user scale (500–1000)</p>
      <div className="relative h-6 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all"
          style={{ left: `${start * 100}%`, width: `${pct * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>0</span>
        <span>500</span>
        <span>1000</span>
      </div>
    </div>
  );
}
