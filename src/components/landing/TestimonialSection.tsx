'use client';

import { testimonialQuote, testimonialAttribution } from '@/content/home';

export function TestimonialSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span
          className="absolute -left-4 -top-4 text-[12rem] font-serif leading-none text-muted-foreground/10 select-none"
          aria-hidden
        >
          &ldquo;
        </span>
        <blockquote className="relative text-2xl font-medium leading-relaxed text-foreground md:text-3xl" style={{ lineHeight: 1.6 }}>
          {testimonialQuote}
        </blockquote>
        <cite className="mt-6 block text-sm not-italic text-muted-foreground">
          {testimonialAttribution}
        </cite>
      </div>
    </section>
  );
}
