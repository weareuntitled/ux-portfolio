import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { DashboardCV } from '@/components/DashboardCV';
import { getProjectsForNav } from '@/lib/cms/projects-nav';

export const metadata: Metadata = {
  title: 'About | Daniel Peters',
  description: 'About Daniel Peters, Product Designer (UX/UI) focusing on enterprise workflows.',
};

export const revalidate = 300;

export default async function AboutPage() {
  const draft = await draftMode();
  const navProjects = await getProjectsForNav({ draftMode: draft.isEnabled });

  return (
    <DashboardCV
      navProjects={navProjects}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'About' },
      ]}
      pageTitle="About"
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">About</h1>
        <p className="text-muted-foreground">
          I design and ship product experiences at the intersection of UX, frontend engineering, and data heavy workflows.
        </p>
        <p className="text-muted-foreground">
          My enterprise work focuses on operational visibility, while side projects are engineering led experiments that harden
          product instincts through real users.
        </p>
      </div>
    </DashboardCV>
  );
}
