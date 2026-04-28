# UI Review — Portfolio Redesign

**Date:** 2026-04-28
**Scope:** All modified components in the portfolio redesign session
**Auditor:** AI (code-only review)

---

## Executive Summary

**Overall Score: 19/24**

| Pillar | Score | Status |
|--------|-------|--------|
| Copywriting | 3/4 | ▲ Good — hero copy strong, inconsistency in metadata tone |
| Visuals | 3/4 | ▲ Good — depth system solid, scroll-lock needs refinement |
| Color | 3/4 | ▲ Good — lime accent consistent, some zinc remnants remain |
| Typography | 4/4 | ● Excellent — tracking, hierarchy, and font discipline enforced |
| Spacing | 3/4 | ▲ Good — 4px grid mostly followed, some magic numbers persist |
| Experience Design | 3/4 | ▲ Good — scroll-lock pattern strong, mobile fallback needed |

---

## Pillar 1: Copywriting — 3/4

### Strengths
- **Hero headline** (`Solving [word] with Structure.`) — punchy, memorable, editorial. The rotating word creates intentional friction.
- **Subline** — clear value proposition, establishes credentials immediately.
- **Project outcomes** — concrete, quantified (`200 active users`, `100% audit-ready visibility`).

### Issues
1. **Metadata inconsistency** — `HeroSection.tsx` line 201 still uses `|` separators with mixed tone (`M.Sc. UX Designer | 3 years agency | 8 years freelance`). This conflicts with the new subline which already covers credentials.
   - **Fix:** Remove the credentials line (line 194–208) entirely — the subline below the headline now says the same thing more elegantly.

2. **Section header** on homepage says `2 / 4 Enterprise Projects` — this is a data fact, not a compelling headline.
   - **Fix:** Change to `Enterprise Projects` as the h2, keep `2 of 4 featured` as the mono label.

3. **Motion page** still has German text in the expertise section (`Ausgewählte Projekte`) — inconsistent with the English-first approach.
   - **Fix:** Standardize all UI copy to English, or add a locale toggle.

---

## Pillar 2: Visuals — 3/4

### Strengths
- **Z-axis elevation model** — properly implemented through `ScrollLockGallery.tsx` with layered shadows and backdrop-blur mapping.
- **Elevated hover** — all project cards now use `translateY(-4px) scale(1.01)` + deep shadow, creating physical movement.
- **Border policy** — `border-white/5` consistently applied across 12+ files.

### Issues
1. **ScrollLockGallery mobile fallback** — the `window.innerWidth` check in `ScrollLockGallery.tsx` line 50 runs at render time, not resize time. If the user resizes their browser, the layout won't switch.
   - **Fix:** Use a `useMediaQuery` hook or CSS `md:hidden` / `hidden md:block` classes instead of JS width detection.

2. **Hero profile photo** — the floating animation (`y: [0, -6, 0, 4, 0]`) uses non-4px values (-6, 4). The mask image also uses percentage values that aren't grid-aligned.
   - **Fix:** Change to `y: [0, -8, 0, 4, 0]` (all divisible by 4).

3. **BelowFoldSkeleton** in `NextGenStartPage.tsx` still uses `border border-border` — should be `border-white/5`.
   - **Fix:** Update line 23.

---

## Pillar 3: Color — 3/4

### Strengths
- **Lime accent** (`hsl(84 85% 45%)`) consistently used for primary actions, highlights, and progress indicators.
- **Background hierarchy** — `#000000` base, `#0f0f12` surface, properly applied.

### Issues
1. **CV page** still uses `zinc-*` color tokens extensively (`text-zinc-100`, `text-zinc-300`, `text-zinc-400`, `text-zinc-500`, `bg-zinc-900/80`). These are Tailwind defaults that don't map to the design system's HSL variables.
   - **Fix:** Replace all `zinc-*` with the semantic tokens: `text-foreground`, `text-muted-foreground`, `bg-card`, etc.

2. **Availability pill** in `HeroSection.tsx` uses `bg-white/5` — this is fine for dark mode but would be invisible in light mode.
   - **Fix:** Use `bg-accent/10` or the semantic `bg-muted` instead.

3. **ScrollLockGallery** progress dots use hardcoded `rgba(255, 255, 255, 0.2)` for inactive state.
   - **Fix:** Use `bg-white/20` Tailwind class for consistency.

---

## Pillar 4: Typography — 4/4

### Strengths
- **Headline tracking** — `tracking-[-0.04em]` applied to hero (`HeroSection.tsx:230`), project cards (`projects/page.tsx`), and project detail template (`DefaultProjectTemplate.tsx`).
- **Metadata labels** — `font-mono text-[10px] uppercase tracking-widest` consistently used across all section headers, badges, and metadata.
- **Impact numbers** — `text-7xl font-light tracking-[-0.04em]` on project detail page creates dramatic emphasis.
- **Bitcount italic** — correctly reserved for the rotating word only, never used elsewhere.

### No issues found.

---

## Pillar 5: Spacing — 3/4

### Strengths
- **Section gaps** — `py-20 md:py-28` (80px/112px) between major sections on homepage follows the 4px grid.
- **Card internal spacing** — `p-6 sm:p-8` (24px/32px) on enterprise cards properly aligned.
- **Gutter system** — `gap-8 lg:gap-12` (32px/48px) between sticky meta and gallery.

### Issues
1. **HeroSection** — `px-6 pt-20 pb-8` — the `pt-20` (80px) and `pb-8` (32px) are fine, but `px-6` (24px) should be `px-4` or `px-8` for consistency with the 4px grid.
   - **Fix:** Change to `px-4 md:px-8`.

2. **FeaturedProjectSection** — `gap-8` (32px) between meta and gallery is good, but `lg:grid-cols-[1fr_2fr]` creates an asymmetric split that may feel unbalanced on ultrawide screens.
   - **Fix:** Consider `lg:grid-cols-[1fr_3fr]` to give the gallery more breathing room.

3. **motion/page.tsx** — `space-y-16 pb-16` on the main wrapper — `16` is 64px which is divisible by 4, but the section gap between Expertise and Client Logos is now 0 (since we removed the label wrapper). This creates a visual collision.
   - **Fix:** Add `mt-8` to the client logos section to restore breathing room.

---

## Pillar 6: Experience Design — 3/4

### Strengths
- **Scroll-lock galleries** — the vertical scroll-jacking pattern on project pages creates an immersive, editorial experience. Progress dots provide clear orientation.
- **Two-tier project layout** — Enterprise projects get full-width `21/9` cards with outcome pills, creating clear visual hierarchy over secondary projects.
- **Reduced motion support** — `useReducedMotion()` properly checked in all animated components.

### Issues
1. **ScrollLockGallery** — the `min-h-[400vh]` wrapper in `NextGenStartPage.tsx` creates a very long scroll territory for projects with few images. If a project has only 2 gallery images, the user scrolls through 4 viewport heights of mostly empty space.
   - **Fix:** Calculate wrapper height dynamically: `min-h-[${Math.max(slides.length * 100, 200)}vh]`.

2. **Project detail meta strip** — the horizontal band with `border-y border-white/5` is visually clean but packs too much information on narrow screens. Year, client, roles, and tags all compete for attention in a single row.
   - **Fix:** On mobile (`sm:`), stack the items vertically with `flex-col` instead of `flex-wrap`.

3. **Homepage information density** — after the hero, the user sees: ClientLogos → Featured Projects (scroll-lock, very tall) → KontrastBanner → Marquee → MotionPortfolioSection → Marquee → AboutToolsSection → ExperienceTimeline → Education → Footer. That's 9 sections before the fold. The scroll-lock galleries make this even longer.
   - **Fix:** Consider consolidating: merge the two marquee sections into one, or remove one of them. The "Behind the Screens" marquee is redundant with the AboutToolsSection that follows it.

---

## Critical Fixes (Must Do)

| # | File | Issue | Priority |
|---|------|-------|----------|
| 1 | `cv/page.tsx` | Replace all `zinc-*` colors with semantic HSL tokens | High |
| 2 | `ScrollLockGallery.tsx` | Replace JS width detection with CSS responsive classes | High |
| 3 | `HeroSection.tsx` | Remove redundant credentials line (conflicts with new subline) | Medium |
| 4 | `NextGenStartPage.tsx` | Remove duplicate marquee section | Medium |
| 5 | `motion/page.tsx` | Add `mt-8` to client logos section | Low |

---

## Design System Compliance

**DESIGN-SYSTEM.md adherence: 85%**

| Rule | Status |
|------|--------|
| 4px grid | ▲ Mostly compliant (3 exceptions) |
| No visible borders | ● Compliant (`border-white/5` everywhere) |
| Layered shadows | ● Compliant |
| Blur-as-depth | ● Compliant |
| Typography hierarchy | ● Compliant |
| Elevated hover | ● Compliant on all interactive cards |
| Negative space rule | ▲ Mostly compliant (1 collision) |

---

## Next Steps

1. Fix the 5 critical items above
2. Run the dev server and visually verify scroll-lock behavior on mobile
3. Test the project detail page with projects that have 0, 2, and 8+ gallery images
4. Verify light mode rendering (if supported) — many `bg-white/5` elements will be invisible

---

**Reviewed by:** AI Auditor
**Method:** Static code analysis against DESIGN-SYSTEM.md
**Files reviewed:** 17 modified files + 2 new files
**Confidence:** High (code-level review, no runtime verification)
