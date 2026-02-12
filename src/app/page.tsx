import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold text-foreground">UX Portfolio Prototypes</h1>
      <p className="text-muted-foreground">Open the integrated workflow-selection dashboard prototype.</p>
      <Link
        href="/prototypes/ffp"
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Open FFP Prototype
      </Link>
    </main>
  );
}
