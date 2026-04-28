'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion';
import { contact } from '@/content/home';
import { TECH_STACK, deviconUrl, type TechItem } from '@/lib/devicon';

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-white/10 px-1 py-0.5 text-white transition-colors hover:bg-white/20">
      {children}
    </span>
  );
}

function TechItemPill({ item, index }: { item: TechItem; index: number }) {
  const reduceMotion = useReducedMotion();
  const iconUrl = deviconUrl(item.slug, item.variant ?? 'original');

  return (
    <motion.div
      className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:border-primary/30 hover:bg-white/10"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: reduceMotion ? 0 : DUR.sm, delay: index * 0.03, ease: EASE }}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        <Image
          src={iconUrl}
          alt={item.name}
          width={16}
          height={16}
          className="object-contain brightness-0 opacity-70 transition-opacity group-hover:opacity-100 invert"
          unoptimized
        />
      </div>
      <span className="text-xs font-medium text-white/80">{item.name}</span>
    </motion.div>
  );
}

export function AboutToolsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#0f0f12] py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Title */}
        <motion.h2
          className="mb-10 font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
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
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-white/20 bg-muted ring-2 ring-primary/20 md:h-28 md:w-28">
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
            className="space-y-4 text-base leading-relaxed text-white/70"
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
            className="space-y-4 text-base leading-relaxed text-white/70"
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

        {/* Tools */}
        <div className="mt-16 text-left">
          <motion.h3
            className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-white/40"
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
                className="mb-3 text-sm font-semibold tracking-wide text-white/60"
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
