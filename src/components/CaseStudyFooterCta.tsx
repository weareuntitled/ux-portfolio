'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CaseStudyFooterCta() {
  const year = new Date().getFullYear();
  return (
    <section className="py-32 text-center">
      <h2 className="mb-8 text-5xl font-bold tracking-tighter text-neutral-800 md:text-8xl">
        Next Gen.
      </h2>
      <Button variant="link" className="text-lg text-neutral-400 hover:text-foreground" asChild>
        <Link href="/projects">
          Explore other projects
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
      <p className="mt-8 text-sm text-neutral-500">
        © {year} Daniel Peters
      </p>
    </section>
  );
}
