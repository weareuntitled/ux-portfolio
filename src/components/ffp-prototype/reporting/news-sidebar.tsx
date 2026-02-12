import { Bell, AlertTriangle, ChevronDown } from "lucide-react";

interface NewsItem {
  id: string;
  date: string;
  isNew: boolean;
  ffpId: string;
  hasAlert: boolean;
}

const newsItems: NewsItem[] = [
  { id: "1", date: "09.11.21", isNew: true, ffpId: "FFP-001", hasAlert: true },
  { id: "2", date: "09.11.21", isNew: true, ffpId: "FFP-001", hasAlert: false },
  { id: "3", date: "09.11.21", isNew: true, ffpId: "FFP-001", hasAlert: false },
  { id: "4", date: "09.11.21", isNew: true, ffpId: "FFP-001", hasAlert: false },
  { id: "5", date: "09.11.21", isNew: true, ffpId: "FFP-001", hasAlert: false },
];

export function NewsSidebar() {
  return (
    <aside className="w-56 shrink-0 rounded-lg border border-border bg-background p-5">
      <h3 className="mb-4 text-base font-bold text-foreground">News</h3>
      <div className="flex flex-col gap-4">
        {newsItems.map((item) => (
          <div key={item.id} className="border-b border-border pb-3 last:border-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-foreground">{item.date}</span>
              {item.isNew && (
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-semibold text-green-600">NEW FFP</span>
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2">
              {item.hasAlert && (
                <AlertTriangle className="h-3.5 w-3.5 text-accent" />
              )}
              <Bell className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{item.ffpId}</span>
            </div>
            <button type="button" className="mt-1 text-xs font-semibold text-destructive hover:underline">
              See details
            </button>
          </div>
        ))}
        <button type="button" className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </aside>
  );
}
