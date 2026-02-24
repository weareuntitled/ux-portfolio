export type ProjectCategory = 'Enterprise' | 'Side' | 'Branding' | 'Motion' | 'Archive';

export type CmsProject = {
  slug: string;
  title: string;
  moodImageUrl?: string | null;
  category?: ProjectCategory | null;
};