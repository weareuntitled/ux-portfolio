type Mention = {
  id: string;
  actor: string;
  action: string;
  time: string;
};

type MentionsPanelProps = {
  title?: string;
  mentions: Mention[];
};

export function MentionsPanel({ title = 'Mentions', mentions }: MentionsPanelProps) {
  return (
    <aside className="w-72 border-l bg-white">
      <div className="border-b px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      </div>
      <ul className="space-y-3 p-4">
        {mentions.map((mention) => (
          <li key={mention.id} className="rounded-md border bg-slate-50 p-3">
            <p className="text-sm text-slate-700">
              <span className="font-medium text-slate-900">{mention.actor}</span> {mention.action}
            </p>
            <p className="mt-1 text-xs text-slate-500">{mention.time}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
