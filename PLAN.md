# Plan: Job Hunter Case Study + Homepage Bands

## Status: Case Study Content (gebaut ✅)

Job Hunter project entry in `portfolio-creative.ts` ist vollständig:
- `caseStudy` mit 9 Feldern
- `portfolioKit` mit `technicalSpecs[7]` + `processSteps[6]`
- `impactCards[3]`, `outcomeHighlight`, `processDiagramUrl`
- `ribbonLabel: 'AI Automation'`
- 12 Bilder in `public/projects/job-hunter_*`
- Build: ✅ 0 Errors, 0 Warnings

## Noch offen: Homepage-Integration

### 1. Job Hunter Band (neu bauen)

```
┌──────────────────────────────────────────────────────────────┐
│                        HERO SECTION                          │
├──────────────────────────────────────────────────────────────┤
│                     CLIENT LOGOS                             │
├──────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ ▲ JOB HUNTER BAND — schmaler Hero-Strip                 │ │
│ │   Full-width, ~240px, hero.jpg als Bg + Gradient         │ │
│ │   Badge: "AI Automation · Side Project"                  │ │
│ │   Headline: "Job Hunter — Autonomous Application Agent"  │ │
│ │   Metriken: ≤20 min · 8h saved/week · 90-95% quality     │ │
│ │   CTA: "View case study →"                               │ │
│ └──────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│               SELECTED WORK — Enterprise                     │
│  ┌────GSwin featured────────┐                               │
│  │ Full-width card           │                               │
│  └──────────────────────────┘                               │
│  ┌────────┐┌────────┐┌────────┐┌────────┐                   │
│  │ Kovon  ││ FFP    ││Auto    ││Emiss   │                   │
│  └────────┘└────────┘└────────┘└────────┘                   │
├──────────────────────────────────────────────────────────────┤
│           AI SIDE PROJECT — Tracklistify Band                │
│   (AccountRequestBand, compact, 2-Spalter)                   │
├──────────────────────────────────────────────────────────────┤
│                     KONTRASST BANNER                         │
├──────────────────────────────────────────────────────────────┤
│                     ... (rest)                               │
└──────────────────────────────────────────────────────────────┘
```

### 2. Tracklistify fix

Aktuell rendered die AccountRequestBand nicht, weil `accountRequestEndpoint` fehlt.

```typescript
// portfolio-creative.ts — tracklistify entry
// FEHLT:
accountRequestEndpoint: '/api/request-access/tracklistify',
```

Nach Fix: Tracklistify erscheint wieder als Band unter Selected Work.

### 3. Drei Bands — drei Formate

| Band | Position | Format | Höhe | Inhalt |
|------|----------|--------|------|--------|
| GSwin | In Selected Work, volle Breite | Card im Grid (sm:col-span-2 lg:col-span-4) | auto | Cover + Metriken + ribbonLabel |
| Job Hunter | Neue Section, über Selected Work | Full-width Hero-Strip | ~240px | Hero-Bg + Overlay + 3 Metriken |
| Tracklistify | Unter Selected Work | AccountRequestBand (compact) | auto | 2-Spalter + CTA |

## Entscheidungen (nach /grill-me ✅)

| Frage | Entscheidung |
|-------|-------------|
| Ton | Pragmatisch-sachlich |
| Headline | Titel + Subtitle: "Job Hunter" / "Autonomous Application Agent." |
| Metriken | Drei große Impact-Karten (value groß, label klein) |
| CTA | "How it works →" → /projects/job-hunter |

## Zu bauen

1. **JobHunterBand** Komponente in NextGenStartPage (neue Section zwischen ClientLogos und Selected Work)
2. **Tracklistify fix:** `accountRequestEndpoint` ins tracklistify-Object in portfolio-creative.ts
3. Build check: 0 Errors, 0 Warnings
