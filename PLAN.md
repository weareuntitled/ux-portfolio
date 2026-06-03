# Plan: Blue/Light Color Refit + Hero Improvements

## Ziel

Design-Farben von Lime/Teal auf Hell/Blau umstellen, Hero verbessern, alle Unterseiten konsistent halten.

---

## Vollständige Audit-Ergebnisse

**122+ hardcodierte Color Issues in ~35 Dateien** gefunden.

### Kategorien:
| Kategorie | Anzahl |
|-----------|--------|
| Hex colors (`#0f0f12`, `#0d0d0d`, `#111`, etc.) | 15 |
| Chart/svg hex (data-driven) | 12 |
| `rgba()` in shadows/gradients | 22 |
| Tailwind emerald/green/lime/teal | 11 |
| Tailwind red/orange (destructive) | 6 |
| Tailwind blue/violet | 9 |
| Tailwind amber/yellow | 4 |
| Tailwind zinc (dark backgrounds, ~9 files) | ~30 |
| Tailwind neutral | 4 |
| Tailwind slate (light mockups, ~8 files) | ~12 |
| `bg-white` / `text-white` hardcoded | 12 |
| Sonstige inline styles | 5 |

---

## Ablauf (4 Tiers)

### Tier 1 — Fundament & Hero ✨
*Design Tokens, globale Assets, Hero-Verbesserung*

| # | Datei | Änderung |
|---|-------|----------|
| 1 | `src/app/globals.css` | Alle HSL Tokens Lime→Blue, Kommentare |
| 2 | `public/mesh-bg.svg` | Lime-Blob Farben → Blue-Blob Farben |
| 3 | `src/components/landing/HeroSection.tsx` | Glow hinter Flip-Word, Typographie-Hierarchie, blaue Akzente |
| 4 | `src/components/landing/WebGLGradientBackground.tsx` | Shader Farben: neutral → blue tints |
| 5 | `src/components/landing/AccountRequestBand.tsx` | Lime radial → Blue radial |
| 6 | `src/components/motion/ExpertiseSectionMotion.tsx` | Lime drop-shadow → Blue drop-shadow |
| 7 | `src/components/project/ProjectHero.tsx` | Lime radial → Blue radial |

### Tier 2 — Landing Page Konsistenz
*Gleicher Viewport, hartcodierte `#0f0f12` → CSS Tokens*

| # | Datei | Änderung |
|---|-------|----------|
| 8 | `src/components/landing/NextGenStartPage.tsx` | `#0f0f12` → `bg-card`, `text-white` → `text-foreground` |
| 9 | `src/components/landing/AboutToolsSection.tsx` | `#0f0f12` → `bg-card`, `text-white` → `text-foreground` |
| 10 | `src/components/landing/ProjectShowcase.tsx` | `#0f0f12` → `bg-card` |
| 11 | `src/components/ui/ScrollLockGallery.tsx` | `#0f0f12` → `bg-card` |
| 12 | `src/components/ui/SimpleGallery.tsx` | `#0f0f12` → `bg-card` |

### Tier 3 — Andere Seiten
*Contact, Projects, CV, Motion*

| # | Datei | Änderung |
|---|-------|----------|
| 13 | `src/components/contact/ContactWebGLBackground.tsx` | Lime → Blue in Shadern |
| 14 | `src/components/projects/DefaultProjectTemplate.tsx` | emerald/amber → primary/chart |
| 15 | `src/components/ui/badge.tsx` | emerald/violet/amber/blue → primary/accent/chart |
| 16 | `src/components/ProjectProblemWorkflowSolution.tsx` | emerald → primary |
| 17 | `src/components/PortfolioKit.tsx` | green/red/yellow → primary/destructive/chart |
| 18 | `src/components/MacBookFrame.tsx` | `#0d0d0d` etc. → bg-surface Variablen |
| 19 | `src/components/CaseStudyHero.tsx` | `#111` → bg-card |
| 20 | `src/components/CaseStudyTechnicalSpecs.tsx` | `#0a0a0a` → bg-card, neutral→muted |
| 21 | `src/app/(site)/cv/page.tsx` | `#0f0f12` → bg-card |
| 22 | `src/app/(site)/projects/page.tsx` | `#0f0f12` → bg-card |
| 23 | `src/app/(site)/motion/page.tsx` | `#0f0f12` → bg-card, `rgba(0,0,0,0.4)` → shadow-color |
| 24 | `src/app/(site)/motion/CaseStudiesSection.tsx` | `rgba(0,0,0,0.4)` → shadow-color |

### Tier 4 — FFP Prototypes & Enterprise Mockups
*Isolierte Prototypen, geringere Priorität*

| # | Datei | Änderung |
|---|-------|----------|
| 25 | `src/ffp-dashboard/FFPTable.tsx` | `text-green-500` → `text-primary` |
| 26 | `src/ffp-dashboard/FFPDetailPanel.tsx` | `bg-green-900/30` → `bg-primary/30` |
| 27 | `src/lib/ffp-dashboard/mock-data.ts` | teal/green badges → blue badges |
| 28 | `src/ffp-prototype/reporting/news-sidebar.tsx` | `bg-green-500` → `bg-primary` |
| 29 | `src/app/(site)/prototypes/ffp/diagnose/page.tsx` | `text-green-500` → `text-primary` |
| 30 | `src/components/PrototypeShell.tsx` | slate → CSS Variablen |
| 31 | `src/components/EnterpriseTopBar.tsx` | slate/white → CSS Variablen |
| 32 | `src/components/EnterpriseSideNav.tsx` | slate/white/blue → CSS Variablen |
| 33 | `src/components/EnterprisePageShell.tsx` | slate → CSS Variablen |
| 34 | `src/components/DataTablePanel.tsx` | slate/white → CSS Variablen |
| 35 | `src/components/MentionsPanel.tsx` | slate/white → CSS Variablen |
| 36 | `src/components/KovonOperationsMock.tsx` | slate/white/blue → CSS Variablen |
| 37 | `src/components/ProjectQuickViewDialog.tsx` | `focus:ring-blue-500` → `focus:ring-ring` |
| 38 | `src/components/CareerStream.tsx` | zinc → CSS Variablen |
| 39 | `src/components/FfpProjectContent.tsx` | zinc → CSS Variablen |
| 40 | `src/components/kovon/VSystemDiagram.tsx` | zinc → CSS Variablen |
| 41 | `src/components/automation/VsystemKlevelsSection.tsx` | red/blue/orange → destructive/chart |
| 42 | `src/components/KLevelStack.tsx` | red/orange → destructive/chart |
| 43 | Diverse Projekt-Komponenten (Quote, DeliveryImpact, etc.) | zinc → CSS Variablen |

---

## Build

```bash
npm run build   # 0 Errors, 0 Warnings
```
