# Agents — ux-portfolio

## Doc-in-Code Regel

Code ist die einzige Quelle für Architektur-Dokumentation. Externe `.md` Dateien werden nicht direkt aktualisiert.

### #schema: Block

Jede wichtige Funktion trägt ein `#schema:` Block in ihrem Docstring:

```typescript
/**
 * Returns a project by slug.
 * #schema:
 * {
 *   type: "query",
 *   args: "slug: string",
 *   returns: "PortfolioProject | null",
 *   module: "portfolio.ts"
 * }
 */
export function getProjectBySlug(slug: string): PortfolioProject | null {
```

**Deine Regel:** Ändere eine Funktion → aktualisiere ihr `#schema:` Block. Keine externen Architektur-`.md` aktualisieren.

## Verfügbare Skills

| Skill | Trigger | Beschreibung |
|-------|---------|-------------|
| `ds-finalphase` | `/ds-finalphase` | Build grün, Doc-in-Code, Cleanup |
| `review` | `"review das"` | Review gegen einen Commit |

## Build-Anforderungen

- `npm run build` muss 0 Errors UND 0 Warnings haben
- Nach jeder Phase: `npm run build` verifizieren
- Keine toten Imports oder ungenutzte Variablen