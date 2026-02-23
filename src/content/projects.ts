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
  const {
    caseStudy: _caseStudy,
    portfolioKit: _portfolioKit,
    kovon: _kovon,
    impactCards: _impactCards,
    ...rest
  } = p;
  void _caseStudy;
  void _portfolioKit;
  void _kovon;
  void _impactCards;
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
