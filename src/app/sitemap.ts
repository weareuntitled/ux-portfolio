import type { MetadataRoute } from 'next';
import { portfolio } from '@/content/portfolio';
import { getSiteUrl } from '@/lib/site-url';

const STATIC_PATHS = [
  '/',
  '/projects',
  '/contact',
  '/cv',
  '/prototypes',
  '/prototypes/kovon',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${base}${path === '/' ? '' : path}`,
    lastModified: now,
  }));
  const projectEntries = Object.keys(portfolio).map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
  }));
  return [...staticEntries, ...projectEntries];
}
