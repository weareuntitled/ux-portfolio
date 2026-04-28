'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { contact } from '@/content/home';

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-primary-foreground/10 px-1 py-0.5 text-primary-foreground transition-colors hover:bg-primary-foreground/20">
      {children}
    </span>
  );
}

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Pre-title */}
        <motion.div
          className="mb-4 flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          <span className="font-mono text-xs text-primary-foreground/50">{'<!-- About me -->'}</span>
        </motion.div>

        {/* Title + Photo row */}
        <div className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <motion.h2
            className="font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
          >
            Behind the <span className="text-primary-foreground/60">Screens</span>
          </motion.h2>

          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: 0.1, ease: EASE }}
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary-foreground/20 bg-primary-foreground/10 ring-2 ring-primary-foreground/10 md:h-24 md:w-24">
              <Image
                src={contact.profileImage}
                alt={contact.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </motion.div>
        </div>

        {/* Content split */}
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            className="space-y-4 text-base leading-relaxed text-primary-foreground/80"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
          >
            <p>
              I&apos;m a <Highlight>Product Designer</Highlight> and{' '}
              <Highlight>Certified Scrum Master</Highlight> running my own freelance practice,{' '}
              <Highlight>Untitled-ux</Highlight>. I bridge design and engineering — from Figma prototypes to production-ready specs. I{' '}
              <Highlight>run sprints</Highlight>, <Highlight>ship fast</Highlight>, and{' '}
              <Highlight>solve real problems</Highlight> for enterprise teams.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4 text-base leading-relaxed text-primary-foreground/80"
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
              <Highlight>SAP-adjacent tools</Highlight> — while taking on select freelance projects through Untitled-ux.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
