---
name: nordindsigt-boligcheck
description: >
  Generates a complete, brand-styled NordIndsigt BoligCheck property-intelligence
  report for an expat home-buyer in Denmark, from Danish property documents
  (salgsopstilling, tilstandsrapport, elinstallationsrapport, energimærke,
  sælgeroplysninger) and/or a Danish address. ALWAYS use this skill whenever the
  user asks to analyse, review, "check", or "do a report on" a Danish home or
  apartment, uploads any such Danish property PDFs, pastes a boligsiden / boliga /
  nybolig / edc / home.dk link, or gives a Danish address with a 4-digit postcode
  for a property check — even if they never say the words "report" or "BoligCheck".
  Covers the buyer use-case for villa, ejerlejlighed, andelsbolig and rækkehus,
  and outputs in English, Russian or Danish. The report is critical AND selling
  ("see what others miss"), never a dry data dump, and every fact is tagged by
  source with no invented numbers.
---

# NordIndsigt BoligCheck — report builder

This skill turns Danish property documents and/or an address into one finished,
brand-styled BoligCheck report. It is the orchestrator. The detailed knowledge
lives in `references/` — read the relevant file when the pipeline points you to it.

## 0. Operating principles (non-negotiable)
- **Evidence discipline.** Every factual claim carries a source tag: `doc`
  (a property document), `web` (public source), `calc` (our calculation),
  `assumption` (reasoned but uncertain). Never invent comps, prices, costs, or
  dates. When data is absent, write **"Недостаточно данных" / "Not enough data"** —
  do not guess.
- **Critical and creative, not a dry extract.** The report must sell and protect.
  Lead with what others miss. The brand promise *"See What Others Miss"* appears
  on the cover and is literally delivered by the Hidden-signals and Iceberg blocks.
- **Keep Danish terms, then gloss them** on first use, e.g.
  `ejerudgift (ежемесячные расходы владельца)`, `fjernvarme (центральное отопление)`.
- **Most important first, then detail.** Verdict page is self-contained.
- **Confidence is explicit.** Price confidence ties to the number of free-market
  comps (Low / Medium / High).
- Public valuation (offentlig vurdering) is **never** treated as market value.

## 1. Detect type and mode
Read the inputs and decide:

**Property type** → choose the matching type module in `references/`:
`type-villa.md`, `type-ejerlejlighed.md`, `type-andelsbolig.md`, `type-raekkehus.md`.
Signals: own matrikel + ejerudgift + huseftersyn set → villa/rækkehus;
ejerforening fællesudgifter → ejerlejlighed; andelsboligbevis / andelsværdi →
andelsbolig (and trigger the mandatory cooperative-ownership education block).

**Mode** (how much is on hand):
- **A — full package:** salgsopstilling + tilstandsrapport + elrapport + energimærke
  (+ sælgeroplysninger). Full report.
- **B — partial:** some documents missing → build what's possible, flag gaps loudly.
- **C — address only:** no private docs on hand yet. Before falling back to a pure
  public-data build, **try the operator fetch** (`pipeline/fetch_salgsmateriale.py`
  — the agent's listing-form gate, name+email only, no MitID; see
  `references/research-pipeline.md` "v7 policy change"). A fetch does NOT set the
  mode by itself: fetched files enter the **document inventory (v7 §26)** only
  after passing the fetcher's PDF validation (manifest.json says `valid`), and the
  mode is then re-derived from the inventory. Only if the fetch fails/isn't
  attempted, build the public-data layer and tell the user exactly which documents
  to forward (the boligejer.dk MitID gate is a different, genuinely unbypassable
  barrier and stays the buyer/owner's own action).

Set `OUTPUT_LANGUAGE` from the user (default the language they are writing in).

## 2. Mandatory research pass (the "second layer")
Before writing, run the research pipeline. **Read `references/research-pipeline.md`**
for the full source list, what each yields, whether it is automatable or manual,
and access gates. At minimum gather, by address:
1. Canonical address + postcode + coordinates + BFE + matrikel + zone (DAWA/BBR).
2. Comps: recent **free-market** sales of similar homes in the postcode; exclude
   family sales. Plus liggetid (median days-on-market) for the segment.
3. Price history of the subject (last actual sale → compute CAGR vs the market).
4. Neighbourhood: schools (+ the daycare 30% quota check near udsatte
   boligområder), area trajectory/regeneration, demographics.
5. Geo-risks: radon, flood (grundvand/skybrud/hav/vandløb), soil classification.
6. Daily-life layer: mobile/broadband coverage, road/rail noise, drinking-water
   quality, rat reports, EV charging, sun/shadow on terraces.
7. Long-term ownership risks (see §3).
Check each part of the answer against what you actually retrieved before writing.

## 3. Apply the knowledge layers
- **Long-term ownership + hidden costs** → read
  `references/long-term-and-hidden-costs.md`. This encodes the non-obvious,
  high-impact items (buried oil tank / olietank; sewer inspection is *outside* the
  huseftersyn by law; asbestos beyond the roof — in tile glue, vinyl, pipe
  insulation; steel heating pipes cast in the terrændæk; self-build / on-the-
  boundary structures and the legal demolition risk; water-heater lifespan;
  hegnsloven hedge costs; climate-driven insurance premium rises; the 2025–26 tax
  re-valuation / efterregulering) plus the cost-over-time iceberg
  (now / 1–3 yrs / 5–15 yrs / 20–30 yrs) and the fine-print costs.
- **Investment & liquidity** → read `references/investment-and-liquidity.md`
  (CAGR vs market, break-even hold period from round-trip transaction costs,
  buyer-pool narrowing, parcelhusregel, rate sensitivity).

## 4. Assemble the report
Use `templates/report-template.html` as the skeleton (brand CSS, structure,
evidence-tag pills, severity chips, price-delta visual, lighthouse-beam accent).
Section order:
Cover → Verdict (self-contained) → Hidden signals → Scorecard →
1 About · 2 Price & market · 3 Condition · 3b Electrical · 3c Visual photo-inspection ·
4 Neighbourhood/schools/liquidity · 6 Energy · 7 Total cost · **Iceberg of hidden/future costs** ·
8 Renovation reserve · **Long years of ownership (risks)** · **The home as an
asset** · 9 Negotiation · 10 Questions for agent · 11 Checklist · 12 Limitations ·
13 Provenance → Operator appendix (internal).

Tailor every section to the specific home — no generic filler. The buyer-flow
detail and section intents live in `references/usecase-buyer.md` and
`references/core-kernel.md` (the foundational rules).

## 5. Brand
Palette: rust `#C4533F`, ice `#B0C9DA`, cream `#E8DED1`, navy `#0F1E30`,
gold `#D4975A`. Fonts Fraunces (display) + Inter (body) + IBM Plex Mono (data).
Lighthouse motif. Slogan on cover: **"See What Others Miss"**. Voice: critical,
creative, protective — it sells and it shields.

## 6. Self-gate before delivering
Confirm: no forbidden certainty words · disclaimer on cover · every fact tagged,
unknowns marked · no fabricated comps/costs/dates · price confidence matches comp
count · public valuation ≠ market value · ejerudgift explained on first use ·
registration fees separated from price · asbestos/structural framed cautiously
(specialist required) · era-typical risks labelled as context · no third-party PII
compiled into the client copy · Operator appendix marked "do not send".

## Files
- `references/core-kernel.md` — foundational rules (evidence, voice, language).
- `references/usecase-buyer.md` — buyer-flow section intents.
- `references/type-*.md` — per-type analysis (villa / ejerlejlighed / andelsbolig / rækkehus).
- `references/research-pipeline.md` — every data source, auto/manual, access gates.
- `references/long-term-and-hidden-costs.md` — ownership risks + cost-over-time iceberg.
- `references/investment-and-liquidity.md` — CAGR, break-even, liquidity, taxes.
- `templates/report-template.html` — the HTML skeleton with brand tokens.

---
## v2 test-driven updates (after a 3-type × 3-language test run)
Tested on a rækkehus (DA), an ejerlejlighed (EN) and an andelsbolig (RU) in Mode C.
Hard rules added — read the relevant ADDENDUM v2 sections:
1. **Andel ≠ ownership pricing** → no CAGR, no offentlig-vurdering compare; analyse the
   forening's economy instead (`references/type-andelsbolig.md`).
2. **Ejerlejlighed** → mandatory "ejerforening economy" block, special-assessment risk
   (`references/type-ejerlejlighed.md`).
3. **Mode C** → price confidence = LOW; never invent a fair-price range.
4. **Skybrud flag** → always parse Boligsiden nedbør/bluespot.
5. **Liquidity** → reconstruct the full listing-history timeline, not just days-on-market;
   flag asking priced above offentlig vurdering. (`references/research-pipeline.md`)

---
## v3 test-driven updates (after a 7-address Mode-C unification run)
Tested on 7 real Boligsiden addresses across villa / rækkehus / ejerlejlighed /
andelsbolig. Three more hard rules added:
6. **Listing-status check (mandatory FIRST research sub-step).** Confirm the property
   is *currently* for sale before treating any asking price as live — Boligsiden/Boliga/
   EDC pages frequently surface as archived/"Solgt" or stale cache. If sold/withdrawn/
   not listed: do not build a fair-price section on a dead asking price; state plainly
   "Этот адрес не выставлен на продажу сейчас — анализ построен на последней
   зафиксированной сделке / историческом профиле; подтвердите статус вручную." /
   "This address is not currently listed — analysis is based on the last recorded
   transaction / historical profile; confirm status manually." Tag `web` + date.
7. **Tenure-type ambiguity guard.** Never infer tenure (ejerlejlighed vs andelsbolig vs
   owner-occupied) from neighbouring units, the building name, or the street — the same
   building/street can mix andelsboligforeninger with ejerlejligheder unit by unit. If
   the subject unit's own tenure isn't confirmed by a document or a source naming that
   exact unit, do not guess; request salgsopstilling / andelsboligbevis /
   ejendomsdatarapport and do NOT apply CAGR/offentlig-vurdering or andelsbolig-forening
   logic until confirmed.
8. **Andelsbolig + Mode C → set expectations up front.** Before running the research
   pass, warn that the report will be almost entirely "not enough data" for this type,
   because the substantive analysis (§5 max-pris, association debt/loan, fremleje)
   depends entirely on the nøgleoplysningsskema/regnskab, which Mode C never has. Tell
   the user to request that document from the agent first; still run the public-data
   layer if they want it anyway.

Self-gate also confirms: listing status verified (or flagged), and tenure type
confirmed for the specific unit (not inferred from neighbours).

---
## v4 test-driven updates (after the first full Mode-A run with listing photos)
Tested end-to-end on a real villa (Mode A: salgsopstilling + tilstandsrapport +
elrapport + energimærke, RU output) whose listing carried ~24 photos.
One more hard rule added:
9. **Visual photo-inspection pass (mandatory when photos are present).** Whenever the
   salgsopstilling, the listing page, or the user supplies photos, run a systematic
   visual pass and emit a dedicated **"Visual inspection" (3c)** section — because the
   tilstandsrapport BY LAW excludes cosmetics, normal wear and aesthetic/"taste" items
   (see its "what the surveyor does NOT look at" page), yet these set the buyer's real
   first-year budget. Go room by room: floors (carpet / laminate / wood), ceilings
   (panel / wood / condition), walls (wallpaper / paint / colour), windows (glazing
   layers, corner condensation / mould), doors, kitchen, every bathroom / wet zone,
   heating (radiators / underfloor), stairs + railings (child-safety), balcony / altan
   (structure underneath, wood treatment, view / privacy), façade, fence / privacy,
   driveway / paving. Tag every item `photo observation`.
   - **Tie to documents, don't double-count.** Where a photo overlaps a documented
     finding (a dated bathroom that is also a RØD wet-zone; an altan railing that is
     also RØD; a wood ceiling sitting under a RØD roof-ventilation cluster), cite both
     and fold the cost into that finding — never invent a second number for it.
   - **Honesty about the image.** State plainly what the photos do and do NOT show.
     If a structure isn't visible (e.g. what actually holds a balcony up), say so and
     point to the document that does cover it. Never assert a visual fact you can't see;
     mark unconfirmed guesses `photo — unconfirmed`.
   - **Correct the buyer where the documents disagree** with an eyeball guess (e.g.
     "looks like there's no underfloor heating" when sælgeroplysninger actually disclose
     a repaired gulvvarme leak).
   - **Net it into a negotiation lever.** Sum the cosmetic + functional items (excluding
     the already-counted RØD / roof reserve) into one kr range, labelled `assumption`,
     and frame the agent's "håndværkertilbud" wording as a discount argument.

---
## v5 — Project Instructions formalized (previously lived only as chat-level
instructions, never written back into this file; consolidated 2026-07)

These rules were already in force in practice (see `docs/PROJECT_ERRORS_LOG.md`
and every report since Ådalsvej 2A) but had never been committed to SKILL.md
itself. Written back here so the file matches what actually happens.

10. **Read every seller document as images, not just text.** salgsopstilling
    almost always contains real photos of the object — never read it only via
    text extraction, that loses every photograph. Convert to images (pdf2image)
    and view the pages.
11. **tilstandsrapport and elinstallationsrapport are read as images, always.**
    The exact colour of the RØD/GUL/GRÅ and brand/stød/ulovligt/undersøges icons
    is not reliably carried by the PDF text layer — only the rendered image is
    authoritative.
12. **Full research pass happens BEFORE the draft, never after.** At minimum:
    - Boligsiden.dk: reconstruct the FULL listing-history timeline (withdrawals,
      relists, every price change — not just the current price), offentlig
      vurdering, BBR, radon, schools.
    - Find 3–5 comps, **filtered by build year (±5 yrs) and area (±20%) before
      they ever reach the draft** — never filter after the fact.
    - If the same Boligsiden/Boliga pool contains a listing with very close
      parameters (ideally the same building or street), search for it
      specifically — it is the strongest possible comp.
    - Schools: pull real trivsel/karaktergennemsnit via skolegang.dk or DinGeo,
      even when Boligsiden only shows distance.
    - Geo-risk: if the interactive map won't resolve text for the exact address,
      try a neighbouring address on the same street as an explicitly-labelled
      proxy indicator before writing "not enough data".
13. **Cross-check energimærke against salgsopstilling every time.** If the
    letter grades disagree, that is a plain fact for the report, not a judgement
    call to silently resolve. This has recurred at least twice with the same
    agent network (Ådalsvej 2A, Skomagerbakken 25) — flag it as a possible
    systemic pattern, unconfirmed.
14. **Money estimates are always a range with the width explained** — state
    what drives the low end vs the high end. A spread under ×3 is a signal the
    expensive scenario wasn't actually thought through. Source real 2026 Danish
    price-search results, tag `web+assumption` or `calc`.
15. **Visual-inspection tagging discipline.** Every `[фото]`/`[photo]`-tagged
    observation must come from an actual image-viewing tool call in the current
    session. Never restate the agent's marketing prose as if it were a visual
    observation.
16. **"Not enough data" is the last resort**, used only after at least two
    attempts at an alternative source or approach.

Self-gate additions (v5): every seller PDF with photos was opened as images;
tilstandsrapport/elrapport (if present) were opened as images; comps were
filtered by year/area *before* drafting, not patched afterward; energimærke was
cross-checked against salgsopstilling and any mismatch stated as fact; every
cost range states what drives its width; every `[фото]` tag traces to a real
tool call this session.

---
## v6 audit updates (2026-07 methodology audit — first ejerlejlighed run + first
anonymized site outputs)
Tested on a real ejerlejlighed (Mode B: salgsopstilling + building-level
energimærke, no technical reports ever to be made, no E/F financials; RU report +
DA anonymized HTML) and on the anonymized 3-house comparison page. New hard rules:

17. **Permanent absence ≠ temporary absence (Mode B split).** When the
    salgsopstilling says reports are *"under udarbejdelse"* → temporary phase:
    explain the stage, gate the section until they arrive (villa pattern). When it
    says *"Der vil IKKE blive udarbejdet tilstandsrapport/elinstallationsrapport"*
    → **permanent structural absence**: those sections are N/A forever for this
    listing, the client text must say so plainly ("not later, never"), and the
    checklist must pivot to a buyer-paid independent inspection instead of "wait
    for the reports". Never present a permanent absence as a pending document.

18. **Comp discipline, extended.** Building on v5 §12: a same-building/same-street
    comp with very close parameters is the single strongest comp — search for it
    explicitly (Boliga by street + number). **De-duplicate by unit**: a sold
    record and a later portal listing can be the same flat after a flip/resale —
    never count one unit twice in the comp set.

19. **Floor-plan pass is mandatory whenever a plantegning exists** — see
    `references/visual-inspection.md`. Minimum: read the compass rose
    (crop + zoom the actual image; state the rotation vs the sheet's "up"), derive
    which facade the main windows face, cross-check with view-photos (visible
    landmarks) and Boligsiden "Solens bane"; sanity-check plan m² vs BBR area. A
    vague "orientation may vary" when a north arrow is printed on the plan is a
    methodology violation — the determination is usually one zoom away.

20. **Area-reputation / crime claims need a primary source or an explicit caveat.**
    Acceptable primary sources: politi.dk statistics, Danmarks Statistik (KRIM
    tables), the kommune's own tryghedsundersøgelse. If the only trail is secondary
    aggregators citing a newspaper (undated), the claim may be included ONLY with:
    (a) "requires independent verification" wording, (b) named source chain,
    (c) no definitive framing, and (d) a visual/document anchor if one exists.
    Never let an SEO page's superlative stand as fact.

21. **Five-year ownership cost — standard formula.** `5yr = price + 60 × (full
    monthly incl. actual heat/utilities) + midpoint renovation reserve`. If the
    renovation reserve cannot be set (no tilstandsrapport), show the figure with an
    asterisk and state it can only rise. Full monthly for an ejerlejlighed =
    ejerudgift + a conto varme + a conto vand (state the multiplier vs the
    advertised ejerudgift; ~1.3–1.4× is typical for apartments vs ~2–3× for houses,
    and WHY: the roof/facade sits inside fællesudgift for a flat).

22. **Anonymized site outputs follow `references/site-outputs-and-anonymization.md`.**
    Covers: the blur classes (.d / .kf-body), fictional-address rule, locked
    nøglefund pattern, derived-value recomputation after number shifts, rank-order
    stability check, grep leak check, and script-purity check (no Cyrillic/CJK in
    DA/EN files). Any HTML destined for nordindsigt.dk must pass that module's
    checklist before shipping.

23. **E/F pre-check via CVR before writing "not received".** For ejerlejlighed and
    andelsbolig, before gating on missing association financials, run the free CVR
    lookup (datacvr.virk.dk) for the ejerforening/andelsboligforening — annual
    reports (årsrapporter) are frequently filed publicly and give debt, equity and
    auditor remarks even when the agent hasn't sent anything. The GATE text then
    states what the public filing shows and what still must come from the agent
    (budget, referater, vedligeholdelsesplan).

24. **Daycare 30% quota check** near a listed *udsat boligområde* — the kommune may
    cap new intake from that area at 30% per institution, redirecting a child to a
    further daycare even if the local one has space. High-impact for families;
    check the kommune's pladsanvisning admin rules (`references/research-pipeline.md`).

Self-gate additions (v6): permanent-vs-temporary absence correctly framed; comps
de-duplicated by unit; if a plantegning exists, the floor-plan pass ran and
orientation is either determined or explicitly impossible (and why); any
crime/reputation claim traces to a primary source or carries the full caveat set;
5-yr cost shows its formula inputs; site HTML passed the anonymization checklist;
association GATE states the CVR pre-check result.

## Files (v6 additions)
- `references/visual-inspection.md` — consolidated photo + floor-plan + zoom
  discipline (supersedes the prose of v4 #9 as the how-to; that rule remains in
  force, this is its expanded procedure).
- `references/site-outputs-and-anonymization.md` — blur/anonymization procedure,
  comparison-page pattern, leak & script checks.

---
## v7 — external-review hardening (2026-07, after an independent methodology
review; operator decision on the fetch policy is in research-pipeline.md)

25. **Human gate — no self-approved deliveries.** Every generated report carries
    the status **`DRAFT — NOT FOR CLIENT`** on the cover AND in the filename until
    the operator explicitly approves it. Client-facing and site artifacts may only
    be produced from an approved version. The self-gate (v0 §6 + additions) checks
    the *draft*, it does not authorize delivery — approval is a human act, never
    the model's.

26. **Document inventory with per-document status (replaces binary present/missing;
    generalizes v6 §17).** For every document type expected for the detected
    property type, record one status:
    `present / pending ("under udarbejdelse") / expired (superseded revision —
    check tilstandsrapport revision dates) / missing-but-required /
    permanently-not-applicable ("vil ikke blive udarbejdet") / unknown`.
    Mode A/B/C is **derived from this inventory**, not from how documents arrived.
    Operator-fetched PDFs (fetch_salgsmateriale.py) enter the inventory only after
    the fetcher's manifest marks them `valid`; the Operator Appendix states which
    documents were operator-fetched vs client-supplied. The inventory table opens
    the Operator Appendix.

27. **Evidence ledger (upgrades the inline tags of §0 — tags stay, ledger anchors
    them).** The Operator Appendix must contain a claims table: `ID · claim ·
    source (document+page / URL) · retrieval date · quote or extracted value ·
    confidence · conflicts (IDs of contradicting entries)`. Every client-facing
    factual claim traces to a ledger ID. **A raw web result never goes straight
    into client text** — it enters the ledger first, and conflicts are resolved
    (or surfaced as open questions) there. This is the audit trail that makes
    "every fact is tagged" checkable rather than declared.

28. **Methodology refinements (wording-level, no rule reversals):**
    - The 5-year figure (v6 §21) is a **"5-year cash outlay (ex-financing,
      ex-residual-value)"** — same formula, honest name. It compares objects; it
      is not an economic cost-of-ownership. Say so wherever it appears.
    - The ×3 range rule (v5 §14) reads: **"explain the width or widen"** — a
      narrow spread is a signal the expensive scenario went unexamined, not a
      mandate to inflate. A justified narrow range (fixed-price quote, single
      known part) passes with its justification stated.
    - Price confidence = comp **count × quality** (similarity, recency,
      same-street/building), not count alone (refines v0 §7 / core-kernel §7).
    - SAVE ≤ 4 (v6 addendum in type-ejerlejlighed): state as **"potential
      constraint — verify against the lokalplan / kommune decision"**; only after
      that check may the report assert an actual restriction.
    - Neighbour-address proxy (v5 §12 geo fallback) is allowed **only for
      area-level data** (radon class, road/rail noise, school metrics) and must
      stay labelled; it is **forbidden for parcel-level data** (soil V1/V2,
      servitutter, BBR facts, plot-level flood/bluespot) — there, "not enough
      data" + the exact source the buyer should pull is the honest answer.
    - The school ~7/12 flag (research-pipeline) is **context, never a
      neighbourhood verdict** — pair it with trend and the trivsel figure.
    - Core-kernel §4's "believe surprising-but-sourced results" now reads:
      **record it, re-verify against a second source, and log the conflict in
      the ledger** — surprise raises the verification bar, it does not lower it.

Self-gate additions (v7): cover and filename carry `DRAFT — NOT FOR CLIENT`
(absent only in an operator-approved copy); the document-inventory table is
present and complete; every client-facing fact resolves to an evidence-ledger ID;
operator-fetched documents show `valid` manifest status; no parcel-level claim
rests on a neighbour proxy.
