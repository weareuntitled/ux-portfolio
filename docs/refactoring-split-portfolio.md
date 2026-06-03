# Refactoring: portfolio.ts splitten (779 → max ~300 Zeilen/Datei)

## Problem

- `src/content/portfolio.ts` ist **779 Zeilen** lang — zu groß für einen einzelnen File
- Type-Error im Build: `ribbonLabel` existiert nicht in `PortfolioProject` (kanonischer Type in `portfolio.types.ts` hat die Felder nicht, aber `portfolio.ts` nutzt sie in `gswin-erp-migration`)
- Hardcoded JWT-Token in `portfolio.ts:375, 379` (Sicherheits-Finding C-1)
- 7 Unused-Variable-Warnings in 4 Dateien

---

## Phasen-Übersicht

| # | Phase | Commits | Inhalt |
|---|---|---|---|
| 1 | Build-Fix | 1 Commit | Type-Error beheben |
| 2 | C-1 Security | 1 Commit | Token rotieren |
| 3 | Refactoring | 1-2 Commits | `portfolio.ts` aufteilen |
| 4 | Cleanup | 1 Commit | Unused-Variable-Warnings |

**Reihenfolge:** 1 → 2 → 3 → 4 (sequentiell, jeder Commit verifizierbar)

---

## Phase 1: Build-Fix (Type-Error)

**Datei:** `src/content/portfolio.types.ts`

`PortfolioProject`-Type um 3 fehlende Felder erweitern:

```typescript
export type PortfolioProject = Project & {
  impactCards?: ImpactCardItem[];
  caseStudy?: CaseStudySections;
  portfolioKit?: PortfolioKitData;
  kovon?: KovonConfig;
  // NEU:
  ribbonLabel?: string;
  ermAnimation?: { beforeCount: number; afterCount: number; label?: string };
  timelineDonut?: {
    segments: { label: string; value: number; color: string }[];
  };
};
```

**Datei:** `src/content/portfolio.ts`

Lokale doppelte Type-Definition (Zeilen 717–728) löschen. Der kanonische Type aus `portfolio.types.ts` wird dann von allen Consumern genutzt.

**Verifikation:** `npm run build` muss grün werden.

---

## Phase 2: C-1 Security (Token rotieren)

**Datei:** `src/content/portfolio.ts:375, 379`

Hartcodierten JWT-Token durch neuen rotierten Token ersetzen. Token bleibt als String (kein Env-Var, keine JSON-Auslagerung).

**Aktion:**
1. In Tracklistify-Backend neuen `read_only`-JWT generieren
2. Beide Vorkommen in `portfolio.ts` ersetzen (Zeile 375 + 379)
3. Beide Zeilen enthalten denselben Token → nur 1 Token-Wert

**Verifikation:** `npm run build` muss grün bleiben.

---

## Phase 3: Struktur-Refactoring

`portfolio.ts` wird in **3 Sibling-Files** aufgeteilt, alle ≤ 305 Zeilen.

```
src/content/
├── portfolio.types.ts            # Types (bleibt, +3 Felder aus Phase 1, ~195 Zeilen)
├── portfolio-enterprise.ts       # 6 Enterprise-Projekte, Case-Studies inline (~305 Zeilen)
├── portfolio-creative.ts         # 10 Non-Enterprise-Projekte, Case-Studies inline (~290 Zeilen)
└── portfolio.ts                  # Barrel + Helpers + Merge + Utilities (~130 Zeilen)
```

> **Wichtig:** `@/content/portfolio` bleibt der öffentliche Einstiegspunkt. Bestehende Importe brechen nicht.

### Case-Studies: inline im Projekt-Objekt (best practice)

Statt extrahierter Konstanten werden alle `caseStudy`-Felder direkt in den Projekt-Objekten inline definiert. Begründung:

- **Self-contained pro Projekt** — Lesen ohne Springnavigation zwischen Files
- **Konsistent** mit dem bereits inline vorhandenen `gswin-erp-migration`-Case-Study
- **TypeScript-Daten-Module** sind keine Business-Logic, Inlining ist idiomatisch
- Aktuell sind die Konstanten jeweils nur 5-18 Zeilen klein

### `portfolio-enterprise.ts` (~305 Zeilen)

| Projekt | ~Zeilen | Inline caseStudy? |
|---|---|---|
| kovon | 28 | ja (vorher `caseStudyKovon`) |
| automation | 36 | ja (vorher `caseStudyAutomation`) |
| emission-compliance | 24 | ja (vorher `caseStudyCaesar`) |
| ffp-dashboard | 27 | ja (`portfolioKit: ffpKit` bleibt im selben File) |
| strategic-ai-consulting | 39 | ja (vorher `caseStudyStrategicAi`) |
| gswin-erp-migration | 141 | bereits inline |
| **Total** | **~295** + Imports/Helper |

`ffpKit` und `kovonConfig` (PortfolioKit-Daten) bleiben in `portfolio-enterprise.ts` direkt vor ihren Projekten, da sie eng an diese gebunden sind.

### `portfolio-creative.ts` (~290 Zeilen)

| Projekt | Kategorie | ~Zeilen | Inline caseStudy? |
|---|---|---|---|
| architektur-ai | Side | 34 | ja (vorher `caseStudyArchViz`) |
| tracklistify | Side | 31 | ja (war schon inline `{summary: '...'}`) |
| fixundfertig | Side | 25 | ja (war schon inline) |
| 8020-portfolio | Motion | 25 | ja (war schon inline) |
| 3dprojects | Motion | 24 | ja (war schon inline) |
| samani-rebranding | Branding | 23 | ja (war schon inline) |
| kontrast-festival | Branding | 23 | ja (war schon inline) |
| aidelsburger | Branding | 22 | ja (war schon inline) |
| deinespanndecke | Web | 58 | ja (war schon inline) |
| arbeitsprobe2022 | Archive | 23 | ja (war schon inline) |
| **Total** | | **~288** | |

### `portfolio.ts` (Barrel, ~130 Zeilen)

- Importiert & re-exportiert aus `portfolio-enterprise.ts` und `portfolio-creative.ts`
- Re-exportiert `PortfolioProject`-Type aus `portfolio.types.ts`
- Behält die bestehenden **Helper-Funktionen**: `getGallery`, `getPreviewImage`, `getProjectCoverImage`
- Behält den **Copy-Override-Merge-Layer** (projects-copy.json)
- Exportiert die **Utility-Functions**: `getProjectBySlug`, `getAllProjects`, `getAdjacentProjects`, `getCaseStudySections`, `getPortfolioKit`, `getKovonConfig`, `getTechnicalSpecs`, `getBentoCards`, `getKovonFeaturedCaseConfig`

### Optional: 2-Commit-Split für Phase 3

Falls Diff zu groß für 1 Commit:
- **3a:** `portfolio-enterprise.ts` extrahieren (mit Build-Verifikation)
- **3b:** `portfolio-creative.ts` extrahieren (mit Build-Verifikation)

---

## Phase 4: Unused-Variable-Warnings löschen

| Datei | Zeile | Entfernen |
|---|---|---|
| `src/app/(site)/contact/page.tsx` | 19 | `navProjects` |
| `src/app/(site)/cv/page.tsx` | 23 | `navProjects` |
| `src/app/(site)/motion/page.tsx` | 7 | `ChevronRight` aus Import |
| `src/components/landing/NextGenStartPage.tsx` | 32 | `ExperienceTimelineSection` |
| `src/components/landing/NextGenStartPage.tsx` | 40 | `EducationSection` |
| `src/components/landing/NextGenStartPage.tsx` | 50 | `ENTERPRISE_SHOW_SLUGS` |
| `src/components/ui/ScrollLockGallery.tsx` | 5 | `useTransform`, `useMotionValue`, `MotionValue` aus Import |
| `src/components/ui/ScrollLockGallery.tsx` | 52 | `DotItem` |

**Verifikation:** `npm run build` zeigt 0 Warnings.

---

## Endgültige Datei-Struktur

```
src/content/
├── portfolio.types.ts            # ~195 Z, +3 Felder
├── portfolio-enterprise.ts       # ~305 Z, 6 Projekte mit inline Case-Studies
├── portfolio-creative.ts         # ~290 Z, 10 Projekte mit inline Case-Studies
├── portfolio.ts                  # ~130 Z, Barrel
├── motion-projects.ts            # 144 Z, unverändert
├── home.ts                       # 106 Z, unverändert
├── projects-copy.json            # unverändert
├── gallery-map.json              # unverändert
├── cv-copy.json                  # unverändert
├── kontrast-manifest.json        # unverändert
├── landing-copy.json             # unverändert
├── ui-copy.json                  # unverändert
└── README.md                     # unverändert
```

Alle Content-Files ≤ 305 Zeilen. ✓

---

## Verifikations-Checkliste pro Phase

Jede Phase endet mit:

- [ ] `npm run build` läuft grün
- [ ] Keine neuen Type-Errors
- [ ] Keine neuen Lint-Warnings
- [ ] Smoke-Test: `curl http://localhost:3000/projects/gswin-erp-migration` liefert die korrekte Page
- [ ] Smoke-Test: `curl http://localhost:3000/projects/tracklistify` liefert die korrekte Page (Token-Test)

---

## Out of Scope

Diese Roadmap deckt nur Refactoring + C-1 ab. Weitere Security-Findings (siehe `docs/security-audit.md`) werden separat behandelt:

- C-2, C-3, H-1, H-2, H-3, O-1, M-1 (kurzfristig)
- H-5, M-2, M-3, H-7, M-5 (mittelfristig)
- I-11, I-12, L-2 (nice-to-have)
