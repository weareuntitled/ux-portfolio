import { Activity, AlertTriangle, ClipboardList, Factory } from 'lucide-react';
import { DataTablePanel } from '@/components/DataTablePanel';
import { EnterprisePageShell } from '@/components/EnterprisePageShell';
import { MentionsPanel } from '@/components/MentionsPanel';

const rows = [
  ['ESC-0442', 'Supplier variance > threshold', 'Plant West', 'Critical', 'Escalated'],
  ['ESC-0436', 'Repeat defect cluster', 'Plant East', 'High', 'In review'],
  ['ESC-0431', 'Missing containment evidence', 'Plant North', 'Medium', 'Queued']
];

export default function KovonEscalationsPage() {
  return (
    <EnterprisePageShell
      title="KoVoN"
      subtitle="Escalation Workspace"
      searchPlaceholder="Search escalation"
      navItems={[
        { href: '/prototypes/kovon/queues', label: 'Queues', icon: ClipboardList },
        { href: '/prototypes/kovon/escalations', label: 'Escalations', icon: AlertTriangle, active: true },
        { href: '#', label: 'Plants', icon: Factory },
        { href: '#', label: 'Live Pulse', icon: Activity }
      ]}
      rightSidebar={
        <MentionsPanel
          title="Activity feed"
          mentions={[
            { id: '1', actor: 'S. Meyer', action: 'confirmed containment for ESC-0442.', time: '8 min ago' },
            { id: '2', actor: 'Plant West', action: 'uploaded QA photo evidence.', time: '21 min ago' },
            { id: '3', actor: 'Ops Lead', action: 'requested decision before 16:00.', time: '1h ago' }
          ]}
        />
      }
    >
      <DataTablePanel
        title="Escalations"
        subtitle="All active escalations this week"
        controlsLabel="Severity"
        headers={['ID', 'Issue', 'Location', 'Severity', 'State']}
        rows={rows}
      />
    </EnterprisePageShell>
  );
}
