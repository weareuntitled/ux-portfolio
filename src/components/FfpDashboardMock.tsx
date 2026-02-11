'use client';

import { useMemo, useState } from 'react';

type ClusterRow = {
  id: string;
  cluster: string;
  line: string;
  severity: 'High' | 'Medium' | 'Low';
  date: 'Last 7 days' | 'Last 30 days' | 'All dates';
  summary: string;
};

const clusterSeed: ClusterRow[] = [
  {
    id: 'CL-201',
    cluster: 'Bearing thermal drift',
    line: 'Line A2',
    severity: 'High',
    date: 'Last 7 days',
    summary: 'Persistent overheating in night shift batches.'
  },
  {
    id: 'CL-188',
    cluster: 'Hydraulic pressure jitter',
    line: 'Line C1',
    severity: 'Medium',
    date: 'Last 30 days',
    summary: 'Intermittent pressure spikes during warm restart.'
  },
  {
    id: 'CL-175',
    cluster: 'Sensor dropouts',
    line: 'Line D4',
    severity: 'Low',
    date: 'All dates',
    summary: 'Short packet loss windows across specific devices.'
  }
];

const ffpTabs = ['Overview', 'Signals', 'Actions'] as const;
type FfpTab = (typeof ffpTabs)[number];

export function FfpDashboardMock() {
  const [query, setQuery] = useState('');
  const [dateRange, setDateRange] = useState<ClusterRow['date']>('All dates');
  const [activeTab, setActiveTab] = useState<FfpTab>('Overview');
  const [selectedId, setSelectedId] = useState(clusterSeed[0].id);

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return clusterSeed.filter((row) => {
      const matchQuery = normalized ? [row.id, row.cluster, row.line].join(' ').toLowerCase().includes(normalized) : true;
      const matchDate = dateRange === 'All dates' ? true : row.date === dateRange;
      return matchQuery && matchDate;
    });
  }, [dateRange, query]);

  const selected = clusterSeed.find((row) => row.id === selectedId) ?? clusterSeed[0];

  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold">FFP dashboard mock</h2>
      <p className="mt-1 text-sm text-slate-600">Row selection opens detail drawer and tabs switch consolidated sections.</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cluster or line"
              className="rounded-md border px-3 py-2 text-sm"
            />
            <select
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value as ClusterRow['date'])}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="All dates">All dates</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
            </select>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2">Cluster</th>
                  <th className="px-3 py-2">Line</th>
                  <th className="px-3 py-2">Severity</th>
                  <th className="px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`cursor-pointer border-t ${selected.id === row.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                    onClick={() => setSelectedId(row.id)}
                  >
                    <td className="px-3 py-2">{row.cluster}</td>
                    <td className="px-3 py-2">{row.line}</td>
                    <td className="px-3 py-2">{row.severity}</td>
                    <td className="px-3 py-2">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-b pb-2">
            {ffpTabs.map((tab) => {
              const active = tab === activeTab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-md px-3 py-1 text-sm ${active ? 'bg-blue-600 text-white' : 'border'}`}
                  aria-pressed={active}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-md border bg-slate-50 p-3 text-sm text-slate-700">
            {activeTab === 'Overview' ? 'Overview consolidates cluster frequency, shift impact, and current owner.' : null}
            {activeTab === 'Signals' ? 'Signals consolidates top telemetry markers and outlier windows for this cluster.' : null}
            {activeTab === 'Actions' ? 'Actions consolidates mitigations, approvals, and review-ready notes.' : null}
          </div>
        </div>

        <aside className="rounded-lg border bg-slate-50 p-3">
          <h3 className="font-medium">Detail drawer</h3>
          <p className="mt-2 text-sm text-slate-700">{selected.id}</p>
          <p className="text-sm text-slate-700">{selected.cluster}</p>
          <p className="mt-2 text-sm text-slate-600">{selected.summary}</p>
          <p className="mt-2 text-xs text-slate-500">Line: {selected.line}</p>
          <p className="text-xs text-slate-500">Severity: {selected.severity}</p>
        </aside>
      </div>
    </section>
  );
}
