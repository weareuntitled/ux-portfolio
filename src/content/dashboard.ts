export type MetricItem = {
  title: string;
  value: string;
  sub: string;
  trend: string;
};

export const metrics: MetricItem[] = [
  { title: 'Experience', value: '5+ Years', sub: 'UX/UI & Motion', trend: 'Senior Level' },
  { title: 'Projects', value: '25+', sub: 'Delivered', trend: 'High Volume' },
  { title: 'Clients', value: 'Audi, Porsche', sub: 'MAN, VW', trend: 'Enterprise' },
  { title: 'Certifications', value: 'SAFe 6', sub: 'Scrum Master', trend: 'Valid 2026' },
];

export type ProjectStatus = 'Live' | 'Beta' | 'Completed' | 'In Review';

export type ProjectRow = {
  name: string;
  type: string;
  status: ProjectStatus;
  role: string;
  date: string;
};

export const projectRows: ProjectRow[] = [
  { name: 'KoVon', type: 'Talent Platform', status: 'Live', role: 'Lead Designer', date: '2023' },
  { name: 'FFP Dashboard', type: 'Internal Analytics', status: 'In Review', role: 'UX/UI', date: '2024' },
  { name: 'Compliance Dash', type: 'SaaS', status: 'Beta', role: 'Product Design', date: '2024' },
  { name: '8020 Consulting', type: 'Consultancy', status: 'Completed', role: 'Consultant', date: '2022–2025' },
];

export type SkillItem = {
  subject: string;
  value: number;
  fullMark: number;
};

export const skillsData: SkillItem[] = [
  { subject: 'UX Research', value: 120, fullMark: 150 },
  { subject: 'UI Design', value: 145, fullMark: 150 },
  { subject: 'Motion', value: 130, fullMark: 150 },
  { subject: 'Frontend', value: 90, fullMark: 150 },
  { subject: 'Strategy', value: 110, fullMark: 150 },
];

export type LanguageItem = {
  name: string;
  value: number;
  fill?: string;
};

export const languagesData: LanguageItem[] = [
  { name: 'German', value: 100 },
  { name: 'English', value: 90 },
  { name: 'Chinese', value: 40 },
];
