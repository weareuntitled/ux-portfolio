import { unstable_cache } from 'next/cache';
import type { ResolvedProject } from './types';
import { getProjectDefaults, getProjects, resolveProject } from './payload';

const ALL_PROJECTS_CACHE_TAG = 'all-projects-resolved';
const ALL_PROJECTS_REVALIDATE = 300;

export type NavProject = { slug: string; title: string };

/** Nav item with optional thumbnail and category for sidebar (Enterprise / Side). */
export type NavProjectWithImage = {
  slug: string;
  title: string;
  moodImageUrl?: string | null;
  category: 'Enterprise' | 'Side';
};

type DraftModeFlag = { draftMode: boolean };

const CACHE_TAG = 'enterprise-projects';
const CACHE_REVALIDATE = 300;

/**
 * Returns enterprise projects (full) from CMS for CV page content and similar.
 * Cached when not in draft mode to speed up page loads.
 */
export async function getEnterpriseProjectsResolved({
  draftMode,
}: DraftModeFlag): Promise<ResolvedProject[]> {
  if (draftMode) {
    return getEnterpriseProjectsResolvedUncached(true);
  }
  return unstable_cache(
    () => getEnterpriseProjectsResolvedUncached(false),
    [CACHE_TAG],
    { revalidate: CACHE_REVALIDATE, tags: [CACHE_TAG] }
  )();
}

async function getEnterpriseProjectsResolvedUncached(draftMode: boolean): Promise<ResolvedProject[]> {
  const [defaults, projects] = await Promise.all([
    getProjectDefaults({ draftMode }),
    getProjects({ draftMode }),
  ]);
  const resolved = projects.map((p) => resolveProject(defaults, p));
  return resolved.filter((p) => p.category === 'Enterprise');
}

/**
 * Returns all projects (resolved) from CMS for the projects list page.
 * Cached when not in draft mode.
 */
export async function getProjectsResolved({
  draftMode,
}: DraftModeFlag): Promise<ResolvedProject[]> {
  if (draftMode) {
    return getProjectsResolvedUncached(true);
  }
  return unstable_cache(
    () => getProjectsResolvedUncached(false),
    [ALL_PROJECTS_CACHE_TAG],
    { revalidate: ALL_PROJECTS_REVALIDATE, tags: [ALL_PROJECTS_CACHE_TAG] }
  )();
}

async function getProjectsResolvedUncached(draftMode: boolean): Promise<ResolvedProject[]> {
  const [defaults, projects] = await Promise.all([
    getProjectDefaults({ draftMode }),
    getProjects({ draftMode }),
  ]);
  return projects.map((p) => resolveProject(defaults, p));
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

/**
 * Returns all projects for sidebar/nav (Enterprise + Side), with title, optional thumbnail, and category.
 * Use this so sidebar shows same names and images as project cards, and includes indie/Side projects.
 */
export async function getProjectsForNav({
  draftMode,
}: DraftModeFlag): Promise<NavProjectWithImage[]> {
  const all = await getProjectsResolved({ draftMode });
  return all.map((p) => ({
    slug: p.slug,
    title: p.title,
    moodImageUrl: p.moodImageUrl ?? null,
    category: p.category,
  }));
}
