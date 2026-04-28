'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EASE, DUR, STAGGER, VP, staggerVariant, fadeUpVariant } from '@/lib/motion';

interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'software',
    number: '01',
    question: "What's your main 3D software?",
    answer:
      "I use whatever gets the best result. I learned the ropes in Cinema 4D, but these days I work a lot in Blender, Unreal Engine, and Unity. I don't geek out over heavy CAD engineering or crazy character rigging—my focus is on getting things looking great, fast. Software is just a tool; the core design principles stay the same.",
  },
  {
    id: 'strengths',
    number: '02',
    question: 'What are your actual strengths in 3D and Motion?',
    answer:
      "Fast, premium visual execution. I'm really good at stylized 3D illustrations, lean advertising renders, and VR/AR. Basically, I build highly optimized assets that look high-end without taking months to render.",
  },
  {
    id: 'ux',
    number: '03',
    question: 'How does your UX background tie into motion design?',
    answer:
      "Motion is the actual \"vibe\" of a product, but it usually gets treated as an afterthought. I don't just make things bounce for the sake of it. Thanks to my UX background, I make sure the motion actually guides the user and makes sense for the brand's overall feel.",
  },
  {
    id: 'team',
    number: '04',
    question: "You've been freelancing for 9 years. Can you actually work in a team?",
    answer:
      "Definitely. I might be a freelancer on paper, but I usually work deeply embedded in teams. I spent years with 80/20 Consulting doing big automotive accounts, even stepping in as Deputy Head of Motion Design. We were a tight crew of three, so I did a bit of everything—pitching concepts, leading the team, and doing the actual hands-on design. Bottom line: I play well with others.",
  },
  {
    id: 'concept',
    number: '05',
    question: 'Are you a concept person or a hands-on creator?',
    answer:
      "Both. I like coming up with the big ideas and storyboards, but I'd hate to just hand them off to someone else. I want to build the final thing, too. Co-leading a small team taught me how to take a project from a blank page all the way to the final render without dropping the ball.",
  },
  {
    id: 'ai',
    number: '06',
    question: 'How do you actually use AI?',
    answer:
      "I just use it to skip the boring stuff so I can focus on the creative part. I let Claude write my After Effects expressions and code, and I use ComfyUI, Kling, and custom LoRAs to speed up video generation. It just makes the whole pipeline way faster.",
  },
  {
    id: 'templates',
    number: '07',
    question: 'Can you build templates for the rest of our team?',
    answer:
      "Yeah, absolutely. I do this all the time. I build foolproof Figma layouts and modular After Effects setups (Essential Graphics) so that other designers or editors can just drag, drop, and swap colors without breaking the file.",
  },
];

function FaqItemRow({ item, reduceMotion }: { item: FaqItem; reduceMotion: boolean | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUpVariant()}
      className="relative border-b border-white/5 last:border-b-0"
    >
      {/* Left accent bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.span
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"
            style={{ originY: 0 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: reduceMotion ? 0 : DUR.sm, ease: EASE }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Trigger */}
      <button
        className="group flex w-full items-start gap-4 py-5 pl-4 pr-0 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="mt-0.5 w-6 shrink-0 font-mono text-xs text-muted-foreground select-none">
          {item.number}
        </span>
        <span
          className="flex-1 text-base font-semibold tracking-tight transition-colors duration-150 group-hover:text-primary"
          style={{ color: isOpen ? 'hsl(var(--primary))' : undefined }}
        >
          {item.question}
        </span>
        <motion.span
          className="ml-4 mt-0.5 shrink-0 text-lg font-light leading-none text-muted-foreground transition-colors duration-150 group-hover:text-primary select-none"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: reduceMotion ? 0 : DUR.xs, ease: EASE }}
          aria-hidden
        >
          +
        </motion.span>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : DUR.sm, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-6 pl-10 pr-4 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="faq-heading" className="pt-20">
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        {/* Left: section label */}
        <motion.div
          className="shrink-0 md:w-[30%] md:pt-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-2 text-base font-medium text-foreground"
          >
            Straight answers.
          </h2>
        </motion.div>

        {/* Right: accordion */}
        <motion.div
          className="min-w-0 flex-1 border-t border-border"
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={staggerVariant(STAGGER.md, 0.05)}
        >
          {FAQ_ITEMS.map((item) => (
            <FaqItemRow key={item.id} item={item} reduceMotion={reduceMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
