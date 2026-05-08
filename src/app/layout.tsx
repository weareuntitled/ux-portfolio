import type { Metadata } from 'next';
import './globals.css';
import { getMetadataBase } from '@/lib/site-url';
import { Inter, Manrope, IBM_Plex_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

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
      <body
        className={`${inter.variable} ${manrope.variable} ${ibmPlexMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
