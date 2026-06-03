import { Bell, Grid3X3, Search, UserCircle2 } from 'lucide-react';

type EnterpriseTopBarProps = {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
};

export function EnterpriseTopBar({ title, subtitle, searchPlaceholder = 'Search' }: EnterpriseTopBarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-md border bg-muted px-3 py-1.5 text-sm text-muted-foreground md:flex">
          <Search className="h-4 w-4" aria-hidden="true" />
          <span>{searchPlaceholder}</span>
        </div>
        <button className="rounded-md p-2 text-muted-foreground hover:bg-muted" aria-label="Notifications">
          <Bell className="h-4 w-4" aria-hidden="true" />
        </button>
        <button className="rounded-md p-2 text-muted-foreground hover:bg-muted" aria-label="Applications">
          <Grid3X3 className="h-4 w-4" aria-hidden="true" />
        </button>
        <button className="rounded-md p-2 text-muted-foreground hover:bg-muted" aria-label="Account">
          <UserCircle2 className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
