import { Activity, AlertTriangle, ClipboardList, Factory } from 'lucide-react';
import { DataTablePanel } from '@/components/DataTablePanel';
import { EnterprisePageShell } from '@/components/EnterprisePageShell';
import { MentionsPanel } from '@/components/MentionsPanel';

const rows = [
  ['PLT-3012', 'Plant West', 'Supplier handoff pending', 'High', '22m'],
  ['PLT-2984', 'Plant East', 'Audit note updated', 'Medium', '45m'],
  ['PLT-2977', 'Plant North', 'Waiting for quality review', 'Low', '1h'],
  ['PLT-2958', 'Plant West', 'Action owner reassigned', 'High', '2h']
];

export default function KovonQueuesPage() {
  return (
    <EnterprisePageShell
      title="KoVoN"
      subtitle="Queue Operations"
      searchPlaceholder="Search case, plant, owner"
      navItems={[
        { href: '/prototypes/kovon/queues', label: 'Queues', icon: ClipboardList, active: true },
        { href: '/prototypes/kovon/escalations', label: 'Escalations', icon: AlertTriangle },
        { href: '#', label: 'Plants', icon: Factory },
        { href: '#', label: 'Live Pulse', icon: Activity }
      ]}
      rightSidebar={
        <MentionsPanel
          title="Mentions"
          mentions={[
            { id: '1', actor: 'Anita P.', action: 'tagged you on PLT-3012.', time: '3 min ago' },
            { id: '2', actor: 'Quality Ops', action: 'requested update for Plant East.', time: '17 min ago' },
            { id: '3', actor: 'R. Keller', action: 'shared supplier audit notes.', time: '42 min ago' }
          ]}
        />
      }
    >
      <DataTablePanel
        title="Open queue"
        subtitle="Prioritized by escalation score"
        headers={['Case', 'Location', 'Status', 'Priority', 'Last Update']}
        rows={rows}
      />
    </EnterprisePageShell>
  );
}
