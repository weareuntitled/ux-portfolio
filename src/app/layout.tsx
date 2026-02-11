import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const siteTitle = 'UX Portfolio';
const siteDescription = 'A portfolio showcasing UX and product design case studies.';

export const metadata: Metadata = {
  metadataBase: new URL('https://example-portfolio.vercel.app'),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    url: 'https://example-portfolio.vercel.app',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'UX Portfolio OpenGraph placeholder image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
