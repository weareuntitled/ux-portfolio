'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { contact } from '@/content/home';

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
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center">

        <motion.h2
          className="mb-10 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          Behind the <span className="text-primary">Screens</span>
        </motion.h2>

        {/* Photo centered */}
        <motion.div
          className="mx-auto mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: 0.1, ease: EASE }}
        >
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-muted ring-2 ring-primary/20 md:h-28 md:w-28">
            <Image
              src={contact.profileImage}
              alt={contact.name}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
        </motion.div>

        {/* Content split */}
        <div className="grid gap-8 text-left md:grid-cols-2 md:text-center">
          <motion.div
            className="space-y-4 text-base leading-relaxed text-muted-foreground"
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
              <Highlight>SAP-adjacent tools</Highlight> — while taking on select freelance projects through Untitled-ux.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
