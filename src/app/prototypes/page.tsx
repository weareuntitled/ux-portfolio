import Link from 'next/link';

const prototypes = [
  { href: '/prototypes/ffp', label: 'FFP · Workflow Selection Dashboard' },
  { href: '/prototypes/ffp-review', label: 'FFP · Comparison' },
  { href: '/prototypes/kovon', label: 'KoVoN' }
];

export default function PrototypesIndexPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Prototype pages</h1>
      <p className="text-sm text-slate-600">Reusable enterprise shell examples for KoVoN and FFP.</p>
      <div className="grid gap-3">
        {prototypes.map((prototype) => (
          <Link key={prototype.href} href={prototype.href} className="rounded-lg border bg-white px-4 py-3 hover:bg-slate-50">
            {prototype.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
