import type { PortfolioProject } from '@/content/portfolio';

export type ProjectCategory =
  | 'UX/UI Design'
  | 'Product Design'
  | 'Strategy & Process'
  | 'Visual & Branding'
  | 'Web & CMS'
  | 'Motion & 3D'
  | 'Archive';

export type CmsProject = {
  slug: string;
  title: string;
  moodImageUrl?: string | null;
  category?: ProjectCategory | null;
};

/**
 * Normalized project shape used across UI components.
 * Backed by local portfolio content in this repository.
 */
export type ResolvedProject = PortfolioProject;
