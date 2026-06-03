/**
 * Barrel — src/content/portfolio.ts
 * Phase 3 refactoring: 779 → 81 lines
 * Exports: getProjectBySlug, getAllProjects, getAdjacentProjects, getCaseStudySections,
 *   getPortfolioKit, getKovonConfig, getTechnicalSpecs, getBentoCards,
 *   getKovonFeaturedCaseConfig, portfolio, getProjectCoverImage
 * #schema:
 * {
 *   type: "barrel",
 *   module: "portfolio.ts"
 * }
 */
import type {
  PortfolioSource,
  PortfolioProject,
  CaseStudySections,
  PortfolioKitData,
  BentoCardItem,
  TechnicalSpecItem,
  KovonConfig,
} from './portfolio.types';
export type { PortfolioProject } from './portfolio.types';
export { getProjectCoverImage } from './portfolio-utils';

import { portfolioEnterprise } from './portfolio-enterprise';
import { portfolioCreative } from './portfolio-creative';

import type { Project } from './portfolio.types';
import projectsCopyRaw from './projects-copy.json';

type ProjectsCopyMap = Record<string, Partial<Project>>;
const projectsCopy: ProjectsCopyMap = projectsCopyRaw as unknown as ProjectsCopyMap;

const portfolio: PortfolioSource = {
  ...portfolioEnterprise,
  ...portfolioCreative,
};

for (const [slug, copy] of Object.entries(projectsCopy)) {
  if (portfolio[slug]) {
    Object.assign(portfolio[slug], copy);
  }
}

export { portfolio };

type PortfolioIndex = Record<string, PortfolioProject>;
const portfolioIndex: PortfolioIndex = portfolio as unknown as PortfolioIndex;

/**
 * Lookup a single project by slug.
 * #schema:
 * {
 *   type: "query",
 *   args: "slug: string",
 *   returns: "PortfolioProject | null",
 *   module: "portfolio.ts"
 * }
 */
export function getProjectBySlug(slug: string): PortfolioProject | null {
  return portfolioIndex[slug] ?? null;
}

/**
 * Get all projects as an array.
 * #schema:
 * {
 *   type: "query",
 *   returns: "PortfolioProject[]",
 *   module: "portfolio.ts"
 * }
 */
export function getAllProjects(): PortfolioProject[] {
  return Object.values(portfolioIndex);
}

/**
 * Get previous + next project for navigation.
 * #schema:
 * {
 *   type: "query",
 *   args: "currentSlug: string",
 *   returns: "{ prev: PortfolioProject | null, next: PortfolioProject | null }",
 *   module: "portfolio.ts"
 * }
 */
export function getAdjacentProjects(currentSlug: string): {
  prev: PortfolioProject | null;
  next: PortfolioProject | null;
} {
  const slugs = Object.keys(portfolioIndex);
  const idx = slugs.indexOf(currentSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? portfolioIndex[slugs[idx - 1]] : null,
    next: idx < slugs.length - 1 ? portfolioIndex[slugs[idx + 1]] : null,
  };
}

/**
 * Get case study sections for a project.
 * #schema:
 * {
 *   type: "query",
 *   args: "slug: string",
 *   returns: "CaseStudySections | null",
 *   module: "portfolio.ts"
 * }
 */
export function getCaseStudySections(slug: string): CaseStudySections | null {
  return portfolioIndex[slug]?.caseStudy ?? null;
}

/**
 * Get portfolioKit data for a project.
 * #schema:
 * {
 *   type: "query",
 *   args: "slug: string",
 *   returns: "PortfolioKitData | null",
 *   module: "portfolio.ts"
 * }
 */
export function getPortfolioKit(slug: string): PortfolioKitData | null {
  return portfolioIndex[slug]?.portfolioKit ?? null;
}

/**
 * Get KovonConfig singleton (kovon project only).
 * #schema:
 * {
 *   type: "query",
 *   returns: "KovonConfig | null",
 *   module: "portfolio.ts"
 * }
 */
export function getKovonConfig(): KovonConfig | null {
  return portfolioIndex['kovon']?.kovon ?? null;
}

/**
 * Get technical specs array from portfolioKit.
 * #schema:
 * {
 *   type: "query",
 *   args: "slug: string",
 *   returns: "TechnicalSpecItem[]",
 *   module: "portfolio.ts"
 * }
 */
export function getTechnicalSpecs(slug: string): TechnicalSpecItem[] {
  return portfolioIndex[slug]?.portfolioKit?.technicalSpecs ?? [];
}

/**
 * Get bentoCards array from portfolioKit.
 * #schema:
 * {
 *   type: "query",
 *   args: "slug: string",
 *   returns: "BentoCardItem[]",
 *   module: "portfolio.ts"
 * }
 */
export function getBentoCards(slug: string): BentoCardItem[] {
  return getPortfolioKit(slug)?.bentoCards ?? [];
}

/**
 * Get featuredCase config from KovonConfig.
 * #schema:
 * {
 *   type: "query",
 *   returns: "FeaturedCase | null",
 *   module: "portfolio.ts"
 * }
 */
export function getKovonFeaturedCaseConfig() {
  return getKovonConfig()?.featuredCase ?? null;
}