'use client';

import Link from 'next/link';
import { BriefcaseBusiness, FileText, FolderKanban, Github, LayoutDashboard, Mail } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '#', icon: LayoutDashboard },
  { label: 'Resume / CV', href: '#', icon: FileText },
  { label: 'Portfolio Projects', href: '#', icon: FolderKanban },
  { label: 'Contact', href: '#', icon: Mail }
];

const statCards = [
  { title: 'Experience', value: '5+ Years', subtext: 'UX/UI & Motion Design' },
  { title: 'Education', value: 'M.Sc. UX Design', subtext: 'Grade 1.3 (Top of class)' },
  { title: 'Certifications', value: 'SAFe 6', subtext: 'Certified Scrum Master' },
  { title: 'Clients', value: 'Audi, Porsche', subtext: 'MAN, VW, Cariad' }
];

const skillLevels = [
  { label: 'UX Research', value: 78 },
  { label: 'UI Design', value: 95 },
  { label: 'Motion Design', value: 90 },
  { label: 'Frontend/React', value: 62 },
  { label: 'Strategy', value: 82 },
  { label: 'Print/Brand', value: 80 }
];

const languageLevels = [
  { label: 'German', proficiency: 'Native', value: 100 },
  { label: 'English', proficiency: 'C1 / Fluent', value: 88 },
  { label: 'Chinese', proficiency: 'B2', value: 70 }
];

const projects = [
  { name: 'KoVon', type: 'Talent Platform', role: 'Lead Designer', status: 'Live', date: '2023' },
  { name: 'FFP Dashboard', type: 'Internal Analytics', role: 'UX/UI & Motion', status: 'In Review', date: '2024' },
  { name: 'Compliance Dashboard', type: 'SaaS Product', role: 'Product Design', status: 'Beta', date: '2024' },
  {
    name: '8020 Consulting',
    type: 'Consultancy',
    role: 'Consultant Digital Products',
    status: 'Completed',
    date: 'Oct 2022 - Nov 2025'
  },
  {
    name: 'Kontrast Festival',
    type: 'Event Brand',
    role: 'Co-Founder & Design Lead',
    status: 'Completed',
    date: '2021 - 2024'
  }
];

function RadarChartMock() {
  const center = 160;
  const radius = 110;
  const points = skillLevels
    .map((skill, index) => {
      const angle = (Math.PI * 2 * index) / skillLevels.length - Math.PI / 2;
      const scaled = (skill.value / 100) * radius;
      const x = center + Math.cos(angle) * scaled;
      const y = center + Math.sin(angle) * scaled;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 320 320" className="h-full w-full">
      {[30, 55, 80, 110].map((ring) => (
        <circle key={ring} cx={center} cy={center} r={ring} fill="none" stroke="#3f3f46" strokeWidth="1" />
      ))}
      {skillLevels.map((skill, index) => {
        const angle = (Math.PI * 2 * index) / skillLevels.length - Math.PI / 2;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        const tx = center + Math.cos(angle) * (radius + 22);
        const ty = center + Math.sin(angle) * (radius + 22);
        return (
          <g key={skill.label}>
            <line x1={center} y1={center} x2={x} y2={y} stroke="#3f3f46" strokeWidth="1" />
            <text x={tx} y={ty} textAnchor="middle" fill="#a1a1aa" fontSize="11">
              {skill.label}
            </text>
          </g>
        );
      })}
      <polygon points={points} fill="#71717a" fillOpacity="0.45" stroke="#d4d4d8" strokeWidth="2" />
    </svg>
  );
}

function RadialBarsMock() {
  return (
    <div className="space-y-4 pt-3">
      {languageLevels.map((lang) => (
        <div key={lang.label}>
          <div className="mb-1 flex items-center justify-between text-sm text-zinc-400">
            <span>{lang.label}</span>
            <span>{lang.proficiency}</span>
          </div>
          <div className="h-2 rounded-full bg-zinc-900">
            <div className="h-2 rounded-full bg-zinc-500" style={{ width: `${lang.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto grid max-w-[1400px] gap-6 p-4 md:grid-cols-[260px_1fr] md:p-6">
        <aside className="flex min-h-[calc(100vh-3rem)] flex-col rounded-xl border border-zinc-800 bg-zinc-950/80 p-5">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold">DP</div>
            <div>
              <p className="font-medium text-white">Daniel Peters</p>
              <p className="text-xs text-zinc-400">UX Dashboard Profile</p>
            </div>
          </div>

          <nav className="mt-5 space-y-1" aria-label="Sidebar navigation">
            {navItems.map(({ label, href, icon: Icon }, index) => (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                  index === 0 ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-zinc-800 pt-5 text-sm">
            <Link
              href="https://github.com"
              className="mb-2 flex items-center gap-2 text-zinc-400 hover:text-zinc-100"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </Link>
            <a href="mailto:hi@untitled-ux.de" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100">
              <Mail className="h-4 w-4" aria-hidden="true" />
              hi@untitled-ux.de
            </a>
          </div>
        </aside>

        <section className="space-y-6">
          <header className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm text-zinc-400">Resume Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Professional Snapshot</h1>
            <p className="mt-2 text-sm text-zinc-400">A concise overview of experience, capabilities, and recent work history.</p>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="KPI cards">
            {statCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="text-sm text-zinc-400">{card.title}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
                <p className="mt-1 text-xs text-zinc-500">{card.subtext}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                <h2 className="text-base font-medium text-white">Skills Balance</h2>
              </div>
              <div className="h-[320px] w-full">
                <RadarChartMock />
              </div>
            </article>

            <article className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <h2 className="text-base font-medium text-white">Languages</h2>
              <RadialBarsMock />
            </article>
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-lg font-medium text-white">Recent Projects &amp; History</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="px-2 py-3 font-medium">Project Name</th>
                    <th className="px-2 py-3 font-medium">Type</th>
                    <th className="px-2 py-3 font-medium">Role</th>
                    <th className="px-2 py-3 font-medium">Status</th>
                    <th className="px-2 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.name} className="border-b border-zinc-900 text-zinc-300 last:border-0">
                      <td className="px-2 py-3 text-zinc-100">{project.name}</td>
                      <td className="px-2 py-3">{project.type}</td>
                      <td className="px-2 py-3">{project.role}</td>
                      <td className="px-2 py-3">{project.status}</td>
                      <td className="px-2 py-3">{project.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
