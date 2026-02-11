import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

type SideNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

type EnterpriseSideNavProps = {
  items: SideNavItem[];
};

export function EnterpriseSideNav({ items }: EnterpriseSideNavProps) {
  return (
    <aside className="flex w-16 flex-col items-center gap-2 border-r bg-white py-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`rounded-lg p-2 ${item.active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
            aria-label={item.label}
            title={item.label}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </Link>
        );
      })}
    </aside>
  );
}
