export type WorkflowStage = 'intake' | 'triage' | 'analysis' | 'review' | 'closed';
export type WorkflowPriority = 'low' | 'medium' | 'high' | 'critical';

export type WorkflowCard = {
  id: string;
  title: string;
  owner: string;
  stage: WorkflowStage;
  priority: WorkflowPriority;
  dueDate: string;
  assigned: boolean;
  hasMentions: boolean;
  tags: string[];
};

export type AssignmentState = 'assigned' | 'unassigned';
export type RecommendationState = 'accepted' | 'pending' | 'rejected';

export type DissSagaEntry = {
  id: string;
  vin: string;
  date: string;
  market: 'DE' | 'US' | 'CN' | 'JP' | 'BR';
  competenceField: 'Powertrain' | 'ADAS' | 'Infotainment' | 'Body' | 'HV Battery';
  assignmentState: AssignmentState;
  recommendationState: RecommendationState;
  assignedTags: string[];
  recommendedTags: string[];
  linkedFfpId: string;
};

export type DepartmentTagStatus = 'active' | 'pending' | 'deprecated';
export type DepartmentTagCategory =
  | 'Root Cause'
  | 'Symptom'
  | 'Component'
  | 'Software'
  | 'Process';

export type DepartmentTagRecord = {
  id: string;
  tag: string;
  status: DepartmentTagStatus;
  usageCount: number;
  category: DepartmentTagCategory;
  relatedTags: string[];
};

export type MentionFeedItem = {
  id: string;
  timestamp: string;
  author: string;
  channel: 'DISS' | 'SAGA' | 'FFP';
  targetId: string;
  message: string;
  resolved: boolean;
};

export type FfpSeverity = 'low' | 'medium' | 'high' | 'critical';

export type FfpDashboardRow = {
  id: string;
  fingerprint: string;
  severity: FfpSeverity;
  delta: number;
  category: 'Electrical' | 'Mechanical' | 'Software' | 'Supply';
  watched: boolean;
  mentions: number;
};

export type TimelineEvent = {
  id: string;
  date: string;
  actor: string;
  action: string;
  note: string;
};

export type AttributeSection = {
  title: string;
  attributes: Array<{
    label: string;
    value: string;
  }>;
};

export type ConsolidatedMetrics = {
  impactedMarkets: number;
  linkedCases: number;
  recurrenceRate: number;
  timeToContainmentHours: number;
  unresolvedMentions: number;
};

export type FfpDetail = {
  metadata: {
    id: string;
    fingerprint: string;
    severity: FfpSeverity;
    category: 'Electrical' | 'Mechanical' | 'Software' | 'Supply';
    owner: string;
    createdAt: string;
    lastUpdatedAt: string;
    watched: boolean;
    linkedDissSagaIds: string[];
  };
  historyTimeline: TimelineEvent[];
  attributeSections: AttributeSection[];
  consolidatedMetrics: ConsolidatedMetrics;
};

export const workflowCards: WorkflowCard[] = [
  { id: 'wf-001', title: 'HV charge drop on cold start', owner: 'M. Adler', stage: 'triage', priority: 'high', dueDate: '2026-01-14', assigned: true, hasMentions: true, tags: ['hv-battery', 'cold-weather'] },
  { id: 'wf-002', title: 'Lane assist jitter above 110 km/h', owner: 'S. König', stage: 'analysis', priority: 'critical', dueDate: '2026-01-12', assigned: true, hasMentions: false, tags: ['adas', 'steering-input'] },
  { id: 'wf-003', title: 'Head unit reboot after OTA 4.7', owner: 'L. Novak', stage: 'intake', priority: 'medium', dueDate: '2026-01-18', assigned: false, hasMentions: true, tags: ['infotainment', 'ota'] },
  { id: 'wf-004', title: 'Door seal whistle at 90 km/h', owner: 'R. Hart', stage: 'review', priority: 'low', dueDate: '2026-01-20', assigned: true, hasMentions: false, tags: ['body', 'noise-vibration'] },
  { id: 'wf-005', title: 'DC converter over-temp spike', owner: 'J. Meyer', stage: 'analysis', priority: 'high', dueDate: '2026-01-10', assigned: true, hasMentions: true, tags: ['powertrain', 'electrical'] },
  { id: 'wf-006', title: 'Rear camera black frame intermittent', owner: 'C. Li', stage: 'triage', priority: 'medium', dueDate: '2026-01-16', assigned: false, hasMentions: false, tags: ['adas', 'camera'] },
  { id: 'wf-007', title: '12V drain after parked 48h', owner: 'T. Müller', stage: 'analysis', priority: 'critical', dueDate: '2026-01-09', assigned: true, hasMentions: true, tags: ['electrical', 'sleep-mode'] },
  { id: 'wf-008', title: 'Seat memory mismatch profile B', owner: 'A. Rossi', stage: 'intake', priority: 'low', dueDate: '2026-01-22', assigned: false, hasMentions: false, tags: ['body', 'comfort'] },
  { id: 'wf-009', title: 'Brake pedal vibration low-speed', owner: 'K. Ito', stage: 'review', priority: 'medium', dueDate: '2026-01-15', assigned: true, hasMentions: true, tags: ['mechanical', 'braking'] },
  { id: 'wf-010', title: 'Telematics sync timeout APAC', owner: 'N. Silva', stage: 'closed', priority: 'low', dueDate: '2026-01-08', assigned: true, hasMentions: false, tags: ['connectivity', 'backend-gateway'] }
];

export const dissSagaEntries: DissSagaEntry[] = [
  { id: 'ds-1001', vin: 'WBA8E9G57HNU12011', date: '2026-01-03', market: 'DE', competenceField: 'HV Battery', assignmentState: 'assigned', recommendationState: 'accepted', assignedTags: ['cell-imbalance', 'thermal-guard'], recommendedTags: ['soc-drift'], linkedFfpId: 'ffp-201' },
  { id: 'ds-1002', vin: '5UXCR6C05P9D33420', date: '2026-01-03', market: 'US', competenceField: 'ADAS', assignmentState: 'assigned', recommendationState: 'pending', assignedTags: ['camera-calibration'], recommendedTags: ['sensor-fusion', 'alignment'], linkedFfpId: 'ffp-204' },
  { id: 'ds-1003', vin: 'LFV3A24G9M3100981', date: '2026-01-04', market: 'CN', competenceField: 'Infotainment', assignmentState: 'unassigned', recommendationState: 'pending', assignedTags: [], recommendedTags: ['ota-regression', 'head-unit-reboot'], linkedFfpId: 'ffp-207' },
  { id: 'ds-1004', vin: 'WVWZZZ3CZPE442118', date: '2026-01-04', market: 'DE', competenceField: 'Body', assignmentState: 'assigned', recommendationState: 'accepted', assignedTags: ['seal-gap', 'wind-noise'], recommendedTags: ['door-fitment'], linkedFfpId: 'ffp-212' },
  { id: 'ds-1005', vin: 'JHMZE2H72AS045761', date: '2026-01-05', market: 'JP', competenceField: 'Powertrain', assignmentState: 'assigned', recommendationState: 'rejected', assignedTags: ['converter-thermal'], recommendedTags: ['dc-dc-sag'], linkedFfpId: 'ffp-205' },
  { id: 'ds-1006', vin: '3VW5T7AU9NM081440', date: '2026-01-05', market: 'US', competenceField: 'ADAS', assignmentState: 'unassigned', recommendationState: 'pending', assignedTags: [], recommendedTags: ['rear-camera-dropout'], linkedFfpId: 'ffp-208' },
  { id: 'ds-1007', vin: 'WDDZF8KB4KA515228', date: '2026-01-06', market: 'BR', competenceField: 'Powertrain', assignmentState: 'assigned', recommendationState: 'accepted', assignedTags: ['12v-drain', 'sleep-wake-loop'], recommendedTags: ['current-leak'], linkedFfpId: 'ffp-209' },
  { id: 'ds-1008', vin: 'WA1LAAF71MD006537', date: '2026-01-06', market: 'DE', competenceField: 'Body', assignmentState: 'assigned', recommendationState: 'pending', assignedTags: ['seat-memory'], recommendedTags: ['profile-corruption'], linkedFfpId: 'ffp-210' },
  { id: 'ds-1009', vin: 'KM8R54HE1PU472811', date: '2026-01-07', market: 'US', competenceField: 'Infotainment', assignmentState: 'unassigned', recommendationState: 'pending', assignedTags: [], recommendedTags: ['telematics-timeout'], linkedFfpId: 'ffp-211' },
  { id: 'ds-1010', vin: 'SALGS2RK5PA396174', date: '2026-01-07', market: 'CN', competenceField: 'HV Battery', assignmentState: 'assigned', recommendationState: 'accepted', assignedTags: ['charge-gate-latency'], recommendedTags: ['pack-temp-spike'], linkedFfpId: 'ffp-201' }
];

export const departmentTagRecords: DepartmentTagRecord[] = [
  { id: 'tag-01', tag: 'cell-imbalance', status: 'active', usageCount: 38, category: 'Root Cause', relatedTags: ['soc-drift', 'pack-temp-spike'] },
  { id: 'tag-02', tag: 'thermal-guard', status: 'active', usageCount: 24, category: 'Software', relatedTags: ['converter-thermal', 'overheat-protection'] },
  { id: 'tag-03', tag: 'camera-calibration', status: 'active', usageCount: 31, category: 'Process', relatedTags: ['alignment', 'sensor-fusion'] },
  { id: 'tag-04', tag: 'head-unit-reboot', status: 'pending', usageCount: 9, category: 'Symptom', relatedTags: ['ota-regression', 'memory-overrun'] },
  { id: 'tag-05', tag: 'seal-gap', status: 'active', usageCount: 15, category: 'Component', relatedTags: ['wind-noise', 'door-fitment'] },
  { id: 'tag-06', tag: 'dc-dc-sag', status: 'deprecated', usageCount: 5, category: 'Root Cause', relatedTags: ['converter-thermal', 'voltage-drop'] },
  { id: 'tag-07', tag: 'rear-camera-dropout', status: 'active', usageCount: 18, category: 'Symptom', relatedTags: ['signal-loss', 'camera-calibration'] },
  { id: 'tag-08', tag: '12v-drain', status: 'active', usageCount: 29, category: 'Root Cause', relatedTags: ['sleep-wake-loop', 'current-leak'] },
  { id: 'tag-09', tag: 'profile-corruption', status: 'pending', usageCount: 11, category: 'Software', relatedTags: ['seat-memory', 'user-profile-sync'] },
  { id: 'tag-10', tag: 'telematics-timeout', status: 'active', usageCount: 21, category: 'Symptom', relatedTags: ['backend-gateway', 'network-latency'] }
];

export const mentionFeedItems: MentionFeedItem[] = [
  { id: 'm-001', timestamp: '2026-01-07T08:15:00Z', author: 'M. Adler', channel: 'DISS', targetId: 'ds-1001', message: '@battery-team please validate thermal guard thresholds.', resolved: false },
  { id: 'm-002', timestamp: '2026-01-07T09:00:00Z', author: 'S. König', channel: 'SAGA', targetId: 'ds-1002', message: '@adas-lab camera rig recalibration needed before next test.', resolved: true },
  { id: 'm-003', timestamp: '2026-01-07T09:42:00Z', author: 'L. Novak', channel: 'DISS', targetId: 'ds-1003', message: '@ota-core can we compare rollout waves 4.7.2 vs 4.7.3?', resolved: false },
  { id: 'm-004', timestamp: '2026-01-07T10:05:00Z', author: 'R. Hart', channel: 'FFP', targetId: 'ffp-212', message: '@body-shop fitment audit photos uploaded.', resolved: true },
  { id: 'm-005', timestamp: '2026-01-07T10:38:00Z', author: 'J. Meyer', channel: 'FFP', targetId: 'ffp-205', message: '@powertrain triage suggests short spikes during regen.', resolved: false },
  { id: 'm-006', timestamp: '2026-01-07T11:20:00Z', author: 'C. Li', channel: 'SAGA', targetId: 'ds-1006', message: '@vision-team rear camera logset attached in case packet.', resolved: false },
  { id: 'm-007', timestamp: '2026-01-07T11:55:00Z', author: 'T. Müller', channel: 'DISS', targetId: 'ds-1007', message: '@electrical please confirm key-off drain baseline.', resolved: true },
  { id: 'm-008', timestamp: '2026-01-07T12:30:00Z', author: 'A. Rossi', channel: 'FFP', targetId: 'ffp-210', message: '@ux-profile state mismatch reproduced in profile B only.', resolved: false },
  { id: 'm-009', timestamp: '2026-01-07T13:10:00Z', author: 'N. Silva', channel: 'DISS', targetId: 'ds-1009', message: '@connectivity packet-loss spikes from APAC carriers.', resolved: false },
  { id: 'm-010', timestamp: '2026-01-07T13:44:00Z', author: 'K. Ito', channel: 'FFP', targetId: 'ffp-201', message: '@qa rerun requested with ambient below -5°C.', resolved: true }
];

export const ffpDashboardRows: FfpDashboardRow[] = [
  { id: 'ffp-201', fingerprint: 'HV-CHARGE-COLD-DROP', severity: 'critical', delta: 14.2, category: 'Electrical', watched: true, mentions: 6 },
  { id: 'ffp-202', fingerprint: 'ADAS-HIGHWAY-JITTER', severity: 'high', delta: 8.9, category: 'Software', watched: true, mentions: 3 },
  { id: 'ffp-203', fingerprint: 'INF-OTA-REBOOT-47', severity: 'medium', delta: 4.1, category: 'Software', watched: false, mentions: 5 },
  { id: 'ffp-204', fingerprint: 'ADAS-CAM-ALIGN-DRIFT', severity: 'high', delta: 6.8, category: 'Mechanical', watched: false, mentions: 2 },
  { id: 'ffp-205', fingerprint: 'PT-DC-CONVERTER-HEAT', severity: 'critical', delta: 11.7, category: 'Electrical', watched: true, mentions: 4 },
  { id: 'ffp-206', fingerprint: 'BODY-SEAL-WHISTLE', severity: 'low', delta: -1.9, category: 'Mechanical', watched: false, mentions: 1 },
  { id: 'ffp-207', fingerprint: 'INF-HU-BOOTLOOP', severity: 'high', delta: 7.4, category: 'Software', watched: true, mentions: 5 },
  { id: 'ffp-208', fingerprint: 'ADAS-REAR-CAM-FRAMELOSS', severity: 'medium', delta: 3.6, category: 'Supply', watched: false, mentions: 2 },
  { id: 'ffp-209', fingerprint: 'ELEC-12V-PARK-DRAIN', severity: 'critical', delta: 9.8, category: 'Electrical', watched: true, mentions: 4 },
  { id: 'ffp-210', fingerprint: 'BODY-SEAT-PROFILE-MISMATCH', severity: 'medium', delta: 2.7, category: 'Software', watched: false, mentions: 3 },
  { id: 'ffp-211', fingerprint: 'NET-TELEMATICS-TIMEOUT', severity: 'medium', delta: 5.2, category: 'Supply', watched: true, mentions: 2 },
  { id: 'ffp-212', fingerprint: 'BODY-DOOR-FITMENT-NVH', severity: 'low', delta: -0.8, category: 'Mechanical', watched: false, mentions: 1 }
];

export const ffpDetail: FfpDetail = {
  metadata: {
    id: 'ffp-201',
    fingerprint: 'HV-CHARGE-COLD-DROP',
    severity: 'critical',
    category: 'Electrical',
    owner: 'M. Adler',
    createdAt: '2025-12-21T07:35:00Z',
    lastUpdatedAt: '2026-01-07T13:44:00Z',
    watched: true,
    linkedDissSagaIds: ['ds-1001', 'ds-1010']
  },
  historyTimeline: [
    { id: 'e-01', date: '2025-12-21T07:35:00Z', actor: 'System', action: 'Fingerprint created', note: 'Cluster formed from 6 matched charge-loss events.' },
    { id: 'e-02', date: '2025-12-22T10:00:00Z', actor: 'M. Adler', action: 'Ownership assigned', note: 'HV battery competence accepted case ownership.' },
    { id: 'e-03', date: '2025-12-24T15:20:00Z', actor: 'K. Ito', action: 'New evidence linked', note: 'Cold chamber test logs attached from DE plant.' },
    { id: 'e-04', date: '2025-12-27T09:12:00Z', actor: 'System', action: 'Severity raised', note: 'Recurrence exceeded threshold in 3 markets.' },
    { id: 'e-05', date: '2026-01-02T11:42:00Z', actor: 'Battery Team', action: 'Mitigation proposed', note: 'Thermal guard update with delayed taper curve.' },
    { id: 'e-06', date: '2026-01-04T08:28:00Z', actor: 'QA', action: 'Validation started', note: 'A/B pack profile test initiated.' },
    { id: 'e-07', date: '2026-01-06T14:03:00Z', actor: 'System', action: 'Mention spike detected', note: '6 unresolved mentions in 24h window.' },
    { id: 'e-08', date: '2026-01-07T13:44:00Z', actor: 'K. Ito', action: 'Retest requested', note: 'Requested rerun under -5°C ambient conditions.' }
  ],
  attributeSections: [
    {
      title: 'Vehicle Context',
      attributes: [
        { label: 'Model family', value: 'E-SUV Platform 3' },
        { label: 'Powertrain', value: 'Dual motor / 82kWh pack' },
        { label: 'SW baseline', value: 'BMS 5.14.2' },
        { label: 'Production window', value: '2025-W38 to 2025-W50' }
      ]
    },
    {
      title: 'Failure Signature',
      attributes: [
        { label: 'Primary symptom', value: 'Charge current falls below 18A during cold start' },
        { label: 'Trigger conditions', value: 'Ambient below -3°C and SOC under 35%' },
        { label: 'Observed frequency', value: '1 in 42 affected charge sessions' },
        { label: 'Suspected root cause', value: 'Conservative taper map on thermal guard branch' }
      ]
    },
    {
      title: 'Operational Impact',
      attributes: [
        { label: 'Customer impact', value: 'Extended charging time (+24 min median)' },
        { label: 'Service impact', value: 'Increased hotline callbacks in winter markets' },
        { label: 'Containment status', value: 'Software patch candidate in validation' },
        { label: 'Escalation tier', value: 'Tier 1 (leadership visibility)' }
      ]
    }
  ],
  consolidatedMetrics: {
    impactedMarkets: 3,
    linkedCases: 27,
    recurrenceRate: 0.18,
    timeToContainmentHours: 116,
    unresolvedMentions: 4
  }
};

export const searchWorkflowCards = (
  cards: WorkflowCard[],
  query: string,
  options?: { assignedOnly?: boolean; stage?: WorkflowStage | 'all' }
): WorkflowCard[] => {
  const normalized = query.trim().toLowerCase();

  return cards.filter((card) => {
    const matchesText =
      normalized.length === 0 ||
      card.title.toLowerCase().includes(normalized) ||
      card.owner.toLowerCase().includes(normalized) ||
      card.tags.some((tag) => tag.toLowerCase().includes(normalized));
    const matchesAssignment = !options?.assignedOnly || card.assigned;
    const matchesStage = !options?.stage || options.stage === 'all' || card.stage === options.stage;

    return matchesText && matchesAssignment && matchesStage;
  });
};

export const filterDissSagaEntries = (
  entries: DissSagaEntry[],
  options: {
    market?: DissSagaEntry['market'] | 'all';
    assignmentState?: AssignmentState | 'all';
    recommendationState?: RecommendationState | 'all';
    competenceField?: DissSagaEntry['competenceField'] | 'all';
  }
): DissSagaEntry[] =>
  entries.filter((entry) => {
    const marketMatch = !options.market || options.market === 'all' || entry.market === options.market;
    const assignmentMatch =
      !options.assignmentState ||
      options.assignmentState === 'all' ||
      entry.assignmentState === options.assignmentState;
    const recommendationMatch =
      !options.recommendationState ||
      options.recommendationState === 'all' ||
      entry.recommendationState === options.recommendationState;
    const competenceMatch =
      !options.competenceField ||
      options.competenceField === 'all' ||
      entry.competenceField === options.competenceField;

    return marketMatch && assignmentMatch && recommendationMatch && competenceMatch;
  });

export const filterDepartmentTags = (
  records: DepartmentTagRecord[],
  options: {
    status?: DepartmentTagStatus | 'all';
    category?: DepartmentTagCategory | 'all';
    minUsageCount?: number;
    relatedTo?: string;
  }
): DepartmentTagRecord[] => {
  const relatedQuery = options.relatedTo?.trim().toLowerCase();

  return records.filter((record) => {
    const statusMatch = !options.status || options.status === 'all' || record.status === options.status;
    const categoryMatch =
      !options.category || options.category === 'all' || record.category === options.category;
    const usageMatch = options.minUsageCount === undefined || record.usageCount >= options.minUsageCount;
    const relatedMatch =
      !relatedQuery ||
      record.tag.toLowerCase().includes(relatedQuery) ||
      record.relatedTags.some((tag) => tag.toLowerCase().includes(relatedQuery));

    return statusMatch && categoryMatch && usageMatch && relatedMatch;
  });
};

export const getMentionFeedByState = (
  items: MentionFeedItem[],
  state: 'all' | 'resolved' | 'unresolved'
): MentionFeedItem[] => {
  if (state === 'all') {
    return items;
  }

  const shouldBeResolved = state === 'resolved';
  return items.filter((item) => item.resolved === shouldBeResolved);
};

export const filterFfpDashboardRows = (
  rows: FfpDashboardRow[],
  options: {
    severity?: FfpSeverity | 'all';
    category?: FfpDashboardRow['category'] | 'all';
    watchedOnly?: boolean;
    minDelta?: number;
  }
): FfpDashboardRow[] =>
  rows.filter((row) => {
    const severityMatch = !options.severity || options.severity === 'all' || row.severity === options.severity;
    const categoryMatch = !options.category || options.category === 'all' || row.category === options.category;
    const watchedMatch = !options.watchedOnly || row.watched;
    const deltaMatch = options.minDelta === undefined || row.delta >= options.minDelta;

    return severityMatch && categoryMatch && watchedMatch && deltaMatch;
  });

export const getFfpRowsWithMentions = (
  rows: FfpDashboardRow[],
  mentions: MentionFeedItem[]
): Array<FfpDashboardRow & { unresolvedMentions: number }> => {
  const unresolvedByTarget = mentions.reduce<Record<string, number>>((acc, mention) => {
    if (!mention.resolved) {
      acc[mention.targetId] = (acc[mention.targetId] ?? 0) + 1;
    }
    return acc;
  }, {});

  return rows.map((row) => ({
    ...row,
    unresolvedMentions: unresolvedByTarget[row.id] ?? 0
  }));
};
