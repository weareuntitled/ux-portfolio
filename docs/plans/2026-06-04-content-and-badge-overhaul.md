# Plan: Content & Badge Overhaul

**Date:** 2026-06-04
**Goal:** Realign project badges to target job roles (from `master_profile.md`), rewrite homepage and project copy in the user voice, migrate the Tracklistify access band from the homepage to the Tracklistify detail page, and harden the empty-image state for image-light projects (SAP automation, GSwin ERP).

**Source of truth:** `/Users/apple/Projects/job-hunter/data/master_profile.md` (single source of truth, 8 CV variants, 1 voice profile, target-role keywords).

---

## 1. Goal & Non-Goals

### Goal
- Replace the single "Enterprise" badge (and noisy "Side / Web / Motion / Branding / Archive" mix) with a 6-role taxonomy that maps 1:1 to the user's actual job applications.
- Rewrite hero, capability copy, project copy, and filter labels so every public string is in the user's voice (direct, structured, confident-humble, 1-page, no filler — see §11.3).
- Move `<AccountRequestBand variant="compact" />` out of `NextGenStartPage.tsx` and into the Tracklistify project page as `variant="full"`.
- Make image-light projects (SAP automation, GSwin ERP) feel intentional — typographic hero, no broken layout, no "no image" placeholder shouting that an image is missing.

### Non-Goals (YAGNI)
- No new visual design system, no new design tokens, no badge color re-theming beyond what's needed for the new taxonomy.
- No new page sections, no new copy schemas, no new copy fields. All copy lives in the existing JSON / TS files.
- No filter UI rewrite beyond the data (`CATEGORIES` array). The sidebar shell, mobile sheet, and project grid stay as-is.
- No CV page (`/cv`) rewrite. `cv-copy.json` is touched only for one line: the canonical identity in §3.2.
- No CV variant auto-generation. The 8 `.tex` CVs are not the portfolio site's concern.
- No new role badge variants in `badge.tsx` — re-use the existing `variant: 'live' | 'beta' | 'completed' | 'inReview'` tokens (or add one `role` variant — see §5.3).

---

## 2. New Badge Taxonomy (Role-Mapped)

Derived from `master_profile.md` lines 230–241 (8 CV variants) and 224 (target keywords: *Senior UX Designer, Product Designer, UX Lead, UX/UI Designer, Product Owner, UX Strategist, Design Lead, UI Designer*).

| # | Badge label (public) | Maps to CV variant | Distribution |
|---|---|---|---|
| 1 | `UX/UI Design` | UX/UI Designer (DE) — mobile/web, design systems | 3 |
| 2 | `Product Design` | Product Designer (DE) — full-cycle, AI-native | 5 |
| 3 | `Strategy & Process` | Product Owner (DE) + General (DE) — leadership, consulting, process design | 3 |
| 4 | `Visual & Branding` | Visual & Graphic Design (DE) — print, identity, brand systems | 3 |
| 5 | `Web & CMS` | Web & CMS (DE) — WordPress, Webflow, TYPO3, SEO | 1 |
| 6 | `Motion & 3D` | Motion & Digital Production (DE) — motion, video, 3D | 1 |
| 7 | `Archive` | — (kept as low-status filter chip) | 1 |

**Note:** Two CV variants have no portfolio project to represent them: `XR & Research (EN)` and `Motion & Digital Production (DE)` is covered by one project only. The "Strategy & Process" badge collapses Product Owner (DE) + General (DE) — these are the user's bread-and-butter consulting and leadership cases, and they don't have enough standalone projects to split.

The `Archive` chip stays as a low-status filter (it doesn't appear in the 6 role badges). Projects currently tagged `Side` get re-homed under the most appropriate role badge.

### 2.1 Project → Badge Mapping (final)

| Slug | Current `category` | New `category` | Why |
|---|---|---|---|
| `kovon` | Enterprise | `UX/UI Design` | Mobile/web app, B2B SaaS, design systems, 200+ users — textbook UX/UI Designer (DE) work |
| `emission-compliance` | Enterprise | `UX/UI Design` | Data-viz dashboard for compliance experts — UX/UI Designer (DE) |
| `ffp-dashboard` | Enterprise | `UX/UI Design` | Diagnostic workflow UI, prototyping, mental-model alignment — UX/UI Designer (DE) |
| `automation` | Enterprise | `Strategy & Process` | SAP PDD, process design, automation management — closer to Product Owner / consulting than pure UI |
| `strategic-ai-consulting` | Enterprise | `Strategy & Process` | Strategic advisory, 500+ processes, AI adoption roadmap, ROI validation — General (DE) / Product Owner (DE) |
| `gswin-erp-migration` | Enterprise | `Product Design` | Solo full-stack AI-built ERP — Product Designer (DE) AI-native variant |
| `architektur-ai` | Side | `Product Design` | Local AI arch-viz workflow, 24× faster variants — Product Designer (DE) AI-native |
| `tracklistify` | Side | `Product Design` | AI-built audio analysis, indie dev — Product Designer (DE) AI-native |
| `fixundfertig` | Side | `Product Design` | OCR + admin automation, indie dev — Product Designer (DE) AI-native |
| `job-hunter` | Side | `Product Design` | Autonomous AI agent (Python/Telegram/LaTeX) — Product Designer (DE) AI-native (flagship) |
| `8020-portfolio` | Motion | `Strategy & Process` | Showreel of consulting leadership (60/40 logic/creative) — General (DE) / leadership signal. The Motion CV variant exists; this project isn't a Motion work, it's a leadership one. |
| `3dprojects` | Motion | `Motion & 3D` | Pure 3D + AI motion work for events — Motion & Digital Production (DE) |
| `samani-rebranding` | Branding | `Visual & Branding` | AE/Figma template system, label identity — Visual & Graphic Design (DE) |
| `kontrast-festival` | Branding | `Visual & Branding` | Co-Founder & Design Lead, full visual identity — Visual & Graphic Design (DE) |
| `aidelsburger` | Branding | `Visual & Branding` | Industrial brand identity refresh — Visual & Graphic Design (DE) |
| `deinespanndecke` | Web | `Web & CMS` | WordPress + local SEO + Google Ads — Web & CMS (DE) |
| `arbeitsprobe2022` | Archive | `Archive` | Written portfolio archive — keep |

Total: 3 + 3 + 5 + 3 + 1 + 1 + 1 = 17 ✓

---

## 3. Homepage Copy Overhaul

### 3.1 Current copy weaknesses (vs. master profile)

| Source | Current | Issue |
|---|---|---|
| `landing-copy.json:3` | `chips: ["Product Design", "Agile Delivery", "Design Strategy"]` | Generic. "Agile Delivery" is the methodology, not the role. Should be role-aligned with new taxonomy. |
| `landing-copy.json:4` | `availableTooltip: "Open to Product Designer, UX Consultant & Design Lead roles."` | Lists 3 of 8 target keywords. Should cover 4–5 strongest matches. |
| `landing-copy.json:5` | Hero description opens "AI-Native Product Designer. **Exploring what happens when design meets AI**..." | "Exploring" is hedged. Master profile voice: "self-confident but humble," "direct and structured, not flowery." |
| `landing-copy.json:8–11` | Stats: "Focus: Complex Systems 3", "Products Delivered 30+", "Startups & SMEs 10+", "Core Focus UX/UI" | Stats feel decoupled from master profile's measurable impact. Should tie to actual numbers (story velocity 10→20, ~150 hrs/year saved, 7 days/€200 ERP, 24× arch-viz, 80% usability-findings reduction). |
| `src/lib/hero-words.ts:16–26` | `Process Manager, Creative, Producer, UX Designer, UI Designer, Product Owner, Product Designer, Coffee Lover, Scrum Master, Motion Designer` | 10 words, 4 are off-brand personality fills (`Process Manager`, `Creative`, `Producer`, `Coffee Lover`). Master profile: "no filler." `Scrum Master` is a cert, not a role. |
| `home.ts:9` | `identityRolePrimary: 'AI-Native Product Designer'` | Good — consistent with `master_profile.md:34`. Keep. |
| `home.ts:11` | `identityRoleSecondary: 'M.Sc. UX Design (1.3) · Certified Scrum Master · 9+ yrs'` | Solid, matches `master_profile.md:31, 42, 90`. Keep. |
| `home.ts:13` | `identitySubtitle: 'AI-Native Design · Agile Delivery · Motion'` | "Agile Delivery" + "Motion" both appear in the wrong slots. Subtitle should reinforce 2–3 strongest roles. |
| `home.ts:21` | `tagline: 'AI-Native Product Designer & UX/UI Strategist. I bridge design, engineering, and AI to ship product in days, not months.'` | Good — keep. |

### 3.2 New copy (locked in)

**`landing-copy.json` — `hero` block:**

```json
{
  "hero": {
    "chips": ["UX/UI Design", "Product Design", "AI-Native Builder"],
    "availableTooltip": "Open to Product Designer, UX/UI Designer, UX Lead & Product Owner roles.",
    "description": "AI-Native Product Designer. I build with LLMs as design partners and coding accelerators, and ship production systems in days when the workflow is right. M.Sc. UX Design (1.3), certified SAFe 6 Scrum Master, 9+ years across automotive, B2B SaaS, and culture."
  }
}
```

**`hero-words.ts` — replace the 10 entries with 8 role-aligned words:**

```ts
export const HERO_WORDS: readonly HeroWord[] = [
  { label: 'Product Designer' },
  { label: 'UX/UI Designer' },
  { label: 'Product Owner' },
  { label: 'UX Strategist' },
  { label: 'Design Lead' },
  { label: 'AI-Native Builder' },
  { label: 'Full-Stack Designer' },
  { label: 'Motion Designer' },
] as const;
```

Dropped: `Process Manager`, `Creative`, `Producer`, `UX Designer` (covered by `UX/UI Designer`), `UI Designer` (covered by `UX/UI Designer`), `Coffee Lover`, `Scrum Master` (cert, not a role).

**`landing-copy.json` — `stats` block (tied to master profile numbers):**

```json
{
  "stats": [
    { "icon": "Zap",   "badge": "Velocity",  "k": "Story Points",       "v": "10 → 20",  "d": "Per sprint, after backlog overhaul" },
    { "icon": "Clock", "badge": "Time Saved","k": "SAP Automation",     "v": "~150 h",   "d": "Per year, via bot + PDD" },
    { "icon": "Bot",   "badge": "AI-Native", "k": "Products Shipped",   "v": "3",        "d": "In 12 months, AI-assisted dev", "hi": true },
    { "icon": "Trophy","badge": "Usability", "k": "Findings Reduced",   "v": "~80%",     "d": "POC → MVP, by systematic testing" }
  ]
}
```

(Stats derive from `master_profile.md:67–72`. The `hi: true` on the AI-Native card mirrors the current highlight treatment.)

**`landing-copy.json` — `coreCapabilities` block:** existing 5 cards are mostly good but the language drifts. Tightened bodies (one-line each, voice-matched):

| Icon | Title | Body (new) |
|---|---|---|
| Box | Strategic Thinking & Concepting | "I start by finding the real problem. That means asking uncomfortable questions, pushing back on bad briefs, and resisting the urge to jump to solutions. When we're heading for a wall, I say so." |
| Users | UX & Research | "Talk to users, find the gaps, turn findings into requirements. I test at every stage so the design sharpens as the project moves." |
| Zap | Agile Delivery & Scrum | "SAFe 6 Scrum Master with real sprint experience. I facilitate ceremonies, write developer-ready specs, and keep design and engineering moving in the same direction." |
| Workflow | Process & Complexity | "Some problems are messy by nature. I map how things actually work, find the bloat, and restructure it into something people can use without a manual." |
| Sparkles | AI-Augmented Workflows | "I integrate AI where it matters: agentic coding for prototypes, AI-driven visual generation, automated content extraction. Teams spend time on decisions, not repetition." |

(Drop the word "Boxes" filler, "We help you build a clear picture" filler, and "I help you design the right thing" filler from the current bodies. Master profile: "direct and structured, not flowery.")

**`home.ts` — `identitySubtitle`:**

```ts
export const identitySubtitle = 'Product Design · UX/UI · AI-Native';
```

(Replaces "AI-Native Design · Agile Delivery · Motion". Drops the redundant "AI-Native" and the "Motion" slot — Motion is one of 6 badges, not a top-3.)

### 3.3 What stays as-is (no need to touch)

- `identityName`, `identityRolePrimary`, `identityRoleSecondary` — already match `master_profile.md:24, 31, 42, 90`.
- `contact.tagline` — already voice-matched and consistent.
- `experienceTimelineDetailed` (the 4-row career table) — already matches `master_profile.md:53–103` in headline, period, location.
- `education` block in `landing-copy.json` — master thesis title + grade 1.0 match `master_profile.md:46, 58`.
- `certification` block — SAFe 6 valid until June 03 2026 matches `master_profile.md:175`.

---

## 4. Project Copy Overhaul

**Rule:** every project's `oneLiner`, `subtitle`, and (where used) `description` should be in the user voice — direct, structured, concrete numbers, no filler. The `category` field gets the new badge per §2.1.

### 4.1 Pattern: what to cut and what to keep

| Smell | Example from current copy | Fix |
|---|---|---|
| Marketing-speak | "Securing Audit Readiness through Conformity of Production." (kovon subtitle) | Make it concrete: "Compliance platform that replaced fragmented Excel tracking with a single hub, used by 200+ stakeholders." |
| Hedge words | "helps" / "streamlines" / "enables" | "Replaced", "Cut", "Shipped", "Saved" |
| Filler intro | "An easy-to-scan visualization dashboard..." (emission-compliance description) | Lead with the outcome: "Cut scan time on critical breaches by [X]." (need real number from user — see §11 open Q) |
| Restating the title | "A foolproof design system and self-sustaining label identity." (samani) | Drop the restatement. Lead with the thing the user did. |

### 4.2 Project copy — line-by-line diffs

**kovon** (current → new)
- `subtitle`: "Securing Audit Readiness through Conformity of Production." → "Compliance hub that replaced fragmented Excel tracking with one auditable source of truth."
- `oneLiner`: "Replaced fragmented Excel tracking with a centralized compliance hub, giving 200+ users full audit visibility across vehicle part documentation." → keep, voice is OK.

**automation** (current → new)
- `subtitle`: "Protecting Data Integrity in SAP Environments." → "Process automation that blocks faulty platform overwrites and ends manual rework."
- `oneLiner`: "Eliminated manual rework by implementing automated routines that block faulty platform overwrites and safeguard core data." → "Built a 37-page PDD and shipped an automated routine that stopped faulty overwrites in the OEM platform tree, saving 10 experts ~4 hours each per week."

**emission-compliance** (current → new)
- `subtitle`: "Accelerating Anomaly Detection." → "Reporting dashboard that surfaces breaches in cluttered compliance data."
- `oneLiner`: same general direction; tighten to "Dashboard with visual encoding and adjustable thresholds, so experts spot breaches in dense compliance tables in seconds."

**ffp-dashboard** (current → new)
- `subtitle`: "Optimizing Expert Diagnostic Workflows." → "Diagnostic workflow restructured from symptom-first triage to root-cause analysis."
- `oneLiner`: same general direction; keep but voice-check.

**strategic-ai-consulting** (current → new)
- `subtitle`: "From Proof of Concept to Enterprise ROI." → "AI strategy from POC to validated architecture: 500+ processes, hybrid RAG, Power Automate ingestion."
- `oneLiner`: drop the marketing compression. Current is already 4+ clauses; keep but trim the redundant "to scale beyond experiments without betting on costly custom UI" sentence (it's repeated in `description`).

**gswin-erp-migration** (current → new)
- `subtitle`: "Lean AI Migration." → "135 legacy craft-trade databases consolidated into one web ERP, shipped in 7 days for €200 of tokens."
- `oneLiner`: keep. It already leads with the concrete numbers.

**8020-portfolio** (current → new)
- `subtitle`: "The 60/40 Hybrid Design Workflow." → keep, it's a good tagline.
- `oneLiner`: "Led cross-functional delivery of digital products for automotive OEMs, spanning enterprise UX tools and motion design work." → "Three years of hybrid design leadership at an automotive management consultancy — UX/UI delivery, motion output, and team rituals."

**3dprojects** (current → new)
- `subtitle`: "Immersive 3D & AI Visuals." → "3D and AI animations for events, music labels, and marketing."
- `oneLiner`: "Created 3D modeling and AI-driven animations for events, marketing campaigns, and music labels." → "3D and AI-driven animation work for music labels, events, and campaigns — Kontrast Festival stages, label visuals, and social loops."

**architektur-ai** (current → new)
- `subtitle`: "AI-Accelerated Architectural Visualization." → keep.
- `oneLiner`: "Combined 3D modeling with local AI style generation, cutting architectural visualization turnaround from days to hours." → "Local ComfyUI + 3D pipeline: cut arch-viz variant turnaround from 3 days to 3 hours per variant."

**tracklistify** (current → new)
- `subtitle`: "AI-Driven Audio Analysis." → "AI tracklist extraction for DJ sets."
- `oneLiner`: "Built a personal tool that uses AI audio analysis to extract accurate tracklists from raw DJ sets." → "Indie tool: AI audio analysis turns raw DJ sets from SoundCloud and YouTube into structured tracklists."

**fixundfertig** (current → new)
- `subtitle`: "Streamlining Administrative Workflows." → "Personal admin tool: local OCR for receipts and invoices."
- `oneLiner`: "Built a personal automation tool that processes and organizes receipts and invoices using local OCR extraction." → "Local OCR pipeline that replaced ~2 hours/week of manual receipt copying with a single review queue."

**job-hunter** (current → new)
- `subtitle`: "Autonomous Application Agent." → keep.
- `oneLiner`: keep. Already concrete and the flagship AI-native story.

**samani-rebranding** (current → new)
- `subtitle`: "Accessible Brand & Design Systems." → "AE/Figma template system for a music label."
- `oneLiner`: "Designed a scalable After Effects and Figma template system, enabling non-designers to produce on-brand content independently." → "After Effects + Figma template system that let non-designers produce on-brand releases for three years without me in the loop."

**kontrast-festival** (current → new)
- `subtitle`: "Leading Creative Operations." → "Three years as Co-Founder & Design Lead: visual identity, stage, merch, ops."
- `oneLiner`: "Led art direction, brand identity, and event logistics over three years, coordinating a creative team and managing real-time media production." → "Co-founded a regional cultural festival, scaled it to 3,000 attendees and ~200k EUR annual revenue, owned the full visual identity and ops."

**deinespanndecke** (current → new)
- `subtitle`: "Brand Refresh & Web Design." → "WordPress rebuild, local SEO, Google Ads — Rank 2 for 'Spanndecken Augsburg'."
- `oneLiner`: drop the multi-clause lead-in, keep the numbers. → "End-to-end rebrand, WordPress rebuild, and local SEO for a stretch-ceiling specialist — Rank 2 for the core Augsburg query, ~€100 cost per qualified lead."

**aidelsburger** (current → new)
- `subtitle`: "Scalable Corporate Identity." → "Industrial identity refresh: metaphor over typo."
- `oneLiner`: "Modernized a corporate visual identity for an industrial client, redesigning typography and brand language for a more contemporary presence." → "Industrial brand identity refresh: turned a legacy wordmark into a deliberate metaphor with usage guidelines for digital and physical applications."

**arbeitsprobe2022** (current → new)
- `subtitle`: "Foundational Design Archive." → keep.
- `oneLiner`: "A comprehensive written portfolio documenting multidisciplinary design studies and early-career projects from 2018 to 2022." → "Written portfolio documenting four years (2018–2022) of multidisciplinary design work — study projects, branding, and logos."

### 4.3 Out of scope (NOT rewriting in this pass)

- `kovon.contentTabs` and `kovon.featuredCase` — interactive case study content. Voice is OK.
- `caseStudyJobHunter` (the long-form `contextWhyMattered`, `approach`, `outcome` text) — already voice-matched and concrete.
- `caseStudyStrategicAi` — already substantive, no rewrite needed.
- `caseStudyArchViz` — short, fine.
- The big GSwin `caseStudy` block (7 sub-fields, all German) — already substantive.
- `deinespanndecke.description` long-form — already substantive.

If the user wants long-form case studies rewritten, that's a follow-up.

---

## 5. Filter Sidebar Update

`src/app/(site)/projects/page.tsx:18–26` — replace `CATEGORIES` array with new role taxonomy. Order: `All` → `UX/UI Design` → `Product Design` → `Strategy & Process` → `Visual & Branding` → `Web & CMS` → `Motion & 3D` → `Archive`.

```ts
const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'UX/UI Design', value: 'UX/UI Design' },
  { label: 'Product Design', value: 'Product Design' },
  { label: 'Strategy & Process', value: 'Strategy & Process' },
  { label: 'Visual & Branding', value: 'Visual & Branding' },
  { label: 'Web & CMS', value: 'Web & CMS' },
  { label: 'Motion & 3D', value: 'Motion & 3D' },
  { label: 'Archive', value: 'Archive' },
];
```

The hardcoded `p.category === 'Motion'` check on line 157 of the same file (which selects the `Film` icon for motion projects) needs to widen. The cleanest fix: use a small set of icons mapped by category, not a single `=== 'Motion'` check.

```ts
const CATEGORY_ICON: Record<string, LucideIcon> = {
  'UX/UI Design':     Layout,
  'Product Design':   Box,
  'Strategy & Process': Workflow,
  'Visual & Branding': Sparkles,
  'Web & CMS':        Globe,
  'Motion & 3D':      Film,
  'Archive':          FolderKanban,
};
const Icon = CATEGORY_ICON[p.category] ?? FolderKanban;
```

The Motion template branch in `src/app/(site)/projects/[slug]/page.tsx:32` (which renders `MotionProjectTemplate` only for `category === 'Motion'`) needs to widen to `category === 'Motion & 3D'`.

### 5.1 Type system change

`src/content/portfolio.types.ts:41` — widen the `category` enum:

```ts
category: 'UX/UI Design' | 'Product Design' | 'Strategy & Process' | 'Visual & Branding' | 'Web & CMS' | 'Motion & 3D' | 'Archive';
```

(Removed: `'Enterprise' | 'Side' | 'Branding' | 'Motion' | 'Web'`.)

### 5.2 `badge.tsx` variant

Existing variants (`live`, `beta`, `completed`, `inReview`) are status-driven, not role-driven. For project cards, the `category` is rendered as plain `<span>` text (see `projects/page.tsx:210–213`). The new taxonomy needs no new badge component — the existing text treatment is fine.

If we want to add subtle color coding per role badge (optional, see §11 Q3), the cleanest path is a single new variant:

```ts
// badge.tsx
role: "border-primary/30 bg-primary/10 text-primary",
```

…and a `getBadgeVariantForCategory(category)` helper. Defer this until the user signals they want it.

---

## 6. Tracklistify Band Migration

### 6.1 Current state

`src/components/landing/NextGenStartPage.tsx:447–454` renders:

```tsx
{/* 5. AI Side Project — Tracklistify set curation banner */}
{tracklistify?.accountRequestEndpoint && (
  <AccountRequestBand
    variant="compact"
    endpoint={tracklistify.accountRequestEndpoint}
    coverUrl={getProjectCoverImage(tracklistify) ?? undefined}
    projectUrl={`/projects/${tracklistify.slug}`}
  />
)}
```

It sits between "Selected Work — Enterprise Projects" and the "Kontrast Festival — Light emphasis" block.

### 6.2 What to remove

- Delete the block at lines 446–454 (and the comment header).
- Remove the now-unused `import { AccountRequestBand } from '@/components/project/AccountRequestBand';` on line 15.

### 6.3 What to add

`src/components/projects/DefaultProjectTemplate.tsx` — inside the template's render tree, after the `ProjectHero` block and before the first content section, conditionally render the band when `project.accountRequestEndpoint` is set:

```tsx
{project.accountRequestEndpoint && (
  <AccountRequestBand
    variant="full"
    endpoint={project.accountRequestEndpoint}
    coverUrl={getProjectCoverImage(project) ?? undefined}
    projectUrl={`/projects/${project.slug}`}
  />
)}
```

The `full` variant (lines 211–318 of `AccountRequestBand.tsx`) is the right one for a project detail page — two-column layout, AI context on the left, form on the right.

### 6.4 Why not a per-project slot in `[slug]/page.tsx`?

The slot lives in `DefaultProjectTemplate` (used by all non-motion projects) so any future project with `accountRequestEndpoint` gets the same treatment. Currently only `tracklistify` has it set (line 159 of `portfolio-creative.ts`). No `MotionProjectTemplate` change needed (motion projects don't have access-request flows).

---

## 7. Empty-Image State (SAP Automation, GSwin ERP)

### 7.1 Audit of current behavior

`src/components/project/ProjectHero.tsx:28, 90–97` — already handles `coverUrl === null` with a gradient + radial fallback. Looks intentional. **No change needed here.**

`src/components/projects/DefaultProjectTemplate.tsx:125` — `LightboxGallery` returns `null` if `urls.length === 0`. **No broken layout if gallery is empty.**

`src/components/landing/NextGenStartPage.tsx:56–60` — `FeaturedCard` shows a gradient + `FileText` icon when cover is null. **Already handled.**

The remaining gap: when a project has *no mood image and a thin gallery* (1–2 images), the detail page can feel visually light compared to image-rich projects like `kovon` or `gswin-erp-migration`. The fix is to **promote existing visual artifacts** instead of inventing new ones.

### 7.2 The two affected projects

| Project | `moodImageUrl` | `galleryUrls` | Visual weight on page today |
|---|---|---|---|
| `automation` | `getPreviewImage('automation')` — likely null (only 2 gallery images exist) | 2 images: `automation_hero.jpg`, `automation_process.png` | Light. ProjectHero shows gradient. Gallery has 2 thumbs. Below: PDD impact cards. |
| `gswin-erp-migration` | `getPreviewImage('gswin-erp-migration')` | 1 shared image with `strategic-ai-consulting` | Good — the GSwin page already has `ermAnimation` (135 → 1 dots), `timelineDonut`, and a `beforeAfter` slider. Heaviest visual weight in the catalog. |

So `gswin-erp-migration` is fine. **`automation` is the case to fix.**

### 7.3 Spec for `automation` empty-image state

**Goal:** the page should not feel like a missing-image error. It should look like a deliberate "process work, no UI surface" piece.

**Promote the existing `impactCards` (3 already exist at lines 129–133 of `portfolio-enterprise.ts`):**

```
PDD: 37 pages
Weekly time saved: 4h / expert
Experts impacted: 10
```

These already render on the page (via `ModularImpactHighlight` or `ProjectImpactCards`). The fix is to **promote them above the fold** as a hero replacement.

**Concretely:**

1. Pass `moodImageUrl={null}` explicitly to `ProjectHero` for `automation` to make the empty state intentional, not accidental. (Force the no-cover branch.)
2. In `DefaultProjectTemplate`, when `moodImageUrl` is null AND the project has no YouTube/processDiagram, render a 3-card stat strip *inside* the `ProjectHero` `children` slot (which already exists for meta cards — `ProjectHero.tsx:165–173`). The strip uses the existing `impactCards` data. This puts the "37 pages / 4h saved / 10 experts" callout in the hero, not below the fold.
3. The PDD-themed subhead should be the visual anchor: "Process Design Document · 37 pages · Ready for stakeholder review" (using the existing `outcomeHighlight` field — see `portfolio-enterprise.ts:134–139`).

**No new components, no new copy schemas.** Just reorder existing data and wire it into existing slots.

**For `gswin-erp-migration`:** no change. The page is already visually heavy (ERM animation, timeline donut, before/after, 1 gallery image + mood image).

**Generalize:** add a `useEmptyStateHero` boolean derived from `!moodImageUrl && !youtubeUrl && !processDiagramUrl && galleryUrls.length < 3` inside `DefaultProjectTemplate`. If true, the impact-stats strip goes into the hero `children` slot. False → no change. This way, any future image-light project inherits the same treatment.

---

## 8. File Changes Summary

### 8.1 Modify

| Path | What changes | Reason |
|---|---|---|
| `src/content/portfolio.types.ts:41` | Widen `category` enum to 6 role badges + `Archive` (remove `Enterprise`, `Side`, `Branding`, `Motion`, `Web`) | §5.1 |
| `src/content/portfolio-enterprise.ts` | Change `category` on 6 projects per §2.1; update `oneLiner`/`subtitle` per §4.2 | §2 + §4 |
| `src/content/portfolio-creative.ts` | Change `category` on 11 projects per §2.1; update `oneLiner`/`subtitle` per §4.2 | §2 + §4 |
| `src/content/landing-copy.json` | `hero.chips`, `hero.availableTooltip`, `hero.description`, `stats` array, `coreCapabilities.items[].body` | §3.2 |
| `src/content/home.ts:13` | `identitySubtitle` | §3.2 |
| `src/lib/hero-words.ts:16–26` | Replace 10 entries with 8 role-aligned words | §3.2 |
| `src/app/(site)/projects/page.tsx:18–26, 157` | `CATEGORIES` array + `CATEGORY_ICON` map | §5 |
| `src/app/(site)/projects/[slug]/page.tsx:32` | Widen `category === 'Motion'` check to `category === 'Motion & 3D'` | §5 |
| `src/components/landing/NextGenStartPage.tsx:15, 447–454` | Remove `AccountRequestBand` import + JSX block | §6.2 |
| `src/components/projects/DefaultProjectTemplate.tsx` | Add `AccountRequestBand` slot for projects with `accountRequestEndpoint` (§6.3); add `useEmptyStateHero` derived flag + impact-stats strip in hero `children` (§7.3) | §6 + §7 |
| `src/components/landing/HeroSection.tsx` | (No structural change; verify the `HERO_WORDS` 8-word list and the `chips` / `availableTooltip` strings still render cleanly) | §3 sanity check |

### 8.2 Create
None.

### 8.3 Delete
None.

### 8.4 Documentation (per AGENTS.md, doc-in-code only)

Every modified function gets a fresh `#schema:` block. New slot in `DefaultProjectTemplate` (`AccountRequestBand` slot) gets a docstring with a `#schema:` block. The `category` enum change in `portfolio.types.ts` already has a docstring at the top of the file — update the description.

**Per AGENTS.md, do not write architecture documentation to other `.md` files. This plan is the human "why" doc. The code (with `#schema:` blocks) is the system "what" doc.**

---

## 9. Implementation Order

1. **Types first** — widen `category` enum in `portfolio.types.ts:41`. This unlocks all 17 project edits and the `CATEGORIES` array.
2. **Project data** — apply §2.1 mapping + §4.2 copy in `portfolio-enterprise.ts` and `portfolio-creative.ts`. The type system will catch missed renames.
3. **Filter sidebar** — `projects/page.tsx` + `[slug]/page.tsx` per §5. Visible immediately at `/projects`.
4. **Hero copy** — `landing-copy.json`, `home.ts`, `hero-words.ts` per §3.2. Visible immediately at `/`.
5. **Tracklistify migration** — remove from `NextGenStartPage.tsx`, add to `DefaultProjectTemplate.tsx` per §6. Test on `/projects/tracklistify`.
6. **Empty-state hero** — add `useEmptyStateHero` flag + impact-stats strip per §7.3. Test on `/projects/automation`.
7. **Build & verify** — `npm run build` → 0 errors, 0 warnings. `npm run dev` → smoke test all 17 project pages, `/projects` filter, `/` homepage, and `/projects/tracklistify` access band.
8. **Doc-in-code pass** — update `#schema:` blocks in every modified file.

---

## 10. Acceptance Criteria

After implementation:

1. `npm run build` → 0 errors, 0 warnings.
2. `/`:
   - [ ] Hero chips read: "UX/UI Design" · "Product Design" · "AI-Native Builder".
   - [ ] Availability tooltip reads: "Open to Product Designer, UX/UI Designer, UX Lead & Product Owner roles."
   - [ ] Hero description opens with "AI-Native Product Designer." and contains no "Exploring what happens when" hedge.
   - [ ] Rotating words cycle through 8 entries: Product Designer, UX/UI Designer, Product Owner, UX Strategist, Design Lead, AI-Native Builder, Full-Stack Designer, Motion Designer.
   - [ ] Stats are 4 cards with concrete numbers (10 → 20, ~150 h, 3 products, ~80%).
   - [ ] No `<AccountRequestBand>` anywhere on the homepage.
3. `/projects`:
   - [ ] Sidebar has 7 chips: All, UX/UI Design, Product Design, Strategy & Process, Visual & Branding, Web & CMS, Motion & 3D, Archive.
   - [ ] Filter counts match the §2.1 distribution.
   - [ ] No "Enterprise" or "Side" or "Branding" or "Motion" labels anywhere on the page.
4. `/projects/tracklistify`:
   - [ ] `<AccountRequestBand variant="full" />` renders below the hero with AI context on the left, form on the right.
   - [ ] Form submits to `/api/request-access/tracklistify`.
   - [ ] "Case Study" link points back to the same page (no change, but check it doesn't 404).
5. `/projects/automation`:
   - [ ] No broken image, no "no image" placeholder.
   - [ ] ProjectHero shows the gradient + radial fallback (intentional).
   - [ ] Impact stats ("PDD: 37 pages" / "4h per expert per week" / "10 experts") render above the fold inside the hero or just below it.
6. `/projects/gswin-erp-migration`: no change in behavior; visual weight unchanged.
7. All other 14 project pages: render with new `oneLiner` and new badge label in the project card.
8. `prefers-reduced-motion: reduce`: hero rotating word is static.
9. Mobile: filter sheet shows the same 7 chips.
10. Light + dark mode: chip text readable in both.

---

## 11. Risk & Open Questions

### 11.1 Resolved (per earlier grilling — May 2026 session)

- **Badge system** → 6 role badges + Archive, mapped to master profile CV variants.
- **One badge per project** → confirmed.
- **SAP automation treatment** → show no image, promote impact stats above the fold (§7.3).
- **Tracklistify access band** → move from home to detail page (§6).

### 11.2 Still open (decide before or during implementation)

1. **`identitySubtitle` wording** — proposed `'Product Design · UX/UI · AI-Native'`. Alternative: `'UX/UI · Product Design · AI-Native'`. Order matters for the visual scan path. Default to the proposal.
2. **Stats array** — concrete numbers (10→20, ~150h, 3 products, ~80%) come from `master_profile.md:67–72`. Verify with user that the **scope** of the stat matches what they want to highlight (e.g. "Story Points 10→20" requires a 8020 context, not a portfolio-wide claim). If user wants portfolio-wide claims only, swap the 8020-specific stat for "9+ years, M.Sc. 1.3".
3. **Should the new role badges have a color treatment?** Default: no, keep the existing text-only treatment. If user wants subtle role colors, add a single `role` variant to `badge.tsx` (see §5.2) and a `CATEGORY_ICON` + `CATEGORY_ACCENT` map.
4. **The two CV variants with no portfolio project** (`XR & Research (EN)`, `Motion & Digital Production (DE)` is covered by 1 project). The user can still apply for those roles with their `general.tex` + `motion.tex` CVs — the portfolio just doesn't show a dedicated case study. If they want a "Research / VR" project added, that's a follow-up.
5. **Long-form case studies (kovon, strategic-ai-consulting, deinespanndecke)** — out of scope per §4.3. Flag for a future "case study pass."
6. **`scout:homepage` wording for `chips` and `availableTooltip`** — propose 2 alternatives during implementation, let user pick.
7. **`accent` color in `cover-letter.tex:12` and `general.tex:10`** uses `HTML{0D9488}` (teal). If the portfolio site's primary teal matches, no action. If it doesn't, this is a future CV ↔ portfolio consistency pass (out of scope for this plan).

### 11.3 Voice reference (locked)

From `master_profile.md:252–260`:
- Direct and structured, not flowery.
- Shows genuine research into the company.
- Connects personal experience to specific job requirements.
- Self-confident but humble.
- Includes salary expectation and availability naturally.
- 1 page, no filler.
- Opens with a personal observation about the company, not a generic intro.

Every new copy line in §3 and §4 was checked against this checklist. If a line feels marketing-y on review, it gets cut or rewritten.

---

## 12. Build & Verify

```bash
npm run build         # 0 errors / 0 warnings
npm run dev           # smoke test all 17 project pages + / + /projects + /projects/tracklistify
```

After build, doc-in-code rule: update each function's `#schema:` block in its docstring. Per `AGENTS.md`, do not write to other `.md` files for architecture — code is the source of truth.
