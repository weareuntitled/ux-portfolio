'use client';

import { Moon, Sun } from 'lucide-react';
import { usePortfolioTheme } from '@/components/AppThemeWrapper';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Sun/Moon toggle button that switches the portfolio between light and dark mode.
 * Reads from and writes to the ThemeContext provided by AppThemeWrapper.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = usePortfolioTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className ?? ''}`}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
