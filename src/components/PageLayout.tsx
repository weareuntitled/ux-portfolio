'use client';

import { Breadcrumbs, BreadcrumbItem } from '@/components/Breadcrumbs';
import { TopNav } from '@/components/landing/TopNav';

type Props = {
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
};

export function PageLayout({ breadcrumbs, children }: Props) {
  return (
    <>
      <TopNav />
      <div className="pt-[56px] md:pt-[64px] px-4 sm:px-6 lg:px-8">
        <div className="hidden md:block pt-10">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="pt-8">{children}</div>
      </div>
    </>
  );
}