/**
 * Gallery paths in gallery-map.json are like `/projects/foo.png` (under public/).
 * In production those files are often hosted separately — set NEXT_PUBLIC_PROJECT_ASSET_BASE
 * to your static origin (no trailing slash), e.g. https://assets.untitled-ux.de
 */
export function resolveProjectAssetUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_PROJECT_ASSET_BASE?.trim();
  if (!base) return path;
  const normalizedBase = base.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function isRemoteImageSrc(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

/** Remote URLs and GIFs skip the image optimizer (same rules as project galleries). */
export function shouldUnoptimizeImage(src: string): boolean {
  return isRemoteImageSrc(src) || src.toLowerCase().endsWith('.gif');
}
