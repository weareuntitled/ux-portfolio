---
name: ds-finalphase
description: >
  Finalizes a development session: Build grün kriegen (0 Warnings, 0 Errors), Doc-in-Code注释 aktualisieren,
  und unused imports/variables aufräumen. Nutze nach jeder Feature- oder Refactoring-Phase.

  Trigger: "/ds-finalphase" oder wenn der User "build grün", "final phase", "cleanup" sagt.
---

# ds-finalphase

## Was dieser Skill tut

Bringt das Repo in einen sauberen Endzustand nach einer Entwicklungs- oder Refactoring-Phase:

1. **Build verifizieren** — `npm run build` muss 0 Errors UND 0 Warnings haben
2. **Doc-in-Code** — `#schema:` Blöcke in allen modifizierten Funktionen aktuell halten
3. **Cleanup** — Unused imports und variablen entfernen

## Ablauf

### 1. Build check

```bash
npm run build 2>&1 | grep -E "Warning|Error|Failed"
```

Falls Errors → direkt fixen, nicht weiter zu Schritt 2.

Falls Warnings → Schritt 3 (Cleanup) springen.

Falls 0 Errors + 0 Warnings → fertig.

### 2. Errors fixen

Type Errors und ESLint Errors beheben. Häufige Ursachen:
- Fehlende Imports (Component wurde entfernt aber Import blieb)
- Falsche Import-Reihenfolge (z.B. `import type` vor regular import → Error)
- `as const` fehlt bei literal types in TypeScript

Nach Fix → `npm run build` wiederholen.

### 3. Cleanup — Warnings fixen

Warnings kommen fast immer von:

| Pattern | Fix |
|---------|-----|
| `'X' is defined but never used` | Import entfernen oder Variable nutzen/löschen |
| `'X' is assigned a value but never used` | Variable entfernen oder mit `void` wegwerfen (wenn Aufruf wichtig ist) |
| `import type { X }` — unused | `import type` entfernen |

**Vorgehen:** Datei für Datei. Immer erst lesen, dann editieren. Nie blind imports entfernen.

### 4. Doc-in-Code — #schema: Blöcke aktualisieren

Für jede Funktion die du erstellt oder modifiziert hast:

```typescript
/**
 * Kurze Beschreibung was die Funktion macht.
 * #schema:
 * {
 *   type: "query" | "mutation" | "helper" | "barrel" | "type",
 *   args: "slug: string",
 *   returns: "PortfolioProject | null",
 *   module: "portfolio.ts"
 * }
 */
export function getProjectBySlug(slug: string): PortfolioProject | null {
```

**Regel:** Change the function → update its `#schema:` block. Nicht das externe `.md` aktualisieren.

### 5. Final verification

```bash
npm run build 2>&1 | grep -E "Warning|Error|Failed"
```

Erwartet: keine Ausgabe (0 Errors, 0 Warnings).

## Typische Fixes pro Dateityp

### .tsx pages

Unused `Metadata` import → entfernen (Next.js leitet es aus dem Dateinamen ab).

Unused `ArrowUpRight` etc. → prüfen ob Used → wenn nicht: entfernen.

### .tsx components

Unused `dynamic` import → entfernen wenn kein `dynamic(() => import(...))` mehr im File.

Unused `useTransform`, `useMotionValue` → entfernen.

Unused `DotItem` function → entfernen (wenn nicht gerendert).

### .ts content files

`as unknown as` double-cast → prüfen ob nötig, meist entfernt werden.

Spread-merge ohne collision check → ok für jetzt, aber notieren.

## Checkliste pro Phase

- [ ] `npm run build` → 0 Errors
- [ ] `npm run build` → 0 Warnings
- [ ] Alle modifizierten Funktionen haben aktuelle `#schema:` Blöcke
- [ ] Keine toten Imports oder Variablen
- [ ] Build ist grün (keine weiteren Schritte nötig)