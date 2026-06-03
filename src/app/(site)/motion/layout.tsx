import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motion',
  description: 'Motion design, 3D animation, and AI-assisted visual work by Daniel Peters.',
};

export default function MotionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
