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
    default: 'Daniel Peters — AI-Native Product Designer',
    template: '%s | Daniel Peters',
  },
  description:
    'AI-Native Product Designer & UX Consultant. Enterprise SaaS, workflow automation, AI agents, and motion design. Certified Scrum Master.',
  icons: {
    icon: '/favicon.svg',
  },
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
