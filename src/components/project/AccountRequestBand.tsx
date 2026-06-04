'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { shouldUnoptimizeImage } from '@/lib/project-assets';

type Props = {
  variant: 'full' | 'compact';
  endpoint: string;
  className?: string;
  coverUrl?: string | null;
  projectUrl?: string;
};

type State = 'idle' | 'submitting' | 'success' | 'error';

export function AccountRequestBand({ variant, endpoint, className, coverUrl, projectUrl }: Props) {
  const [state, setState] = useState<State>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const reduceMotion = useReducedMotion();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Etwas ist schiefgelaufen.');
        setState('error');
        return;
      }
      setState('success');
    } catch {
      setErrorMsg('Verbindungsfehler. Bitte später erneut versuchen.');
      setState('error');
    }
  }

  if (variant === 'compact') {
    const hasVisual = Boolean(coverUrl);
    return (
      <motion.section
        className={cn('bg-muted/30 py-16 md:py-20', className)}
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: reduceMotion ? 0 : DUR.lg, ease: EASE }}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Left: Visual (layout variation from KontrastBanner) */}
            <motion.div
              className={cn(
                'relative overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100',
                hasVisual ? 'aspect-video' : 'hidden md:block'
              )}
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
            >
              {coverUrl ? (
                <>
                  <Image
                    src={coverUrl}
                    alt="DIGGR Studio"
                    fill
                    quality={80}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={shouldUnoptimizeImage(coverUrl)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      Set Curation · SC &amp; YT
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                      DIGGR Studio
                    </h3>
                  </div>
                </>
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-neutral-200 to-neutral-100" />
              )}
            </motion.div>

            {/* Right: Content + Form */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: reduceMotion ? 0 : DUR.md, delay: 0.1, ease: EASE }}
            >
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-black" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-black">
                  AI Set Curation
                </span>
              </div>

              <h2 className="font-display text-3xl font-bold tracking-tight text-black md:text-4xl">
                DIGGR <span className="text-black">Studio</span>
              </h2>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-600">
                DJ-Sets in Tracklisten verwandeln. Zieh dir Mixe von <strong className="text-black">SoundCloud</strong> und{' '}
                <strong className="text-black">YouTube</strong>, und DIGGR extrahiert per AI die einzelnen
                Tracks — präzise, automatisch, kuratiert.
              </p>

              {/* Feature chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-black">
                  SoundCloud & YouTube
                </span>
                <span className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-black">
                  AI Track Extraction
                </span>
                <span className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-medium text-black">
                  Side Project 2026
                </span>
              </div>

              {/* Form or success */}
              <div className="mt-7">
                {state === 'success' ? (
                  <div className="flex flex-col items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-primary">Anfrage gesendet!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Prüf dein Postfach — du bekommst eine E-Mail mit Zugangsdaten.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="email"
                      required
                      placeholder="Deine E-Mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={state === 'submitting'}
                      className="h-11 min-w-0 flex-1 rounded-lg border border-border/60 bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={state === 'submitting'}
                      className="inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                    >
                      {state === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-4 w-4" />
                          Zugang anfragen
                        </>
                      )}
                    </button>
                  </form>
                )}

                {state === 'error' && errorMsg && (
                  <p className="mt-2 flex items-start gap-1.5 rounded-lg border border-destructive/20 bg-destructive/5 p-2.5 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {errorMsg}
                  </p>
                )}
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {projectUrl && (
                  <Link
                    href={projectUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/80 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/10"
                  >
                    Case Study
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  // Full variant: two-column band with AI context + form
  return (
    <motion.section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm',
        className
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduceMotion ? 0 : DUR.md, ease: EASE }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_300px_at_25%_50%,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="relative grid gap-6 p-6 md:grid-cols-2 md:gap-8 md:p-8">
        {/* Left: AI context */}
        <div className="flex flex-col justify-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
              AI Test App
            </span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            DIGGR Studio
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Meine persönliche Test-App für KI-gestützte DJ-Set Analyse. Extrahiert automatisch Tracklists aus
            Mixes — powered by AI Audio Processing.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>Indie Developer</span>
            <span className="text-border">·</span>
            <span>Side Project 2026</span>
            <span className="text-border">·</span>
            <span>AI + Audio</span>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex flex-col justify-center">
          {state === 'success' ? (
            <div className="flex flex-col items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Anfrage gesendet!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Prüf dein Postfach — du bekommst eine E-Mail mit Zugangsdaten, sobald die Anfrage
                bestätigt wurde.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  required
                  placeholder="Deine E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === 'submitting'}
                  className="h-11 w-full rounded-lg border border-border/60 bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={state === 'submitting'}
                  className="h-11 w-full rounded-lg border border-border/60 bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={state === 'submitting'}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {state === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4" />
                    Zugang anfragen
                  </>
                )}
              </button>

              {state === 'error' && errorMsg && (
                <p className="flex items-start gap-1.5 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {errorMsg}
                </p>
              )}

              <p className="text-center text-[11px] text-muted-foreground/60">
                Deine Daten werden nur für den Zugang verwendet. Kein Spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
}
