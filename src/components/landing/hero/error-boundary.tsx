/**
 * HeroErrorBoundary — catches render-time throws (SVG filter parse failures,
 * framer-motion crashes, browser-specific filter/mix-blend bugs) so a single
 * broken child doesn't blank the page. Falls back to a text-only hero.
 * #schema:
 * {
 *   type: "component",
 *   module: "hero/error-boundary.tsx"
 * }
 */

import React from 'react';
import { HeroFallback } from './hero-fallback';

export class HeroErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state: { hasError: boolean } = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (typeof console !== 'undefined') {
      console.error('[HeroSection] Error caught by boundary:', error, info);
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) return <HeroFallback />;
    return this.props.children;
  }
}
