import { draftMode } from 'next/headers';
import { DashboardCV } from '@/components/DashboardCV';
import { NextGenStartPage } from '@/components/landing/NextGenStartPage';
import { getProjectsForNav } from '@/lib/cms/projects-nav';

export const revalidate = 300;

export default async function HomePage() {
  const draft = await draftMode();
  const isDraft = draft.isEnabled;
  const navProjects = await getProjectsForNav({ draftMode: isDraft });

  return (
    <DashboardCV navProjects={navProjects} variant="landing">
      <NextGenStartPage />
    </DashboardCV>
  );
}
