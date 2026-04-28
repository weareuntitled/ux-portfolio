// Devicon CDN helper
// Returns the raw SVG URL for a given slug
// See: https://devicon.dev/

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export function deviconUrl(slug: string, variant: 'original' | 'plain' | 'original-wordmark' | 'plain-wordmark' = 'original') {
  return `${DEVICON_BASE}/${slug}/${slug}-${variant}.svg`;
}

export interface TechItem {
  name: string;
  slug: string;
  level: 'Advanced' | 'Intermediate' | 'Basic';
  variant?: 'original' | 'plain' | 'original-wordmark' | 'plain-wordmark';
}

export interface TechCategory {
  title: string;
  preTitle: string;
  items: TechItem[];
}

export const TECH_STACK: TechCategory[] = [
  {
    preTitle: '<!-- Design -->',
    title: 'Design',
    items: [
      { name: 'Figma', slug: 'figma', level: 'Advanced', variant: 'original' },
      { name: 'Adobe XD', slug: 'xd', level: 'Advanced', variant: 'plain' },
      { name: 'Adobe Photoshop', slug: 'photoshop', level: 'Advanced', variant: 'plain' },
      { name: 'Adobe Illustrator', slug: 'illustrator', level: 'Advanced', variant: 'plain' },
    ],
  },
  {
    preTitle: '<!-- AI -->',
    title: 'AI',
    items: [
      { name: 'Gemini', slug: 'google', level: 'Advanced', variant: 'original' },
      { name: 'OpenCode', slug: 'vscode', level: 'Advanced', variant: 'original' },
      { name: 'Claude', slug: 'claude', level: 'Advanced', variant: 'plain' },
      { name: 'n8n', slug: 'n8n', level: 'Intermediate', variant: 'original' },
      { name: 'LangChain', slug: 'langchain', level: 'Intermediate', variant: 'original' },
    ],
  },
  {
    preTitle: '<!-- Productivity -->',
    title: 'Productivity',
    items: [
      { name: 'Jira', slug: 'jira', level: 'Advanced', variant: 'original' },
      { name: 'Confluence', slug: 'confluence', level: 'Advanced', variant: 'original' },
      { name: 'Notion', slug: 'notion', level: 'Advanced', variant: 'original' },
    ],
  },
  {
    preTitle: '<!-- Animation / 3D -->',
    title: 'Animation / 3D',
    items: [
      { name: 'Blender', slug: 'blender', level: 'Intermediate', variant: 'original' },
      { name: 'ComfyUI', slug: 'comfyui', level: 'Intermediate', variant: 'plain' },
      { name: 'After Effects', slug: 'aftereffects', level: 'Advanced', variant: 'plain' },
      { name: 'Premiere', slug: 'premierepro', level: 'Advanced', variant: 'plain' },
      { name: 'Unity', slug: 'unity', level: 'Basic', variant: 'original' },
      { name: 'Unreal', slug: 'unrealengine', level: 'Basic', variant: 'original' },
    ],
  },
];
