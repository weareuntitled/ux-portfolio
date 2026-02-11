import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Explore selected UX projects, process notes, and outcomes.',
  openGraph: {
    title: 'Home | UX Portfolio',
    description: 'Explore selected UX projects, process notes, and outcomes.',
    images: ['/og-image.svg'],
  },
};

export default function HomePage() {
  return (
    <main>
      <h1>UX Portfolio</h1>
      <p>Welcome to the portfolio.</p>
    </main>
  );
}
