# Plan: Mobile Ghost-Bleed Gooey + Chromatic Aberration

**Date:** 2026-06-05
**Goal:** Bring the desktop "ghost bleed melt" effect to mobile by combining a CSS/ SVG gooey filter (metaball merge from the YouTube tutorial technique) with a lightweight chromatic aberration split, while staying within mobile GPU budget. Keep the desktop path untouched.

**Source of truth:** `src/components/landing/HeroSection.tsx` (the only file touched).

---

## 1. Goal & Non-Goals

### Goal
- Replace the current mobile "lite" branch (which strips ghost layers, melt layers, RGB ghosts, glass glare, blur, and `mix-blend-mode`) with a richer "mid-tier" mobile rendering that delivers:
  1. **Gooey metaball merge** — circles that look like they're melting into each other, driven by an inline SVG `<filter>` (`feGaussianBlur` + `feColorMatrix`) on the parent of the ghost circles.
  2. **Chromatic aberration** — 2 RGB offset copies of the main circle (and the icon watermark) in red/blue, light blur, low opacity, no `mix-blend-mode`.
- Hit ≥ 50 fps on iPhone 12 / Pixel 5 in DevTools mobile emulation, no jank on the marquee.
- Keep desktop rendering pixel-identical (zero changes to the non-`lite` branches).
- **No orbiting small circle.** The YouTube-tutorial "metaball orbit" trick (orbiting dot, attach/detach motion) is out of scope. The gooey filter on the 3 ghost layers carries the liquid motion on its own.

### Non-Goals (YAGNI)
- No new component file, no new dependency, no library swap (no `ogl`, no `three`, no `react-spring`). Pure SVG filter + CSS.
- No `mix-blend-mode` on mobile (the usual iOS Safari stutter culprit). Solid colors at low opacity are the chromatic-aberration substitute.
- No `deviceMemory` / hardware tier gating (Approach C in the brainstorm). Single mobile path, ships always.
- No new design tokens, no Tailwind config changes.
- No changes to the side circles (left/right `BurnCircle` instances) — they remain `lg+`-only, the mobile path only renders the center circle.
- No changes to the section-level `filter: contrast(120)` — desktop still uses it; mobile switches to SVG gooey.
- **The icon marquee stays.** Icons keep cycling through the center circle on mobile — same conceptual hook as desktop. The mobile `IconTicker.lite` keeps the `animate-marquee` translation, the `animate-lens-breathe` scale, and the circular clip. The previous "static row at opacity 0.08" approach is dropped.
- No new tests beyond visual smoke (see §6).

---

## 2. Architecture

### 2.1 Single file: `src/components/landing/HeroSection.tsx`
- Add one inline SVG `<filter id="hero-gooey">` near the top of the component, hidden via `style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}` so it doesn't take layout space.
- The filter is **scoped to mobile** — referenced only from the `lite` branch of `BurnCircles`. Desktop path doesn't touch it.
- The filter is applied to the **parent `<div>` of the ghost circles**, not the whole section. Applying globally would smear the prismatic outline and the H1.

### 2.2 The SVG filter definition
```
<filter id="hero-gooey">
  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
  <feColorMatrix in="blur" mode="matrix"
    values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 9 -4"
    result="goo" />
</filter>
```
- `stdDeviation="6"` — empirically chosen: high enough that adjacent circles merge, low enough that the blur stays GPU-cheap.
- `0 0 0 9 -4` in the alpha row of the color matrix. The matrix computes `α' = 9·α − 4`: when `α ≤ 0.44` the result is clamped to 0 (edges of the blur disappear), when `α ≥ 0.44` it ramps up to 1.0 (interior of the shape stays solid). Where two blurred shapes overlap, their alphas sum past the threshold and the `feColorMatrix` outputs a hard alpha — that's the metaball merge.
- **No `feBlend` re-stack.** An earlier draft of this plan added `<feBlend in="SourceGraphic" in2="goo" />` to put the original hard circle back on top of the merged blob. That hides the merge — the source is a hard circle, so the blur merge gets covered. Use the `goo` result directly. If we ever need the source back (we don't here), use `<feComposite operator="over" in2="SourceGraphic" />` instead of `feBlend`.
- **`9 -4` is the conservative start, not the final.** `14 -7` (in an earlier draft) was too aggressive — it produced hard binary edges that on mobile DPRs read as pixel-stepped. Start with `9 -4`. If the merge is too soft, push to `11 -5` or `13 -6`. Don't go past `14 -7`.
- These values will be tuned in §6.2 verification.

### 2.3 The `lite` prop becomes the "mid" path
- The boolean prop is still called `lite` to keep the diff minimal (and the call sites at HeroSection.tsx:872, 873 unchanged). The *body* of every `if (lite) { ... }` branch gets replaced.
- `isMobile` (line 771) continues to be the single source of truth for "is this mobile?" — no new breakpoint detection.
- The `reduceMotion` preference (`useReducedMotion()` already imported on line 4) gates the marquee animation via a new `prefers-reduced-motion` block in `globals.css` (see §4.6).

### 2.4 Why an SVG filter and not `filter: contrast(N)`?
- `filter: contrast(120)` on the section merges everything including text — works on desktop because text is small and dark, but mobile is the same merge-on-everything, which makes the icon watermark disappear into the background.
- An SVG filter on a **scoped parent** is the same metaball merge, but only on the elements we put inside it. Surgical, no fallback needed.
- SVG filters are GPU-composited in modern WebKit/Blink (the mobile browsers we target). Cheaper than 7 stacked absolutely-positioned blurred divs.

---

## 3. Ghost-Layer Rebuild (Mobile)

### 3.1 The current `lite` of `BurnCircles` (lines 366–402)
- 1 prismatic ghost layer (`animate-prismatic-shift` conic gradient at opacity 0.4)
- Outline (1px solid black)
- White interior (when `isOutlined`)

### 3.2 The new mobile ghost stack
Inside the `lite` branch, the center circle (size 240px) renders. **Stack order matters here** — RGB ghosts go *after* the white interior so they tint it, not the conic layers. The orbiting small circle is **out** (per Goal §1); the merge comes from the 3 conic ghost layers alone.

| # | Layer | What it is | Animation | Filter | Opacity | Visible when |
|---|---|---|---|---|---|---|
| 1 | Ghost A | Full circle, `PRISM_CONIC` background | `animate-prismatic-shift` + `animate-burn-glitch-1` | none (parent has gooey) | 0.6 | stage ≥ 1 |
| 2 | Ghost B | Same, offset `translate(-3px, 4px)` | `animate-prismatic-shift` + `animate-burn-glitch-2` | none | 0.45 | stage ≥ 1 |
| 3 | Ghost C | Same, offset `translate(4px, -2px)` | `animate-prismatic-shift` + `animate-burn-glitch-3` | none | 0.3 | stage ≥ 1 |
| 4 | Outline | 1px solid black border (with `OUTLINE` width when outlined, 1px otherwise) | static | none | 1.0 | stage ≥ 3 |
| 5 | White interior | white fill | static | none | 0.85 → 1 when `isOutlined` | stage ≥ 3 |
| 6 | RGB red | Inside `OUTLINE + 8px` inset, `rgb(200, 40, 50)` | `animate-burn-glitch-1` (subtle, see below) | `blur(2px)` | 0.3 | stage ≥ 3 |
| 7 | RGB blue | Inside `OUTLINE + 8px` inset, `rgb(40, 110, 230)`, offset `(2px, 2px)` from red | `animate-burn-glitch-2` (subtle, see below) | `blur(2px)` | 0.55 | stage ≥ 3 |

**Why RGB goes after the white interior, not before it.** The chromatic split on desktop only reads because the RGB ghosts sit over the white interior — the white provides the contrast the offset tints need. On the original mobile draft, the RGB was placed between the conic ghosts (layers 1–3) and the white interior. That meant the RGB was tinting the conic gradient, which is already a busy blue/black — the red and blue ghosts muddied into the conic and added nothing. By moving the RGB inside the white interior, the tint lands on a clean white and the chromatic split reads. RGB is hidden during stages 1–2 (no white interior yet) and fades in with the interior at stage 3 — same stage transition as the desktop version.

**Subtle animation on the RGB ghosts.** The chromatic aberration is in motion design usually animated (the "glitch" read) — a static offset is a lens defect, not a glitch. Layer the existing `animate-burn-glitch-1` / `burn-glitch-2` keyframes onto the two RGB copies (offset of `±1.5px` to `±2px` on each step). Cost: zero — same `transform: translate()` compositor path as the conic ghosts already use. Adds the "shimmer" feel that the static version was missing.

**Magnitudes and offsets.** Red offset `(-1.5px, -1.5px)`, blue offset `(1.5px, 1.5px)`. Magnitudes are ~50% of desktop's `circleMag` (9 → 4.5 here, but 1.5px visually is enough on a 240px circle) so the split is visible but not chaotic on small screens.

**Outline width.** Mobile uses `OUTLINE` (60px) when outlined, 1px otherwise — same as the desktop path.

### 3.3 Masking
- The ghost layers are still full circles (no `radial-gradient` ring mask) — mobile keeps the filled state the whole time, matching today's `lite` behavior. The "outlined" stage transition (lines 246–249) only applies to the desktop `BurnCircle` and stays out of the mobile path.
- This keeps the filter math simple: gooey merge only needs `feGaussianBlur` on solid shapes, no mask compositing.

---

## 4. Marquee Icons Through the Center Circle (`IconTicker.lite`)

### 4.1 The previous `lite` (lines 582–598) — *rejected*
- Static row of 12 icons at `h-6 w-6` (24px) and `opacity-[0.08]`, no marquee, no breathing, no ghosts.
- **Why it fails:** the marquee is the visual hook of the hero. On desktop, icons cycle through the center white circle giving the lens a sense of life. Stripping that on mobile reduces the hero to a still life — the page feels like the site is loading or broken. Don't ship it.

### 4.2 New mobile `IconTicker.lite` — marquee preserved, scaled for mobile

The marquee is structurally identical to the desktop path (lines 601–678), with three mobile-specific cuts:

| Property | Desktop | Mobile (new `lite`) | Why cut |
|---|---|---|---|
| Icon size | `h-96 w-96` (384px) | `h-16 w-16` (64px) | Center circle is 240px, not 560px |
| Unique icon count (curated by user) | 12 | **6** | Locked — see §4.7 below. The user provided 6 icons from SVG Repo (`~/Downloads/`, 2026-06-05). |
| Icon count in DOM (clones for seamless loop) | 60 (5× of 12) | **12 (2× of 6)** | Smallest count that keeps a seamless `translateX(-50%)` loop. Fewer than this and the row jumps at the end. |
| Gap | `56px` | `48px` (`gap-12`) | Tighter icon rhythm on small screens |
| Marquee duration | `90s` (180s on hover) | `24s` (no hover speedup — touch has no hover) | Mobile viewport passes an icon in ~1.9s; 24s keeps the angular feel |
| `animate-lens-breathe` scale | `1 → 1.035 → 1` over 5s | same | Cheap, GPU-only, gives the lens life |
| Circular clip | `overflow-hidden rounded-full` on parent (line comment at 565) | **required on mobile** — explicit `overflow-hidden rounded-full` on the marquee wrapper | Without it, icons render outside the 240px circle into the page margins |
| `drop-shadow` filter (line 619–623) | 4 stacked drop-shadows (merge halo) | **dropped on mobile** | 4 stacked drop-shadows are expensive; the gooey filter on the parent circle does the merge work instead |
| Layer count per icon | 5 (haze + 2 RGB + black ghost + main) | 3 (2 RGB + main) | Skip the wide haze and the black ghost; the gooey-filtered parent merges the colored ones |
| RGB blur | `iconBlur + 4` (≈6px) | none | Icons are 64px — blur at 6px would smear them. Offset alone reads as chromatic split at this size |
| Main icon opacity | 1.0 | 0.2 | Watermark feel — the marquee motion, not the icon detail, is the read |
| RGB ghost opacity | 0.55 (with `mix-blend: multiply`) | **0.5 per channel**, no `mix-blend` | Bumped from the original 0.45 — at 0.45 the chromatic split was below the visibility threshold over the conic background. 0.5 keeps the split readable. |
| RGB offset | `iconMag * dx/dy` (4px) | `2px` (50% of desktop) | Smaller icons, smaller offset — same visual proportion |
| RGB color | red TL, blue BR (`RGB_DIRS`) | same | Brand consistency across viewports |

### 4.7 The curated 6 icons (locked)

User-delivered set, 2026-06-05. All from **SVG Repo** (www.svgrepo.com) — free for commercial and non-commercial use, no attribution required, but we'll keep the `<!-- Uploaded to: SVG Repo, ... -->` source comment in each inline definition for traceability.

Source files in `~/Downloads/` (will be inlined into `HeroSection.tsx:14-84`, not loaded externally):

| # | Filename | Visual | Paths | viewBox | `fill` |
|---|---|---|---|---|---|
| 1 | `knight-svgrepo-com.svg` | Chess knight (silhouette) | 1 | `0 0 16 16` | `#000000` |
| 2 | `gem-svgrepo-com.svg` | Diamond/gem | 1 (with internal cutouts via `fill-rule: evenodd`) | `0 0 16 16` | `#000000` |
| 3 | `face-laugh-svgrepo-com.svg` | Laughing smiley (eyes + mouth cutouts) | 1 (with `fill-rule: evenodd` for the negative space) | `0 0 16 16` | `#000000` |
| 4 | `dna-svgrepo-com.svg` | DNA double-helix | 1 | `0 0 16 16` | `#000000` |
| 5 | `code-svgrepo-com.svg` | `</>` code brackets | 3 (slash + left bracket + right bracket) | `0 0 16 16` | `#000000` |
| 6 | `bee-svgrepo-com.svg` | Bee (body + stinger) | 2 (body with cutouts + stinger) | `0 0 16 16` | `#000000` |

**Two facts to flag before implementation**

1. **viewBox mismatch with desktop icons.** The 12 existing desktop icons use `viewBox="0 0 24 24"`. The new 6 use `viewBox="0 0 16 16"`. Both render at the same visual size when used as `h-16 w-16` (the viewBox is just an internal coordinate system), but the optical weight is slightly different — 16x16 paths appear denser per pixel. On mobile the icons are inside the 240px center circle, so the weight difference reads as a stylistic choice, not a bug. If we want exact parity with the desktop set, the 6 SVGs need to be rescaled to 24x24 (recompute path coordinates × 1.5). For the first cut, ship as 16x16 and revisit if the visual weight feels off in mobile DevTools.
2. **Inline storage.** The existing 12 icons are defined as `IconComp` function components in `HeroSection.tsx:14-84`. The new 6 follow the same pattern — copy the `<svg>` body, change `width="800" height="800"` to remove (or set to `100%`), and use `fill="currentColor"` instead of `fill="#000000"` so the icons inherit color from the `text-black` wrapper. That's how the existing icons do it (line 16, `fill="currentColor"`), and the new ones need the same treatment to participate in the chromatic split (where the RGB copies override the color).

### 4.3 DOM shape on mobile
- 1 outer wrapper (`overflow-hidden rounded-full`, contains the marquee, clipped to the center circle's bounding box — need to match the 240px circle exactly so the icons vanish cleanly at the edge).
- 1 inner `animate-marquee items-center` flex row.
- 12 wrapper divs (one per icon — 6 unique × 2 clones), each `relative shrink-0`.
- Per icon: 2 RGB copies (`absolute inset-0` with the offset transform) + 1 main icon. 3 elements × 12 icons = **36 icon DOM nodes**, plus the wrappers. Total ~50 nodes for the IconTicker on mobile (down from ~100 in the previous 24-icon draft).
- The conic-gradient ghost behind the icons is the center circle's layer 1 (table in §3.2), already part of the `BurnCircles.lite` stack. No new background needed.

### 4.4 Performance notes
- `animate-marquee` is `transform: translateX(...)` — GPU-composited, no layout/paint.
- The `animate-lens-breathe` scale on the parent is also `transform`-only.
- The 2 RGB copies per icon use `transform: translate()` (offset) — no animation on the offsets themselves (static, like the desktop copies' position). If we want subtle "shimmer," we can add `animate-burn-glitch-1` on each copy in a follow-up commit, but YAGNI for the first cut.
- No blur, no `mix-blend`, no `drop-shadow` — all three of the mobile-Safari stutter suspects are out.

### 4.5 Direction & brand consistency
- Red TL / blue BR matches `RGB_DIRS` (lines 138–141) exactly. The two viewports read as the same color grammar.
- Main icons stay `text-black` so the merge with the conic background stays monochromatic blue, fighting the "pink" problem the section header at line 109 calls out.

### 4.6 Reduced motion
- `prefers-reduced-motion: reduce` already kills `animate-marquee` only if we add a `prefers-reduced-motion` block in `globals.css` — currently the marquee has no such guard. **Add a new block** in `globals.css` (next to the existing `lens-breathe` block at line 196–200): `animation: none !important;` for `.animate-marquee` when `prefers-reduced-motion: reduce`.
- Result: reduced-motion users see the static row of icons at their current positions, no scroll, no breathe. The chromatic split is still there.

---

## 5. Performance, Error Handling, Edge Cases

### 5.1 GPU budget
- Total mobile "mid" stack:
  - **Center circle (`BurnCircles.lite`):** 7 layers (3 ghosts + 2 RGB + 2 structural outline/white). The orbiter is gone — the 3 conic ghost layers are what the gooey filter merges.
  - **Icon marquee (`IconTicker.lite`):** 12 icons × 3 layers (RGB red + RGB blue + main black) = **36 icon DOM nodes**, plus wrappers. Marquee animates the row with one `translateX`; the lens-breathe animates the parent with one `scale`. Two animations total, both `transform`-only.
- Compare to desktop: ~30 layers on the center circle + 60 icons × 5 layers (300 icon nodes) + 4 stacked drop-shadows. Mobile is roughly **1/5 the layer count** and drops all drop-shadows.
- All animated properties are `transform` and `opacity` — GPU-composited, no layout/paint thrash.
- The SVG gooey filter is **evaluated once per frame** on a small (240px) bounded region. Much cheaper than desktop's 7 blurred absolute divs at 560px.
- The marquee `translateX` runs on a single element (the inner flex row), not per-icon. Browsers composite the whole row on the GPU and only re-translate it per frame. Icon DOM stays static within the row.
- **The two continuous animations** (marquee `translateX` + lens-breathe `scale`) plus the 3 ghost layer CSS keyframes are what run every frame on mobile. The prismatic-shift and burn-glitch-1/2/3 are CSS keyframes on the 3 conic ghost layers — those are `transform`-only. The 2 RGB layer copies also get `animate-burn-glitch-1/2`, also `transform`-only. Total animated property count on mobile: 1 marquee + 1 lens-breathe + 3 ghost transforms + 2 RGB transforms = **7 transform animations per frame** on the circle, plus the 1 marquee `translateX` on the icon row. Should hold 60fps on iPhone 12+.

### 5.2 Reduced motion (`prefers-reduced-motion: reduce`)
- The `prismatic-shift` and `burn-glitch-1/2/3` animations already have a `prefers-reduced-motion` block in `globals.css` (lines 100–102) that disables them. Verified in §6.
- **Add** a `prefers-reduced-motion` block in `globals.css` for `.animate-marquee` (see §4.6) — currently the marquee has no such guard and would keep scrolling for users who opted out of motion.
- The lens-breathe already has a guard at lines 196–200 of `globals.css`.

### 5.3 Filter failure / unsupported browser
- If the browser doesn't support SVG filters (essentially no modern browser, but defensive), the parent div falls through to its un-filtered rendering — ghost layers show as overlapping circles. Visual regression but no crash. The CSS `filter: url(#hero-gooey)` is a no-op in that case; the DOM still renders.
- If the user has a content blocker that strips the `<filter>` (rare), same outcome: harmless visual fallback.

### 5.4 `isMobile` race
- `isMobile` is set via `useEffect` (line 771) and starts as `false`. On first paint, mobile users get the desktop path for one frame, then the `lite` branch takes over. This is the existing behavior (not a regression) — the breakpoint detection is good enough for a single-frame swap.

### 5.5 Window resize
- Same as today: no resize listener for `isMobile` (matches the current implementation). A user rotating from portrait to landscape on a tablet will keep the path they loaded with. Acceptable; not changing scope.

---

## 6. Testing

### 6.1 Visual smoke (manual, in DevTools)
- iPhone 12 emulation (390×844, DPR 2): confirm 3 ghost layers merge into a liquid blob; RGB split on the circle is visible at 1:1 zoom; **the icon marquee (12 icons: 6 unique × 2 clones) is visibly scrolling through the center circle and is clipped to the circle's bounding box** (no icons in the page margins).
- Pixel 5 emulation (393×851, DPR 2.75): same checks, plus a `Performance` tab recording — should hold ≥ 50fps with the marquee + lens-breathe + 3 ghost keyframes + 2 RGB keyframes all running.
- iPad Mini (768×1024) — this is `lg` breakpoint, so it should render the **desktop** path. Verify the mobile `lite` branch does NOT apply at this width.
- Desktop 1440px — desktop path unchanged, smoke check that the SVG filter doesn't bleed into the desktop DOM.

### 6.2 Real-device pass
- iPhone Safari (one device, if available) — the iOS Safari `mix-blend-mode` issue is moot here (we removed it), but confirm the SVG filter composites correctly in WebKit. **Specific risk to watch:** Safari's `feColorMatrix` alpha clamping can produce slightly different edge hardness than Chromium. Tune the matrix if the merge looks too soft or too pixelated.
- Android Chrome (one device) — the `feColorMatrix` alpha multiplier is the most likely thing to render differently; tune the matrix (start with `0 0 0 9 -4`, push to `14 -7` only if the merge is too soft) if the merge looks washed out.

### 6.3 Reduced motion
- macOS System Preferences → Accessibility → Display → Reduce motion: ON. Reload the hero. Confirm:
  - The **marquee is static** (icons frozen at their current scroll position).
  - **lens-breathe is off** (no scale pulse).
  - The **3 ghost layers still merge** (the gooey filter is a static visual, not motion).
  - The **chromatic split on the circle and icons is still there** (offsets are static by design).
  - The **RGB shimmer is off** (burn-glitch-1/2 on the RGB copies stops).

### 6.4 Playwright e2e — DOM-shape assertions (not pixel diff)
Add `e2e/mobile-hero.spec.ts`. **Assert DOM structure, not visual diff** (visual diff is flaky across renderer versions):

```ts
test('mobile hero has the ghost-bleed-gooey + chromatic structure', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12
  await page.goto('/');
  // The SVG filter def is mounted (component rendered past the isMobile swap).
  await expect(page.locator('filter#hero-gooey')).toHaveCount(1);
  // BurnCircles.lite: 3 ghost layers inside the filtered parent.
  const filtered = page.locator('[data-hero-gooey-parent]');
  await expect(filtered).toHaveCount(1);
  await expect(filtered.locator('[data-ghost-layer]')).toHaveCount(3);
  // 2 RGB copies on the center circle.
  await expect(filtered.locator('[data-rgb-ghost]')).toHaveCount(2);
  // IconTicker.lite: marquee wrapper exists, is clipped, contains 12 icon cells (6 unique × 2 clones).
  const marquee = page.locator('[data-icon-marquee]');
  await expect(marquee).toHaveCount(1);
  await expect(marquee).toHaveCSS('overflow', 'hidden');
  await expect(marquee.locator('[data-icon-cell]')).toHaveCount(12);
  // Each icon cell has 2 RGB copies + 1 main.
  for (let i = 0; i < 12; i++) {
    const cell = marquee.locator(`[data-icon-cell="${i}"]`);
    await expect(cell.locator('[data-rgb-ghost]')).toHaveCount(2);
    await expect(cell.locator('[data-icon-main]')).toHaveCount(1);
  }
});
```

Implementation note: this requires adding `data-*` attributes to the relevant elements during the commits in §9. That's the price of structural tests — worth it for the regression safety net.

### 6.5 Build verification (per AGENTS.md)
- `npm run lint` — 0 errors, 0 warnings.
- `npm run typecheck` — 0 errors.
- `npm run build` — 0 errors, 0 warnings. The `.next` cleanup + asset sync + gallery update scripts in `prebuild` and `build` will all run; nothing in this plan touches those code paths.

### 6.6 Regression check
- Desktop at 1440px: spot-check that the desktop path renders identically. The SVG filter is inside the `lite` branch and is referenced only by the `lite` parent div, so the desktop DOM is byte-identical. The new SVG `<filter>` def at the top of the component is hidden via inline style — no visual effect on desktop.

---

## 7. Out of Scope (Explicit)

- No WebGL version of the gooey filter. CSS+SVG is enough for the mobile budget; WebGL is a future-proofing rabbit hole.
- No animation of the chromatic aberration itself (no shimmering, no `mix-blend` light streaks). Static offset is the budget-conscious call.
- No `prefers-reduced-data` handling. The gooey filter is constant-cost; the data saving would be on icon SVGs, which are already inlined.
- No gooey filter on the icon marquee. The icons are already clipped to the center circle and animated via `translateX`; adding the SVG filter to the marquee parent would re-evaluate it per frame on a large composited area. The conic-gradient background of the center circle (under the icons) carries the merge. If a future iteration wants the icons themselves to melt, that's a follow-up plan.
- No hover speedup on the marquee. Mobile has no hover; the desktop's `isHovered ? 180s : 90s` is a desktop-only affordance.
- No shimmer/glitch animation on the RGB icon ghosts. Static offset is enough for the chromatic split to read at 64px. Adding `animate-burn-glitch-1` to 48 RGB copies (24 icons × 2) per frame is YAGNI for the first cut — flag as a follow-up in a comment.

---

## 8. Doc-in-Code Touchpoints

Per AGENTS.md, every modified function gets a `#schema:` block in its JSDoc.

- `BurnCircles` (line 357) — update the existing `#schema:` block to reflect the new `lite` body (was: "one CSS-animated ghost"; becomes: "SVG gooey parent + 3 ghost layers + outline + white interior + 2 RGB").
- `BurnCircle` (line 215) — leave the `#schema:` block alone; the `lite` branch inside it is unchanged structurally (still one ghost + outline + interior for the side circles, which don't render on mobile anyway — wait, side circles don't have a `lite` branch today; verify in implementation). **Re-read in implementation** and update accordingly.
- `IconTicker` (line 573) — update the `#schema:` block: `lite` branch keeps `animate-marquee` + `animate-lens-breathe` + circular clip; adds 2 RGB copies per icon (no blur, no `mix-blend`); **6 unique icons × 2 clones = 12 in DOM** at `h-16 w-16`; marquee `duration: 24s`; `drop-shadow` filter chain dropped.

The inline SVG `<filter id="hero-gooey">` def gets its own JSDoc block with a `#schema:` describing the filter primitive chain (input, output, expected browser support).

---

## 9. Implementation Order (Tight Commits)

1. **Commit 1:** Add the SVG `<filter id="hero-gooey">` def at the top of the component, hidden via inline style. No usage yet. Build green, lint green. (Smoke: desktop unchanged.)
2. **Commit 2:** Apply the filter to the `lite` branch's parent div in `BurnCircles` (add `data-hero-gooey-parent` attribute for the e2e test). Verify the existing 1-ghost layer merges with itself into a hard-edged blob. (Smoke: mobile hero shows a sharper, more defined circle.)
3. **Commit 3:** Add the 2 extra ghost layers (B + C) inside the filtered parent (add `data-ghost-layer` attribute). Verify they merge into a liquid blob. (Smoke: 3-layer merge is visible.)
4. **Commit 4:** Add the 2 RGB offset copies to the center circle (add `data-rgb-ghost` attribute). Verify chromatic split is visible. (Smoke: red TL, blue BR, tints the white interior not the conic background.)
5. **Commit 5:** Inline the 6 SVG Repo icons (knight, gem, face-laugh, dna, code, bee — see §4.7) as `IconComp` definitions in `HeroSection.tsx:14-84`, replacing the existing 12. Replace the 12-icon `TICKER_ICONS` array with a 6-icon array (in this order: knight, gem, face-laugh, dna, code, bee). Rewrite `IconTicker.lite` to keep the marquee + lens-breathe + circular clip. **12 icons in DOM (6 unique × 2 clones)** at `h-16 w-16`, gap-12, 24s marquee duration, `overflow-hidden rounded-full` on the marquee wrapper (add `data-icon-marquee` to the wrapper, `data-icon-cell` to each icon wrapper). (Smoke: icons visibly scroll through the center circle on mobile, are clipped to the circle.)
6. **Commit 6:** Add the 2 RGB offset copies to each mobile icon (add `data-icon-main` to the main black icon for test disambiguation). Verify the chromatic split reads on the icons. (Smoke: full mobile hero.)
7. **Commit 7:** Add the `prefers-reduced-motion` block in `globals.css` for `.animate-marquee`. (Smoke: macOS reduce-motion ON → marquee static, lens-breathe off, prismatic-shift + burn-glitch off, ghosts still merge, chromatic split still reads, RGB shimmer off.)
8. **Commit 8:** Add Playwright DOM-shape test (`e2e/mobile-hero.spec.ts`). (Smoke: `npm run test:e2e` passes against the new structure — 3 ghost layers, 2 RGB circle copies, 12 icon cells with 2 RGB + 1 main each, `overflow: hidden` on the marquee wrapper.)
9. **Commit 9:** Final `npm run lint` + `npm run typecheck` + `npm run build` — all green. Update `#schema:` blocks in JSDoc for `BurnCircles`, `IconTicker`, and the SVG filter def.

Total: 9 commits, each individually revertable, each with a clear smoke check.
