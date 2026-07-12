# TYPE MODULE — VILLA / ENFAMILIEHUS

> Loaded when the property is a detached single-family house. Read with `core-kernel.md`.

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

## Geodata (Mode A & B)

Check public sources for the exact address: flood/`oversvømmelse`, radon (pre-1998 builds lack `radonspærre`), `jordforurening`, road/rail noise. If address-level data isn't retrievable, say so and tell the buyer to check DinGeo — do not fabricate a flag.

## Scoring notes

Standard 6-category weighting applies. Condition is fully scorable in Mode A; in Mode B it is **N/A (no tilstandsrapport)** with a strong recommendation to obtain it.
