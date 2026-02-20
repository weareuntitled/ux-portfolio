'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { MouseGlow } from '@/components/MouseGlow';

const ADMIN_PATH = '/admin';
const FFP_PROTOTYPE_PATH = '/prototypes/ffp';

/**
 * Wraps portfolio pages in a theme shell (dark + mesh background).
 * Admin (/admin) is not wrapped so Payload's own design and CSS apply correctly.
 * FFP prototype uses light mode; rest of portfolio uses dark.
 * Adds body.payload-admin-page on admin routes for CSS reset.
 */
export function AppThemeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith(ADMIN_PATH);
  const isFfpPrototype = pathname?.startsWith(FFP_PROTOTYPE_PATH);

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add('payload-admin-page');
      return () => document.body.classList.remove('payload-admin-page');
    }
  }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className={isFfpPrototype ? 'portfolio-shell light' : 'portfolio-shell dark'}>
      <MouseGlow />
      {children}
    </div>
  );
}
