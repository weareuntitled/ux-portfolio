'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-primary/10 px-1 py-0.5 text-primary transition-colors hover:bg-primary/20">
      {children}
    </span>
  );
}

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        {/* Pre-title */}
        <motion.div
          className="mb-4 flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          <span className="font-mono text-xs text-muted-foreground/60">{'<!-- About me section -->'}</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="mb-10 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          Behind the <span className="text-muted-foreground">Screens</span>
        </motion.h2>

        {/* Content split */}
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            className="space-y-4 text-base leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
          >
            <p>
              I&apos;m a <Highlight>Product Designer</Highlight> with a passion for bridging{' '}
              <Highlight>design and engineering</Highlight> — from Figma prototypes to production-ready specs. I{' '}
              <Highlight>run sprints</Highlight>, <Highlight>ship fast</Highlight>, and{' '}
              <Highlight>solve real problems</Highlight> for enterprise teams.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4 text-base leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.2, ease: EASE }}
          >
            <p>
              I enjoy <Highlight>collaborating with developers</Highlight>,{' '}
              <Highlight>simplifying complex workflows</Highlight>, and{' '}
              <Highlight>transforming messy requirements</Highlight> into structured, shippable products. Currently focused on{' '}
              <Highlight>enterprise SaaS</Highlight>, <Highlight>workflow automation</Highlight>, and{' '}
              <Highlight>SAP-adjacent tools</Highlight>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
