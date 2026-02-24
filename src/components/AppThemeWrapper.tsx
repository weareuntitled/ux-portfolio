'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MouseGlow } from '@/components/MouseGlow';

const ADMIN_PATH = '/admin';
const FFP_PROTOTYPE_PATH = '/prototypes/ffp';

/**
 * Wraps portfolio pages in a theme shell.
 * Admin (/admin) is not wrapped so Payload CSS stays untouched.
 * FFP prototype uses light mode. Rest is dark.
 */
export function AppThemeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith(ADMIN_PATH);
  const isFfpPrototype = pathname?.startsWith(FFP_PROTOTYPE_PATH);

  useEffect(() => {
    if (!isAdmin) return;
    document.body.classList.add('payload-admin-page');
    return () => document.body.classList.remove('payload-admin-page');
  }, [isAdmin]);

  if (isAdmin) return <>{children}</>;

  return (
    <div className={isFfpPrototype ? 'portfolio-shell light' : 'portfolio-shell dark'}>
      <MouseGlow />
      {children}
    </div>
  );
}

export default AppThemeWrapper;