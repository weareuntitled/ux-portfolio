import type { Metadata } from 'next';
import Link from 'next/link';
import { draftMode } from 'next/headers';

import { DashboardCV } from '@/components/DashboardCV';
import { getProjectsForNav } from '@/lib/cms/projects-nav';

export const metadata: Metadata = {
  title: 'Prototypes | Daniel Peters',
  description: 'Interactive prototype pages for selected projects.',
};

export const revalidate = 300;

const prototypes = [
  { href: '/prototypes/ffp/fingerprints', label: 'FFP. Failure Fingerprints Dashboard' },
  { href: '/prototypes/ffp-review', label: 'FFP. Comparison' },
  { href: '/prototypes/kovon', label: 'KoVoN' },
];

export default async function PrototypesIndexPage() {
  const draft = await draftMode();
  const navProjects = await getProjectsForNav({ draftMode: draft.isEnabled });

  return (
    <DashboardCV
      navProjects={navProjects}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'Prototypes' },
      ]}
      pageTitle="Prototypes"
    >
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Prototype pages</h1>
        <p className="text-sm text-muted-foreground">
          Reusable enterprise shell examples for KoVoN and FFP.
        </p>

        <div className="grid gap-3">
          {prototypes.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-lg border border-border bg-card px-4 py-3 hover:bg-muted/40"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>
    </DashboardCV>
  );
}