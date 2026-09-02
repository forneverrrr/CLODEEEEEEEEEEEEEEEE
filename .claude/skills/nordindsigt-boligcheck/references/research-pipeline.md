# Research pipeline — sources, what they give, auto vs manual (v4)

> v4 = v3 + the operator-fetch policy (below) + source-lifecycle notes + the
> layers added after the 2026-07 external review. Every fact pulled here must
> land in the **evidence ledger** (SKILL v7 §27) before it reaches client text;
> the inline `doc/web/calc/assumption` tags stay as the reader-facing shorthand.

Run this before writing the report. "Auto" = retrievable by Claude from an
address with no login. "Manual" = needs the buyer/operator (login, gated form,
or a phone call).

**Source lifecycle (check before automating against any endpoint):** registry
line format is `source — last_checked YYYY-MM — fallback`. As of 2026-07:
DAWA/dataforsyningen and the legacy BBR REST are reported to be migrating to
Datafordeler/GraphQL (end-2026 horizon) — **verify the current endpoint before
building scripts on either**; fallback for both is the Datafordeler services.
Treat this as a task, not a settled fact.

## Access reality (important)
- **tilstandsrapport & elinstallationsrapport** on boligejer.dk are gated behind the
  **owner's private MitID** — this remains unbypassable, full stop; no automation
  substitutes for the owner's own ID. The practical route to the PDFs is a different,
  much weaker gate: the **agent's listing form** (Nybolig/EDC/Boligsiden "Download
  salgsmateriale" / "Se dokumenter"), which only asks for a **name + email** — no
  MitID, no identity check. On most networks the documents unlock **directly on the
  page** after submission (not emailed); on some they arrive as a download link by
  email instead.
- **v7 policy change (2026-07, operator decision — supersedes the old blanket ban):**
  auto-filling this form is now **allowed** via `pipeline/fetch_salgsmateriale.py`
  (browser automation), using a **dedicated operator mailbox** reserved for this
  purpose (never a client's personal email, never a name/identity that misrepresents
  who is asking). Rules of use:
  - **One listing at a time, operator-triggered** — never a batch/background job
    silently working through many addresses. Each run corresponds to a real object
    actually being analysed for a real client engagement.
  - **Save every fetched PDF into `inbox/<address-slug>/`** (already gitignored) and
    note address + timestamp + which network if the flow breaks — this is now a
    tracked pipeline step, not a manual hand-off, so it needs the same "what
    happened" trail as everything else.
  - **This is a ToS grey area the operator has knowingly accepted** — real-estate
    portals commonly prohibit automated access in their terms. The risk is
    contractual/reputational (a network could rate-limit or flag the mailbox), not a
    security control being defeated. Do not scale this beyond one-object-at-a-time
    operator use; if a network starts hard-blocking the mailbox, stop and fall back
    to manual for that network, note it here.
  - **Mode logic:** a fetch never sets the mode by itself. Fetched files enter the
    **document inventory (SKILL v7 §26)** only after the fetcher's `manifest.json`
    marks them `valid` (real `%PDF`, sane size/MIME); the mode is then re-derived
    from the inventory. State in the Operator Appendix which documents were
    operator-fetched (not client-supplied) — provenance fact, not a hidden detail.
  - CAPTCHA/bot-detection is real and inconsistent per network — treat the fetch as
    **best-effort**, not guaranteed; a failed/blocked attempt falls back to the old
    manual route (client/operator does it by hand) without blocking the rest of the
    report.
- **Everything below is address-only and needs no login.** This is the majority of
  the report.

## Canonical identity (do first)
- **DAWA / DAR** (dataforsyningen) — address autocomplete + validation → canonical
  address, postcode, coordinates, kommune, zone. Free, no key. *Auto.*
  — last_checked 2026-07 — reported sunset, fallback Datafordeler (see lifecycle note).
- **BBR** (bbr.dk / Datafordeler) — areas, year, construction, heating, **registered
  oil tanks**. *Auto (partial).* → also feeds the olietank check (§ long-term file).
  — last_checked 2026-07 — legacy REST reported deprecating end-2026, fallback
  Datafordeler BBR service.
- **ejendomsdatarapport** (boligejer.dk, ~105 kr) — official aggregate. When the
  buyer supplies one, **parse EVERY section, not cherry-picked fields**: BBR,
  jordforurening V1/V2, zonestatus, servitutter pointers, vejforsyning,
  spildevandsplan, grundvand, fredning/beskyttelseslinjer, huslejenævnssager,
  byggesager, olietanke, indefrosne lån. Each section is either extracted or
  explicitly marked "clean/empty" in the ledger. *Manual (small fee).*
- **tinglysning.dk** — servitutter, pant, owners (the title book). *Manual (login/fee).*
- **kulturarv.dk / FBB (Slots- og Kulturstyrelsen)** — **bevaringsværdi / SAVE
  category** for the building. Mandatory check for pre-~1940 buildings and whenever
  the salgsopstilling mentions "bevaringsværdig". Category ≤4 = **potential**
  constraint on facade/window changes — verify against the lokalplan / kommune
  decision before asserting an actual restriction (SKILL v7 §28). *Auto.*
- **Byggesagsarkiv — weblager.dk / filarkiv.dk** (kommune-dependent) — historical
  building-permit drawings: original fyrrum/olietank location, extensions, selvbyg
  verification, BBR mismatches. *Auto where the kommune publishes; else Manual.*
  Optional deep-dive: historical aerial photos ("Danmark set fra luften", kb.dk) to
  date extensions. *Manual, rare cases.*

## Association pre-check (ejerlejlighed / andelsbolig / rækkehus with forening)
- **CVR — datacvr.virk.dk** — look up the ejerforening / andelsboligforening /
  grundejerforening by name or address. **Årsrapporter are frequently public**:
  debt, equity, auditor remarks, board. Run this BEFORE writing "financials not
  received" — the GATE text should state what the public filing already shows and
  what still must come from the agent (budget, referater, vedligeholdelsesplan).
  *Auto.* (SKILL v6 §20.)

## Price, comps, liquidity
- **Boligsiden** — listing, BBR panel, **price history** (reconstruct the FULL
  on/off/relist timeline — v2 rule), public valuation, days-on-market, school panel,
  radon/flood flags, **"Solens bane"** sun-path widget on the listing page (use it
  to verify orientation claims — v6). *Auto (web_fetch works).*
- **Boliga** — **free-market sold comps** by postcode (Boligmarkedsstatistikken /
  Finans Danmark, quarterly). Exclude "familie handel". Same-street / same-building
  comp is the strongest single data point — search for it explicitly. De-duplicate
  by unit (a sold record + a later listing can be the same flat). *Auto.*
- **DinGeo** — **median liggetid** for the segment, radon, flood, soil, noise,
  demographics, salgbarhed. If the exact address page won't render, a neighbouring
  address a few doors down is a labelled proxy — **for area-level data only**
  (radon class, noise, schools); NEVER as a stand-in for parcel-level facts
  (soil V1/V2, servitutter, BBR, plot-level flood) — SKILL v7 §28. *Auto.*
- **DST — Danmarks Statistik** tables **EJ99 / EJEN77 / EJEN99** — official market
  statistics incl. andelsbolig transfers: the neutral baseline when portal
  statistics look off, and the only official series for andel. *Auto.*
- Use last actual sale + asking → compute **CAGR vs the market** (investment file).
  NEVER for andelsbolig (see type module).

## Neighbourhood & daily life (the non-obvious layer)
- **Schools** — Boligsiden panel / uddannelsesstatistik.dk / skolegang.dk: distance,
  trivsel, grade avg. *Auto.* Flag if below national ~7/12 — **a context flag,
  never a neighbourhood verdict** (SKILL v7 §28); pair with the trend and trivsel.
  **School DISTRICT ≠ nearest school**: check the kommune's skoledistrikt map when
  families are the audience — the assigned school can differ from the closest one.
  *Auto (kommune GIS) / Manual.*
- **Daycare 30% quota** — near a listed *udsat boligområde*, the kommune may cap new
  intake from that area at 30% per institution → a child can be redirected to a
  further daycare **even if the local one has space**. Check the kommune's
  pladsanvisning admin rules. *Auto (kommune page) + Manual (confirm wait time).*
  **High-impact for families; literally "see what others miss".** Daycare QUALITY
  has no centralised public rating in DK — say so as a system fact (v5 #14).
- **Area trajectory** — udsatte boligområder list (sm.dk), regeneration projects
  (Realdania / kommune). *Auto.*
- **Crime / tryghed (v6 §17)** — primary sources ONLY for definitive claims:
  **politi.dk anmeldelsesstatistik** (by politikreds), **Danmarks Statistik KRIM
  tables**, the kommune's tryghedsundersøgelse. Secondary aggregators citing a
  newspaper may be used only with the full caveat set (named chain, "requires
  independent verification", no definitive framing). *Auto.*
- **Mobile + broadband** — **tjekditnet.dk** (Energistyrelsen, address-level speed &
  providers) + **Mastedatabasen** (mast distance, 4G/5G). Matters for remote work.
  Caveat in the report: mapped coverage ≠ guaranteed indoor performance. *Auto.*
- **Air quality** — modelled street-level data ("Luften på din vej" / DCE) as a
  SCREENING layer with the explicit caveat "model, not measurement". *Auto.*
- **Noise** — Miljøstyrelsen / Vejdirektoratet støjkort: road/rail noise on the exact
  plot. Material when a terrace/balcony is sold as the highlight. *Auto (geo-layers).*
- **Drinking water** — local vandværk annual quality report: hardness (affects
  appliances), calcium, any area pesticide exceedances; confirm which vandværk.
  *Manual (vandværk site).*
- **Rats** — kommune rotteanmeldelser map/stats. Supports any pest finding. *Auto/Manual.*
- **EV charging** — public charger map (car-dependent areas). *Auto.*
- **Sun / shadow** — floor-plan compass pass first (see visual-inspection.md), then
  coordinates + orthophoto + sun azimuth + Boligsiden "Solens bane" as cross-checks.
  Tag `assumption` only for the shading estimate, not for the compass-derived facade
  direction (that is `photo/doc`). *Auto.*
- **Commute** — Rejseplanen (transit, has API) + Google Distance Matrix with
  `departure_time` (traffic-aware car time). Replace any commute `assumption`. *Auto.*

## Geo-risk
- Radon, flood (grundvand/skybrud/hav/vandløb), soil classification (byzone =
  "lettere forurenet" is standard, not a mapped site) — Boligsiden + DinGeo +
  Danmarks Arealinformation (kortlagt V1/V2). Confirm at address before signing.
  *Auto + Manual (arealinformation for the definitive V1/V2).*
- **DMI Klimaatlas** — 30-yr climate trend for the kommune (sea-level, extreme
  rainfall, storms). Turns a one-off storm into a trend or not. *Auto.*
- **KAMP (klimatilpasning.dk)** — screening ONLY: it flags exposure classes, it is
  never proof the specific plot floods (or doesn't). Frame accordingly. *Auto.*
- **Insurability pre-check** — for any home with a storm/flood/skybrud history or
  a high bluespot flag: recommend the buyer request an actual quote for THIS
  address before bidding (insurers now price per-address; a "hard-to-insure" home
  is a resale problem too). *Manual (buyer action; we flag it).*
- **Fælleskloakering note**: salgsopstilling often discloses it; separatkloakering
  can be demanded later — a building-level (E/F) or owner-level future cost.

## Future-looking
- **Plandata.dk / lokalplan** (kommune) — what can be built nearby; restrictions;
  also varmeforsyning and the newer spildevandsplan/terrænnært-grundvand layers.
  *Manual (read the plan).*
- **Planned infrastructure nearby** (roads — Vejdirektoratet; letbane; wind/solar
  parks — Energistyrelsen/Plandata): any "they will build X nearby" claim MUST
  carry a project status from the fixed scale
  **rumour / proposal / adopted / funded / under construction** — a rumour and a
  funded project are different facts and read differently in the report. *Auto/Manual.*
- **vurderingsportalen.dk** — preliminary new valuation → future tax. **Any
  boligskat/vurdering figure in the report states its valuation date and status
  (foreløbig vs endelig)** — 2026 bills may still rest on preliminary valuations
  with later efterregulering (see long-term file). *Auto/Manual.*

## Rule
A combined query returns shallow results — search each item separately. A
surprising public-record result is recorded, re-verified against a second source,
and any conflict logged in the evidence ledger (SKILL v7 §28) — surprise raises
the verification bar. On contested/area-reputation topics keep the framing
factual, sourced, and non-discriminatory.

## Orchestration rules (formerly ADDENDUM v2 — now core)
- **Listing-status check FIRST** (SKILL v3 #6): confirm the property is currently
  for sale before treating any asking price as live.
- **Mode C price confidence is LOW by default.** Never output a fake fair-price
  range. (Andel: no comps method — forening economy instead.)
- **Always parse the Boligsiden `nedbør / bluespot` line.** "Mulig påvirkning ved en
  'N-års hændelse'" → explicit skybrud flag, tied to the rising-insurance trend.
  N=2 is a notably frequent recurrence — say so.
- **Reconstruct the full listing-history timeline, not just days-on-market.**
  Withdrawals, relists, price changes across cycles — from Boligsiden "Boligens
  historie". A withdrawal followed by a higher-priced relist is a direct agent
  question, not a guess.
- **Compare asking to offentlig vurdering in BOTH directions** — above is as much a
  signal as below (but for renovated urban apartments a premium over the
  preliminary vurdering is normal; say which case applies).
