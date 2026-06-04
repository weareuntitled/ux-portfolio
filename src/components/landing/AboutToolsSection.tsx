'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { TECH_STACK, deviconUrl, type TechItem } from '@/lib/devicon';

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-foreground/10 px-1 py-0.5 text-foreground transition-colors hover:bg-foreground/20">
      {children}
    </span>
  );
}

function TechItemPill({ item, index }: { item: TechItem; index: number }) {
  const reduceMotion = useReducedMotion();
  const iconUrl = item.iconUrl ?? deviconUrl(item.slug ?? '', item.variant ?? 'original');

  return (
    <motion.div
      className="group flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-3 py-1.5 transition-colors hover:border-black hover:shadow-sm"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: reduceMotion ? 0 : DUR.sm, delay: index * 0.03, ease: EASE }}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        <Image
          src={iconUrl}
          alt={item.name}
          width={20}
          height={20}
          className="object-contain opacity-90 transition-opacity group-hover:opacity-100"
          unoptimized
        />
      </div>
      <span className="text-xs font-medium text-foreground">{item.name}</span>
    </motion.div>
  );
}

export function AboutToolsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-20 text-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Title */}
        <motion.h2
          className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          Behind the <span className="text-accent">Screens</span>
        </motion.h2>

        {/* Big-font manifesto — replaces the profile image, single point of contact only */}
        <motion.p
          className="mx-auto mb-14 max-w-5xl font-display text-[10vw] font-extrabold leading-[0.95] tracking-[-0.04em] text-foreground md:text-[6.5vw] lg:text-[5.5vw]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : DUR.lg, delay: 0.1, ease: EASE }}
        >
          Design <span className="text-accent">×</span> Engineering <span className="text-accent">×</span> Strategy.
        </motion.p>

        {/* Content split */}
        <div className="grid gap-8 text-left md:grid-cols-2 md:text-center">
          <motion.div
            className="space-y-4 text-base leading-relaxed text-foreground/70"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
          >
            <p>
              I&apos;m a <Highlight>Product Designer</Highlight> and{' '}
              <Highlight>Certified Scrum Master</Highlight> who runs{' '}
              <Highlight>Untitled-ux</Highlight>, my own freelance practice.
              I take work from Figma to production-ready specs. Sprints,{' '}
              shipping, real problems — that&apos;s my day-to-day for enterprise teams.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4 text-base leading-relaxed text-foreground/70"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.2, ease: EASE }}
          >
            <p>
              I like working alongside <Highlight>developers</Highlight>. Together we untangle <Highlight>messy requirements</Highlight> until they become something shippable.
              Lately that means <Highlight>enterprise SaaS</Highlight>, <Highlight>workflow automation</Highlight>, and <Highlight>SAP-adjacent tools</Highlight> — plus freelance projects through Untitled-ux.
            </p>
          </motion.div>
        </div>

        {/* Tools */}
        <div className="mt-16 text-left">
          <motion.h3
            className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground/60"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : DUR.sm, ease: EASE }}
          >
            Tools & Stack
          </motion.h3>
          {TECH_STACK.map((category, catIndex) => (
            <div key={category.title} className={catIndex > 0 ? 'mt-6' : ''}>
              <motion.h4
                className="mb-3 text-sm font-semibold tracking-wide text-foreground/60"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : DUR.sm, ease: EASE }}
              >
                {category.title}
              </motion.h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, idx) => (
                  <TechItemPill key={item.name} item={item} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
