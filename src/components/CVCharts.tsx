'use client';

import dynamic from 'next/dynamic';

const CelonisSkillsPresentation = dynamic(
  () => import('@/components/CelonisSkillsPresentation').then((m) => ({ default: m.CelonisSkillsPresentation })),
  { ssr: false }
);

const LeadershipCardWithTrend = dynamic(
  () => import('@/components/LeadershipCardWithTrend').then((m) => ({ default: m.LeadershipCardWithTrend })),
  { ssr: false }
);

export { CelonisSkillsPresentation, LeadershipCardWithTrend };
