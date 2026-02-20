'use client';

import Link from 'next/link';
import {
  ProjectHero,
  BrowserMockup,
  MetricCard,
  InsightCard,
  ProcessSteps,
  FeatureItem,
} from '@/components/PortfolioKit';
import { Layout, Database, Lock, Smartphone, CreditCard, Star } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'https://placehold.co/1200x675/171717/404040?text=App+Screenshot';

export default function PortfolioKitDemoPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Portfolio Kit — Demo
          </h1>
          <Link
            href="/projects"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to projects
          </Link>
        </div>

        {/* Example 1: Automotive */}
        <section className="mb-20">
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wider text-muted-foreground">
            Example 1 — Automotive
          </h2>

          <ProjectHero
            title="Failure Fingerprint"
            subtitle="Restructuring a legacy diagnostic tool into a workflow-centric dashboard."
            role="Lead Designer (Research & UI)"
            year="2024"
            tags={['Enterprise', 'Automotive', 'Data Viz']}
            link="#"
          />

          <BrowserMockup
            src={PLACEHOLDER_IMAGE}
            alt="Automotive Dashboard"
            useNextImage={false}
          />

          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricCard value="3" label="Distinct Workflows" suffix=" modes" />
            <MetricCard
              value="45"
              label="Faster Triage"
              suffix="%"
              trend="+12% YoY"
            />
            <MetricCard value="100" label="Adoption Rate" suffix="%" />
          </div>

          <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-xl font-bold">The Process</h3>
              <ProcessSteps
                steps={[
                  {
                    number: '01',
                    title: 'Shadowing',
                    desc: 'Spent 3 days on the factory floor observing real usage.',
                  },
                  {
                    number: '02',
                    title: 'IA Mapping',
                    desc: "Separated the 'Supplier' vs 'Production' data queues.",
                  },
                  {
                    number: '03',
                    title: 'Validation',
                    desc: 'Tested the new toggle interaction with 5 lead engineers.',
                  },
                ]}
              />
            </div>
            <div className="space-y-6">
              <InsightCard
                type="problem"
                quote="We were forced to use one table for three different jobs."
                author="Lead Engineer"
              />
              <div className="rounded-2xl border border-border bg-card/30 p-6">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Tech Stack
                </h4>
                <div className="space-y-2">
                  <FeatureItem
                    icon={Layout}
                    title="React Frontend"
                    desc="Modular component architecture"
                  />
                  <FeatureItem
                    icon={Database}
                    title="Legacy SQL"
                    desc="Read-only integration"
                  />
                  <FeatureItem
                    icon={Lock}
                    title="RBAC"
                    desc="Role-based access control"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example 2: Fintech */}
        <section>
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wider text-muted-foreground">
            Example 2 — Fintech
          </h2>

          <ProjectHero
            title="NeoBank Mobile"
            subtitle="Simplifying cross-border payments for Gen-Z freelancers."
            role="UI Designer"
            year="2023"
            tags={['Mobile App', 'Fintech', 'B2C']}
            link="#"
          />

          <div className="mx-auto max-w-xs">
            <BrowserMockup
              src={PLACEHOLDER_IMAGE}
              alt="Mobile App Screen"
              urlBar="https://neobank.app/send"
              useNextImage={false}
            />
          </div>

          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MetricCard
              value="1.2"
              label="Active Users"
              suffix="M"
              trend="Growing"
              icon={Smartphone}
            />
            <MetricCard
              value="0"
              label="Transaction Fees"
              suffix="$"
              icon={CreditCard}
            />
            <MetricCard
              value="4.8"
              label="App Store Rating"
              suffix="★"
              trend="4.8"
              icon={Star}
            />
          </div>

          <InsightCard
            quote="We cut support tickets by 40% after the new send flow."
            author="Product Lead"
            type="insight"
          />
        </section>

        <footer className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            Reuse these components for any project — Healthcare, E-commerce, etc.
            Edit{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              components/PortfolioKit.tsx
            </code>{' '}
            and this page in{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              app/(site)/examples/portfolio-kit/page.tsx
            </code>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
