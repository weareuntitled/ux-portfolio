'use client';

import { useMemo, useState } from 'react';

type DissItem = {
  id: string;
  incident: string;
  competence: 'Electrical' | 'Software' | 'Logistics';
  plant: string;
  date: 'Last 7 days' | 'Last 30 days' | 'All dates';
  tagged: boolean;
  status: 'pending' | 'approved' | 'rejected';
};

const dissSeed: DissItem[] = [
  {
    id: 'DISS-1012',
    incident: 'Voltage drift after cold start',
    competence: 'Electrical',
    plant: 'Plant A',
    date: 'Last 7 days',
    tagged: true,
    status: 'pending'
  },
  {
    id: 'DISS-1015',
    incident: 'CAN timeout spike',
    competence: 'Software',
    plant: 'Plant C',
    date: 'Last 30 days',
    tagged: false,
    status: 'pending'
  },
  {
    id: 'DISS-1019',
    incident: 'Missing pallet scan event',
    competence: 'Logistics',
    plant: 'Plant B',
    date: 'All dates',
    tagged: true,
    status: 'pending'
  }
];

type Mention = { id: string; author: string; text: string; unread: boolean };

const mentionSeed: Mention[] = [
  { id: 'm1', author: '@lead_qe', text: 'Can we prioritize DISS-1012 before Friday?', unread: true },
  { id: 'm2', author: '@plant_b', text: 'Need supplier confirmation for scan failure.', unread: true },
  { id: 'm3', author: '@ops_analyst', text: 'Approved issue has already been escalated.', unread: false },
  { id: 'm4', author: '@dev_team', text: 'Patch ready for timeout anomaly.', unread: false }
];

const competences = ['All', 'Electrical', 'Software', 'Logistics'] as const;
type CompetenceFilter = (typeof competences)[number];

export function KovonOperationsMock() {
  const [rows, setRows] = useState(dissSeed);
  const [query, setQuery] = useState('');
  const [competence, setCompetence] = useState<CompetenceFilter>('All');
  const [dateRange, setDateRange] = useState<DissItem['date']>('All dates');
  const [showOnlyUntagged, setShowOnlyUntagged] = useState(false);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchQuery = normalized
        ? [row.id, row.incident, row.plant].join(' ').toLowerCase().includes(normalized)
        : true;
      const matchCompetence = competence === 'All' ? true : row.competence === competence;
      const matchDate = dateRange === 'All dates' ? true : row.date === dateRange;
      const matchTag = showOnlyUntagged ? !row.tagged : true;
      return matchQuery && matchCompetence && matchDate && matchTag;
    });
  }, [competence, dateRange, query, rows, showOnlyUntagged]);

  const unreadMentions = mentionSeed.filter((item) => item.unread).length;

  const updateStatus = (id: string, nextStatus: DissItem['status']) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, status: nextStatus === 'pending' ? 'pending' : nextStatus } : row))
    );
  };

  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold">KoVoN DISS queue mock</h2>
      <p className="mt-1 text-sm text-slate-600">Client-side filters, row actions, and mentions stream.</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search DISS id or incident"
              className="rounded-md border px-3 py-2 text-sm"
            />
            <select
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value as DissItem['date'])}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="All dates">All dates</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
            </select>
            <label className="col-span-2 flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={showOnlyUntagged}
                onChange={(event) => setShowOnlyUntagged(event.target.checked)}
              />
              Show only untagged
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {competences.map((chip) => {
              const active = chip === competence;
              return (
                <button
                  key={chip}
                  onClick={() => setCompetence(chip)}
                  className={`rounded-full border px-3 py-1 text-sm ${active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'bg-white'}`}
                  aria-pressed={active}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2">DISS</th>
                  <th className="px-3 py-2">Incident</th>
                  <th className="px-3 py-2">Competence</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-t">
                    <td className="px-3 py-2">{row.id}</td>
                    <td className="px-3 py-2">{row.incident}</td>
                    <td className="px-3 py-2">{row.competence}</td>
                    <td className="px-3 py-2">{row.date}</td>
                    <td className="px-3 py-2 capitalize">{row.status}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(row.id, 'pending')} className="rounded border px-2 py-1 text-xs">
                          edit
                        </button>
                        <button onClick={() => updateStatus(row.id, 'approved')} className="rounded border px-2 py-1 text-xs">
                          approve
                        </button>
                        <button onClick={() => updateStatus(row.id, 'rejected')} className="rounded border px-2 py-1 text-xs">
                          reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-lg border bg-slate-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium">Mentions</h3>
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">{unreadMentions} unread</span>
          </div>
          <div className="h-52 space-y-2 overflow-y-auto pr-1">
            {mentionSeed.map((mention) => (
              <article key={mention.id} className="rounded-md border bg-white p-2 text-sm">
                <p className="font-medium">{mention.author}</p>
                <p className="text-slate-600">{mention.text}</p>
                {mention.unread ? <p className="mt-1 text-xs text-blue-700">• unread</p> : null}
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
