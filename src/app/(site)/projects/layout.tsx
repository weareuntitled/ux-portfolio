import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A curated selection of UX, product design, AI automation, and branding projects by Daniel Peters.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
