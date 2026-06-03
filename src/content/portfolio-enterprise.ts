/**
 * Enterprise projects — src/content/portfolio-enterprise.ts
 * Phase 3 refactoring: extracted from portfolio.ts
 * Projects: kovon, automation, emission-compliance, ffp-dashboard, strategic-ai-consulting, gswin-erp-migration
 * #schema:
 * {
 *   type: "data",
 *   module: "portfolio-enterprise.ts"
 * }
 */
import type { PortfolioSource, PortfolioKitData } from './portfolio.types';
import { getGallery, getPreviewImage } from './portfolio-utils';

const caseStudyKovon = {
  summary: 'Ending audit-panic through digitized compliance tracking.',
  realProblem: "Data was split across isolated Excels; the team didn't know what was done as a critical audit deadline approached.",
  approach: 'I moved the team from "Task Force Mode" into an agile workflow that prioritized transparency over manual file-hunting.',
  solutionConcept: 'A central hub that maps regulations to work packages, ensuring audit-readiness at all times.',
};

const caseStudyAutomation = {
  summary: 'Stopping "Malicious Overwrites" in enterprise SAP environments.',
  realProblem:
    'Platform-wide updates were falsely overwriting locally validated data, forcing experts into weeks of manual rework.',
  approach: 'Mapped failure patterns and defined a safe SAP routine to block inheritance for irrelevant parts.',
  solutionConcept: 'A click-by-click PDD that ensures implementation stays safe and permanent for SAP administrators.',
};

const caseStudyCaesar = {
  summary: 'Readable outliers and adjustable thresholds for emission experts.',
  realProblem: 'Table clutter buried anomalies. Threshold logic was not adjustable, making interpretation slow and unreliable.',
  approach: 'Analyzed table patterns and tested visual encodings for breaches to design high-speed scanning.',
  solutionConcept: 'A strict table hierarchy paired with a flexible settings concept for measurement values.',
};

const caseStudyStrategicAi = {
  summary: 'Strategic AI advisory: POC to hybrid RAG, automation, and ROI-validated handover.',
  realProblem:
    'Consulted on transforming an isolated AI Proof of Concept into a production-ready direction for 500+ processes. Ran the full consulting cycle: use-case identification, prioritization, strategic conceptualization, and ROI validation.',
  approach:
    'Prioritized high-impact AI use cases across 500+ departments—moving from experimental pilots to business-critical automation. Designed the pivot from a fragile "Master Excel" to a Hybrid RAG stack: semantic vector search plus a structured metadata/taxonomy layer for dependable logic (e.g. process successors and responsibilities). Conceptualized an automated ETL via Power Automate to ingest and vectorize new PDFs weekly so the knowledge hub stays current without manual upkeep. Calculated strategic ROI (development vs. schooling hours) and delivered the blueprint for internal implementation.',
  solutionConcept:
    'A validated, scalable architecture with MS Copilot as the primary interface—avoiding custom UI spend and supporting high adoption.',
};

const ffpKit: PortfolioKitData = {
  bentoCards: [
    { title: 'Symptom-first', subtitle: 'Start from the failure.', visual: 'switcher', colSpan: 2 },
    { title: 'Correlation', subtitle: 'One unified fingerprint.', visual: 'metric', value: '1 View' },
  ],
  technicalSpecs: [{ title: 'Workflow', body: 'Restructured the flow around root cause intent instead of part numbers.' }],
};

const kovonConfig = {
  contentTabs: [
    {
      id: 'solution',
      label: 'Solution',
      icon: 'Layout',
      title: 'Audit-ready Hub',
      body: 'Replaced fragmented Excel tracking with a unified Angular pilot.',
      outcomeBullets: ['Eliminated blind spots.', 'Real-time tracking.'],
    },
  ],
  whereItLandedBullets: ['Working beta pilot delivered.', '80% data coverage achieved.'],
  whyRolloutStoppedBullets: ['Strategy shift during scale-up.'],
  featuredCase: {
    glossary: { OE: { label: 'OE', short: 'Org Unit', detail: 'Internal organizational grouping.', icon: 'Building2' } },
    featuredVisuals: [
      { id: 'v1', title: 'The Chaos', subtitle: 'Excel silos.', icon: 'FileStack', bullets: ['No transparency.'], diagram: { type: 'chaos' as const } },
    ],
    raciMini: {
      legend: [{ key: 'R', label: 'Resp', hint: 'Worker' }],
      roles: [{ id: 'tl', label: 'Lead', icon: 'Wrench' }],
      tasks: [{ id: 't1', label: 'Doc', cells: { tl: 'R' } }],
    },
  },
};

export const portfolioEnterprise: PortfolioSource = {
  kovon: {
    id: '1',
    slug: 'kovon',
    title: 'KoVoN COP Pilot',
    navTitle: 'KoVoN COP pilot',
    subtitle: 'Ending Audit-Panic through Conformity of Production.',
    oneLiner: 'Angular pilot that replaced fragmented Excel silos with a transparent compliance hub.',
    category: 'Enterprise',
    year: '2022 - 2024',
    client: 'Automotive (Group)',
    moodImageUrl: getPreviewImage('kovon'),
    galleryUrls: getGallery('kovon'),
    roles: ['Product Designer', 'Scrum Master'],
    problem:
      'Conformity of Production (COP) regulations require rigorous documentation of every vehicle part to meet strict UN standards. If an audit fails, vehicle production halts. The team was flying blind because the mapping of evolving regulations to tasks, and tracking the responsible external persons (outside IT) to verify parts, was buried in fragmented Excel silos.',
    solution:
      'I designed an enterprise-grade compliance hub that provides a highly maintainable framework to organize COP workflows. It enables seamless updates to both vehicle project structures and regulatory task requirements, assigns clear ownership to stakeholders, and streamlines reporting via secure read-only links.',
    description:
      'Replaced Excel tracking chaos with a centralized Angular platform. By structuring complex task hierarchies and providing read-only reporting links, the tool ensures 100% data confidence, clear accountability, and complete audit readiness for over 200 active users.',
    outcomes: ['Eliminated Excel tracking chaos.', '100% visibility for audits.', '200 active users.'],
    tags: ['compliance', 'enterprise', 'automotive'],
    impactCards: [{ label: 'Active Users', value: '200+' }, { label: 'Audit Risk', value: 'Eliminated' }],
    outcomeHighlight: { value: 'Audit', label: 'Ready', description: 'Ensured 100% data confidence for regulatory reviews.', icon: 'ShieldCheck' },
    caseStudy: caseStudyKovon,
    kovon: kovonConfig,
  },

  automation: {
    id: '6',
    slug: 'automation',
    title: 'SAP Automation',
    navTitle: 'SAP automation',
    subtitle: 'Stopping "Malicious Overwrites".',
    oneLiner: 'Restored data integrity by blocking faulty platform overwrites via automated routines.',
    category: 'Enterprise',
    year: '2024',
    client: 'Automotive (Group)',
    moodImageUrl: getPreviewImage('automation'),
    galleryUrls: getGallery('automation'),
    roles: ['Automation Manager', 'Process Analyst'],
    problem:
      '"Malicious Overwrites". Over-secure, legacy SAP automations from the 2000s were destroying validated local data during OEM platform updates. Fixing these errors forced 10 experts to spend 2 hours each per week (eating up 60-70% of their workweek just fixing bugs).',
    solution:
      'We analyzed 18 processes and abstracted 5 core use cases, prioritizing the "low-hanging fruit" to save budget. We fully automated the primary workflow and designed an AI-assisted flow for the second to detect overrides and escalate only complex cases for human review.',
    description:
      'Successfully pitched and delivered an automated routine to protect local data. I created a highly detailed Process Design Document (PDD)—documenting every single click and step a bot must take—so responsible stakeholders could safely review and approve the routines. This ended manual rework cycles and restored data integrity across the inheritance tree.',
    outcomes: ['Ended manual rework cycles.', 'Integrity restored across the tree.'],
    tags: ['automation', 'sap'],
    impactCards: [
      { label: 'PDD', value: '37 pages' },
      { label: 'Weekly time saved', value: '4h / expert' },
      { label: 'Experts impacted', value: '10' },
    ],
    outcomeHighlight: {
      value: 'PDD',
      label: 'Safe',
      description: 'Stopped data destruction in the OEM platform inheritance tree.',
      icon: 'Zap',
    },
    caseStudy: caseStudyAutomation,
  },

  'emission-compliance': {
    id: '8',
    slug: 'emission-compliance',
    title: 'Emission Dashboard',
    subtitle: 'Scan Speed for critical breaches.',
    oneLiner: 'High-speed reporting dashboard using visual encoding to surface breaches in cluttered data.',
    category: 'Enterprise',
    year: '2024',
    moodImageUrl: getPreviewImage('emission-compliance'),
    galleryUrls: getGallery('emission-compliance'),
    roles: ['UX Designer', 'UI Designer'],
    problem:
      'Critical compliance, contract, and physiological data was buried within cluttered tables, creating a high regulatory risk of overlooking anomalies.',
    solution:
      'Created an easy-to-scan visualization dashboard using hierarchy-first design, visual encoding, and adjustable thresholds.',
    description:
      'A high-speed reporting dashboard designed to surface critical breaches instantly. By translating complex data into a clear visual hierarchy, we drastically optimized scan speed and restored 100% control for the users, avoiding overlooked regulatory breaches.',
    outcomes: ['Faster anomaly detection in dense regulatory tables.', 'Adjustable thresholds returned interpretive control to experts.'],
    tags: ['compliance', 'enterprise'],
    outcomeHighlight: { value: '100%', label: 'Control', description: 'Optimized scan speed to ensure zero overlooked breaches.', icon: 'BarChart3' },
    caseStudy: caseStudyCaesar,
  },

  'ffp-dashboard': {
    id: '7',
    slug: 'ffp-dashboard',
    title: 'FFP Dashboard',
    subtitle: 'Expert Diagnostic Workflow.',
    oneLiner: 'Reshaping diagnostics from symptom-first triage to root cause synthesis.',
    category: 'Enterprise',
    year: '2024',
    moodImageUrl: getPreviewImage('ffp-dashboard'),
    galleryUrls: getGallery('ffp-dashboard'),
    roles: ['UX/UI Designer'],
    problem:
      'Experts were forced to context-hop between isolated data silos, hindering automotive diagnostics. I was brought in after six months of fragmented meetings to untangle the messy information architecture and user flows.',
    solution:
      'I gathered all ideas and structured them into a cohesive architectural flow. I abstracted elements into reusable modular components and mapped out complex workflows (e.g., holiday entry, overtime exit).',
    description:
      "Reshaped automotive diagnostics from symptom-first triage to root-cause synthesis. I created a unified high-fidelity prototype that perfectly aligns the UI with the experts' mental model, providing a true investigative story for the users.",
    outcomes: ['Consolidated six months of fragmented input into one coherent flow.', 'Reusable modular patterns for holidays, overtime, and diagnostic workflows.'],
    tags: ['enterprise', 'diagnostics'],
    links: [{ label: 'Live prototype', href: '/prototypes/ffp' }],
    prototypeButtonLabel: 'Explore prototype',
    outcomeHighlight: { value: '1', label: 'Story', description: "Aligned the diagnostic UI with the expert's mental model.", icon: 'MousePointerClick' },
    portfolioKit: ffpKit,
    caseStudy: { summary: 'Investigative UI for automotive diagnostics.' },
  },

  'strategic-ai-consulting': {
    id: '21',
    slug: 'strategic-ai-consulting',
    title: 'Strategic AI Advisory',
    navTitle: 'Strategic AI',
    subtitle: 'From POC to Automated Architecture & ROI.',
    oneLiner:
      'End-to-end AI strategy consulting for 500+ processes: prioritization, hybrid RAG architecture, Power Automate ingestion, ROI validation, and Copilot as the primary interface.',
    category: 'Enterprise',
    year: '2025',
    moodImageUrl: getPreviewImage('strategic-ai-consulting'),
    galleryUrls: getGallery('strategic-ai-consulting'),
    processDiagramUrl: getPreviewImage('architektur-ai'),
    processDiagramLabel: 'AI-assisted knowledge assistant — process architecture (summary)',
    roles: ['AI Strategy Consultant'],
    problem:
      'An isolated AI Proof of Concept had to become a production-ready direction for 500+ processes. The mission was to run the full consulting arc—use-case identification, prioritization, strategic conceptualization, and ROI validation—so the program could scale beyond experiments without betting on costly custom UI.',
    solution:
      'Evaluated and prioritized high-impact AI use cases across 500+ departments, shifting the narrative from "experimental" AI to business-critical automation. Designed the technical pivot from a fragile "Master Excel" to a Hybrid RAG architecture: semantic vector search combined with a structured metadata/taxonomy layer so logic stays accurate (e.g. process successors and responsibilities). Conceptualized an automated ETL pipeline via Power Automate to ingest and vectorize new PDFs weekly, keeping the knowledge hub current without manual intervention. Calculated strategic ROI (development vs. schooling hours) and handed over a final blueprint to internal teams for implementation.',
    description:
      'Delivered strategic AI advisory from POC to a validated, scalable architecture. MS Copilot serves as the primary user interface—eliminating custom UI costs while targeting high adoption. The hybrid RAG and automation design address accuracy, freshness, and operability at enterprise scale; ROI framing and handover positioned internal owners to execute.',
    outcomes: [
      'Prioritized AI use cases across 500+ departments toward business-critical automation.',
      'Hybrid RAG: vectors plus metadata/taxonomy for dependable process logic.',
      'Weekly PDF ingestion and vectorization via Power Automate—minimal manual upkeep.',
      'ROI validated (development vs. schooling); blueprint delivered for internal build-out.',
      'Copilot-first interface: scalable adoption without a custom UI program.',
    ],
    tags: ['ai', 'rag', 'enterprise', 'consulting', 'microsoft', 'copilot', 'power-automate'],
    outcomeHighlight: {
      value: 'Hybrid RAG',
      label: 'Architecture',
      description: 'Semantic search plus taxonomy for accurate logic; automated pipeline to keep knowledge current.',
      icon: 'Sparkles',
    },
    caseStudy: caseStudyStrategicAi,
  },

  'gswin-erp-migration': {
    id: '22',
    slug: 'gswin-erp-migration',
    title: 'GSwin ERP Migration',
    subtitle: 'Lean AI Migration.',
    navTitle: 'GSwin ERP',
    oneLiner:
      'A legacy Handwerks-ERP with 135 isolated databases consolidated into a custom web-based system in 7 days for €200 of AI tokens.',
    category: 'Enterprise',
    year: '2026',
    client: 'Peters GmbH Spenglerei (Handwerksbetrieb)',
    roles: ['Solo Full-Stack Developer', 'AI Workflow Architect'],
    teamSize: 'Solo',
    ribbonLabel: 'Lean AI Migration',
    ermAnimation: { beforeCount: 135, afterCount: 1, label: 'Database consolidation' },
    timelineDonut: {
      segments: [
        { label: 'Daten-Migration', value: 2, color: '#0ea5e9' },
        { label: 'Backend (FastAPI)', value: 2, color: '#10b981' },
        { label: 'Frontend (Next.js)', value: 2, color: '#a855f7' },
        { label: 'Hosting & DevOps', value: 1, color: '#f59e0b' },
      ],
    },
    context:
      'Peters GmbH is a small Handwerksbetrieb (Spenglerei / Dachdecker) running on GSwin/GuWin — a specialized but technically outdated craft-trade ERP. The legacy system had grown organically into 135 isolated databases, all inconsistently linked, with no web access and constant friction in daily operations.',
    problem:
      'GSwin/GuWin was no longer maintainable. The Handwerks-ERP market offered no realistic alternative: competitor systems are too overloaded, too expensive, and migrating from one craft-ERP to another is technically near-impossible. Off-the-shelf solutions were out of the question.',
    solution:
      'Built a custom, lean web-based ERP from scratch in 7 days using a 6-step AI-driven workflow. The data from all 135 isolated GSwin databases was consolidated into a single clean PostgreSQL ERM, exposed via a FastAPI backend, and rendered in a modern Next.js frontend. The whole thing was scaffolded and migrated using opencode (anomalyco/opencode) as router, Claude (Anthropic) API as the strong model, and Figma-to-Code (Anima) for rapid frontend assembly.',
    description:
      'A complete legacy-to-modern ERP rewrite for a German Handwerksbetrieb. The project demonstrates what a focused AI-driven workflow can deliver in the Handwerk segment: where off-the-shelf craft ERPs are over-engineered and cost-prohibitive, a custom, lean system that does exactly what the business needs is now feasible in days instead of months — and at a fraction of the cost.',
    outcomes: [
      '135 isolated GSwin databases consolidated into one clean PostgreSQL ERM.',
      'Full rewrite shipped in 7 days with €200 of Claude API tokens.',
      'Modern, plattformunabhängiges Web-ERP (Desktop & Laptop, hosted on Hostinger).',
      'AI-Workflow (opencode + Claude) accelerated a multi-month project to a single sprint.',
      'Foundation laid for upcoming AI/automation features (payment matching, dynamic pricer, voice-to-quote).',
    ],
    metrics: [
      'Entwicklungszeit: 7 Tage',
      'KI-Token-Kosten: €200 (Anthropic API)',
      'Datenbanken: 135 → 1',
      'Plattform: Web (Hostinger)',
    ],
    highlights: [
      'Volle Migration in 7 Tagen',
      'Nur €200 KI-Token-Kosten',
      'Solo-Entwicklung mit AI-Workflow',
      '135 isolierte DBs → 1 zentrales ERM',
    ],
    tags: ['erp', 'handwerk', 'ai', 'migration', 'nextjs', 'fastapi', 'postgresql', 'opencode', 'claude'],
    moodImageUrl: getPreviewImage('gswin-erp-migration'),
    galleryUrls: getGallery('gswin-erp-migration'),
    impactCards: [
      { label: 'Entwicklungszeit', value: '7 Tage' },
      { label: 'KI-Token-Kosten', value: '€200' },
      { label: 'Datenbanken', value: '135 → 1' },
    ],
    outcomeHighlight: {
      value: 'Lean AI',
      label: 'Migration',
      description: 'Volle Legacy-ERP-Migration in 7 Tagen mit €200 KI-Token-Kosten – solo, mit AI-Workflow.',
      icon: 'Zap',
    },
    links: [{ label: 'Case study', href: '/projects/gswin-erp-migration' }],
    caseStudy: {
      summary:
        'Ein Handwerks-ERP (GSwin/GuWin) mit 135 isolierten Datenbanken wurde in 7 Tagen mit einem AI-Driven-Workflow in ein maßgeschneidertes, schlankes Web-ERP migriert.',
      contextWhyMattered:
        'Peters GmbH ist ein Handwerksbetrieb (Spenglerei/Dachdecker). Die Legacy-Software GSwin/GuWin ist ein spezialisiertes, aber technisch hoffnungslos veraltetes Handwerks-ERP. Konkurrenz-ERPs sind zu überladen, zu teuer oder technisch nicht migrierbar — eine Migration zu einem anderen Standard-Handwerks-ERP wäre unmöglich oder unverhältnismäßig teuer. Eine Eigenentwicklung war die einzige realistische Option.',
      realProblem:
        'Das Legacy-System stützte sich auf 135 isolierte, historisch gewachsene Datenbanken mit inkonsistenten Verknüpfungen. Kein Web-Zugriff, ständige Reibung im täglichen Arbeitsablauf, kein moderner Tech-Stack. Tägliche Schmerzpunkte: Datenduplikate, Suchzeiten, fehlende Mobilität, keine plattformunabhängige Nutzung.',
      constraints:
        'Die Daten durften das interne Netz nicht verlassen — die Migration musste lokal laufen. Keine Standard-Handwerks-ERP-Alternative am Markt verfügbar. Kunde brauchte eine schnelle, schlanke Lösung ohne überladene Features. Solo-Umsetzung, kein Team.',
      myRole:
        'Alleiniger Entwickler über alle Schichten: 2h Discovery vor Ort, Entity-Modellierung, Daten-Migration, Backend (FastAPI), Frontend (Next.js + Figma-to-Code), Hosting (Hostinger), DevOps.',
      approach:
        '1) 2h Discovery beim Kunden — Live-Beobachtung der täglichen Arbeit mit GSwin, Notizen zu genutzten vs. ungenutzten Funktionen. 2) Prozesse niedergezeichnet, ERM entwickelt, Beziehungen der 135 alten DBs aufgelöst. 3) Paper-Sketches → Google Stitch → Figma, Kunden-Freigabe. 4) Migration lokal gestartet (Datenschutz), Template-Frontend vorbereitet. 5) 6-Schritte-AI-Workflow pro Feature: Plan → AI Alignment → Handoff → Test/Dev → Review → Cleanup. 6) Figma-to-Code (Anima) für Frontend-Befüllung, Backend (PDF) als schwierigster Teil. 7) Hosting auf Hostinger, Absicherung.',
      solutionConcept:
        'Ein schlankes, modernes Web-ERP auf Basis von Next.js (Frontend) + FastAPI (Backend) + PostgreSQL (konsolidiertes ERM). Komplette Toolchain: opencode (anomalyco/opencode CLI) als Router, Claude (Anthropic) API als starkes Modell, Figma-to-Code (Anima) für die schnelle Frontend-Befüllung aus dem freigegebenen Design. Gehostet auf Hostinger, plattformunabhängig nutzbar.',
      outcome:
        '7 Tage Entwicklungszeit. €200 KI-Token-Kosten (Anthropic API). 135 isolierte Datenbanken zu einem zentralen PostgreSQL-ERM konsolidiert. Komplett neues, modernes Web-Interface, sicher gehostet auf Hostinger. Nahtlose Nutzung auf Desktop und Laptop — der Arbeitsalltag der Geschäftsführung ist messbar erleichtert. Fundament für die nächsten Iterationen (Payment-Matching, dynamischer Preiskalkulator, KI-Voice-to-Quote) ist gelegt.',
      whatILearned:
        'Selbst wenn ich kein Backend- oder Frontend-Entwickler bin – mit den Programmier-Basics und den richtigen Workflows sind unglaubliche Migrationen möglich. Es braucht nur etwas Mut und Pragmatismus. Im Handwerk sind Standard-ERPs überteuert und hoffnungslos überladen. KI ist kein Hype. Geschäftsmodelle, für die man früher 50.000 € verlangen konnte, sind heute mit den richtigen Tools für einen Bruchteil umsetzbar. Wer das ignoriert, wird fundamental gefährdet.',
      insightAuthor: 'Daniel Peters',
    },
    portfolioKit: {
      beforeAfter: {
        oldImg: '/projects/gswin-erp-migration_legacy-guwin.jpg',
        newImg: '/projects/gswin-erp-migration_hero.png',
      },
      technicalSpecs: [
        { title: 'Frontend', body: 'React / Next.js — modern, plattformunabhängig, mobil-tauglich.' },
        { title: 'Backend', body: 'FastAPI (Python) — schnelle API, PDF-Generierung, Auth.' },
        { title: 'Datenbank', body: 'PostgreSQL — konsolidiertes ERM aus 135 Legacy-DBs.' },
        { title: 'Hosting', body: 'Hostinger — sicher abgeschirmt, Cross-Device-Zugriff.' },
        { title: 'AI-Toolchain', body: 'Claude (Anthropic) API + opencode (anomalyco/opencode CLI) als Router.' },
        { title: 'Design', body: 'Figma + Anima-Plugin (Figma-to-Code) für schnelles Frontend-Templating.' },
      ],
      processSteps: [
        { number: '1', title: 'Discovery', desc: '2h vor Ort beim Kunden — Live-Beobachtung & Notizen.', icon: 'ClipboardList' },
        { number: '2', title: 'ERM', desc: 'Prozesse modelliert, 135 DBs zu einer konsolidierten Struktur.', icon: 'GitBranch' },
        { number: '3', title: 'Prototyping', desc: 'Paper-Sketches → Google Stitch → Figma, Kunden-Freigabe.', icon: 'Sparkles' },
        { number: '4', title: 'AI-Workflow', desc: '6-Schritte-Zyklus: Plan → AI Alignment → Handoff → Test/Dev → Review → Cleanup.', icon: 'Workflow' },
        { number: '5', title: 'Frontend', desc: 'Figma-to-Code (Anima) + Next.js-Integration.', icon: 'Layout' },
        { number: '6', title: 'Backend', desc: 'FastAPI + PDF-Generierung, schwierigster Teil.', icon: 'Server' },
        { number: '7', title: 'Hosting', desc: 'Hostinger-Deployment, Absicherung, Cross-Device-Test.', icon: 'Cloud' },
      ],
      featureItems: [
        {
          icon: 'CreditCard',
          title: 'Automatisierter Zahlungseingang',
          desc: 'KI-gestützter Abgleich eingehender Zahlungen mit offenen Rechnungen.',
          problem: 'Manuelles Zuordnen von Zahlungseingängen kostet täglich Zeit.',
          solution: 'Automatisierter Matching-Algorithmus basierend auf dem konsolidierten ERM.',
          impact: 'Manuelle Zuordnung entfällt — Skalierung des Tagesgeschäfts ohne Mehraufwand.',
        },
        {
          icon: 'Calculator',
          title: 'Dynamischer Preiskalkulator',
          desc: 'Flexible, regelbasierte Preisberechnung für Spenglerarbeiten.',
          problem: 'Aktuelle Preise sind statisch in Vorlagen, Anpassungen sind manuell.',
          solution: 'Parametrischer Kalkulator, der Material, Aufwand und Margen dynamisch kombiniert.',
          impact: 'Schnellere, konsistentere Angebote — weniger Fehler, bessere Margen.',
        },
        {
          icon: 'Mic',
          title: 'KI-Spracheingabe (Voice-to-Quote)',
          desc: 'Vollautomatische Angebotserstellung per Spracheingabe.',
          problem: 'Angebote werden manuell getippt — das kostet Zeit im Akquise-Alltag.',
          solution: 'KI-Transkription + Strukturierung + Generierung ins ERP per Sprachbefehl.',
          impact: 'Vom Diktat direkt ins fertige Angebot — Radikale Beschleunigung der Akquise.',
        },
      ],
      insightAuthor: 'Daniel Peters',
    },
  },
};