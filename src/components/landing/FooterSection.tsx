'use client';

import Link from 'next/link';
import { ArrowUp, Mail } from 'lucide-react';
import { contact } from '@/content/home';
import { Button } from '@/components/ui/button';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function FooterSection() {
  return (
    <footer className="relative rounded-2xl border-2 border-primary/50 bg-card px-6 py-16 text-foreground md:px-12 md:py-20">
      <div className="mx-auto max-w-2xl space-y-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Let&apos;s Connect
        </h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Me
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-primary/50 text-foreground hover:bg-primary/10"
            onClick={() => {
              navigator.clipboard.writeText(contact.email);
            }}
          >
            Copy Email
          </Button>
        </div>
        <div className="flex justify-center gap-6">
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            LinkedIn
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Twitter / X
          </Link>
          <Link
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Dribbble
          </Link>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-foreground"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </footer>
  );
}
