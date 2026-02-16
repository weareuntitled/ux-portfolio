import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import type { CollectionConfig, GlobalConfig } from 'payload';
import path from 'path';
import { cmsConfig } from './src/lib/cms/config';

// Users collection: single-admin auth for Payload.
const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: false,
    maxLoginAttempts: 5,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req }) => {
      // Only authenticated admins can read user records.
      return Boolean(req.user);
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
};

// Media collection: central place for image uploads (hero backgrounds, thumbnails, etc).
const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media item',
    plural: 'Media library',
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'alt', 'updatedAt'],
  },
  upload: {
    staticDir: cmsConfig.uploadsDir,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    imageSizes: [
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    // Never serve uploads from a public path automatically; we will link them explicitly.
    disableLocalStorage: false,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
};

// Projects collection: each portfolio project, roughly mirroring src/content/projects.ts
const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  access: {
    // Public API read is disabled; Next.js will use the local API with overrideAccess for public pages.
    read: () => false,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'slug', 'updatedAt'],
    preview: (doc) =>
      doc?.slug
        ? `/api/preview?type=project&slug=${doc.slug}&secret=\${PREVIEW_SECRET}`
        : null,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'oneLiner',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Enterprise', value: 'Enterprise' },
        { label: 'Side', value: 'Side' },
      ],
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'array',
      fields: [
        {
          name: 'role',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'context',
      type: 'textarea',
    },
    {
      name: 'problem',
      type: 'textarea',
    },
    {
      name: 'solution',
      type: 'textarea',
    },
    {
      name: 'outcomes',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tools',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'methods',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      admin: {
        description:
          'Links like Live demo, Case study, GitHub, or Live table. Label drives button text.',
      },
      fields: [
        {
          name: 'label',
          type: 'select',
          required: true,
          options: [
            { label: 'Live demo', value: 'Live demo' },
            { label: 'Case study', value: 'Case study' },
            { label: 'GitHub', value: 'GitHub' },
            { label: 'Live table', value: 'Live table' },
          ],
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'prototype',
      type: 'group',
      fields: [
        {
          name: 'prototypeType',
          type: 'select',
          options: [
            { label: 'In-app (link to prototype route)', value: 'in-app' },
            { label: 'Figma embed', value: 'figma' },
          ],
        },
        {
          name: 'inAppPrototypeHref',
          type: 'text',
          admin: { description: 'e.g. /prototypes/ffp' },
        },
        {
          name: 'figmaEmbedUrl',
          type: 'text',
        },
        {
          name: 'figmaFileUrl',
          type: 'text',
        },
        {
          name: 'hints',
          type: 'array',
          fields: [
            {
              name: 'hint',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'prototypeButtonLabel',
      type: 'text',
      admin: { description: 'e.g. Look at the prototype' },
    },
    {
      name: 'moodImage',
      type: 'relationship',
      relationTo: 'media',
      required: false,
      admin: { description: 'Hero/mood background for project card' },
    },
    {
      name: 'teamSize',
      type: 'text',
      admin: { description: 'e.g. 4–6 people' },
    },
    {
      name: 'customerAbout',
      type: 'textarea',
      admin: { description: 'What the customer/company was about' },
    },
    {
      name: 'workflow',
      type: 'textarea',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'impact',
      type: 'array',
      admin: { description: 'Label + value cards (e.g. Resolution time, -29%)' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      admin: { description: 'Gallery images' },
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'thumbnail',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
  ],
};

// ProjectDefaults global: shared defaults applied at read time via deep merge.
const ProjectDefaults: GlobalConfig = {
  slug: 'project-defaults',
  label: 'Project defaults',
  versions: {
    drafts: true,
  },
  access: {
    read: () => false,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'projectsSectionTitle',
      type: 'text',
      required: false,
    },
    {
      name: 'projectsSectionIntro',
      type: 'textarea',
      required: false,
    },
    {
      name: 'heroBackground',
      label: 'Hero background image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'defaultTags',
      type: 'array',
      admin: {
        description: 'Fallback tags applied when a project has no tags.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'defaultMethods',
      type: 'array',
      fields: [
        {
          name: 'method',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'defaultTools',
      type: 'array',
      fields: [
        {
          name: 'tool',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'defaultPrimaryCtaLabel',
      type: 'text',
      required: false,
    },
    {
      name: 'defaultLiveTableLabel',
      type: 'text',
      required: false,
    },
  ],
};

export default buildConfig({
  serverURL: cmsConfig.publicUrl,
  secret: cmsConfig.payloadSecret,
  admin: {
    user: 'users',
    disable: !cmsConfig.editMode,
  },
  db: sqliteAdapter({
    client: {
      url: `file:${path.resolve(cmsConfig.sqlitePath)}`,
    },
  }),
  onInit: async (payload) => {
    // Ensure database migrations are applied (creates tables like project_defaults).
    await payload.db.migrate();
  },
  collections: [Users, Projects, Media],
  globals: [ProjectDefaults],
});

