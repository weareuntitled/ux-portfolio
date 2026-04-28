# ux-portfolio

Personal portfolio for Daniel Peters — UX & Product Design Consultant.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Typography:** Manrope (display), Inter (body), IBM Plex Mono (labels)
- **Animation:** Framer Motion
- **Backend:** Payload CMS (headless CMS)
- **Database:** SQLite (Turso/LibSQL via `drizzle-orm`)
- **Auth:** Better Auth
- **Payments:** Stripe
- **Email:** AWS SES via Vercel AI SDK
- **Deployment:** Docker + GitHub Actions → Hostinger VPS (Caddy reverse proxy)

## Key Features

- **Homepage:** Dark editorial hero with animated orbs, full-width project showcase, tech stack grid, "Behind the Screens" about section
- **Sidebar:** Collapsible navigation (desktop) / Sheet drawer (mobile), persisted state in localStorage
- **Projects:** Case studies with interactive dashboards (Kovon FFP, Emission Compliance, Automation)
- **Motion Portfolio:** Separate video-driven section (`/motion/[slug]`) with YouTube embeds
- **CV:** Detailed experience timeline, education, certifications
- **Contact:** AI-powered chat agent with context-aware responses

## Pages

| Route | Description |
|---|---|
| `/` | Homepage (hero → logos → projects → tech stack → about → experience → footer) |
| `/projects` | Project grid with search/filter |
| `/projects/[slug]` | Individual case study with prototype tabs |
| `/motion` | Motion design portfolio with client logos, showreels |
| `/motion/[slug]` | Video project detail (Samani, Kontrast, etc.) |
| `/cv` | Full CV with experience timeline |
| `/contact` | AI chat interface |
| `/prototypes/*` | Interactive prototype pages (FFP dashboard, reporting, review) |

## Content Sources

- `src/content/home.ts` — Identity, contact info, experience timeline
- `src/content/landing-copy.json` — Homepage copy, education, stats
- `src/content/portfolio.ts` — Project metadata, gallery images, cover images
- `src/content/motion-projects.ts` — Motion project data, video URLs, YouTube IDs
- `src/content/ui-copy.json` — Sidebar labels, navigation items
- Payload CMS — Blog posts, media uploads, project data

## Build & Deploy

### Local Development

```bash
npm install --legacy-peer-deps
npm run dev        # Next.js dev server on :3000
npm run payload:dev # Payload admin on :3001
```

### Docker Build

```bash
docker build -t ux-portfolio .
docker run -p 3000:3000 -e HOSTNAME=0.0.0.0 ux-portfolio
```

### Deployment Flow

1. Push to `main` → GitHub Actions builds Docker image
2. Image pushed to `ghcr.io/weareuntitled/ux-portfolio:latest`
3. Watchtower on server pulls new image and restarts container
4. Caddy reverse proxies `portfolio.untitled-ux.de` → `ux-portfolio:3000`

### Server Setup

```bash
# Caddy runs as Docker container on fixundfertig_default network
# ux-portfolio must be on same network for DNS resolution
docker network connect fixundfertig_default ux-portfolio
```

## Assets

- **Profile:** `public/profile.jpg`
- **Projects:** `public/projects/[slug]/` (galleries, covers)
- **Motion:** `public/motion/[project]/` (video files)
- **Capabilities:** `public/images/capabilities/` (thinking, delivery, tools, process)
- **Background:** `public/mesh-bg.svg`

## Environment Variables

```env
DATABASE_URL=libsql://...
DATABASE_AUTH_TOKEN=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
WELCOME_SUBJECT="Welcome to Untitled UX"
AWS_REGION=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SENDER_EMAIL=...
RESEND_FROM=...
BASE_URL=https://portfolio.untitled-ux.de
```

## Known Issues

- Some Devicon icons may 404 (OpenCode, ComfyUI, n8n, LangChain) — fallback renders text initials
- Sidebar prefers `localStorage` state; if missing, defaults to open
- `HOSTNAME=0.0.0.0` required in Docker container to prevent 502 from Caddy

## Recent Changes

- Added `HOSTNAME=0.0.0.0` to Dockerfile runner stage
- Replaced monolithic homepage with sectioned components
- Added collapsible sidebar with hamburger toggle
- Tech stack grid with Devicon icons and skill levels
- Full-width cinematic project cards
- Inverse accent-colored footer CTA
