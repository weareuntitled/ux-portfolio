'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggle: () => {} });

/** Access the portfolio theme + toggle from any client component. */
export const usePortfolioTheme = () => useContext(ThemeContext);

const ADMIN_PATH = '/admin';
const FFP_PROTOTYPE_PATH = '/prototypes/ffp';

/**
 * Wraps portfolio pages in a themed shell.
 * - Admin (/admin): passthrough — no wrapper, Payload CSS stays untouched.
 * - FFP prototype: always light.
 * - All other pages: user preference (default dark), persisted to localStorage.
 */
export function AppThemeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith(ADMIN_PATH);
  const isFfpPrototype = pathname?.startsWith(FFP_PROTOTYPE_PATH);

  const [theme, setTheme] = useState<Theme>('dark');

  // Hydrate from localStorage on first render (skip for FFP which is always light)
  useEffect(() => {
    if (isFfpPrototype) return;
    const saved = localStorage.getItem('portfolio-theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, [isFfpPrototype]);

  const toggle = () => {
    if (isFfpPrototype) return;
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', next);
      return next;
    });
  };

  useEffect(() => {
    if (!isAdmin) return;
    document.body.classList.add('payload-admin-page');
    return () => document.body.classList.remove('payload-admin-page');
  }, [isAdmin]);

  if (isAdmin) return <>{children}</>;

  const appliedTheme: Theme = isFfpPrototype ? 'light' : theme;

  return (
    <ThemeContext.Provider value={{ theme: appliedTheme, toggle }}>
      <div className={`portfolio-shell ${appliedTheme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export default AppThemeWrapper;
