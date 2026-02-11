import { BarChart3, Binary, GitCompareArrows, Layers3 } from 'lucide-react';
import { DataTablePanel } from '@/components/DataTablePanel';
import { EnterprisePageShell } from '@/components/EnterprisePageShell';
import { MentionsPanel } from '@/components/MentionsPanel';

const rows = [
  ['CL-182', 'Hydraulic pressure drift', '17 incidents', '92', 'Open'],
  ['CL-176', 'Thermal sensor misread', '11 incidents', '81', 'Open'],
  ['CL-161', 'Valve alignment mismatch', '7 incidents', '70', 'Monitoring'],
  ['CL-144', 'Bearing wear pattern', '5 incidents', '64', 'Monitoring']
];

export default function FfpPage() {
  return (
    <EnterprisePageShell
      title="FFP Dashboard"
      subtitle="Failure clustering overview"
      searchPlaceholder="Search cluster or line"
      navItems={[
        { href: '/prototypes/ffp', label: 'Clusters', icon: Layers3, active: true },
        { href: '/prototypes/ffp-review', label: 'Comparison', icon: GitCompareArrows },
        { href: '#', label: 'Telemetry', icon: Binary },
        { href: '#', label: 'Trends', icon: BarChart3 }
      ]}
      rightSidebar={
        <MentionsPanel
          title="Review notes"
          mentions={[
            { id: '1', actor: 'Data Eng', action: 'updated model baseline for CL-182.', time: '9 min ago' },
            { id: '2', actor: 'Plant Analyst', action: 'requested line-level drilldown.', time: '30 min ago' },
            { id: '3', actor: 'Ops Director', action: 'flagged CL-176 for next review.', time: '52 min ago' }
          ]}
        />
      }
    >
      <DataTablePanel
        title="Failure clusters"
        subtitle="Sorted by impact score"
        controlsLabel="Time Window"
        headers={['Cluster', 'Pattern', 'Incidents', 'Impact', 'State']}
        rows={rows}
      />
    </EnterprisePageShell>
  );
}
