import React from 'react';
import { notFound } from 'next/navigation';

import { getProjectBySlug } from '@/content/portfolio';
import MotionProjectTemplate from '@/components/projects/MotionProjectTemplate';
import DefaultProjectTemplate from '@/components/projects/DefaultProjectTemplate';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  if (project.category === 'Motion') {
    return <MotionProjectTemplate project={project} />;
  }

  return <DefaultProjectTemplate project={project} />;
}