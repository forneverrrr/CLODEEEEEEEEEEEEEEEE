# RULES — the complete BoligCheck rule set (v13)

Single source of truth. Replaces `core-kernel.md` and the six chronological
addendum layers (v2–v7) that preceded this file. Every rule that existed before
is here; the layering is gone. `docs/RULE_MAP_v7_to_v13.md` maps each old number
to its new ID.

**IDs are stable.** Cite them (`EV-3`, `DOC-2`) from any module; they do not move
when rules are added. New rules take the next free number in their group and are
never renumbered.

**Precedence.** Specific beats general: `type-*.md` > `usecase-*.md` > this file.
A type module may narrow, re-weight or disapply a rule *in its own domain* and
must say so explicitly. Two rules at the same level must never conflict — if they
do, that is a defect to fix, not a choice to make.

Groups: **EV** evidence · **DOC** documents · **TYPE** type & tenure ·
**RES** research · **MONEY** money & scoring · **VIS** visual · **LEGAL** the
transaction · **OUT** output · **GATE** delivery.

---

## EV — Evidence & sourcing

**EV-1 · Separate fact, assumption and recommendation.** Every statement is one of
three: **FACT** (a document, a named web source, or our own calculation),
**ASSUMPTION** (reasoned but uncertain — labelled as such), **RECOMMENDATION**
(what the buyer should do next). Never let an assumption read as a fact.

**EV-2 · Tag every factual claim inline.** `[salgsopstilling p.X]` ·
`[tilstandsrapport p.X]` · `[elrapport p.X]` · `[energimærke p.X]` ·
`[nøgleoplysningsskema]` · `[web: source, date]` · `[calculation]` ·
`[photo observation]`. A claim with no tag does not ship.

**EV-3 · Never invent.** No fabricated comps, prices, public valuations,
days-on-market, renovation costs, local plans, geodata, or dates. If a number
cannot be sourced, it does not appear — not even as an illustration.

**EV-4 · "Not enough data" is honest, but it is the last resort.** Use it only
after at least two genuine attempts at an alternative source or route, and always
name the exact document or source that would resolve it. *(Exception: where RES-6
forbids a proxy, "not enough data" is the immediate and correct answer — no
further attempts required.)*

**EV-5 · Source hierarchy.** (1) attached property documents; (2) official Danish
sources — kommune, Skatteministeriet, BBR, Vurderingsportalen, Miljøstyrelsen,
Vejdirektoratet, Sikkerhedsstyrelsen, Energistyrelsen, Datafordeler, tinglysning.dk;
(3) major portals (Boliga, Boligsiden, mægler sites); (4) local planning and news;
(5) renovation price guides — rough ranges only. Do not use paywalled or
login-gated sources beyond what the operator legitimately holds.

**EV-6 · A surprising result raises the verification bar.** Record it, re-verify
against a second independent source, and log any conflict in the ledger. Surprise
is never a reason to believe faster. On contested or reputational topics keep the
framing factual, sourced and non-discriminatory.

**EV-7 · Everything reaches the client through the evidence ledger.** A raw web
result never goes straight into client text. It enters the ledger first (see
`evidence-ledger.md`), gets an ID, and the client sentence traces to that ID.

**EV-8 · Conflicts are adjudicated, not averaged.** When sources disagree, follow
the procedure in `evidence-ledger.md`: name both values, apply the hierarchy,
state which one the report uses and why, and keep the loser visible. Never
silently pick one, never split the difference.

**EV-9 · Data ages — say when it was taken.** Every report states its
data-collection date and which figures expire first (asking price and listing
status expire fastest; comps within months; tax figures at the next assessment).
A comp older than ~12 months is used only with its age stated.

**EV-10 · Forbidden and required vocabulary.** Never: *guaranteed · exact value ·
official valuation · legally reliable · safe to buy · definitely overpriced /
underpriced · you should buy / not buy*. Always prefer: *preliminary · indicative ·
estimated range · based on available documents · not enough data · confidence
Low / Medium / High*. A verdict describes our analysis, never promises an outcome.

**EV-11 · What this product is and is not.** It IS an informational, AI-assisted
preliminary analysis; buyer-protective decision support; useful *before* money is
spent on a lawyer, surveyor, bank or bid. It is NOT an official valuation
(`offentlig vurdering`), legal advice, financial or mortgage advice, a building
inspection, or a guarantee — and it never replaces a lawyer, bank, agent,
surveyor or authorised specialist. This appears on the cover and in Limitations.

---

## DOC — Documents & inventory

**DOC-1 · Build the document inventory first; the mode follows from it.** For every
document expected for the detected type, record exactly one status: `present /
pending / expired / missing-but-required / permanently-not-applicable / unknown`.
Mode A/B/C is *derived* from that inventory — never from how the documents
arrived. Full procedure and the per-type table: `document-inventory.md`.

**DOC-2 · Check validity, not just presence.** A document past its life is
`expired`, not `present`: energimærke **10 years**, tilstandsrapport and
elinstallationsrapport **6 months** (and the ejerskifteforsikring offer expires
with them), andelsbolig valuarvurdering **~2 years**. Dates and consequences:
`document-inventory.md`.

**DOC-3 · Permanent absence is not a pending document.** *"Under udarbejdelse"* =
temporary: explain the stage and gate the section until the report arrives.
*"Der vil ikke blive udarbejdet tilstandsrapport / elinstallationsrapport"* =
permanent: those sections are N/A for this listing forever, the client text says
so plainly ("not later — never"), and the checklist pivots to a buyer-paid
independent inspection. Never present a permanent absence as something to wait for.

**DOC-4 · Read every seller document as images.** The salgsopstilling carries real
photographs of the object; text extraction loses all of them. Convert to images
(pdf2image / pdftoppm ≥150 dpi) and view the pages.

**DOC-5 · Technical reports are read as images, always.** The colour of a
RØD/GUL/GRÅ rating and the brand/stød/ulovligt/undersøges icons are not reliably
carried by the PDF text layer. Only the rendered image is authoritative — this
has produced real misreadings.

**DOC-6 · Cross-check the energy label, and check its scope.** Compare the letter
on the certificate against the letter in the salgsopstilling every time; a
mismatch is a plain fact for the report, not something to silently resolve (it has
recurred with the same agent network — flag as a possible pattern, unconfirmed).
Then open the certificate's BAGGRUNDSINFORMATION page: total heated area, boligareal
vs erhvervsareal, number of units covered. A building-level label — especially one
including commercial space — is a blended average, not the unit's performance; say
so and ask for the seller's actual 12-month heat and electricity bills.

**DOC-7 · State how each document was obtained.** Operator-fetched PDFs
(`pipeline/fetch_salgsmateriale.py`) enter the inventory only after the fetcher's
`manifest.json` marks them `valid`, and the Operator Appendix records which
documents were operator-fetched rather than client-supplied. Provenance is a fact,
not a detail to hide.

---

## TYPE — Type & tenure

**TYPE-1 · Never infer tenure.** Ownership form is not inferred from neighbouring
units, the building name, the street, or the portal's category — the same building
can mix andelsboliger, ejerlejligheder and **ideel anpart** unit by unit. Until the
subject unit's own tenure is confirmed by a document or a source naming that exact
unit, do not apply CAGR, offentlig-vurdering comparison, or association logic.
Watch specifically for **ideel anpart / villalejlighed**: it looks like an
apartment on the portal but is a share of a whole property — no realkredit, no
ejerlejlighed status, a much narrower buyer pool.

**TYPE-2 · Route to the type module.** villa → `type-villa.md`; owner-occupied flat
→ `type-ejerlejlighed.md`; cooperative share → `type-andelsbolig.md`; townhouse →
`type-raekkehus.md`; holiday home → `type-sommerhus.md`. The type module owns its
scorecard weights, its document set and its risk lenses.

**TYPE-3 · Out of the matrix → specialist mode.** Building plots (byggegrund),
farms (landejendom), new-build/project sales, kolonihave, houseboats and complex
leased-ground cases are **not** analysed with the nearest type's lens. Say plainly
that this object falls outside the standard matrix, deliver only the layers that
genuinely apply (identity, public data, neighbourhood, legal gates), and name what
a specialist must cover. Forcing a villa template onto a farm is a methodology
failure, not a best effort.

**TYPE-4 · Never price an andelsbolig like property.** No CAGR from a past "sale",
no above/below offentlig vurdering (andelsboliger have none — that absence is how
you confirm the type). The price is the andelsværdi, capped by §5 maksimalpris.
A large historical figure in the portal's history is the property the association
bought, not a unit price. The real analysis is the association's economy.

**TYPE-5 · Warn before analysing an andelsbolig in Mode C.** Before the research
pass, tell the user the report will be largely "not enough data" for this type,
because the substantive analysis depends entirely on the
nøgleoplysningsskema/regnskab. Tell them to request it first; run the public layer
anyway if they still want it.

**TYPE-6 · An apartment report always contains the association-economy block.**
Never analyse an ejerlejlighed with villa logic. The biggest hidden cost is the
part the listing does not show: pending facade/roof/riser/kloak works, special
assessments, fælleslån and solidarisk hæftelse, what fællesudgift actually covers,
fordelingstal, vedtægter.

**TYPE-7 · Run the free CVR check before writing "financials not received".**
For ejerlejlighed and andelsbolig, look the association up on datacvr.virk.dk —
årsrapporter are frequently filed publicly and give debt, equity and auditor
remarks even when the agent sent nothing. The GATE text then states what the
public filing shows and what still must come from the agent.

---

## RES — Research

**RES-1 · Confirm the listing is live before anything else.** Portal pages surface
as archived, sold or stale cache. If the property is not currently for sale, do
not build a fair-price section on a dead asking price — say plainly that the
address is not listed now and that the analysis rests on the last recorded
transaction, and tell the buyer to confirm the status manually.

**RES-2 · The full research pass happens before the draft, never after.** Minimum:
listing status (RES-1), full price history, offentlig vurdering, BBR, comps,
schools with real figures, geo-risk, neighbourhood, long-term cost triggers.
Patching research into a finished draft produces a report that argues with itself.

**RES-3 · Comp discipline.** Free-market sales only — exclude family transfers.
Filter by build year (±5 years) and area (±20%) **before** the comps reach the
draft, never afterwards. A sale in the same building or the same street with close
parameters is the single strongest comp — search for it explicitly (Boliga by
street and number). **De-duplicate by unit**: a sold record and a later listing can
be the same home after a flip. Note which floor each apartment comp sits on.

**RES-4 · Reconstruct the whole listing history, not the days-on-market number.**
Withdrawals, relists and every price change across cycles. A withdrawal followed by
a higher-priced relist is a direct question for the agent, not a guess.

**RES-5 · Always read the skybrud / bluespot line.** *"Mulig påvirkning ved en
N-års hændelse"* becomes an explicit cloudburst flag tied to the insurance trend;
a low N is a frequent recurrence — say so.

**RES-6 · A neighbour address is an area proxy only.** Allowed, clearly labelled,
for area-level data: radon class, road/rail noise, school metrics, demographics.
**Forbidden** for anything parcel-level: soil V1/V2, servitutter, BBR facts,
plot-level flood or bluespot. There, the honest answer is "not enough data" plus
the exact source the buyer should pull (see EV-4).

**RES-7 · Crime and area-reputation claims need a primary source.** Acceptable:
politi.dk statistics, Danmarks Statistik KRIM tables, the kommune's own
tryghedsundersøgelse. If the only trail is a secondary aggregator citing a
newspaper, the claim may appear only with the named source chain, explicit
"requires independent verification" wording, and no definitive framing. An SEO
page's superlative never stands as fact.

**RES-8 · Family-life signals are context, not verdicts.** A school average below
the national ~7/12 is a flag to pair with the trend and the trivsel figure, never
a verdict on the neighbourhood. Near a listed *udsat boligområde*, check the
kommune's 30% daycare intake cap — a child can be redirected to a further
institution even when the local one has space. High impact, rarely known.

**RES-9 · A SAVE rating is a potential constraint until verified.** Category ≤4 on
kulturarv.dk/FBB means facade and window changes *may* need approval. State it as
"potential constraint — verify against the lokalplan / kommune decision"; only
after that check may the report assert an actual restriction.

---

## MONEY — Money & scoring

**MONEY-1 · Price confidence is count × quality.** Not the number of comps alone:
weigh similarity (year, area, type), recency, and whether any comp is same-street
or same-building. Three weak comps are not Medium confidence; one same-building
sale plus two decent ones can be. State the confidence and the reason.

**MONEY-2 · A fair price is always a range, and the public valuation is not it.**
Offentlig vurdering is never treated as market value; an asking price far below it
is a signal to investigate, not a bargain. Compare asking to vurdering in **both**
directions — above is as much a signal as below, though a premium over a
preliminary valuation is normal for renovated urban flats; say which case applies.

**MONEY-3 · Mode C price confidence is Low by default.** Never output an invented
fair-price range from public data alone.

**MONEY-4 · Explain the width of every range, or widen it.** State what drives the
low end and what drives the high end. A narrow spread signals the expensive
scenario was never thought through — but a justified narrow range (a fixed-price
quote, a single known part) passes with its justification stated. Ranges are
estimates sourced from real current Danish prices, never contractor quotes; always
add "get binding quotes".

**MONEY-5 · Five-year cash outlay — the standard comparison figure.**
`5yr = price + 60 × (full monthly incl. actual heat, electricity and water) +
midpoint renovation reserve`. Name it honestly: **five-year cash outlay
(ex-financing, ex-residual-value)**. It compares objects; it is not an economic
cost of ownership, and it must say so wherever it appears. Where no renovation
reserve can be set (no tilstandsrapport), show the figure with an asterisk and
state that it can only rise. Show the multiplier against the advertised monthly
cost and why it differs (~1.3–1.4× for flats, ~2–3× for houses — the roof sits
inside fællesudgift for a flat).

**MONEY-6 · Keep the Danish cost lines separate.** (1) ownership-transfer
registration `tinglysning/skøde`; (2) mortgage registration `tinglysning af pant`,
only if a mortgage is assumed; (3) bank, legal and insurance fees; (4) renovation
reserve. Never merge them. Every statutory rate carries its year and the line
"confirm before signing" — the fixed elements change almost annually. Current
figures and the andelsbolig exception: `transaction-and-legal.md`.

**MONEY-7 · The scorecard, and where its weights come from.** Six categories,
scored in steps of 5 on 0–100, each with a one-line reason, weighted to an overall
figure. The **type module owns the weights** and states them explicitly; this is
the default when it does not:

| Category | Default weight |
|---|---:|
| Price | 25% |
| Condition | 20% |
| Neighbourhood | 20% |
| Liquidity | 15% |
| Renovation risk | 10% |
| Documents (completeness / clarity) | 10% |

A category that cannot be assessed is **N/A with the reason** — never guessed.
When a category is N/A, its weight is redistributed proportionally across the
assessable categories and the report says so; the overall figure never silently
rests on a smaller base.

**MONEY-8 · Risk labels and critical flags.** `Low / Medium / High / Critical
Flag`. Critical flags include: moisture, foundation or structural damage; a roof
needing replacement soon; old or illegal electrics with fire or shock risk; high
association debt or a large planned building project; key documents missing at the
decision stage; a price far below public valuation; flood, contamination or radon
concern; seller disclosure contradicting an expert finding; market-flight signals;
a zoning or legal restriction affecting use, financing or resale; and any unmet
legal gate under LEGAL-1.

---

## VIS — Visual analysis

**VIS-1 · Photos present → a visual-inspection section is mandatory.** The
tilstandsrapport excludes cosmetics, normal wear and aesthetic items **by law**,
yet these set the buyer's real first-year budget. Go room by room (procedure:
`visual-inspection.md`), tag every item `photo observation`, tie overlaps to the
documented finding and count the cost once, and net the cosmetic + functional
total into a single negotiation range labelled `assumption`.

**VIS-2 · A floor plan present → the floor-plan pass is mandatory.** Read the
compass rose (crop and zoom the actual image, state the rotation), derive which
facade the main windows face, cross-check against view photos and the portal's
sun-path widget, and sanity-check plan m² against BBR. "Orientation may vary" when
a north arrow is printed on the plan is a methodology violation — the answer is
usually one zoom away.

**VIS-3 · Zoom before asserting a detail.** Compass roses, label letters, window
bars, roof material, meter readings: crop the region and upscale ≥3× before
claiming anything. Still ambiguous after zoom → `photo — unconfirmed`. Never
assert from a full-page thumbnail.

**VIS-4 · Every photo tag traces to an image actually opened this session.**
Restating the agent's marketing prose as a visual observation is fabrication, of
the same severity as inventing a comp.

**VIS-5 · Say what the photos do not show.** Name the invisible structure and point
to the document that covers it. Correct the eyeball where the documents disagree
with it. Never diagnose mould, structural damage or asbestos from an image — that
requires a specialist.

---

## LEGAL — The transaction and the buyer's rights

Full content in `transaction-and-legal.md`; these are the binding rules.

**LEGAL-1 · Check the right to buy before analysing the object.** A buyer without
prior Danish residence and without EU/EEA residence rights may need permission
from **Civilstyrelsen** under Erhvervelsesloven; for a sommerhus the rules are
stricter again. This gate can void the entire purchase, so it is asked at intake
and answered in the report — it outranks every other finding. Where the buyer's
status is unknown, the report states the test and tells them how to resolve it,
rather than assuming they qualify.

**LEGAL-2 · The købsaftale and its deadlines belong in the report.** Name and
explain, in the client's language: **advokatforbehold** (the only clean exit —
check it exists and how it is worded), **fortrydelsesret** (6 working days, and it
costs 1% of the price), the **bankgaranti / deponering** deadline, the
**refusionsopgørelse**, the **overtagelsesdag** and when risk transfers, and what
**løsøre** is included. These are dated obligations, and missing one is expensive.

**LEGAL-3 · Read the ejerskifteforsikring offer as a lens, not a fee line.** The
seller must offer to pay half of a standard policy. The policy does **not** cover
what the tilstandsrapport already lists — the single most misunderstood point —
and cover differs materially between insurers. Say what this specific offer does
and does not protect.

**LEGAL-4 · Financing structure is a fact, not advice.** State the structure that
shapes both this buyer and the next one: realkredit up to 80%, bank loan to 15%,
minimum 5% own payment; `bidragssats` as an ongoing cost invisible in the headline
rate; `kurstab` at drawdown; affordability testing. Never recommend a product, a
lender or a rate type.

---

## OUT — Output

**OUT-1 · The use-case module owns the report structure.** For the buyer flow:
`usecase-buyer.md`. Sections are adapted to the type, never dropped silently.

**OUT-2 · Language.** The entire client report is written in `OUTPUT_LANGUAGE`.
Danish technical terms are kept and glossed in plain words on first use —
`ejerudgift (ежемесячные расходы владельца)`. The Operator Appendix is always in
English regardless of the client's language.

**OUT-3 · The client report and the Operator Appendix never blend.** Two clearly
separated blocks; the appendix is internal and marked "do not send". It carries
the document inventory (DOC-1), the evidence ledger (EV-7), extraction tables,
raw comps with sources and dates, source conflicts, and everything to remove
before sending.

**OUT-4 · Critical and creative, never a dry extract.** The report protects and it
sells. Lead with what others miss; the promise on the cover is delivered
literally by the hidden-signals and iceberg blocks.

**OUT-5 · Most important first.** The verdict page stands alone: verdict and
one-sentence reason, risk label, fair-price range with confidence, three
strengths, three concerns, three checks before the decision, and what would change
the verdict.

**OUT-6 · Anything published on the site follows the anonymization module.**
Blur classes, fictional addresses, locked findings, number shifting with
recomputed derived values, rank-order stability, leak and script-purity checks:
`site-outputs-and-anonymization.md`.

**OUT-7 · No third-party personal data.** Never compile PII about neighbours,
sellers or agents into the client copy. Agent names, phone numbers, emails and
case numbers are removed from anything that ships.

---

## GATE — Delivery

**GATE-1 · Nothing is delivered on the model's own authority.** Every generated
report carries **`DRAFT — NOT FOR CLIENT`** on the cover and in the filename until
the operator explicitly approves it. Client-facing and site artifacts are produced
only from an approved version. Approval is a human act.

**GATE-2 · The self-gate runs before every output.** One checklist, in
`self-gate.md`, keyed to the IDs above. It validates the *draft*; passing it does
not authorise delivery (GATE-1). If a check fails, fix the text before output.

**GATE-3 · Brand and voice.** Palette rust `#C4533F`, ice `#B0C9DA`, cream
`#E8DED1`, navy `#0F1E30`, gold `#D4975A`; Fraunces (display) + Inter (body) +
IBM Plex Mono (data); lighthouse motif; cover slogan **"See What Others Miss"**.
Voice: critical, creative, protective — calm, never alarmist, never salesy about
the property itself.
