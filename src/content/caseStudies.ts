/**
 * @deprecated Use @/content/portfolio and @/content/portfolio.types instead.
 * Re-exports for backward compatibility during transition.
 */

import {
  getCaseStudySections,
  getPortfolioKit,
  getBentoCards,
  getTechnicalSpecs,
} from '@/content/portfolio';
import type {
  CaseStudySections,
  BentoCardItem,
  BentoCardVisual,
  TechnicalSpecItem,
  ProcessStepItem,
  FeatureItemData,
  PortfolioKitData,
  BeforeAfterMedia,
} from '@/content/portfolio.types';

export type {
  CaseStudySections,
  BentoCardItem,
  BentoCardVisual,
  TechnicalSpecItem,
  ProcessStepItem,
  FeatureItemData,
  PortfolioKitData,
  BeforeAfterMedia,
};

export { getCaseStudySections, getPortfolioKit, getBentoCards, getTechnicalSpecs };
