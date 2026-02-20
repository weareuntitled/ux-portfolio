import type { Metadata } from 'next';
import { DashboardCV } from '@/components/DashboardCV';
import { CvDownloadButton } from '@/components/CvDownloadButton';
import { contact } from '@/content/home';
import { getProjectsForNav } from '@/lib/cms/projects-nav';
import { draftMode } from 'next/headers';

export const metadata: Metadata = {
  title: 'CV | Daniel Peters',
  description:
    'CV and resume for Daniel Peters, Product Designer (UX/UI), enterprise workflow tools.',
};

export const revalidate = 300;

export default async function CVPage() {
  const draft = await draftMode();
  const isDraft = draft.isEnabled;
  const navProjects = await getProjectsForNav({ draftMode: isDraft });

  return (
    <DashboardCV
      navProjects={navProjects}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'CV' },
      ]}
      pageTitle="CV"
    >
      <main className="flex min-w-0 flex-1 flex-col bg-background">
        <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-8 md:py-20">
          <header className="flex flex-col gap-6 border-b border-zinc-800 pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tighter text-zinc-100 sm:text-5xl">
                Daniel Peters
              </h1>
              <h2 className="mt-2 text-xl font-medium text-primary">
                Senior Product Designer & Process Analyst
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
                9+ years of experience mapping complex enterprise workflows into intuitive,
                high-performance software. Certified SAFe 6.0 Scrum Master specializing in
                automotive compliance, diagnostic dashboards, and SAP RPA automation.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-1 text-sm text-zinc-400 sm:items-end">
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-primary"
              >
                {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className="transition-colors hover:text-primary">
                {contact.phone}
              </a>
              <span>Augsburg / Munich (Hybrid)</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="mt-2 transition-colors hover:text-primary"
              >
                LinkedIn Profile ↗
              </a>
              <CvDownloadButton className="mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-zinc-100 px-4 text-sm font-semibold text-zinc-900 shadow transition-colors hover:bg-zinc-300" />
            </div>
          </header>

          <section>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Enterprise UX/UI',
                'Process Management (PDD)',
                'SAP RPA Automation',
                'SAFe 6.0 Scrum Master',
                'Data Visualization',
                'Figma / FigJam',
                'Jira / Confluence',
                'HTML / CSS (Tailwind)',
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-6 border-b border-zinc-800 pb-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
              Professional Experience
            </h3>

            <div className="space-y-10">
              <article>
                <header className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h4 className="text-lg font-bold text-zinc-100">
                      Senior Product Designer & Process Analyst
                    </h4>
                    <span className="font-mono text-sm text-zinc-400">Oct 2022 — Present</span>
                  </div>
                  <p className="text-sm font-medium text-primary">8020 Consulting · Automotive Konzern</p>
                </header>
                <p className="mb-3 text-sm text-zinc-400">
                  Leading product strategy and agile delivery for enterprise compliance, diagnostic,
                  and automation tools. Dual role as UX Lead and SAFe Scrum Master.
                </p>
                <ul className="list-outside list-disc space-y-2 pl-4 text-sm text-zinc-300 marker:text-zinc-600">
                  <li>
                    <strong className="text-zinc-100">SAP RPA Automation:</strong> Authored a 36-page
                    Process Design Document (PDD) for an automated bot that flags and restores
                    incorrectly reset K-Level parts. Saved ~40–50 experts 2–4 hours per week (approx.
                    7,000 hours annually) and reduced line stoppage risks.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Failure Fingerprint Dashboard:</strong> Redesigned
                    a legacy database UI into a symptom-first diagnostic tool. Designed a 1:1
                    Correlation Engine unifying Supplier Quality, Production, and Root Cause synthesis,
                    drastically reducing duplicate cases.
                  </li>
                  <li>
                    <strong className="text-zinc-100">KoVoN COP Platform:</strong> Designed and
                    validated a scalable pilot web tool for Conformity of Production (COP)
                    documentation for 500+ users, translating complex legal regulations into
                    actionable software requirements.
                  </li>
                  <li>
                    <strong className="text-zinc-100">CAESAR Dashboard:</strong> De-cluttered raw
                    emission tables, introducing lasso-selection and visual threshold overrides to
                    help experts detect anomalies prior to legal reporting.
                  </li>
                </ul>
              </article>

              <article>
                <header className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h4 className="text-lg font-bold text-zinc-100">Freelance UX/UI Designer</h4>
                    <span className="font-mono text-sm text-zinc-400">Feb 2020 — Present</span>
                  </div>
                  <p className="text-sm font-medium text-primary">untitled ux</p>
                </header>
                <ul className="list-outside list-disc space-y-2 pl-4 text-sm text-zinc-300 marker:text-zinc-600">
                  <li>
                    Delivered scalable design systems, user journey mapping, and high-fidelity
                    prototyping for various B2B clients and enterprise ecosystems.
                  </li>
                  <li>
                    Consulted on AI automation use cases, integrating generative AI tools (ComfyUI,
                    ChatGPT) for rapid ideation and workflow optimization.
                  </li>
                </ul>
              </article>

              <article>
                <header className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h4 className="text-lg font-bold text-zinc-100">Co-Founder & Design Lead</h4>
                    <span className="font-mono text-sm text-zinc-400">2019 — 2024</span>
                  </div>
                  <p className="text-sm font-medium text-primary">Kontrast Festival</p>
                </header>
                <ul className="list-outside list-disc space-y-2 pl-4 text-sm text-zinc-300 marker:text-zinc-600">
                  <li>
                    Built an established culture brand from the ground up, managing a creative and
                    operational team of 5–7 personnel.
                  </li>
                  <li>Scaled the event to 4,000+ visitors and over €250k in revenue.</li>
                  <li>
                    Optimized operational and financial processes to turn a Year 1 deficit into a
                    sustainable ~€40k margin within three years.
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <section>
            <h3 className="mb-6 border-b border-zinc-800 pb-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
              Education & Credentials
            </h3>

            <div className="space-y-6">
              <article className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h4 className="text-base font-bold text-zinc-100">
                    Certified SAFe 6.0 Scrum Master
                  </h4>
                  <p className="text-sm text-zinc-400">Scaled Agile Framework</p>
                </div>
                <span className="mt-1 font-mono text-sm text-zinc-500 sm:mt-0">
                  Valid 2025 — 2026
                </span>
              </article>

              <article className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h4 className="text-base font-bold text-zinc-100">Master of Arts / Science</h4>
                  <p className="text-sm text-zinc-400">Technische Hochschule Ingolstadt</p>
                </div>
                <span className="mt-1 font-mono text-sm text-zinc-500 sm:mt-0">
                  Mar 2022 — Mar 2024
                </span>
              </article>

              <article className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h4 className="text-base font-bold text-zinc-100">
                    Scientific Recognition: ICNLSP
                  </h4>
                  <p className="text-sm text-zinc-400">
                    Published research in Natural Language Processing (NLP)
                  </p>
                </div>
                <span className="mt-1 font-mono text-sm text-zinc-500 sm:mt-0">2021</span>
              </article>

              <article className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h4 className="text-base font-bold text-zinc-100">Bachelor of Arts / Science</h4>
                  <p className="text-sm text-zinc-400">Technische Hochschule Ingolstadt</p>
                </div>
                <span className="mt-1 font-mono text-sm text-zinc-500 sm:mt-0">
                  Oct 2014 — Mar 2019
                </span>
              </article>
            </div>
          </section>
        </div>
      </main>
    </DashboardCV>
  );
}
