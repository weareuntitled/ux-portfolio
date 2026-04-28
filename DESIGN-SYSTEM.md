# Design System — Untitled-ux Portfolio

Single source of truth for all visual decisions, spatial rules, and component patterns.

---

## 1. Color & Surface

| Token | Value | Use |
|-------|-------|-----|
| Background base | `#000000` / `hsl(222 18% 8%)` | Page background |
| Surface layer | `#0f0f12` / `bg-[#0f0f12]` | Containers, cards |
| Accent (lime) | `#B7E654` / `hsl(84 85% 45%)` | Primary actions, highlights |
| Text hierarchy | `text-foreground` → `text-foreground/80` → `text-muted-foreground` → `text-muted-foreground/40` | Content layers |

**Rule:** Hierarchy comes from **depth and layering**, not color. Color is reserved for accent and state (hover, active, primary).

---

## 2. Z-Axis Elevation Model

Build depth through z-index, shadow, and blur — not borders or background color changes.

| Layer | z-index | Visual Effect | Use Case |
|-------|---------|---------------|----------|
| **0: Base** | `z-0` | None | Page background, static elements |
| **1: Floor** | `z-10` | `border-white/5` hairline | Sidebar, main containers |
| **2: Object** | `z-20` | `shadow-sm` (layered) | Project cards, standard UI elements |
| **3: Float** | `z-30` | `shadow-xl` + `backdrop-blur-md` | Tooltips, dropdowns, popovers |
| **4: Overlay** | `z-40` | `backdrop-blur-2xl` | Modals, full-screen dialogs |

**Example:**
```tsx
// Card on z-20 (Object layer)
<div className="relative z-20 rounded-2xl border border-white/5 bg-[#0f0f12] shadow-sm">
```

---

## 3. The 4px Grid

All spacing values **must be divisible by 4**. No exceptions.

| Scale | Tailwind Class | Pixels | Use Case |
|-------|---------------|--------|----------|
| **Atomic** | `p-1`, `p-2` | 4px, 8px | Icon ↔ text gaps, pill padding |
| **Component** | `p-3`, `p-4` | 12px, 16px | Button/input padding, card internal padding |
| **Container** | `p-6`, `p-8` | 24px, 32px | Section containers, card wrappers |
| **Gutter** | `gap-4` | 16px | Sidebar ↔ content separation |
| **Section** | `py-20`, `py-28`, `py-32` | 80px, 112px, 128px | Vertical rhythm between page sections |

**Anti-pattern:**
```tsx
// ❌ Magic numbers
<div className="px-5 py-7">  // 20px and 28px — not divisible by 4

// ✅ Correct
<div className="px-4 py-8">  // 16px and 32px — follows 4px grid
```

---

## 4. Typography System

### Hierarchy

| Level | Font | Weight | Tracking | Use |
|-------|------|--------|----------|-----|
| **Hero Headline** | Inter (via `--font-display`) | `font-bold` | `tracking-[-0.04em]` | Page/section hero titles |
| **Subheadline** | Inter | `font-semibold` | `tracking-tight` | Section headings |
| **Body** | Inter | `font-normal` | `tracking-normal` | Paragraph text |
| **Metadata labels** | IBM Plex Mono | `font-medium` | `text-[10px] uppercase tracking-widest` | Category badges, timestamps |
| **Data / Tables** | IBM Plex Mono | `font-medium` | `tabular-nums tracking-[0.02em]` | Numeric data that needs alignment |

### Editorial Contrast

**Bitcount italic** is reserved for **one use case only**: the rotating word in the hero headline. It creates intentional friction — editorial contrast against the solid Inter block.

**Rule:** Never use Bitcount for body copy, metadata, or UI elements. It's a punctuation mark, not a typeface.

---

## 5. Shadow System

Never use a single `shadow-md`. Always layer 3 shadows for realistic depth.

### Standard Card Shadow (z-20)
```css
box-shadow: 
  0 1px 1px rgba(0, 0, 0, 0.1),
  0 2px 2px rgba(0, 0, 0, 0.1),
  0 4px 4px rgba(0, 0, 0, 0.1);
```
Tailwind equivalent: `shadow-sm` (pre-configured)

### Elevated Hover Shadow
```css
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
```
Tailwind: `shadow-[0_20px_40px_rgba(0,0,0,0.4)]`

**Pairing rule:** Elevated shadow **always pairs** with `translateY(-4px) scale(1.01)`.

---

## 6. Elevated Hover — Interactive Cards

All clickable cards (project cards, links, thumbnails) must "move toward the user" on hover.

### Standard Pattern
```tsx
<Link 
  href="/projects/example"
  className="
    block rounded-2xl border border-white/5 bg-[#0f0f12]
    transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]
    hover:translate-y-[-4px] hover:scale-[1.01] 
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
  "
>
```

**Critical:** Duration is `400ms` (not 300ms, not 500ms). Easing is `cubic-bezier(0.2, 0.8, 0.2, 1)` — fast entry, smooth settle.

---

## 7. Blur-as-Depth Rule

Backdrop blur signals distance to the user. More blur = closer to the user.

| Layer | Blur | Rationale |
|-------|------|-----------|
| `z-10` (sidebar) | `backdrop-blur-sm` | Far from user, subtle separation |
| `z-20` (cards) | None | Clear content, no obstruction |
| `z-30` (dropdowns) | `backdrop-blur-md` | Floats above content, needs separation |
| `z-40` (modals) | `backdrop-blur-2xl` | Isolates user from entire page |

**Example:**
```tsx
// Modal overlay (z-40)
<div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl">
```

---

## 8. Border Policy — No Visible Borders

**Rule:** Depth comes from elevation (shadow + blur), not borders. Borders are visual noise.

**Exceptions:**
1. **Structural hairlines** — when a 1px separator is truly needed for inner card structure: `border border-white/5`
2. **Input fields** — functional borders for form elements: `border border-white/5` at rest, `border-primary/30` on focus

**Anti-pattern:**
```tsx
// ❌ Visible decorative border
<section className="border-y border-border py-16">

// ✅ Use negative space (section gap) instead
<section className="py-16">
```

---

## 9. Negative Space Rule

If a UI section feels crowded or messy:
1. **Increase outer margin** to `32px+` (Tailwind: `my-8` or higher)
2. **Keep internal density tight** at `12px` (Tailwind: `gap-3`, `p-3`)

This creates "breathing zones" between sections while maintaining high information density inside each component.

**Example:**
```tsx
// Tight internal density
<div className="flex gap-3 p-3">
  {/* Icons, text, badges packed close */}
</div>

// Large outer margin for separation
<section className="my-20">
```

---

## 10. Motion & Interaction

### Easing
- **Primary ease:** `cubic-bezier(0.16, 1, 0.3, 1)` — fast-in, smooth-out
- **Hover ease:** `cubic-bezier(0.2, 0.8, 0.2, 1)` — balanced entry/exit

### Durations
| Action | Duration | Use |
|--------|----------|-----|
| Micro (button press) | `200ms` | Immediate feedback |
| Standard (card reveal) | `350ms` | Item animations |
| Section entrance | `500ms` | Scroll-triggered reveals |
| Hero entrance | `700ms` | Page-level hero text |
| Dramatic visual | `900ms` | Large images, 3D elements |

### Hover Transform Pattern
```css
transition: transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 400ms ease;
            
hover: translateY(-4px) scale(1.01)
```

---

## 11. Component Checklist

Use this before shipping any new component:

```
□ All padding/margin values divisible by 4?
□ No visible border outside of border-white/5 hairlines?
□ Shadow layered (3-level, never single)?
□ Interactive cards have hover elevation (translateY + scale + deep shadow)?
□ Backdrop blur matches z-index layer?
□ Headlines use tracking-[-0.04em] or tighter?
```

If any checkbox is unchecked, fix before commit.

---

## 12. Vibe Reference — "Apple Pro + Enterprise Density"

The target aesthetic balances two opposing forces:

| Apple Influence | Enterprise Influence |
|----------------|---------------------|
| Generous negative space | High information density |
| Minimal borders | Complex data tables |
| Fluid motion | Instant scan-ability |
| Consumer polish | Professional utility |

**The synthesis:** Clean surfaces with dense, structured content inside them. Never sacrifice data visibility for minimalism — but never let density become noise.

---

## 13. Typography Lock — Inter Only (except editorial contrast)

| Font | Use Case |
|------|----------|
| **Inter** | Headlines, subheads, body, UI text |
| **IBM Plex Mono** | Metadata, code, numeric data |
| **Bitcount italic** | **Only** the rotating word in hero headline |

Do not introduce new fonts. Do not use Bitcount for navigation, labels, or body text.

---

## 14. Optical Kerning for Headlines

Headlines must feel **solid**, not airy.

```tsx
// ❌ Default tracking (too loose for bold text)
<h1 className="text-5xl font-bold">Solving Complexity</h1>

// ✅ Negative tracking creates optical density
<h1 className="text-5xl font-bold tracking-[-0.04em]">Solving Complexity</h1>
```

For display sizes (`text-6xl` and up), consider `-0.05em` or tighter.

---

## 15. Data Table Rules

When displaying numeric data or tables:
1. Use `font-mono` for all numbers
2. Apply `tabular-nums` so digits align vertically
3. Increase tracking to `0.02em` to prevent digit collisions
4. Use hairline `border-white/5` for row separators, never full borders

```tsx
<td className="font-mono tabular-nums tracking-[0.02em] text-foreground">
  1,234
</td>
```

---

## 16. ScrollLock Gallery Pattern (New)

For hero galleries with 4+ images, use scroll-locked vertical progression instead of horizontal carousels.

**Behavior:**
- Outer wrapper height = `slides.length × 100vh` (creates scroll territory)
- Inner pane: `position: sticky; top: 0; height: 100vh;` (stays locked)
- Progress: scroll position 0→1 maps to slide index 0→N
- Transition: active slide fades + scales in; others fade out
- Side indicator: vertical pill of dots, active = lime, rest = white/20

**Mobile fallback:** Standard horizontal swipe carousel — scroll-lock is desktop-only (`hidden md:block`).

---

## 17. Project Card Tiers

Not all projects are equal. Visual hierarchy reflects importance.

| Tier | Layout | Projects | Style |
|------|--------|----------|-------|
| **Enterprise Featured** | Full-width, `aspect-[21/9]` | kovon, ffp-dashboard, emission-compliance, automation | Large title, overlay content, `border-white/5`, elevated hover |
| **Secondary** | 3-col grid, `aspect-video` | Side, Branding, Archive, Web | Compact, same hover pattern |

---

## 18. Animation Performance Rules

1. Animate `transform` and `opacity` only — these are GPU-accelerated
2. Never animate `width`, `height`, `top`, `left` — causes layout thrash
3. Use `will-change: transform` sparingly, only for active scroll-locked elements
4. Disable all animations when `prefers-reduced-motion: reduce` is set

---

## 19. Audit Process

Before merging any visual work:
1. Check one component against the 6-point checklist (Section 11)
2. If it passes, apply the same patterns to all similar components
3. Run a full-page scroll test — sections must have clear breathing zones (Section 9)
4. Verify hover states feel "physical" (Section 6)
5. Check mobile — scroll-lock patterns must degrade to swipe carousels

---

## 20. Creation Prompt (For AI-Assisted Development)

When generating new UI components, use this prompt:

> Handle as Senior Design Engineer with focus on Apple Human Interface Guidelines and Enterprise SaaS Architecture.
>
> **Task:** Create a [component name] based on portfolio data: Daniel Peters, M.Sc. UX Designer, Projects: KoVoN, Emission Dashboard, FFP Dashboard.
>
> **Spatial System (Mandatory):**
> - **No-Border Policy:** Use no visible borders (`border-none`), except 1px hairline with `border-white/5` for inner structure
> - **Z-Axis Elevation:** Create hierarchy purely through z-index and layering. Background is `#000000`, containers use `#0f0f12`
> - **4px Grid:** All paddings and margins must be multiples of 4 (e.g., `p-4`, `p-8`, `gap-12`)
> - **Optical Depth:** Use `backdrop-blur-xl` for floating elements (cards/popovers) combined with dual-layer shadow (`shadow-[0_4px_12px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.1)]`)
> - **Typography:** Use Inter. Headlines: `tracking-tighter font-bold`. Metadata: `font-mono text-[10px] uppercase tracking-widest`
>
> **Vibe:** Snappy, High-Density, High-End. Output must feel like a native Apple Pro App managing complex data.

---

## 21. Evaluation Prompt (Vibe Check)

Use this to audit existing components:

> Analyze the provided [code/screenshot] as Lead UX Architect. Evaluate the system against: **Spatial Logic, Enterprise Density, Apple Aesthetic**.
>
> **Checklist:**
> 1. **Grid Conformity:** Are all spacing values divisible by 4? Any magic numbers?
> 2. **Depth Logic:** Are shadows consistent with elevation? Does z-40 feel optically closer than z-10?
> 3. **Noise Reduction:** Are there unnecessary lines or visual dividers that could be replaced by whitespace?
> 4. **Micro-Typography:** Is letter-spacing on headlines too loose? (Should be negative for bold text)
> 5. **Enterprise Balance:** Is information density high enough for a professional user (Automotive/SaaS) without losing Apple minimalism?
>
> Provide concrete code changes (Tailwind classes) to improve the 'Spatial Vibe' by 20%.

---

## 22. Technical Implementation Notes

### Font Loading (already configured)
```tsx
// layout.tsx
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-display' });
const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600'], 
  variable: '--font-mono' 
});
```

### CSS Variables (globals.css)
```css
:root {
  --background: 222 18% 8%;
  --foreground: 0 0% 96%;
  --primary: 84 85% 45%;  /* Lime */
  --radius: 0.5rem;
}
```

### Framer Motion Tokens (lib/motion.ts)
```ts
export const EASE = [0.16, 1, 0.3, 1] as const;
export const DUR = {
  xs: 0.2,   // Micro
  sm: 0.35,  // Quick
  md: 0.5,   // Standard
  lg: 0.7,   // Hero
  xl: 0.9,   // Dramatic
} as const;
```

---

## 23. Forbidden Patterns

Never use these in the portfolio codebase:

| Pattern | Why | Alternative |
|---------|-----|-------------|
| `border-2`, `border-4` | Too heavy, creates visual noise | `border border-white/5` or elevation |
| `shadow-md`, `shadow-lg` (single) | Unrealistic, flat | Layered 3-shadow system |
| Decorative `border-t`, `border-b` on sections | Creates horizontal stripe noise | Section gap (`my-20`) |
| `tracking-wide` on headlines | Makes bold text feel loose | `tracking-tighter` or `tracking-[-0.04em]` |
| Random colors for hierarchy | Color should signal state, not depth | Use z-index + shadow + blur |

---

## 24. Commit Message Pattern

When committing design system changes:
```
feat(ui): [component] — apply spatial design rules

- Remove decorative borders (border-white/5 only)
- Add elevated hover (translateY + scale + shadow)
- Align spacing to 4px grid
- Update headline tracking to -0.04em

Refs: DESIGN-SYSTEM.md §2, §3, §4, §6
```

Reference the relevant section numbers so changes are traceable to the design system.

---

**Version:** 1.0  
**Last updated:** 2026-04-28  
**Owner:** Daniel Peters (@danielpeters)  
**Status:** Active — all new UI work must reference this document
