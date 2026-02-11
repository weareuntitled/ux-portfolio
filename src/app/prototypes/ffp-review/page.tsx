import { BarChart3, Binary, GitCompareArrows, Layers3 } from 'lucide-react';
import { DataTablePanel } from '@/components/DataTablePanel';
import { EnterprisePageShell } from '@/components/EnterprisePageShell';
import { MentionsPanel } from '@/components/MentionsPanel';

const rows = [
  ['Snapshot 14', 'Week 18', 'CL-182 spike', 'Compare with Week 17', 'Ready'],
  ['Snapshot 13', 'Week 17', 'Stable thermal variance', 'Baseline', 'Ready'],
  ['Snapshot 12', 'Week 16', 'Alignment mismatch increase', 'Open discussion', 'Draft']
];

export default function FfpReviewPage() {
  return (
    <EnterprisePageShell
      title="FFP Dashboard"
      subtitle="Comparative review"
      searchPlaceholder="Search snapshot"
      navItems={[
        { href: '/prototypes/ffp', label: 'Clusters', icon: Layers3 },
        { href: '/prototypes/ffp-review', label: 'Comparison', icon: GitCompareArrows, active: true },
        { href: '#', label: 'Telemetry', icon: Binary },
        { href: '#', label: 'Trends', icon: BarChart3 }
      ]}
      rightSidebar={
        <MentionsPanel
          title="Mentions"
          mentions={[
            { id: '1', actor: 'L. Hahn', action: 'commented on Snapshot 14 assumptions.', time: '4 min ago' },
            { id: '2', actor: 'QA Lead', action: 'approved baseline narrative.', time: '18 min ago' },
            { id: '3', actor: 'Review Bot', action: 'posted updated confidence score.', time: '36 min ago' }
          ]}
        />
      }
    >
      <DataTablePanel
        title="Review snapshots"
        subtitle="Shared references for weekly meeting"
        controlsLabel="Sort"
        headers={['Snapshot', 'Range', 'Key Finding', 'Context', 'Status']}
        rows={rows}
      />
    </EnterprisePageShell>
  );
}
