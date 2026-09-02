# TYPE MODULE — VILLA / ENFAMILIEHUS

> Loaded when the property is a detached single-family house. Read with `rules.md`.

## Detection signals

Classify as **VILLA** when the documents/listing show: `villa`, `enfamiliehus`, `fritliggende`, own `matrikel`/plot with `grundareal`, owner pays `ejerudgift` (not `fællesudgift`/`boligafgift`), a `tilstandsrapport` + `elinstallationsrapport` exist or are expected, BBR `anvendelse` = fritliggende enfamiliehus (120). No `ejerforening`, no `andelsboligforening`. If there is a shared `ejerforening`/`grundejerforening` + common roof/wall → consider **RÆKKEHUS** instead.

## Expected document set

`salgsopstilling` + `tilstandsrapport` + `elinstallationsrapport` + `energimærke` (+ `sælgeroplysninger`, photos, BBR).

- **Mode A** = all four present.
- **Mode B (villa)** = `tilstandsrapport` and/or `elrapport` missing. For a villa this **is** meaningful — those reports are the heart of condition analysis and a seller would normally provide them under the `huseftersynsordning`. Flag clearly and turn Condition + Electrical into GATEs; recommend obtaining them before bid.

## Extraction specifics

**Tilstandsrapport — extract EVERY skade:** number, area, colour rating, damage text, risk text, source page, buyer impact. Group by severity:
- 🔴 **RØD / critical** · 🟡 **GUL / serious** · ⚪ **GRÅ / minor** · ❓ **investigate**.
Count the reds and state which carry real cost vs cheap fixes (e.g. missing `redningsåbning` → hardwired smoke alarm is cheap; bathroom wet-zone tiles → real moisture cost).

Also extract: roof material + `restlevetid` table + expected replacement year; **asbestos/eternit** indication (pre-1986 eternit especially); repeated moisture/foundation/facade/window issues; `selvbyg` (DIY) works disclosed.

**Elinstallationsrapport — extract EVERY fejl:** severity, description, page, impact. Count separately: `risiko for brand` (fire), `risiko for stød` (shock), `ulovlig installation`, `undersøges nærmere`. Fire/shock items are serious until checked by an authorised electrician.

**Sælgeroplysninger:** extract every `Ja` and free-text note; cross-check against expert findings; flag mismatches and follow-ups (moisture, pests/`rotter`, insurance cases, leaks, basement, unauthorised works, disputes).

## Villa-specific risk lenses

- **Roof / asbestos-eternit:** age, `restlevetid`, future replacement reserve (research current `kr/m²` incl. asbestos disposal; note cost can change after specialist inspection). Not urgent if life remains — frame as long-term reserve.
- **Foundation / moisture / facade cracks**, especially `selvbyg` repairs of unknown quality.
- **Landzone vs byzone:** if `landzone` → explain implications for financing, building rights, resale.
- **Private water supply** (`privat vandforsyningsanlæg` / well): owner responsibility for water tests + pump/filter maintenance; ask for latest water analysis.
- **Heating:** `pillefyr`/wood-pellet, oil, heat pump, fjernvarme — running cost, manual work, storage, fjernvarme availability.
- **Era-typical risks** labelled as general context, not proven defects.

### Site infrastructure — three checks that are easy to miss

These sit outside the tilstandsrapport and outside the listing, and each can carry
a five-figure bill. Run all three for every villa.

- **Waste water: public sewer or a private system?** A house outside `offentlig
  kloak` runs a `nedsivningsanlæg`, `septiktank` or `samletank` — owner-maintained,
  finite-lived, and subject to a kommune **påbud** to upgrade when the area's
  `spildevandsplan` tightens. Check the plan for the address
  (`research-pipeline.md`), ask when the system was last emptied and inspected, and
  price an upgrade as a reserve range with "get binding quotes" (`MONEY-4`).
  Where the house *is* on public sewer, check instead whether the area faces
  `separatkloakering` — the owner pays for the work on their own plot.
- **The access road: public or `privat fællesvej`?** On a private shared road the
  owners carry maintenance, lighting and winter clearing, often through a
  compulsory `vejlaug` with dues and occasional large resurfacing levies. Ask which
  it is; the answer is in the ejendomsdatarapport's `vejforsyning` section.
- **Grundejerforening with compulsory membership.** Standard in planned
  developments and written into the lokalplan or the deed. Extract it like an
  association: vedtægter, annual dues, what they cover, any planned shared works
  and outstanding levies. It is a recurring cost the listing rarely shows.

## Geodata (Mode A & B)

Check public sources for the exact address: flood/`oversvømmelse`, radon (pre-1998 builds lack `radonspærre`), `jordforurening`, road/rail noise. If address-level data isn't retrievable, say so and tell the buyer to check DinGeo — do not fabricate a flag.

## Scorecard weights (`MONEY-7`)

The villa carries the default weighting — this is the type the default was written
for:

| Category | Weight |
|---|---:|
| Price | 25% |
| Condition | 20% |
| Neighbourhood | 20% |
| Liquidity | 15% |
| Renovation risk | 10% |
| Documents | 10% |

Condition is fully scorable in Mode A. In Mode B it is **N/A (no
tilstandsrapport)** with the reason stated and a strong recommendation to obtain
one; its 20% is redistributed proportionally across the assessable categories and
the report says so (`MONEY-7`).
