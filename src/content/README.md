# Content Directory

This folder is ready for markdown, JSON, or typed content files used by the app.

## Prototype QA Walkthrough

### 1) Open `/prototypes/kovon`
- **Click path:** Browser address bar → enter `/prototypes/kovon`.
- **Expected visible result:** The Kovon prototype landing view loads with navigation options for Diagnose and DISS flows.
- **Edge state to verify:** If data fails to load, a clearly empty or fallback state appears rather than a broken/blank page.

### 2) Navigate Diagnose → table search/filter → department tag list edits
- **Click path:** Kovon landing → **Diagnose** → use table search input and filter controls → open department tag list editor for a row.
- **Expected visible result:** Table rows update based on search/filter criteria, and department tags can be added/removed with immediate visible row updates.
- **Edge state to verify:** Confirm behavior for an **unassigned tag row** (row with no department tags) and for search/filter returning an **empty result** set.

### 3) Open DISS overview and mentions
- **Click path:** Kovon navigation → **DISS overview** → **Mentions** section/table.
- **Expected visible result:** DISS overview metrics/panels render, and mentions list/table is visible with row-level entries.
- **Edge state to verify:** Validate the **no mentions row** state (empty mentions dataset) displays a clear empty indicator.

### 4) Open `/prototypes/ffp` → click a row → confirm drawer
- **Click path:** Browser address bar → enter `/prototypes/ffp` → click any list/table row.
- **Expected visible result:** Selecting a row opens the side/detail drawer showing the clicked record summary.
- **Edge state to verify:** If the table is empty, confirm an explicit empty-state message and no broken drawer behavior.

### 5) Open full detail page `/prototypes/ffp/FFP-003` → switch tabs and inspect timeline
- **Click path:** Browser address bar → enter `/prototypes/ffp/FFP-003` → switch across available tabs → open/scan timeline panel.
- **Expected visible result:** Full detail view loads for `FFP-003`, tab content changes correctly, and timeline items render in sequence.
- **Edge state to verify:** If timeline events are missing, confirm the tab still renders with a clear "no timeline events" empty state.
