'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const ADMIN_PATH = '/admin';

/**
 * Wraps portfolio pages in a light-only shell.
 * - Admin (/admin): passthrough — no wrapper, Payload CSS stays untouched.
 * - All other pages: always light mode.
 *
 * Dark mode has been removed; the site is light-only.
 */
export function AppThemeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith(ADMIN_PATH);

  React.useEffect(() => {
    if (!isAdmin) return;
    document.body.classList.add('payload-admin-page');
    return () => document.body.classList.remove('payload-admin-page');
  }, [isAdmin]);

  if (isAdmin) return <>{children}</>;

  return <div className="portfolio-shell light">{children}</div>;
}

export default AppThemeWrapper;
