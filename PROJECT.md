# ux-portfolio

Personal portfolio for Daniel Peters — UX & Product Design Consultant.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Typography:** Manrope (display), Inter (body), IBM Plex Mono (labels), Bitcount (hero)
- **Animation:** Framer Motion, WebGL (hero gradient)
- **Backend:** Payload CMS (headless CMS)
- **Database:** SQLite (Turso/LibSQL via `drizzle-orm`)
- **Auth:** Better Auth
- **Payments:** Stripe
- **Email:** AWS SES via Vercel AI SDK
- **Deployment:** Docker + GitHub Actions → Hostinger VPS (Caddy reverse proxy)

## Key Features

- **Homepage:** Full-width editorial hero with WebGL animated gradient, profile photo wash effect (subtle, blurred, floating), 3D flip word animation with thick hand-drawn SVG strikethrough, project showcase at ~80% width, dual staggered text marquees (ALL CAPS), motion portfolio with YouTube embeds, compact tool pills, merged dark inverse About+Tools section (`bg-[#0f0f12]`), accordion Experience + Education timelines
- **Navigation:** Global top-right nav (always visible, Works accent color, Contact as filled button), sidebar nav with Motion section, hamburger menu on mobile
- **Projects:** Cinematic 21:9 cards with category badges and outcome highlights (mobile-optimized, ~80% desktop width)
- **Motion Portfolio:** Separate video-driven section (`/motion/[slug]`) with YouTube embeds, client logos marquee
- **Kontrast:** Two-column grid variation with stats cards and YouTube aftermovie overlay
- **DashboardCV variants:** `default`, `landing`, `project`, `fullwidth` (edge-to-edge for Motion/Projects pages)
- **CV:** Detailed experience timeline, education, certifications
- **Contact:** AI-powered chat agent with context-aware responses

## Pages

| Route | Description |
|---|---|
| `/` | Homepage (hero w/ WebGL bg → logos → projects → Kontrast → marquee → motion → marquee → About+Tools → experience → education → footer) |
| `/projects` | Project grid with search/filter |
| `/projects/[slug]` | Individual case study with prototype tabs |
| `/motion` | Motion design portfolio with client logos, showreels |
| `/motion/[slug]` | Video project detail (Samani, Kontrast, etc.) |
| `/cv` | Full CV with experience timeline |
| `/contact` | AI chat interface |
| `/prototypes/*` | Interactive prototype pages (FFP dashboard, reporting, review) |

## Content Sources

- `src/content/home.ts` — Identity, contact info, experience timeline data
- `src/content/landing-copy.json` — Homepage copy, education data
- `src/content/portfolio.ts` — Project metadata, gallery images, cover images, case studies
- `src/content/motion-projects.ts` — Motion project data, video URLs, YouTube IDs
- `src/content/ui-copy.json` — Sidebar labels, navigation items
- `src/lib/devicon.ts` — Tech stack data with Devicon CDN URLs
- Payload CMS — Blog posts, media uploads, project data

## Homepage Sections (Top to Bottom)

| Section | Component | Notes |
|---|---|---|
| WebGL Background | `WebGLGradientBackground.tsx` | Dark navy noise shader, GPU-accelerated |
| Navigation | `TopNav.tsx` | Fixed top-right, always visible, Contact as button |
| Hero | `HeroSection.tsx` | 3D flip word animation, Bitcount font, profile photo wash |
| Client Logos | `ClientLogos.tsx` | Infinite marquee |
| Projects | `ProjectShowcase.tsx` | Cinematic 21:9 cards, mobile-optimized |
| Kontrast | `KontrastBanner.tsx` | Two-column grid, stats, aftermovie overlay |
| Marquee | `TextMarqueeSection.tsx` | 3 staggered scrolling rows |
| Motion Portfolio | `MotionPortfolioSection.tsx` | YouTube facade cards |
| Tech Stack | `TechStackSection.tsx` | Compact pill tags |
| Marquee 1 | `TextMarqueeSection.tsx` | Staggered ALL CAPS rows before Motion |
| Motion Portfolio | `MotionPortfolioSection.tsx` | YouTube facade cards (8020 Showreel, 3D Design Reel) |
| Marquee 2 | `TextMarqueeSection.tsx` | Staggered ALL CAPS rows before About |
| About + Tools | `AboutToolsSection.tsx` | Merged dark inverse section (`bg-[#0f0f12]`), profile photo, tool pills |
| Tech Stack | `TechStackSection.tsx` | Compact pill tags |
| Experience | `ExperienceTimelineSection.tsx` | Accordion with logos |
| Education | `EducationSection.tsx` | Matches Experience accordion style |
| Footer | `NextGenStartPage.tsx` | Inverse accent CTA |

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

- Sidebar prefers `localStorage` state; if missing, defaults to open
- `HOSTNAME=0.0.0.0` required in Docker container to prevent 502 from Caddy
- Bitcount pixel font files in `public/fonts/` (Thin, Light, Regular weights)

## Recent Changes

- Added `HOSTNAME=0.0.0.0` to Dockerfile runner stage
- WebGL animated gradient background (`WebGLGradientBackground.tsx`)
- Bitcount pixel font for hero word animation with 3D flip + SVG strikethrough
- Profile photo with CSS mask wash effect in hero
- TopNav: always visible, Works accent color, Contact as button
- Text marquee (`TextMarqueeSection.tsx`) before Motion section
- Kontrast section: two-column grid with stats + YouTube aftermovie overlay
- About section: white background, centered title/photo, inverted CTA
- Compact tool pills replacing large grid cards
- Mobile project cards: smaller fonts, category/one-liner hidden
- Education accordion matching Experience timeline style
- Fixed Devicon icons (Claude→OpenAI, n8n→Docker, LangChain→Python)
- `DashboardCV` global top-right nav (always visible, `variant="fullwidth"` for Motion/Projects pages)
- Merged About + Tools into single dark inverse section (`bg-[#0f0f12]`) with centered profile photo
- Dual `TextMarqueeSection` instances (ALL CAPS) before Motion and before About
- Education restyled as accordion matching Experience timeline
- Removed all `<!-- -->` HTML comment pre-titles from section headers

## Fragile Areas / Anti-Patterns

### DefaultProjectTemplate Gallery Section
**Pattern:** Conditional rendering with `{condition && (...)}`

The gallery section (`DefaultProjectTemplate.tsx`) uses:
```tsx
{galleryThumbs.length > 0 && (
  <section>
    <div>Header</div>
    <ScrollLockGallery />  {/* REQUIRED - images won't render without this */}
  </section>
)}
```

**Gotcha:** The `<ScrollLockGallery>` component is the ONLY element that renders images. Removing it leaves only the header visible while the condition still evaluates true.

**Anti-pattern rule:** When editing any `{condition && (...)}` block, always check:
1. Is the condition truthy? (check in devtools)
2. Is there inner content that actually does the work?

### Motion Wrapper Opacity Bug
**Pattern:** Framer Motion `motion.section` with initial opacity:0

**Gotcha:** If the motion component's `animate` prop never fires (e.g., reduced motion enabled, or component unmounted before viewport), content remains `opacity: 0` and is invisible but present in DOM.

**Fix:** Removed motion wrapper from gallery section - images render without animation for now.
- **Design coherence fixes:** thicker SVG strikethrough (`strokeWidth="2.5"`), subtler hero photo (`opacity: 0.18`, `blur-[2px]`, pushed further right), seamless hero→logos transition (removed `pb-8` wrapper), project cards at `w-[90%] max-w-6xl` (~80% visual width), `M.Sc. UX Designer` in normal font weight
