import config from '@payload-config';
import { getPayload } from 'payload';
import type { ProjectCategory } from './types';
import { getAllProjects } from '@/content/portfolio';

export type NavProjectWithImage = {
  slug: string;
  title: string;
  moodImageUrl: string | null;
  category: ProjectCategory;
};

export function getNavProjects(): NavProjectWithImage[] {
  const all = getAllProjects();

  return all.map((p) => ({
    slug: p.slug,
    title: p.title,
    moodImageUrl: p.moodImageUrl ?? null,
    category: p.category as ProjectCategory,
  }));
}

export async function getPayloadClient() {
  return getPayload({ config });
}
