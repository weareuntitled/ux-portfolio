# UX Portfolio

## Edit project content (`src/content/projects.ts`)

Project cards and links are defined in `src/content/projects.ts`.

Each project entry follows this shape:

```ts
{
  slug: string,
  title: string,
  summary: string,
  figmaEmbedUrl?: string,
  startingPointNodeId?: string,
  links?: {
    liveDemo?: string,
    caseStudy?: string,
    github?: string,
  }
}
```

### Add or update Figma embeds

1. Open `src/content/projects.ts`.
2. Add `figmaEmbedUrl` with a full Figma embed URL.
3. Optionally add `startingPointNodeId` if you want the embed to start at a specific node.

Example:

```ts
figmaEmbedUrl:
  'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/FILE_KEY/Design',
startingPointNodeId: '12-34',
```

### Add live demo / case study / GitHub links

In each project object, add the `links` object and include any of:

- `liveDemo`
- `caseStudy`
- `github`

Example:

```ts
links: {
  liveDemo: 'https://my-demo.example.com',
  caseStudy: 'https://my-site.example.com/case-study',
  github: 'https://github.com/me/my-project',
}
```

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Docker (production)

To run this portfolio in production using Docker:

```bash
docker compose build app
docker compose up -d app
```

The app will be available on port 3000 behind the `caddy` reverse proxy defined in `docker-compose.yml`.

## Vercel deployment

1. Push the repository to GitHub.
2. In Vercel, click **Add New... → Project**.
3. Import this repository.
4. Keep defaults for a Next.js project (`npm install`, `npm run build`).
5. Click **Deploy**.
6. Add your production domain in **Project Settings → Domains** (optional).

## Assumptions made

- A default OpenGraph placeholder image is acceptable until a branded image is available.
- The site uses Next.js App Router metadata APIs in `src/app/layout.tsx` and page-level metadata in `src/app/page.tsx`.
- `projects.ts` is the source of truth for project metadata and outbound links.
