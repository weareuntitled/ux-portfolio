import { DashboardCV } from '@/components/DashboardCV';
import { NextGenStartPage } from '@/components/landing/NextGenStartPage';

export const revalidate = 300;

export default function HomePage() {
  return (
    <DashboardCV variant="landing">
      <NextGenStartPage />
    </DashboardCV>
  );
}
