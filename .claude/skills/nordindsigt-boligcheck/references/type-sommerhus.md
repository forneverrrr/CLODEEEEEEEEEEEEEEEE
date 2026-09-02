# TYPE MODULE — SOMMERHUS / FRITIDSHUS (holiday home)

> Loaded for holiday homes. Read with `rules.md`. This type inverts several
> assumptions that hold everywhere else: you may **not** live here year-round, the
> right-to-buy gate is at its strictest, and financing is far more cash-hungry.

## Detection signals

Classify as **SOMMERHUS** when: `sommerhus`, `fritidshus`, `sommerhusområde`,
`fritidsbolig`; BBR `anvendelse` in the holiday-home group (sommerhus 510 and
neighbours); plot in a designated `sommerhusområde` under planloven; no
`bopælspligt` but a use restriction instead; often a `grundejerforening` with
compulsory membership.

Distinguish carefully:
- a **helårsbolig in landzone** used as a weekend house is *not* a sommerhus —
  it keeps year-round rights and normal financing; use `type-villa.md`;
- a **flexbolig** is a year-round home a kommune has permitted to be used as a
  holiday home — the permission is personal and revocable; treat as villa plus a
  permission check;
- a **kolonihave** is not a sommerhus at all → specialist mode (`TYPE-3`).

## The two gates that come before everything else

**1. Right to buy (`LEGAL-1`) is stricter here.** For a sommerhus, permission from
Civilstyrelsen is commonly required *even for EU/EEA citizens* who would be exempt
for a year-round home. This is the single most common way a foreign buyer's
holiday-home purchase dies. Pose the test at the top of the report, not in an
appendix, and tell the buyer to raise it with a lawyer at first contact.

**2. You may not live here year-round.** In a `sommerhusområde` the property may be
used for holidays and shorter stays, but permanent residence outside the summer
period is not permitted. The well-known exception is the pensioner rule — an owner
who has held the property for the qualifying period and is a pensioner may use it
year-round. State the restriction plainly for any buyer who mentions relocating,
downsizing, or "living there for a while": for many expat buyers this alone
disqualifies the plan, and no one at the viewing will say it.

## Expected document set

`salgsopstilling` + `tilstandsrapport` + `elinstallationsrapport` +
`sælgeroplysninger` + BBR (+ grundejerforening documents, rental history if let).

- **Energimærke is commonly not required for a holiday home** — its absence is
  usually lawful, not a red flag. Confirm rather than assume, and record it as
  `permanently-not-applicable` in the inventory when that is the case (`DOC-1`).
- **Mode B (sommerhus)** = technical reports missing. As with a villa this is
  meaningful: gate Condition and Electrical and recommend obtaining them, since
  holiday-home construction is frequently lighter and the reports carry more
  information than the listing ever will.

## Sommerhus-specific risk lenses

- **Construction and season.** Many are built lighter than year-round homes:
  thinner insulation, simpler foundations, summer-grade plumbing. Ask whether it is
  usable and heatable in winter, and what the frost regime is (drained over winter?
  frost protection? a burst pipe in an empty house in January is the classic loss).
- **Water and waste.** Often a private well and a `nedsivningsanlæg` or
  `samletank` rather than public supply and sewer. Both are owner-cost items with
  real replacement figures, and a kommune can issue a **påbud** to upgrade waste
  treatment — check the kommune's spildevandsplan for the area
  (`research-pipeline.md`). Ask for the latest water analysis where there is a well.
- **Coastal and nature protection.** `Strandbeskyttelseslinje`, `klitfredning`,
  `skovbyggelinje` and other beskyttelseslinjer can freeze the building envelope
  almost completely — no extension, sometimes not even a new terrace or shed.
  Check them at the address before any sentence about "potential to extend"
  (this is the sommerhus version of `RES-9`: a potential constraint until the
  kommune or Kystdirektoratet confirms).
- **Insurance for an unoccupied building.** Premiums and conditions differ for a
  home standing empty much of the year; some policies restrict cover after a
  period of vacancy. Flag it as a question for the insurer, tied to the
  climate-driven premium trend (`long-term-and-hidden-costs.md`).
- **Grundejerforening with compulsory membership.** Common in
  sommerhusområder — road maintenance, water supply, shared areas. Get the
  vedtægter and the dues; treat any planned road or water-system project as a
  future levy.
- **Rental use.** If the buyer plans to let it: rental is normally permitted but
  regulated, income is taxable with a more favourable allowance when let through an
  approved agency than when let privately, and the vedtægter or a local plan can
  restrict it. Never model rental income as certain — present it as a range with
  the tax treatment named, and never as a reason the purchase "pays for itself".

## Price lens

Comps are other holiday homes in the same area, adjusted for distance to the coast
(the strongest single price driver), plot size, and whether the house is
winter-usable. Do **not** compare against year-round homes in the same postcode:
they are a different market with a different buyer pool. Seasonality is real —
listings and sales cluster in spring and summer, so a winter days-on-market figure
reads worse than it is; say which season the data comes from (`EV-9`).

## Liquidity

Thinner and more cyclical than the year-round market: the buyer pool is
discretionary, sensitive to interest rates and the economy, and shrinks fast in a
downturn. Combined with the 60%-type realkredit ceiling below, the practical
resale question is "who can raise this much cash for a second home" — state it
honestly under liquidity, without dramatising it.

## Financing and total cost

- **Realkredit is capped lower than for a year-round home** — commonly 60% — so
  the required own capital is much larger. This is the most frequent unpleasant
  surprise for a first-time holiday-home buyer; put the actual cash figure in the
  report (`LEGAL-4`).
- Ongoing costs: grundskyld, insurance (with the vacancy question), grundejerforening
  dues, water and waste service, and winterisation. The five-year cash outlay
  (`MONEY-5`) is computed as for any other type, with the vacancy-period utilities
  stated rather than assumed to be zero.

## Scorecard weights (`MONEY-7`)

| Category | Weight |
|---|---:|
| Price | 20% |
| Condition | 20% |
| Location & nature/coast setting | 20% |
| Use rights & restrictions (residence, letting, protection lines, right to buy) | 15% |
| Liquidity (seasonal) | 15% |
| Documents | 10% |

"Use rights & restrictions" replaces the villa's Renovation-risk category, because
for this type the binding question is far more often *what you are allowed to do*
than *what needs repairing*. An unresolved right-to-buy or residence restriction
caps this category at a low score and raises a critical flag (`MONEY-8`).
