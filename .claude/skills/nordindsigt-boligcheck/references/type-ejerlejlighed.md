# TYPE MODULE — EJERLEJLIGHED (owner-occupied apartment)

> Loaded when the property is an owned apartment in an `ejerforening`. Read with `rules.md`.

## Detection signals

Classify as **EJERLEJLIGHED** when: `ejerlejlighed`, `ejerforening`/`E/F`, `fællesudgift`, `fordelingstal X/Y`, floor designation (`st./1./2. th./tv./mf.`), BBR `etageboligbebyggelse` with individual ownership, owner pays `ejerudgift` **plus** `fællesudgift`. There IS an `ejerforening` but **no** `andelsboligforening` and **no** `maksimalpris/§5` calculation (that would be ANDELSBOLIG).

## Expected document set

`salgsopstilling` + `energimærke` (+ ideally `ejerforeningens regnskab/budget`, `generalforsamlingsreferater`, `vedtægter`, photos). A `tilstandsrapport`/`elrapport` is **optional** for apartments and frequently absent.

- **Mode A** = salgsopstilling + energimærke + ejerforening financials (regnskab/budget/referater).
- **Mode B (ejerlejlighed)** = ejerforening financials missing. Missing `tilstandsrapport` is **NOT** a red flag here — but **missing ejerforening financials IS the key risk** and turns the association section into a GATE.

## Extraction specifics

From `salgsopstilling`: price, `kr/m²`, `ejerudgift`, `fællesudgift`, `fordelingstal`, floor, build/renovation year, `offentlig vurdering`, `fælleslån` (solidarisk hæftelse!), `sikkerhed til E/F`, any **extraordinary assessments** (e.g. VVS/`rørprojekt` opkrævning with due date), announced `fællesbidrag` increases, `servitutter`/`lokalplan`, `jordforurening` status, assumable loan terms, `kontantbehov ved køb`.

**Energimærke caveat:** for apartments the label is usually issued for the **whole building**, not the unit. State this; the unit's real performance varies by floor/exposure. Ask for the seller's actual 12-month heat/electricity bills.

## Ejerlejlighed-specific risk lenses (the association is central)

- **Extraordinary assessments / planned works:** VVS/pipe projects, roof/facade/window programmes — who pays, when, and is it priced into the offer? An imminent `ekstraordinær opkrævning` is effectively part of the purchase cost.
- **Association financial health:** debt, reserves, `fællesbidrag` trend, any `renteswap` or variable-rate `fælleslån`. **Solidarisk hæftelse** on common loans = your shared liability.
- **Ground-floor (`stuelejlighed`) units:** higher moisture/humidity risk, especially in pre-1960 buildings; recommend moisture check.
- **Old building services** (1900s buildings): pipes, risers, electrical risers are collective costs.
- **Documents to request (Mode B):** `seneste årsregnskab` + `budget`, `generalforsamlingsreferater` (2–3 yrs), `vedtægter`, `vedligeholdelsesplan`.

## Price lens

Compare `kr/m²` to recent sold + active comps of similar size/floor/area. Note ground-floor units typically trade 10–20% below upper floors of the same building (offsets like a private garden can reverse this). Asking vs `offentlig vurdering` gap is more normal in premium urban markets — interpret with care.

## Total cost

Purchase price + ownership-transfer registration (+ mortgage registration if assumed) + `ejerudgift` (incl. `fællesudgift`, taxes) + any extraordinary assessment + insurance + renovation reserve. Show monthly (gross/net) and total cash needed using the salgsopstilling figures.

## Scorecard weights (`MONEY-7`)

The apartment's binding question is the association, not the private unit's
condition — so Condition and Renovation-risk give most of their weight to an
"Association & building" category:

| Category | Weight |
|---|---:|
| Price | 25% |
| Association & building economy | 25% |
| Neighbourhood | 20% |
| Liquidity | 15% |
| Documents | 10% |
| Condition / renovation of the unit | 5% |

A missing tilstandsrapport is **normal** here and never scored as a red flag — but
missing association financials drives both the Association and Documents scores
down and turns the section into a GATE. If Condition is genuinely unassessable,
mark it N/A with the reason and redistribute its 5% (`MONEY-7`).

## Living in it, letting it out (`LEGAL-2`, expat-critical)

An expat buyer who may relocate needs these answered **before** bidding, and no
one volunteers them at a viewing:

- **Bopælspligt.** Some kommuner require a year-round dwelling to be actually
  lived in, and treat a flat left empty as a breach — with the kommune able to
  demand it be occupied or let. Check the kommune's rules for the address; it
  decides whether "keep it and come back in two years" is even legal.
- **Letting the flat out.** Read the `vedtægter` and `husorden` for whether
  `udlejning` and `fremleje` are allowed at all, for how long, and with whose
  consent. Short-term letting is separately restricted in many associations and
  by the kommune.
- **What that means for the exit.** If the flat can neither stand empty nor be
  let, the buyer's only exit is a sale — which makes the liquidity analysis
  (`investment-and-liquidity.md`) the decisive section rather than a footnote.

## Ejerforening economy — the mandatory block

The biggest hidden cost of an ejerlejlighed is the part you cannot see: the
**ejerforening**. ALWAYS include an "Ejerforening economy" block and request:
- **regnskab + budget + vedligeholdelsesplan** — pending facade / roof / window /
  riser / kloak works on the common building. An older block can issue a **special
  assessment (særlig opkrævning) of 50,000–150,000+ kr per flat**, invisible in the
  listing. Tag `assumption` until the plan is read.
- **fælleslån** — does the forening carry debt, on what terms? It sits behind your
  monthly.
- **what ejerudgift / fællesudgift covers** — a high kr/md for a small flat usually =
  big fællesudgift; separate it from the owner's own grundskyld/insurance.
- **fordelingstal** — your share of common costs and votes; **husorden + vedtægter**
  (subletting, pets, renovation consent).

Never analyse an ejerlejlighed with villa logic: no private-plot grundskyld framing,
no "replace the roof yourself" — the roof is the forening's. For pre-1986 blocks,
asbestos in common risers/glue is the forening's remediation, but flag it as a
possible future levy.

---
## Is it actually an ejerlejlighed? — the ideel anpart trap (`TYPE-1`)

Before applying any of the above, confirm the unit really is an ejerlejlighed.
**Ideel anpart / villalejlighed** is a share of a whole property, divided by
agreement between co-owners rather than registered as separate units. On a portal
it looks like an ordinary apartment — same photos, same kr/m², sometimes the same
category label.

Signals: `ideel anpart`, `anpartslejlighed`, `villalejlighed`; a `samejeoverenskomst`
instead of ejerforening vedtægter; no `ejerlejlighedsnummer`; an older villa
divided into two or three homes; the salgsopstilling naming a share (e.g. "1/3 af
ejendommen") rather than a unit.

Why it changes the whole report: **no realkreditlån** on an ideel anpart (bank
financing only, dearer and smaller), the co-owners' agreement governs everything
from maintenance to who may buy in, exit depends on the other owners, and the
buyer pool is a fraction of the apartment market. Do not apply this module's price
or financing logic to one — state the tenure clearly, analyse the
samejeoverenskomst in place of association financials, and treat liquidity as the
leading risk.

## Permanent report absence (extends Mode B)
If the salgsopstilling states *"Der vil ikke blive udarbejdet tilstandsrapport"* /
*"...elinstallationsrapport"*: this is **final**, not a pending phase. Client text
must say the reports will never exist for this listing; Condition + Electrical are
N/A **in principle**; the checklist replaces "obtain reports" with "commission your
own technical inspection (buyer-paid) if certainty is wanted". Contrast explicitly
with the villa "under udarbejdelse" case (temporary). Legal + common for apartments —
not a red flag by itself, but a higher-uncertainty structure the buyer must own.

### Energimærke scope check — mandatory (`DOC-6`)
Open the energimærke's BAGGRUNDSINFORMATION page and record: total opvarmet areal,
**boligareal vs erhvervsareal**, number of units covered. If the certificate covers
the whole building (typical) — and especially if it includes **erhverv** (shops,
bars, restaurants) — state in the client report that the letter grade is a blended
average of a mixed building N× the unit's size, and that the unit's own performance
is unverified. Always request the seller's actual 12-month varme/el bills; the
a conto figure is a prepayment, not the answer.

### Mixed-use building lens (NEW — residential + erhverv in stueetagen)
When BBR/energimærke/photos show commercial ground floor (esp. bars/restaurants/
event venues):
- **Night activity & noise**: flag for personal evening-visit verification; general
  (not address-specific) DK statistics link nightlife venues to more street-level
  incidents — frame as context, never as a verdict on this address.
- **Insurance & wear**: commercial tenants raise the building's insurance and wear
  profile — costs flow into fællesudgift.
- **Cost split**: check how vedtægter/fordelingstal split costs between bolig and
  erhverv sections; ask whether erhverv owners sit in the ejerforening and with what
  vote weight.
- **Ventilation/smells** from restaurant kitchens (energimærke ventilation section
  often reveals restaurant udsugning zones — cite it).

### Sikkerhed til ejerforeningen → financing effect
The tinglyst sikkerhed (pantstiftende byrde) **reduces the maximum ejerskiftelån**
by its amount — the salgsopstilling's own standard-financing box usually admits
this ("Standardfinansieringen kan ikke opnås..."). Translate for the client: real
required own cash ≈ udbetaling + the sikkerhed amount; tell them to ask their bank
for the exact effect. Never leave it as an unexplained line item.

### Small resale lenses worth one line each
- **No elevator + floor ≥ 3**: narrows the future buyer pool (age/mobility, prams);
  note under liquidity.
- **Husdyr forbidden in vedtægter**: state before the viewing — deal-breaker class
  info for many buyers; same for fremleje terms (allowed §X / forbidden).
- **Bevaringsværdig (SAVE) status**: if the salgsopstilling or FBB (kulturarv.dk)
  shows a SAVE category, explain that facade/window changes — even unit-owned
  elements — may need approval. Category ≤ 4 is a **potential** constraint
  until the lokalplan or a kommune decision confirms it (`RES-9`).

### Comp discipline for apartments (applies `RES-3`)
- A sale **in the same building** is the strongest comp — search for it explicitly
  (Boliga by street + number). Adjust for size (bigger units trade lower kr/m²)
  and floor.
- **De-duplicate by unit**: a Boliga sold record and a later portal listing can be
  the same unit (flip/resale). Never count one unit twice in the comp set.
- Ground-floor discount / top-floor skråvægge: note which floors your comps sit on.
