# Projektplan: GSwin Legacy-ERP Migration & Modernisierung

> **Ribbon:** "Lean AI Migration"
> **Status:** Case Study (Portfolio-Eintrag)
> **Zielgruppe:** Tech-Recruiter

---

## 1. Projektübersicht

Der Betrieb ist ein **Handwerksbetrieb (Spenglerei/Dachdecker)**. Die Legacy-Software **GSwin/GuWin** ist ein spezialisiertes Handwerks-ERP – technisch veraltet und extrem fragmentiert. Das System stützte sich auf **135 isolierte Datenbanken**, die historisch gewachsen und inkonsistent miteinander verknüpft waren.

Am Markt gibt es keine brauchbare Alternative: Andere Handwerks-ERPs sind zu überladen, zu teuer oder technisch nicht migrierbar. Eine Migration von einem Handwerks-ERP zu einem anderen wäre unverhältnismäßig teuer oder unmöglich. Ziel war es daher, die veraltete Struktur aufzubrechen und ein **maßgeschneidertes, schlankes Web-ERP** zu schaffen.

## 2. Zielsetzung

- Ablösung der fragmentierten Legacy-Datenstruktur (GSwin)
- Konsolidierung zu einem zentralen ERM
- Plattformunabhängige Web-Applikation (Desktop & Laptop)
- Skalierbare Basis für KI- & Automatisierungs-Features
- **Schlanker als Standard-Handwerks-ERPs, günstiger als Konkurrenz**

## 3. Der Prozess (authentisch)

### 3.1 Discovery (2 Stunden vor Ort)

Der Kunde wurde besucht. 2 Stunden lang wurde live beobachtet, wie er mit dem alten GSwin-System arbeitet:
- Welche Funktionen nutzt er wirklich?
- Welche braucht er nicht?
- Wo liegen die täglichen Schmerzpunkte?

Alles wurde mitgeschrieben.

### 3.2 Analyse & Modellierung (daheim)

- Die erfassten Prozesse wurden niedergezeichnet
- Daraus wurde ein **Entity-Relationship-Diagramm (ERM)** entwickelt
- Die Beziehungen der 135 alten DBs wurden aufgelöst und in ein sauberes Modell überführt

### 3.3 Prototyping

- **Paper Sketches** in Google Stitch geworfen, um erste Ideen zu brainstormen
- In **Figma** strukturierte UX/UI-Entwürfe daraus entwickelt
- Dem Kunden gezeigt und freigegeben

### 3.4 Migration & Entwicklung (parallel zur Freigabe)

- Die **Daten-Migration** lief lokal (keine Daten nach außen)
- **Toolchain:**
  - **opencode (anomalyco/opencode CLI)** als Router
  - **Claude (Anthropic) API** als starkes Modell für Migration & Entwicklung
- **Template:** Ein vorgefertigtes Next.js-Template wurde genutzt
  - Nachdem das Template stand, wurde **Figma to Code (Anima-Plugin)** verwendet, um die Designs schnell ins Frontend zu überführen
- **Der schwierigste Teil:** Backend-Logik für PDF-Anzeige und -Generierung sowie die Iterationen, um Frontend-Fixes mit Backend glattzuziehen

### 3.5 Der AI-Workflow (Zyklus)

Jede Einheit folgte diesem 6-Schritte-Zyklus:

```
📝 Plan (.md)
    ↓
🧠 AI Alignment
    ↓
🤝 Handoff & Vertical Slicing
    ↓
🧪 Test → 💻 Dev
    ↓
🔍 Review & Sync Truth
    ↓
🗑️ Cleanup Plannings & Rinse
```

Dieser Zyklus wurde pro Feature durchlaufen und ermöglichte die extreme Geschwindigkeit.

## 4. Tech Stack

| Schicht | Technologie |
|---------|-------------|
| Frontend | React / Next.js |
| Backend | FastAPI (Python) |
| Datenbank | PostgreSQL (konsolidiertes ERM) |
| Hosting | Hostinger |
| AI-Tools | Claude (Anthropic) API + opencode (anomalyco/opencode CLI) |
| Design | Figma via Anima (Figma to Code) |
| Prototyping | Paper Sketches → Google Stitch → Figma |

## 5. Timeline (7 Tage)

| Tag | Phase | Dauer |
|-----|-------|-------|
| 1–2 | **Daten-Migration** – GSwin-DBs → PostgreSQL ERM | 2 Tage |
| 3–4 | **Backend** – FastAPI (API-Routen, PDF, Logik) | 2 Tage |
| 5–6 | **Frontend** – Next.js (Figma to Code + Integration) | 2 Tage |
| 7 | **Hosting & DevOps** – Hostinger-Deployment, Absicherung | 1 Tag |

**Visualisierung (geplant für Case Study):**
- **Donut-Diagramm** (Zeitverteilung: 28% / 28% / 28% / 14%)
- **Detaillierte Timeline** (7 Tage mit Meilensteinen)

## 6. ERM & Architektur

- **Vorher:** 135 isolierte, historisch gewachsene GSwin-Datenbanken
- **Nachher:** Ein zentrales, sauberes PostgreSQL-ERM auf Basis der Discovery

**Visualisierung (geplant):** Vorher/Nachher-Animation – 135 Knoten fließen zu einem zentralen ERM zusammen.

## 7. Ergebnis & Impact

| Metrik | Wert |
|--------|------|
| Entwicklungszeit | **7 Tage** |
| KI-Token-Kosten | **200 € (Anthropic API)** |
| Datenbanken | **135 → 1 konsolidiertes ERM** |
| Plattform | Web-App (Hostinger, plattformunabhängig) |
| Geräte | Desktop & Laptop |

> *Die alte GSwin-Datenbank wurde vollständig in eine neue, bereinigte Struktur überführt. Ein komplett neues Web-Interface, sicher gehostet auf Hostinger. Das ERP ist auf allen Geräten nahtlos nutzbar.*

## 8. Ausblick & Roadmap (3 Features)

| Feature | Beschreibung | Status |
|---------|-------------|--------|
| 💳 Automatisierter Zahlungseingang | Abgleich eingehender Zahlungen | Coming next |
| 📊 Dynamischer Preiskalkulator | Flexible Preisberechnung | Coming next |
| 🎙️ KI-Spracheingabe | Voice-to-Quote für Angebotserstellung | Coming next |

## 9. What I Learned

> *"Selbst wenn ich kein Backend- oder Frontend-Entwickler bin – mit den Programmier-Basics und den richtigen Workflows sind unglaubliche Migrationen möglich. Es braucht nur etwas Mut und Pragmatismus. Im Handwerk sind Standard-ERPs überteuert und hoffnungslos überladen. KI ist kein Hype. Geschäftsmodelle, für die man früher 50.000 € verlangen konnte, sind heute mit den richtigen Tools für einen Bruchteil umsetzbar. Wer das ignoriert, wird fundamental gefährdet."*

## 10. Case Study Mapping (CaseStudyTemplate)

| Template-Sektion | Inhalt |
|-----------------|--------|
| `summary` | 135 isolierte GSwin-DBs → maßgeschneidertes Handwerks-Web-ERP in 7 Tagen via AI-Workflow |
| `contextWhyMattered` | Handwerksbetrieb mit veralteter Spezialsoftware (GSwin) – Konkurrenz-ERPs zu komplex/teuer, Migration zu anderen Systemen unmöglich |
| `realProblem` | GSwin-Chaos: 135 inkonsistente DBs, alter Tech-Stack, kein Web-Zugriff, tägliche Schmerzpunkte im Arbeitsablauf |
| `constraints` | Daten durften nicht nach außen, Kunde brauchte schnelle Lösung, Handwerks-ERP-Markt hat keine passende Alternative |
| `myRole` | Alleiniger Entwickler – Discovery, ERM, Backend, Frontend, DevOps |
| `approach` | 2h Discovery vor Ort → ERM → Paper Sketches → Figma → AI-Workflow (Zyklus) |
| `solutionConcept` | Next.js + FastAPI + PostgreSQL + opencode + Claude API |
| `outcome` | 7 Tage, 200 €, 135→1 DB, Cross-Device, Hostinger |
| `whatILearned` | Siehe Abschnitt 9 |

**PortfolioKit-Module (alle aktiv):**

| Modul | Inhalt |
|-------|--------|
| `processSteps` | 6-Schritte-Workflow-Zyklus |
| `technicalSpecs` | Tech-Stack-Tabelle |
| `featureItems` | 3 Future-Features (Roadmap) |
| `impact` / `impactCards` | 7 Tage, 200 €, 135→1 DBs |
| `galleryUrls` | Screenshots (siehe Anhang) |
| `beforeAfter` | GSwin Legacy ⇔ Modernes ERP (BeforeAfterSlider) |

## 11. Startseiten-Integration

| Element | Beschreibung |
|---------|-------------|
| **Typ** | Featured Project im Hero-Bereich |
| **Hero-Visual** | Screenshot des neuen Frontends |
| **Ribbon** | "Lean AI Migration" (Badge) |
| **Animation** | Animierter Link/Übergang zur Case Study |
| **ERM-Animation** | Vorher/Nachher (135 DBs → 1 ERM) |

## 12. Anhang: Screenshots & Medien

Alle Screenshots liegen auf dem Desktop unter `/Users/apple/Desktop/`.

### 12.1 Neuste Screenshots (2026-06-03) – Neues Frontend (AFTER)
- `/Users/apple/Desktop/Bildschirmfoto 2026-06-03 um 01.07.57.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-06-03 um 01.09.08.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-06-03 um 01.09.21.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-06-03 um 01.09.34.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-06-03 um 01.10.05.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-06-03 um 01.11.16.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-06-03 um 01.12.46.png`
- `/Users/apple/Desktop/screencapture-peters-erp-rechnungen-new-2026-06-03-01_48_54.png`

### 12.2 Blurred Previews (2026-06-03) – Neue UI (unscharf für Anhang)
- `/Users/apple/Desktop/blurred_Bildschirmfoto 2026-06-03 um 01.07.57.png`
- `/Users/apple/Desktop/blurred_Bildschirmfoto 2026-06-03 um 01.09.08.png`
- `/Users/apple/Desktop/blurred_Bildschirmfoto 2026-06-03 um 01.09.21.png`
- `/Users/apple/Desktop/blurred_Bildschirmfoto 2026-06-03 um 01.09.34.png`
- `/Users/apple/Desktop/blurred_Bildschirmfoto 2026-06-03 um 01.10.05.png`
- `/Users/apple/Desktop/blurred_Bildschirmfoto 2026-06-03 um 01.11.16.png`
- `/Users/apple/Desktop/blurred_Bildschirmfoto 2026-06-03 um 01.12.46.png`

### 12.3 Legacy GSwin (BEFORE) – für Before/After Slider
> *Bitte pfad anpassen, sobald das GSwin/GuWin 2.1 Screenshot verfügbar ist*

### 12.4 Ältere Screenshots (Prozess, 2026-03 bis 2026-04)
- `/Users/apple/Desktop/Bildschirmfoto 2025-10-08 um 14.04.08.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-05 um 00.21.20.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-09 um 14.29.39.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-09 um 23.12.54.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-09 um 23.13.25.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-09 um 23.23.43.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-09 um 23.26.39.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-10 um 00.16.06.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-10 um 00.42.47.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-17 um 21.51.16.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-17 um 21.51.26.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-22 um 13.56.40.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-03-22 um 13.56.55.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-04-01 um 15.32.09.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-04-01 um 15.33.20.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-04-01 um 15.47.39.png`
- `/Users/apple/Desktop/Bildschirmfoto 2026-04-02 um 09.38.13.png`
- `/Users/apple/Desktop/whatsapp_image_2026_04_29_at_12.53.34.jpeg.png`

---

## Übersicht aller getroffenen Entscheidungen

| # | Entscheidung | Wert |
|---|-------------|------|
| 1 | Art des Projekts | Case Study / Portfolio |
| 2 | Zielpublikum | Tech-Recruiter |
| 3 | Frontend | React / Next.js |
| 4 | Backend | FastAPI (Python) |
| 5 | Datenbank | PostgreSQL |
| 6 | AI-Kosten | Claude API (Pay-per-Use) |
| 7 | Datenquelle | Payload CMS |
| 8 | Startseite | Featured Project im Hero |
| 9 | Hero-Visual | Screenshot neues Frontend |
| 10 | Vorher/Nachher | BeforeAfterSlider |
| 11 | Ribbon | "Lean AI Migration" |
| 12 | Navigation | Animierter Link zur Case Study |
| 13 | ERM-Visualisierung | Vorher/Nachher-Animation |
| 14 | Timeline-Visualisierung | Donut + Detail-Timeline |
| 15 | Future Features | Roadmap-Kacheln |
| 16 | AI-Tool | opencode (anomalyco/opencode CLI) |
| 17 | Figma-to-Code | Anima-Plugin |
