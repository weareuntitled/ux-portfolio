import type { Metadata } from 'next';
import Link from 'next/link';
import { draftMode } from 'next/headers';

import { DashboardCV } from '@/components/DashboardCV';
import { getProjectsForNav } from '@/lib/cms/projects-nav';

export const metadata: Metadata = {
  title: 'KoVoN Prototype | Daniel Peters',
  description: 'Prototype entry point for KoVoN and related FFP workflow pages.',
};

export const revalidate = 300;

export default async function KovonPrototypePage() {
  const draft = await draftMode();
  const navProjects = await getProjectsForNav({ draftMode: draft.isEnabled });

  return (
    <DashboardCV
      navProjects={navProjects}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'Prototypes', href: '/prototypes' },
        { label: 'KoVoN' },
      ]}
      pageTitle="KoVoN"
    >
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          This project does not have an interactive prototype in this portfolio. The FFP workflow selection dashboard prototype
          is under the Failure Fingerprint Dashboard project.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects/kovon"
            className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-muted/40"
          >
            Back to project
          </Link>

          <Link
            href="/prototypes/ffp/fingerprints"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Open FFP prototype
          </Link>
        </div>
      </div>
    </DashboardCV>
  );
}