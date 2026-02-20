'use client';

import dynamic from 'next/dynamic';

const CareerAreaChart = dynamic(
  () => import('@/components/CareerAreaChart').then((m) => ({ default: m.CareerAreaChart })),
  { ssr: false }
);

const CelonisSkillsPresentation = dynamic(
  () => import('@/components/CelonisSkillsPresentation').then((m) => ({ default: m.CelonisSkillsPresentation })),
  { ssr: false }
);

export { CareerAreaChart, CelonisSkillsPresentation };
