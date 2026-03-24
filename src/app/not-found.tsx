import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Page not found</h1>
        <p className="text-muted-foreground">The page you are looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
