import type { ResolvedProject } from './types';
import { getProjectDefaults, getProjects, resolveProject } from './payload';

export type NavProject = { slug: string; title: string };

type DraftModeFlag = { draftMode: boolean };

/**
 * Returns enterprise projects (full) from CMS for CV page content and similar.
 */
export async function getEnterpriseProjectsResolved({
  draftMode,
}: DraftModeFlag): Promise<ResolvedProject[]> {
  const [defaults, projects] = await Promise.all([
    getProjectDefaults({ draftMode }),
    getProjects({ draftMode }),
  ]);

  const resolved = projects.map((p) => resolveProject(defaults, p));
  return resolved.filter((p) => p.category === 'Enterprise');
}

/**
 * Returns enterprise projects for sidebar/nav, sourced from CMS.
 * Use this so navigation links match the /projects list and detail pages.
 */
export async function getEnterpriseProjectsForNav({
  draftMode,
}: DraftModeFlag): Promise<NavProject[]> {
  const enterprise = await getEnterpriseProjectsResolved({ draftMode });
  return enterprise.map((p) => ({ slug: p.slug, title: p.title }));
}
