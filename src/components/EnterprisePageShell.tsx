import type { ReactNode } from 'react';
import { EnterpriseSideNav } from './EnterpriseSideNav';
import { EnterpriseTopBar } from './EnterpriseTopBar';

type EnterprisePageShellProps = {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  navItems: Parameters<typeof EnterpriseSideNav>[0]['items'];
  children: ReactNode;
  rightSidebar?: ReactNode;
};

export function EnterprisePageShell({
  title,
  subtitle,
  searchPlaceholder,
  navItems,
  children,
  rightSidebar
}: EnterprisePageShellProps) {
  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <EnterpriseTopBar title={title} subtitle={subtitle} searchPlaceholder={searchPlaceholder} />
      <div className="flex min-h-0 flex-1">
        <EnterpriseSideNav items={navItems} />
        <main className="min-h-0 flex-1 p-4">{children}</main>
        {rightSidebar}
      </div>
    </div>
  );
}
