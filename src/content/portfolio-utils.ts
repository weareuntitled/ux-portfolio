/**
 * Helper functions — src/content/portfolio-utils.ts
 * Phase 3 refactoring: extracted from portfolio.ts
 * Exports: getGallery, getPreviewImage, getProjectCoverImage
 * #schema:
 * {
 *   type: "helper",
 *   module: "portfolio-utils.ts"
 * }
 */
import { resolveProjectAssetUrl } from '@/lib/project-assets';
import galleryMapRaw from './gallery-map.json';

type GalleryMap = Record<string, string[]>;

const galleryMap: GalleryMap = galleryMapRaw as unknown as GalleryMap;

/**
 * Get all gallery image URLs for a project slug.
 * #schema:
 * {
 *   type: "helper",
 *   args: "slug: string",
 *   returns: "string[]",
 *   module: "portfolio-utils.ts"
 * }
 */
export const getGallery = (slug: string): string[] =>
  (galleryMap[slug.toLowerCase()] ?? []).map((path) => resolveProjectAssetUrl(path));

/**
 * Get the best preview image for a project (hero > gallery_01 > first).
 * #schema:
 * {
 *   type: "helper",
 *   args: "slug: string",
 *   returns: "string | null",
 *   module: "portfolio-utils.ts"
 * }
 */
export const getPreviewImage = (slug: string): string | null => {
  const images = getGallery(slug);
  return (
    images.find((img) => img.toLowerCase().includes('hero')) ??
    images.find((img) => img.toLowerCase().includes('gallery_01')) ??
    images[0] ??
    null
  );
};

/**
 * Get cover image for a project card (moodImageUrl > first gallery).
 * #schema:
 * {
 *   type: "helper",
 *   args: "project: { moodImageUrl?: string | null, galleryUrls?: string[] }",
 *   returns: "string | null",
 *   module: "portfolio-utils.ts"
 * }
 */
export function getProjectCoverImage(project: {
  moodImageUrl?: string | null;
  galleryUrls?: string[];
}): string | null {
  return project.moodImageUrl ?? project.galleryUrls?.[0] ?? null;
}