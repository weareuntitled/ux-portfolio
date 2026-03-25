import type { Metadata } from 'next';
import './globals.css';
import { getMetadataBase } from '@/lib/site-url';

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'Daniel Peters — UX & Product Design Consultant',
    template: '%s | Daniel Peters',
  },
  description:
    'UX & Product Design Consultant for enterprise SaaS, workflow automation, and SAP. M.Sc. UX Design.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Daniel Peters Portfolio',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}