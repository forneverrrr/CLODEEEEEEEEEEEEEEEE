# SELF-GATE — the one checklist (v13)

This is the **only** self-gate. It replaces the two disconnected checklists that
existed before (`core-kernel.md` §10 and the SKILL.md addendum blocks), which
could each be passed while ignoring the other's rules.

Run it silently before emitting any report. Every line names the rule it enforces —
if a line fails, fix the text before output, then re-check.

**Passing this gate does not authorise delivery.** It validates a *draft*.
Delivery requires a human (`GATE-1`).

---

## A. Evidence

- [ ] Every factual claim carries a source tag; nothing untagged ships. `EV-2`
- [ ] Facts, assumptions and recommendations are visibly distinct. `EV-1`
- [ ] No invented comp, price, valuation, date, cost, plan or geodata. `EV-3`
- [ ] Each "not enough data" followed ≥2 real attempts **and** names the document
      or source that would resolve it — except where a parcel-level proxy was
      correctly refused. `EV-4`, `RES-6`
- [ ] Every client-facing fact resolves to an evidence-ledger ID; no raw web
      result went straight into client text. `EV-7`
- [ ] Every source conflict is adjudicated in the ledger with a stated winner and
      reason — none silently dropped, none averaged. `EV-8`
- [ ] The report states its data-collection date and what expires first. `EV-9`
- [ ] No forbidden certainty word used; hedging vocabulary used where required.
      `EV-10`
- [ ] Cover and Limitations state: informational, AI-assisted, not a valuation,
      not legal or financial advice, not an inspection. `EV-11`

## B. Documents

- [ ] The document inventory is complete: every expected document has one of the
      six statuses. `DOC-1`
- [ ] Validity was checked, not just presence — nothing past its life is marked
      `present`. `DOC-2`
- [ ] A permanent absence is framed as permanent ("never", not "not yet"), with
      the checklist pivoted to a buyer-paid inspection. `DOC-3`
- [ ] Every seller PDF with photographs was opened as images. `DOC-4`
- [ ] tilstandsrapport / elrapport (where present) were read as images. `DOC-5`
- [ ] The energy label was cross-checked against the salgsopstilling and its
      scope recorded; any mismatch is stated as a fact. `DOC-6`
- [ ] Operator-fetched documents show `valid` manifest status and are identified
      as operator-fetched in the appendix. `DOC-7`

## C. Type and tenure

- [ ] The subject unit's own tenure is confirmed by a document or a source naming
      that exact unit — never inferred from neighbours, building or street; ideel
      anpart was actively ruled out. `TYPE-1`
- [ ] The correct type module was applied, or specialist mode was declared for an
      out-of-matrix object. `TYPE-2`, `TYPE-3`
- [ ] Andelsbolig: no CAGR, no offentlig-vurdering comparison; the analysis is the
      association's economy. `TYPE-4`
- [ ] Ejerlejlighed / rækkehus: the association-economy block is present. `TYPE-6`
- [ ] Before any "financials not received" gate, the CVR check was run and its
      result stated. `TYPE-7`

## D. Research

- [ ] Listing status was verified first, and a dead listing is not treated as a
      live price. `RES-1`
- [ ] The research pass preceded the draft; nothing was patched in afterwards.
      `RES-2`
- [ ] Comps are free-market, filtered by year and area before drafting,
      de-duplicated by unit, with a same-street/building comp actively searched
      for. `RES-3`
- [ ] The full listing-history timeline is reconstructed. `RES-4`
- [ ] The skybrud / bluespot line was read and reported. `RES-5`
- [ ] No parcel-level claim rests on a neighbour-address proxy; every proxy used
      is labelled and area-level. `RES-6`
- [ ] Any crime or area-reputation claim traces to a primary source or carries the
      full caveat set. `RES-7`
- [ ] School and daycare findings are framed as context, not as a verdict on the
      area. `RES-8`
- [ ] A SAVE rating is stated as a potential constraint pending lokalplan
      verification. `RES-9`

## E. Money

- [ ] Price confidence reflects comp quality, not just count, and says why.
      `MONEY-1`
- [ ] The fair price is a range; public valuation is not treated as market value;
      the asking-vs-vurdering gap is read in both directions. `MONEY-2`
- [ ] Mode C carries Low confidence and no invented range. `MONEY-3`
- [ ] Every money range explains what drives its width, or was widened. `MONEY-4`
- [ ] The five-year figure shows its inputs and is named as a cash outlay
      (ex-financing, ex-residual-value). `MONEY-5`
- [ ] Registration, fees and reserve are separate lines, each statutory rate
      dated and marked "confirm before signing". `MONEY-6`
- [ ] Scorecard weights are the type module's; N/A categories state their reason
      and their weight was redistributed with that stated. `MONEY-7`
- [ ] Risk labels applied; any condition meeting a critical-flag definition is
      flagged. `MONEY-8`

## F. Visual

- [ ] Photos present → a visual-inspection section exists, overlaps with RØD/GUL
      cross-referenced and costed once. `VIS-1`
- [ ] Floor plan present → the pass ran; orientation is determined, or its
      impossibility is explained. `VIS-2`
- [ ] Every asserted small detail was zoomed before assertion; ambiguous ones are
      marked `photo — unconfirmed`. `VIS-3`
- [ ] Every photo tag traces to an image opened in this session; no marketing
      prose restated as observation. `VIS-4`
- [ ] The report says what the photos do not show; no visual diagnosis of mould,
      structure or asbestos. `VIS-5`

## G. Transaction and rights

- [ ] The right-to-buy question is answered or explicitly posed to the buyer, with
      the Civilstyrelsen test explained. `LEGAL-1`
- [ ] Advokatforbehold, fortrydelsesret (6 days / 1%), the bankgaranti deadline,
      refusionsopgørelse, overtagelse and included løsøre are covered in the
      client's language. `LEGAL-2`
- [ ] The ejerskifteforsikring offer is read as a lens, including what it does not
      cover. `LEGAL-3`
- [ ] Financing is described as structure, never as a product recommendation.
      `LEGAL-4`

## H. Output and delivery

- [ ] The report follows the use-case structure; sections adapted, not silently
      dropped. `OUT-1`
- [ ] Entire client report in `OUTPUT_LANGUAGE`; Danish terms glossed on first
      use; appendix in English. `OUT-2`
- [ ] Client report and Operator Appendix are separate; the appendix is marked
      "do not send" and carries inventory + ledger. `OUT-3`
- [ ] The report leads with what others miss; the verdict page stands alone.
      `OUT-4`, `OUT-5`
- [ ] Site-bound HTML passed the anonymization checklist. `OUT-6`
- [ ] No third-party PII; agent contact details and case numbers removed. `OUT-7`
- [ ] **Cover and filename carry `DRAFT — NOT FOR CLIENT`** — absent only in a
      copy the operator has explicitly approved. `GATE-1`
- [ ] Brand palette, fonts and voice applied. `GATE-3`

---

## Script-purity check (site artifacts only)

```bash
# no Cyrillic or CJK in a DA/EN artifact — a real bug from 2026-07-01
python3 -c "import re;t=open('out.html',encoding='utf-8').read();print(len(re.findall(r'[а-яА-ЯёЁ]',t)))"
# identity leak check — must return 0
grep -ci '<real street>\|<real city>\|<agent brand>\|<agent surname>' out.html
```
