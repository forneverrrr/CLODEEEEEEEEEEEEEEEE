---
name: nordindsigt-boligcheck
description: >
  Generates a complete, brand-styled NordIndsigt BoligCheck property-intelligence
  report for an expat home-buyer in Denmark, from Danish property documents
  (salgsopstilling, tilstandsrapport, elinstallationsrapport, energimærke,
  sælgeroplysninger) and/or a Danish address. ALWAYS use this skill whenever the
  user asks to analyse, review, "check", or "do a report on" a Danish home,
  apartment or holiday house, uploads any such Danish property PDFs, pastes a
  boligsiden / boliga / nybolig / edc / home.dk link, or gives a Danish address
  with a 4-digit postcode for a property check — even if they never say the words
  "report" or "BoligCheck". Covers the buyer use-case for villa, ejerlejlighed,
  andelsbolig, rækkehus and sommerhus, and outputs in English, Russian or Danish.
  The report is critical AND selling ("see what others miss"), never a dry data
  dump; every fact is tagged by source, nothing is invented, and no report is
  delivered without human approval.
---

# NordIndsigt BoligCheck — report builder (v13)

This skill turns Danish property documents and/or an address into one finished,
brand-styled BoligCheck report. **This file is the orchestrator only** — it says
what happens in what order and which module owns each part. The rules themselves
live in `references/rules.md` with stable IDs (`EV-3`, `DOC-1`, `MONEY-5`…);
cite those IDs, never a version number.

> v13 replaced the six chronological addendum layers (v2–v7) with one topic-based
> rule set. Nothing was dropped — `docs/RULE_MAP_v7_to_v13.md` maps every old rule
> to its new ID.

## Rule precedence

Specific beats general: **`type-*.md` > `usecase-*.md` > `rules.md`.** A type
module may narrow, re-weight or disapply a rule in its own domain and must say so.
Two rules at the same level must never conflict — that is a defect, not a choice.

---

## The pipeline

### 1 · Identity, right to buy, and type
Establish the exact object: canonical address, postcode, BFE, matrikel, unit,
zone. Then two gates before any analysis:

- **Right to buy (`LEGAL-1`)** — the Civilstyrelsen test. Unresolved, it outranks
  every other finding, and for a **sommerhus** it is strictest.
  → `references/transaction-and-legal.md`
- **Tenure (`TYPE-1`)** — confirmed from a document or a source naming this exact
  unit. Never inferred from neighbours, the building or the street. Rule out
  **ideel anpart** explicitly.

Then route (`TYPE-2`): `type-villa.md` · `type-ejerlejlighed.md` ·
`type-andelsbolig.md` · `type-raekkehus.md` · `type-sommerhus.md`. Anything
outside the matrix — building plot, farm, new-build project, kolonihave,
houseboat — goes to **specialist mode** (`TYPE-3`), not to the nearest template.

Set `OUTPUT_LANGUAGE` from the user (default: the language they write in).

### 2 · Document inventory → mode
Build the inventory before the research pass: every expected document gets one of
six statuses, checked for **validity, not just presence** (`DOC-1`, `DOC-2`).
Mode A/B/C is derived from that table, never from how documents arrived.
→ `references/document-inventory.md`

Missing private documents are not the end of the road: the agent's listing form
is a legitimate operator route (`references/research-pipeline.md`, "v7 policy"),
run via `pipeline/fetch_salgsmateriale.py`. A fetched file enters the inventory
only once its manifest says `valid` (`DOC-7`). The boligejer.dk MitID gate is a
different, genuinely unbypassable barrier and stays the buyer's own action.

### 3 · Read the documents
As images, always (`DOC-4`, `DOC-5`) — the text layer loses photographs and the
RØD/GUL/GRÅ and brand/stød icon colours. Cross-check the energy label and record
its scope (`DOC-6`). Where photos or a floor plan exist, the visual passes are
mandatory (`VIS-1`, `VIS-2`).
→ `references/visual-inspection.md`

### 4 · Research pass — before the draft, never after
Listing status first (`RES-1`), then the full pass (`RES-2`): price history,
comps under `RES-3` discipline, neighbourhood and daily life, geo-risk,
long-term triggers, future plans. Proxies are area-level only (`RES-6`).
→ `references/research-pipeline.md`

### 5 · Apply the knowledge layers
- **The transaction** — rights, clauses, deadlines, insurance, financing
  structure → `references/transaction-and-legal.md`
- **Long-term ownership and hidden costs** — the non-obvious, high-impact items
  and the cost-over-time iceberg → `references/long-term-and-hidden-costs.md`
- **The home as an asset** — CAGR vs market, break-even hold, liquidity, tax
  → `references/investment-and-liquidity.md`
- **The type's own lenses and scorecard weights** → the active `type-*.md`

### 6 · Calculate and record
Money rules `MONEY-1` … `MONEY-8`: confidence from comp quality, ranges that
explain their width, the five-year cash outlay named honestly, cost lines kept
separate, weights from the type module with N/A weight redistributed.

Every claim that will reach the client goes through the evidence ledger first
(`EV-7`); conflicts are adjudicated, not averaged (`EV-8`); the report carries its
data-collection date (`EV-9`).
→ `references/evidence-ledger.md`

### 7 · Assemble, gate, hand over
Build the report on `templates/report-template.html` (brand CSS, evidence-tag
pills, severity chips, price-delta visual, draft banner, inventory and ledger
tables). Structure and section intents: `references/usecase-buyer.md`.

Then run the **single self-gate** (`GATE-2`) → `references/self-gate.md`.

Passing it does not authorise delivery. Every report ships as
**`DRAFT — NOT FOR CLIENT`** on the cover and in the filename until the operator
approves it (`GATE-1`). Client-facing and site artifacts are produced only from an
approved version; anything destined for nordindsigt.dk additionally passes
`references/site-outputs-and-anonymization.md` (`OUT-6`).

---

## Files

**Rules and process**
- `references/rules.md` — the complete rule set, stable IDs. Start here.
- `references/self-gate.md` — the one pre-output checklist.
- `references/document-inventory.md` — statuses, validity periods, mode derivation.
- `references/evidence-ledger.md` — ledger format, conflict resolution, staleness.

**Knowledge**
- `references/research-pipeline.md` — every data source, auto vs manual, access gates.
- `references/transaction-and-legal.md` — right to buy, købsaftale, deadlines,
  ejerskifteforsikring, financing structure, purchase costs.
- `references/long-term-and-hidden-costs.md` — ownership risks + cost iceberg.
- `references/investment-and-liquidity.md` — CAGR, break-even, liquidity, taxes.
- `references/visual-inspection.md` — photo, floor-plan and zoom discipline.
- `references/site-outputs-and-anonymization.md` — anonymized public artifacts.

**Type and use case**
- `references/usecase-buyer.md` — the client report structure.
- `references/type-villa.md` · `type-ejerlejlighed.md` · `type-andelsbolig.md` ·
  `type-raekkehus.md` · `type-sommerhus.md`

**Assets and tooling**
- `templates/report-template.html` — the HTML skeleton with brand tokens.
- `templates/eksempelrapport_1.html` — the approved anonymized reference.
- `pipeline/fetch_salgsmateriale.py` — operator document fetcher (validating).
