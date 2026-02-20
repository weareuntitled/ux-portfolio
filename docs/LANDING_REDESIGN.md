# Landing Page Redesign for Recruiters

## 1. Component Outline

### Above the fold (1440x900 target)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Hero (2-col grid)                                              │
│            │  ┌─────────────────────────────┬─────────────────────────────┐  │
│            │  │ LEFT COLUMN                 │ RIGHT COLUMN                 │  │
│            │  │ • H1 name                   │ At a glance card stack      │  │
│            │  │ • H2 role + subtitle        │ ┌─────────────────────────┐ │  │
│            │  │ • Value prop (1 sentence)   │ │ Experience (compact)    │ │  │
│            │  │ • CTA: View Projects        │ │ • 8020: Jul 2022, promo │ │  │
│            │  │ • CTA: Case Studies         │ │ • smartpatient: 2016     │ │  │
│            │  │                             │ └─────────────────────────┘ │  │
│            │  │                             │ ┌─────────────────────────┐ │  │
│            │  │                             │ │ Education (compact)     │ │  │
│            │  │                             │ │ • MSc THI 1.3, 2022-24   │ │  │
│            │  │                             │ │ • BSc THI, 2014-19       │ │  │
│            │  │                             │ └─────────────────────────┘ │  │
│            │  │                             │ [Specialization accordion]  │  │
│            │  └─────────────────────────────┴─────────────────────────────┘  │
│            │  Proof chips (4 chips, tight spacing)                            │
│            │  Quick jump: Featured projects | Experience | Education           │
│            └──────────────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────────────────────┘
```

### Section order (below fold)

1. Hero (2-col, compact)
2. Proof chips + Quick jump
3. Featured projects
4. Product focus (chip-based accordion, collapsed)
5. Career transition (accordion, collapsed)
6. Experience (full section)
7. Education (full section)
8. Footer

---

## 2. Implementation Guidance

### Hero section

**Container:**
- Replace `min-h-[85vh]` with `min-h-[calc(100vh-8rem)]` or `min-h-[560px] md:min-h-[520px]` for compact fit
- Use `grid md:grid-cols-2 md:gap-8` for 2-column layout on desktop
- Padding: `px-6 py-6 md:px-10 md:py-8 lg:px-12`

**Left column:**
- `flex flex-col justify-center`
- H1: `text-3xl sm:text-4xl md:text-5xl` (smaller than current)
- H2: `text-lg md:text-xl`
- Subtitle: `text-base md:text-lg`
- Value prop: `text-sm md:text-base text-white/90 max-w-md`
- CTAs: `flex flex-wrap gap-2 pt-4`
- Hide top nav on `md:` (use `hidden md:hidden` or conditional)

**Right column (At a glance):**
- `space-y-3`
- Card: `rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm p-4`
- Experience list: `text-sm`, one line per entry with company, role, date
- Education list: `text-sm`, one line per degree
- Specialization accordion: `Accordion` from shadcn, `defaultValue=""` (collapsed)

**Mobile:**
- Single column, stack left then right
- Keep minimal top row: logo/name + hamburger + single CTA (Book Call or View Projects)

### Proof chips

- Wrap in `section` with `py-4 md:py-3` (tighter than current)
- Chips: `gap-2 md:gap-3`, `py-2 md:py-2.5`
- Add Quick jump row below: `flex flex-wrap gap-4 justify-center text-sm` with anchor links

### Product focus (replacement for radar)

**Option B (chip-based):**
- Use `Accordion` collapsed by default
- Trigger: "Product focus"
- Content: 6–8 chips in 2–3 groups, e.g.:
  - Design: Figma, Design Systems, UX research, Enterprise UI
  - Process: Jira, Confluence, Scrum
  - Tech: React basics, AI workflows
- No chart, SSR safe

### Career transition

- Move below Featured projects
- Wrap in `Accordion` with `defaultValue=""` (collapsed)
- Lazy-load chart only when accordion opens (dynamic import with `ssr: false`)

### Project cards

- Add outcome line: use `project.outcomes?.[0]` or `project.impact?.[0]?.label`
- Display below one-liner: `text-xs text-muted-foreground` with first outcome
- Keep role line visible

### Spacing between sections

- Hero to proof: `space-y-4` or `gap-4`
- Proof to projects: `space-y-6`
- Use `space-y-12 md:space-y-16` for major section breaks below fold

---

## 3. Acceptance Criteria Checklist

### Above the fold (desktop 1440x900)

- [ ] Name and role visible without scroll
- [ ] All 4 proof chips visible
- [ ] Experience timeline (8020 start, promotion, smartpatient) visible
- [ ] Education (MSc, BSc) visible
- [ ] Primary CTA (View Projects) visible
- [ ] Secondary CTA (Case Studies) visible
- [ ] At most a small hint of Featured projects (e.g. section heading) at bottom

### Layout

- [ ] Hero uses 2-column grid on desktop (md+)
- [ ] Left column: headline, positioning, value prop, CTAs
- [ ] Right column: At a glance card with Experience, Education, Specialization accordion
- [ ] Specialization accordion is collapsed by default
- [ ] No hero top nav on desktop (sidebar provides nav)
- [ ] Mobile: minimal top row (menu + single CTA)

### Content

- [ ] All proof numbers kept (3 shipped tools, 500+ users, 80h saved, reduced audit prep)
- [ ] No invented facts
- [ ] No long em dashes in text
- [ ] Project cards show role and one outcome line

### Sections

- [ ] Quick jump row under proof chips with anchors: Featured projects, Experience, Education
- [ ] Featured projects is first content section after hero + proof
- [ ] Product focus is chip-based (no radar chart) or compact bars in accordion
- [ ] Product focus accordion collapsed by default
- [ ] Career transition below Featured projects, accordion collapsed by default
- [ ] Experience and Education full sections remain

### Performance

- [ ] No heavy client-only chart above the fold
- [ ] Career chart deferred until accordion opened (dynamic import)
- [ ] Minimal layout shift
- [ ] Consistent card heights where applicable

### Style

- [ ] Dark theme preserved
- [ ] shadcn/ui components used
- [ ] Tailwind utility classes
- [ ] No long em dashes
