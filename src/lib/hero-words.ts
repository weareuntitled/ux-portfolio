/**
 * Rotating slot list for the hero. The PrismaticWord cycles through these
 * labels every 4s (decision #13). The `hue` field was dropped — the prismatic
 * gradient uses theme chart tokens, not per-word hues (plan §5.1).
 *
 * Word list per plan §3.2 + handoff 2026-06-04: 8 role-aligned titles only.
 * Dropped personality fills (Process Manager, Creative, Producer, Coffee Lover)
 * and cert labels (Scrum Master). 10 → 8 entries; 4 fewer "off-brand" cycles.
 * #schema:
 * {
 *   type: "module",
 *   exports: ["HERO_WORDS", "HeroWord"],
 *   module: "hero-words.ts"
 * }
 */
export interface HeroWord {
  label: string;
}

export const HERO_WORDS: readonly HeroWord[] = [
  { label: 'Product Designer' },
  { label: 'UX/UI Designer' },
  { label: 'Product Owner' },
  { label: 'UX Strategist' },
  { label: 'Design Lead' },
  { label: 'AI-Native Builder' },
  { label: 'Full-Stack Designer' },
  { label: 'Motion Designer' },
] as const;
