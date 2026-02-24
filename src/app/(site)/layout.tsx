import React from 'react';
import { AppThemeWrapper } from '@/components/AppThemeWrapper';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <AppThemeWrapper>{children}</AppThemeWrapper>;
}