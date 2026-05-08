# Fragile Areas

Document understanding of what's fragile, evolving, and established in this codebase. Helps developers and agents work safely without breaking things.

**Last updated:** 2026-05-08
**Agent update protocol:** When you discover a new fragile/evolving/established pattern, add it to the appropriate section below.

---

## How to Work Safely

### Anti-Pattern Rules

1. **Never remove inner content from conditional renders** — When you see `{condition && (<section><InnerComponent /></section>)}`, the inner component is often the only thing doing the work. Removing it leaves the condition true but nothing visible.

2. **Avoid `motion.section` with `opacity: 0`** — If the motion animate prop never fires (reduced motion, viewport timing, unmount), content stays invisible. Prefer no animation or simpler approaches.

3. **Check both condition AND content** — When debugging "the section shows but nothing renders", verify: (a) the condition is truthy, (b) the inner content exists.

### Debugging Checklist

When something appears broken:

- [ ] Is the conditional truthy? (Check in React DevTools)
- [ ] Is there inner content that actually does the work?
- [ ] Is there a motion wrapper with opacity that might not be animating?
- [ ] Is the component imported correctly?

---

## By Layer

### Pages

| Page | Tier | Notes |
|------|------|-------|
| `/` (homepage) | Established | Stable structure, only content changes |
| `/projects` | Established | Simple grid + filter, no recent issues |
| `/cv` | Established | Static content, accordion pattern works |
| `/contact` | Established | Chat UI, unlikely to change |
| `/motion` | Established | Logo marquee + grid, stable |
| `/projects/[slug]` | Evolving | Has known gallery fragility, likely more changes |

### Components

| Component | Tier | Notes |
|-----------|------|-------|
| `DashboardCV` | Established | Core layout wrapper, variant system works |
| `TopNav` | Established | Simple, proven responsive behavior |
| `Breadcrumbs` | Established | Logic is stable |
| `ScrollLockGallery` | **Fragile** | Complex scroll behavior, easy to break |
| `KontrastPostsBento` | Evolving | Grid works but may need responsive tweaks |
| `TextMarqueeSection` | Established | Pure CSS animation, no motion dependency |
| `ProjectCard` | Established | Proven mobile/desktop variants |
| `ProjectFilters` | Established | Simple filter logic |

#### ScrollLockGallery — Fragile

```tsx
// This is the ONLY way gallery images render
{galleryThumbs.length > 0 && (
  <section>
    <div>Header</div>
    <ScrollLockGallery slides={...} /> {/* REQUIRED */}
  </section>
)}
```

Removing `<ScrollLockGallery>` leaves only the header visible while condition stays true.

#### DefaultProjectTemplate — Evolving

This template has the most recent changes and likely more coming. Be careful with conditional sections.

### Data Layer

| Area | Tier | Notes |
|------|------|-------|
| `portfolio.ts` | Established | Static data, well-structured |
| `gallery-map.json` | Established | Simple mapping, rarely changes |
| `project-assets.ts` | Established | Single utility, clear purpose |
| `content/projects/` | Established | Static files, no runtime logic |

The data layer is the most stable — pure data, no complex logic.

### Styling & Design System

| Area | Tier | Notes |
|------|------|-------|
| Tailwind config | Established | Standard, well-organized |
| shadcn/ui components | Established | Proven patterns |
| Color/spacing tokens | Established | Stable design decisions |
| `DESIGN-SYSTEM.md` | Established | Documented, no guesswork |

Design system is solid. Risk is new tokens being added inconsistently — but low risk.

### Animations

| Animation | Tier | Notes |
|-----------|------|-------|
| WebGL gradient | Established | Works, no recent issues |
| TextMarqueeSection | Established | Pure CSS, no motion dependency |
| 3D flip word | Established | Works, no breakage reports |
| Framer Motion wrappers | **Fragile** | Opacity:0 bugs, reduced motion issues |

#### Motion Opacity Bug — Fragile

```tsx
// Anti-pattern: can leave content invisible if animate never fires
<motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Content
</motion.section>
```

Fix: Remove motion wrapper or use simpler approach without opacity animation.

### Build & Config

| Area | Tier | Notes |
|------|------|-------|
| `next.config.ts` | Established | Standard config |
| TypeScript | Established | Clean, typecheck passes |
| ESLint | Established | Standard rules |
| Build pipeline | Established | Works reliably |

---

## Agent Update Protocol

When you discover a new pattern that is:

- **Fragile** — add to the appropriate component/page section with "Fragile" tier + explanation
- **Evolving** — add with "Evolving" tier + why it's evolving
- **Established** — add with "Established" tier + why it's stable

Include:
- File/location
- What makes it this tier
- Code snippet if relevant
- Anti-pattern rule if discovered

Update the "Last updated" date when making changes.