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
                Management Consultant
              </h2>
              <p className="mt-2 text-sm font-medium text-zinc-300">
                Core roles: UX/UI Product Design · Scrum Master · Process Analyst
              </p>
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
                href="https://www.linkedin.com/in/daniel-peters-055296203/"
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
                      Management Consultant
                    </h4>
                    <span className="font-mono text-sm text-zinc-400">Oct 2022 — Nov 2025</span>
                  </div>
                  <p className="text-sm font-medium text-primary">8020 Consulting · Automotive Konzern</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Core roles: UX/UI Product Design · Scrum Master · Process Analyst
                  </p>
                </header>
                <p className="mb-3 text-sm text-zinc-400">
                  Management consulting for enterprise products across UX/UI, process analysis,
                  automation, and agile delivery in a cross-functional Spotify-style setup.
                </p>
                <ul className="list-outside list-disc space-y-2 pl-4 text-sm text-zinc-300 marker:text-zinc-600">
                  <li>
                    <strong className="text-zinc-100">SAP RPA Automation:</strong> Authored a 36-page
                    Process Design Document (PDD) for an automated bot that flags and restores
                    incorrectly reset K-Level parts. Saved ~40–50 experts 2–4 hours per week (approx.
                    7,000 hours annually) and reduced line stoppage risks.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Product, UX & Research:</strong> Designed apps,
                    UX flows, and research-backed concepts across compliance and diagnostic use cases,
                    from early process discovery to high-fidelity delivery.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Motion & Pitches:</strong> Acted as second
                    motion-design lead, preparing app visualizations, marketing pitches, and
                    presentation assets for tools and larger townhall meetings.
                  </li>
                  <li>
                    <strong className="text-zinc-100">Process & Design Management:</strong> Improved
                    internal and client-side workflows, bridging design management, UX/UI execution,
                    and automation analysis across multiple teams.
                  </li>
                </ul>
              </article>

              <article>
                <header className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h4 className="text-lg font-bold text-zinc-100">UX/UI & Motion Designer</h4>
                    <span className="font-mono text-sm text-zinc-400">Feb 2020 — Present</span>
                  </div>
                  <p className="text-sm font-medium text-primary">Freelance & Agency Projects</p>
                </header>
                <ul className="list-outside list-disc space-y-2 pl-4 text-sm text-zinc-300 marker:text-zinc-600">
                  <li>
                    Built untitled ux as an independent practice with a focus on restaurant and
                    client brandings, from logo systems to print and production-ready assets.
                  </li>
                  <li>
                    Delivered end-to-end brand applications including merchandise, print materials,
                    and campaign visuals for small and mid-sized clients.
                  </li>
                  <li>
                    Shifted toward motion design and produced social-media ad videos, from 3D-style
                    rendered scenes to short graphic animations and classic design edits.
                  </li>
                  <li>
                    Developed UX/UI concepts in Figma and translated brand ideas into web-ready
                    designs and communication assets.
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
                    Served as final creative sign-off for festival communication, visual consistency,
                    and cross-channel design quality.
                  </li>
                  <li>
                    Produced the majority of print assets, including banners, construction-fence
                    visuals, displays, merchandise, festival wristbands, and ticket materials.
                  </li>
                  <li>Scaled the event to 4,000+ visitors and over €250k in revenue.</li>
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
                  <h4 className="text-base font-bold text-zinc-100">Master of Science (M.Sc.) UX Design</h4>
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
                  <h4 className="text-base font-bold text-zinc-100">Bachelor of Science (B.Sc.)</h4>
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
