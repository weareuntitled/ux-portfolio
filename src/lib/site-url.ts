/**
 * Canonical site origin for metadata, sitemap, and robots (no trailing slash).
 * Set NEXT_PUBLIC_SITE_URL in production, e.g. https://portfolio.untitled-ux.de
 *
 * Invalid env values never throw — we fall back so the app can still render.
 */
function safeOriginFromString(raw: string | undefined | null): string | null {
  if (!raw?.trim()) return null;
  let s = raw.trim().replace(/\/$/, '');
  if (!/^https?:\/\//i.test(s)) {
    s = `https://${s}`;
  }
  try {
    const u = new URL(s);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.origin;
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  const fromEnv = safeOriginFromString(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromEnv) return fromEnv;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const v = safeOriginFromString(
      vercel.startsWith('http') ? vercel : `https://${vercel.replace(/^https?:\/\//, '')}`,
    );
    if (v) return v;
  }

  if (process.env.NODE_ENV === 'development') {
    const p = process.env.PORT?.trim() || '3000';
    return `http://localhost:${p}`;
  }

  return 'https://untitled-ux.de';
}

/** Safe for `metadata.metadataBase` — never throws. */
export function getMetadataBase(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL('https://untitled-ux.de');
  }
}
