'use client';

import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { EASE, DUR } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Props = {
  variant: 'full' | 'compact';
  endpoint: string;
  className?: string;
};

type State = 'idle' | 'submitting' | 'success' | 'error';

export function AccountRequestBand({ variant, endpoint, className }: Props) {
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_10%_50%,rgba(132,204,22,0.06),transparent_60%)]" />
        <div className="relative flex flex-col items-center gap-4 px-6 py-5 md:flex-row md:justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </span>
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">Tracklistify Studio</span> — AI Audio Analysis. Meine Test-App.
            </span>
          </div>

          {state === 'success' ? (
            <p className="flex items-center gap-2 text-sm text-primary">
              <CheckCircle className="h-4 w-4" />
              Anfrage gesendet — prüf deine Mails!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 md:w-auto">
              <input
                type="email"
                required
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === 'submitting'}
                className="h-9 min-w-0 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={state === 'submitting'}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {state === 'submitting' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5" />
                )}
                Zugang anfragen
              </button>
            </form>
          )}

          {state === 'error' && errorMsg && (
            <p className="flex w-full items-start gap-1.5 text-xs text-red-400 md:hidden">
              <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" /> {errorMsg}
            </p>
          )}
        </div>
        {state === 'error' && errorMsg && (
          <p className="hidden items-start gap-1.5 px-6 pb-4 text-xs text-red-400 md:flex">
            <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" /> {errorMsg}
          </p>
        )}
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_300px_at_25%_50%,rgba(132,204,22,0.08),transparent_60%)]" />
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
            Tracklistify Studio
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
                <p className="flex items-start gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
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
