export interface ProjectLinks {
  liveDemo?: string;
  caseStudy?: string;
  github?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  figmaEmbedUrl?: string;
  startingPointNodeId?: string;
  links?: ProjectLinks;
}

export const projects: Project[] = [
  {
    slug: 'sample-checkout-flow',
    title: 'Checkout Flow Refresh',
    summary: 'Improved conversion by simplifying checkout inputs and copy.',
    figmaEmbedUrl:
      'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/EXAMPLE/Checkout-Flow',
    links: {
      liveDemo: 'https://example.com/demo',
      caseStudy: 'https://example.com/case-study',
      github: 'https://github.com/example/checkout-flow',
    },
  },
];
