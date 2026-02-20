import Link from "next/link";

export default function KovonPrototypePage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <Link href="/projects/kovon" className="text-sm text-blue-700 hover:underline">
        ← Back to project
      </Link>
      <section className="rounded-xl border bg-white p-6">
        <h1 className="text-xl font-semibold">KoVoN</h1>
        <p className="mt-2 text-slate-600">
          This project does not have an interactive prototype in this portfolio. The FFP workflow selection dashboard prototype is under the Failure Fingerprint Dashboard (FFP) project.
        </p>
        <Link
          href="/prototypes/ffp/fingerprints"
          className="mt-4 inline-block rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Open FFP prototype
        </Link>
      </section>
    </main>
  );
}
