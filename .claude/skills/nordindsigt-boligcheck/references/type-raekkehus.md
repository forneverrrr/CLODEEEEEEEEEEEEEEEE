# TYPE MODULE — RÆKKEHUS (townhouse / row house)

> Loaded for townhouses. Read with `core-kernel.md`. A **hybrid**: villa-style technical ownership + apartment-style shared association costs. "Something between owning a house and an apartment."

## Detection signals

Classify as **RÆKKEHUS** when: `rækkehus`, `kædehus`, `dobbelthus`, shares ≥1 wall with neighbours, has its **own entrance + (usually) own small plot/garden**, AND there is a shared `ejerforening`/`grundejerforening` with `fællesudgift` for common parts (roof, facade, drives, green areas). Often **both** a `tilstandsrapport`/`elrapport` **and** an association exist. If no shared association and fully detached → VILLA. If no individual technical report and ownership is by `fordelingstal` in an `etagebolig` → EJERLEJLIGHED.

Note the ownership form can vary: a rækkehus can be sold as `ejerbolig` (own matrikel), as `ejerlejlighed`, or even as `andelsbolig`. **Determine the legal ownership form first**, then apply this module's hybrid lens on top of the matching ownership rules:
- own matrikel → use villa cost/financing rules + add the association layer below;
- ejerlejlighed form → use `type-ejerlejlighed.md` cost rules + townhouse physical lenses;
- andelsbolig form → use `type-andelsbolig.md` price/financing rules + townhouse physical lenses.

## Expected document set

`salgsopstilling` + `tilstandsrapport` + `elinstallationsrapport` + `energimærke` + **association docs** (`ejerforening`/`grundejerforening` `regnskab`, `budget`, `referater`, `vedtægter`, `vedligeholdelsesplan`).

- **Mode A** = technical reports **and** association financials present.
- **Mode B (rækkehus)** = either the technical pack **or** the association financials missing → GATE the corresponding section(s). Because a rækkehus has two risk centres, note **which** half is missing.

## Hybrid extraction

Run the **villa technical extraction** (every skade by colour, restlevetid, asbestos/eternit, electrical fire/shock, sælgeroplysninger cross-check) AND the **association extraction** (fællesudgift, fælleslån + solidarisk hæftelse, planned shared works, extraordinary assessments, reserves).

## Rækkehus-specific risk lenses

- **Shared roof / facade / party walls:** a defect or planned works can be a **collective** cost even when it sits on a neighbour's unit. Check whether the tilstandsrapport covers only this unit or the terrace as a whole, and how the association splits roof/facade costs.
- **Sound transmission / party-wall** issues between units.
- **Boundary of responsibility:** what the owner maintains vs what the association maintains — read `vedtægter`.
- **Own plot/garden:** drainage, fences, hedges — minor but worth noting.
- **Energimærke:** may be per-unit or per-terrace; state which.

## Price lens

Comps = other rækkehuse of similar size/age/area (sold + active). Distinguish from both detached villas (usually priced higher per home) and apartments. Factor the `fællesudgift` into total monthly cost — a low headline price with high shared costs changes the picture.

## Total cost

Apply the cost/financing rules of the **detected ownership form** (ejerbolig / ejerlejlighed / andelsbolig), then add: `fællesudgift`, any extraordinary shared assessment, renovation reserve for both the private unit and the owner's share of common works.

## Scoring notes

Both Condition (own technical report) and an "association & shared-building" lens apply. In Mode B, mark whichever half is unverified as N/A with the document to obtain.
