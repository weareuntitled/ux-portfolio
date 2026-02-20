'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const HERO_IMAGE = '/profile.jpg';

/**
 * Injects a preload link for the hero image on the home route only,
 * so the browser fetches it early and LCP improves.
 */
export function HeroImagePreload() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = HERO_IMAGE;
    document.head.appendChild(link);
    return () => link.remove();
  }, [pathname]);

  return null;
}
