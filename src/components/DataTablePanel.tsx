import { SlidersHorizontal } from 'lucide-react';

type DataTablePanelProps = {
  title: string;
  subtitle?: string;
  controlsLabel?: string;
  headers: string[];
  rows: Array<Array<string>>;
};

export function DataTablePanel({
  title,
  subtitle,
  controlsLabel = 'Filters',
  headers,
  rows
}: DataTablePanelProps) {
  return (
    <section className="flex h-full min-h-0 flex-col rounded-lg border bg-white">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        <button className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-slate-600 hover:bg-slate-100">
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          {controlsLabel}
        </button>
      </header>

      <div className="min-h-0 overflow-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {headers.map((header) => (
                <th key={header} className="border-b px-4 py-2 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50">
                {row.map((cell, cellIndex) => (
                  <td key={`${headers[cellIndex]}-${cell}`} className="border-b px-4 py-2 text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
