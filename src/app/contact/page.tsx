export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-slate-700">Interested in collaborating on product engineering or UX strategy?</p>
      <ul className="space-y-2 text-slate-700">
        <li>
          Email: <a className="text-blue-700 underline" href="mailto:hello@example.com">hello@example.com</a>
        </li>
        <li>
          LinkedIn: <a className="text-blue-700 underline" href="https://linkedin.com" target="_blank" rel="noreferrer">linkedin.com/in/example</a>
        </li>
        <li>
          GitHub: <a className="text-blue-700 underline" href="https://github.com/example" target="_blank" rel="noreferrer">github.com/example</a>
        </li>
      </ul>
    </main>
  );
}
