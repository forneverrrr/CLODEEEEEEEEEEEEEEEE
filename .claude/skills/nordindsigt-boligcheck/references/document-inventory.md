# DOCUMENT INVENTORY — statuses, validity, and how the mode is derived

Implements `DOC-1`, `DOC-2`, `DOC-3`, `DOC-7`. The inventory table opens the
Operator Appendix and is the first thing built after the type is detected —
before any research, because it decides what the report can honestly claim.

---

## 1. The six statuses

| Status | Meaning | What the report does |
|---|---|---|
| `present` | Held, readable, **within its validity period** | Analyse it |
| `pending` | Exists but not yet issued — *"under udarbejdelse"* | Gate the section, explain the stage, say when it is expected |
| `expired` | Held, but past its life (§2) | Treat as informational only; state the date and that a fresh one is needed before signing |
| `missing-but-required` | Normally exists for this type, not supplied | GATE + name exactly who must produce it |
| `permanently-not-applicable` | Will never exist — *"vil ikke blive udarbejdet"*, or the type never has it | Section is N/A **in principle**; checklist pivots to a buyer-paid inspection (`DOC-3`) |
| `unknown` | Not yet established whether it exists | Ask; never assume absence |

The difference between `pending` and `permanently-not-applicable` is the one that
has actually gone wrong in real reports — treating "never" as "not yet" tells the
buyer to wait for a document that is never coming.

## 2. Validity periods

Presence is not enough (`DOC-2`). A document past its life is `expired`:

| Document | Validity | Consequence when expired |
|---|---|---|
| `tilstandsrapport` | **6 months** from issue (renewable by the surveyor) | The huseftersyn protection and the attached **ejerskifteforsikring offer lapse with it** — the seller must renew before signing, and a buyer relying on a stale report has no cover |
| `elinstallationsrapport` | **6 months** | Same package as above |
| `energimærke` | **10 years** | Must be valid at the time of sale; an expired label is the seller's obligation to renew — also a small negotiation lever |
| `valuarvurdering` (andel) | **~2 years** in practice | The next revaluation can move the max-pris up **or down**; flag staleness explicitly |
| `nøgleoplysningsskema` (andel) | Tied to the latest annual accounts | A skema built on accounts older than the last financial year is not current |
| `ejendomsdatarapport` | Snapshot, no formal expiry | Age matters: a report older than ~6 months may predate a new BBR entry, jordforurening mapping or lokalplan |
| Association accounts | Latest financial year | Anything older leaves the newest special assessment invisible |

Always record the **issue date** next to the status — "present" without a date
cannot be validated by anyone reading the appendix later.

## 3. Expected documents by type

`R` = required for a complete analysis · `O` = optional / helpful ·
`N` = not applicable to this type by nature.

| Document | villa | rækkehus | ejerlejlighed | andelsbolig | sommerhus |
|---|:--:|:--:|:--:|:--:|:--:|
| salgsopstilling | R | R | R | R | R |
| tilstandsrapport | R | R | O | O | R |
| elinstallationsrapport | R | R | O | O | R |
| energimærke | R | R | R | R | O* |
| sælgeroplysninger | R | R | O | O | R |
| BBR-meddelelse | R | R | O | O | R |
| ejendomsdatarapport | O | O | O | N | O |
| Association: regnskab + budget | N | R | R | R | O |
| Association: referater (2–3 yrs) | N | O | R | R | O |
| Association: vedtægter | N | R | R | R | O |
| Association: vedligeholdelsesplan | N | R | R | O | N |
| nøgleoplysningsskema | N | N | N | **R** | N |
| forbedringsliste | N | N | N | R | N |
| valuarvurdering | N | N | N | O | N |
| Plantegning | O | O | O | O | O |
| købsaftale (draft) | O | O | O | O | O |
| ejerskifteforsikring tilbud | R | R | O | N | R |
| Servitutter / tinglysning udskrift | O | O | O | N | O |
| Udlejnings-/bopælsdokumentation | N | N | O | O | R |

`O*` — a holiday home is commonly **exempt** from the energy-label requirement at
sale; its absence is usually lawful. Confirm rather than assume, and record it as
`permanently-not-applicable` when the exemption applies (`type-sommerhus.md`).

Notes that change the reading:
- For **ejerlejlighed and andelsbolig**, a missing tilstandsrapport is normal and
  **not** a red flag — missing association financials is the critical one.
- For **villa, rækkehus and sommerhus**, missing technical reports *are*
  meaningful: the seller would normally supply them under huseftersynsordningen.
- For **andelsbolig**, `nøgleoplysningsskema` missing = critical gate; the report
  says so before the research pass (`TYPE-5`).

## 4. Deriving the mode

The mode is a *conclusion from the table*, never a description of how documents
arrived (`DOC-1`):

- **Mode A** — every `R` document for the type is `present` and within validity.
- **Mode B** — some `R` documents are `pending`, `expired`, `missing-but-required`
  or `permanently-not-applicable`. Name **which** ones, and for a rækkehus name
  **which half** (technical or association) is missing, since it has two risk
  centres.
- **Mode C** — no private documents at all; only the listing and public data.
  Price confidence is Low by default (`MONEY-3`).

A document fetched by the operator counts only once its manifest says `valid`
(`DOC-7`) — a successful download is not the same as a usable document.

## 5. What the inventory table looks like in the appendix

| Document | Status | Issued | Source | Note |
|---|---|---|---|---|
| salgsopstilling | present | 2026-05-14 | client-supplied | 14 pp, photos read as images |
| tilstandsrapport | expired | 2025-10-02 | operator-fetched (manifest valid) | 6-month validity passed; insurance offer lapsed with it |
| elinstallationsrapport | pending | — | agent, "under udarbejdelse" | expected before viewing; section gated |
| energimærke | present | 2019-03-11 | client-supplied | valid to 2029; label cross-checked visually |
| E/F regnskab 2025 | missing-but-required | — | requested from agent | CVR shows 2024 filing — see ledger E-014 |

Every row carries its status, its date, and how it was obtained. This table is
what makes the mode auditable rather than asserted.
