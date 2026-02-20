/**
 * KoVoN featured case: glossary and storyline config.
 * Edit this file to update visuals; [[TERM]] in copy renders as tooltip.
 */

export const glossary = {
  OE: {
    label: 'Organizational Unit (OE)',
    short: 'Internal org structure bucket, not equal to vehicle components.',
    detail:
      'OE is short for the German term Organisationseinheit. It describes how teams are grouped inside the company. One OE can cover multiple vehicle projects and multiple component domains.',
    icon: 'Building2',
  },
  'UN-ECE': {
    label: 'UN-ECE',
    short: 'United Nations Economic Commission for Europe regulations framework.',
    detail:
      'UN-ECE regulations define requirements for vehicle type approval. In many contexts it is written as UNECE. Here we use UN-ECE consistently.',
    icon: 'Scale',
  },
  CoP: {
    label: 'COP',
    short: 'Conformity of Production. Ongoing proof that production stays compliant.',
    detail:
      'COP means proving that series production matches the approved type and the regulatory requirements. This includes documentation, checks, and audit readiness over time.',
    icon: 'ShieldCheck',
  },
  EC: {
    label: 'EC',
    short: 'European Community, shorthand used in EU type approval context.',
    detail:
      'EC is commonly used as shorthand for EU level type approval rules, historically in EC directives and today in EU regulations. In this context it is the legal layer connected to COP requirements.',
    icon: 'Landmark',
  },
  Verdict: {
    label: 'Verdict',
    short: 'A documented compliance decision for a scope item, backed by evidence.',
    detail:
      'A Verdict links a vehicle scope item to a regulation item and stores status, responsibility, evidence, and review state. It is the unit people work on.',
    icon: 'BadgeCheck',
  },
  Annex: {
    label: 'Annex',
    short: 'Top level part of a regulation set.',
    detail:
      'Regulatory content is structured top down. Annex is often a top level container that holds requirements and references.',
    icon: 'FolderTree',
  },
  Regulation: {
    label: 'Regulation',
    short: 'A specific regulatory document within UN-ECE.',
    detail:
      'A Regulation contains chapters and requirements. Some teams evaluate at chapter level, others deliver one package per regulation.',
    icon: 'FileText',
  },
  Chapter: {
    label: 'Chapter',
    short: 'Granular requirement unit inside a regulation.',
    detail:
      'A Chapter is a finer unit that can be evaluated directly. Some chapters require multiple documents or multiple evaluations.',
    icon: 'ListChecks',
  },
  Derivative: {
    label: 'Derivative',
    short: 'A variant of a vehicle project that shares most of the base scope.',
    detail:
      'Example: base model vs sport version. The delta can be small, but regulatory impact can still exist.',
    icon: 'Car',
  },
  Inheritance: {
    label: 'Inheritance',
    short: 'Reuse approved work from a base project where scope is identical.',
    detail:
      'Inheritance works like a template. The derivative starts with reused verdicts and evidence, then only deltas need review.',
    icon: 'GitMerge',
  },
  'Multi-Assignment': {
    label: 'Multi assignment',
    short: 'More than one responsible party per item, because reality is shared ownership.',
    detail:
      'Production, engineering, suppliers, and compliance roles can all be involved. Multi assignment prevents ownership gaps and supports handovers.',
    icon: 'Users',
  },
  RACI: {
    label: 'RACI style roles',
    short: 'A lightweight ownership map per task and role.',
    detail:
      'In this case we use R, A, S. R is Responsible, A is Accountable, S is Supporting.',
    icon: 'Table2',
  },
} as const;

export const featuredVisuals = [
  {
    id: 'v1',
    title: 'Fragmented evidence',
    subtitle: 'Proof lived in PDFs, spreadsheets, SharePoint, and mail threads.',
    icon: 'FileStack',
    bullets: [
      'Tasks depended on [[UN-ECE]] and [[EC]] requirements but lived in scattered files.',
      'Ownership lived in [[OE]] structures, not in vehicle components.',
      'Status and freshness were untrustworthy; updates created rework.',
    ],
    diagram: { type: 'chaos' },
  },
  {
    id: 'v2',
    title: 'Ownership mismatch',
    subtitle: 'OE ownership did not map to vehicle systems and parts.',
    icon: 'Network',
    bullets: [
      '[[OE]] teams were optimized for internal delivery, not for a 1:1 vehicle mapping.',
      'One expert could be responsible across multiple vehicle projects.',
      'Shared ownership and handovers had no single place to live.',
    ],
    diagram: { type: 'orgVsVehicle' },
  },
  {
    id: 'v3',
    title: 'Regulation churn',
    subtitle: 'Updates created rework because nobody saw what changed.',
    icon: 'Scale',
    bullets: [
      'Regulatory hierarchy is [[Annex]] then [[Regulation]] then [[Chapter]].',
      'Each mapped item produces a [[Verdict]]; catalog changes forced re-review.',
      'Affected tasks had to re-enter review with no delta view.',
    ],
    diagram: { type: 'regTree' },
  },
  {
    id: 'v4',
    title: 'Mixed granularity',
    subtitle: 'Work existed at system level and paragraph level, with no roll up.',
    icon: 'Layers3',
    bullets: [
      'Some teams evaluate per [[Chapter]], others deliver one package per [[Regulation]].',
      'Both modes had to coexist without breaking reporting.',
      '[[Multi-Assignment]] was needed; production, engineering, and suppliers all contributed.',
    ],
    diagram: { type: 'granularity' },
  },
] as const;

export const raciMini = {
  legend: [
    { key: 'R', label: 'Responsible', hint: 'Does the work' },
    { key: 'A', label: 'Accountable', hint: 'Owns the outcome' },
    { key: 'S', label: 'Supporting', hint: 'Supports or signs off' },
  ],
  roles: [
    { id: 'techEvalOwner', label: 'Technical Evaluation Owner', icon: 'Wrench' },
    { id: 'tc', label: 'Technical Circle (TC)', icon: 'CircleDot' },
    { id: 'typeApproval', label: 'Type Approval Body', icon: 'ShieldCheck' },
    { id: 'sysAdmin', label: 'System Administrator', icon: 'Settings' },
    { id: 'teamLead', label: 'System Team Lead', icon: 'Users' },
  ],
  tasks: [
    { id: 'tldDoc', label: 'Document TLD sheets per part number', cells: { techEvalOwner: 'R' } },
    { id: 'assignWork', label: 'Assign work packages to evaluators', cells: { teamLead: 'R' } },
    { id: 'copFeatures', label: 'Define and document COP test characteristics', cells: { typeApproval: 'R' } },
    { id: 'releaseReport', label: 'Release conformity report version', cells: { tc: 'R', sysAdmin: 'S' } },
    { id: 'configureProject', label: 'Configure project in the tool', cells: { sysAdmin: 'R' } },
    {
      id: 'checkCompleteness',
      label: 'Check completeness of evaluation',
      cells: { teamLead: 'R', tc: 'A', sysAdmin: 'S' },
    },
  ],
} as const;
