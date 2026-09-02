# EVIDENCE LEDGER — format, conflict resolution, staleness

Implements `EV-7`, `EV-8`, `EV-9`. The ledger sits in the Operator Appendix and is
the audit trail that turns "every fact is tagged" from a claim into something a
second person can check.

The inline tags (`EV-2`) stay — they are what the *client* sees. The ledger is
what the *operator* sees: one row per claim, with everything needed to reproduce
or challenge it.

---

## 1. Format

| Col | Contents |
|---|---|
| **ID** | `E-001`, `E-002`… sequential in the order claims are established. IDs are never reused within a report. |
| **Claim** | The assertion in one sentence, as it will appear to the client. |
| **Source** | Document + page, or URL. Exact enough to return to. |
| **Retrieved** | Date the value was obtained (not the date of the source). |
| **Value / quote** | The literal figure or the quoted Danish phrase it rests on. |
| **Confidence** | High / Medium / Low + the one-word reason (`same-building comp`, `single aggregator`, `blended label`). |
| **Conflicts** | IDs of rows that contradict this one, or `—`. |

Example rows:

| ID | Claim | Source | Retrieved | Value / quote | Confidence | Conflicts |
|---|---|---|---|---|---|---|
| E-007 | Heated area is 138 m² | BBR-meddelelse p.1 | 2026-09-02 | `Samlet boligareal 138 m²` | High | E-008 |
| E-008 | Heated area is 132 m² | tinglysning udskrift | 2026-09-02 | `132 m²` | Medium | E-007 |
| E-021 | The label covers the whole building incl. two shops | energimærke, baggrundsinfo p.4 | 2026-09-02 | `erhvervsareal 210 m²` | High | — |

Every client-facing sentence traces to at least one ID. A sentence that traces to
nothing does not ship (`self-gate` §A).

## 2. Conflict resolution (`EV-8`)

Sources disagree constantly — BBR against tinglysning, the salgsopstilling against
the certificate, one portal against another. The rule is: **adjudicate, publish the
adjudication, keep the loser visible.** Never average, never silently pick.

Procedure:

1. **Record both** as separate rows, each with its own source and date, cross-linked
   in `Conflicts`.
2. **Apply the source hierarchy** (`EV-5`): an original document beats a portal;
   an official register beats an agent's summary; a certificate beats a listing
   text that quotes it.
3. **Ask whether it is a conflict at all.** Many are definitional, not factual:
   BBR area and tinglyst area are measured differently, a "blended building label"
   is not the unit's label, an a conto figure is a prepayment and not a cost. Where
   the difference is definitional, say so — that explanation *is* the resolution,
   and it usually belongs in the client report as a small insight.
4. **State which value the report uses and why**, in one clause. The client sees
   the chosen figure with its tag; the appendix shows the choice being made.
5. **When neither source wins**, leave it open honestly: present both, say the
   discrepancy is unresolved, and name the document that would settle it. An
   unresolved conflict is a legitimate finding — often a good negotiation question.
6. **A material unresolved conflict is a risk flag**, not a footnote. A large
   BBR-vs-tinglyst gap, or a seller disclosure contradicting an expert finding,
   escalates under `MONEY-8`.

Worked example — 140 / 132 / 138 m² from BBR, tinglysning and the floor plan:
BBR is the registered figure and leads; tinglysning measures differently (a modest
gap is a methodology difference, not fraud — say so); the plan is a drawing, not a
survey. The report uses BBR, states the tinglyst figure and the reason for the
difference, and only escalates if the gap is large enough to affect price per m²
materially.

## 3. Staleness (`EV-9`)

Every report states the **data-collection date** and what expires first. Ordered
by how fast they rot:

| Data | Rots in | Handling |
|---|---|---|
| Listing status, asking price | days | Re-verify immediately before any bid advice (`RES-1`) |
| Days-on-market, active comps | weeks | State the retrieval date next to the figure |
| Sold comps | months | Over ~12 months old: usable, but the age is stated in the comp table |
| Association accounts | one financial year | A new special assessment can appear at the next general meeting |
| Tax figures | to the next assessment | Always carry the assessment date and whether it is `foreløbig` or `endelig` |
| Geo-risk, radon, noise | slowly | Stable enough to reuse; still dated in the ledger |

The Limitations section names the shortest-lived figure the verdict depends on.
A report reread three months later must be able to tell its reader what has
probably changed.

## 4. What never enters the client report directly

- A raw web result that has not passed through a ledger row (`EV-7`).
- An unresolved conflict presented as a settled fact.
- Any figure whose retrieval date is unknown.
- A secondary aggregator's claim on a reputational topic without the full caveat
  set (`RES-7`).
