import type { ProjectCategory } from './types';
import { getAllProjects, getProjectCoverImage } from '@/content/portfolio';

export type NavProjectWithImage = {
  slug: string;
  title: string;
  moodImageUrl: string | null;
  category: ProjectCategory;
  /** Where the sidebar row should link. Defaults to /projects/<slug> when omitted. */
  href?: string;
};

/**
 * Backwards compatible helper for existing pages.
 * Your home page calls:
 *   await getProjectsForNav({ draftMode })
 *
 * We don’t actually need draftMode for the local content source,
 * but we keep the signature to avoid breaking imports.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getProjectsForNav(_opts?: { draftMode?: boolean }): Promise<NavProjectWithImage[]> {
  const all = getAllProjects();

  return all.map((p) => ({
    slug: p.slug,
    title: p.title,
    moodImageUrl: getProjectCoverImage(p),
    category: p.category as ProjectCategory,
  }));
}

/** Optional sync alias if you want it elsewhere */
export function getNavProjects(): NavProjectWithImage[] {
  const all = getAllProjects();

  return all.map((p) => ({
    slug: p.slug,
    title: p.title,
    moodImageUrl: getProjectCoverImage(p),
    category: p.category as ProjectCategory,
  }));
}