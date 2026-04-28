// ---------------------------------------------------------------------------
// Motion projects (lives at /motion/[slug])
//
// Single source of truth shared by:
//   - app/(site)/motion/[slug]/page.tsx (detail pages)
//   - app/(site)/motion/CaseStudiesSection.tsx (grid on /motion)
//   - components/DashboardCV.tsx (sidebar Motion section)
// ---------------------------------------------------------------------------

export interface MotionProject {
  slug: string;
  label: string;
  title: string;
  year?: string;
  /** Short teaser shown on the /motion grid card. */
  teaser: string;
  /** Lead paragraph on the detail page header. */
  description: string;
  /** Long-form body on the detail page. */
  body: string;
  tags: string[];
  /** Single hero video (relative public URL). */
  video?: string;
  /** Multiple reels (used for grid + thumbnail fallback). */
  videos?: string[];
  /** YouTube embed id. When set, used for hero + thumbnail. */
  youtubeId?: string;
  /** Sidebar thumbnail image URL. Falls back to YouTube mqdefault when omitted. */
  thumbnail?: string;
  nda?: boolean;
}

const SAMANI_REELS = [
  '/motion/SAMANI/SnapInsta.to_AQMySAYDcKNmXzrN5Ku986kRFIUfwUC-s77KuyCqCk9wF3w5OayIMCFH2t23zcYpNPJeAIOQTDT6_sK2V92U2Mlen2bcLmnS13W5Y8A.mp4',
  '/motion/SAMANI/SnapInsta.to_AQO-Ns7OrZgpftppuzPXgofG5BCV6Zg6jtatIIh-WVTp1OBAHvDthHJd3K0SGVgUrkUZvSnYi-_gfNzKUu_ry54YA08_kn8N2NEPs7A.mp4',
  '/motion/SAMANI/SnapInsta.to_AQPAvN5pqG2-SFZRne34AeGxZQAbilBknn4ZFa4I40VQP9udNnFRgRR-5IhInFPYG0SLol0SBc8z6PnssV98prjK8j4OpYDOhcbKvWQ.mp4',
  '/motion/SAMANI/SnapInsta.to_AQPKSKVo0VuxX_kTth0PlKkmjQU2W6Gape_YdMwRTQBGXAR9yesrf2w14z0gvDYBT7_sNN497y-Mf5PIpXzQaCjdSD7AmwLEWp1Pw1E.mp4',
  '/motion/SAMANI/SnapInsta.to_AQPVAc4ezaPVdtps3Y0iQVR7cBL_ofprCJpPfSUrJsAqyjP8H8oCYfpqkmePttyekF_FWbrtHNZhlWgTNsqQqFNnnpRvgyLqZ1k2pzY.mp4',
];

const KONTRAST_REELS = [
  '/motion/Kontrast/SnapInsta.to_AQMu8_U-IMRTUstDok30PRrRwMX3wABEcBXSS5VcwQVW2WY0Tb-mKTAv1v2qVW3esEkzoUUCy7gATf-HHwC9R1gGy9FKz4A0-JpGDlI.mp4',
  '/motion/Kontrast/SnapInsta.to_AQMzzGPGUYeGmOWBv3SfV25gDz4Olak5_50qeGGxZfMPKmRdEYlAIzNu52xeqxN3VR6QS_8pSDSjfFryaNp3TlPEHiSrrh3hYi6K_jM.mp4',
  '/motion/Kontrast/SnapInsta.to_AQNVMhPfCdYgN6PY-2me8fnsJLSJWd1r8-eJd_G0imqlZXBvdZJQpD9IrrSkn2klrdd17vuozAkHKwtd3H93Agpv4Y-u8jDGIU5NOo4.mp4',
  '/motion/Kontrast/SnapInsta.to_AQNZ-9EZpHuU7M2EfI6QzFMUCJp9UfUDKc9NMjTPRqbcH3fq1mQfxQK9bhbmtjyhr4uczP01TGj5237ugQ6_aeO1U8T-MV0hgdilXHE.mp4',
  '/motion/Kontrast/SnapInsta.to_AQOAXy-uu-zUaLAh2En9C9VZ0hbuZ9zF2KCRc18iOFgBSa3vBXKg7jC5bcEdlKknYehvRwBBiDLJMQKbPmvF6J8uBqqydaDAxxl6Q8c.mp4',
  '/motion/Kontrast/SnapInsta.to_AQP68o_O2jLYVYWcPPr9xtkwXgz3rtcNIdjruN2EjHqdlqxyCRREMuHlanwYdKopofH1g6qs_k35lbaXCl7sKO4mBRceBb9Oa2TaRp8.mp4',
  '/motion/Kontrast/SnapInsta.to_AQPMjjhkJnFTvXIQLnmAxy2nLv8GBKbrRVd5RXFEB4XdJrNfPD9LLCO5WcWGY-cCusFK-s-3KxJM07mJBsRFjGaRzT2Ihp6XdW9mnts.mp4',
  '/motion/Kontrast/SnapInsta.to_AQPjw2_dJvowBLAXWHL_dpoOcAPbDEU_7FBliNboJlaiO4o3RUCzgVd7fBnweX_BtToJRgDUXYQRxbVd7wWp9getcv6mZzj5fJ_YxRs.mp4',
  '/motion/Kontrast/SnapInsta.to_AQPtoqULCInkJUbVaPwPn-v9yc-osIy3GJ3m5XjVRwQue8shtXHtcqDE72PnDJHy48P4A9IoHXcXLUMjIqz3Jt03JRQ9hbgyvxPovmw.mp4',
];

export const MOTION_PROJECTS: MotionProject[] = [
  {
    slug: 'samani',
    label: 'Music Label · Social Content',
    title: 'Samani Music Label',
    year: '2023–2024',
    teaser: 'Modulares Content-System aus Templates und AE-Baukasten — unendliche Variationen, konsistenter Look.',
    description: 'Ein modulares Content-System aus Figma-Templates und After-Effects-Bausteinen — gebaut, damit das Label nicht für jeden Release jemanden suchen muss.',
    body: 'Das Label hat für jeden Release jemanden gesucht, der die Visuals macht — ein Zustand, der nicht skaliert. Ich habe ein modulares System aus Figma-Templates und After-Effects-Bausteinen aufgebaut, das genau das löst: konsistenter Markenlook, beliebige Variationen, alle Formate auf Knopfdruck.',
    tags: ['Social Media', 'Motion Design', 'Figma', 'After Effects', 'Template System'],
    youtubeId: 'vw8GUemVEH8',
    videos: SAMANI_REELS,
  },
  {
    slug: 'kontrast',
    label: 'Festival · Aftermovie',
    title: 'Kontrast Festival',
    year: '2022–2024',
    teaser: 'Kompletter visueller Auftritt: Social Reels, 3D-Ads, Line-up-Content und Director des Aftermovies.',
    description: 'Kompletter visueller Auftritt des Festivals: Social Reels, 3D-Ads, Line-up-Content und Aftermovie.',
    body: 'Ich habe den kompletten visuellen Auftritt des Festivals verantwortet: klassische Videos, 3D-Werbevideos, Line-up-Reels, Ad-Banner. Den Abschluss hat das Aftermovie gebildet — als Director verantwortet und von Anfang an als eigenständiges Stück behandelt.',
    tags: ['Social Media', 'Aftermovie', '3D Motion', 'After Effects', 'Direction'],
    youtubeId: 'Ufrnt73JJDU',
    videos: KONTRAST_REELS,
  },
  {
    slug: 'ensinger',
    label: '3D Motion & Webdesign',
    title: 'Ensinger Mineralbrunnen',
    year: '2024',
    teaser: '3D Hero-Shot für Maracuja-Launch mit akkuraten Fluid-Renderings und HTML5-Banner-Rollout.',
    description: 'Hero-Shot für den Maracuja-Launch mit akkuraten 3D-Fluid-Renderings — plus Webdesign und HTML5-Banner-Rollout.',
    body: 'Für den Launch des neuen Maracuja-Drinks via 80/20 brauchte es einen Hero-Shot, der das Produkt so zeigt, wie Fotografie es nicht kann. Der Kern waren akkurate 3D-Fluid-Renderings, die ich selbst produziert habe. Daneben habe ich die Produkt-Feature-Seite konzipiert und ins Webdesign integriert. Den Abschluss bildete ein großflächiger Rollout über HTML5-Werbebanner und Google Ads.',
    tags: ['3D Motion', 'HTML5 Banner', 'Webdesign', 'After Effects', 'Blender'],
    videos: [
      '/motion/Ensinger/FINAL_Ensinger_hero_landscape_1080p.mp4',
      '/motion/Ensinger/Ensinger_slideshow_final.mp4',
    ],
    video: '/motion/Ensinger/FINAL_Ensinger_hero_landscape_1080p.mp4',
  },
  {
    slug: 'audi',
    label: 'Illustration & Motion',
    title: 'Audi – Digitaler Adventskalender',
    year: '2021–2025',
    teaser: 'Eigenillustration und Animation für den Audi Adventskalender — seit 2021 jedes Jahr neu.',
    description: 'Illustration und Motion Design für den digitalen Audi Adventskalender — seit 2021 jedes Jahr.',
    body: 'Seit 2021 verantworte ich Illustration und Animation für den digitalen Audi Adventskalender — jedes Jahr ein neues visuelles Konzept, jedes Jahr von Grund auf neu entwickelt. Die Bandbreite reicht von weihnachtlichen Charakteren und Fahrzeuganimationen bis zu interaktiven Kalendertürchen, alle mit täglichem Output auf Audi-Niveau.',
    tags: ['Illustration', 'Motion Design', 'Automotive', 'After Effects'],
    video: '/motion/AUDI_christmacalender/Audi_Digitaler_Adventskalender_Video3_rentier02.mp4',
  },
  {
    slug: 'explainer-automotive',
    label: 'Erklärvideo',
    title: 'Automotive Software',
    year: '2023',
    teaser: 'Komplexes Software-Tool für Zertifizierungsprozesse — von Konzept und Skript bis zur Animation.',
    description: 'Erklärvideo für ein komplexes Software-Tool bei einem Automobilkunden — von der Zielgruppenanalyse bis zur fertigen Animation.',
    body: 'Das Ziel war, ein hochkomplexes Software-Tool für Zertifizierungsprozesse so aufzubereiten, dass es für die Zielgruppe verständlich und überzeugend wird. Ich habe das Projekt komplett in einer Hand gehalten: Zielgruppenanalyse, Skript, Storyboard und finale Animation. Details auf Anfrage.',
    tags: ['Konzept', 'Skript', 'Animation', 'Automotive'],
    video: '/motion/Explainer_automotive/20220721_MAIN_EV@LUTION.mp4',
    nda: true,
  },
  {
    slug: 'explainer-schooling',
    label: 'Video Series',
    title: 'Corporate Schooling',
    year: '2023',
    teaser: 'Skalierbare Erklärvideo-Reihe für modulare Schnellschulung — fast null Korrekturschleifen.',
    description: 'Skalierbare Erklärvideo-Reihe für die Schnellschulung neu ausgebauter Rollen in einem Großkonzern.',
    body: 'Das Besondere an dieser Reihe war der Prozess: Vom Skript über das Storyboard direkt in die Animation — mit fast null Korrekturschleifen. Das modulare System ist so gebaut, dass der Kunde neue Episoden selbst fortführen kann, für beliebige Abteilungen und Schulungsinhalte. Details auf Anfrage.',
    tags: ['Skript', 'Storyboard', 'Animation', 'Corporate'],
    video: '/motion/Explainer_Schooling/MAN_TPL-CSM_Revision01.mp4',
    nda: true,
  },
  {
    slug: 'pitch-videos',
    label: 'Pitch Video',
    title: 'Townhall Pitch',
    year: '2022',
    teaser: 'Visuelle Konzeption und Styleframes für einen Townhall-Pitch vor großem internem Publikum.',
    description: 'Visuelle Konzeption und Styleframes für einen internen Townhall-Pitch — ein komplexes Tool, verständlich und überzeugend inszeniert.',
    body: 'Es gab eine intensive Konzept- und Styleframe-Phase, in der die gesamte visuelle Sprache erarbeitet wurde. Das Ziel war, ein komplexes Tool vor einem großen internen Publikum nicht nur zu erklären, sondern so zu präsentieren, dass es überzeugt. Details auf Anfrage.',
    tags: ['Concept', 'Styleframes', 'Pitch', 'Corporate'],
    video: '/motion/Pitch%20videos/Animation_AI_01.mp4',
    nda: true,
  },
];

export function getMotionProject(slug: string): MotionProject | undefined {
  return MOTION_PROJECTS.find((p) => p.slug === slug);
}
