/**
 * @deprecated Use @/content/portfolio and @/content/portfolio.types instead.
 * Re-exports for backward compatibility during transition.
 */

import { getAllProjects, getProjectBySlug as getPortfolioBySlug } from '@/content/portfolio';
import type {
  Project,
  ProjectLink,
  ProjectPrototype,
  ProjectImpactItem,
  ProjectMetaCard,
} from '@/content/portfolio.types';

export type {
  Project,
  ProjectLink,
  ProjectPrototype,
  ProjectImpactItem,
  ProjectMetaCard,
};

/** Core project only (strip case study, portfolio kit, kovon, impactCards for legacy callers). */
function toProject(p: ReturnType<typeof getAllProjects>[number]): Project {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { caseStudy: _cs, portfolioKit: _pk, kovon: _kv, impactCards: _ic, ...rest } = p;
  return rest;
}

export const projects: Project[] = getAllProjects().map(toProject);

export const findProjectBySlug = (slug: string): Project | undefined => {
  const p = getPortfolioBySlug(slug);
  return p ? toProject(p) : undefined;
};

export const enterpriseProjectSlugs = ['kovon', 'emission-compliance', 'ffp-dashboard', 'automation'] as const;

export function getEnterpriseProjects(): Project[] {
  return getAllProjects()
    .filter((p) => p.category === 'Enterprise')
    .map(toProject);
}
