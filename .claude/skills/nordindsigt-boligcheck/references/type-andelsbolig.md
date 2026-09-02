# TYPE MODULE — ANDELSBOLIG (housing cooperative share)

> Loaded when the property is a cooperative share. Read with `core-kernel.md`.
> This type is **fundamentally different** from villa/ejerlejlighed — different price law, financing, liability, resale.

## Detection signals

Classify as **ANDELSBOLIG** when: `andelsbolig`/`andelslejlighed`, `andelsboligforening`/`A/B`, `boligafgift` (not ejerudgift/fællesudgift), **`maksimalpris jf. andelsboliglovens § 5`**, `andel i foreningens formue`, `valuarvurdering`/`anvendt vurderingsprincip`, `fordelingstal X/Y`, `teknisk pris`, `nøgleoplysningsskema`. The buyer purchases a **share**, not real estate.

## Mandatory educational framing (always include in client report)

Open the report with a short "What is an andelsbolig?" box, because foreign buyers routinely misunderstand it: you buy a **share in a cooperative**, not the apartment. Consequences: price is **capped by law** (§5 max-pris); financing uses **`andelslån`** (personal loan) — **realkreditlån is not available**; you carry a **proportional share of the association's debt**; resale is capped at the same max-pris (limited upside); subletting may be forbidden (`fremleje`).

## Expected document set

`salgsopstilling` + `energimærke` + **`nøgleoplysningsskema for andelsboligforeningen`** (+ `årsregnskab`, `budget`, `generalforsamlingsreferater`, `vedtægter`, `forbedringsliste`).

- **Mode A** = salgsopstilling + energimærke + **nøgleoplysningsskema** + regnskab/budget.
- **Mode B (andelsbolig)** = **nøgleoplysningsskema and/or regnskab missing → CRITICAL GATE.** This is the single most important andelsbolig document; if the salgsopstilling literally says "Teknisk pris: Afventer Nøgleoplysningsskema", flag it as critical and tell the buyer not to commit without it. Missing `tilstandsrapport` is normal and NOT a red flag.

## Extraction specifics — andelsbolig-only fields

Extract into the price section:
- **Max-pris (§5)** = `Andel i foreningens formue` + `Forbedringer` + `Særligt tilpasset inventar` − `Fradrag (vedligehold/mangler)`.
- **Valuarvurdering** — value + date + principle (`anvendt vurderingsprincip`). Flag if older than ~2 years.
- **Forbedringer** — amount; **request the `forbedringsliste`** (items, dates, licensed contractors) to verify the §5 calculation.
- **Teknisk pris** = købspris + `forholdsmæssig andel af foreningens gæld` − `omsætningsaktiver`. This is the true economic cost.
- **Fordelingstal** (formue + boligafgift shares).
- **Boligafgift** (monthly), `aconto varme`.
- **Foreningens lån:** lender, type, `restgæld`, `udløb`, `afdragsfrihed`, **rate type / next `rentetilpasning`** (empty field = ask: fixed or variable? `renteswap`?), `personlig hæftelse`.
- **Fremleje** (allowed/forbidden), **maksimal belåning** (has the forening adopted limits? if no → instability risk), `venteliste`, husdyr.
- `ejerpantebrev` in the andel (max andelslån collateral).

## Andelsbolig-specific risk lenses

- 🔴 **Nøgleoplysningsskema missing** → critical gate.
- ⚠️ **Loan rate risk:** variable-rate or swap-exposed `foreningslån` → `boligafgift` can spike if rates rise.
- ⚠️ **No max-belåning rule** → members can over-leverage → association instability.
- ⚠️ **Fremleje forbidden** → no flexibility for an expat who may relocate; inform clearly.
- ⚠️ **Aging collective services** (e.g. old `varmeveksler`, 1-strengs heating, "hard-to-heat outer apartments" noted in energimærke) → shared future cost.
- ℹ️ **Valuarvurdering staleness** → next revaluation may move max-pris up or down.

## Price lens (different from market types)

Do **not** frame as "overpriced vs market." Frame as: (1) is the §5 max-pris correctly calculated? (2) are `forbedringer` documented? (3) **compare the all-in `teknisk pris` to an equivalent ejerlejlighed** in the same area — at equal price, andelsbolig carries more restrictions (no realkreditlån, capped resale, no/limited subletting), which the buyer should weigh.

## Financing & total cost

- **Realkreditlån NOT available** — only `andelslån` (personal loan, typically 1–2% dearer). State this prominently.
- Registration differs from real estate (the andel is registered, not property) — don't apply the 0.6% skøde rule blindly; note the andelsbolig-specific transfer/registration fees from the salgsopstilling.
- Monthly: `boligafgift` + andelslån + utilities. No `ejendomsværdiskat`/`grundskyld` paid directly (covered via the forening).
- Show one-time `kontantbehov ved køb` and the `teknisk pris`.

## Scoring notes

Condition + Renovation-risk are usually **N/A** (no tilstandsrapport — normal). The pivotal category becomes **Association finances & legal structure** (driven by nøgleoplysningsskema/regnskab). Documents score is low if the nøgleoplysningsskema is absent.

---
## ADDENDUM v2 — andel pricing & forening economy (test-driven, 2026)

**NEVER apply ownership-property price logic to an andelsbolig.**
- NO CAGR from a past "sale". The price is the **andelsværdi**, set by the
  andelsforening's **andelskrone** and capped at **maksimalpris** — not a free-market
  price, and it cannot be negotiated upward.
- NO "above/below offentlig vurdering": andelsboliger have **no offentlig vurdering**
  and usually **no vægtet areal** on Boligsiden — these *absences* are how you confirm
  it IS an andel.
- Boligsiden "history" may show a huge old figure (the whole property the forening
  bought, e.g. 13.7 mio.) — do NOT read that as a unit price.

**The real analysis is the forening's economy.** Request and read:
- **årsregnskab + budget** — size/type of **fælleslån** (variable-rate / swap = the
  classic andel trap; a rate reset spikes everyone's boligafgift), grundfond, reserves.
- **andelskrone valuation basis** (anskaffelsessum / kostpris / valuation) — decides
  whether your value is stable or could be **written down** (negative-equity risk).
- **boligafgift trajectory** (the monthly ydelse): what it covers, planned rises,
  large renovations financed by new debt.
- **vedtægter** — subletting, renovation, waiting lists, who you may sell to.

**Financing reality:** banks lend less on andel (andelsboliglån, higher rate, often
≤80%) → smaller buyer pool, slower resale. Price the *ydelse* + boligafgift together.
Output **"Forening economy: not enough data"** until the regnskab is supplied — never
fake a verdict on an andel without it.
