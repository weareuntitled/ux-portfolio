# Plan: Hero + Career Redesign (Matt Ahrens Pattern)

**Date:** 2026-06-03
**Goal:** Replace current flip-word + strikethrough hero with editorial hero in the style of mattahrens.design. Add a clean, Matt-style career list. No full-site rebuild — surgical swap of the hero and addition of a career section.

---

## 1. Goal & Non-Goals

### Goal
- Editorial hero: one flowing sentence, with a rotating word that gets a "prismatic burning glass" effect.
- Clean career section in Matt Ahrens style (flat list, no card grid, no thumbnails).
- Wire it into the existing home page without breaking other sections.
- Keep the build clean (0 errors, 0 warnings, no dead imports).

### Non-Goals (YAGNI)
- No real WebGL/MSDF text rendering — CSS-only "burn" via layered blur + gradient + mix-blend-mode.
- No 3D text geometry, no SDF atlases, no shader pipeline.
- No new design tokens — reuse existing primary / foreground / muted / border from `globals.css`.
- No new section between Career and ProjectShowcase beyond what's in scope.
- No changes to other landing components (ClientLogos, AboutTools, etc.).

---

## 2. Reference Pattern (mattahrens.design)

Pattern, not code:

```
Top-left:   Logo as type (Matt**Ahrens**)
Top-center: Role + location, mono, 2 lines
Top-right:  About · Contact (text links only)

Hero (1 flowing sentence, 5 typographic blocks):
  "Hey! I'm"
  "Matt Ahrens,"        ← biggest, the visual anchor
  "a"
  "ux designer"
  "living in Brooklyn."

Below hero: One paragraph of bio copy.
Then: Section headings (same scale as hero blocks) + content sections.

Project list (the "clean" thing):
  [Category] [Title] [Description] [Year] [Company]
  No card, no thumb, no hover scale — just text on rows.
```

What we keep, what we change:

| Reference | Daniel version |
|---|---|
| Static "ux designer" | Rotating slot: ux designer, Producer, Sushi cook, Mate addict, ui designer, product designer, AI Coder |
| No effect on words | Prismatic burning glass on the rotating word |
| Static project list | Static career list (the part we steal wholesale) |
| Bio paragraph | We can keep ours short or drop it entirely if the hero carries enough |

### 2.1 The Liquid-Burn Effect (live scan of mattahrens.design via Chrome console)

Confirmed computed styles from `framer-vjqe97` and children on the live site:

```
Hero wrapper  (framer-17aiphr, 944×983, y=73)
  bg: linear-gradient(142deg, rgb(0,0,0) 0%, rgb(0,0,0) 100%)  ← solid black
  position: relative

Liquid container  (framer-vjqe97, 944×983, absolute, z=auto)
  filter: contrast(50)                            ← the gooey boundary maker
  mix-blend-mode: screen                          ← glow against the black bg
  background: linear-gradient(148deg,
    rgb(189,242,255) 0%,                          ← cyan
    rgb(188,158,220) 100%)                        ← lavender
  position: absolute

Three main lens elements inside the contrast container:
  • LEFT black blob  (framer-wmij49, 382×389, x=-329, y=456)
      filter: blur(45px), background: rgb(0,0,0), translateY(-194px)
  • CENTER bright lens  (framer-1dy0vfa, 656×668, x=143, y=316)
      filter: blur(30px),
      background: linear-gradient(346deg,
        rgb(252,233,207) 0%,                      ← warm peach
        rgb(255,255,255) 100%)                    ← white
  • RIGHT black blob  (framer-n6domq, 382×389, x=891, y=456)
      filter: blur(45px), background: rgb(0,0,0), translateY(-194px)

Icon ticker running through the lens center  (framer-xdg1o4, 944×300, y=500)
  filter: blur(16px) on the container, then SVG icons in a horizontal marquee
  Position: absolute, sits over the bright center lens
```

The "burning glass" comes from the interaction:
- Bright gradient + screen blend against pure black = bright "lit" base
- 2 black blur circles at the sides + 1 bright blur circle in the center
- `filter: contrast(50)` on the parent sharpens the boundaries between the lit gradient and the dark blobs into organic, liquid edges
- This creates three glowing "lenses" in a row — dark / bright / dark — that look like burning glass pearls

The ticker of icons flows horizontally through the bright center lens — that's the "Brennglas in der Mitte" the user described.

### 2.2 Reveal animation

The page boots into a black state, then the liquid container fades in. On live site this is a Framer Motion entrance animation. We replicate with:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.96 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: EASE }}
>
  {/* liquid layer */}
</motion.div>
```

A subtler reveal: the center bright lens "ignites" first (scale 0→1, opacity 0→1) at `delay: 0.2s`, then the side black blobs at `delay: 0.4s` — mimicking the inverted-then-revealed flash the user described.

---

## 3. Existing Surface to Reuse

- Fonts: `--font-display` (Manrope), `--font-sans` (Inter), `--font-mono` (IBM Plex Mono) — set in `src/app/layout.tsx:13-25`.
- Motion tokens: `EASE`, `DUR`, `SPRING` from `@/lib/motion` (already used everywhere).
- Reduced-motion: `useReducedMotion()` from `framer-motion` is the project standard.
- Colors: HSL tokens in `src/app/globals.css:90-176` — `--primary`, `--foreground`, `--muted-foreground`, `--ring`, `--shadow-color`. No new tokens.
- Existing wiring: `src/components/landing/NextGenStartPage.tsx:9` already imports `{ HeroSection }`. We only need to rewrite the implementation, not the import.

---

## 4. File Changes

### 4.1 Create
| Path | Purpose |
|---|---|
| `src/components/landing/CareerSection.tsx` | Matt-style flat career list |
| `src/lib/hero-words.ts` | Typed word list for the rotating slot |

### 4.2 Modify
| Path | What changes |
|---|---|
| `src/components/landing/HeroSection.tsx` | Full rewrite. Editorial sentence, `LiquidBurnBackground` (3 main lenses + 7–8 ambient blur circles + cursor follow), `IconTicker` running through the center, rotating word with prismatic burn, no pill/avatar/webgl/strikethrough. |
| `src/components/landing/NextGenStartPage.tsx` | Add `<CareerSection />` after `<HeroSection />` (or wherever fits the current flow — see §7). |
| `src/app/globals.css` | Add `@keyframes prismatic-shift` and `@keyframes liquid-gradient` (the gradient sweep inside the contrast container). No new design tokens. |

---

## 5. Component Architecture

### 5.1 `src/lib/hero-words.ts`

```ts
/**
 * Rotating slot list for the hero. Each word carries its own hue identity
 * so the prismatic-burn effect shifts color when the word changes.
 * #schema:
 * {
 *   type: "module",
 *   exports: ["HERO_WORDS", "HeroWord"],
 *   module: "hero-words.ts"
 * }
 */
export interface HeroWord {
  /** Display text */
  label: string;
}

export const HERO_WORDS: readonly HeroWord[] = [
  { label: 'ux designer' },
  { label: 'Producer' },
  { label: 'Sushi cook' },
  { label: 'Mate addict' },
  { label: 'ui designer' },
  { label: 'product designer' },
  { label: 'AI Coder' },
] as const;
```

(We dropped the `hue` field — the prismatic gradient is animated via `@keyframes prismatic-shift` and uses theme tokens, not per-word hues. Keeps the file simple and lets the gradient flow continuously across word changes.)

### 5.2 `src/components/landing/HeroSection.tsx`

Public surface (same name, so no import changes):

```tsx
export function HeroSection(): JSX.Element
```

Internal state:
- `wordIndex: number` — current slot
- `isTransitioning: boolean` — for the blur cross-fade
- `mouseX, mouseY: MotionValue<number>` — for cursor follow on the liquid layer
- `liquidRef: RefObject<HTMLDivElement>` — for the mousemove listener

Behavior:
- On mount, `wordIndex = 0`
- `useEffect` cycles `wordIndex` every `4_000ms` (or `prefers-reduced-motion` → static)
- Random next index, but not the same as current
- Each word-change: trigger the cross-fade animation (see §8)
- `onMouseMove` on the section sets `mouseX`/`mouseY` to normalized 0–1 position; `useSpring` smooths and `useTransform` maps to a ±20–30px translation on the liquid layer

Layout (one column, asymmetric, top of viewport):

```
<section>
  <LiquidBurnBackground />             ← absolute fill, z-0, the 3-lens effect
  <IconTicker />                       ← absolute, z-10, runs through center

  <p>Hey! I'm</p>                                  ← small, leading
  <h1>Daniel Peters,</h1>                          ← biggest
  <h2><PrismaticWord current={HERO_WORDS[wordIndex]}/></h2>  ← big + effect
  <p>livin' in augsburg.</p>                       ← medium
  <p>Music lover by night. Creative explorer by day.</p>  ← small
</section>
```

Constraints:
- `min-h-[88vh]` is fine to keep — the editorial style still wants a tall hero.
- `WebGLGradientBackground` — **remove** for this hero. Pure type on the liquid background.
- `FlipWord3D`, `HandDrawnStrikethrough`, the availability pill, the avatar circle, the handle+location row — **all remove**.
- Profile image can move down to the existing `AboutSection` (it's already there at `src/components/landing/AboutSection.tsx:41`).
- Hero text wrapper has `position: relative; z-index: 20;` so it sits above the liquid layer and the ticker.
- Keep the bottom edge gradient border for visual continuity with what comes after.

### 5.3 `LiquidBurnBackground` (internal subcomponent)

The "burning glass" layer. CSS-only, no WebGL.

Structure:

```tsx
function LiquidBurnBackground() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 15, mass: 1 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 15, mass: 1 });

  // Reduced motion: pin the spring to 0.5 (the rest value)
  const springStiffness = reduceMotion ? 0 : 40;
  const springDamping  = reduceMotion ? 0 : 15;

  // Map 0–1 to ±25px translation on the whole layer
  const groupX = useTransform(smoothX, [0, 0.5, 1], [-25, 0, 25]);
  const groupY = useTransform(smoothY, [0, 0.5, 1], [-25, 0, 25]);

  useEffect(() => {
    if (reduceMotion) return;
    const el = sectionRef.current?.parentElement;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top)  / r.height);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [reduceMotion, mouseX, mouseY]);

  return (
    <div
      ref={sectionRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.div
        className="absolute"
        style={{
          inset: '-80px',            // bleed past the edges so the blur doesn't clip
          x: groupX,
          y: groupY,
        }}
      >
        {/* THE CONTRAST CONTAINER — black bg + contrast(50) + screen + gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(148deg, hsl(195 80% 60%) 0%, hsl(270 70% 65%) 50%, hsl(320 75% 60%) 100%)',
            backgroundSize: '200% 200%',
            filter: 'contrast(50)',
            mixBlendMode: 'screen',
            animation: 'liquid-gradient 12s ease-in-out infinite',
          }}
        >
          {/* Center bright lens (the "Brennglas") */}
          <div
            className="absolute rounded-full"
            style={{
              width: 656, height: 656,
              left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'linear-gradient(346deg, rgb(252,233,207) 0%, rgb(255,255,255) 100%)',
              filter: 'blur(50px) saturate(1.4)',
              mixBlendMode: 'screen',
            }}
          />
          {/* Left black lens */}
          <div
            className="absolute rounded-full"
            style={{
              width: 382, height: 382,
              left: '15%', top: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgb(0,0,0)',
              filter: 'blur(50px)',
            }}
          />
          {/* Right black lens */}
          <div
            className="absolute rounded-full"
            style={{
              width: 382, height: 382,
              left: '85%', top: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgb(0,0,0)',
              filter: 'blur(50px)',
            }}
          />
          {/* Ambient blur circles for the gooey boundary richness */}
          {AMBIENT_CIRCLES.map((c, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: c.size, height: c.size,
                left: c.x, top: c.y,
                transform: 'translate(-50%, -50%)',
                background: c.color,
                filter: `blur(${c.blur}px)`,
                mixBlendMode: 'screen',
                opacity: c.opacity,
              }}
              animate={{
                x: [0, c.dx, 0],
                y: [0, c.dy, 0],
                scale: [1, c.scaleTo, 1],
              }}
              transition={{
                duration: c.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: c.delay,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
```

Keyframe for the gradient sweep:

```css
@keyframes liquid-gradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

The 5–8 ambient circles are a config array at the top of the file (`AMBIENT_CIRCLES`), each with its own size, color, blur, float path, and duration. Their colors are blue / cyan / violet variants of the existing theme's chart tokens.

### 5.4 `IconTicker` (internal subcomponent)

A horizontal marquee of SVG icons running through the center of the burning glass. Lives at `z-index: 10` so it sits on top of the liquid layer but below the text.

```tsx
function IconTicker() {
  const ICONS = [/* 6–8 simple SVG icons, monochrome */];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-10"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    >
      <div className="flex w-max animate-marquee items-center gap-16 opacity-40">
        {[...ICONS, ...ICONS].map((Icon, i) => (
          <Icon key={i} className="h-12 w-12 text-foreground" />
        ))}
      </div>
    </div>
  );
}
```

Reuses the existing `animate-marquee` keyframe from `src/app/globals.css:33-36`. No new CSS needed.

### 5.5 `PrismaticWord` (internal subcomponent)

Two stacked text layers, same word, both with `background-clip: text`:

```tsx
function PrismaticWord({ word }: { word: HeroWord }) {
  return (
    <span className="relative inline-block">
      {/* Layer 1: blurred halo (the "burning glass" aura) */}
      <span
        aria-hidden
        className="absolute inset-0 select-none"
        style={{
          background: `linear-gradient(90deg,
            hsl(${word.hue} 95% 65%),
            hsl(${(word.hue + 60) % 360} 95% 70%),
            hsl(${(word.hue + 180) % 360} 95% 65%),
            hsl(${word.hue} 95% 65%))`,
          backgroundSize: '200% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          filter: 'blur(14px) saturate(2.2)',
          mixBlendMode: 'screen',
          transform: 'scale(1.08)',
          animation: 'prismatic-shift 6s linear infinite',
        }}
      >
        {word.label}
      </span>
      {/* Layer 2: sharp top with hue-tinted glow */}
      <span
        style={{
          background: `linear-gradient(90deg,
            hsl(${word.hue} 90% 70%),
            hsl(${(word.hue + 90) % 360} 90% 72%))`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          filter: `drop-shadow(0 0 24px hsl(${word.hue} 95% 60% / 0.45))`,
        }}
      >
        {word.label}
      </span>
    </span>
  );
}
```

CSS keyframe in `globals.css` (add once, reuse):

```css
@keyframes prismatic-shift {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
```

Cross-fade between words (Framer Motion `AnimatePresence`):

```tsx
<AnimatePresence mode="wait">
  <motion.span
    key={wordIndex}
    initial={{ opacity: 0, y: 8, filter: 'blur(12px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -8, filter: 'blur(12px)' }}
    transition={{ duration: 0.45, ease: EASE }}
  >
    <PrismaticWord word={currentWord} />
  </motion.span>
</AnimatePresence>
```

Reduced motion: `useReducedMotion()` short-circuits — word index never advances, no blur, no animation.

### 5.6 `src/components/landing/CareerSection.tsx`

```tsx
export function CareerSection(): JSX.Element
```

Layout (mirror Matt Ahrens project list):

```
<section>
  <h2>Career</h2>
  <ul>
    {experienceTimelineDetailed.map(entry => (
      <li>
        <span class="category">/* logo + role */</span>
        <span class="title">/* headline */</span>
        <span class="meta">/* period · location */</span>
        <p>/* summary (optional reveal on hover) */</p>
      </li>
    ))}
  </ul>
</section>
```

Each row (final spec from in-session grilling — **Matt-style flat list, no logos, no expand**):
- Top: `entry.period` (mono, small, muted-foreground) — left aligned.
- Middle: `entry.headline` (semibold) — the role.
- Bottom: `entry.company` · `entry.location` (small, muted) — context.
- Row separator: `border-b border-border/40`.
- Hover: subtle background tint `hover:bg-accent/20`, no expand, no summary reveal.
- Mobile: same single-column stack, no special layout.

No logos in this section (the logos live in the existing `ExperienceTimelineSection`, which is used on the CV page; the home page gets the cleaner flat version).

Data source: `experienceTimelineDetailed` from `src/content/home.ts:38` — no new copy.

---

## 6. Data Flow

```
HERO_WORDS (hero-words.ts) ──► HeroSection (local state: wordIndex)
                                  ├── LiquidBurnBackground (3 lenses + 7–8 ambient, cursor follow)
                                  ├── IconTicker (icons in horizontal marquee)
                                  └── AnimatePresence + PrismaticWord
                                       (wordIndex change triggers cross-fade)

experienceTimelineDetailed (home.ts) ──► CareerSection
                                            └── Flat rows: period / headline / company · location
```

No prop drilling, no context, no async data.

---

## 7. Page Wiring

`src/components/landing/NextGenStartPage.tsx` already imports `HeroSection` at line 9. Add the new import and render the new section right after the hero (find the hero render and place CareerSection below it — likely in the same outer container or as the next sibling section).

```tsx
import { CareerSection } from '@/components/landing/CareerSection';
// ...existing imports
// ...after the existing <HeroSection /> JSX:
<CareerSection />
```

Do not move or wrap them — keep the visual order Hero → Career → ProjectShowcase.

---

## 8. Animation & Timing Spec

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Word cross-fade (in) | opacity 0→1, y +8→0, blur 12px→0 | 450ms | EASE |
| Word cross-fade (out) | opacity 1→0, y 0→-8, blur 0→12px | 350ms | EASE |
| Word cycle interval | — | 4000ms | — |
| Prismatic gradient loop | background-position 0%→200% | 6000ms | linear |
| Hero text fade-up on load | y +20→0, opacity 0→1 | DUR.lg (700ms) | EASE |
| Stagger between hero blocks | 80ms each | — | — |
| Career row enter (whileInView) | y +12→0, opacity 0→1 | DUR.md (500ms) | EASE |
| Career row stagger | 80ms per item | — | — |

`prefers-reduced-motion: reduce`:
- Word index does not advance (static first word).
- All transitions → 0ms.
- Prismatic keyframe → paused.

---

## 9. Accessibility Checklist

- [ ] PrismaticWord has readable contrast in both light and dark mode (the gradient must stay ≥ 4.5:1 against the page background, or wrap a fallback `text-foreground` for the actual text content under the visual).
- [ ] Rotating word has `aria-live="polite"` on a visually hidden status, or `aria-hidden` on the visual and a screen-reader-only static label (`role="text"` + `<span class="sr-only">Daniel Peters is a ux designer, ui designer, product designer, questionable cook, graphic designer, cat dad.</span>`).
- [ ] No keyboard trap, focus order preserved.
- [ ] All animations respect `useReducedMotion()`.
- [ ] CTAs are real `<a>` / `<Link>`, not divs.
- [ ] Color tokens only, no hardcoded hex in the new components.

---

## 10. Acceptance Criteria

Run after implementation:

1. `npm run build` → 0 errors, 0 warnings.
2. Open `/` in browser:
   - [ ] No flip-word animation, no strikethrough.
   - [ ] No "available" pill, no avatar in hero, no WebGL gradient.
   - [ ] Hero reads as one sentence: "Hey! I'm Daniel Peters, an [rotating word] shipping from Augsburg ⇄ Munich."
   - [ ] Rotating word cycles every ~4s through all 6 entries.
   - [ ] Rotating word has visible prismatic gradient + glow.
   - [ ] Each word has a slightly different hue identity.
   - [ ] Hero is tall (≥ 88vh) and editorial.
   - [ ] Career section renders below hero.
   - [ ] Career rows show logo + headline + period + location.
   - [ ] Career rows have subtle hover state.
3. Toggle `prefers-reduced-motion: reduce` in DevTools:
   - [ ] First word is static, no cycling.
   - [ ] No blur, no prismatic motion.
4. Mobile (≤ 640px):
   - [ ] Hero sentence still flows, no overflow.
   - [ ] Prismatic word still readable.
   - [ ] Career rows stack cleanly.
5. Light + dark mode:
   - [ ] Prismatic word has good contrast in both.
   - [ ] No white-on-white or invisible text.
6. Lint: `npm run lint` (if configured) → 0 issues. Otherwise eyeball.
7. `#schema:` block on `HeroSection`, `PrismaticWord` (internal, can be skipped if too small), `CareerSection`, and the exported const in `hero-words.ts`.

---

## 11. Risk & Open Questions

### 11.1 Resolved (15 questions, all answered)

From the final in-session grilling (one question at a time, my recommendation first):

1. **Hero copy structure** → **B: Matt-Layout**. Five typographic blocks stacked: `Hey! I'm` (small) / `Daniel Peters,` (large bold) / `[rotating word]` (large, prismatic) / `livin' in augsburg.` (medium) / `Music lover by night. Creative explorer by day.` (small).
2. **Word-length layout shift** → **C: Shift erlaubt**. Container passt sich an — passt zum organischen Matt-Feeling. Kein `min-w`, kein Placeholder.
3. **Light-mode behavior** → **B: `multiply` in light mode**. `mix-blend-mode: screen` in dark, `mix-blend-mode: multiply` in light. Farben passen sich an. Hero bleibt optisch konsistent.
4. **3 Lenses Position** → **A: 50%/centered**. Center x=50%, Left x=20%, Right x=80%. Alle auf gleicher Y-Höhe (50%).
5. **Reveal animation** → **B: Center ignites first**. Center-Lens wächst von scale 0→1, opacity 0→1 (0.8s). Side-Lenses expandieren danach nach außen (delay 0.2s).
6. **Cursor follow intensity** → **A: Subtil (±15px)**. Sanftes Folgen, max. ±15px. Professionell, nicht ablenkend.
7. **Icon ticker** → **B: 12 Custom SVGs**. 12 simple monochrome SVG-Shapes (Stern, Plus, Tropfen, Smiley, Mond, Sonne, etc. — wie bei Matt). Velocity 30s, blur 16px, opacity 40%, Y-Position 60%.
8. **Ambient circles placement** → **B: Outside the 3 lenses**. Konzentriert in den Lücken zwischen den Lenses + an Rändern. Diagonal-Muster, 200-350px Größe.
9. **Word cycling** → **A: Random (no repeat)**. `Math.random()` next index mit `while`-Schleife gegen Wiederholung. Wie aktuelle Codebase.
10. **Career layout** → **A: Stacked (Matt-Style)**. Eine Spalte pro Row: Period (mono, klein) oben, Headline (semibold) mittig, Company · Location (klein, muted) unten.
11. **Prismatic technique** → **A: Halo + sharp (CSS only)**. Zwei Layer: Glow-Halo (blur(14px) + mix-blend-mode: screen) + sharp top. Reines CSS, kein WebGL, kein per-char animation.
12. **Performance strategy** → **B: Reduce on low-end**. Check `navigator.hardwareConcurrency` — wenn ≤ 4, weniger ambient circles. Robuste Lösung.
13. **Word cycle interval** → **A: 4s (current)**. Bewährt, 28s für vollen Cycle durch alle 7 Wörter.
14. **Career heading** → **B: 'Experience'**. Konsistenz mit bestehender `ExperienceTimelineSection` auf CV-Page.
15. **Career section position** → **A: Nach Hero, vor ClientLogos**. Matt-Layout. Direkt nach Hero, vor Trust-Signals.

### 11.2 Still open (handle during implementation)

- **Prismatic readability in light mode** → solved by decision #3 (multiply). No further action.
- **Word-length layout shift** → solved by decision #2 (Shift erlaubt). No further action.
- **Three main lens vs eight ambient** → solved: 3 structural lenses (left/center/right) + 7-8 ambient (in the gaps, decision #8). Total 10-11 elements in the contrast container. Documented in §5.3.

### 11.3 Acceptance for the Liquid-Burn specifically

After implementation, the hero must visibly:
1. Show three glowing "lenses" in a row (dark, bright, dark) on a black background.
2. The bright center lens must look like it's burning — peachy/white, blurred, screen-blended (or multiply in light mode).
3. Edges between lit gradient and black blobs must be organic/liquid (contrast(50) effect), not hard.
4. The whole layer must drift **subtly** toward the cursor — ±15px max, smooth not snappy.
5. The gradient background must slowly shift hue (keyframe animation).
6. The icon ticker (12 custom SVGs) must run through the center lens, blurred and semi-transparent.
7. Center lens "ignites" first on load (scale 0→1, 0.8s), side lenses expand after (delay 0.2s).
8. 7-8 ambient blur circles distributed in the gaps between the 3 main lenses, not overlapping them.
9. Random word cycling with no-repeat guard, 4s interval.
10. Word-length shift is allowed (container resizes).
11. On `prefers-reduced-motion: reduce`: spring pins to rest, ambient circles stop, gradient stops shifting, ticker stops, word cycling stops — but the visual itself remains visible.
12. On `navigator.hardwareConcurrency` ≤ 4: render fewer ambient circles (4 instead of 7-8).

### 11.4 Acceptance for the Career section

After implementation:
1. Section appears directly after Hero, before ClientLogos.
2. Heading reads "Experience".
3. Each row stacks: period / headline / company · location.
4. 4 rows from `experienceTimelineDetailed` (8020.eco, Untitled-ux, Kontrast Festival, smartpatient).
5. No logos, no expand, no summary.
6. Row separator: `border-b border-border/40`.
7. Hover: subtle background tint.
8. Responsive: same single-column stack on mobile.

---

## 12. Build & Verify

```bash
npm run build     # must be 0 errors / 0 warnings
npm run dev       # manual smoke test
```

After build, the doc-in-code rule applies: update each function's `#schema:` block in its docstring to reflect the new signature/behavior. Per `AGENTS.md`, do **not** write to other `.md` files for architecture — code is the source of truth.
