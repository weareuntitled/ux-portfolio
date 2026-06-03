import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getProjectBySlug } from '@/content/portfolio';
import MotionProjectTemplate from '@/components/projects/MotionProjectTemplate';
import DefaultProjectTemplate from '@/components/projects/DefaultProjectTemplate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.oneLiner || project.description,
  };
}

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