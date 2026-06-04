import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { ArrowUpRight, Mail } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { ContactWebGLBackground } from '@/components/contact/ContactWebGLBackground';
import { Card, CardContent } from '@/components/ui/card';
import { contact } from '@/content/home';
import { getProjectsForNav } from '@/lib/cms/projects-nav';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Daniel Peters — AI-Native Product Designer & UX Consultant.',
};

export default async function ContactPage() {
  const draft = await draftMode();
  await getProjectsForNav({ draftMode: draft.isEnabled });

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'Contact' },
      ]}
    >
      <div className="relative -mx-1 min-h-[min(72vh,760px)] overflow-hidden rounded-3xl border border-border/50 shadow-sm sm:-mx-2">
        <ContactWebGLBackground />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/85"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <section className="relative z-10 mx-auto max-w-xl space-y-10 px-5 py-14 sm:px-8 sm:py-20 md:py-24">
          <header className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Let&apos;s connect
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Tell me what you&apos;re building.
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Whether it&apos;s enterprise UX, a complex workflow, or a product that needs clarity—I&apos;d love to hear
              from you. A short note is enough to get started.
            </p>
          </header>

          <Card className="border-white/5 bg-card/75 shadow-md backdrop-blur-xl">
            <CardContent className="space-y-6 p-7 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Mail className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="font-semibold text-foreground">{contact.name}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{contact.tagline}</p>
                </div>
              </div>

              <div className="h-px bg-border/60" />

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group mt-1 inline-flex items-center gap-1.5 text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {contact.email}
                    <ArrowUpRight
                      className="h-4 w-4 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="mt-1 inline-block text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <a
                href={`mailto:${contact.email}?subject=Hello%20%E2%80%94%20project%20inquiry`}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Send a message
              </a>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground/80">
            Typical reply within a few business days.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
