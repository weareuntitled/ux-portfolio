'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  contact,
  heroHeadline,
  heroH2,
  heroSub,
  heroBody,
  heroCtaMicroLine,
} from '@/content/home';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion';

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[420px] w-full overflow-hidden rounded-2xl border border-border bg-card md:min-h-[380px]"
      aria-label="Hero"
    >
      {/* Left: content with blur blend into card/bg */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-6 md:min-h-[380px] md:px-10 md:py-8 lg:px-12">
        <FadeIn className="relative">
          {/* Mobile: minimal top row with name + CTA */}
          <div className="flex items-center justify-between md:hidden">
            <span className="text-lg font-bold tracking-tight text-foreground">
              {contact.name}
            </span>
            <Button asChild size="sm" className="rounded-full bg-primary text-primary-foreground">
              <a href="#featured-projects">View Projects</a>
            </Button>
          </div>

          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {heroHeadline}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground md:text-xl" style={{ lineHeight: 1.4 }}>
            <span className="font-semibold text-foreground">{heroH2}</span>
          </p>
          <p className="mt-1 text-base font-medium text-muted-foreground md:text-lg">
            {heroSub}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {heroBody}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary font-medium text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring"
            >
              <a href="#featured-projects">View Projects</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-border bg-background hover:bg-accent"
            >
              <Link href="/projects">View Case Studies</Link>
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground md:text-sm">{heroCtaMicroLine}</p>
        </FadeIn>
      </div>

      {/* Right: 1:1 square crop — image fades in from left, blending into card */}
      <div
        className="relative hidden aspect-square min-h-[320px] shrink-0 overflow-hidden md:block md:min-h-[380px] md:min-w-[420px] lg:min-w-[480px] xl:min-w-[520px]"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.5) 22%, rgba(0,0,0,0.85) 38%, black 52%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.5) 22%, rgba(0,0,0,0.85) 38%, black 52%)',
        }}
      >
        <Image
          src={contact.profileImage}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 520px"
          priority
          quality={85}
          fetchPriority="high"
        />
      </div>

      {/* Mobile: square image below content */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden md:hidden">
        <Image
          src={contact.profileImage}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          quality={85}
        />
      </div>
    </section>
  );
}
